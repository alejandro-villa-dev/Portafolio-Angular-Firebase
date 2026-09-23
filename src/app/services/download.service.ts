/**
 * ARCHIVO: src/app/services/download.service.ts
 * 
 * DESCRIPCIÓN:
 * Servicio para manejar descargas de archivos del portafolio.
 * Gestiona descarga de CV en PDF, WADs de Doom y otros recursos.
 * Incluye tracking de descargas, validación de archivos y manejo
 * de errores para una experiencia de usuario óptima.
 */

import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';

/**
 * Interfaz para archivos descargables
 */
interface DownloadableFile {
  id: string;
  name: string;
  filename: string;
  path: string;
  size?: string;
  type: FileType;
  description: string;
  version?: string;
}

/**
 * Tipos de archivos descargables
 */
export type FileType = 'cv' | 'wad' | 'certificate' | 'project' | 'document';

/**
 * Interfaz para tracking de descargas
 */
interface DownloadTrack {
  fileId: string;
  fileName: string;
  userAgent: string;
  timestamp: any;
  ip?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  // Archivos disponibles para descarga
  // NOTA: hay tres CVs vigentes (uno por perfil/postulación), los tres 100% remotos y sin
  // datos personales sensibles (sin RUT, edad ni ubicación). Los componentes que ofrecen
  // "Descargar CV" deben dejar elegir entre los tres en vez de asumir uno solo.
  // IMPORTANTE: los nombres de archivo usan guion bajo (sin espacios) porque así los
  // renombró Alejandro en src/assets/cv/ — deben coincidir exactamente o la descarga falla.
  private readonly AVAILABLE_FILES: DownloadableFile[] = [
    {
      id: 'cv-analista-ti',
      name: 'CV Analista TI & Soporte N1/N2',
      filename: 'Alejandro_Villa_CV_Analista_TI_Remoto.pdf',
      path: 'assets/cv/Alejandro_Villa_CV_Analista_TI_Remoto.pdf',
      size: '190 KB',
      type: 'cv',
      description: 'Currículum orientado a roles de Analista TI / Soporte N1-N2: ITSM (GLPI/ServiceNow), Active Directory e infraestructura.',
      version: '2026.1'
    },
    {
      id: 'cv-desarrollador-jr',
      name: 'CV Desarrollador Junior',
      filename: 'Alejandro_Villa_CV_Desarrollador_JR_Remoto.pdf',
      path: 'assets/cv/Alejandro_Villa_CV_Desarrollador_JR_Remoto.pdf',
      size: '191 KB',
      type: 'cv',
      description: 'Currículum orientado a roles de Desarrollador Web Junior / Full Stack Junior: Angular, Ionic, Firebase, Python/Django.',
      version: '2026.1'
    },
    {
      id: 'cv-analista-datos',
      name: 'CV Analista de Datos / BI Junior',
      filename: 'Alejandro_Villa_CV_Analista_Datos_BI_Remoto.pdf',
      path: 'assets/cv/Alejandro_Villa_CV_Analista_Datos_BI_Remoto.pdf',
      size: '190 KB',
      type: 'cv',
      description: 'Currículum orientado a roles de Analista de Datos Junior: SQL, Python, Excel avanzado y fundamentos de inteligencia de negocios.',
      version: '2026.1'
    },
    {
      id: 'doom-wad',
      name: 'WAD para DOOM II',
      filename: 'Wad_para_DOOMII.wad',
      path: 'assets/wads/Wad_para_DOOMII.wad',
      size: '856 KB',
      type: 'wad',
      description: 'Nivel personalizado para DOOM II diseñado por Alejandro Villa'
    }
  ];

  constructor(private firestore: Firestore) { }

  /**
   * Obtiene la lista de archivos disponibles para descarga
   * @param type - Filtrar por tipo de archivo (opcional)
   * @returns Array de archivos descargables
   */
  getAvailableFiles(type?: FileType): DownloadableFile[] {
    if (type) {
      return this.AVAILABLE_FILES.filter(file => file.type === type);
    }
    return this.AVAILABLE_FILES;
  }

  /**
   * Obtiene información de un archivo específico
   * @param fileId - ID del archivo
   * @returns Información del archivo o undefined si no existe
   */
  getFileInfo(fileId: string): DownloadableFile | undefined {
    return this.AVAILABLE_FILES.find(file => file.id === fileId);
  }

