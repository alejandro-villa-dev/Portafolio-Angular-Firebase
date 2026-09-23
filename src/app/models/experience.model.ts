/**
 * ARCHIVO: src/app/models/experience.model.ts
 * 
 * DESCRIPCIÓN:
 * Modelo de datos para la experiencia laboral de Alejandro Villa.
 * CORREGIDO: Valor Único prestando servicios a ViasChile, fechas exactas según CV real.
 * ACTUALIZADO: Se agrega Axity Chile (servicios a CAPREDENA), 2025-2026, como experiencia más reciente.
 */

/**
 * Interfaz principal para experiencia laboral
 * Cubre tanto experiencia formal como independiente
 */
export interface WorkExperience {
  /** ID único de la experiencia */
  id: string;
  
  /** Nombre del puesto/rol */
  position: string;
  
  /** Empresa u organización */
  company: string;
  
  /** Tipo de experiencia */
  type: ExperienceType;
  
  /** Ubicación del trabajo */
  location: string;
  
  /** Fechas de la experiencia */
  dates: ExperienceDates;
  
  /** Descripción principal del rol */
  description: string;
  
  /** Responsabilidades específicas */
  responsibilities: string[];
  
  /** Logros y resultados medibles */
  achievements: string[];
  
  /** Tecnologías y herramientas utilizadas */
  technologies: string[];
  
  /** Habilidades desarrolladas/aplicadas */
  skills: string[];
  
  /** Si sigue vigente */
  current: boolean;
  
  /** Orden en el timeline */
  displayOrder: number;
  
  /** Destacar en portafolio */
  featured: boolean;
}

/**
 * Tipos de experiencia laboral
 */
export type ExperienceType = 'formal' | 'independent' | 'freelance' | 'volunteer';

/**
 * Fechas de la experiencia
 */
export interface ExperienceDates {
  /** Fecha de inicio */
  startDate: Date;
  
  /** Fecha de fin (si aplica) */
  endDate?: Date;
  
  /** Duración calculada en texto */
  duration?: string;
}

/**
 * Experiencia formal de Alejandro Villa
 * CORREGIDO: Valor Único prestando servicios a ViasChile
 */
