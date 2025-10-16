/**
 * Utilidad para calcular estados de riego basado en métricas
 * Estados posibles: "Óptimo", "Necesita riego", "Regando"
 */

/**
 * Calcula el estado de un sector basado en sus métricas
 * @param {Object} metricas - Métricas del sector
 * @param {number} metricas.humedad - Porcentaje de humedad del suelo
 * @param {number} metricas.flujo_agua - Flujo de agua en L/min
 * @returns {string} - Estado calculado
 */
export function calcularEstado(metricas) {
  const { humedad, flujo_agua } = metricas;
  
  // Prioridad 1: Si hay flujo activo, está regando
  if (flujo_agua > 0) {
    return 'Regando';
  }
  
  // Prioridad 2: Si humedad >= 60%, está óptimo
  if (humedad >= 60) {
    return 'Óptimo';
  }
  
  // Prioridad 3: Si humedad < 50%, necesita riego
  if (humedad < 50) {
    return 'Necesita riego';
  }
  
  // Default para valores intermedios (50-59%)
  return 'Óptimo';
}

/**
 * Obtiene la clase CSS de Bootstrap para el estado
 * @param {string} estado - Estado del sector
 * @returns {string} - Clase CSS de Bootstrap
 */
export function getEstadoColor(estado) {
  const colores = {
    'Óptimo': 'success',        // Verde
    'Necesita riego': 'warning', // Naranja
    'Regando': 'primary'        // Azul
  };
  return colores[estado] || 'secondary';
}

/**
 * Obtiene el icono apropiado para el estado
 * @param {string} estado - Estado del sector
 * @returns {string} - Nombre del icono
 */
export function getEstadoIcon(estado) {
  const iconos = {
    'Óptimo': 'check-circle',
    'Necesita riego': 'exclamation-triangle',
    'Regando': 'droplet'
  };
  return iconos[estado] || 'circle';
}

/**
 * Calcula estados para múltiples sectores con sus métricas
 * @param {Array} sectores - Lista de sectores
 * @param {Array} metricas - Lista de métricas
 * @returns {Array} - Sectores con estados calculados
 */
export function calcularEstadosSectores(sectores, metricas) {
  return sectores.map(sector => {
    const metricasSector = metricas.find(m => m.sector_id === sector.id);
    
    if (!metricasSector) {
      return {
        ...sector,
        estado: 'Necesita riego', // Default si no hay métricas
        color: 'warning',
        icono: 'exclamation-triangle'
      };
    }
    
    const estado = calcularEstado(metricasSector);
    
    return {
      ...sector,
      estado,
      color: getEstadoColor(estado),
      icono: getEstadoIcon(estado),
      metricas: metricasSector
    };
  });
}

/**
 * Valida que las métricas tengan los campos requeridos
 * @param {Object} metricas - Métricas a validar
 * @returns {boolean} - True si son válidas
 */
export function validarMetricas(metricas) {
  if (!metricas || typeof metricas !== 'object') {
    return false;
  }
  
  const camposRequeridos = ['humedad', 'temperatura', 'flujo_agua', 'ahorro'];
  
  return camposRequeridos.every(campo => {
    return typeof metricas[campo] === 'number' && !isNaN(metricas[campo]);
  });
}