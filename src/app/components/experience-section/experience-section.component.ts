// src/app/components/experience-section/experience-section.component.ts
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, OnDestroy } from '@angular/core';
import { AnimationService } from '@services/animation.service';
import { FORMAL_EXPERIENCE, INDEPENDENT_EXPERIENCE, WorkExperience } from '@models/experience.model';

/**
 * Componente para la sección de experiencia laboral del portafolio.
 * CORREGIDO: Animaciones optimizadas sin conflictos de transparencia.
 * Enfoque en experiencia sólida buscando crecimiento profesional.
 */
@Component({
  selector: 'app-experience-section',
  templateUrl: './experience-section.component.html',
  styleUrls: ['./experience-section.component.scss'],
})
export class ExperienceSectionComponent implements OnInit, OnDestroy {

  // Datos de experiencia importados desde el modelo
  public formalExperience = FORMAL_EXPERIENCE;
  public independentExperience = INDEPENDENT_EXPERIENCE;

  // Estado de la vista
  public activeTab: 'formal' | 'independent' | 'all' = 'all';
  public animationsLoaded = false;
  public selectedExperience: WorkExperience | null = null;

  // CORREGIDO: Control de animaciones para evitar conflictos
  private animationTimeouts: ReturnType<typeof setTimeout>[] = [];
  private animatedElements = new Set<Element>();
  private isAnimating = false;

  // Configuración de tabs
  public tabs = [
    {
      id: 'all' as const,
      label: 'Vista Completa',
      description: 'Experiencia formal + independiente',
      icon: 'layers'
    },
    {
      id: 'formal' as const,
      label: 'Experiencia Formal',
      description: 'Roles en empresas y organizaciones',
      icon: 'briefcase'
    },
    {
      id: 'independent' as const,
      label: 'Experiencia Independiente',
      description: 'Más de 10 años como técnico independiente freelance',
      icon: 'construct'
    }
  ];

  constructor(private animationService: AnimationService) { }

  ngOnInit(): void {
    // CORREGIDO: Activar animaciones después de un delay controlado
    this.initializeAnimations();
  }

  ngOnDestroy(): void {
    // CORREGIDO: Limpiar timeouts al destruir componente
    this.clearAllTimeouts();
  }

  /**
   * CORREGIDO: Cambia entre diferentes vistas de experiencia sin conflictos
   * @param tabId - ID del tab a activar
   */
  setActiveTab(tabId: 'formal' | 'independent' | 'all'): void {
    // CORREGIDO: No hacer nada si ya está activo el mismo tab
    if (this.activeTab === tabId || this.isAnimating) {
      return;
    }

    this.isAnimating = true;
    this.activeTab = tabId;
    
    // CORREGIDO: Re-animar solo elementos nuevos después de cambio de tab
    const timeout = setTimeout(() => {
      this.animateTimelineItems();
      this.isAnimating = false;
    }, 150);
    
    this.animationTimeouts.push(timeout);
  }

  /**
   * Obtiene la experiencia a mostrar según el tab activo
   * @returns Array de experiencia filtrada
   */
  getDisplayedExperience(): WorkExperience[] {
    switch (this.activeTab) {
      case 'formal':
        return this.formalExperience;
      case 'independent':
        return this.independentExperience;
      case 'all':
      default:
        return [...this.formalExperience, ...this.independentExperience]
          .sort((a, b) => a.displayOrder - b.displayOrder);
    }
  }

  /**
   * Abre modal con detalles de una experiencia específica
   * @param experience - Experiencia a mostrar en detalle
   */
  openExperienceDetail(experience: WorkExperience): void {
    this.selectedExperience = experience;
  }

  /**
   * Cierra el modal de detalles
   */
  closeExperienceDetail(): void {
    this.selectedExperience = null;
  }

