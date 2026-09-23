/**
 * ARCHIVO: src/app/models/project.model.ts
 * 
 * DESCRIPCIÓN:
 * Modelo de datos para los proyectos del portafolio de Alejandro Villa.
 * Define la estructura de proyectos profesionales, académicos y creativos
 * incluyendo información técnica, enlaces, capturas y descripciones detalladas.
 * ACTUALIZADO: Soporte completo para WADs de DOOM con videos y modales personalizados.
 */

/**
 * Interfaz principal para proyectos del portafolio
 * Cubre proyectos profesionales, académicos y creativos (WADs)
 */
export interface Project {
  /** ID único del proyecto */
  id: string;
  
  /** Nombre del proyecto */
  title: string;
  
  /** Descripción corta para cards */
  shortDescription: string;
  
  /** Descripción detallada del proyecto */
  fullDescription: string;
  
  /** Categoría del proyecto (origen: profesional/académico/personal/creativo) */
  category: ProjectCategory;

  /**
   * Área(s) profesional(es) que demuestra el proyecto (Desarrollo/Datos/Soporte).
   * Es independiente de `category`: un proyecto puede pertenecer a varias áreas
   * a la vez (ej: el SRM es Desarrollo y también Datos por su QA/validación de datos).
   * Se usa para el filtro "Desarrollo / Datos / Sistemas-Soporte" de la sección de Proyectos.
   */
  areas: ProjectArea[];

  /** Tipo específico del proyecto */
  type: ProjectType;
  
  /** Stack tecnológico utilizado */
  technologies: Technology[];
  
  /** URLs y enlaces relacionados */
  links: ProjectLinks;
  
  /** Imágenes del proyecto */
  images: ProjectImages;
  
  /** Fechas del proyecto */
  dates: ProjectDates;
  
  /** Rol desempeñado en el proyecto */
  role: string;
  
  /** Cliente o organización */
  client?: string;
  
  /** Estado del proyecto */
  status: ProjectStatus;
  
  /** Logros y resultados específicos */
  achievements: string[];
  
  /** Desafíos técnicos enfrentados */
  challenges: string[];
  
  /** Destacar en portafolio */
  featured: boolean;
  
  /** Orden de visualización */
  displayOrder: number;
  
  /** URL de video de YouTube (para WADs) */
  videoUrl?: string;
  
  /** Indica si el WAD está disponible para descarga */
  wadAvailable?: boolean;
  
  /** Imagen de fondo para modal personalizado */
  modalBackgroundImage?: string;
  
  /** Motor de juego requerido (ej: Zandronum) */
  engineRequired?: string;
  
  /** Juego base requerido (ej: DOOM II) */
  requiredGame?: string;
  
  /** Características especiales del proyecto */
  features?: string[];
  
  /** Instrucciones de instalación */
  installInstructions?: string[];
}

/**
 * Categorías principales de proyectos (origen del proyecto)
 */
export type ProjectCategory = 'professional' | 'academic' | 'creative' | 'personal';

/**
 * Áreas profesionales que un proyecto puede demostrar (independiente de `category`).
 * Usadas para el filtro "Todos / Desarrollo / Datos / Sistemas-Soporte".
 */
export type ProjectArea = 'development' | 'data' | 'support';

/**
 * Tipos específicos de proyectos
 */
export type ProjectType = 
  | 'web-application' 
  | 'mobile-app' 
  | 'system-modernization'
  | 'process-analysis'
  | 'academic-project'
  | 'game-mod'
  | 'tool-development';

/**
 * Estado actual del proyecto
 */
export type ProjectStatus = 'completed' | 'in-production' | 'maintenance' | 'archived';

/**
 * Interfaz para tecnologías utilizadas
 */
export interface Technology {
  /** Nombre de la tecnología */
  name: string;
  
  /** Versión específica utilizada */
  version?: string;
  
  /** Categoría de la tecnología */
  category: TechCategory;
  
  /** Icono o imagen representativa */
  icon?: string;
  
  /** Color asociado para UI */
  color?: string;
}

/**
 * Categorías de tecnologías
 */
export type TechCategory = 
  | 'frontend' 
  | 'backend' 
  | 'database' 
  | 'cloud' 
  | 'tools' 
  | 'mobile'
  | 'game-engine';

/**
 * Enlaces relacionados al proyecto
 */
export interface ProjectLinks {
  /** URL del proyecto en vivo */
  live?: string;
  
