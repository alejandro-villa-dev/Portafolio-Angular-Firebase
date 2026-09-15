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
   * IMPORTANTE: Aquí debe alinearse el mensaje con el CV y el resto del portafolio.
   */
  public personalInfo = {
    // Nombre completo
    name: 'Alejandro Villa Villavicencio',

    // Título principal que verá el reclutador
    // Alineado con el CV: Analista TI/Soporte N1-N2 + Desarrollo Frontend Jr (perfil híbrido real)
    title: 'Analista TI & Soporte N1/N2 · Desarrollador Frontend Jr',

    // Frase corta que resume tu propuesta de valor
    tagline: 'Soporte TI N1/N2, ITSM y desarrollo frontend con Angular e Ionic para sistemas estables y funcionales.',

    // Descripción un poco más larga (2–3 líneas)
    description:
      'Ingeniero Informático con experiencia real en soporte técnico N1/N2, Active Directory e ITSM ' +
      '(GLPI/ServiceNow), combinada con desarrollo frontend en Angular/Ionic y bases de Python/Django. ' +
      'Busco una oportunidad 100% remota donde pueda aportar en soporte, calidad y desarrollo de software.',

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

  /** Controla si las animaciones iniciales se consideran cargadas */
  public animationsLoaded: boolean = false;

  /**
   * CVs disponibles (hay más de un perfil de postulación: Analista TI y Desarrollador Jr).
   * Se muestran ambos como tarjetas independientes en vez de un único botón genérico,
   * para que cada uno sea igual de accesible desde el hero.
   */
  public cvFiles: ReturnType<DownloadService['getCvFiles']>;

  /**
   * Certificaciones verificables (título DuocUC y certificado Python), mostradas
   * también en el home para que un reclutador las vea sin tener que entrar a "Sobre mí".
   */
  public certifications = CERTIFICATIONS;

  constructor(private downloadService: DownloadService) {
    this.cvFiles = this.downloadService.getCvFiles();
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
