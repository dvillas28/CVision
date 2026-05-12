import { cn } from '../../utils/cn.js';

export function AuthField({
  id,
  label,
  type = 'text',
  icon: Icon,
  rightElement,
  error,
  helperText,
  className,
  ...props
}) {
  const messageId = `${id}-message`;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block font-heading text-label-md text-on-surface-variant">
        {label}
      </label>
      <div className="relative">
        {Icon ? (
          <Icon
            aria-hidden="true"
            size={20}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-outline"
          />
        ) : null}
        <input
          id={id}
          type={type}
          className={cn(
            'h-12 w-full rounded border border-outline-variant bg-white px-4 text-body-md text-on-surface outline-none transition-[border-color,box-shadow]',
            Icon && 'pl-10',
            rightElement && 'pr-11',
            'placeholder:text-on-surface-variant/70 focus:border-secondary-container focus:shadow-focus',
            error && 'border-error focus:border-error',
            className,
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={error || helperText ? messageId : undefined}
          {...props}
        />
        {rightElement ? <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</div> : null}
      </div>
      {error || helperText ? (
        <p id={messageId} className={cn('text-body-sm', error ? 'text-error' : 'text-on-surface-variant')}>
          {error || helperText}
        </p>
      ) : null}
    </div>
  );
}