  /**
   * CORREGIDO: Calcula duración usando el campo duration del modelo
   * @param experience - Experiencia para calcular duración
   * @returns String con duración formateada
   */
  calculateDuration(experience: WorkExperience): string {
    // CORRECCIÓN: Usar el campo duration del modelo directamente
    if (experience.dates.duration) {
      return experience.dates.duration;
    }

    // Fallback solo si no existe duration
    const startDate = experience.dates.startDate;
    const endDate = experience.dates.endDate || new Date();
    
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));

    if (diffYears >= 1) {
      return `${diffYears} año${diffYears > 1 ? 's' : ''}`;
    } else {
      return 'Menos de 1 año';
    }
  }

  /**
   * CORREGIDO: Formatea fechas mostrando solo años según CV
   * @param date - Fecha a formatear
   * @returns String con solo el año
   */
  formatDate(date: Date): string {
    // CORRECCIÓN: Solo mostrar el año, no meses
    return date.getFullYear().toString();
  }

  /**
   * Verifica si una experiencia está actualmente activa
   * @param experience - Experiencia a verificar
   * @returns true si la experiencia está activa
   */
  isCurrentExperience(experience: WorkExperience): boolean {
    return experience.current || !experience.dates.endDate;
  }

  /**
   * Obtiene el color del tipo de experiencia para UI
   * @param type - Tipo de experiencia
   * @returns String con el color CSS
   */
  getExperienceTypeColor(type: string): string {
    const colors = {
      'formal': 'var(--ion-color-primary)',
      'independent': 'var(--ion-color-accent)',
      'freelance': '#6C5CE7',
      'volunteer': '#00CEC9'
    };
    return colors[type as keyof typeof colors] || 'var(--ion-color-primary)';
  }

  /**
   * Años de experiencia práctica freelance (trabajo pagado reparando equipos).
   * CORREGIDO: antes calculaba desde 2007 (cuando empezó por curiosidad personal,
   * no como trabajo freelance pagado), lo que inflaba la cifra a ~19 años y seguía
   * creciendo cada año. Valor fijo en 10, alineado con INDEPENDENT_EXPERIENCE en
   * experience.model.ts y con la skill "hardware-repair" en skill.model.ts.
   * @returns Años de experiencia freelance
   */
  getTotalYearsOfExperience(): number {
    return 10;
  }

  /**
   * Obtiene estadísticas de experiencia para mostrar
   * @returns Objeto con estadísticas calculadas
   */
  getExperienceStats() {
    const allExperience = this.getDisplayedExperience();
    
    return {
      totalYears: this.getTotalYearsOfExperience(),
      formalRoles: this.formalExperience.length,
      companiesWorked: new Set(this.formalExperience.map(exp => exp.company)).size,
      currentlyActive: allExperience.filter(exp => this.isCurrentExperience(exp)).length
    };
  }

  /**
   * Navega a la sección de proyectos
   */
  scrollToProjects(): void {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      const headerHeight = 80;
      const elementPosition = projectsSection.offsetTop - headerHeight;
      
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
   * CORREGIDO: Inicializa animaciones de forma controlada
   */
  private initializeAnimations(): void {
    // Activar el estado loaded primero
    const timeout1 = setTimeout(() => {
      this.animationsLoaded = true;
    }, 300);

    // Animar elementos principales después
    const timeout2 = setTimeout(() => {
      this.animateMainElements();
    }, 500);

    // Animar timeline items al final
    const timeout3 = setTimeout(() => {
      this.animateTimelineItems();
    }, 800);

    this.animationTimeouts.push(timeout1, timeout2, timeout3);
  }

  /**
   * CORREGIDO: Anima elementos principales sin conflictos
   */
  private animateMainElements(): void {
    const mainElements = document.querySelectorAll('.experience-animate:not(.timeline-item)');
    
    mainElements.forEach((element, index) => {
      // Solo animar si no ha sido animado antes
      if (!this.animatedElements.has(element)) {
        const timeout = setTimeout(() => {
          element.classList.add('animate-in');
          this.animatedElements.add(element);
          
          // Asegurar visibilidad después de la animación
          const visibilityTimeout = setTimeout(() => {
            element.classList.add('animation-complete');
          }, 600);
          
          this.animationTimeouts.push(visibilityTimeout);
        }, index * 100);

        this.animationTimeouts.push(timeout);
      }
    });
  }

  /**
   * CORREGIDO: Anima items del timeline de forma controlada
   */
  private animateTimelineItems(): void {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
      // CORREGIDO: Asegurar que el elemento esté visible desde el inicio
      (item as HTMLElement).style.opacity = '1';
      
      // Solo animar si no ha sido animado antes
      if (!this.animatedElements.has(item)) {
        const timeout = setTimeout(() => {
          item.classList.add('animate-in');
          this.animatedElements.add(item);
          
          // Asegurar visibilidad después de la animación
          const visibilityTimeout = setTimeout(() => {
            item.classList.add('animation-complete');
          }, 600);
          
          this.animationTimeouts.push(visibilityTimeout);
        }, index * 150);

        this.animationTimeouts.push(timeout);
      }
    });
  }

  /**
   * CORREGIDO: Limpia todos los timeouts para evitar memory leaks
   */
  private clearAllTimeouts(): void {
    this.animationTimeouts.forEach(timeout => clearTimeout(timeout));
    this.animationTimeouts = [];
  }

  /**
   * CORREGIDO: Método para resetear animaciones si es necesario (debug)
   */
  public resetAnimations(): void {
    this.clearAllTimeouts();
    this.animatedElements.clear();
    this.isAnimating = false;
    
    // Remover todas las clases de animación
    const allAnimatedElements = document.querySelectorAll('.animate-in, .animation-complete');
    allAnimatedElements.forEach(element => {
      element.classList.remove('animate-in', 'animation-complete');
      (element as HTMLElement).style.opacity = '1'; // Asegurar visibilidad
    });
    
    // Reinicializar después de un breve delay
    const timeout = setTimeout(() => {
      this.initializeAnimations();
    }, 100);
    
    this.animationTimeouts.push(timeout);
  }

  /**
   * CORREGIDO: Método para forzar visibilidad de elementos problemáticos
   */
  public forceElementVisibility(): void {
    const problematicElements = document.querySelectorAll('.timeline-item, .timeline-content, .experience-animate');
    problematicElements.forEach(element => {
      (element as HTMLElement).style.opacity = '1';
      (element as HTMLElement).style.visibility = 'visible';
      (element as HTMLElement).style.transform = 'none';
      element.classList.add('force-visible');
    });
  }
}