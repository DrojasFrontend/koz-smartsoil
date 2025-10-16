# Design Document - Sistema de Estados Básicos de Riego

## Overview

El sistema de estados básicos es una aplicación Next.js que proporciona un dashboard interactivo para monitorear 4 sectores agrícolas con sus estados de riego (Óptimo, Necesita riego, Regando). La aplicación utiliza PostgreSQL para persistencia de datos, Bootstrap para UI responsive, y está diseñada para deployment en Railway.

## Architecture

### High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Next.js)     │◄──►│   (API Routes)  │◄──►│   (PostgreSQL)  │
│   - Components  │    │   - /api/       │    │   - sectores    │
│   - Pages       │    │   - Data Logic  │    │   - metricas    │
│   - Bootstrap   │    │   - State Calc  │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Technology Stack

- **Frontend:** Next.js 14+ con JavaScript, Bootstrap 5
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL en Railway
- **Deployment:** Railway con auto-deploy desde Git
- **Styling:** Bootstrap 5 + CSS custom para temas específicos

## Components and Interfaces

### Frontend Components

#### 1. Dashboard (Main Page)
```javascript
// pages/index.js
export default function Dashboard() {
  const [sectores, setSectores] = useState([]);
  const [sectorActivo, setSectorActivo] = useState(0);
  const [metricas, setMetricas] = useState({});
  
  // Lógica principal del dashboard
}
```

#### 2. SectorTabs Component
```javascript
// components/SectorTabs.js
export default function SectorTabs({ sectores, sectorActivo, onSectorChange }) {
  // Renderiza pestañas con iconos de estado
  // Maneja clicks y estados visuales
}
```

#### 3. SectorMetrics Component
```javascript
// components/SectorMetrics.js
export default function SectorMetrics({ sector, metricas }) {
  // Renderiza las 4 tarjetas de métricas
  // Incluye StatusBadge
}
```

#### 4. MetricCard Component
```javascript
// components/MetricCard.js
export default function MetricCard({ tipo, valor, unidad, etiqueta, progreso }) {
  // Tarjeta reutilizable para cada métrica
  // Soporte para diferentes tipos (humedad, temperatura, flujo, ahorro)
}
```

#### 5. StatusBadge Component
```javascript
// components/StatusBadge.js
export default function StatusBadge({ estado }) {
  // Badge con colores según estado
  // Estados: "Óptimo", "Necesita riego", "Regando"
}
```

### Backend API Routes

#### 1. GET /api/sectores
```javascript
// pages/api/sectores.js
export default async function handler(req, res) {
  // Retorna lista de sectores con información básica
  // Incluye: id, nombre, tipo_cultivo, area, sensores, valvulas
}
```

#### 2. GET /api/metricas/[sectorId]
```javascript
// pages/api/metricas/[sectorId].js
export default async function handler(req, res) {
  // Retorna métricas actuales del sector específico
  // Incluye: humedad, temperatura, flujo, ahorro, timestamp
}
```

#### 3. GET /api/estados
```javascript
// pages/api/estados.js
export default async function handler(req, res) {
  // Calcula y retorna estados de todos los sectores
  // Lógica: humedad >= 60% = Óptimo, < 50% = Necesita riego, flujo > 0 = Regando
}
```

## Data Models

### Database Schema

