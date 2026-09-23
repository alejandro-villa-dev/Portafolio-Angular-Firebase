// src/app/components/hero-section/hero-section.component.ts

import { Component, OnInit } from '@angular/core';
import { DownloadService } from '../../services/download.service';
import { getHomeDisplaySkills, Skill } from '../../models/skill.model';
import { CERTIFICATIONS } from '../../models/certification.model';

/**
 * Componente Hero Section - Sección de presentación principal
 * Muestra la información principal de Alejandro: rol, resumen y skills destacadas.
 */
@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss'],
})
export class HeroSectionComponent implements OnInit {

  /**
   * Información personal mostrada en el hero.
   * IMPORTANTE: Aquí debe alinearse el mensaje con los 3 CV y el resto del portafolio.
   * Identidad principal: Ingeniero Informático con 3 áreas relacionadas (Soporte de
   * Aplicaciones, Desarrollo, Datos), no tres perfiles desconectados.
   */
  public personalInfo = {
    // Nombre completo
    name: 'Alejandro Villa Villavicencio',

    // Título principal que verá el reclutador
    title: 'Ingeniero Informático | Soporte de Aplicaciones · Desarrollo · Datos',

    // Variante corta, útil si el diseño necesita un subtítulo más breve
    titleShort: 'Soporte de Aplicaciones · Desarrollo · Datos',

    // Frase corta que resume la propuesta de valor
    tagline: 'Soporte TI N1/N2 y de aplicaciones, con desarrollo web/móvil y análisis de datos como áreas complementarias.',

    // Descripción un poco más larga (debe entenderse en menos de 10 segundos)
    description:
      'Ingeniero Informático con experiencia en soporte TI N1/N2 y soporte de aplicaciones, ' +
      'complementada con desarrollo web/móvil y análisis de datos. He trabajado con usuarios, ' +
      'incidentes, sistemas corporativos, SQL, automatización y desarrollo de soluciones utilizando ' +
      'Angular, Ionic, TypeScript, Firebase y Python.',

    // Datos de contacto (sin ubicación específica: búsqueda de trabajo 100% remoto)
    location: 'Remoto · LATAM',
    email: 'alejandro.villa91@gmail.com',
    // Número mexicano: es el que usa para llamadas (el chileno lo reserva para WhatsApp)
    phone: '+52 4925599064',

    // Perfil de LinkedIn
    linkedin: 'https://www.linkedin.com/in/alejandro-villa-villavicencio/',

    // Perfil de GitHub
    github: 'https://github.com/alejandro-villa-dev'
  };

  /**
   * Ícono (Ionicon) representativo de cada tecnología/herramienta usada en los badges
   * de las tarjetas de CV, para que se vean más llamativas que solo texto plano.
   * Reutiliza los mismos íconos que ya usa skill.model.ts para esa misma tecnología,
   * así se mantiene consistencia visual entre el Hero y la sección de Skills.
   */
  private readonly BADGE_ICONS: Record<string, string> = {
    'ServiceNow': 'construct-outline',
    'GLPI': 'ticket-outline',
    'Active Directory': 'people-circle-outline',
    'ITSM': 'settings-outline',
    'SQL': 'server-outline',
    'Angular': 'logo-angular',
    'Ionic': 'phone-portrait-outline',
    'TypeScript': 'code-slash-outline',
    'Firebase': 'flame-outline',
    'Git': 'git-branch-outline',
    'Python': 'logo-python',
    'Excel': 'grid-outline',
    'Power Query': 'funnel-outline',
    'Inteligencia de Negocios': 'bar-chart-outline'
  };

  /**
   * Metadata visual de cada perfil de CV (badges + enlace secundario), combinada en
   * tiempo real con la info real de DownloadService (nombre, descripción, ruta del PDF).
   * Centralizado aquí porque es contenido de presentación (UI), no de descarga.
   */
  private readonly CV_PROFILE_META: Record<string, { badges: string[]; secondaryLabel: string; secondaryRoute: string }> = {
    'cv-analista-ti': {
      badges: ['ServiceNow', 'GLPI', 'Active Directory', 'ITSM', 'SQL'],
      secondaryLabel: 'Ver experiencia relacionada',
      secondaryRoute: '/experience'
    },
    'cv-desarrollador-jr': {
      badges: ['Angular', 'Ionic', 'TypeScript', 'Firebase', 'Git'],
      secondaryLabel: 'Ver proyectos de desarrollo',
      secondaryRoute: '/projects'
    },
    'cv-analista-datos': {
      badges: ['SQL', 'Python', 'Excel', 'Power Query', 'Inteligencia de Negocios'],
      secondaryLabel: 'Ver experiencia en datos',
      secondaryRoute: '/experience'
    }
  };

