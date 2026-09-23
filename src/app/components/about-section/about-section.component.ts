// src/app/components/about-section/about-section.component.ts
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AnimationService } from '@services/animation.service';
import { CERTIFICATIONS } from '@models/certification.model';

/**
 * Componente para la sección "Sobre Mí" del portafolio.
 * ACTUALIZADO: Enfoque en experiencia práctica + formación académica,
 * posicionamiento para roles junior/intermedio en desarrollo y análisis.
 */
@Component({
  selector: 'app-about-section',
  templateUrl: './about-section.component.html',
  styleUrls: ['./about-section.component.scss'],
})
export class AboutSectionComponent implements OnInit {

  // Información personal detallada de Alejandro Villa - ACTUALIZADA
  // NOTA: sin edad/ubicación expuestas a propósito (búsqueda de trabajo 100% remoto).
  public personalInfo = {
    name: 'Alejandro Villa Villavicencio',
    title: 'Ingeniero en Informática',
    university: 'DuocUC',
    graduationYear: 2025,
    availability: 'Modalidad 100% remota · Zona horaria LATAM',
    email: 'alejandro.villa91@gmail.com',
    phone: '+52 4925599064',
    linkedin: 'https://www.linkedin.com/in/alejandro-villa-villavicencio/'
  };

  // Biografía actualizada según el prompt
  public biography = {
    earlyStart: {
      title: 'Los Inicios (2007)',
      description: 'Mi historia comenzó a los 15 años cuando me convertí en "el que arregla computadores" en mi círculo. Desde Windows XP, siempre fui la persona a la que llegaban cuando los equipos fallaban. No solo reparaba - investigaba, experimentaba y modificaba.',
      highlights: [
        'Editaba el registro de Windows',
        'Desarmaba todo lo que podía',
        'Necesidad de entender el funcionamiento interno'
      ]
    },
    practicalExperience: {
      title: 'Experiencia Práctica Sólida',
      description: 'Esta curiosidad natural me llevó a desarrollar una experiencia práctica sólida: formateos, cambios de hardware, clonación de discos, configuración de redes, reparación de componentes. Desde hace cerca de 20 años, he sido el solucionador técnico de confianza.',
      highlights: [
        'Formateos y migración de sistemas',
        'Reparación de hardware avanzada',
        'Configuración de redes empresariales',
        'Resolución de problemas complejos'
      ]
    },
    formalExperience: {
      title: 'Experiencia Formal',
      description: 'A partir del soporte técnico también participé en desarrollo de software y análisis de datos. Mi experiencia formal incluye VTR (donde además capacitaba a nuevos trabajadores), la Escuela José de San Martín (soporte TI y administración de un laboratorio de 45 PCs), Valor Único (Vias Chile) (soporte N1/N2 con ServiceNow y limpieza de datos operacionales con Python), la Fundación Superación de la Pobreza (soporte N1/N2, desarrollo del módulo de tesistas del SRM y un caso real de validación de datos sobre más de 30.000 registros) y Axity Chile prestando servicios a CAPREDENA (soporte N1/N2, gestión de tickets en GLPI e infraestructura bajo SLA).',
      highlights: [
        'VTR: Soporte técnico + Capacitador',
        'Escuela José de San Martín: Soporte TI y administración de laboratorio computacional (45 PCs)',
        'Valor Único (Vias Chile): Soporte técnico N1/N2 con ServiceNow + limpieza de datos operacionales (Python)',
        'Fundación: Soporte N1/N2, desarrollo del módulo de tesistas (Angular/Ionic/Firebase) y validación de datos (30.000+ registros)',
        'Axity Chile (CAPREDENA): Soporte técnico N1/N2, gestión de tickets en GLPI y Active Directory bajo SLA'
      ]
    },
    academicFormation: {
      title: 'Formación Académica Formal',
      description: 'Recientemente me titulé como Ingeniero en Informática, no para aprender a usar computadores (eso ya lo sabía), sino para formalizar mi experiencia práctica y agregar herramientas de análisis de negocio, gestión de proyectos y metodologías estructuradas.',
      highlights: [
        'Título de Ingeniero en Informática',
        'Análisis de negocio estructurado',
        'Metodologías de gestión de proyectos',
        'Formalización de experiencia práctica'
      ]
    }
  };

  // Certificaciones con verificación oficial (título DuocUC y certificado Python),
  // ambas obtenidas en Chile. Se muestran con su imagen y link de verificación real
  // (QR/credencial). Centralizadas en certification.model.ts para reutilizarlas
  // también en el hero (home).
  public certifications = CERTIFICATIONS;

  // Diferencial único: base transversal de Ingeniería Informática que conecta 3 áreas
  public uniqueValue = {
    title: 'Mi Diferencial',
    description: 'Una base transversal de Ingeniería Informática que conecta 3 áreas relacionadas -Soporte de Aplicaciones, Desarrollo y Datos- en vez de tres perfiles desconectados.',
    points: [
      'Base real en soporte TI N1/N2 (5+ años) que sostiene el resto de mi perfil',
      'Desarrollo web/móvil aplicado en sistemas reales (Angular, Ionic, Firebase)',
      'Análisis de datos con casos concretos (SQL/Python sobre más de 30.000 registros)',
      'Solucionador de problemas con enfoque práctico y estructurado',
      'Experiencia probada en capacitación y desarrollo de equipos',
      'Busco oportunidades de crecimiento en cualquiera de estas 3 áreas'
    ]
  };

