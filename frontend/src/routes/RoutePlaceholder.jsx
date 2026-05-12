import { Card } from '../components/ui/Card.jsx';

export function RoutePlaceholder({ title, description }) {
  return (
    <Card className="mx-auto max-w-[720px]">
      <div className="space-y-3">
        <p className="font-heading text-label-sm uppercase text-on-surface-variant">CVision</p>
        <h1 className="font-heading text-headline-lg-mobile text-on-surface md:text-headline-lg">
          {title}
        </h1>
        <p className="text-body-md text-on-surface-variant">{description}</p>
      </div>
    </Card>
  );
}