  /**
   * Convierte los nombres de badges en objetos {label, icon} usando BADGE_ICONS.
   * @param badges - Nombres de tecnologías/herramientas (ej: 'Angular', 'SQL')
   */
  private buildBadges(badges: string[]): { label: string; icon: string }[] {
    return badges.map(label => ({
      label,
      icon: this.BADGE_ICONS[label] || 'pricetag-outline'
    }));
  }

  /** Controla si las animaciones iniciales se consideran cargadas */
  public animationsLoaded: boolean = false;

  /**
   * CVs disponibles (3 perfiles de postulación: Analista TI, Desarrollador Jr y Analista
   * de Datos). Se muestran los tres como tarjetas independientes y visibles a la vez
   * (nunca ocultas en un dropdown), para que cada una sea igual de accesible desde el hero.
   */
  public cvFiles: ReturnType<DownloadService['getCvFiles']>;

  /**
   * CVs combinados con su metadata visual (badges con ícono + enlace secundario) para
   * la sección "CV según área profesional". Ver CV_PROFILE_META y BADGE_ICONS.
   */
  public cvProfiles: (ReturnType<DownloadService['getCvFiles']>[number] & {
    badges: { label: string; icon: string }[];
    secondaryLabel: string;
    secondaryRoute: string;
  })[];

  /**
   * Certificaciones verificables (título DuocUC y certificado Python), mostradas
   * también en el home para que un reclutador las vea sin tener que entrar a "Sobre mí".
   */
  public certifications = CERTIFICATIONS;

  constructor(private downloadService: DownloadService) {
    this.cvFiles = this.downloadService.getCvFiles();
    this.cvProfiles = this.cvFiles.map(cv => {
      const meta = this.CV_PROFILE_META[cv.id];
      return {
        ...cv,
        ...meta,
        badges: this.buildBadges(meta.badges)
      };
    });
  }

  ngOnInit(): void {
    // Dejamos las animaciones como cargadas cuando el componente se inicializa
    this.animationsLoaded = true;
  }

  /**
   * Obtiene las skills destacadas para mostrar en el home (hero).
   * Se alimenta desde el modelo centralizado de skills (skill.model.ts).
   */
  getHomeDisplaySkills(): Skill[] {
    return getHomeDisplaySkills();
  }

  /**
   * Descarga un CV específico (elegido directamente desde su tarjeta en el hero).
   * @param fileId - ID del CV a descargar (ver cvFiles)
   */
  async downloadCvFile(fileId: string): Promise<void> {
    try {
      await this.downloadService.downloadCV(fileId);
    } catch (error) {
      console.error('Error al descargar CV:', error);
    }
  }

  /**
   * Abre en una pestaña nueva un CV específico (elegido directamente desde su tarjeta).
   * @param fileId - ID del CV a visualizar (ver cvFiles)
   */
  async viewCvFile(fileId: string): Promise<void> {
    try {
      await this.downloadService.viewFile(fileId);
    } catch (error) {
      console.error('Error al visualizar CV:', error);
    }
  }

  /**
   * Abrir perfil de LinkedIn en una nueva pestaña.
   */
  openLinkedIn(): void {
    window.open(this.personalInfo.linkedin, '_blank', 'noopener,noreferrer');
  }

  /**
   * Abrir perfil de GitHub en una nueva pestaña.
   */
  openGitHub(): void {
    window.open(this.personalInfo.github, '_blank', 'noopener,noreferrer');
  }

  /**
   * Abre el link oficial de verificación de una certificación (QR/credencial digital).
   * @param url - URL de verificación
   */
  openVerification(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  /**
   * Iniciar llamada telefónica.
   * Útil en dispositivos móviles: abre la app de teléfono.
   */
  callPhone(): void {
    window.open(`tel:${this.personalInfo.phone}`, '_self');
  }

  /**
   * Abrir el cliente de correo con el mail prellenado.
   */
  sendEmail(): void {
    const subject = 'Contacto desde Portafolio - Alejandro Villa';
    const mailtoUrl = `mailto:${this.personalInfo.email}?subject=${encodeURIComponent(subject)}`;
    window.open(mailtoUrl, '_self');
  }

  /**
   * Navegación suave hacia la sección de contacto.
   * Úsalo si tienes una sección con id="contact" en la página.
   */
  scrollToContact(): void {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const headerHeight = 80; // Altura aproximada del header fijo
      const elementPosition = contactSection.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Navegación suave hacia la sección "Sobre mí".
   * Útil si quieres reutilizar este componente en otras vistas.
   */
  scrollToAbout(): void {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const headerHeight = 80;
      const elementPosition = aboutSection.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }
}
