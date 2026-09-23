/**
 * ARCHIVO: src/app/components/projects-section/projects-section.component.ts
 * 
 * DESCRIPCIÓN:
 * Componente para la sección de proyectos del portafolio.
 * Muestra grid de proyectos profesionales, académicos y creativos (WADs).
 * Incluye filtros por categoría, enlaces a proyectos reales funcionando
 * y sección especial para WADs de DOOM con modales personalizados.
 * CORREGIDO: Bug de filtros y soporte completo para WADs con videos.
 */
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AnimationService } from '@services/animation.service';
import { DownloadService } from '@services/download.service';
import {
  Project,
  ALEJANDRO_PROJECTS,
  PERSONAL_PROJECTS,
  CREATIVE_PROJECTS,
  ProjectCategory,
  ProjectArea,
  getCreativeProjects,
  getFeaturedProjects
} from '@models/project.model';

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.scss'],
})
export class ProjectsSectionComponent implements OnInit, OnDestroy {
public window = window;

  // Datos de proyectos importados desde el modelo
  public professionalProjects = ALEJANDRO_PROJECTS;
  public personalProjects = PERSONAL_PROJECTS;
  public creativeProjects = CREATIVE_PROJECTS;

  // Estado del componente
  public activeFilter: ProjectCategory | 'all' = 'all';
  public animationsLoaded = false;
  public selectedProject: Project | null = null;

  // NUEVO: Filtro secundario por área profesional (Desarrollo/Datos/Sistemas-Soporte).
  // Es independiente del filtro por categoría: un proyecto puede aparecer en varias áreas.
  public activeArea: ProjectArea | 'all' = 'all';

  // Configuración del filtro por área profesional
  public areaFilters: { id: ProjectArea | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: 'Todos', icon: 'apps' },
    { id: 'development', label: 'Desarrollo', icon: 'code-slash' },
    { id: 'data', label: 'Datos', icon: 'analytics' },
    { id: 'support', label: 'Sistemas / Soporte', icon: 'hardware-chip' }
  ];

  // NUEVO: Estado para modales de WADs
  public selectedWAD: Project | null = null;
  public showWADModal = false;

  // Configuración de filtros (conteos calculados por categoría real, no por array de origen)
  public filters = [
    {
      id: 'all' as const,
      label: 'Todos los Proyectos',
      description: 'Vista completa del portafolio',
      icon: 'apps',
      count: this.getAllProjects().length
    },
    {
      id: 'professional' as ProjectCategory,
      label: 'Proyectos Profesionales',
      description: 'Sistemas en producción',
      icon: 'briefcase',
      count: this.professionalProjects.filter(p => p.category === 'professional').length
    },
    {
      id: 'academic' as ProjectCategory,
      label: 'Proyectos Académicos',
      description: 'Desarrollos universitarios',
      icon: 'school',
      count: this.professionalProjects.filter(p => p.category === 'academic').length
    },
    {
      id: 'personal' as ProjectCategory,
      label: 'Proyectos Personales',
      description: 'Desarrollados por cuenta propia',
      icon: 'person',
      count: this.personalProjects.length
    },
    {
      id: 'creative' as ProjectCategory,
      label: 'Proyectos Creativos',
      description: 'WADs y modificaciones',
      icon: 'game-controller',
      count: this.creativeProjects.length
    }
  ];

  // Lista de proyectos filtrados - CORRECCIÓN: Para evitar bug de transparencia
  public filteredProjects: Project[] = [];

constructor(
  private animationService: AnimationService,
  private downloadService: DownloadService,
  private location: Location,
  private router: Router,
  private cdr: ChangeDetectorRef,
  private sanitizer: DomSanitizer // ✅ Agregado aquí
) { }


 // Handler para evento "popstate", declarado como propiedad para poder removerlo luego
private onPopStateHandler = () => {
  this.closeAllModals();
};



ngOnInit(): void {
  // Inicializar proyectos filtrados
  this.updateFilteredProjects();

  // Activar animaciones después de un delay
  setTimeout(() => {
    this.animationsLoaded = true;
    this.initAnimations();
  }, 300);

  // Listener para botón atrás del navegador (corrige error original con this.location.onPopState)
  window.addEventListener('popstate', this.onPopStateHandler);
}