  /** Repositorio de código (si es público) */
  repository?: string;
  
  /** Enlace a demo o presentación */
  demo?: string;
  
  /** Documentación del proyecto */
  documentation?: string;
  
  /** Archivo descargable (para WADs) */
  download?: string;
  
  /** Video explicativo */
  video?: string;
  
  /** Caso de estudio detallado */
  caseStudy?: string;
}

/**
 * Imágenes del proyecto
 */
export interface ProjectImages {
  /** Imagen principal/thumbnail */
  thumbnail: string;
  
  /** Capturas de pantalla adicionales */
  screenshots: string[];
  
  /** Logo del proyecto */
  logo?: string;
  
  /** Imagen de arquitectura/diagrama */
  architecture?: string;
}

/**
 * Fechas relevantes del proyecto
 */
export interface ProjectDates {
  /** Fecha de inicio */
  startDate: Date;
  
  /** Fecha de finalización */
  endDate?: Date;
  
  /** Fecha de lanzamiento/producción */
  launchDate?: Date;
  
  /** Última actualización */
  lastUpdate?: Date;
}

/**
 * Datos específicos de proyectos profesionales reales de Alejandro
 * Basado en la información del prompt
 */
export const ALEJANDRO_PROJECTS: Project[] = [
  {
    id: 'srm-portal-superacion',
    title: 'Sistema SRM - Portal Superación de la Pobreza',
    shortDescription: 'Modernización completa de sistema legacy crítico con Angular, Ionic y Firebase',
    fullDescription: 'Coordinación técnica y análisis de procesos para reemplazo de sistema on-premise con fallas constantes. Implementación de arquitectura moderna en la nube con eliminación total de caídas del sistema. Incluyó formularios, validaciones, navegación, gestión de postulaciones/documentos, QA funcional y reglas de negocio.',
    category: 'professional',
    areas: ['development'],
    type: 'system-modernization',
    technologies: [
      { name: 'Angular', version: '18', category: 'frontend', color: '#dd0031' },
      { name: 'Ionic', version: '8', category: 'mobile', color: '#3880ff' },
      { name: 'Firebase', version: '11', category: 'cloud', color: '#ffca28' },
      { name: 'TypeScript', version: '5.4', category: 'frontend', color: '#3178c6' }
    ],
    links: {
      live: 'https://portal-superacionpobreza.web.app/tesis-pais'
    },
    images: {
      thumbnail: 'assets/projects/srm-portal-thumb.jpg',
      screenshots: [
        'assets/projects/srm-portal-1.jpg',
        'assets/projects/srm-portal-2.jpg'
      ]
    },
    dates: {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2025-01-01'),
      launchDate: new Date('2024-12-01')
    },
    role: 'Analista Desarrollador y Especialista en Infraestructura TI',
    client: 'Fundación Superación de la Pobreza',
    status: 'in-production',
    achievements: [
      'Sistema funcionando en producción sin caídas',
      'Eliminación completa de fallas del sistema legacy',
      'Modernización exitosa de infraestructura crítica',
      'Coordinación efectiva entre múltiples stakeholders'
    ],
    challenges: [
      'Migración de datos críticos sin downtime',
      'Coordinación con diferentes áreas organizacionales',
      'Análisis de procesos complejos existentes'
    ],
    featured: true,
    displayOrder: 1
  },
  {
    id: 'sistema-unidad-territorial',
    title: 'Sistema Unidad Territorial - Proyecto de Título',
    shortDescription: 'Proyecto académico de alta complejidad técnica con gestión integral de datos',
    fullDescription: 'Desarrollo completo de sistema para gestión territorial como proyecto de título de Ingeniería Informática. Implementación de arquitectura robusta con manejo avanzado de datos geoespaciales.',
    category: 'academic',
    areas: ['development'],
    type: 'web-application',
    technologies: [
      { name: 'Angular', category: 'frontend', color: '#dd0031' },
      { name: 'Ionic', category: 'mobile', color: '#3880ff' },
      { name: 'Firebase', category: 'cloud', color: '#ffca28' },
      { name: 'Node.js', category: 'backend', color: '#68a063' }
    ],
    links: {
      live: 'https://sistema-unidad-terrritorial.web.app/#/login'
    },
    images: {
      thumbnail: 'assets/projects/unidad-territorial-thumb.jpg',
      screenshots: [
        'assets/projects/unidad-territorial-1.jpg',
        'assets/projects/unidad-territorial-2.jpg'
      ]
    },
    dates: {
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-12-01')
    },
    role: 'Desarrollador y Analista Principal',
    client: 'DuocUC - Proyecto de Título',
    status: 'completed',
    achievements: [
      'Proyecto académico de máxima complejidad técnica',
      'Implementación exitosa de arquitectura escalable',
      'Integración de múltiples servicios de Firebase'
    ],
    challenges: [
      'Manejo de datos geoespaciales complejos',
      'Optimización de performance para grandes datasets',
      'Implementación de autenticación y autorización robusta'
    ],
    featured: true,
    displayOrder: 2
  },
  {
    id: 'deteccion-registros-duplicados',
    title: 'Detección y Depuración de Registros Duplicados',
    shortDescription: 'Caso real de limpieza de datos: SQL + Python sobre más de 30.000 registros previo al lanzamiento de un nuevo portal',
    fullDescription: 'Caso de validación y limpieza de datos realizado como parte de la preparación/migración de información hacia un nuevo portal. Sobre una base de más de 30.000 registros, se aplicaron consultas SQL y un script en Python para detectar cerca de 500 registros duplicados o inconsistentes, dejándolos identificados para su revisión y depuración antes de la puesta en marcha. No se exponen datos reales, nombres, RUT ni información interna: se presenta únicamente el caso conceptual y la metodología aplicada.',
    category: 'professional',
    areas: ['data'],
    type: 'process-analysis',
    technologies: [
      { name: 'SQL', category: 'database', color: '#336791' },
      { name: 'Python', category: 'backend', color: '#3776ab' },
      { name: 'Excel', category: 'tools', color: '#217346' }
    ],
    links: {},
    images: {
      thumbnail: 'assets/projects/data-cleaning-thumb.jpg',
      screenshots: []
    },
    dates: {
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-09-01')
    },
    role: 'Analista de Datos',
    client: 'Fundación Superación de la Pobreza',
    status: 'completed',
    achievements: [
      'Más de 30.000 registros analizados como parte de la preparación de datos para el nuevo portal',
      'Cerca de 500 registros duplicados detectados y dejados listos para validación y depuración',
      'Metodología reutilizable combinando consultas SQL y un script de Python para el mismo tipo de problema'
    ],
    challenges: [
      'Detectar duplicados e inconsistencias sin un identificador único confiable en todos los registros',
      'Procesar un volumen considerable de datos sin herramientas de limpieza automatizada previamente disponibles',
      'Documentar el proceso para que fuera repetible antes del lanzamiento del portal'
    ],
    featured: true,
    displayOrder: 3
  }
];

