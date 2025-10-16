import { 
  getSectores, 
  saveSectores, 
  getMetricas, 
  saveMetricas, 
  testConnection 
} from '../utils/database.js';

/**
 * Datos de seed para los 4 sectores base del sistema
 */
const sectoresData = [
  {
    id: 1,
    nombre: 'Sector Norte - Paltos',
    tipo_cultivo: 'Paltos',
    area_hectareas: 2.5,
    num_sensores: 4,
    num_valvulas: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    nombre: 'Sector Sur - Tomates',
    tipo_cultivo: 'Tomates',
    area_hectareas: 1.8,
    num_sensores: 6,
    num_valvulas: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 3,
    nombre: 'Invernadero A - Lechugas',
    tipo_cultivo: 'Lechugas',
    area_hectareas: 0.5,
    num_sensores: 8,
    num_valvulas: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 4,
    nombre: 'Sector Este - Maíz',
    tipo_cultivo: 'Maíz',
    area_hectareas: 3.2,
    num_sensores: 5,
    num_valvulas: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

/**
 * Métricas de ejemplo que demuestran los 3 estados diferentes
 * - Sector 1 (Paltos): Estado "Óptimo" (humedad 65%, sin riego)
 * - Sector 2 (Tomates): Estado "Regando" (flujo activo 25.5 L/min)
 * - Sector 3 (Lechugas): Estado "Regando" (flujo activo 18.2 L/min)
 * - Sector 4 (Maíz): Estado "Necesita riego" (humedad 45%, sin riego)
 */
const metricasData = [
  {
    id: 1,
    sector_id: 1,
    humedad: 65.0,
    temperatura: 22.0,
    flujo_agua: 0.0,
    ahorro: 45.0,
    timestamp: new Date().toISOString()
  },
  {
    id: 2,
    sector_id: 2,
    humedad: 48.0,
    temperatura: 28.0,
    flujo_agua: 25.5,
    ahorro: 38.0,
    timestamp: new Date().toISOString()
  },
  {
    id: 3,
    sector_id: 3,
    humedad: 72.0,
    temperatura: 24.0,
    flujo_agua: 18.2,
    ahorro: 52.0,
    timestamp: new Date().toISOString()
  },
  {
    id: 4,
    sector_id: 4,
    humedad: 45.0,
    temperatura: 26.0,
    flujo_agua: 0.0,
    ahorro: 41.0,
    timestamp: new Date().toISOString()
  }
];

/**
 * Carga los sectores base en los archivos JSON
 */
async function seedSectores() {
  console.log('🌱 Cargando sectores...');
  
  try {
    await saveSectores(sectoresData);
    
    sectoresData.forEach(sector => {
      console.log(`✅ Sector cargado: ${sector.nombre} (ID: ${sector.id})`);
    });
    
  } catch (error) {
    console.error('❌ Error cargando sectores:', error.message);
    throw error;
  }
}

/**
 * Carga las métricas de ejemplo
 */
async function seedMetricas() {
  console.log('📊 Cargando métricas de ejemplo...');
  
  try {
    await saveMetricas(metricasData);
    
    metricasData.forEach(metrica => {
      console.log(`✅ Métricas cargadas para sector ID: ${metrica.sector_id}`);
    });
    
  } catch (error) {
    console.error('❌ Error cargando métricas:', error.message);
    throw error;
  }
}

/**
 * Verifica que los datos se cargaron correctamente
 */
async function verificarDatos() {
  console.log('🔍 Verificando datos cargados...');
  
  try {
    // Verificar sectores
    const sectores = await getSectores();
    console.log(`📋 Total sectores: ${sectores.length}`);
    
    // Verificar métricas
    const metricas = await getMetricas();
    console.log(`📊 Total métricas: ${metricas.length}`);
    
    // Mostrar resumen de estados
    console.log('\n📈 Estados calculados:');
    
    for (const sector of sectores) {
      const metrica = metricas.find(m => m.sector_id === sector.id);
      if (metrica) {
        let estado;
        if (metrica.flujo_agua > 0) {
          estado = 'Regando';
        } else if (metrica.humedad >= 60) {
          estado = 'Óptimo';
        } else if (metrica.humedad < 50) {
          estado = 'Necesita riego';
        } else {
          estado = 'Óptimo';
        }
        
        console.log(`  ${sector.nombre}: ${estado} (Humedad: ${metrica.humedad}%, Flujo: ${metrica.flujo_agua} L/min)`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error verificando datos:', error.message);
    throw error;
  }
}

/**
 * Función principal de seed
 */
async function runSeed() {
  console.log('🚀 Iniciando proceso de seed con archivos JSON...\n');
  
  try {
    // Verificar acceso a archivos
    const connected = await testConnection();
    if (!connected) {
      throw new Error('No se pudo acceder a los archivos de datos');
    }
    
    // Ejecutar seed
    await seedSectores();
    console.log('');
    await seedMetricas();
    console.log('');
    await verificarDatos();
    
    console.log('\n✅ Proceso de seed completado exitosamente!');
    console.log('📁 Datos guardados en archivos JSON en la carpeta /data');
    
  } catch (error) {
    console.error('\n❌ Error en proceso de seed:', error.message);
    process.exit(1);
  }
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  runSeed();
}

export { runSeed, seedSectores, seedMetricas, verificarDatos };