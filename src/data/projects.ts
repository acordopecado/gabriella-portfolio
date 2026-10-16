export interface Project {
  id: string;
  slug: string;
  title: string;
  year: string;
  behanceUrl: string;
  externalUrl?: string;
  imageUrl: string;
  localImageUrl: string;
  description: string;
  hasCustomPage?: boolean;
}

export const EDITORIAL_PROJECTS: Project[] = [
  {
    id: 'eleicoes-2026-1o-turno',
    slug: '2026-election-results-in-charts',
    title: 'Key 1st round results of the 2026 elections in charts',
    year: '2026',
    behanceUrl: 'https://www.jota.info/eleicoes/eleicoes-2026/os-principais-resultados-do-1o-turno-em-graficos',
    externalUrl: 'https://www.jota.info/eleicoes/eleicoes-2026/os-principais-resultados-do-1o-turno-em-graficos',
    imageUrl: 'https://images.jota.info/wp-content/uploads/2026/10/thumb-geral-governos-1.png',
    localImageUrl: '/projects/jota-eleicoes-2026.png',
    description: 'Visual reporting and comprehensive data infographics analyzing presidential, gubernatorial, and congressional results in the first round of the 2026 Brazilian elections for JOTA.',
  },
  {
    id: 'municipal-elections-2024',
    slug: 'municipal-elections-2024',
    title: 'Municipal elections 2024',
    year: '2024',
    behanceUrl: 'https://www.behance.net/gallery/219926721/Municipal-elections-2024',
    imageUrl: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/1cd472219926721.67ba28d9481fb.jpg',
    localImageUrl: '/projects/municipal-elections/02_onepager.jpg',
    description: 'Visual coverage of the Brazilian municipal elections featuring analytical infographics, electoral maps, and data visualization for JOTA.',
    hasCustomPage: true,
  },
  {
    id: 'a-cor-do-pecado',
    slug: 'the-color-of-sin',
    title: 'The color of sin',
    year: '2023',
    behanceUrl: 'https://www.behance.net/gallery/228295113/A-cor-do-pecado',
    imageUrl: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/2eb4f0228295113.685097cc335e9.png',
    localImageUrl: '/projects/color-of-sin/01_cover.png',
    description: 'Visual reporting and research investigating the influence of genetic ancestry, socioeconomic factors, and personal narratives in Brazilian racial self-identification.',
    hasCustomPage: true,
  },
  {
    id: 'pobreza-menstrual',
    slug: 'the-impacts-of-period-poverty',
    title: 'The impacts of period poverty',
    year: '2022',
    behanceUrl: 'https://www.behance.net/gallery/164717195/Os-impactos-da-pobreza-menstrual',
    externalUrl: 'https://www.nexojornal.com.br/grafico/2022/06/08/a-pobreza-menstrual-e-seus-impactos-no-brasil-e-no-mundo',
    imageUrl: 'https://nexo-uploads-beta.s3.amazonaws.com/wp-content/uploads/2023/11/29123826/teaser_binary_291141-640x399.png',
    localImageUrl: '/projects/period-poverty-nexo.png',
    description: 'Visual report and in-depth data infographics exploring sanitation vulnerabilities and socioeconomic impacts of period poverty in Brazil and globally.',
  },
  {
    id: 'irmaos-timotheo',
    slug: 'the-timotheo-brothers',
    title: 'The Timótheo brothers: precursors of modernism',
    year: '2022',
    behanceUrl: 'https://www.nexojornal.com.br/grafico/2022/02/15/a-trajetoria-dos-irmaos-timotheo-precursores-do-modernismo',
    externalUrl: 'https://www.nexojornal.com.br/grafico/2022/02/15/a-trajetoria-dos-irmaos-timotheo-precursores-do-modernismo',
    imageUrl: 'https://nexo-uploads-beta.s3.amazonaws.com/wp-content/uploads/2023/11/29131601/irmaos-timotheo-v02_-teaser_binary_278212-640x399.png',
    localImageUrl: '/projects/irmaos-timotheo.png',
    description: 'Infographic narrative and visual reporting investigating the life and artistic trajectory of João and Arthur Timótheo da Costa, acclaimed Black painters and precursors to Brazilian modernism.',
  },
];

export const BRANDING_PROJECTS: Project[] = [
  {
    id: 'forum-jota',
    slug: 'forum-jota',
    title: 'Forum JOTA',
    year: '2024',
    behanceUrl: 'https://www.behance.net/gallery/248368873/Forum-JOTA',
    imageUrl: 'https://mir-s3-cdn-cf.behance.net/project_modules/source/7052b5248368873.6a3f4dba7198b.gif',
    localImageUrl: '/projects/forum-jota/04_motion_loop.gif',
    description: 'Visual identity, graphic system, and motion design crafted for an institutional debate forum discussing public institutions, law, and economics.',
    hasCustomPage: true,
  },
];

export const ALL_PROJECTS: Project[] = [...EDITORIAL_PROJECTS, ...BRANDING_PROJECTS];

export function getProjectBySlug(slug: string): Project | undefined {
  if (slug === 'the-color-of-sin' || slug === 'a-cor-do-pecado') {
    return ALL_PROJECTS.find((p) => p.id === 'a-cor-do-pecado');
  }
  if (
    slug === 'the-timotheo-brothers' ||
    slug === 'irmaos-timotheo' ||
    slug === 'mulheres-nas-olimpiadas' ||
    slug === 'women-in-the-olympic-games'
  ) {
    return ALL_PROJECTS.find((p) => p.id === 'irmaos-timotheo');
  }
  if (slug === 'pobreza-menstrual' || slug === 'the-impacts-of-period-poverty') {
    return ALL_PROJECTS.find((p) => p.id === 'pobreza-menstrual');
  }
  if (
    slug === '2026-election-results-in-charts' ||
    slug === 'eleicoes-2026-1o-turno' ||
    slug === 'os-principais-resultados-do-1o-turno-em-graficos' ||
    slug === 'elections-2026'
  ) {
    return ALL_PROJECTS.find((p) => p.id === 'eleicoes-2026-1o-turno');
  }
  return ALL_PROJECTS.find((p) => p.slug === slug || p.id === slug);
}


