import React from 'react';
import { getMetricColor } from '../utils/themeUtils';
import { MetricIcons } from './Icon';

export default function MetricCard({ tipo, valor, unidad, etiqueta, progreso }) {
  const colorConfig = getMetricColor(tipo);
  const icon = MetricIcons[tipo] || MetricIcons['humedad'];
  const mostrarProgreso = tipo === 'humedad' && progreso !== undefined;
  const valorMostrar = tipo === 'flujo' && valor === 0 ? 'Sin riego' : `${valor}${unidad}`;

  return (
    <div className="col-md-6 col-lg-3 mb-3">
      <div className="card h-100 shadow-sm border-0 metric-card">
        <div className="card-body d-flex flex-column">
          <div className="d-flex align-items-center mb-2">
            <div className={`icon-container bg-${colorConfig.bg} bg-opacity-10 me-3`}>
              <i className={`bi bi-${icon} text-${colorConfig.text} fs-4`}></i>
            </div>
            <div className="flex-grow-1">
              <h6 className="card-title mb-0 text-muted small text-uppercase fw-semibold">{etiqueta}</h6>
            </div>
          </div>
          
          <div className="mt-auto">
            <div className="d-flex align-items-end justify-content-between">
              <span className="fs-2 fw-bold text-dark">{valorMostrar}</span>
            </div>
            
            {mostrarProgreso && (
              <div className="mt-3">
                <div className="progress" style={{ height: '8px' }}>
                  <div 
                    className={`progress-bar bg-${colorConfig.bg}`}
                    role="progressbar" 
                    style={{ width: `${progreso}%` }}
                    aria-valuenow={progreso} 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  ></div>
                </div>
                <small className="text-muted mt-1 d-block">Rango óptimo: 50-70%</small>
              </div>
            )}
            
            {tipo === 'temperatura' && (
              <small className="text-muted mt-1 d-block">Rango óptimo: 20-25°C</small>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}