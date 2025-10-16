import Head from 'next/head'
import { useState, useEffect } from 'react'
import SectorTabs from '../components/SectorTabs'

export default function Home() {
  const [sectores, setSectores] = useState([])
  const [estados, setEstados] = useState({})
  const [sectorActivo, setSectorActivo] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Cargar datos de sectores y estados
    const cargarDatos = async () => {
      try {
        const [sectoresRes, estadosRes] = await Promise.all([
          fetch('/api/sectores'),
          fetch('/api/estados')
        ])

        if (sectoresRes.ok && estadosRes.ok) {
          const sectoresData = await sectoresRes.json()
          const estadosData = await estadosRes.json()

          setSectores(sectoresData.data || [])
          
          // Convertir estados a formato esperado por SectorTabs
          const estadosMap = {}
          if (estadosData.data?.sectores) {
            estadosData.data.sectores.forEach(sector => {
              estadosMap[sector.id] = sector.estado
            })
          }
          setEstados(estadosMap)
        }
      } catch (error) {
        console.error('Error cargando datos:', error)
      } finally {
        setLoading(false)
      }
    }

    cargarDatos()
  }, [])

  return (
    <div>
      <Head>
        <title>Sistema de Estados Básicos de Riego</title>
        <meta name="description" content="Dashboard para monitoreo de sectores de riego" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link 
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
          rel="stylesheet" 
        />
      </Head>

      <main className="container-fluid dashboard-container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center mb-4">Sistema de Estados Básicos de Riego</h1>
            
            {loading ? (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
              </div>
            ) : (
              <>
                <SectorTabs 
                  sectores={sectores}
                  sectorActivo={sectorActivo}
                  onSectorChange={setSectorActivo}
                  estados={estados}
                />
                
                <div className="sector-content">
                  {sectores.length > 0 && sectores[sectorActivo] ? (
                    <div>
                      <h3>{sectores[sectorActivo].nombre}</h3>
                      <p className="text-muted">
                        Cultivo: {sectores[sectorActivo].tipo_cultivo} | 
                        Área: {sectores[sectorActivo].area_hectareas} ha | 
                        Sensores: {sectores[sectorActivo].num_sensores}
                      </p>
                      {estados[sectores[sectorActivo].id] && (
                        <div className="alert alert-info">
                          <strong>Estado actual:</strong> {estados[sectores[sectorActivo].id].valor}
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-center text-muted">
                      No hay sectores disponibles
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <script 
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
      ></script>
    </div>
  )
}