export const FORMAL_EXPERIENCE: WorkExperience[] = [
  {
    id: 'axity-chile-capredena',
    position: 'Agente / Analista Op. Junior — Soporte Técnico N1/N2',
    company: 'Axity Chile (servicios a CAPREDENA)',
    type: 'formal',
    location: 'Santiago, Chile',
    dates: {
      startDate: new Date('2025-01-01'),
      endDate: new Date('2026-08-01'),
      duration: '2025-2026'
    },
    description: 'Soporte técnico N1 y N2 a usuarios internos de CAPREDENA, presencial y remoto, con diagnóstico técnico, documentación, seguimiento y cierre de incidentes en GLPI bajo SLA. Administración de accesos y usuarios en Active Directory, soporte a Windows, redes, impresoras y aplicaciones corporativas, incluyendo configuración de dispositivos móviles corporativos. Incluyó, además, aproximadamente un mes de apoyo 100% remoto a la operación Kaufmann mediante monitoreo de alertas/correos y generación y escalamiento de casos en ServiceNow.',
    responsibilities: [
      'Soporte técnico N1 y N2 a usuarios internos, presencial y remoto, resolviendo incidentes de hardware, software, accesos, conectividad e impresoras',
      'Gestión de un volumen variable de incidencias, con picos de hasta 25 tickets diarios según su complejidad',
      'Gestión, seguimiento y cierre de tickets en GLPI, manteniendo trazabilidad y cumplimiento sostenido de SLA superiores al 90%',
      'Administración básica/intermedia de usuarios, permisos, grupos, accesos y reseteo de contraseñas en Active Directory',
      'Diagnóstico y resolución de incidencias en Windows, redes, impresoras, estaciones de trabajo y equipamiento corporativo',
      'Configuración y soporte de dispositivos móviles Android e iPhone corporativos, incluyendo enrolamiento de cuentas y sincronización de correo',
      'Soporte remoto a usuarios internos mediante Dameware Mini Remote Control y AnyDesk, tomando control de equipos para diagnóstico y resolución directa de incidentes',
      'Apoyo temporal 100% remoto a la operación Kaufmann: monitoreo de alertas/correos y generación y escalamiento de casos en ServiceNow (aprox. 1 mes)',
      'Escalamiento de incidentes a áreas especializadas cuando correspondía, documentando contexto técnico, evidencias y hallazgos'
    ],
    achievements: [
      'Cumplimiento sostenido de SLA superiores al 90% en la gestión de tickets GLPI',
      'Gestión de volumen variable de incidencias, con picos de hasta 25 tickets diarios según complejidad',
      'Validación de soluciones aplicadas antes del cierre, identificando patrones de error recurrentes',
      'Apoyo a la continuidad operacional de CAPREDENA mediante soporte N1/N2 estable'
    ],
    technologies: [
      'GLPI', 'ServiceNow', 'Active Directory', 'Windows', 'Redes TCP/IP', 'Impresoras corporativas',
      'Configuración de dispositivos móviles Android/iPhone corporativos', 'Dameware Mini Remote Control', 'AnyDesk'
    ],
    skills: [
      'Soporte Técnico N1/N2', 'Gestión de Tickets (GLPI/ServiceNow)', 'Administración de Active Directory',
      'Soporte a Dispositivos Móviles Corporativos', 'Documentación Técnica'
    ],
    current: false,
    displayOrder: 1,
    featured: true
  },
  {
    id: 'fundacion-superacion-pobreza',
    position: 'Especialista TI — Soporte N1/N2, Infraestructura y Aplicaciones',
    company: 'Fundación Superación de la Pobreza',
    type: 'formal',
    location: 'Santiago, Chile',
    dates: {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2025-01-01'),
      duration: '2024-2025'
    },
    description: 'Rol multifuncional: soporte técnico N1/N2 e infraestructura TI, combinado con **desarrollo del módulo de tesistas del sistema SRM** desde cero usando Angular/Ionic/Firebase para reemplazar un sistema legacy on-premise con caídas constantes. Incluyó levantamiento de requerimientos, análisis de procesos (As-Is/To-Be), QA funcional y un caso real de validación de datos: detección de duplicados sobre más de 30.000 registros mediante SQL y Python previo a la puesta en marcha del nuevo portal. **Desarrollo con apoyo de IA**: uso de Claude para optimización del backend y arquitectura de datos.',
    responsibilities: [
      'Soporte técnico N1/N2 a usuarios internos e infraestructura TI (equipos, redes, impresoras, aplicaciones corporativas)',
      'Coordinación técnica: levantamiento de requerimientos con stakeholders y análisis de procesos As-Is/To-Be',
      '**Desarrollo del módulo de tesistas**: programación desde cero con Angular/Ionic/Firebase',
      '**Desarrollo backend con IA**: uso de Claude (IA) para optimización de arquitectura y lógica de backend',
      'QA funcional: pruebas de flujos, datos y reglas de negocio del módulo antes de su puesta en producción',
      '**Validación y limpieza de datos**: sobre una base de más de 30.000 registros, se detectaron cerca de 500 duplicados mediante SQL y un script en Python, como parte de la preparación del nuevo portal',
      'Diseño de arquitectura escalable: base técnica preparada para futuros módulos del sistema',
      'Migración de funcionalidad crítica: reemplazo de sistema legacy con caídas constantes',
      'Implementación multiplataforma: sistema funcional en web, tablet y móvil',
      'Soporte remoto a usuarios internos mediante AnyDesk y TeamViewer',
      'Gestión de impresoras: configuración HP/Ricoh/Brother con sistemas centralizados e IPs'
    ],
    achievements: [
      '**Módulo de tesistas completamente funcional**: primera fase del SRM eliminando caídas constantes',
      'Portal en producción: portal-superacionpobreza.web.app/tesis-pais',
      '**Detección de ~500 registros duplicados sobre más de 30.000** mediante SQL y Python, como apoyo a la limpieza de datos previa al nuevo portal',
      '**Arquitectura escalable**: base técnica preparada para expansión de módulos adicionales',
      'Implementación multiplataforma: acceso desde web, tablet y dispositivos móviles',
      '**Desarrollo acelerado con IA**: uso efectivo de Claude para optimización de backend',
      'Gestión profesional de alcance: entrega de fase funcional dentro de limitaciones presupuestarias'
    ],
    technologies: [
      'Angular 18', 'Ionic 8', 'Firebase 11', 'TypeScript 5.4', 'HTML5', 'CSS3',
      'SQL', 'Python', 'Excel avanzado',
      'Herramientas especializadas: Ventoy, Acronis, Rufus', 'Office 365',
      'AnyDesk', 'TeamViewer',
      '**IA para desarrollo**: Claude (asistente IA para backend y arquitectura)'
    ],
    skills: [
      'Soporte Técnico N1/N2', '**Desarrollo Full-Stack (Angular/Ionic/Firebase)**', '**Desarrollo con IA (Claude)**',
      'Levantamiento de Requerimientos', 'Análisis de Procesos (As-Is/To-Be)', 'QA Funcional',
      '**Validación y Limpieza de Datos (SQL/Python)**', 'Arquitectura de Sistemas Escalables',
      'Administración de Infraestructura TI', 'Implementación Multiplataforma'
    ],
    current: false,
    displayOrder: 2,
    featured: true
  },
  {
    id: 'valor-unico-viaschile',
    position: 'Especialista en Soporte Técnico (Mesa de Ayuda Nivel 1-2)',
    company: 'Valor Único (prestando servicios a ViasChile)',
    type: 'formal',
    location: 'Santiago, Chile',
    dates: {
      startDate: new Date('2023-01-01'),
      endDate: new Date('2024-01-01'),
      duration: '2023-2024'
    },
    description: 'Soporte técnico especializado con gestión de tickets bajo SLA estrictos para ViasChile a través de Valor Único. **Procesamiento de datos**: Limpieza y transformación de archivos CSV utilizando Python (con apoyo de IA) para eliminación de datos innecesarios y creación de archivos optimizados para análisis posterior.',
    responsibilities: [
      'Soporte técnico especializado: Gestión de tickets bajo SLA estrictos, resolución nivel 1-2 para ViasChile',
      'Soporte presencial y remoto mediante TeamViewer, troubleshooting de sistemas, conectividad y estaciones de trabajo',
      'Administración de sistemas: Active Directory, creación de perfiles, instalación de software',
      'Soporte de Microsoft 365 y Outlook (correo, calendario, permisos de buzón) a usuarios corporativos',
      '**Procesamiento de datos CSV**: Limpieza y transformación usando Python con Machine Learning',
      'Eliminación de datos innecesarios y modificación de tablas para optimización',
      'Preparación de archivos CSV optimizados para generación de gráficos y análisis',
      'Infraestructura TI: Configuración de redes, dispositivos móviles corporativos, inventarios',
      'Detección de problemas recurrentes en el seguimiento de incidencias, aportando a la mejora del servicio',
      'Soporte integral: Reparación hardware, formateo/clonación, soporte remoto nacional'
    ],
    achievements: [
      'Cumplimiento consistente de métricas SLA y tiempo de respuesta para ViasChile',
      '**Optimización de datos**: Limpieza exitosa de archivos CSV complejos usando Python/ML',
      'Preparación de datos que facilitó la generación de gráficos y análisis para decisiones',
      'Gestión efectiva de inventarios tecnológicos a nivel nacional',
      'Reconocimiento por calidad de servicio técnico especializado'
    ],
    technologies: [
      'ServiceNow', 'Active Directory', 'Windows', 'Microsoft 365', 'Outlook', 'Excel Avanzado', 'Python (Machine Learning)',
      'Procesamiento de archivos CSV', 'Sistemas de Ticketing', 'Configuración de Redes', 'Dispositivos móviles corporativos', 'TeamViewer'
    ],
    skills: [
      'Soporte Técnico Avanzado', 'Gestión de SLA', 'Administración de Sistemas',
      '**Limpieza y Procesamiento de Datos (Python/ML)**', 'Infraestructura Empresarial', 'Gestión de Inventarios TI'
    ],
    current: false,
    displayOrder: 3,
    featured: true
  },
  {
    id: 'escuela-jose-san-martin',
    position: 'Asistente de Computación y Soporte TI Educativo',
    company: 'Escuela José de San Martín',
    type: 'formal',
    location: 'Santiago, Chile',
    dates: {
      startDate: new Date('2020-01-01'),
      endDate: new Date('2023-12-01'),
      duration: '2020-2023'
    },
    description: 'Soporte técnico y administración del laboratorio computacional (45 PCs) de la escuela, incluyendo soporte remoto vía AnyDesk, instalación de software educativo y apoyo a docentes en clases de TIC y alfabetización digital de estudiantes.',
    responsibilities: [
      'Administración y mantenimiento del laboratorio computacional (45 PCs), incluyendo soporte remoto vía AnyDesk',
      'Instalación de software educativo, drivers, Office 365 e impresoras de red',
      'Configuración de carpetas compartidas y permisos de red',
      'Apoyo al docente en clases TIC y actividades digitales, incluyendo reemplazos por licencias o días administrativos',
      'Enseñanza guiada de herramientas digitales (Word, PowerPoint, correo escolar, navegación segura) a estudiantes',
      'Mantenimiento preventivo y diagnóstico técnico para mejora de equipos'
    ],
    achievements: [
      'Administración estable de un laboratorio de 45 PCs durante 3 años',
      'Apoyo directo a la alfabetización digital de estudiantes y docentes',
      'Refuerzo de habilidades de comunicación técnica con público no especializado, en línea con su experiencia como capacitador'
    ],
    technologies: [
      'AnyDesk', 'Office 365', 'Redes TCP/IP', 'Impresoras de red', 'Windows'
    ],
    skills: [
      'Soporte Técnico', 'Administración de Laboratorios TI', 'Capacitación y Alfabetización Digital', 'Soporte Remoto'
    ],
    current: false,
    displayOrder: 4,
    featured: false
  },
{
    id: 'vtr-iline',
    position: 'Soporte Técnico Telefónico + Capacitador',
    company: 'VTR (I-Line Contact Center)',
    type: 'formal',
    location: 'Santiago, Chile',
    dates: {
      startDate: new Date('2018-01-01'),
      endDate: new Date('2020-01-01'),
      duration: '2018-2020'
    },
    description: 'Soporte técnico telefónico nacional para servicios VTR de internet, telefonía y TV cable. Diagnóstico remoto y resolución de problemas de conectividad. **Rol adicional como capacitador**: entrenamiento de nuevos trabajadores técnicos con desarrollo de material educativo especializado.',
    responsibilities: [
      'Soporte técnico nacional: Atención telefónica a clientes VTR de internet, telefonía y TV cable',
      'Diagnóstico remoto: Resolución de problemas de conectividad y configuración de routers',
      'Optimización de servicios: Ajuste de parámetros de red para mejorar rendimiento',
      '**CAPACITADOR**: Entrenamiento de nuevos trabajadores técnicos (rol destacado)',
      'Desarrollo de material educativo: Creación de contenido especializado para capacitaciones',
      'Formación de técnicos: Múltiples generaciones de personal entrenado exitosamente'
    ],
    achievements: [
      'Reconocimiento formal como **CAPACITADOR especializado** en VTR',
      'Alto índice de satisfacción en atención al cliente a nivel nacional',
      'Desarrollo exitoso de múltiples generaciones de técnicos',
      'Especialización en diagnóstico técnico remoto y configuración de equipos',
      'Creación de material educativo que mejoró la formación técnica'
    ],
    technologies: [
      'Sistemas VTR', 'Configuración de Routers', 'Diagnóstico de Redes',
      'Plataformas de Capacitación', 'Herramientas de Soporte Remoto'
    ],
    skills: [
      'Soporte Técnico Telefónico Nacional', 'Diagnóstico Remoto de Redes',
      '**Capacitación y Desarrollo de Personal**', 'Configuración de Equipos',
      'Creación de Material Educativo', 'Atención al Cliente', 'Resolución de Problemas Técnicos'
    ],
    current: false,
    displayOrder: 5,
    featured: true
  }
];

