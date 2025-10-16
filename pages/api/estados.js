import { getSectores, getMetricas } from '../../utils/database.js';
import { calcularEstadosSectores } from '../../utils/estadoCalculator.js';

/**
 * API Route: GET /api/estados
 * Calcula y retorna los estados de todos los sectores
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
    // Obtener sectores y métricas en paralelo
    const [sectores, metricas] = await Promise.all([
      getSectores(),
      getMetricas()
    ]);

    // Validar que se obtuvieron datos
    if (!sectores || sectores.length === 0) {
      return res.status(404).json({
        error: 'No se encontraron sectores',
        message: 'No hay sectores configurados en el sistema'
      });
    }

    if (!metricas || metricas.length === 0) {
      return res.status(404).json({
        error: 'No se encontraron métricas',
        message: 'No hay métricas disponibles para los sectores'
      });
    }

    // Calcular estados para todos los sectores
    const sectoresConEstados = calcularEstadosSectores(sectores, metricas);

    // Generar resumen de estados
    const resumenEstados = sectoresConEstados.reduce((resumen, sector) => {
      const estado = sector.estado;
      resumen[estado] = (resumen[estado] || 0) + 1;
      return resumen;
    }, {});

    // Formatear respuesta
    const respuesta = {
      sectores: sectoresConEstados.map(sector => ({
        id: sector.id,
        nombre: sector.nombre,
        tipo_cultivo: sector.tipo_cultivo,
        area_hectareas: sector.area_hectareas,
        estado: {
          valor: sector.estado,
          color: sector.color,
          icono: sector.icono
        },
        metricas: sector.metricas ? {
          humedad: sector.metricas.humedad,
          temperatura: sector.metricas.temperatura,
          flujo_agua: sector.metricas.flujo_agua,
          ahorro: sector.metricas.ahorro,
          timestamp: sector.metricas.timestamp
        } : null
      })),
      resumen: {
        total_sectores: sectoresConEstados.length,
        estados: resumenEstados,
        sectores_optimos: resumenEstados['Óptimo'] || 0,
        sectores_necesitan_riego: resumenEstados['Necesita riego'] || 0,
        sectores_regando: resumenEstados['Regando'] || 0
      }
    };

    // Respuesta exitosa
    res.status(200).json({
      success: true,
      data: respuesta,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error en /api/estados:', error);
    
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'No se pudieron calcular los estados de los sectores',
      timestamp: new Date().toISOString()
    });
  }
}