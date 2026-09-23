/**
 * ARCHIVO: src/app/models/skill.model.ts
 *
 * DESCRIPCIÓN:
 * Modelo de datos para las competencias técnicas de Alejandro Villa.
 * Alineado con su perfil real: Ingeniero Informático con 3 áreas (Soporte de Aplicaciones/TI,
 * Desarrollo y Datos), sin inflar años ni agregar tecnologías que no usa de verdad.
 * Sin inflar años ni agregar tecnologías que no usa de verdad.
 */

/**
 * Interfaz principal para competencias técnicas
 */
export interface Skill {
  /** ID único de la competencia */
  id: string;

  /** Nombre de la tecnología/habilidad */
  name: string;

  /** Categoría de la competencia */
  category: SkillCategory;

  /** Nivel basado en experiencia práctica */
  level: SkillLevel;

  /** Años de experiencia práctica */
  yearsOfExperience: number;

  /** Descripción de la experiencia en esta competencia */
  description: string;

  /** Proyectos donde se aplicó esta competencia */
  projectsUsed: string[];

  /** Icono para la UI (Ionicon) */
  icon?: string;

  /** Color para visualización en la UI */
  color?: string;

  /** Si es una competencia destacada en el perfil */
  featured: boolean;

  /** Orden de visualización dentro de su categoría */
  displayOrder: number;
}

/**
 * Categorías de competencias técnicas
 */
export type SkillCategory =
  | 'infrastructure'
  | 'analysis'
  | 'development'
  | 'management'
  | 'tools';

/**
 * Niveles de competencia (sin "learning" para no inflar)
 */
export type SkillLevel = 'advanced' | 'intermediate';

/**
 * Competencias de Alejandro Villa
 * Alineadas con experiencia real (Soporte de Aplicaciones/TI, Desarrollo, Datos).
 */