  /**
   * Descarga un archivo por su ID
   * @param fileId - ID del archivo a descargar
   * @returns Promise que se resuelve cuando inicia la descarga
   */
  async downloadFile(fileId: string): Promise<void> {
    const file = this.getFileInfo(fileId);
    
    if (!file) {
      throw new Error(`Archivo con ID '${fileId}' no encontrado`);
    }

    try {
      // Verificar que el archivo existe antes de intentar descargarlo
      const exists = await this.checkFileExists(file.path);
      
      if (!exists) {
        throw new Error(`El archivo ${file.filename} no está disponible en el servidor`);
      }

      // Crear enlace temporal para descarga
      const link = document.createElement('a');
      link.href = file.path;
      link.download = file.filename;
      link.target = '_blank';
      
      // Añadir al DOM temporalmente para trigger del download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Registrar la descarga para analytics
      await this.trackDownload(file);
      
      console.log(`Descarga iniciada: ${file.filename}`);
      
    } catch (error) {
      console.error('Error en descarga:', error);
      throw error;
    }
  }

  /**
   * Obtiene los CVs disponibles (hay más de uno según el perfil de postulación).
   * Los componentes con botón "Descargar CV" usan esto para ofrecer a elegir.
   * @returns Array de CVs disponibles
   */
  getCvFiles(): DownloadableFile[] {
    return this.getAvailableFiles('cv');
  }

  /**
   * Descarga un CV específico por su ID.
   * @param fileId - ID del CV a descargar (ver getCvFiles())
   */
  async downloadCV(fileId: string): Promise<void> {
    return this.downloadFile(fileId);
  }

  /**
   * Descarga el WAD de DOOM II
   * Método de conveniencia para mostrar creatividad técnica
   */
  async downloadDoomWAD(): Promise<void> {
    return this.downloadFile('doom-wad');
  }

  /**
   * Abre un archivo en nueva pestaña (para PDFs)
   * @param fileId - ID del archivo a visualizar
   */
  async viewFile(fileId: string): Promise<void> {
    const file = this.getFileInfo(fileId);
    
    if (!file) {
      throw new Error(`Archivo con ID '${fileId}' no encontrado`);
    }

    // Solo permitir visualización de PDFs por seguridad
    if (!file.filename.toLowerCase().endsWith('.pdf')) {
      throw new Error('Solo se pueden visualizar archivos PDF');
    }

    try {
      // Abrir en nueva pestaña
      window.open(file.path, '_blank', 'noopener,noreferrer');
      
      // Registrar la visualización
      await this.trackDownload(file, 'view');
      
    } catch (error) {
      console.error('Error al abrir archivo:', error);
      throw error;
    }
  }

  /**
   * Verifica si un archivo existe en el servidor
   * @param filePath - Ruta del archivo
   * @returns Promise<boolean> - true si el archivo existe
   */
  private async checkFileExists(filePath: string): Promise<boolean> {
    try {
      const response = await fetch(filePath, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Registra una descarga en Firestore para analytics
   * @param file - Información del archivo descargado
   * @param action - Tipo de acción ('download' o 'view')
   */
  private async trackDownload(file: DownloadableFile, action: 'download' | 'view' = 'download'): Promise<void> {
    try {
      // Solo trackear en producción para evitar datos de desarrollo
      if (window.location.hostname === 'localhost') {
        return;
      }

      const trackData: DownloadTrack = {
        fileId: file.id,
        fileName: file.filename,
        userAgent: navigator.userAgent,
        timestamp: serverTimestamp()
      };

      // Agregar información adicional si está disponible
      if (action === 'view') {
        (trackData as any).action = 'view';
      }

      // Guardar en Firestore
      const downloadsCollection = collection(this.firestore, 'downloads');
      await addDoc(downloadsCollection, trackData);
      
    } catch (error) {
      // No fallar la descarga si el tracking falla
      console.warn('Error al registrar descarga:', error);
    }
  }

  /**
   * Obtiene estadísticas de descargas (método para futuro panel admin)
   * @returns Observable con estadísticas básicas
   */
  getDownloadStats(): Observable<any> {
    // Por ahora retorna datos mock, en el futuro se puede conectar a Firestore
    const mockStats = {
      totalDownloads: 0,
      cvDownloads: 0,
      wadDownloads: 0,
      lastDownload: null
    };
    
    return from(Promise.resolve(mockStats));
  }

  /**
   * Genera URL de descarga directa para sharing
   * @param fileId - ID del archivo
   * @returns URL completa del archivo
   */
  getDirectDownloadUrl(fileId: string): string | null {
    const file = this.getFileInfo(fileId);
    
    if (!file) {
      return null;
    }

    // Construir URL absoluta
    const baseUrl = window.location.origin;
    return `${baseUrl}/${file.path}`;
  }

  /**
   * Valida que todos los archivos estén disponibles
   * Útil para verificar integridad del sitio
   * @returns Promise con resultados de validación
   */
  async validateAllFiles(): Promise<{ available: string[]; missing: string[] }> {
    const results = {
      available: [] as string[],
      missing: [] as string[]
    };

    for (const file of this.AVAILABLE_FILES) {
      const exists = await this.checkFileExists(file.path);
      
      if (exists) {
        results.available.push(file.filename);
      } else {
        results.missing.push(file.filename);
      }
    }

    return results;
  }
}