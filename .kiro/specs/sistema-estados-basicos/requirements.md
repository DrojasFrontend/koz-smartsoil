# Requirements Document - Sistema de Estados Básicos de Riego

## Introduction

Este documento define los requerimientos para el primer módulo del sistema de estados de riego KOZ SmartSoil. El módulo se enfoca específicamente en la implementación de los 3 estados básicos del sistema (Óptimo, Necesita riego, Regando) con datos alimentados desde JSON. Este es el módulo base que servirá como fundación para funcionalidades más avanzadas en módulos posteriores.

## Contexto Funcional

El módulo Sistema de Estados Básicos gestiona la visualización y lógica de los 3 estados fundamentales de cada sector de riego, visible en la sección principal del dashboard.

Desde aquí, los usuarios pueden:
- Ver el estado actual de cada sector (Óptimo, Necesita riego, Regando)
- Visualizar las métricas básicas de cada sector (humedad, temperatura, flujo, ahorro)
- Navegar entre sectores mediante pestañas
- Identificar visualmente el estado mediante códigos de color y badges

## Objetivo Técnico

Implementar los componentes necesarios para:
1. Cargar datos de sectores desde estructura JSON
2. Mostrar pestañas de sectores con estados visuales
3. Renderizar métricas básicas por sector
4. Aplicar lógica de estados basada en umbrales de humedad
5. Mostrar badges de estado con colores apropiados

El módulo no incluye funcionalidades avanzadas como gráficos, controles manuales o notificaciones; esos elementos se implementarán en módulos posteriores.

## Requirements

### Requirement 1

**User Story:** Como operador del sistema de riego, quiero que el sistema cargue datos estructurados desde JSON para los 4 sectores agrícolas, para poder acceder a información básica de cada zona de cultivo.

#### Acceptance Criteria

1. WHEN el sistema se inicializa THEN el sistema SHALL cargar datos JSON con estructura para 4 sectores: Sector Norte (Paltos), Sector Sur (Tomates), Invernadero A (Lechugas), y Sector Este (Maíz)
2. WHEN accedo a datos de un sector THEN el sistema SHALL proporcionar métricas básicas: humedad (%), temperatura (°C), flujo (L/min) y ahorro (%)
3. WHEN consulto información del sector THEN el sistema SHALL mostrar área (ha), número de sensores y número de válvulas
4. WHEN el sistema procesa datos THEN el sistema SHALL mantener estructura JSON consistente sin dependencias externas
5. WHEN se requieren datos de sector THEN el sistema SHALL proporcionar acceso inmediato sin llamadas asíncronas

### Requirement 2

**User Story:** Como usuario del dashboard, quiero un sistema de pestañas que muestre los 4 sectores con sus estados visuales, para poder identificar rápidamente la condición de cada zona.

#### Acceptance Criteria

1. WHEN visualizo el dashboard THEN el sistema SHALL mostrar 4 pestañas: "Sector Norte - Paltos", "Sector Sur - Tomates", "Invernadero A - Lechugas", "Sector Este - Maíz"
2. WHEN una pestaña está activa THEN el sistema SHALL mostrar borde destacado y fondo diferenciado
3. WHEN visualizo una pestaña THEN el sistema SHALL mostrar icono de estado (check, warning, activity) según el estado del sector
4. WHEN hago clic en una pestaña THEN el sistema SHALL cambiar el sector activo y actualizar toda la información mostrada
5. WHEN se muestra información del sector THEN el sistema SHALL incluir área en hectáreas y número de sensores

### Requirement 3

**User Story:** Como operador agrícola, quiero que el sistema determine automáticamente el estado de cada sector basado en umbrales de humedad, para poder identificar qué sectores requieren atención.

#### Acceptance Criteria

1. WHEN la humedad del sector es >= 60% THEN el sistema SHALL asignar estado "Óptimo" con indicadores verdes
2. WHEN la humedad del sector es < 50% AND no hay riego activo THEN el sistema SHALL asignar estado "Necesita riego" con indicadores naranjas
3. WHEN hay flujo de agua activo (> 0 L/min) THEN el sistema SHALL asignar estado "Regando" con indicadores azules
4. WHEN se determina el estado THEN el sistema SHALL aplicar la lógica en tiempo real al cargar datos
5. WHEN se calcula el estado THEN el sistema SHALL priorizar "Regando" sobre otros estados si hay flujo activo

### Requirement 4

**User Story:** Como usuario del dashboard, quiero ver las métricas principales de cada sector en tarjetas visuales claras, para poder monitorear los valores clave de forma rápida.

#### Acceptance Criteria

