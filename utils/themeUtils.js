// Theme utilities for consistent styling across components

export const EstadoColors = {
  'Óptimo': {
    bg: 'success',
    text: 'success',
    border: 'success'
  },
  'Necesita riego': {
    bg: 'warning',
    text: 'warning', 
    border: 'warning'
  },
  'Regando': {
    bg: 'primary',
    text: 'primary',
    border: 'primary'
  }
};

export const MetricColors = {
  humedad: {
    bg: 'primary',
    text: 'primary',
    accent: 'primary'
  },
  temperatura: {
    bg: 'danger',
    text: 'danger',
    accent: 'danger'
  },
  flujo: {
    bg: 'info',
    text: 'info',
    accent: 'info'
  },
  ahorro: {
    bg: 'success',
    text: 'success',
    accent: 'success'
  }
};

export function getEstadoColor(estado) {
  return EstadoColors[estado] || EstadoColors['Óptimo'];
}

export function getMetricColor(tipo) {
  return MetricColors[tipo] || MetricColors['humedad'];
}