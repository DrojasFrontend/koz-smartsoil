import React from 'react';

export default function Icon({ name, className = '', size = 'fs-5' }) {
  return <i className={`bi bi-${name} ${size} ${className}`}></i>;
}

// Predefined icon sets for consistency
export const SectorIcons = {
  paltos: 'tree-fill',
  tomates: 'circle-fill',
  lechugas: 'flower1',
  maiz: 'grain'
};

export const StateIcons = {
  'Óptimo': 'check-circle-fill',
  'Necesita riego': 'exclamation-triangle-fill',
  'Regando': 'droplet-fill'
};

export const MetricIcons = {
  humedad: 'droplet-half',
  temperatura: 'thermometer-half',
  flujo: 'water',
  ahorro: 'piggy-bank-fill'
};