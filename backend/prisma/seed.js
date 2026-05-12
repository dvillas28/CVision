import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const templates = [
  {
    name: 'Classic',
    slug: 'classic',
    category: 'institutional',
    description: 'Plantilla institucional estándar para perfiles profesionales generales.',
    config: {
      accentColor: '#416182',
      layout: 'single-column',
      sections: ['summary', 'experience', 'education', 'skills'],
    },
  },
  {
    name: 'Modern',
    slug: 'modern',
    category: 'balanced',
    description: 'Diseño limpio y balanceado para perfiles técnicos y profesionales jóvenes.',
    config: {
      accentColor: '#0b1f2a',
      layout: 'hybrid',
      sections: ['summary', 'experience', 'projects', 'skills', 'education'],
    },
  },
  {
    name: 'Tech',
    slug: 'tech',
    category: 'developer',
    description: 'Plantilla enfocada en roles tecnológicos, proyectos y habilidades técnicas.',
    config: {
      accentColor: '#294969',
      layout: 'two-column',
      sections: ['summary', 'technicalSkills', 'experience', 'projects', 'certifications'],
    },
  },
];

const prompts = [
  {
    name: 'Optimizer_V1_Chile',
    type: 'SECTION_OPTIMIZER',
    version: 1,
    status: 'ACTIVE',
    content:
      'Actua como experto en reclutamiento chileno y optimizacion ATS. Revisa la seccion enviada, conserva veracidad, mejora claridad, impacto y palabras clave compatibles con BNE/SENCE.',
  },
  {
    name: 'ATS_Analyzer_V1',
    type: 'ATS_ANALYZER',
    version: 1,
    status: 'ACTIVE',
    content:
      'Evalua el CV segun criterios ATS: estructura, claridad, palabras clave, cuantificacion de logros, datos de contacto y compatibilidad de formato. Devuelve score 0-100 e issues priorizados.',
  },
];

async function main() {
  for (const template of templates) {
    const savedTemplate = await prisma.template.upsert({
      where: { slug: template.slug },
      update: {
        name: template.name,
        category: template.category,
        description: template.description,
        config: template.config,
        isActive: true,
      },
      create: {
        ...template,
        isActive: true,
      },
    });

    await prisma.templateVersion.upsert({
      where: {
        templateId_versionNumber: {
          templateId: savedTemplate.id,
          versionNumber: 1,
        },
      },
      update: {
        config: template.config,
      },
      create: {
        templateId: savedTemplate.id,
        versionNumber: 1,
        config: template.config,
      },
    });
  }

  for (const prompt of prompts) {
    await prisma.aiPrompt.upsert({
      where: {
        name_version: {
          name: prompt.name,
          version: prompt.version,
        },
      },
      update: {
        type: prompt.type,
        status: prompt.status,
        content: prompt.content,
      },
      create: prompt,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
