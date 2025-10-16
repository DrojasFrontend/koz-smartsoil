import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas de los archivos JSON
const DATA_DIR = path.join(__dirname, '..', 'data');
const SECTORES_FILE = path.join(DATA_DIR, 'sectores.json');
const METRICAS_FILE = path.join(DATA_DIR, 'metricas.json');

/**
 * Asegura que el directorio de datos existe
 */
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

/**
 * Lee un archivo JSON de forma segura
 * @param {string} filePath - Ruta del archivo
 * @param {any} defaultValue - Valor por defecto si el archivo no existe
 * @returns {Promise<any>} - Contenido del archivo
 */
async function readJsonFile(filePath, defaultValue = []) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return defaultValue;
    }
    throw new Error(`Error leyendo archivo JSON: ${error.message}`);
  }
}

/**
 * Escribe un archivo JSON de forma segura
 * @param {string} filePath - Ruta del archivo
 * @param {any} data - Datos a escribir
 */
async function writeJsonFile(filePath, data) {
  try {
    await ensureDataDir();
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    throw new Error(`Error escribiendo archivo JSON: ${error.message}`);
  }
}

/**
 * Obtiene todos los sectores
 * @returns {Promise<Array>} - Lista de sectores
 */
export async function getSectores() {
  try {
    return await readJsonFile(SECTORES_FILE, []);
  } catch (error) {
    console.error('Error obteniendo sectores:', error);
    throw error;
  }
}

/**
 * Obtiene un sector por ID
 * @param {number} id - ID del sector
 * @returns {Promise<Object|null>} - Sector encontrado o null
 */
export async function getSectorById(id) {
  try {
    const sectores = await getSectores();
    return sectores.find(sector => sector.id === id) || null;
  } catch (error) {
    console.error('Error obteniendo sector por ID:', error);
    throw error;
  }
}

/**
 * Guarda la lista de sectores
 * @param {Array} sectores - Lista de sectores
 */
export async function saveSectores(sectores) {
  try {
    await writeJsonFile(SECTORES_FILE, sectores);
  } catch (error) {
    console.error('Error guardando sectores:', error);
    throw error;
  }
}

/**
 * Obtiene todas las métricas actuales
 * @returns {Promise<Array>} - Lista de métricas
 */
export async function getMetricas() {
  try {
    return await readJsonFile(METRICAS_FILE, []);
  } catch (error) {
    console.error('Error obteniendo métricas:', error);
    throw error;
  }
}

/**
 * Obtiene métricas de un sector específico
 * @param {number} sectorId - ID del sector
 * @returns {Promise<Object|null>} - Métricas del sector o null
 */
export async function getMetricasBySector(sectorId) {
  try {
    const metricas = await getMetricas();
    return metricas.find(metrica => metrica.sector_id === sectorId) || null;
  } catch (error) {
    console.error('Error obteniendo métricas por sector:', error);
    throw error;
  }
}

/**
 * Guarda las métricas actuales
 * @param {Array} metricas - Lista de métricas
 */
export async function saveMetricas(metricas) {
  try {
    await writeJsonFile(METRICAS_FILE, metricas);
  } catch (error) {
    console.error('Error guardando métricas:', error);
    throw error;
  }
}

/**
 * Actualiza las métricas de un sector específico
 * @param {number} sectorId - ID del sector
 * @param {Object} nuevasMetricas - Nuevas métricas
 */
export async function updateMetricasSector(sectorId, nuevasMetricas) {
  try {
    const metricas = await getMetricas();
    const index = metricas.findIndex(m => m.sector_id === sectorId);
    
    const metricasActualizadas = {
      sector_id: sectorId,
      ...nuevasMetricas,
      timestamp: new Date().toISOString()
    };
    
    if (index >= 0) {
      metricas[index] = metricasActualizadas;
    } else {
      metricas.push(metricasActualizadas);
    }
    
    await saveMetricas(metricas);
    return metricasActualizadas;
  } catch (error) {
    console.error('Error actualizando métricas del sector:', error);
    throw error;
  }
}

/**
 * Verifica que los archivos de datos estén disponibles
 * @returns {Promise<boolean>} - True si todo está funcionando
 */
export async function testConnection() {
  try {
    await ensureDataDir();
    
    // Intentar leer ambos archivos
    await getSectores();
    await getMetricas();
    
    console.log('JSON data files accessible');
    return true;
  } catch (error) {
    console.error('JSON data access failed:', error);
    return false;
  }
}

/**
 * Función de utilidad para simular queries SQL básicas con JSON
 * @param {string} operation - Tipo de operación (SELECT, INSERT, UPDATE)
 * @param {string} table - Tabla (sectores o metricas)
 * @param {Object} options - Opciones adicionales
 */
export async function query(operation, table, options = {}) {
  try {
    const start = Date.now();
    
    if (table === 'sectores') {
      if (operation === 'SELECT') {
        const sectores = await getSectores();
        const result = options.where ? 
          sectores.filter(options.where) : sectores;
        
        if (process.env.NODE_ENV === 'development') {
          console.log(`Query executed: SELECT from ${table}`, { 
            duration: Date.now() - start, 
            rows: result.length 
          });
        }
        
        return { rows: result, rowCount: result.length };
      }
    } else if (table === 'metricas') {
      if (operation === 'SELECT') {
        const metricas = await getMetricas();
        const result = options.where ? 
          metricas.filter(options.where) : metricas;
        
        if (process.env.NODE_ENV === 'development') {
          console.log(`Query executed: SELECT from ${table}`, { 
            duration: Date.now() - start, 
            rows: result.length 
          });
        }
        
        return { rows: result, rowCount: result.length };
      }
    }
    
    throw new Error(`Operación no soportada: ${operation} en ${table}`);
    
  } catch (error) {
    console.error('JSON query error:', error);
    throw error;
  }
}