import { useState } from 'react';
import type { ReactNode } from 'react';

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import Popover from './Popover';
import type { PopoverProps, PopoverTriggerProps } from './Popover';

function TestTrigger({
  children,
  ...props
}: PopoverTriggerProps & { children: ReactNode }) {
  return (
    <button type="button" {...props}>
      {children}
    </button>
  );
}

function renderPopover(props: Partial<PopoverProps> = {}) {
  const { children = <p>Popover content</p>, ...rest } = props;

  return render(
    <Popover trigger={TestTrigger} triggerContent="Open details" {...rest}>
      {children}
    </Popover>,
  );
}

describe('Popover', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe = vi.fn();
        unobserve = vi.fn();
        disconnect = vi.fn();
      },
    );

    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      callback(0);
      return 0;
    });
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('renders the trigger with accessible attributes', () => {
    renderPopover();

    const trigger = screen.getByRole('button', {
      name: 'Open details',
    });

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    expect(trigger).toHaveAttribute('aria-controls');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens the popover when the trigger is clicked', () => {
    renderPopover();

    fireEvent.click(screen.getByRole('button', { name: 'Open details' }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Popover content')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Open details' }),
    ).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes the popover when the trigger is clicked again', () => {
    renderPopover();

    const trigger = screen.getByRole('button', {
      name: 'Open details',
    });

    fireEvent.click(trigger);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.click(trigger);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders an optional title and associates it with the dialog', () => {
    renderPopover({ title: 'Account details' });

    fireEvent.click(screen.getByRole('button', { name: 'Open details' }));

    const dialog = screen.getByRole('dialog', {
      name: 'Account details',
    });

    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-labelledby');
    expect(
      screen.getByRole('heading', {
        name: 'Account details',
      }),
    ).toBeInTheDocument();
  });

  it('does not add aria-labelledby when no title is provided', () => {
    renderPopover();

    fireEvent.click(screen.getByRole('button', { name: 'Open details' }));

    expect(screen.getByRole('dialog')).not.toHaveAttribute('aria-labelledby');
  });

  it('opens by default when defaultOpen is true', () => {
    renderPopover({ defaultOpen: true });

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Open details' }),
    ).toHaveAttribute('aria-expanded', 'true');
  });

  it('calls onOpenChange when opening and closing', () => {
    const onOpenChange = vi.fn();

    renderPopover({ onOpenChange });

    const trigger = screen.getByRole('button', {
      name: 'Open details',
    });

    fireEvent.click(trigger);
    expect(onOpenChange).toHaveBeenLastCalledWith(true);

    fireEvent.click(trigger);
    expect(onOpenChange).toHaveBeenLastCalledWith(false);

    expect(onOpenChange).toHaveBeenCalledTimes(2);
  });

  it('does not open when disabled', () => {
    renderPopover({ disabled: true });

    const trigger = screen.getByRole('button', {
      name: 'Open details',
    });

    expect(trigger).toBeDisabled();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(trigger);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes when Escape is pressed and restores focus to the trigger', async () => {
    renderPopover();

    const trigger = screen.getByRole('button', {
      name: 'Open details',
    });

    trigger.focus();
    fireEvent.click(trigger);

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes when the trigger receives Escape while open', () => {
    renderPopover();

    const trigger = screen.getByRole('button', {
      name: 'Open details',
    });

    fireEvent.click(trigger);
    fireEvent.keyDown(trigger, { key: 'Escape' });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not close on Escape when closeOnEscape is false', () => {
    renderPopover({ closeOnEscape: false });

    fireEvent.click(screen.getByRole('button', { name: 'Open details' }));

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes when the user clicks outside the popover', () => {
    render(
      <>
        <button type="button">Outside button</button>
        <Popover trigger={TestTrigger} triggerContent="Open details">
          <p>Popover content</p>
        </Popover>
      </>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open details' }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.pointerDown(
      screen.getByRole('button', { name: 'Outside button' }),
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not close on outside clicks when closeOnOutsideClick is false', () => {
    render(
      <>
        <button type="button">Outside button</button>
        <Popover
          trigger={TestTrigger}
          triggerContent="Open details"
          closeOnOutsideClick={false}
        >
          <p>Popover content</p>
        </Popover>
      </>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open details' }));

    fireEvent.pointerDown(
      screen.getByRole('button', { name: 'Outside button' }),
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes when focus moves outside the popover and its trigger', () => {
    render(
      <>
        <button type="button">Outside button</button>
        <Popover trigger={TestTrigger} triggerContent="Open details">
          <p>Popover content</p>
        </Popover>
      </>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open details' }));

    fireEvent.focusIn(screen.getByRole('button', { name: 'Outside button' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('supports controlled open state', () => {
    const onOpenChange = vi.fn();

    const { rerender } = render(
      <Popover
        trigger={TestTrigger}
        triggerContent="Open details"
        open={false}
        onOpenChange={onOpenChange}
      >
        <p>Popover content</p>
      </Popover>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open details' }));

    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    rerender(
      <Popover
        trigger={TestTrigger}
        triggerContent="Open details"
        open={true}
        onOpenChange={onOpenChange}
      >
        <p>Popover content</p>
      </Popover>,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('does not change its own visibility when controlled', () => {
    const onOpenChange = vi.fn();

    function ControlledPopover() {
      const [open, setOpen] = useState(true);

      return (
        <Popover
          trigger={TestTrigger}
          triggerContent="Open details"
          open={open}
          onOpenChange={(nextOpen) => {
            onOpenChange(nextOpen);
          }}
        >
          <p>Popover content</p>
          <button type="button" onClick={() => setOpen(false)}>
            Close externally
          </button>
        </Popover>
      );
    }

    render(<ControlledPopover />);

    fireEvent.click(screen.getByRole('button', { name: 'Open details' }));

    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Close externally' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('applies a custom class name', () => {
    renderPopover({ className: 'custom-popover' });

    fireEvent.click(screen.getByRole('button', { name: 'Open details' }));

    expect(screen.getByRole('dialog')).toHaveClass('custom-popover');
  });

  it('renders its children when open', () => {
    renderPopover({
      children: (
        <div>
          <p>Additional information</p>
          <a href="/profile">View profile</a>
        </div>
      ),
    });

    fireEvent.click(screen.getByRole('button', { name: 'Open details' }));

    expect(screen.getByText('Additional information')).toBeInTheDocument();

    expect(screen.getByRole('link', { name: 'View profile' })).toHaveAttribute(
      'href',
      '/profile',
    );
  });
});