/**
 * Proyectos personales de Alejandro Villa, desarrollados por cuenta propia
 * (fuera de un contexto laboral o académico) y publicados en su GitHub.
 * Datos técnicos verificados directamente desde los repositorios reales.
 */
export const PERSONAL_PROJECTS: Project[] = [
  {
    id: 'carrito-control',
    title: 'CarritoControl - App de Compras y Presupuesto',
    shortDescription: 'App Android nativa para organizar compras y controlar el presupuesto, 100% offline y sin cuentas de usuario',
    fullDescription: 'Aplicación móvil desarrollada con Angular, Ionic y Capacitor para gestionar listas de compras, controlar el presupuesto en tiempo real y llevar un registro de gastos. Funciona completamente offline, sin necesidad de crear una cuenta, con almacenamiento local y un enfoque centrado en la privacidad del usuario.',
    category: 'personal',
    areas: ['development'],
    type: 'mobile-app',
    technologies: [
      { name: 'Angular', version: '18', category: 'frontend', color: '#dd0031' },
      { name: 'Ionic', version: '8', category: 'mobile', color: '#3880ff' },
      { name: 'Capacitor', version: '7.4', category: 'mobile', color: '#119eff' },
      { name: 'TypeScript', version: '5.4', category: 'frontend', color: '#3178c6' },
      { name: 'Android (Java)', category: 'mobile', color: '#3ddc84' }
    ],
    links: {
      repository: 'https://github.com/alejandro-villa-dev/carrito'
    },
    images: {
      thumbnail: 'assets/images/carrito control.jpeg',
      screenshots: []
    },
    dates: {
      startDate: new Date('2025-06-20')
    },
    role: 'Desarrollador Full Stack (App Android)',
    status: 'maintenance',
    achievements: [
      'App funcional 100% offline, sin dependencia de backend ni cuentas de usuario',
      'Construcción y empaquetado de APK para instalación directa en Android',
      'Múltiples temas visuales, incluyendo opciones de accesibilidad para daltonismo'
    ],
    challenges: [
      'Integración de Capacitor con la capa nativa de Android (Java) para el build de producción',
      'Diseño de persistencia local robusta sin backend ni base de datos remota',
      'Definición de un modelo freemium simple (límite de listas y productos) sin sistema de cuentas'
    ],
    featured: true,
    displayOrder: 4
  },
  {
    id: 'ast-digital-formulario',
    title: 'AST Digital - Formulario Web',
    shortDescription: 'Formulario web desarrollado de forma independiente como favor a un conocido',
    fullDescription: 'Formulario web con validaciones e interfaz simple, desarrollado por cuenta propia (fuera de un contexto laboral o académico) a pedido de un conocido. Quedó alojado y disponible desde entonces.',
    category: 'personal',
    areas: ['development'],
    type: 'web-application',
    technologies: [
      { name: 'Angular', category: 'frontend', color: '#dd0031' },
      { name: 'Ionic', category: 'mobile', color: '#3880ff' }
    ],
    links: {
      live: 'https://ast-digital.web.app/'
    },
    images: {
      thumbnail: 'assets/projects/ast-digital-thumb.jpg',
      screenshots: [
        'assets/projects/ast-digital-1.jpg'
      ]
    },
    dates: {
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-08-01')
    },
    role: 'Desarrollador',
    status: 'completed',
    achievements: [
      'Formulario funcional con validaciones en tiempo real',
      'Interfaz simple y clara entregada en un plazo corto'
    ],
    challenges: [
      'Balancear simplicidad de uso con validaciones robustas en poco tiempo'
    ],
    featured: false,
    displayOrder: 5
  },
  {
    id: 'portafolio-personal',
    title: 'Este Portafolio (Angular + Ionic + Firebase)',
    shortDescription: 'Este sitio también es uno de mis proyectos: SPA responsive con Angular, Ionic y Firebase Hosting',
    fullDescription: 'El propio portafolio web, desarrollado como proyecto personal para presentar mi perfil profesional. Incluye diseño responsive, modo claro/oscuro, componentes reutilizables, routing con lazy loading por sección, integración con Firebase (Firestore y Hosting), SEO dinámico por sección y despliegue continuo en Firebase Hosting.',
    category: 'personal',
    areas: ['development'],
    type: 'web-application',
    technologies: [
      { name: 'Angular', version: '18', category: 'frontend', color: '#dd0031' },
      { name: 'Ionic', version: '8', category: 'mobile', color: '#3880ff' },
      { name: 'TypeScript', version: '5.4', category: 'frontend', color: '#3178c6' },
      { name: 'Firebase', version: '11', category: 'cloud', color: '#ffca28' },
      { name: 'Firestore', category: 'database', color: '#ffa000' },
      { name: 'SCSS', category: 'frontend', color: '#cc6699' }
    ],
    links: {
      live: 'https://portafolio-alejandro-villa.web.app',
      repository: 'https://github.com/alejandro-villa-dev/Portafolio-Angular-Firebase'
    },
    images: {
      thumbnail: 'assets/projects/portafolio-thumb.jpg',
      screenshots: []
    },
    dates: {
      startDate: new Date('2024-06-01')
    },
    role: 'Desarrollador Full Stack (Frontend + Firebase)',
    status: 'in-production',
    achievements: [
      'Sitio 100% responsive desplegado en Firebase Hosting',
      'Routing con lazy loading por sección y SEO dinámico (meta tags y structured data por página)',
      'Componentes reutilizables (header, footer, cards de CV) y modo claro/oscuro'
    ],
    challenges: [
      'Mantener la arquitectura modular y reutilizable a medida que crecen las secciones',
      'Configurar reglas de Firestore seguras para el formulario de contacto sin exponer datos'
    ],
    featured: true,
    displayOrder: 6
  }
];

