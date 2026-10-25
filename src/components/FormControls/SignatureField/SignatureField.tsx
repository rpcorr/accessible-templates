import { useEffect, useId, useRef, useState } from 'react';
import type { ChangeEvent, PointerEvent } from 'react';
import type {
  SignatureFieldProps,
  SignatureValue,
} from './SignatureField.types';
import styles from './SignatureField.module.css';

export function SignatureField({
  label,
  value,
  onChange,
  required = false,
  disabled = false,
  error,
  instructions,
  id,
  className,
  ...rest
}: SignatureFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const instructionsId = `${fieldId}-instructions`;
  const errorId = `${fieldId}-error`;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const hasDrawn = useRef(false);
  const typedInputRef = useRef<HTMLInputElement>(null);

  const [typedSignature, setTypedSignature] = useState('');
  const [isTyping, setIsTyping] = useState(value?.type === 'typed');
  const [internalDrawnSignature, setInternalDrawnSignature] = useState<
    string | null
  >(null);

  const currentValue: SignatureValue =
    value === undefined
      ? internalDrawnSignature
        ? { type: 'drawn', value: internalDrawnSignature }
        : typedSignature
          ? { type: 'typed', value: typedSignature }
          : null
      : value;

  const signatureToRestore =
    value === undefined
      ? internalDrawnSignature
      : value?.type === 'drawn'
        ? value.value
        : null;

  // Restore a saved drawn signature onto the canvas.
  useEffect(() => {
    if (isTyping) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    hasDrawn.current = false;

    if (!signatureToRestore) return;

    let cancelled = false;
    const image = new Image();

    image.onload = () => {
      if (cancelled) return;

      const currentCanvas = canvasRef.current;
      const currentContext = currentCanvas?.getContext('2d');

      if (!currentCanvas || !currentContext) return;

      currentContext.clearRect(0, 0, currentCanvas.width, currentCanvas.height);
      currentContext.drawImage(
        image,
        0,
        0,
        currentCanvas.width,
        currentCanvas.height,
      );

      hasDrawn.current = true;
    };

    image.src = signatureToRestore;

    return () => {
      cancelled = true;
    };
  }, [signatureToRestore, isTyping]);

  useEffect(() => {
    if (isTyping) {
      typedInputRef.current?.focus();
    }
  }, [isTyping]);

  const classNames = [styles.container, className].filter(Boolean).join(' ');

  const updateValue = (nextValue: SignatureValue) => {
    if (value === undefined) {
      if (nextValue?.type === 'typed') {
        setTypedSignature(nextValue.value);
        setInternalDrawnSignature(null);
      } else if (nextValue?.type === 'drawn') {
        setInternalDrawnSignature(nextValue.value);
        setTypedSignature('');
      } else {
        setTypedSignature('');
        setInternalDrawnSignature(null);
      }
    }

    onChange?.(nextValue);
  };

  const getCanvasContext = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const context = canvas.getContext('2d');
    if (!context) return null;

    return { canvas, context };
  };

  const getPointerPosition = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();

    return {
      x: (event.clientX - rect.left) * (canvas.width / rect.width),
      y: (event.clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const handlePointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    if (disabled || isTyping) return;

    const drawing = getCanvasContext();
    const position = getPointerPosition(event);
    if (!drawing || !position) return;

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);

    isDrawing.current = true;
    hasDrawn.current = true;

    drawing.context.beginPath();
    drawing.context.moveTo(position.x, position.y);
    drawing.context.lineWidth = 2.5;
    drawing.context.lineCap = 'round';
    drawing.context.lineJoin = 'round';
    drawing.context.strokeStyle = '#111827';

    drawing.context.lineTo(position.x + 0.1, position.y + 0.1);
    drawing.context.stroke();
  };

  const handlePointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || disabled || isTyping) return;

    const drawing = getCanvasContext();
    const position = getPointerPosition(event);
    if (!drawing || !position) return;

    event.preventDefault();
    drawing.context.lineTo(position.x, position.y);
    drawing.context.stroke();
  };

  const finishDrawing = () => {
    if (!isDrawing.current) return;

    isDrawing.current = false;

    const canvas = canvasRef.current;
    if (!canvas || !hasDrawn.current) return;

    const signature = canvas.toDataURL('image/png');
    updateValue({ type: 'drawn', value: signature });
  };

  const handleClear = () => {
    const drawing = getCanvasContext();

    if (drawing) {
      drawing.context.clearRect(
        0,
        0,
        drawing.canvas.width,
        drawing.canvas.height,
      );
    }

    hasDrawn.current = false;
    isDrawing.current = false;
    updateValue(null);
  };

  const handleTypedSignatureChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateValue(
      event.target.value ? { type: 'typed', value: event.target.value } : null,
    );
  };

  const handleModeChange = () => {
    if (!isTyping) {
      handleClear();
      setTypedSignature('');
      setIsTyping(true);

      requestAnimationFrame(() => {
        typedInputRef.current?.focus();
      });
    } else {
      updateValue(null);
      setTypedSignature('');
      setIsTyping(false);
    }
  };

  return (
    <div {...rest} id={fieldId} className={classNames}>
      <span className={styles.label} id={`${fieldId}-label`}>
        {label}
        {required && <span className={styles.required}> (required)</span>}
      </span>

      {instructions && (
        <p id={instructionsId} className={styles.instructions}>
          {instructions}
        </p>
      )}

      {!isTyping && (
        <canvas
          ref={canvasRef}
          className={styles.signatureArea}
          width={800}
          height={240}
          aria-labelledby={disabled ? undefined : `${fieldId}-label`}
          aria-describedby={
            [instructions ? instructionsId : '', error ? errorId : '']
              .filter(Boolean)
              .join(' ') || undefined
          }
          aria-label={
            disabled
              ? `${label}. Disabled.`
              : `${label}. Draw your signature here. Alternatively, choose Type signature.`
          }
          role="img"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDrawing}
          onPointerCancel={finishDrawing}
          onLostPointerCapture={finishDrawing}
          style={{ touchAction: 'none' }}
        />
      )}

      {isTyping && (
        <div className={styles.typedSection}>
          <label htmlFor={`${fieldId}-typed`} className={styles.label}>
            Type your signature
          </label>
          <input
            ref={typedInputRef}
            id={`${fieldId}-typed`}
            className={styles.typedInput}
            type="text"
            value={
              currentValue?.type === 'typed'
                ? currentValue.value
                : typedSignature
            }
            onChange={handleTypedSignatureChange}
            disabled={disabled}
            autoComplete="off"
            aria-describedby={error ? errorId : undefined}
          />
        </div>
      )}

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.button}
          onClick={handleModeChange}
          disabled={disabled}
          aria-expanded={isTyping}
          aria-controls={isTyping ? `${fieldId}-typed` : undefined}
        >
          {isTyping ? 'Draw signature instead' : 'Type signature'}
        </button>

        <button
          type="button"
          className={styles.button}
          onClick={handleClear}
          disabled={disabled}
        >
          Clear signature
        </button>
      </div>

      {error && (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      )}

      {required && !currentValue && (
        <p className={styles.instructions}>A signature is required.</p>
      )}
    </div>
  );
}

export default SignatureField;
