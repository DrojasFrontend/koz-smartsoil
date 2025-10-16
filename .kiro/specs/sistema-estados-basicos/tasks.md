# Implementation Plan - Sistema de Estados Básicos de Riego

- [x] 1. Configurar proyecto Next.js con dependencias básicas
  - Crear proyecto Next.js con JavaScript (no TypeScript)
  - Instalar Bootstrap 5, pg (PostgreSQL client), y dependencias necesarias
  - Configurar estructura de carpetas: components/, utils/, pages/api/
  - Configurar variables de entorno para desarrollo local
  - _Requirements: 6.1, 6.6, 8.5_

- [x] 2. Configurar base de datos PostgreSQL y conexión
  - Crear utilidad de conexión a PostgreSQL en utils/database.js
  - Definir esquema de base de datos con tablas sectores y metricas_actuales
  - Crear script de seed con datos de los 4 sectores y métricas de ejemplo
  - Implementar función de query con manejo de errores
  - _Requirements: 8.1, 8.2, 8.4, 1.1_

- [x] 3. Implementar API routes para datos de sectores y métricas
  - Crear endpoint GET /api/sectores para obtener lista de sectores
  - Crear endpoint GET /api/metricas/[sectorId] para métricas específicas
  - Crear endpoint GET /api/estados para calcular estados de todos los sectores
  - Implementar lógica de cálculo de estados en utils/estadoCalculator.js
  - _Requirements: 3.1, 3.2, 3.3, 1.2, 1.3_

- [x] 4. Crear componentes base de UI con Bootstrap
  - Implementar componente StatusBadge con colores para los 3 estados
  - Crear componente MetricCard reutilizable para mostrar métricas individuales
  - Configurar estilos Bootstrap y CSS custom para tema del dashboard
  - Implementar iconos y elementos visuales consistentes
  - _Requirements: 5.1, 5.2, 5.3, 5.5, 4.2, 4.3_

- [x] 5. Desarrollar componente SectorTabs para navegación
  - Crear componente SectorTabs con pestañas de los 4 sectores
  - Implementar lógica de cambio de sector activo
  - Agregar iconos de estado en pestañas según estado del sector
  - Aplicar estilos visuales para pestaña activa y estados
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [ ] 6. Implementar componente SectorMetrics para mostrar datos
  - Crear componente SectorMetrics que use MetricCard para las 4 métricas
  - Implementar visualización de humedad con barra de progreso
  - Mostrar temperatura con rango óptimo de referencia
  - Configurar flujo de agua con estado "Sin riego" cuando es 0
  - Integrar StatusBadge en la esquina superior derecha
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

- [ ] 7. Crear página principal Dashboard con integración completa
  - Implementar página principal que integre SectorTabs y SectorMetrics
  - Agregar lógica de carga de datos desde APIs con useState y useEffect
  - Implementar manejo de estado para sector activo y datos
  - Configurar actualización automática de métricas al cambiar sector
  - Agregar manejo de errores y estados de carga
  - _Requirements: 2.4, 4.6, 6.2, 1.4, 1.5_

- [ ] 8. Implementar datos de prueba y validación de estados
  - Verificar que los datos de seed muestren los 3 estados diferentes
  - Validar lógica de cálculo de estados con datos de ejemplo
  - Probar navegación entre sectores y actualización de datos
  - Verificar códigos de color y badges funcionan correctamente
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ]* 9. Configurar testing básico
  - Escribir tests unitarios para utils/estadoCalculator.js
  - Crear tests de componentes para StatusBadge y MetricCard
  - Implementar tests de API routes con datos de prueba
  - _Requirements: 6.5_

- [ ] 10. Preparar configuración para deployment en Railway
  - Configurar variables de entorno para producción
  - Crear archivo railway.json con configuración de build
  - Preparar scripts de package.json para deployment
  - Documentar proceso de setup de base de datos en Railway
  - _Requirements: 6.8, 8.6_