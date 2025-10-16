import { getSectores } from '../../utils/database.js';

/**
 * API Route: GET /api/sectores
 * Obtiene la lista completa de sectores con información básica
 */
export default async function handler(req, res) {
  // Solo permitir método GET
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: 'Método no permitido',
      message: 'Este endpoint solo acepta peticiones GET' 
    });
  }

  try {
    // Obtener sectores desde la base de datos JSON
    const sectores = await getSectores();
    
    // Validar que se obtuvieron datos
    if (!sectores || sectores.length === 0) {
      return res.status(404).json({
        error: 'No se encontraron sectores',
        message: 'No hay sectores configurados en el sistema'
      });
    }

    // Formatear respuesta con información básica de cada sector
    const sectoresFormateados = sectores.map(sector => ({
      id: sector.id,
      nombre: sector.nombre,
      tipo_cultivo: sector.tipo_cultivo,
      area_hectareas: sector.area_hectareas,
      num_sensores: sector.num_sensores,
      num_valvulas: sector.num_valvulas,
      created_at: sector.created_at,
      updated_at: sector.updated_at
    }));

    // Respuesta exitosa
    res.status(200).json({
      success: true,
      data: sectoresFormateados,
      total: sectoresFormateados.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error en /api/sectores:', error);
    
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'No se pudieron obtener los sectores',
      timestamp: new Date().toISOString()
    });
  }
}