import { cn } from '../../utils/cn.js';

export function ProgressBar({ value = 0, max = 100, label, showValue = false, className }) {
  const normalizedValue = Math.min(Math.max(value, 0), max);
  const percentage = max > 0 ? Math.round((normalizedValue / max) * 100) : 0;

  return (
    <div className={cn('w-full space-y-2', className)}>
      {label || showValue ? (
        <div className="flex items-center justify-between gap-4">
          {label ? <span className="font-heading text-label-md text-primary/80">{label}</span> : null}
          {showValue ? <span className="text-body-sm text-on-surface-variant">{percentage}%</span> : null}
        </div>
      ) : null}
      <progress
        className="h-2 w-full appearance-none overflow-hidden bg-secondary-fixed [&::-moz-progress-bar]:bg-primary-container [&::-webkit-progress-bar]:bg-secondary-fixed [&::-webkit-progress-value]:bg-primary-container"
        value={percentage}
        max={100}
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}
