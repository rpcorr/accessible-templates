import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SignatureField } from './SignatureField';

describe('SignatureField', () => {
  it('renders the field label', () => {
    render(
      <SignatureField label="Your signature" value={null} onChange={vi.fn()} />,
    );

    expect(screen.getByText('Your signature')).toBeInTheDocument();
  });

  it('renders the signature canvas', () => {
    render(
      <SignatureField label="Your signature" value={null} onChange={vi.fn()} />,
    );

    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('renders the Type signature button', () => {
    render(
      <SignatureField label="Your signature" value={null} onChange={vi.fn()} />,
    );

    expect(
      screen.getByRole('button', { name: 'Type signature' }),
    ).toBeInTheDocument();
  });

  it('renders the Clear signature button', () => {
    render(
      <SignatureField label="Your signature" value={null} onChange={vi.fn()} />,
    );

    expect(
      screen.getByRole('button', { name: 'Clear signature' }),
    ).toBeInTheDocument();
  });

  it('disables both action buttons when disabled', () => {
    render(
      <SignatureField
        label="Disabled signature"
        value={null}
        onChange={vi.fn()}
        disabled
      />,
    );

    expect(
      screen.getByRole('button', { name: 'Type signature' }),
    ).toBeDisabled();

    expect(
      screen.getByRole('button', { name: 'Clear signature' }),
    ).toBeDisabled();
  });

  it('indicates when the signature field is required', () => {
    render(
      <SignatureField
        label="Your signature"
        value={null}
        onChange={vi.fn()}
        required
      />,
    );

    expect(screen.getByText('(required)')).toBeInTheDocument();
  });

  it('switches to typed signature input and focuses it', () => {
    render(
      <SignatureField label="Your signature" value={null} onChange={vi.fn()} />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Type signature' }));

    const input = screen.getByRole('textbox', {
      name: 'Type your signature',
    });

    expect(input).toBeInTheDocument();
    expect(input).toHaveFocus();

    expect(
      screen.getByRole('button', { name: 'Draw signature instead' }),
    ).toBeInTheDocument();
  });

  it('calls onChange when a typed signature is entered', () => {
    const handleChange = vi.fn();

    render(
      <SignatureField
        label="Your signature"
        value={null}
        onChange={handleChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Type signature' }));

    fireEvent.change(
      screen.getByRole('textbox', { name: 'Type your signature' }),
      { target: { value: 'Jane Doe' } },
    );

    expect(handleChange).toHaveBeenLastCalledWith({
      type: 'typed',
      value: 'Jane Doe',
    });
  });

  it('clears a typed signature when Clear signature is activated', () => {
    const handleChange = vi.fn();

    render(
      <SignatureField
        label="Your signature"
        value={null}
        onChange={handleChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Type signature' }));

    fireEvent.change(
      screen.getByRole('textbox', { name: 'Type your signature' }),
      { target: { value: 'Jane Doe' } },
    );

    fireEvent.click(screen.getByRole('button', { name: 'Clear signature' }));

    expect(handleChange).toHaveBeenLastCalledWith(null);
  });

  it('associates instructions with the signature canvas', () => {
    render(
      <SignatureField
        label="Your signature"
        value={null}
        onChange={vi.fn()}
        instructions="Draw your signature in the area provided."
      />,
    );

    const canvas = screen.getByRole('img', { name: 'Your signature' });

    expect(canvas).toHaveAttribute('aria-describedby');
    expect(
      document.getElementById(canvas.getAttribute('aria-describedby')!),
    ).toHaveTextContent('Draw your signature in the area provided.');
  });

  it('announces validation errors using an alert', () => {
    render(
      <SignatureField
        label="Your signature"
        value={null}
        onChange={vi.fn()}
        error="Please provide a signature."
      />,
    );

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Please provide a signature.',
    );
  });

  it('associates validation errors with the signature canvas', () => {
    render(
      <SignatureField
        id="signature-test"
        label="Your signature"
        value={null}
        onChange={vi.fn()}
        error="Please provide a signature."
      />,
    );

    const canvas = screen.getByRole('img', { name: 'Your signature' });

    expect(canvas).toHaveAttribute('aria-describedby', 'signature-test-error');

    expect(document.getElementById('signature-test-error')).toHaveTextContent(
      'Please provide a signature.',
    );
  });

  it('switches back to drawing mode from typed mode', () => {
    render(
      <SignatureField label="Your signature" value={null} onChange={vi.fn()} />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Type signature' }));

    expect(
      screen.getByRole('textbox', { name: 'Type your signature' }),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', { name: 'Draw signature instead' }),
    );

    expect(
      screen.getByRole('img', { name: 'Your signature' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'Type signature' }),
    ).toBeInTheDocument();
  });

  it('identifies the canvas as disabled when the field is disabled', () => {
    render(
      <SignatureField
        label="Disabled signature"
        value={null}
        onChange={vi.fn()}
        disabled
      />,
    );

    expect(
      screen.getByRole('img', { name: 'Disabled signature. Disabled.' }),
    ).toBeInTheDocument();
  });

  it('restores a saved drawn signature onto the canvas', async () => {
    const drawImage = vi.fn();
    const clearRect = vi.fn();

    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      clearRect,
      drawImage,
    } as unknown as CanvasRenderingContext2D);

    const originalImage = globalThis.Image;

    class MockImage {
      onload: (() => void) | null = null;
      src = '';

      constructor() {
        setTimeout(() => this.onload?.(), 0);
      }
    }

    vi.stubGlobal('Image', MockImage);

    try {
      render(
        <SignatureField
          label="Your signature"
          value={{ type: 'drawn', value: 'data:image/png;base64,example' }}
          onChange={vi.fn()}
        />,
      );

      await vi.waitFor(() => {
        expect(drawImage).toHaveBeenCalled();
      });
    } finally {
      vi.stubGlobal('Image', originalImage);
      vi.restoreAllMocks();
    }
  });
});