/**
 * Experiencia independiente de Alejandro Villa
 * IMPORTANTE: esta tarjeta representa el trabajo freelance PAGADO reparando equipos
 * (más de 10 años), no los ~19 años desde que empezó a hacerlo por curiosidad personal
 * en 2007 (esa historia se cuenta aparte, en about-section.component.ts, y no debe
 * mezclarse aquí para no inflar la cifra de "experiencia" como si fuera profesional).
 */
export const INDEPENDENT_EXPERIENCE: WorkExperience[] = [
  {
    id: 'tecnico-independiente',
    position: 'Técnico Independiente',
    company: 'Freelance / Independiente',
    type: 'independent',
    location: 'Santiago, Chile',
    dates: {
      startDate: new Date('2007-01-01'),
      duration: 'Más de 10 años como freelance (raíces desde 2007)'
    },
    description: 'Más de 10 años de trabajo freelance reparando equipos, con raíces desde 2007 cuando comencé por curiosidad personal como "el que arregla computadores" - experiencia práctica sólida desde Windows XP hasta sistemas actuales, desarrollando competencia real en hardware, software y resolución de problemas complejos.',
    responsibilities: [
      'Reparación hardware avanzada: cambio de componentes (RAM, teclados, touchpad, pantallas, baterías internas, placas base)',
      'Formateo, clonación y migración de sistemas operativos Windows (XP-11)',
      'Configuración de redes domiciliarias y empresariales (TCP/IP, routers, DNS)',
      'Diagnóstico y solución de fallas complejas de software y hardware',
      'Instalación de periféricos, antivirus, Office 365, drivers y programas esenciales',
      'Investigación técnica constante para entender funcionamiento interno de sistemas',
      'Uso de herramientas especializadas: Ventoy, Acronis, Rufus para optimización de trabajo'
    ],
    achievements: [
      'Referente técnico en círculo personal y profesional durante más de 10 años como freelance',
      'Base sólida de experiencia práctica desde Windows XP hasta tecnologías actuales',
      'Capacidad probada para resolver problemas que otros no pueden',
      'Conocimiento profundo del funcionamiento interno de sistemas',
      'Experiencia única combinando práctica autodidacta con formación universitaria'
    ],
    technologies: [
      'Windows (XP hasta 11)', 'Ubuntu/Linux (uso básico)', 'Hardware PC Avanzado',
      'Redes TCP/IP', 'Configuración de Routers', 'Clonación de Discos',
      'Herramientas: Ventoy, Acronis, Rufus', 'Diagnóstico Hardware',
      'Office 365', 'Configuración BIOS/UEFI'
    ],
    skills: [
      'Diagnóstico Avanzado de Hardware', 'Resolución de Problemas Complejos',
      'Reparación de Componentes PC', 'Investigación Técnica Autodidacta',
      'Adaptabilidad Tecnológica', 'Pensamiento Sistemático',
      'Configuración de Sistemas', 'Soporte Técnico Integral'
    ],
    current: true,
    displayOrder: 6,
    featured: true
  }
];

