import {
  ArrowRight,
  Bolt,
  CheckCircle2,
  FileCheck2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { Badge, Button, Card } from '../components/ui/index.js';
import cvLandingPageImage from '../assets/img/CV_LandingPage.png';

const benefits = [
  {
    title: 'Impacto Profesional',
    description:
      'Analizamos tu perfil contra métricas de impacto para asegurar que cada palabra comunique potencial y foco profesional.',
    icon: TrendingUp,
  },
  {
    title: 'Velocidad IA',
    description:
      'Genera una base sólida de CV en minutos, con estructura clara, lenguaje profesional y formato listo para iterar.',
    icon: Bolt,
  },
  {
    title: 'Enfoque ATS',
    description:
      'Plantillas y recomendaciones diseñadas para sistemas de seguimiento de candidatos usados en procesos modernos.',
    icon: FileCheck2,
  },
];

const atsBullets = [
  'Optimización de palabras clave por industria.',
  'Formateo estándar legible por bots.',
  'Puntaje de compatibilidad en tiempo real.',
];

const templates = [
  {
    name: 'Executive Modern',
    tone: 'Institucional',
    rotation: '-rotate-2 hover:rotate-0',
    accent: 'bg-secondary',
  },
  {
    name: 'ATS Minimalist',
    tone: 'Alta legibilidad',
    rotation: 'scale-105',
    accent: 'bg-primary-container',
    featured: true,
  },
  {
    name: 'Tech Focused',
    tone: 'Tecnología',
    rotation: 'rotate-2 hover:rotate-0',
    accent: 'bg-on-secondary-container',
  },
];

function AvatarStack() {
  const avatars = ['JC', 'MS', 'AR'];

  return (
    <div className="flex -space-x-3">
      {avatars.map((avatar, index) => (
        <div
          key={avatar}
          className={[
            'flex h-10 w-10 items-center justify-center rounded-full border-2 border-surface font-heading text-label-sm text-on-primary',
            index === 0 && 'bg-primary-container',
            index === 1 && 'bg-secondary',
            index === 2 && 'bg-on-secondary-container',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {avatar}
        </div>
      ))}
    </div>
  );
}

function ResumeMockup() {
  return (
    <Card className="relative overflow-hidden rounded-xl p-6">
      <div className="absolute right-8 top-8 z-10 w-[220px] rounded border border-card-border border-t-4 border-t-ai-accent bg-white p-4 shadow-modal">
        <div className="mb-2 flex items-center gap-2">
          <Sparkles aria-hidden="true" size={15} className="text-secondary" />
          <span className="font-heading text-label-sm text-primary">Sugerencia IA</span>
        </div>
        <p className="text-[11px] leading-snug text-on-surface-variant">
          Reemplaza habilidades genéricas por logros medibles para aumentar el match.
        </p>
      </div>

      <div className="rounded-lg bg-surface-container-low p-3 md:p-4">
        <img
          src={cvLandingPageImage}
          alt="Mockup de currículum profesional CVision sobre escritorio con taza de café y lápiz."
          className="aspect-[4/3] w-full rounded object-cover object-center shadow-card"
        />
      </div>
    </Card>
  );
}

function AtsPanel() {
  return (
    <Card className="rounded-xl border-white/10 bg-white/5 p-6 shadow-none">
      <div className="mb-6 flex items-center justify-between">
        <span className="font-heading text-label-md text-on-primary">CV Strength Score</span>
        <span className="font-heading text-label-md text-secondary-fixed">94%</span>
      </div>
      <div className="mb-8 h-2 rounded-full bg-white/10">
        <div className="h-full w-[94%] rounded-full bg-secondary-fixed" />
      </div>
      <div className="space-y-4">
        <div className="rounded border border-white/5 bg-white/5 p-3">
          <p className="mb-1 font-heading text-[10px] uppercase tracking-[0.18em] text-white/50">Impact</p>
          <p className="font-heading text-label-md text-on-primary">Strong Action Verbs Found</p>
        </div>
        <div className="rounded border border-white/5 bg-white/5 p-3">
          <p className="mb-1 font-heading text-[10px] uppercase tracking-[0.18em] text-white/50">Keywords</p>
          <p className="font-heading text-label-md text-on-primary">Fullstack, React, Chile, BNE</p>
        </div>
      </div>
    </Card>
  );
}

function TemplatePreview({ template }) {
  return (
    <Card
      className={[
        'group w-full rounded-xl p-4 transition-transform duration-200 hover:-translate-y-1 md:w-1/3',
        template.rotation,
        template.featured && 'shadow-modal',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="rounded bg-surface-container-low p-4">
        <div className="mx-auto min-h-[280px] max-w-[220px] rounded-sm border border-outline-variant bg-white p-5 shadow-card">
          <div className={`mb-5 h-8 rounded-sm ${template.accent}`} />
          <div className="mb-5 space-y-2">
            <div className="h-3 w-28 rounded-sm bg-primary" />
            <div className="h-2 w-36 rounded-sm bg-secondary-fixed" />
          </div>
          <div className="space-y-2">
            <div className="h-2 rounded-sm bg-surface-container-highest" />
            <div className="h-2 rounded-sm bg-surface-container-highest" />
            <div className="h-2 w-10/12 rounded-sm bg-surface-container-highest" />
          </div>
          <div className="my-5 h-px bg-outline-variant" />
          <div className="space-y-2">
            <div className="h-2 w-24 rounded-sm bg-primary-container" />
            <div className="h-2 rounded-sm bg-surface-container-highest" />
            <div className="h-2 w-11/12 rounded-sm bg-surface-container-highest" />
            <div className="h-2 w-8/12 rounded-sm bg-surface-container-highest" />
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="font-heading text-label-md text-primary">{template.name}</p>
        <p className="mt-1 text-body-sm text-on-surface-variant">{template.tone}</p>
      </div>
    </Card>
  );
}

export function LandingPage() {
  return (
    <>
      <section className="mx-auto max-w-container px-margin-mobile py-20 md:px-gutter md:py-24 lg:px-margin-desktop">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-8">
            <Badge variant="secondary" className="h-7 rounded-full px-3">
              <Sparkles aria-hidden="true" size={14} />
              Potenciado por IA de última generación
            </Badge>
            <div className="space-y-5">
              <h1 className="max-w-[640px] font-heading text-[44px] font-semibold leading-[1.08] tracking-[-0.02em] text-on-background md:text-display">
                Tu próximo empleo comienza con un <span className="text-secondary">CV optimizado</span> por IA
              </h1>
              <p className="max-w-[560px] text-body-lg text-on-surface-variant">
                Nuestra tecnología analiza las vacantes del mercado chileno para destacar tus habilidades frente a los algoritmos de selección más exigentes.
              </p>
            </div>
            <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
              <Button className="btn-hero-arrow h-14 rounded px-8">
                Crear mi CV
                <ArrowRight aria-hidden="true" size={18} />
              </Button>
              <Button variant="secondary" className="h-14 rounded px-8">
                Ver Plantillas
              </Button>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <AvatarStack />
              <p className="font-heading text-label-sm text-on-surface-variant">
                +10,000 profesionales ya han optimizado su carrera
              </p>
            </div>
          </div>
          <ResumeMockup />
        </div>
      </section>

      <section id="benefits" className="bg-surface-container-low py-24">
        <div className="mx-auto max-w-container px-margin-mobile md:px-gutter lg:px-margin-desktop">
          <div className="mb-16 text-center">
            <h2 className="font-heading text-headline-lg text-primary">¿Por qué elegir CVision?</h2>
            <p className="mt-4 text-body-md text-on-surface-variant">
              Diseñado para los estándares de contratación modernos.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <Card key={benefit.title} className="group rounded-xl p-8 transition-colors hover:border-secondary">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded bg-secondary-container/40 text-secondary transition-transform group-hover:scale-105">
                    <Icon aria-hidden="true" size={22} />
                  </div>
                  <h3 className="font-heading text-headline-md text-primary">{benefit.title}</h3>
                  <p className="mt-3 text-body-sm text-on-surface-variant">{benefit.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="ats" className="mx-auto max-w-container px-margin-mobile py-24 md:px-gutter lg:px-margin-desktop">
        <div className="grid gap-12 rounded-xl border border-primary bg-primary-container p-8 md:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:p-16">
          <div>
            <h2 className="font-heading text-headline-lg text-on-primary">¿Qué es el ATS y por qué importa?</h2>
            <p className="mt-6 max-w-[640px] text-body-lg text-primary-fixed-dim">
              El 75% de los CVs son rechazados por un Applicant Tracking System antes de que un reclutador humano los vea. Nuestra IA formatea tu información para que estos sistemas te califiquen mejor.
            </p>
            <ul className="mt-8 space-y-4">
              {atsBullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-3 font-heading text-label-md text-on-primary">
                  <CheckCircle2 aria-hidden="true" size={18} className="text-secondary-fixed" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
          <AtsPanel />
        </div>
      </section>

      <section id="templates" className="bg-surface py-24">
        <div className="mx-auto max-w-container px-margin-mobile text-center md:px-gutter lg:px-margin-desktop">
          <h2 className="mb-16 font-heading text-headline-lg text-primary">Diseños que abren puertas</h2>
          <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
            {templates.map((template) => (
              <TemplatePreview key={template.name} template={template} />
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-surface-container-lowest py-24 text-center">
        <div className="mx-auto flex max-w-container flex-col items-center gap-8 px-margin-mobile md:px-gutter lg:px-margin-desktop">
          <ShieldCheck aria-hidden="true" size={36} className="text-secondary" />
          <h2 className="max-w-[720px] font-heading text-[40px] font-semibold leading-[1.12] tracking-[-0.02em] text-primary md:text-display">
            ¿Listo para dar el siguiente paso en tu carrera?
          </h2>
          <Button className="btn-cta-sheen h-14 rounded px-12">Crear mi CV ahora</Button>
          <p className="text-body-sm text-on-surface-variant">
            Es gratis comenzar. No requiere tarjeta de crédito.
          </p>
        </div>
      </section>
    </>
  );
}

export function LandingFooterLogos() {
  return (
    <>
      <div className="flex h-8 w-24 items-center justify-center rounded bg-on-surface-variant/10 font-heading text-[10px] font-semibold text-on-surface-variant">
        BNE CHILE
      </div>
      <div className="flex h-8 w-24 items-center justify-center rounded bg-on-surface-variant/10 font-heading text-[10px] font-semibold text-on-surface-variant">
        SENCE
      </div>
    </>
  );
}
