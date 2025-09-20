# README

## Tema elegido
Este proyecto es una aplicación web de catálogo de productos, donde los usuarios pueden explorar diferentes productos, ver detalles y navegar por distintas páginas. El objetivo es ofrecer una experiencia moderna y responsiva para la visualización y gestión de productos.

## Tecnologías usadas
- **Vite**: Herramienta de desarrollo rápido para aplicaciones web modernas.
- **JavaScript**: Lenguaje principal para la lógica de la aplicación.
- **Tailwind CSS**: Framework de utilidades para estilos rápidos y responsivos.
- **PostCSS**: Procesador de CSS para transformar estilos.

## Estructura del proyecto
- `src/`: Código fuente principal.
  - `components/`: Componentes reutilizables (navbar, footer, modal, productCard).
  - `pages/`: Páginas principales (catalog, detail, home).
  - `router/`: Lógica de enrutamiento.
  - `assets/`: Archivos de estilos y recursos.
  - `ai/`: Funcionalidades de IA (por ejemplo, análisis de sentimiento).
- `public/`: Archivos públicos y estáticos.

## Cómo correr el proyecto
1. Instala las dependencias:
   ```powershell
   npm install
   ```
2. Inicia el servidor de desarrollo:
   ```powershell
   npm run dev
   ```
3. Accede a la aplicación en tu navegador en la URL que aparece en la terminal (por defecto: `http://localhost:5173`).

## Compilar para producción
Para generar los archivos de producción:
```powershell
npm run build
```

## Desplegar
Si tienes configurado un script de despliegue:
```powershell
npm run deploy
```

---
¡Disfruta explorando el catálogo de productos!
