import React, { useState } from 'react';
import StatusBadge from './StatusBadge';
import MetricCard from './MetricCard';
import SectorTabs from './SectorTabs';

// Test component to verify UI components work correctly
export default function ComponentTest() {
  const [sectorActivo, setSectorActivo] = useState(0);
  // Test data for sectors
  const testSectores = [
    {
      id: 1,
      nombre: "Sector Norte - Paltos",
      tipo_cultivo: "Paltos",
      area_hectareas: 2.5,
      num_sensores: 4,
      num_valvulas: 2
    },
    {
      id: 2,
      nombre: "Sector Sur - Tomates",
      tipo_cultivo: "Tomates",
      area_hectareas: 1.8,
      num_sensores: 6,
      num_valvulas: 3
    },
    {
      id: 3,
      nombre: "Invernadero A - Lechugas",
      tipo_cultivo: "Lechugas",
      area_hectareas: 0.5,
      num_sensores: 8,
      num_valvulas: 4
    },
    {
      id: 4,
      nombre: "Sector Este - Maíz",
      tipo_cultivo: "Maíz",
      area_hectareas: 3.2,
      num_sensores: 5,
      num_valvulas: 3
    }
  ];

  // Test estados for sectors
  const testEstados = {
    1: { valor: 'Óptimo', color: 'success', icono: 'check-circle-fill' },
    2: { valor: 'Regando', color: 'primary', icono: 'droplet-fill' },
    3: { valor: 'Necesita riego', color: 'warning', icono: 'exclamation-triangle-fill' },
    4: { valor: 'Óptimo', color: 'success', icono: 'check-circle-fill' }
  };

  const testMetrics = [
    {
      tipo: 'humedad',
      valor: 65,
      unidad: '%',
      etiqueta: 'Suelo actual',
      progreso: 65
    },
    {
      tipo: 'temperatura',
      valor: 22,
      unidad: '°C',
      etiqueta: 'Suelo actual'
    },
    {
      tipo: 'flujo',
      valor: 0,
      unidad: ' L/min',
      etiqueta: 'Litros/minuto'
    },
    {
      tipo: 'ahorro',
      valor: 45,
      unidad: '%',
      etiqueta: 'vs. riego tradicional'
    }
  ];

  return (
    <div className="container-fluid dashboard-container">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Test de Componentes UI</h2>
          
          {/* Test SectorTabs */}
          <div className="mb-4">
            <h4>Sector Tabs</h4>
            <SectorTabs 
              sectores={testSectores}
              sectorActivo={sectorActivo}
              onSectorChange={setSectorActivo}
              estados={testEstados}
            />
            <div className="alert alert-info mt-3">
              <strong>Sector activo:</strong> {testSectores[sectorActivo]?.nombre} 
              <br />
              <strong>Estado:</strong> {testEstados[testSectores[sectorActivo]?.id]?.valor}
            </div>
          </div>
          
          {/* Test StatusBadge */}
          <div className="mb-4">
            <h4>Status Badges</h4>
            <div className="d-flex gap-3 mb-3">
              <div className="position-relative p-4 bg-light rounded">
                <StatusBadge estado="Óptimo" />
                <span>Estado Óptimo</span>
              </div>
              <div className="position-relative p-4 bg-light rounded">
                <StatusBadge estado="Necesita riego" />
                <span>Necesita Riego</span>
              </div>
              <div className="position-relative p-4 bg-light rounded">
                <StatusBadge estado="Regando" />
                <span>Regando</span>
              </div>
            </div>
          </div>

          {/* Test MetricCards */}
          <div className="mb-4">
            <h4>Metric Cards</h4>
            <div className="row">
              {testMetrics.map((metric, index) => (
                <MetricCard
                  key={index}
                  tipo={metric.tipo}
                  valor={metric.valor}
                  unidad={metric.unidad}
                  etiqueta={metric.etiqueta}
                  progreso={metric.progreso}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}