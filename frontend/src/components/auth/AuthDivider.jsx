export function AuthDivider({ label = 'O continuar con' }) {
  return (
    <div className="flex items-center py-2">
      <div className="h-px flex-1 bg-outline-variant" />
      <span className="mx-4 shrink-0 font-heading text-label-sm text-on-surface-variant">{label}</span>
      <div className="h-px flex-1 bg-outline-variant" />
    </div>
  );
}
