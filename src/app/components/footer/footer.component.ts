/**
 * ARCHIVO: src/app/components/footer/footer.component.ts
 *
 * DESCRIPCIÓN:
 * Componente Footer del portafolio de Alejandro Villa.
 * Versión compacta con acordeón para información de desarrollo.
 * Incluye links de navegación, información de contacto, enlaces sociales,
 * información de copyright y accesos rápidos.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DownloadService } from '../../services/download.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  // Información personal básica mostrada en el footer
  public personalInfo = {
    name: 'Alejandro Villa Villavicencio',
    // Alineado con el hero y el CV
    title: 'Analista TI & Soporte N1/N2 · Desarrollador Frontend Jr',
    email: 'alejandro.villa91@gmail.com',
    // Número mexicano: es el que usa para llamadas
    phone: '+52 4925599064',
    // Número chileno: es el que usa en WhatsApp
    whatsapp: '+56920913551',
    // Sin ubicación específica: búsqueda de trabajo 100% remoto
    location: 'Remoto · LATAM',
    linkedin: 'https://www.linkedin.com/in/alejandro-villa-villavicencio/',
    github: 'https://github.com/alejandro-villa-dev'
  };

  // Enlaces de navegación del sitio
  public navigationLinks = [
    { id: 'home',      label: 'Inicio',      icon: 'home' },
    { id: 'about',     label: 'Sobre Mí',   icon: 'person' },
    { id: 'experience',label: 'Experiencia',icon: 'briefcase' },
    { id: 'projects',  label: 'Proyectos',  icon: 'folder' },
    { id: 'skills',    label: 'Skills',     icon: 'code-slash' },
    { id: 'contact',   label: 'Contacto',   icon: 'mail' }
  ];

  // Enlaces rápidos (acciones directas desde el footer)
  // Hay dos CVs vigentes (Analista TI y Desarrollador Jr): se ofrecen ambos por
  // igual en vez de un "Descargar CV" genérico que obligue a elegir en un menú aparte.
  public quickLinks = [
    {
      label: 'CV Analista TI',
      action: () => this.downloadCvFile('cv-analista-ti'),
      icon: 'download'
    },
    {
      label: 'CV Desarrollador Jr',
      action: () => this.downloadCvFile('cv-desarrollador-jr'),
      icon: 'download'
    },
    {
      label: 'WAD Doom',
      action: () => this.downloadWAD(),
      icon: 'game-controller'
    },
    {
      label: 'LinkedIn',
      action: () => this.openLinkedIn(),
      icon: 'logo-linkedin'
    },
    {
      label: 'Email',
      action: () => this.sendEmail(),
      icon: 'mail'
    }
  ];

  // Información técnica del sitio (stack, versión, etc.)
  public siteInfo = {
    builtWith: ['Angular 20', 'Ionic 8', 'Firebase 11', 'TypeScript 5.4'],
    version: '1.0.0',
    lastUpdate: new Date(),
    repository: null // Privado por ahora
  };

  // Año actual para copyright
  public currentYear = new Date().getFullYear();

  // Estado del acordeón - por ahora solo se usa para la sección "development"
  public accordionStates = {
    development: false
  };

  constructor(
    private downloadService: DownloadService,
    private themeService: ThemeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // El footer se carga al final, no necesita lógica extra al iniciar
  }

  /**
   * Navega a una sección específica del portafolio.
   * @param sectionId - ID de la sección destino (home, about, projects, etc.)
   */
  navigateToSection(sectionId: string): void {
    if (!sectionId) { return; }

    // Mapeo sencillo: 'home' -> '/home', 'about' -> '/about', etc.
    const path = sectionId === 'home' ? 'home' : sectionId;
    this.router.navigate([`/${path}`]).catch(err => console.error('Error navegando a la sección:', err));
  }

  /**
   * Navega al inicio de la página (scroll suave).
   */
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  /**
   * Descarga un CV específico usando el servicio centralizado.
   * @param fileId - ID del CV a descargar (ver DownloadService.getCvFiles())
   */
  async downloadCvFile(fileId: string): Promise<void> {
    try {
      await this.downloadService.downloadCV(fileId);
    } catch (error) {
      console.error('Error al descargar CV:', error);
    }
  }

  /**
   * Descarga WAD de ejemplo de Doom (material extra del portafolio).
   */
  async downloadWAD(): Promise<void> {
    try {
      await this.downloadService.downloadDoomWAD();
    } catch (error) {
      console.error('Error al descargar WAD:', error);
    }
  }

  /**
   * Abre LinkedIn en una nueva pestaña.
   */
  openLinkedIn(): void {
    window.open(this.personalInfo.linkedin, '_blank', 'noopener,noreferrer');
  }

  /**
   * Abre GitHub en una nueva pestaña.
   */
  openGitHub(): void {
    window.open(this.personalInfo.github, '_blank', 'noopener,noreferrer');
  }

  /**
   * Abre el cliente de email del usuario con asunto predefinido.
   */
  sendEmail(): void {
    const subject = 'Contacto desde Portafolio - Alejandro Villa';
    const mailtoUrl = `mailto:${this.personalInfo.email}?subject=${encodeURIComponent(subject)}`;
    window.open(mailtoUrl, '_self');
  }

  /**
   * Inicia una llamada telefónica (en dispositivos que lo soporten).
   */
  callPhone(): void {
    window.open(`tel:${this.personalInfo.phone}`, '_self');
  }

  /**
   * Abre WhatsApp con un mensaje predefinido.
   */
  openWhatsApp(): void {
    const message = 'Hola Alejandro, te contacto desde tu portafolio web para...';
    const phoneNumber = this.personalInfo.whatsapp.replace(/[^\d]/g, '');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }

  /**
   * Cambia el tema (oscuro/claro) usando el ThemeService.
   */
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  /**
   * Indica si el sitio está en modo oscuro.
   * @returns true si el tema actual es oscuro.
   */
  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  /**
   * Copia el email al portapapeles.
   */
  async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.personalInfo.email);
      // Podrías disparar un toast o snackbar acá
      console.log('Email copiado al portapapeles');
    } catch (error) {
      console.warn('No se pudo copiar al portapapeles:', error);
    }
  }

  /**
   * Obtiene el tiempo transcurrido desde la última actualización del sitio.
   * @returns String con tiempo transcurrido (ej: "hace 3 días", "hace 2 meses").
   */
  getTimeSinceUpdate(): string {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - this.siteInfo.lastUpdate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return 'hace 1 día';
    } else if (diffDays < 30) {
      return `hace ${diffDays} días`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return months === 1 ? 'hace 1 mes' : `hace ${months} meses`;
    } else {
      const years = Math.floor(diffDays / 365);
      return years === 1 ? 'hace 1 año' : `hace ${years} años`;
    }
  }

  /**
   * Genera un mensaje de estado para el footer.
   * Se basa en el día del año para que cambie una vez al día.
   */
  getStatusMessage(): string {
    const messages = [
      '🚀 Disponible para nuevas oportunidades remotas en TI y desarrollo',
      '💻 Asegurando calidad y estabilidad en sistemas',
      '🔧 Soporte TI N1/N2 y resolución de incidentes',
      '📚 Siempre aprendiendo y mejorando mis skills',
      '⚡ 10+ años resolviendo problemas técnicos en la práctica'
    ];

    // Usar el día del año para obtener siempre el mismo mensaje por día
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
    );
    return messages[dayOfYear % messages.length];
  }

  /**
   * Cambia el estado del acordeón (solo para la sección "development").
   * @param section - clave de la sección en accordionStates.
   */
  toggleAccordion(section: keyof typeof this.accordionStates): void {
    this.accordionStates[section] = !this.accordionStates[section];
  }

  /**
   * Indica si una sección del acordeón está expandida.
   * @param section - clave de la sección en accordionStates.
   * @returns true si está expandida, false si está colapsada.
   */
  isAccordionExpanded(section: keyof typeof this.accordionStates): boolean {
    return this.accordionStates[section];
  }
}