ngOnDestroy(): void {
  // Limpiar recursos
  this.selectedProject = null;
  this.selectedWAD = null;

  // Remover el listener del historial para evitar fugas de memoria
  window.removeEventListener('popstate', this.onPopStateHandler);
}



  /**
   * Listener para tecla ESC para cerrar modales
   */
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    this.closeAllModals();
  }

  /**
   * Obtiene todos los proyectos combinados
   * @returns Array con todos los proyectos
   */
  getAllProjects(): Project[] {
    return [...this.professionalProjects, ...this.personalProjects, ...this.creativeProjects]
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }

  /**
   * CORRECCIÓN: Obtiene proyectos filtrados usando array interno
   * Esto evita el bug de transparencia al cambiar filtros
   * @returns Array de proyectos filtrados
   */
  getFilteredProjects(): Project[] {
    return this.filteredProjects;
  }

  /**
   * Obtiene solo proyectos destacados
   * @returns Array de proyectos featured
   */
  getFeaturedProjects(): Project[] {
    return getFeaturedProjects();
  }

  /**
   * CORRECCIÓN: Cambia el filtro activo y actualiza proyectos de forma segura.
   * CORREGIDO: se agregó guard para clicks repetidos sobre el mismo filtro (mismo
   * bug que afectaba a Skills: reinvocar la animación de entrada en cada click,
   * incluso sobre el filtro ya activo, podía dejar tarjetas invisibles con
   * doble-click rápido). Ver refreshVisibleProjectCards().
   * @param filter - Nuevo filtro a aplicar
   */
  setActiveFilter(filter: ProjectCategory | 'all'): void {
    if (this.activeFilter === filter) {
      return;
    }

    console.log('Cambiando filtro a:', filter);

    // Actualizar filtro activo
    this.activeFilter = filter;

    // Actualizar proyectos filtrados
    this.updateFilteredProjects();

    // Forzar detección de cambios
    this.cdr.detectChanges();

    // Asegurar visibilidad de las tarjetas ya filtradas (sin re-animación frágil)
    setTimeout(() => {
      this.refreshVisibleProjectCards();
    }, 50);
  }

  /**
   * NUEVO: Cambia el filtro de área profesional (Desarrollo/Datos/Sistemas-Soporte)
   * y actualiza la lista de proyectos, combinándolo con el filtro de categoría activo.
   * @param area - Nueva área a filtrar
   */
  setActiveArea(area: ProjectArea | 'all'): void {
    if (this.activeArea === area) {
      return;
    }

    this.activeArea = area;
    this.updateFilteredProjects();
    this.cdr.detectChanges();

    setTimeout(() => {
      this.refreshVisibleProjectCards();
    }, 50);
  }

  /**
   * CORRECCIÓN: Actualiza la lista de proyectos filtrados de forma segura
   * Aplica primero el filtro de categoría (origen) y luego el de área profesional
   * (Desarrollo/Datos/Sistemas-Soporte), que son independientes entre sí.
   */
  private updateFilteredProjects(): void {
    const allProjects = this.getAllProjects();

    let result = this.activeFilter === 'all'
      ? [...allProjects]
      : allProjects.filter(project => project.category === this.activeFilter);

    if (this.activeArea !== 'all') {
      result = result.filter(project => project.areas.includes(this.activeArea as ProjectArea));
    }

    this.filteredProjects = result;

    console.log('Proyectos filtrados actualizados:', this.filteredProjects.length);
  }

  /**
   * Maneja el error de carga de imagen reemplazando con icono
   * @param event - Evento de error de imagen
   */
  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (target && target.parentElement) {
      // Crear ion-icon de reemplazo
      const iconElement = document.createElement('ion-icon');
      iconElement.name = 'folder';
      iconElement.className = 'project-icon-fallback';
      iconElement.style.cssText = 'font-size: 60px; color: var(--ion-color-medium); width: 100%; height: 200px; display: flex; align-items: center; justify-content: center;';
      
      // Reemplazar img con ion-icon
      target.parentElement.replaceChild(iconElement, target);
    }
  }

  /**
   * Abre un proyecto en nueva pestaña
   * @param project - Proyecto a abrir
   */
  openProject(project: Project): void {
    if (project.links.live) {
      window.open(project.links.live, '_blank', 'noopener,noreferrer');
    } else if (project.links.demo) {
      window.open(project.links.demo, '_blank', 'noopener,noreferrer');
    }
  }

  /**
   * Abre el repositorio de un proyecto
   * @param project - Proyecto cuyo repo abrir
   */
  openRepository(project: Project): void {
    if (project.links.repository) {
      window.open(project.links.repository, '_blank', 'noopener,noreferrer');
    }
  }

  /**
   * Abre modal con detalles completos del proyecto
   * @param project - Proyecto a mostrar en detalle
   */
  openProjectDetail(project: Project): void {
    // Si es un WAD, usar modal especializado
    if (project.category === 'creative' && project.type === 'game-mod') {
      this.openWADDetail(project);
    } else {
      this.selectedProject = project;
    }
  }

  /**
   * NUEVO: Abre modal especializado para WADs
   * @param wad - Proyecto WAD a mostrar
   */
  openWADDetail(wad: Project): void {
    console.log('Abriendo modal de WAD:', wad.title);
    this.selectedWAD = wad;
    this.showWADModal = true;
    
    // Agregar clase al body para prevenir scroll
    document.body.classList.add('modal-open');
  }

  /**
   * Cierra el modal de detalles de proyecto
   */
  closeProjectDetail(): void {
    this.selectedProject = null;
  }

  /**
   * NUEVO: Cierra el modal de WAD
   */
  closeWADDetail(): void {
    this.selectedWAD = null;
    this.showWADModal = false;
    
    // Remover clase del body
    document.body.classList.remove('modal-open');
  }

  /**
   * NUEVO: Cierra todos los modales
   */
  closeAllModals(): void {
    this.closeProjectDetail();
    this.closeWADDetail();
  }

  /**
   * Descarga un WAD de Doom
   * @param project - Proyecto WAD a descargar
   */
  async downloadWAD(project: Project): Promise<void> {
    try {
      if (project.links.download && project.wadAvailable) {
        await this.downloadService.downloadDoomWAD();
        console.log('Descarga iniciada para:', project.title);
      } else {
        console.warn('WAD no disponible para descarga:', project.title);
        // Mostrar mensaje al usuario
        this.showWADNotAvailableMessage(project);
      }
    } catch (error) {
      console.error('Error al descargar WAD:', error);
    }
  }

  /**
   * NUEVO: Muestra mensaje cuando WAD no está disponible
   * @param project - Proyecto WAD
   */
  private showWADNotAvailableMessage(project: Project): void {
    // Aquí podrías integrar con un servicio de toast/alert
    alert(`El archivo WAD de "${project.title}" no está disponible para descarga.`);
  }

  /**
   * NUEVO: Obtiene la URL del iframe de YouTube
   * @param videoUrl - URL original de YouTube
   * @returns URL para embed
   */
