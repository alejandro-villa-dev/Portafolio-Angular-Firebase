/**
 * ARCHIVO: src/app/services/theme.service.ts
 * 
 * DESCRIPCIÓN:
 * Servicio para manejar el cambio entre tema claro y oscuro.
 * Persiste la preferencia del usuario en localStorage.
 * Aplica automáticamente la clase correspondiente al document.body.
 */

import { Injectable, Renderer2, RendererFactory2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  
  private renderer: Renderer2;
  private readonly THEME_KEY = 'portfolio-theme';
  private currentTheme: 'light' | 'dark' = 'light';

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  /**
   * Carga el tema guardado del usuario al iniciar la aplicación
   */
  loadTheme(): void {
    try {
      // Obtener tema guardado del localStorage
      const savedTheme = localStorage.getItem(this.THEME_KEY) as 'light' | 'dark';
      
      if (savedTheme) {
        this.currentTheme = savedTheme;
      } else {
        // Si no hay tema guardado, usar preferencia del sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.currentTheme = prefersDark ? 'dark' : 'light';
      }
      
      this.applyTheme(this.currentTheme);
    } catch (error) {
      console.warn('Error al cargar tema:', error);
      // Fallback a tema claro
      this.applyTheme('light');
    }
  }

  /**
   * Cambia entre tema claro y oscuro
   */
  toggleTheme(): void {
    const nextTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.switchTheme(nextTheme);
  }

  /**
   * Establece un tema específico
   * @param theme - Tema a aplicar ('light' | 'dark')
   */
  setTheme(theme: 'light' | 'dark'): void {
    this.switchTheme(theme);
  }

  /**
   * Aplica y guarda un tema, usando la View Transitions API del navegador cuando
   * está disponible para un cambio más elegante (un "barrido" suave en vez de un
   * corte abrupto de colores). Si el navegador no la soporta (ej. Firefox/Safari
   * en versiones antiguas), cae de forma segura al cambio instantáneo de clase,
   * que igual se ve suave gracias a la transición de color definida en global.scss.
   * @param theme - Tema a aplicar y persistir
   */
  private switchTheme(theme: 'light' | 'dark'): void {
    const applyAndSave = () => {
      this.currentTheme = theme;
      this.applyTheme(theme);
      this.saveTheme(theme);
    };

    const doc = this.document as Document & {
      startViewTransition?: (callback: () => void) => void;
    };

    // Respetar la preferencia de "menos movimiento" del usuario también aquí
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && typeof doc.startViewTransition === 'function') {
      doc.startViewTransition(applyAndSave);
    } else {
      applyAndSave();
    }
  }

  /**
   * Obtiene el tema actual
   * @returns Tema actual
   */
  getCurrentTheme(): 'light' | 'dark' {
    return this.currentTheme;
  }

  /**
   * Verifica si está en modo oscuro
   * @returns true si está en modo oscuro
   */
  isDarkMode(): boolean {
    return this.currentTheme === 'dark';
  }

  /**
   * Aplica el tema al document.body
   * @param theme - Tema a aplicar
   */
  private applyTheme(theme: 'light' | 'dark'): void {
    try {
      // Remover clases de tema existentes
      this.renderer.removeClass(this.document.body, 'light-theme');
      this.renderer.removeClass(this.document.body, 'dark-theme');
      
      // Aplicar nueva clase de tema
      this.renderer.addClass(this.document.body, `${theme}-theme`);
      
      // También aplicar al elemento html para mayor compatibilidad
      this.renderer.removeClass(this.document.documentElement, 'light-theme');
      this.renderer.removeClass(this.document.documentElement, 'dark-theme');
      this.renderer.addClass(this.document.documentElement, `${theme}-theme`);
      
      // Actualizar meta theme-color para móviles
      this.updateMetaThemeColor(theme);
      
    } catch (error) {
      console.error('Error al aplicar tema:', error);
    }
  }

  /**
   * Guarda el tema en localStorage
   * @param theme - Tema a guardar
   */
  private saveTheme(theme: 'light' | 'dark'): void {
    try {
      localStorage.setItem(this.THEME_KEY, theme);
    } catch (error) {
      console.warn('Error al guardar tema en localStorage:', error);
    }
  }

  /**
   * Actualiza el meta theme-color para la barra de estado en móviles
   * @param theme - Tema actual
   */
  private updateMetaThemeColor(theme: 'light' | 'dark'): void {
    try {
      let themeColorMeta = this.document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
      
      if (!themeColorMeta) {
        themeColorMeta = this.renderer.createElement('meta');
        this.renderer.setAttribute(themeColorMeta, 'name', 'theme-color');
        this.renderer.appendChild(this.document.head, themeColorMeta);
      }
      
      // Colores para la barra de estado
      const themeColors = {
        light: '#f8f9fa',
        dark: '#0f1419'
      };
      
      this.renderer.setAttribute(themeColorMeta, 'content', themeColors[theme]);
    } catch (error) {
      console.warn('Error al actualizar meta theme-color:', error);
    }
  }

  /**
   * Escucha cambios en la preferencia del sistema
   */
  watchSystemTheme(): void {
    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      mediaQuery.addEventListener('change', (e) => {
        // Solo cambiar si no hay preferencia guardada del usuario
        const savedTheme = localStorage.getItem(this.THEME_KEY);
        if (!savedTheme) {
          const systemTheme = e.matches ? 'dark' : 'light';
          this.setTheme(systemTheme);
        }
      });
    } catch (error) {
      console.warn('Error al configurar listener del sistema:', error);
    }
  }
}