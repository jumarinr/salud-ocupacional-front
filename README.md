# salud-ocupacional-front

## Información general
Este repositorio tendrá dos ramas base `master` y `develop`.
Sobre `develop` se desarrollaran las tareas de cada sprint, así que cada desarrollador deberá seguir la siguiente dinámica a la hora de entregar sus tareas:
1. Desde la rama `develop` ejecutar el comando `git checkout -b nombre-de-la-nueva-rama`.
2. Una vez la tarea esté completa, crear un pull request que tenga como base la rama `develop`.
3. El pull request **debe** ser aprobado por **todos** los compañeros del equipo correspondiente, es decir, de funcionalidad o de diseño, dependiendo del tipo de tarea.

Todas las tareas deben seguir este mismo proceso para ser entregadas y poder hacer seguimiento de las mismas, los link a los PR deben ser puestos como comentario en las tareas de azure para facilitar su seguimiento.

Se hará merge de `develop` en `master` **solamente** antes de realizar el deploy de cada entrega y eso lo podrá hacer únicamente Juan Diego Marín.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Estructura del proyecto
```
├── index.html
├── main.js
├── router.js
└────── src
    └── assets # Estilos, imágenes y demás
    |   ├── styles
    |   |   └── custom.scss # Aquí se sobre escriben estilos y variables de bootstrap
    |   └── ...
    ├── components # Componentes reusables
    |   ├── Header.vue
    |   └── ...
    └── views # Páginas
        ├── Trabajadores.vue
        ├── Vacunas.vue
        └── ...
```

### Componentes útiles
- `Header`: Navbar, logo, etc
- `Container`: Tiene los estilos predeterminados para crear el contenedor blanco centrado en el cual va la mayoría de componentes relativos a la página como los formularios y botones.