/**
 * Datos de proyectos creativos: WADs para Doom + proyecto musical personal.
 * ACTUALIZADO: Incluye WAD de 11 niveles, proyecto experimental DOOM 3 y el sitio
 * web de DemWolf IA Music (proyecto musical personal, agrupado aquí por su naturaleza
 * creativa, no técnica/laboral).
 */
export const CREATIVE_PROJECTS: Project[] = [
  {
    id: 'waterdoom-11-levels',
    title: 'DOOM - WAD de 11 Niveles Completos',
    shortDescription: 'WAD completo para DOOM II con 11 niveles originales demostrando creatividad técnica',
    fullDescription: 'Desarrollo de modificación completa para DOOM II con 11 niveles únicos. Demuestra capacidad de pensamiento espacial, diseño de experiencias y resolución de problemas creativos bajo limitaciones técnicas.',
    category: 'creative',
    areas: [],
    type: 'game-mod',
    technologies: [
      { name: 'Doom Builder', category: 'tools', color: '#8b0000' },
      { name: 'SLADE', category: 'tools', color: '#4169e1' },
      { name: 'Level Design', category: 'game-engine', color: '#ff6347' }
    ],
    links: {
      download: 'assets/wads/Wad_para_DOOMII.wad',
      video: 'https://youtu.be/VzD9NT5F_Z0'
    },
    images: {
      thumbnail: 'assets/wads/wad_11niveles.png',
      screenshots: [
        'assets/projects/waterdoom-level-1.jpg',
        'assets/projects/waterdoom-level-2.jpg',
        'assets/projects/waterdoom-level-3.jpg'
      ]
    },
    dates: {
      startDate: new Date('2010-01-01'),
      endDate: new Date('2015-01-01')
    },
    role: 'Level Designer & Modder',
    status: 'completed',
    achievements: [
      '11 niveles completamente funcionales',
      'Diseño innovador de espacios y mecánicas',
      'Demostración de pensamiento sistemático aplicado',
      'Optimización para múltiples dificultades'
    ],
    challenges: [
      'Limitaciones técnicas del engine original de DOOM',
      'Optimización de performance en niveles complejos',
      'Balance entre dificultad y diversión',
      'Coherencia narrativa entre los 11 niveles'
    ],
    featured: true,
    displayOrder: 7,
    videoUrl: 'https://youtu.be/VzD9NT5F_Z0',
    wadAvailable: true,
    modalBackgroundImage: 'assets/wads/wad_11niveles.png',
    engineRequired: 'Zandronum',
    requiredGame: 'DOOM II',
    features: [
      '11 niveles completos y únicos',
      'Diseño original de espacios',
      'Optimizado para multijugador',
      'Compatible con diferentes dificultades'
    ],
    installInstructions: [
      'Descargar e instalar Zandronum desde zandronum.com',
      'Tener una copia legal de DOOM II',
      'Descargar el archivo Wad_para_DOOMII.wad',
      'Ejecutar Zandronum y cargar el WAD desde el menú'
    ]
  },
  {
    id: 'doom3-experimental-wad',
    title: 'Proyecto Experimental DOOM 3 - Luces y Sombras',
    shortDescription: 'Nivel experimental explorando técnicas avanzadas de iluminación inspiradas en DOOM 3',
    fullDescription: 'Proyecto experimental que explora las posibilidades de luces y sombras en el engine clásico de DOOM. Inspirado en las técnicas de iluminación de DOOM 3, demuestra capacidad de innovación dentro de limitaciones técnicas.',
    category: 'creative',
    areas: [],
    type: 'game-mod',
    technologies: [
      { name: 'Doom Builder', category: 'tools', color: '#8b0000' },
      { name: 'SLADE', category: 'tools', color: '#4169e1' },
      { name: 'Advanced Lighting', category: 'game-engine', color: '#ff6347' }
    ],
    links: {
      video: 'https://youtu.be/5-E392uGTj8'
    },
    images: {
      thumbnail: 'assets/wads/wad_video.png',
      screenshots: [
        'assets/projects/doom3-experimental-1.jpg',
        'assets/projects/doom3-experimental-2.jpg'
      ]
    },
    dates: {
      startDate: new Date('2012-01-01'),
      endDate: new Date('2013-01-01')
    },
    role: 'Level Designer & Lighting Specialist',
    status: 'archived',
    achievements: [
      'Técnicas innovadoras de iluminación',
      'Simulación de efectos DOOM 3 en engine clásico',
      'Experimentación con nuevas mecánicas',
      'Documentación visual completa'
    ],
    challenges: [
      'Limitaciones del engine clásico para efectos modernos',
      'Simulación de luces dinámicas',
      'Optimización de efectos visuales',
      'Mantener jugabilidad fluida'
    ],
    featured: true,
    displayOrder: 8,
    videoUrl: 'https://youtu.be/5-E392uGTj8',
    wadAvailable: false,
    modalBackgroundImage: 'assets/wads/wad_video.png',
    engineRequired: 'GZDoom',
    requiredGame: 'DOOM II',
    features: [
      'Efectos avanzados de iluminación',
      'Técnicas experimentales de sombras',
      'Atmósfera inspirada en DOOM 3',
      'Innovación en engine clásico'
    ]
  },
  {
    id: 'demwolf-ia-music',
    title: 'DemWolf IA Music - Sitio Web Personal',
    shortDescription: 'Sitio web para presentar mi proyecto musical personal, desplegado en GitHub Pages',
    fullDescription: 'Sitio web desarrollado con HTML, CSS y JavaScript puro (sin frameworks) para presentar DemWolf, mi proyecto musical personal, con reproductores de Spotify embebidos y acceso centralizado a distintas plataformas de streaming. Usado aquí también como demostración de desarrollo web puro y despliegue con GitHub Pages, más allá del contenido musical en sí.',
    category: 'creative',
    areas: ['development'],
    type: 'web-application',
    technologies: [
      { name: 'HTML5', category: 'frontend', color: '#e34f26' },
      { name: 'CSS3', category: 'frontend', color: '#264de4' },
      { name: 'JavaScript', category: 'frontend', color: '#f7df1e' },
      { name: 'Bootstrap', version: '5.3', category: 'frontend', color: '#7952b3' }
    ],
    links: {
      live: 'https://alejandro-villa-dev.github.io/DemWolfIAMusic/',
      repository: 'https://github.com/alejandro-villa-dev/DemWolfIAMusic'
    },
    images: {
      thumbnail: 'assets/images/DemWolf.jpg',
      screenshots: []
    },
    dates: {
      startDate: new Date('2026-04-09')
    },
    role: 'Desarrollador Web Frontend',
    status: 'in-production',
    achievements: [
      'Sitio 100% responsive (móvil, tablet y escritorio) publicado en GitHub Pages',
      'Integración de reproductores embebidos de Spotify para dos proyectos musicales distintos',
      'Centralización de accesos a plataformas de streaming (Spotify, Apple Music, Deezer, YouTube, TikTok)'
    ],
    challenges: [
      'Maquetación y diseño visual completo con HTML/CSS/JS puro, sin frameworks de frontend',
      'Organización de contenido para dos identidades musicales distintas dentro de un mismo sitio',
      'Configuración y despliegue del sitio con GitHub Pages'
    ],
    featured: true,
    displayOrder: 9
  }
];