/**
 * Helper function para obtener toda la experiencia combinada
 */
export function getAllExperience(): WorkExperience[] {
  return [...FORMAL_EXPERIENCE, ...INDEPENDENT_EXPERIENCE]
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

/**
 * Helper function para obtener experiencia por tipo
 */
export function getExperienceByType(type: ExperienceType): WorkExperience[] {
  const allExperience = getAllExperience();
  return allExperience.filter(exp => exp.type === type);
}

/**
 * Helper function para obtener los años de experiencia freelance (trabajo pagado
 * reparando equipos, no el inicio de la curiosidad personal en 2007 - ver nota en
 * INDEPENDENT_EXPERIENCE más arriba). Valor fijo en vez de calculado desde 2007
 * para no seguir inflando la cifra año tras año.
 */
export function getTotalYearsOfExperience(): number {
  return 10;
}

/**
 * Helper function para obtener tecnologías únicas
 */
export function getAllTechnologies(): string[] {
  const allExperience = getAllExperience();
  const techSet = new Set<string>();
  
  allExperience.forEach(exp => {
    exp.technologies.forEach(tech => techSet.add(tech));
  });
  
  return Array.from(techSet);
}

/**
 * Helper function para obtener skills únicos
 */
export function getAllSkills(): string[] {
  const allExperience = getAllExperience();
  const skillSet = new Set<string>();
  
  allExperience.forEach(exp => {
    exp.skills.forEach(skill => skillSet.add(skill));
  });
  
  return Array.from(skillSet);
}