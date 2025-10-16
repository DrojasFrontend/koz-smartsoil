# Sistema de Estados Básicos - Smart Soil

Sistema de monitoreo de riego inteligente que permite visualizar el estado de diferentes sectores agrícolas basado en métricas de humedad, temperatura, flujo de agua y ahorro.

## 🚀 Características

- **Dashboard de sectores**: Visualización de múltiples sectores agrícolas
- **Estados automáticos**: Cálculo inteligente de estados (Óptimo, Necesita riego, Regando)
- **API REST**: Endpoints para obtener datos de sectores, métricas y estados
- **Métricas en tiempo real**: Humedad, temperatura, flujo de agua y ahorro
- **Interfaz responsive**: Compatible con dispositivos móviles y desktop

## 🛠️ Tecnologías

- **Frontend**: Next.js 14, React 18, Bootstrap 5
- **Backend**: API Routes de Next.js
- **Base de datos**: JSON files (desarrollo)
- **Deployment**: Netlify
- **Lenguaje**: JavaScript (ES Modules)

## 📊 Estados del Sistema

El sistema calcula automáticamente el estado de cada sector basado en:

- **Óptimo** (Verde): Humedad ≥ 60% y sin riego activo
- **Necesita riego** (Naranja): Humedad < 50% y sin riego activo  
- **Regando** (Azul): Flujo de agua > 0 L/min (prioridad máxima)

## 🔧 Instalación y Desarrollo

```bash
# Clonar el repositorio
git clone https://github.com/DrojasFrontend/koz-smartsoil.git
cd koz-smartsoil

# Instalar dependencias
npm install

# Inicializar datos de prueba
npm run data:seed

# Ejecutar en modo desarrollo
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

## 📡 API Endpoints

### GET /api/sectores
Obtiene la lista completa de sectores con información básica.

### GET /api/metricas/[sectorId]
Obtiene las métricas actuales de un sector específico con estado calculado.

### GET /api/estados
Calcula y retorna los estados de todos los sectores con resumen estadístico.

## 🏗️ Estructura del Proyecto

```
├── components/          # Componentes React reutilizables
├── data/               # Archivos JSON de datos
├── pages/              # Páginas y API routes de Next.js
│   └── api/           # Endpoints de la API
├── scripts/           # Scripts de utilidad
├── styles/            # Estilos CSS globales
├── utils/             # Utilidades y helpers
└── .kiro/specs/       # Documentación de especificaciones
```

## 🚀 Deployment

El proyecto está configurado para deployment automático en Netlify:

1. Conectar el repositorio de GitHub a Netlify
2. Configurar las variables de entorno si es necesario
3. El deployment se ejecuta automáticamente en cada push a `main`

## 📋 Especificaciones

El proyecto sigue una metodología de desarrollo basada en especificaciones:

- **Requirements**: Definición de requerimientos en formato EARS
- **Design**: Arquitectura y diseño del sistema
- **Tasks**: Plan de implementación detallado

Ver documentación completa en `.kiro/specs/sistema-estados-basicos/`

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👨‍💻 Autor

**Daniel Rojas** - [@DrojasFrontend](https://github.com/DrojasFrontend)

---

⭐ Si este proyecto te fue útil, ¡dale una estrella en GitHub!