1. WHEN visualizo un sector THEN el sistema SHALL mostrar 4 tarjetas de métricas: Humedad, Temperatura, Flujo de agua, y Ahorro
2. WHEN se muestra la humedad THEN el sistema SHALL incluir valor porcentual, etiqueta "Suelo actual" y barra de progreso visual
3. WHEN se muestra la temperatura THEN el sistema SHALL incluir valor en °C, etiqueta "Suelo actual" y rango óptimo de referencia
4. WHEN se muestra el flujo THEN el sistema SHALL mostrar valor en L/min con etiqueta "Litros/minuto" o "Sin riego" si es 0
5. WHEN se muestra el ahorro THEN el sistema SHALL incluir porcentaje con etiqueta "vs. riego tradicional"
6. WHEN cambio de sector THEN el sistema SHALL actualizar todas las tarjetas con los datos correspondientes

### Requirement 5

**User Story:** Como operador del sistema, quiero badges de estado visualmente claros con códigos de color consistentes, para poder identificar inmediatamente la condición de cada sector.

#### Acceptance Criteria

1. WHEN un sector tiene estado "Óptimo" THEN el sistema SHALL mostrar badge verde con texto "Óptimo"
2. WHEN un sector tiene estado "Necesita riego" THEN el sistema SHALL mostrar badge naranja con texto "Necesita riego"
3. WHEN un sector tiene estado "Regando" THEN el sistema SHALL mostrar badge azul con texto "Regando"
4. WHEN se muestra el badge THEN el sistema SHALL posicionarlo en la esquina superior derecha del área del sector
5. WHEN se aplican colores THEN el sistema SHALL usar la misma paleta en pestañas, badges y elementos relacionados

### Requirement 6

**User Story:** Como desarrollador, quiero una arquitectura técnica moderna con Next.js y PostgreSQL, para tener una base sólida y escalable para el sistema de riego.

#### Acceptance Criteria

1. WHEN desarrollo la aplicación THEN el sistema SHALL usar Next.js como framework principal con JavaScript (no TypeScript)
2. WHEN creo componentes THEN el sistema SHALL usar React con hooks (useState, useEffect) y componentes funcionales
3. WHEN implemento estilos THEN el sistema SHALL usar Bootstrap 5 para UI responsive y componentes predefinidos
4. WHEN organizo la estructura THEN el sistema SHALL crear componentes separados: SectorTabs, SectorMetrics, MetricCard, StatusBadge
5. WHEN manejo datos THEN el sistema SHALL usar PostgreSQL como base de datos principal hospedada en Railway
6. WHEN estructuro el proyecto THEN el sistema SHALL seguir convenciones de Next.js con carpetas pages/, components/, y utils/
7. WHEN desarrollo APIs THEN el sistema SHALL usar Next.js API routes para endpoints de backend
8. WHEN despliego THEN el sistema SHALL ser compatible con Railway para deployment automático

### Requirement 7

**User Story:** Como usuario de prueba, quiero datos de ejemplo realistas que demuestren los 3 estados diferentes, para poder validar que el sistema funciona correctamente en todos los escenarios.

#### Acceptance Criteria

1. WHEN inicio la aplicación THEN el sistema SHALL mostrar datos que incluyan al menos un sector en cada estado (Óptimo, Necesita riego, Regando)
2. WHEN reviso los datos THEN el sistema SHALL incluir valores realistas: humedad 45-75%, temperatura 18-30°C, flujo 0-30 L/min, ahorro 30-60%
3. WHEN exploro sectores THEN el sistema SHALL mostrar variación en área (0.5-3.2 ha), sensores (4-8) y válvulas (2-4)
4. WHEN pruebo la navegación THEN el sistema SHALL permitir cambiar entre todos los sectores y ver datos diferentes
5. WHEN valido estados THEN el sistema SHALL demostrar claramente la diferencia visual entre los 3 estados posibles
##
# Requirement 8

**User Story:** Como administrador del sistema, quiero una base de datos PostgreSQL bien estructurada para almacenar datos de sectores y métricas, para tener persistencia confiable y escalable.

#### Acceptance Criteria

1. WHEN diseño la base de datos THEN el sistema SHALL crear tabla `sectores` con campos: id, nombre, tipo_cultivo, area_hectareas, num_sensores, num_valvulas
2. WHEN almaceno métricas THEN el sistema SHALL crear tabla `metricas_actuales` con campos: sector_id, humedad, temperatura, flujo_agua, ahorro, timestamp
3. WHEN consulto datos THEN el sistema SHALL usar conexión PostgreSQL desde Next.js API routes
4. WHEN inicializo datos THEN el sistema SHALL incluir script de seed con los 4 sectores base y métricas de ejemplo
5. WHEN desarrollo localmente THEN el sistema SHALL permitir conexión a PostgreSQL local o Railway
6. WHEN despliego THEN el sistema SHALL usar variables de entorno para configuración de base de datos Railway