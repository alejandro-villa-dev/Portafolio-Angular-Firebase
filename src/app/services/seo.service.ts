/**
 * ARCHIVO: src/app/services/seo.service.ts
 *
 * DESCRIPCIÓN:
 * Servicio para optimización SEO del portafolio de Alejandro Villa.
 * Maneja meta tags, títulos, descripciones y structured data para
 * mejorar la visibilidad en motores de búsqueda y redes sociales.
 * Optimizado para las 3 áreas del posicionamiento actual: Soporte de Aplicaciones/TI,
 * Desarrollo (Angular/Ionic/Firebase) y Datos (SQL/Python/Excel).
 * NOTA: sin geo.region/geo.placename ni dirección en structured data a propósito
 * (búsqueda de trabajo 100% remoto, sin ubicación/país indexado).
 * IMPORTANTE: este servicio se inyecta y usa desde AppComponent (ver app.component.ts),
 * que llama a updateMetaForSection() en cada NavigationEnd y a addStructuredData() una
 * sola vez al iniciar.
 */

import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

/**
 * Interfaz para configuración de meta tags
 */
interface MetaConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  // Configuración base del sitio
  private readonly SITE_CONFIG = {
    siteName: 'Alejandro Villa - Ingeniero Informático',
    baseUrl: 'https://portafolio-alejandro-villa.web.app',
    defaultImage: 'assets/images/placeholder.svg',
    author: 'Alejandro Villa Villavicencio',
    locale: 'es'
  };

  // Keywords principales para SEO (orientado a las 3 áreas: Soporte, Desarrollo y Datos)
  private readonly PRIMARY_KEYWORDS = [
    'Ingeniero Informático',
    'Analista TI',
    'Soporte TI N1/N2',
    'Soporte de Aplicaciones',
    'ITSM',
    'GLPI',
    'ServiceNow',
    'Active Directory',
    'Angular Junior',
    'Ionic',
    'Firebase',
    'Python',
    'Django',
    'Análisis de Datos',
    'SQL',
    'Excel Avanzado',
    'Business Intelligence',
    'Alejandro Villa',
    'Trabajo remoto TI'
  ];

  constructor(
    private meta: Meta,
    private title: Title
  ) {
    // Configurar meta tags base al inicializar
    this.setBaseMeta();
  }

  /**
   * Configura meta tags para una sección específica
   * @param config - Configuración de meta tags
   */
  setMetaTags(config: MetaConfig): void {
    // Actualizar título de la página
    this.title.setTitle(config.title);

    // Meta tags básicos
    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ name: 'keywords', content: config.keywords || this.getDefaultKeywords() });
    this.meta.updateTag({ name: 'author', content: this.SITE_CONFIG.author });

    // Open Graph tags para redes sociales
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:type', content: config.type || 'website' });
    this.meta.updateTag({ property: 'og:url', content: config.url || this.SITE_CONFIG.baseUrl });
    this.meta.updateTag({ property: 'og:image', content: config.image || this.SITE_CONFIG.defaultImage });
    this.meta.updateTag({ property: 'og:site_name', content: this.SITE_CONFIG.siteName });
    this.meta.updateTag({ property: 'og:locale', content: this.SITE_CONFIG.locale });

    // Twitter Card tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: config.image || this.SITE_CONFIG.defaultImage });

    // Meta tags adicionales
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'language', content: 'Spanish' });
  }

  /**
   * Configura SEO para la página de inicio
   */
  setHomeMeta(): void {
    this.setMetaTags({
      title: 'Alejandro Villa | Ingeniero Informático · Soporte de Aplicaciones · Desarrollo · Datos',
      description:
        'Portafolio profesional de Alejandro Villa, Ingeniero Informático con experiencia en soporte TI N1/N2, soporte de aplicaciones, desarrollo con Angular, Ionic y Firebase, y análisis de datos con SQL, Python y Excel.',
      keywords: this.getDefaultKeywords(),
      type: 'profile'
    });
  }

  /**
   * Configura SEO para la sección Sobre Mí
   */
  setAboutMeta(): void {
    this.setMetaTags({
      title: 'Sobre Mí - Alejandro Villa | Ingeniero Informático',
      description:
        'Ingeniero Informático que comenzó en soporte técnico y hoy combina soporte de aplicaciones/TI N1-N2, desarrollo web/móvil y análisis de datos. Experiencia real con usuarios, sistemas, documentación y formación constante.',
      keywords:
        'Sobre mí Ingeniero Informático, Perfil soporte técnico, Soporte de aplicaciones, Desarrollo, Análisis de datos, trabajo remoto'
    });
  }

  /**
   * Configura SEO para la sección de Experiencia
   */
  setExperienceMeta(): void {
    this.setMetaTags({
      title: 'Experiencia Laboral - Alejandro Villa | Soporte TI, Desarrollo y Datos',
      description:
        'Experiencia en soporte N1/N2, gestión de tickets en GLPI y ServiceNow, administración de Active Directory, desarrollo con Angular/Ionic/Firebase y un caso real de validación de datos con SQL y Python.',
      keywords:
        'Experiencia Soporte TI N1/N2, GLPI, ServiceNow, Active Directory, análisis de datos, documentación técnica'
    });
  }

  /**
   * Configura SEO para la sección de Proyectos
   */
  setProjectsMeta(): void {
    this.setMetaTags({
      title: 'Proyectos - Alejandro Villa | Desarrollo, Datos y Soporte',
      description:
        'Proyectos profesionales, académicos y personales con Angular, Ionic y Firebase, un caso real de limpieza de datos con SQL/Python, una app Android de gestión de compras y este mismo portafolio como proyecto.',
      keywords:
        'Proyectos Angular junior, Ionic, Firebase, análisis de datos SQL Python, aplicaciones web y móviles'
    });
  }

  /**
   * Configura SEO para la sección de Skills
   */
  setSkillsMeta(): void {
    this.setMetaTags({
      title: 'Competencias Técnicas - Alejandro Villa | Soporte, Desarrollo y Datos',
      description:
        'Competencias en soporte TI N1/N2 (GLPI/ServiceNow/Active Directory), desarrollo web junior con Angular/Ionic/Firebase, y análisis de datos con SQL, Python y Excel avanzado.',
      keywords:
        'Skills Soporte TI N1/N2, GLPI, ServiceNow, Active Directory, Angular junior, Firebase, SQL, Excel avanzado, Business Intelligence'
    });
  }

  /**
   * Configura SEO para la sección de Contacto
   */
  setContactMeta(): void {
    this.setMetaTags({
      title: 'Contacto - Alejandro Villa | Ingeniero Informático (100% Remoto)',
      description:
        'Contacta a Alejandro Villa para oportunidades 100% remotas en Soporte TI N1/N2, desarrollo web/móvil junior o análisis de datos.',
      keywords:
        'Contacto Ingeniero Informático, Soporte TI remoto, Desarrollo junior, Análisis de datos, Alejandro Villa contacto'
    });
  }

  /**
   * Configura SEO para la página 404 (no indexable: no debe competir en buscadores)
   */
  setNotFoundMeta(): void {
    this.setMetaTags({
      title: 'Página No Encontrada - Alejandro Villa',
      description: 'La página solicitada no existe. Navega a las secciones disponibles del portafolio de Alejandro Villa.'
    });
    // No indexar esta página específica (a diferencia del resto del sitio)
    this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
  }

  /**
   * Añade structured data para mejorar SEO
   */
  addStructuredData(): void {
    // NOTA: sin "address"/"occupationLocation" a propósito (búsqueda de trabajo 100% remoto,
    // sin ubicación/país indexado en el sitio público).
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Alejandro Villa Villavicencio',
      jobTitle: 'Ingeniero Informático - Soporte de Aplicaciones · Desarrollo · Datos',
      description:
        'Ingeniero Informático con experiencia en soporte TI N1/N2 y soporte de aplicaciones (GLPI/ServiceNow/Active Directory), desarrollo web/móvil con Angular, Ionic y Firebase, y análisis de datos con SQL, Python y Excel.',
      url: this.SITE_CONFIG.baseUrl,
      image: this.SITE_CONFIG.defaultImage,
      email: 'alejandro.villa91@gmail.com',
      telephone: '+524925599064',
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'DuocUC',
        url: 'https://www.duoc.cl'
      },
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Ingeniero Informático - Soporte de Aplicaciones, Desarrollo y Datos'
      },
      knowsAbout: [
        'Soporte TI N1/N2',
        'Soporte de Aplicaciones',
        'ITSM',
        'GLPI',
        'ServiceNow',
        'Active Directory',
        'Mesa de ayuda',
        'Angular',
        'Ionic',
        'Firebase',
        'Python',
        'Django',
        'SQL',
        'Excel Avanzado',
        'Análisis de Datos',
        'Business Intelligence',
        'Documentación técnica'
      ],
      sameAs: [
        'https://www.linkedin.com/in/alejandro-villa-villavicencio/',
        'https://github.com/alejandro-villa-dev'
      ]
    };

    // Crear o actualizar script de structured data
    this.updateStructuredDataScript(structuredData);
  }

  /**
   * Configura meta tags base del sitio
   */
  private setBaseMeta(): void {
    // Meta tags básicos que siempre deben estar
    this.meta.addTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' });
    this.meta.addTag({ name: 'theme-color', content: '#1a73e8' });
    this.meta.addTag({ name: 'msapplication-TileColor', content: '#1a73e8' });
    this.meta.addTag({ name: 'apple-mobile-web-app-capable', content: 'yes' });
    this.meta.addTag({ name: 'apple-mobile-web-app-status-bar-style', content: 'default' });

    // Meta tags para motores de búsqueda
    this.meta.addTag({
      name: 'robots',
      content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    });
    this.meta.addTag({ name: 'googlebot', content: 'index, follow' });

    // Meta tags para performance
    this.meta.addTag({ 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' });
  }

  /**
   * Obtiene keywords por defecto
   */
  private getDefaultKeywords(): string {
    return this.PRIMARY_KEYWORDS.join(', ');
  }

  /**
   * Actualiza el script de structured data
   */
  private updateStructuredDataScript(data: any): void {
    // Remover script existente si existe
    const existingScript = document.getElementById('structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    // Crear nuevo script
    const script = document.createElement('script');
    script.id = 'structured-data';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  }

  /**
   * Configura meta tags dinámicamente según la sección activa
   * @param section - Sección activa del sitio
   */
  updateMetaForSection(section: string): void {
    switch (section) {
      case 'home':
        this.setHomeMeta();
        break;
      case 'about':
        this.setAboutMeta();
        break;
      case 'experience':
        this.setExperienceMeta();
        break;
      case 'projects':
        this.setProjectsMeta();
        break;
      case 'skills':
        this.setSkillsMeta();
        break;
      case 'contact':
        this.setContactMeta();
        break;
      case '404':
        this.setNotFoundMeta();
        break;
      default:
        this.setHomeMeta();
    }
  }
}
