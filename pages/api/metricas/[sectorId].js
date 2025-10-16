import { getMetricasBySector, getSectorById } from '../../../utils/database.js';
import { calcularEstado, getEstadoColor, getEstadoIcon, validarMetricas } from '../../../utils/estadoCalculator.js';

/**
 * API Route: GET /api/metricas/[sectorId]
 * Obtiene las métricas actuales de un sector específico
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
    const { sectorId } = req.query;
    
    // Validar que sectorId sea un número válido
    const id = parseInt(sectorId);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        error: 'ID de sector inválido',
        message: 'El ID del sector debe ser un número entero positivo'
      });
    }

    // Verificar que el sector existe
    const sector = await getSectorById(id);
    if (!sector) {
      return res.status(404).json({
        error: 'Sector no encontrado',
        message: `No existe un sector con ID ${id}`
      });
    }

    // Obtener métricas del sector
    const metricas = await getMetricasBySector(id);
    if (!metricas) {
      return res.status(404).json({
        error: 'Métricas no encontradas',
        message: `No se encontraron métricas para el sector ${id}`
      });
    }

    // Validar que las métricas tienen el formato correcto
    if (!validarMetricas(metricas)) {
      return res.status(500).json({
        error: 'Datos de métricas inválidos',
        message: 'Las métricas del sector contienen datos incorrectos'
      });
    }

    // Calcular estado basado en las métricas
    const estado = calcularEstado(metricas);
    const color = getEstadoColor(estado);
    const icono = getEstadoIcon(estado);

    // Formatear respuesta con métricas y estado calculado
    const respuesta = {
      sector_id: metricas.sector_id,
      sector_nombre: sector.nombre,
      metricas: {
        humedad: metricas.humedad,
        temperatura: metricas.temperatura,
        flujo_agua: metricas.flujo_agua,
        ahorro: metricas.ahorro,
        timestamp: metricas.timestamp
      },
      estado: {
        valor: estado,
        color: color,
        icono: icono
      },
      sector_info: {
        tipo_cultivo: sector.tipo_cultivo,
        area_hectareas: sector.area_hectareas,
        num_sensores: sector.num_sensores,
        num_valvulas: sector.num_valvulas
      }
    };

    // Respuesta exitosa
    res.status(200).json({
      success: true,
      data: respuesta,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error(`Error en /api/metricas/${req.query.sectorId}:`, error);
    
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'No se pudieron obtener las métricas del sector',
      timestamp: new Date().toISOString()
    });
  }
}