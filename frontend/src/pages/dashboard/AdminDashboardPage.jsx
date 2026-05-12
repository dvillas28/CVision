import {
  Activity,
  FileText,
  Gauge,
  Plus,
  Users,
} from 'lucide-react';
import { Badge, Button, Card, ProgressBar } from '../../components/ui/index.js';

const metrics = [
  {
    label: 'Total Users',
    value: '24,592',
    chip: '+12% vs month',
    icon: Users,
  },
  {
    label: 'CVs Created Today',
    value: '1,104',
    chip: 'Peak Hour',
    icon: FileText,
  },
  {
    label: 'ATS Average Score',
    value: '78.4%',
    progress: 78,
    icon: Gauge,
  },
];

const prompts = [
  {
    name: 'Optimizer_V4_Chile',
    status: 'Active',
    description:
      '"Actúa como un experto en reclutamiento chileno. Analiza el siguiente CV bajo los estándares de la BNE y sugiere mejoras para palabras clave ATS..."',
    edited: '2h ago',
    usage: '8.4k calls',
  },
  {
    name: 'Skills_Extractor_Base',
    status: 'Testing',
    description:
      '"Extrae las competencias técnicas y transversales del texto proporcionado. Mapea contra el catálogo de SENCE 2024..."',
    edited: 'Yesterday',
    usage: '256 calls',
  },
];

const activities = [
  {
    title: 'New User Registration',
    description: 'Roberto M. registered via BNE portal.',
    time: '2 minutes ago',
    tone: 'bg-secondary',
  },
  {
    title: 'CV Optimized (Score: 92)',
    description: 'Claudia V. successfully used Optimizer_V4.',
    time: '14 minutes ago',
    tone: 'bg-primary',
  },
  {
    title: 'System Update',
    description: 'ATS Engine parameters updated for Mining sector.',
    time: '1 hour ago',
    tone: 'bg-tertiary-fixed-dim',
  },
  {
    title: 'New User Registration',
    description: 'Francisca J. connected via ClaveÚnica.',
    time: '2 hours ago',
    tone: 'bg-secondary',
  },
];

const trendData = [
  { day: 'MON', value: 420, height: 'h-[40%]' },
  { day: 'TUE', value: 580, height: 'h-[55%]' },
  { day: 'WED', value: 510, height: 'h-[48%]' },
  { day: 'THU', value: 940, height: 'h-[85%]', active: true },
  { day: 'FRI', value: 760, height: 'h-[72%]' },
  { day: 'SAT', value: 620, height: 'h-[60%]' },
  { day: 'SUN', value: 520, height: 'h-[50%]' },
];

function MetricCard({ metric }) {
  const Icon = metric.icon;

  return (
    <Card className="dashboard-card-depth rounded-lg p-5">
      <div className="mb-3 flex items-start justify-between gap-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-container text-on-secondary-container">
          <Icon aria-hidden="true" size={21} />
        </span>
        {metric.progress ? (
          <div className="w-24 pt-2">
            <ProgressBar value={metric.progress} />
          </div>
        ) : (
          <Badge variant="primary" className="rounded px-2">
            {metric.chip}
          </Badge>
        )}
      </div>
      <p className="font-heading text-label-sm text-on-surface-variant">{metric.label}</p>
      <p className="mt-1 font-heading text-[30px] font-semibold leading-tight text-primary">{metric.value}</p>
    </Card>
  );
}

function MetricsGrid() {
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {metrics.map((metric) => (
        <MetricCard key={metric.label} metric={metric} />
      ))}
    </section>
  );
}

function PromptManagementCard() {
  return (
    <Card className="dashboard-card-depth rounded-lg p-5 md:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="font-heading text-[22px] font-medium leading-tight text-primary">Gestión de Prompts IA</h2>
        <Button className="h-9 rounded px-4 text-label-sm">
          <Plus aria-hidden="true" size={16} />
          New Prompt
        </Button>
      </div>

      <div className="space-y-3">
        {prompts.map((prompt) => (
          <article
            key={prompt.name}
            className="rounded border border-outline-variant p-3 transition-colors hover:bg-surface-container-low"
          >
            <div className="mb-2 flex items-start justify-between gap-4">
              <h3 className="font-heading text-label-md font-semibold text-primary">{prompt.name}</h3>
              <Badge variant="neutral" className="rounded px-2 uppercase tracking-[0.12em]">
                {prompt.status}
              </Badge>
            </div>
            <p className="line-clamp-2 text-body-sm italic text-on-surface-variant">{prompt.description}</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 font-heading text-label-sm text-outline">
              <span>Last edited: {prompt.edited}</span>
              <span>Usage: {prompt.usage}</span>
            </div>
          </article>
        ))}
      </div>
    </Card>
  );
}

function TrendsChartCard() {
  return (
    <Card className="dashboard-card-depth rounded-lg p-5 md:p-6">
      <h2 className="mb-5 font-heading text-[22px] font-medium leading-tight text-primary">CV Generation Trends</h2>
      <div className="flex h-52 items-end justify-between gap-2 px-2">
        {trendData.map((item) => (
          <div
            key={item.day}
            className={[
              'group relative flex-1 rounded-t-sm transition-colors',
              item.height,
              item.active ? 'bg-primary' : 'bg-surface-container-high hover:bg-secondary-container',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <span
              className={[
                'absolute -top-6 left-1/2 -translate-x-1/2 font-heading text-label-sm transition-opacity',
                item.active ? 'font-semibold opacity-100' : 'opacity-0 group-hover:opacity-100',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between px-2 font-heading text-label-sm text-outline">
        {trendData.map((item) => (
          <span key={item.day}>{item.day}</span>
        ))}
      </div>
    </Card>
  );
}

function RecentActivityCard() {
  return (
    <Card className="dashboard-card-depth rounded-lg p-5 md:p-6">
      <div className="mb-5 flex items-center gap-3">
        <Activity aria-hidden="true" size={20} className="text-secondary" />
        <h2 className="font-heading text-[22px] font-medium leading-tight text-primary">Recent Activity</h2>
      </div>

      <div className="space-y-5">
        {activities.map((activity) => (
          <article key={`${activity.title}-${activity.time}`} className="flex gap-4">
            <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${activity.tone}`} />
            <div>
              <h3 className="text-body-sm font-semibold text-primary">{activity.title}</h3>
              <p className="mt-1 text-body-sm text-on-surface-variant">{activity.description}</p>
              <p className="mt-1 font-heading text-label-sm text-outline">{activity.time}</p>
            </div>
          </article>
        ))}
      </div>

      <Button variant="secondary" className="mt-6 h-10 w-full rounded border-outline-variant text-on-surface-variant hover:bg-surface-container-low">
        View Audit Log
      </Button>
    </Card>
  );
}

export function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-[1180px] space-y-8 pl-0 pr-8">
      <MetricsGrid />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <section className="space-y-5 lg:col-span-7">
          <PromptManagementCard />
          <TrendsChartCard />
        </section>

        <section className="lg:col-span-5">
          <RecentActivityCard />
        </section>
      </div>
    </div>
  );
}