  // Ciclo de gestión de incidentes / soporte de aplicaciones (flujo conceptual, sin
  // información confidencial de ningún cliente). Ver sección "Soporte de Aplicaciones".
  public supportProcessSteps = [
    { label: 'Incidente', icon: 'alert-circle-outline' },
    { label: 'Diagnóstico', icon: 'search-outline' },
    { label: 'Categorización', icon: 'pricetags-outline' },
    { label: 'Resolución / Escalamiento', icon: 'git-branch-outline' },
    { label: 'Validación', icon: 'checkmark-done-outline' },
    { label: 'Documentación', icon: 'document-text-outline' },
    { label: 'Cierre bajo SLA', icon: 'checkmark-circle-outline' }
  ];

  // Filosofía profesional
  public philosophy = {
    quote: 'No basta con saber usar la tecnología - hay que entender por qué funciona, cómo falla, y cómo puede servir realmente al negocio.',
    context: 'Esta filosofía guía mi búsqueda de oportunidades donde pueda aplicar mi experiencia en nuevos contextos'
  };

  // Intereses personales
  public interests = [
    {
      name: 'Gaming',
      description: 'Años diseñando WADs para Doom',
      relevance: 'Demuestra creatividad técnica y pensamiento espacial',
      icon: 'game-controller'
    },
    {
      name: 'Música',
      description: 'Rock, Metal, Jazz, Blues',
      relevance: 'Diversidad de gustos y apreciación por la complejidad',
      icon: 'musical-notes'
    },
    {
      name: 'Tecnología',
      description: 'Investigación constante de nuevas herramientas',
      relevance: 'Mantenimiento actualizado con tendencias',
      icon: 'hardware-chip'
    },
    {
      name: 'Experimentación',
      description: 'Modificar, desarmar y entender funcionamiento',
      relevance: 'Curiosidad técnica que impulsa el aprendizaje',
      icon: 'construct'
    }
  ];

  // Cronología simplificada para visualización
  public timeline = [
    { year: '2007', event: 'Inicio como "el que arregla computadores"', type: 'personal' },
    { year: '2018', event: 'VTR - Soporte técnico + Capacitador', type: 'professional' },
    { year: '2020', event: 'Inicio Ingeniería Informática DuocUC', type: 'education' },
    { year: '2020', event: 'Escuela José de San Martín - Soporte TI y laboratorio de 45 PCs (2020-2023)', type: 'professional' },
    { year: '2023', event: 'Valor Único (Vias Chile) - Especialista soporte técnico', type: 'professional' },
    { year: '2024', event: 'Fundación - Especialista TI: Soporte N1/N2, Infraestructura y Aplicaciones', type: 'professional' },
    { year: '2025', event: 'Titulación Ingeniero Informática', type: 'education' },
    { year: '2025', event: 'Axity Chile (CAPREDENA) - Soporte Técnico N1/N2', type: 'professional' }
  ];

  // Estado de animaciones
  public animationsLoaded = false;

  constructor(private animationService: AnimationService) { }

  ngOnInit(): void {
    // Activar animaciones después de un breve delay
    setTimeout(() => {
      this.animationsLoaded = true;
      this.initAnimations();
    }, 300);
  }

  /**
   * Inicializa animaciones de entrada para elementos de la sección
   */
  private initAnimations(): void {
    // Animar elementos principales con delay escalonado
    const animatedElements = document.querySelectorAll('.about-animate');
    
    animatedElements.forEach((element, index) => {
      this.animationService.observeElement(
        element,
        'slideInUp',
        0.1 // threshold de visibilidad
      );
    });

    // Animar tarjetas de intereses con delay
    const interestCards = document.querySelectorAll('.interest-card');
    interestCards.forEach((card, index) => {
      setTimeout(() => {
        this.animationService.observeElement(card, 'scaleIn', 0.2);
      }, index * 100);
    });
  }

  /**
   * Navega a la sección de experiencia
   */
  scrollToExperience(): void {
    const experienceSection = document.getElementById('experience');
    if (experienceSection) {
      const headerHeight = 80;
      const elementPosition = experienceSection.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Navega a la sección de contacto
   */
  scrollToContact(): void {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const headerHeight = 80;
      const elementPosition = contactSection.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Abre LinkedIn en nueva pestaña
   */
  openLinkedIn(): void {
    window.open(this.personalInfo.linkedin, '_blank', 'noopener,noreferrer');
  }

  /**
   * Abre el link de verificación oficial de una certificación (QR/credencial digital)
   * @param url - URL de verificación
   */
  openVerification(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  /**
   * Años de experiencia práctica freelance (trabajo pagado reparando equipos).
   * CORREGIDO: antes calculaba desde 2007 (cuando empezó por curiosidad personal,
   * ver biography.earlyStart más arriba, que sí se mantiene tal cual), lo que
   * inflaba este badge a ~19 años y seguía creciendo cada año. La cifra de
   * experiencia práctica/freelance real son 10+ años (igual que en Experiencia
   * y en la skill "hardware-repair"); los 5 años profesionales formales en TI
   * se muestran aparte, en el Hero/Footer/Experiencia.
   */
  getYearsOfExperience(): number {
    return 10;
  }
}