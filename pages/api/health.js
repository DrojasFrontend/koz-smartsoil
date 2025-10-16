import { testConnection, getSectores, getMetricas } from '../../utils/database.js';

/**
 * Health check endpoint para verificar estado de la aplicación y datos JSON
 * GET /api/health
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    // Verificar acceso a archivos JSON
    const dataAccessible = await testConnection();
    
    let sectoresCount = 0;
    let metricasCount = 0;
    
    if (dataAccessible) {
      try {
        const sectores = await getSectores();
        const metricas = await getMetricas();
        sectoresCount = sectores.length;
        metricasCount = metricas.length;
      } catch (error) {
        console.warn('Error contando datos:', error.message);
      }
    }
    
    const healthStatus = {
      status: dataAccessible ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      storage: {
        accessible: dataAccessible,
        type: 'JSON Files',
        sectores_count: sectoresCount,
        metricas_count: metricasCount
      },
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '0.1.0'
    };

    const statusCode = dataAccessible ? 200 : 503;
    
    res.status(statusCode).json(healthStatus);
    
  } catch (error) {
    console.error('Health check error:', error);
    
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Error en verificación de salud del sistema',
      storage: {
        accessible: false,
        error: error.message
      }
    });
  }
}