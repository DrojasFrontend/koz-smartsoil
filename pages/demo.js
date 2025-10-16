import Head from 'next/head'
import { useState } from 'react'
import SectorTabs from '../components/SectorTabs'

export default function Demo() {
  const [sectorActivo, setSectorActivo] = useState(0)

  // Datos de prueba
  const sectores = [
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
  ]

  const estados = {
    1: { valor: 'Óptimo', color: 'success', icono: 'check-circle-fill' },
    2: { valor: 'Regando', color: 'primary', icono: 'droplet-fill' },
    3: { valor: 'Necesita riego', color: 'warning', icono: 'exclamation-triangle-fill' },
    4: { valor: 'Óptimo', color: 'success', icono: 'check-circle-fill' }
  }

  return (
    <div>
      <Head>
        <title>Demo SectorTabs - Sistema de Riego</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link 
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
          rel="stylesheet" 
        />
      </Head>

      <main className="container-fluid dashboard-container py-4">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center mb-4">Demo: Componente SectorTabs</h1>
            
            <SectorTabs 
              sectores={sectores}
              sectorActivo={sectorActivo}
              onSectorChange={setSectorActivo}
              estados={estados}
            />
            
            <div className="sector-content mt-4 p-4 bg-white rounded shadow">
              <h3>{sectores[sectorActivo].nombre}</h3>
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Cultivo:</strong> {sectores[sectorActivo].tipo_cultivo}</p>
                  <p><strong>Área:</strong> {sectores[sectorActivo].area_hectareas} hectáreas</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Sensores:</strong> {sectores[sectorActivo].num_sensores}</p>
                  <p><strong>Estado:</strong> 
                    <span className={`badge bg-${estados[sectores[sectorActivo].id].color} ms-2`}>
                      {estados[sectores[sectorActivo].id].valor}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <script 
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
      ></script>
    </div>
  )
}