#### Tabla: sectores
```sql
CREATE TABLE sectores (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  tipo_cultivo VARCHAR(50) NOT NULL,
  area_hectareas DECIMAL(3,1) NOT NULL,
  num_sensores INTEGER NOT NULL,
  num_valvulas INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Tabla: metricas_actuales
```sql
CREATE TABLE metricas_actuales (
  id SERIAL PRIMARY KEY,
  sector_id INTEGER REFERENCES sectores(id),
  humedad DECIMAL(5,2) NOT NULL,
  temperatura DECIMAL(4,1) NOT NULL,
  flujo_agua DECIMAL(5,1) NOT NULL DEFAULT 0,
  ahorro DECIMAL(5,2) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Data Seed Script
```sql
-- Insertar sectores base
INSERT INTO sectores (nombre, tipo_cultivo, area_hectareas, num_sensores, num_valvulas) VALUES
('Sector Norte - Paltos', 'Paltos', 2.5, 4, 2),
('Sector Sur - Tomates', 'Tomates', 1.8, 6, 3),
('Invernadero A - Lechugas', 'Lechugas', 0.5, 8, 4),
('Sector Este - Maíz', 'Maíz', 3.2, 5, 3);

-- Insertar métricas de ejemplo
INSERT INTO metricas_actuales (sector_id, humedad, temperatura, flujo_agua, ahorro) VALUES
(1, 65.0, 22.0, 0.0, 45.0),    -- Óptimo
(2, 45.0, 28.0, 25.5, 38.0),   -- Necesita riego (con riego activo)
(3, 72.0, 24.0, 18.2, 52.0),   -- Regando
(4, 58.0, 26.0, 0.0, 41.0);    -- Óptimo
```

### Estado Calculation Logic
```javascript
// utils/estadoCalculator.js
export function calcularEstado(metricas) {
  const { humedad, flujo_agua } = metricas;
  
  if (flujo_agua > 0) return 'Regando';
  if (humedad >= 60) return 'Óptimo';
  if (humedad < 50) return 'Necesita riego';
  return 'Óptimo'; // Default para valores intermedios
}

export function getEstadoColor(estado) {
  const colores = {
    'Óptimo': 'success',      // Verde
    'Necesita riego': 'warning', // Naranja
    'Regando': 'primary'      // Azul
  };
  return colores[estado] || 'secondary';
}
```

## Error Handling

### Database Connection
```javascript
// utils/database.js
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export async function query(text, params) {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error('Error en consulta de base de datos');
  }
}
```

### API Error Handling
```javascript
// Patrón para API routes
export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Método no permitido' });
    }
    
    const data = await obtenerDatos();
    res.status(200).json(data);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}
```

### Frontend Error Handling
```javascript
// Patrón para componentes
useEffect(() => {
  async function cargarDatos() {
    try {
      setLoading(true);
      const response = await fetch('/api/sectores');
      if (!response.ok) throw new Error('Error al cargar sectores');
      const data = await response.json();
      setSectores(data);
    } catch (error) {
      console.error('Error:', error);
      setError('No se pudieron cargar los datos');
    } finally {
      setLoading(false);
    }
  }
  cargarDatos();
}, []);
```

## Testing Strategy

### Unit Testing
- **Componentes:** Testing Library para componentes React
- **Utilidades:** Jest para funciones de cálculo de estado
- **API Routes:** Supertest para endpoints

### Integration Testing
- **Database:** Tests con base de datos de prueba
- **API Flow:** Tests end-to-end de flujo completo
- **UI Flow:** Tests de navegación entre sectores

### Test Examples
```javascript
// __tests__/estadoCalculator.test.js
import { calcularEstado } from '../utils/estadoCalculator';

describe('Estado Calculator', () => {
  test('debe retornar Regando cuando hay flujo activo', () => {
    const metricas = { humedad: 45, flujo_agua: 15.5 };
    expect(calcularEstado(metricas)).toBe('Regando');
  });
  
  test('debe retornar Óptimo cuando humedad >= 60%', () => {
    const metricas = { humedad: 65, flujo_agua: 0 };
    expect(calcularEstado(metricas)).toBe('Óptimo');
  });
});
```

## Deployment Configuration

### Railway Setup
```javascript
// railway.json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/api/health"
  }
}
```

### Environment Variables
```bash
# .env.local (desarrollo)
DATABASE_URL=postgresql://user:password@localhost:5432/riego_db
NEXTAUTH_SECRET=your-secret-key
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Railway (producción)
DATABASE_URL=postgresql://... # Auto-generada por Railway
NEXTAUTH_SECRET=production-secret
NEXT_PUBLIC_APP_URL=https://your-app.railway.app
```

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:seed": "node scripts/seed.js",
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

## Performance Considerations

### Database Optimization
- Índices en `sector_id` para consultas rápidas de métricas
- Conexión pool para manejo eficiente de conexiones
- Queries optimizadas con LIMIT para datos recientes

### Frontend Optimization
- Next.js Image optimization para iconos
- Bootstrap CSS minificado en producción
- Lazy loading para componentes no críticos
- Memoización de cálculos de estado con useMemo

### Caching Strategy
- API routes con cache headers apropiados
- Static generation para páginas que no cambian
- Client-side caching con SWR para datos frecuentes