/**
 * Helper function para obtener proyectos por categoría
 */
export function getProjectsByCategory(category: ProjectCategory): Project[] {
  const allProjects = [...ALEJANDRO_PROJECTS, ...PERSONAL_PROJECTS, ...CREATIVE_PROJECTS];
  return allProjects.filter(project => project.category === category);
}

/**
 * Helper function para obtener proyectos por área profesional (Desarrollo/Datos/Soporte).
 * Un proyecto puede pertenecer a varias áreas a la vez (ver `Project.areas`).
 */
export function getProjectsByArea(area: ProjectArea): Project[] {
  const allProjects = [...ALEJANDRO_PROJECTS, ...PERSONAL_PROJECTS, ...CREATIVE_PROJECTS];
  return allProjects
    .filter(project => project.areas.includes(area))
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

/**
 * Helper function para obtener proyectos destacados
 */
export function getFeaturedProjects(): Project[] {
  const allProjects = [...ALEJANDRO_PROJECTS, ...PERSONAL_PROJECTS, ...CREATIVE_PROJECTS];
  return allProjects
    .filter(project => project.featured)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

/**
 * Helper function para obtener proyectos creativos (WADs)
 */
export function getCreativeProjects(): Project[] {
  return CREATIVE_PROJECTS.sort((a, b) => a.displayOrder - b.displayOrder);
}

/**
 * Helper function para obtener tecnologías únicas de todos los proyectos
 */
export function getAllTechnologies(): Technology[] {
  const allProjects = [...ALEJANDRO_PROJECTS, ...PERSONAL_PROJECTS, ...CREATIVE_PROJECTS];
  const techMap = new Map<string, Technology>();
  
  allProjects.forEach(project => {
    project.technologies.forEach(tech => {
      techMap.set(tech.name, tech);
    });
  });
  
  return Array.from(techMap.values());
}