getYouTubeEmbedUrl(videoUrl: string): SafeResourceUrl {
  if (!videoUrl) return this.sanitizer.bypassSecurityTrustResourceUrl('');

  const videoIdMatch = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : '';

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`;
  return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
}

  /**
   * NUEVO: Verifica si un proyecto tiene video disponible
   * @param project - Proyecto a verificar
   * @returns true si tiene video
   */
  hasVideo(project: Project): boolean {
    return !!(project.videoUrl || project.links.video);
  }

  /**
   * NUEVO: Obtiene la URL del video del proyecto
   * @param project - Proyecto
   * @returns URL del video
   */
  getVideoUrl(project: Project): string {
    return project.videoUrl || project.links.video || '';
  }

  /**
   * Obtiene el icono apropiado para cada categoría de proyecto
   * @param category - Categoría del proyecto
   * @returns Nombre del icono
   */
  getCategoryIcon(category: ProjectCategory): string {
    const icons = {
      'professional': 'briefcase',
      'academic': 'school',
      'creative': 'game-controller',
      'personal': 'person'
    };
    return icons[category] || 'folder';
  }

  /**
   * Obtiene el label en español para cada categoría de proyecto
   * @param category - Categoría del proyecto
   * @returns Nombre legible de la categoría
   */
  getCategoryLabel(category: ProjectCategory): string {
    const labels = {
      'professional': 'Profesional',
      'academic': 'Académico',
      'personal': 'Personal',
      'creative': 'Creativo'
    };
    return labels[category] || category;
  }

  /**
   * Obtiene el color para cada categoría de proyecto
   * @param category - Categoría del proyecto
   * @returns Color CSS
   */
  getCategoryColor(category: ProjectCategory): string {
    const colors = {
      'professional': 'var(--ion-color-primary)',
      'academic': '#6C5CE7',
      'creative': 'var(--ion-color-accent)',
      'personal': '#00CEC9'
    };
    return colors[category] || 'var(--ion-color-primary)';
  }

  /**
   * Obtiene el label de estado del proyecto
   * @param status - Estado del proyecto
   * @returns String con el label
   */
  getStatusLabel(status: string): string {
    const labels = {
      'completed': 'Completado',
      'in-production': 'En Producción',
      'maintenance': 'Mantenimiento',
      'archived': 'Archivado'
    };
    return labels[status as keyof typeof labels] || status;
  }

  /**
   * Verifica si un proyecto tiene enlaces disponibles
   * @param project - Proyecto a verificar
   * @returns true si tiene enlaces
   */
  hasAvailableLinks(project: Project): boolean {
    return !!(project.links.live || project.links.demo || project.links.repository || project.links.download);
  }

  /**
   * Formatea la fecha de un proyecto
   * @param date - Fecha a formatear
   * @returns String con fecha formateada
   */
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.toLocaleString('es', { month: 'short' });
    return `${month} ${year}`;
  }

  /**
   * Navega a la sección de skills.
   * CORREGIDO: antes usaba `window.location.href`, lo que forzaba una recarga
   * completa de la página (perdiendo la navegación fluida de la SPA). Ahora usa
   * el Router de Angular, igual que el resto de la navegación interna del sitio.
   */
  scrollToSkills(): void {
    this.router.navigate(['/skills']).catch(err => console.error('Error navegando a skills:', err));
  }

  /**
   * Navega a la sección de contacto.
   * CORREGIDO: mismo bug que scrollToSkills() (recarga completa evitable).
   */
  scrollToContact(): void {
    this.router.navigate(['/contact']).catch(err => console.error('Error navegando a contacto:', err));
  }

  /**
   * CORRECCIÓN: Inicializa animaciones mejoradas
   */
  private initAnimations(): void {
    try {
      // Animar elementos principales
      const animatedElements = document.querySelectorAll('.projects-animate');
      
      animatedElements.forEach((element, index) => {
        this.animationService.observeElement(
          element,
          'slideInUp',
          0.1
        );
      });

      // Animar tarjetas de proyecto (solo en la carga inicial de la página)
      this.animateProjectCardsOnLoad();
    } catch (error) {
      console.warn('Error en animaciones:', error);
    }
  }

  /**
   * Anima la entrada de las tarjetas SOLO en la carga inicial de la página,
   * usando el IntersectionObserver de AnimationService (fade/scale al entrar
   * en viewport). NO se debe volver a llamar en cambios de filtro: reinvocar
   * `observeElement()` sobre elementos ya visibles fuerza su opacidad a 0 de
   * inmediato y depende de que el observer vuelva a disparar — con clicks
   * rápidos/repetidos en los filtros esto podía dejar tarjetas invisibles de
   * forma permanente (mismo bug ya detectado y corregido antes en Skills).
   * Para cambios de filtro se usa refreshVisibleProjectCards() en su lugar.
   */
  private animateProjectCardsOnLoad(): void {
    try {
      setTimeout(() => {
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach((card, index) => {
          (card as HTMLElement).style.opacity = '1';
          (card as HTMLElement).style.transform = 'none';

          setTimeout(() => {
            this.animationService.observeElement(card, 'scaleIn', 0.2);
          }, index * 50);
        });
      }, 50);
    } catch (error) {
      console.warn('Error al animar tarjetas:', error);
    }
  }

  /**
   * Asegura que las tarjetas visibles tras cambiar un filtro queden con opacidad
   * y posición normales, de forma directa e inmediata (sin animación de reingreso
   * ni IntersectionObserver). La transición suave de aparición la sigue dando el
   * `transition` propio de `.project-card` en el SCSS del componente.
   */
  private refreshVisibleProjectCards(): void {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      (card as HTMLElement).style.opacity = '1';
      (card as HTMLElement).style.transform = 'none';
    });
  }
}