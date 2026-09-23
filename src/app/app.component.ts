/**
 * ARCHIVO: src/app/app.component.ts - ACTUALIZADO
 *
 * DESCRIPCIÓN:
 * Componente principal simplificado con header horizontal fijo.
 * NO usa sidemenu, usa header tradicional profesional.
 * Layout similar al proyecto anterior pero con router.
 * ACTUALIZADO: Manejo de errores y navegación mejorada.
 */

import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationError } from '@angular/router';
import { ThemeService } from '@services/theme.service';
import { SeoService } from '@services/seo.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private seoService: SeoService
  ) {
    this.initializeApp();
  }

  ngOnInit(): void {
    // Cargar tema al iniciar
    this.themeService.loadTheme();

    // Structured data (JSON-LD) una sola vez: no cambia entre secciones
    this.seoService.addStructuredData();

    // Configurar listeners de navegación
    this.setupNavigationListeners();
  }

  /**
   * Inicialización de la aplicación
   */
  private initializeApp(): void {
    console.log('🚀 Portafolio Alejandro Villa - Inicializado con header horizontal');

    // Configurar manejo global de errores
    this.setupGlobalErrorHandling();
  }

  /**
   * Configura listeners para eventos de navegación
   */
  private setupNavigationListeners(): void {
    // Listener para navegación exitosa
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      const navEvent = event as NavigationEnd;
      console.log('✅ [APP] Navegación exitosa a:', navEvent.urlAfterRedirects);

      // Scroll al top en cada navegación
      window.scrollTo(0, 0);

      // Actualizar meta tags si tienes SEO service
      this.updatePageMeta(navEvent.urlAfterRedirects);
    });

    // Listener para errores de navegación
    this.router.events.pipe(
      filter(event => event instanceof NavigationError)
    ).subscribe((event) => {
      const errorEvent = event as NavigationError;
      console.error('❌ [APP] Error de navegación:', errorEvent.error);

      // Redirigir a 404 en caso de error de navegación
      this.router.navigate(['/404']).catch(error => {
        console.error('Error crítico de navegación:', error);
        // Como último recurso, recargar la página al inicio
        window.location.href = '/home';
      });
    });
  }

  /**
   * Configura manejo global de errores de la aplicación
   */
  private setupGlobalErrorHandling(): void {
    // Listener para errores JavaScript no capturados
    window.addEventListener('error', (event) => {
      console.error('❌ [APP] Error JavaScript:', event.error);

      // Log del error para debugging
      this.logError('JavaScript Error', event.error, {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    });

    // Listener para promesas rechazadas no capturadas
    window.addEventListener('unhandledrejection', (event) => {
      console.error('❌ [APP] Promise rechazada:', event.reason);

      // Log del error para debugging
      this.logError('Unhandled Promise Rejection', event.reason);

      // Prevenir que el error se muestre en consola
      event.preventDefault();
    });
  }

  /**
   * Actualiza meta tags (título, descripción, Open Graph, Twitter Card) según la
   * sección actual, delegando en SeoService para no duplicar esta lógica.
   * @param url - URL actual (ej: '/home', '/about', '/projects/123')
   */
  private updatePageMeta(url: string): void {
    // Tomamos el primer segmento de la ruta como sección (ignora query params/sub-rutas)
    const section = url.split('/').filter(Boolean)[0] || 'home';
    this.seoService.updateMetaForSection(section);
  }

  /**
   * Registra errores para debugging y mejoras futuras
   * @param type - Tipo de error
   * @param error - Objeto del error
   * @param context - Contexto adicional
   */
  private logError(type: string, error: any, context?: any): void {
    // Solo en desarrollo - no enviar logs en producción
    if (window.location.hostname === 'localhost') {
      console.group(`🐛 [ERROR LOG] ${type}`);
      console.error('Error:', error);
      if (context) {
        console.log('Contexto:', context);
      }
      console.log('Timestamp:', new Date().toISOString());
      console.log('URL:', window.location.href);
      console.log('User Agent:', navigator.userAgent);
      console.groupEnd();
    }

    // En producción podrías enviar a un servicio de logging
    // como Sentry, LogRocket, etc.
  }

  /**
   * Maneja errores de carga de recursos (imágenes, CSS, etc.)
   */
  onResourceError(event: Event): void {
    const target = event.target as HTMLElement;
    console.warn('⚠️ [APP] Error cargando recurso:', target);

    // Si es una imagen, usar placeholder
    if (target.tagName === 'IMG') {
      (target as HTMLImageElement).src = 'assets/images/placeholder.svg';
    }
  }

  /**
   * Método de emergencia para recuperación de errores críticos
   */
  handleCriticalError(): void {
    console.error('💥 [APP] Error crítico detectado, intentando recuperación...');

    // Limpiar localStorage corrupto
    try {
      const theme = localStorage.getItem('portfolio-theme');
      localStorage.clear();
      if (theme) {
        localStorage.setItem('portfolio-theme', theme);
      }
    } catch (error) {
      console.error('Error limpiando localStorage:', error);
    }

    // Redirigir al inicio como último recurso
    setTimeout(() => {
      window.location.href = '/home';
    }, 2000);
  }
}