export const ALEJANDRO_SKILLS: Skill[] = [
  // ========================================
  // INFRAESTRUCTURA Y SOPORTE (ADVANCED)
  // ========================================
  {
    id: 'hardware-repair',
    name: 'Reparación y mantención de equipos',
    category: 'infrastructure',
    level: 'advanced',
    yearsOfExperience: 10,
    description: 'Experiencia sólida en diagnóstico, reparación y mantención de PC y notebooks, desde fallas básicas hasta problemas más complejos.',
    projectsUsed: [],
    icon: 'hardware-chip',
    color: '#FF6B35',
    featured: true,
    displayOrder: 1
  },
  {
    id: 'network-config',
    name: 'Configuración de Redes',
    category: 'infrastructure',
    level: 'advanced',
    yearsOfExperience: 5,
    description: 'Más de 5 años configurando redes domiciliarias (TCP/IP, routers, Wi-Fi) y 3 años en contexto empresarial/corporativo: segmentación básica, conectividad IP y diagnóstico.',
    projectsUsed: [],
    icon: 'wifi',
    color: '#4ECDC4',
    featured: true,
    displayOrder: 2
  },
  {
    id: 'system-administration',
    name: 'Administración de Sistemas (Windows)',
    category: 'infrastructure',
    level: 'advanced',
    yearsOfExperience: 10,
    description: 'Experiencia avanzada en Windows de escritorio (XP a 11): instalación, formateo, clonación, migración de sistemas y resolución de incidencias. Exposición mínima/básica a Windows Server.',
    projectsUsed: [],
    icon: 'desktop-outline',
    color: '#45B7D1',
    featured: true,
    displayOrder: 3
  },
  {
    id: 'technical-support',
    name: 'Soporte Técnico',
    category: 'infrastructure',
    level: 'advanced',
    yearsOfExperience: 5,
    description: 'Gestión de tickets, atención a usuarios, diagnóstico remoto y resolución de incidentes N1–N2, cumpliendo SLA y estándares de servicio.',
    projectsUsed: [],
    icon: 'help-circle-outline',
    color: '#96CEB4',
    featured: true,
    displayOrder: 4
  },
  {
    id: 'active-directory',
    name: 'Active Directory',
    category: 'infrastructure',
    level: 'advanced',
    yearsOfExperience: 3,
    description: 'Administración de usuarios, permisos, grupos y accesos en Active Directory, incluyendo resolución de problemas de autenticación.',
    projectsUsed: [],
    icon: 'people-circle-outline',
    color: '#0078D4',
    featured: true,
    displayOrder: 5
  },
  {
    id: 'linux-ubuntu',
    name: 'Ubuntu / Linux (nivel básico)',
    category: 'infrastructure',
    level: 'intermediate',
    yearsOfExperience: 1,
    description: 'Uso básico de terminal en Ubuntu/Linux (navegación, comandos esenciales), sin experiencia formal de administración de servidores. Nivel junior, en contraste con su experiencia avanzada en Windows.',
    projectsUsed: [],
    icon: 'terminal-outline',
    color: '#E95420',
    featured: false,
    displayOrder: 6
  },

  // ========================================
  // ANÁLISIS DE SISTEMAS / QA (INTERMEDIATE)
  // ========================================
  {
    id: 'business-analysis',
    name: 'Análisis de Negocio',
    category: 'analysis',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Traducción de requerimientos de negocio a necesidades técnicas, entendiendo impacto en procesos y usuarios.',
    projectsUsed: [],
    icon: 'business-outline',
    color: '#6C5CE7',
    featured: true,
    displayOrder: 1
  },
  {
    id: 'requirements-gathering',
    name: 'Levantamiento de Requerimientos',
    category: 'analysis',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Reuniones con usuarios, documentación de requerimientos y aclaración de dudas funcionales en proyectos de sistemas.',
    projectsUsed: [],
    icon: 'document-text-outline',
    color: '#FFEAA7',
    featured: true,
    displayOrder: 2
  },
  {
    id: 'process-mapping',
    name: 'Mapeo de Procesos Empresariales',
    category: 'analysis',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Análisis de flujos de trabajo, diagramas de procesos y detección de puntos de mejora en operaciones.',
    projectsUsed: [],
    icon: 'git-network-outline',
    color: '#DDA0DD',
    featured: true,
    displayOrder: 3
  },
  {
    id: 'data-analysis',
    name: 'Análisis de Datos',
    category: 'analysis',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Detección, validación y limpieza de datos (incluye un caso real con más de 30.000 registros y cerca de 500 duplicados detectados vía SQL/Python) para apoyar decisiones, reportes y revisión de indicadores (KPI/KRI).',
    projectsUsed: [],
    icon: 'analytics-outline',
    color: '#74B9FF',
    featured: true,
    displayOrder: 4
  },
  {
    id: 'excel-avanzado',
    name: 'Excel Avanzado',
    category: 'analysis',
    level: 'advanced',
    yearsOfExperience: 2,
    description: 'Tablas dinámicas, Power Query, BUSCARV/BUSCARX, ÍNDICE+COINCIDIR, funciones condicionales y de fecha, filtros y gráficos para limpieza y análisis de datos.',
    projectsUsed: [],
    icon: 'grid-outline',
    color: '#217346',
    featured: true,
    displayOrder: 5
  },
  {
    id: 'business-intelligence',
    name: 'Inteligencia de Negocios (fundamentos de BI)',
    category: 'analysis',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Fundamentos de inteligencia de negocios aplicados a indicadores (KPI/KRI) y modelos de datos, en el contexto de procesos de gestión de procesos de negocio y análisis de estado actual/futuro.',
    projectsUsed: [],
    icon: 'bar-chart-outline',
    color: '#00B894',
    featured: false,
    displayOrder: 6
  },
  {
    id: 'qa-functional-testing',
    name: 'Pruebas de Software (QA funcional y regresión)',
    category: 'analysis',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Diseño y ejecución de pruebas funcionales y de regresión sobre aplicaciones internas, validando flujos completos, datos y reglas de negocio.',
    projectsUsed: [],
    icon: 'bug-outline',
    color: '#FF7675',
    featured: true,
    displayOrder: 7
  },

  // ========================================
  // DESARROLLO (INTERMEDIATE)
  // ========================================
  {
    id: 'angular',
    name: 'Angular',
    category: 'development',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Desarrollo de aplicaciones SPA con Angular 18: componentes, servicios, routing y consumo de APIs REST.',
    projectsUsed: [],
    icon: 'logo-angular',
    color: '#DD0031',
    featured: true,
    displayOrder: 1
  },
  {
    id: 'ionic',
    name: 'Ionic',
    category: 'development',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Desarrollo de apps móviles híbridas con Ionic 8, usando componentes UI modernos y navegación en múltiples pantallas.',
    projectsUsed: [],
    icon: 'phone-portrait-outline',
    color: '#3880FF',
    featured: true,
    displayOrder: 2
  },
  {
    id: 'firebase',
    name: 'Firebase',
    category: 'development',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Uso de Firebase (Auth, Firestore, Hosting) como backend para aplicaciones Angular/Ionic y proyectos personales.',
    projectsUsed: [],
    icon: 'flame-outline',
    color: '#FFCA28',
    featured: true,
    displayOrder: 3
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'development',
    level: 'intermediate',
    yearsOfExperience: 1,
    description: 'Tipado fuerte, interfaces y clases en proyectos Angular e Ionic, reforzado con apoyo de herramientas de IA para acelerar el aprendizaje y resolver dudas puntuales.',
    projectsUsed: [],
    icon: 'code-slash-outline',
    color: '#3178C6',
    featured: true,
    displayOrder: 4
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'development',
    level: 'intermediate',
    yearsOfExperience: 1,
    description: 'Uso de Node.js para scripts y backend básico en proyectos frontend, apoyado en herramientas de IA para acelerar el aprendizaje y resolver dudas puntuales.',
    projectsUsed: [],
    icon: 'logo-nodejs',
    color: '#68A063',
    featured: true,
    displayOrder: 5
  },
  {
    id: 'python',
    name: 'Python',
    category: 'development',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Fundamentos de Python aplicados a scripts de automatización y ejercicios de análisis de datos en contexto académico y de capacitación.',
    projectsUsed: [],
    icon: 'logo-python',
    color: '#3776AB',
    featured: true,
    displayOrder: 6
  },
  {
    id: 'django',
    name: 'Django',
    category: 'development',
    level: 'intermediate',
    yearsOfExperience: 1,
    description: 'Fundamentos de Django a nivel junior para desarrollo backend, reforzados en la formación Python Full Stack (ECAS Otec/SENCE).',
    projectsUsed: [],
    icon: 'code-slash-outline',
    color: '#092E20',
    featured: true,
    displayOrder: 7
  },
  {
    id: 'php',
    name: 'PHP',
    category: 'development',
    level: 'intermediate',
    yearsOfExperience: 1,
    description: 'Desarrollo web básico con PHP en contexto universitario, conexión a bases de datos y formularios.',
    projectsUsed: [],
    icon: 'logo-php',
    color: '#777BB4',
    featured: false,
    displayOrder: 8
  },
  {
    id: 'html-css',
    name: 'HTML5 & CSS3',
    category: 'development',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Maquetación con HTML5 semántico y CSS3, uso de Flexbox, Grid y estilos responsivos.',
    projectsUsed: [],
    icon: 'logo-html5',
    color: '#E34F26',
    featured: false,
    displayOrder: 9
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'development',
    level: 'intermediate',
    yearsOfExperience: 1,
    description: 'JavaScript moderno (ES6+), manipulación del DOM y uso de async/await para llamadas asíncronas.',
    projectsUsed: [],
    icon: 'logo-javascript',
    color: '#F7DF1E',
    featured: false,
    displayOrder: 10
  },

  // ========================================
  // BASES DE DATOS (INTERMEDIATE)
  // ========================================
  {
    id: 'sql',
    name: 'SQL',
    category: 'development',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Modelado básico de datos, consultas SQL, joins y normalización hasta tercera forma normal.',
    projectsUsed: [],
    icon: 'server-outline',
    color: '#336791',
    featured: true,
    displayOrder: 11
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'development',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Creación de esquemas, tablas y consultas en MySQL para proyectos académicos y personales.',
    projectsUsed: [],
    icon: 'logo-mysql',
    color: '#4479A1',
    featured: false,
    displayOrder: 12
  },

  // ========================================
  // GESTIÓN DE PROYECTOS (INTERMEDIATE)
  // ========================================
  {
    id: 'technical-coordination',
    name: 'Coordinación Técnica',
    category: 'management',
    level: 'intermediate',
    yearsOfExperience: 3,
    description: 'Coordinación entre equipos técnicos y usuarios, seguimiento de tareas y comunicación de estado.',
    projectsUsed: [],
    icon: 'people-outline',
    color: '#6C5CE7',
    featured: true,
    displayOrder: 1
  },
  {
    id: 'training',
    name: 'Capacitación y Desarrollo',
    category: 'management',
    level: 'intermediate',
    yearsOfExperience: 5,
    description: 'Capacitación a nuevos integrantes de equipo, documentación de procesos y apoyo en la curva de aprendizaje.',
    projectsUsed: [],
    icon: 'school-outline',
    color: '#00CEC9',
    featured: true,
    displayOrder: 2
  },
  {
    id: 'agile-methodologies',
    name: 'Metodologías Ágiles',
    category: 'management',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Uso de Scrum a nivel básico: dailies, seguimiento de tareas y participación en ciclos iterativos.',
    projectsUsed: [],
    icon: 'refresh-outline',
    color: '#FD79A8',
    featured: false,
    displayOrder: 3
  },

  // ========================================
  // HERRAMIENTas (TOOLS)
  // ========================================
  {
    id: 'git',
    name: 'Git',
    category: 'tools',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Uso de Git para control de versiones en proyectos personales y académicos (GitHub, GitLab).',
    projectsUsed: [],
    icon: 'git-branch-outline',
    color: '#F1502F',
    featured: false,
    displayOrder: 1
  },
  {
    id: 'postman',
    name: 'Postman',
    category: 'tools',
    level: 'intermediate',
    yearsOfExperience: 1,
    description: 'Pruebas de APIs REST, creación de colecciones, validación de respuestas y soporte a QA técnico.',
    projectsUsed: [],
    icon: 'cloud-outline',
    color: '#FF9F43',
    featured: true,
    displayOrder: 2
  },
  {
    id: 'jira',
    name: 'Jira',
    category: 'tools',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Uso de Jira para gestión de incidencias, seguimiento de bugs y coordinación con equipos de desarrollo.',
    projectsUsed: [],
    icon: 'checkbox-outline',
    color: '#0984E3',
    featured: true,
    displayOrder: 3
  },
  {
    id: 'glpi',
    name: 'GLPI',
    category: 'tools',
    level: 'advanced',
    yearsOfExperience: 1,
    description: 'Gestión de tickets, incidencias y activos TI en GLPI bajo SLA, en soporte técnico N1/N2 corporativo.',
    projectsUsed: [],
    icon: 'ticket-outline',
    color: '#89AC76',
    featured: true,
    displayOrder: 4
  },
  {
    id: 'servicenow',
    name: 'ServiceNow',
    category: 'tools',
    level: 'intermediate',
    yearsOfExperience: 1,
    description: 'Gestión avanzada de tickets e incidencias en ServiceNow: seguimiento, priorización, escalamiento y cierre bajo SLA.',
    projectsUsed: [],
    icon: 'construct-outline',
    color: '#62D84E',
    featured: true,
    displayOrder: 5
  },
  {
    id: 'remote-support-tools',
    name: 'Herramientas de Soporte Remoto',
    category: 'tools',
    level: 'advanced',
    yearsOfExperience: 5,
    description: 'Toma de control remoto de equipos para diagnóstico y resolución de incidentes con AnyDesk, TeamViewer y Dameware Mini Remote Control.',
    projectsUsed: [],
    icon: 'desktop-outline',
    color: '#00A1E0',
    featured: true,
    displayOrder: 6
  },
  {
    id: 'ai-tools',
    name: 'Herramientas de IA',
    category: 'tools',
    level: 'intermediate',
    yearsOfExperience: 2,
    description: 'Uso de herramientas como ChatGPT, Copilot y similares para apoyar análisis, documentación y desarrollo.',
    projectsUsed: [],
    icon: 'bulb-outline',
    color: '#A29BFE',
    featured: true,
    displayOrder: 7
  },
  {
    id: 'office-365',
    name: 'Office 365',
    category: 'tools',
    level: 'advanced',
    yearsOfExperience: 10,
    description: 'Uso avanzado de Excel, Word, PowerPoint y Teams para documentación, reportes y colaboración.',
    projectsUsed: [],
    icon: 'document-outline',
    color: '#D83B01',
    featured: false,
    displayOrder: 8
  }
];

