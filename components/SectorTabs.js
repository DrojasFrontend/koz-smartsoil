import React from 'react';
import Icon, { StateIcons } from './Icon';
import { getEstadoColor } from '../utils/themeUtils';

export default function SectorTabs({ sectores, sectorActivo, onSectorChange, estados = {} }) {
  if (!sectores || sectores.length === 0) {
    return (
      <div className="alert alert-warning" role="alert">
        <Icon name="exclamation-triangle" className="me-2" />
        No hay sectores disponibles
      </div>
    );
  }

  return (
    <div className="sector-tabs-container mb-4">
      <ul className="nav nav-tabs nav-fill" id="sectorTabs" role="tablist">
        {sectores.map((sector, index) => {
          const isActive = index === sectorActivo;
          const estadoSector = estados[sector.id];
          const estadoColor = estadoSector ? getEstadoColor(estadoSector.valor) : null;
          const estadoIcon = estadoSector ? StateIcons[estadoSector.valor] : 'circle';
          
          return (
            <li className="nav-item" role="presentation" key={sector.id}>
              <button
                className={`nav-link position-relative ${isActive ? 'active' : ''} ${estadoColor ? `border-${estadoColor.border}` : ''}`}
                id={`sector-tab-${sector.id}`}
                data-bs-toggle="tab"
                data-bs-target={`#sector-${sector.id}`}
                type="button"
                role="tab"
                aria-controls={`sector-${sector.id}`}
                aria-selected={isActive}
                onClick={() => onSectorChange(index)}
              >
                <div className="d-flex flex-column align-items-center gap-1">
                  {/* Estado icon en la esquina superior derecha */}
                  {estadoSector && (
                    <div className="position-absolute top-0 end-0 mt-1 me-1">
                      <Icon 
                        name={estadoIcon} 
                        className={`text-${estadoColor.text}`}
                        size="fs-6"
                      />
                    </div>
                  )}
                  
                  {/* Nombre del sector */}
                  <div className="sector-name fw-semibold">
                    {sector.nombre}
                  </div>
                  
                  {/* Información adicional */}
                  <div className="sector-info text-muted small">
                    <span className="me-2">
                      <Icon name="geo-alt" size="fs-7" className="me-1" />
                      {sector.area_hectareas} ha
                    </span>
                    <span>
                      <Icon name="cpu" size="fs-7" className="me-1" />
                      {sector.num_sensores} sensores
                    </span>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}