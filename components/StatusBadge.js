import React from 'react';
import { getEstadoColor } from '../utils/themeUtils';
import { StateIcons } from './Icon';

export default function StatusBadge({ estado }) {
  const colorConfig = getEstadoColor(estado);
  const icon = StateIcons[estado] || StateIcons['Óptimo'];

  return (
    <div className="position-absolute top-0 end-0 m-3">
      <span className={`badge bg-${colorConfig.bg} d-flex align-items-center gap-1 px-3 py-2 fs-6 status-badge`}>
        <i className={`bi bi-${icon}`}></i>
        {estado}
      </span>
    </div>
  );
}