/**
 * Helper functions para organizar y filtrar skills
 */

/** Retorna las skills de una categoría, ordenadas por displayOrder */
export function getSkillsByCategory(category: SkillCategory): Skill[] {
  return ALEJANDRO_SKILLS
    .filter(skill => skill.category === category)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

/** Retorna las skills marcadas como destacadas, ordenadas por años de experiencia */
export function getFeaturedSkills(): Skill[] {
  return ALEJANDRO_SKILLS
    .filter(skill => skill.featured)
    .sort((a, b) => b.yearsOfExperience - a.yearsOfExperience);
}

/** Retorna las skills según nivel (advanced / intermediate) */
export function getSkillsByLevel(level: SkillLevel): Skill[] {
  return ALEJANDRO_SKILLS.filter(skill => skill.level === level);
}

/** Retorna el máximo de años de experiencia dentro de una categoría */
export function getTotalYearsInCategory(category: SkillCategory): number {
  const categorySkills = getSkillsByCategory(category);
  return Math.max(...categorySkills.map(skill => skill.yearsOfExperience));
}

/**
 * Helper para obtener skills más importantes para el HOME
 * Representa las 3 áreas del posicionamiento actual (Soporte, Desarrollo, Datos)
 * con una selección equilibrada, sin llenar el home de tecnologías.
 */
export function getHomeDisplaySkills(): Skill[] {
  // Retorna las skills más relevantes para mostrar en el home
  return ALEJANDRO_SKILLS
    .filter(skill =>
      skill.featured &&
      [
        // Soporte de Aplicaciones / TI
        'active-directory',
        'glpi',
        'technical-support',
        // Desarrollo
        'angular',
        'ionic',
        'firebase',
        // Datos
        'python',
        'sql',
        'excel-avanzado'
      ].includes(skill.id)
    )
    .sort((a, b) => b.yearsOfExperience - a.yearsOfExperience)
    .slice(0, 9); // Máximo 9 para home (3 por cada área)
}

/**
 * Configuración de categorías para la UI
 */
export const SKILL_CATEGORIES = [
  {
    id: 'infrastructure' as SkillCategory,
    name: 'Infraestructura y Soporte',
    description: 'AVANZADO - más de 5 años de experiencia práctica.',
    icon: 'hardware-chip',
    color: '#FF6B35',
    featured: true
  },
  {
    id: 'analysis' as SkillCategory,
    name: 'Análisis de Sistemas, QA y Datos',
    description: 'INTERMEDIO/AVANZADO - análisis funcional, procesos, pruebas de software y análisis de datos con SQL, Python y Excel.',
    icon: 'analytics-outline',
    color: '#74B9FF',
    featured: true
  },
  {
    id: 'development' as SkillCategory,
    name: 'Desarrollo',
    description: 'INTERMEDIO - desarrollo web y móvil con enfoque frontend.',
    icon: 'code-slash-outline',
    color: '#00B894',
    featured: true
  },
  {
    id: 'management' as SkillCategory,
    name: 'Gestión de Proyectos',
    description: 'INTERMEDIO - coordinación técnica y trabajo en equipo.',
    icon: 'people-outline',
    color: '#6C5CE7',
    featured: true
  },
  {
    id: 'tools' as SkillCategory,
    name: 'Herramientas',
    description: 'VARIADO - herramientas de soporte, QA y productividad.',
    icon: 'construct-outline',
    color: '#A29BFE',
    featured: false
  }
];
