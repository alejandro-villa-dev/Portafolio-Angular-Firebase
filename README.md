# Portafolio – Alejandro Villa Villavicencio

Portafolio profesional desarrollado con **Angular**, **Ionic** y **Firebase**. Presenta mi perfil como Ingeniero Informático, experiencia, habilidades, proyectos y un formulario de contacto funcional.

🔗 **Demo:** [portafolio-alejandro-villa.web.app](https://portafolio-alejandro-villa.web.app)

## Stack

- [Angular](https://angular.dev/) 18
- [Ionic Framework](https://ionicframework.com/) 8 (componentes UI)
- [Firebase](https://firebase.google.com/) (Firestore para el formulario de contacto)
- [Capacitor](https://capacitorjs.com/) (soporte multiplataforma)
- TypeScript, SCSS

## Características

- Diseño responsive de una sola página con secciones: Hero, Sobre mí, Experiencia, Habilidades, Proyectos y Contacto.
- Modo claro/oscuro (`theme.service.ts`).
- Formulario de contacto conectado a Firestore, con validación y sanitización de datos en el cliente (`contact.service.ts`).
- Descarga de CV (`download.service.ts`).
- SEO básico configurable por sección (`seo.service.ts`).
- Página 404 personalizada.

## Estructura del proyecto

```
src/app/
├── components/       # Secciones de la página (hero, about, experience, skills, projects, contact, footer, header)
├── services/         # Lógica compartida (contacto, tema, scroll, SEO, descargas)
├── models/           # Interfaces y modelos de datos
└── shared/           # Elementos reutilizables
```

## Requisitos previos

- Node.js 18+
- npm
- [Ionic CLI](https://ionicframework.com/docs/cli) (opcional, para comandos `ionic`)

## Instalación

```bash
npm install
```

### Variables de entorno

El proyecto usa Firebase. Necesitas definir tu propia configuración en `src/environments/environment.ts` (y `environment.prod.ts`, `environment.development.ts` según corresponda) con los datos de tu proyecto de Firebase:

```ts
export const environment = {
  production: false,
  firebase: {
    apiKey: 'TU_API_KEY',
    authDomain: 'TU_PROYECTO.firebaseapp.com',
    projectId: 'TU_PROYECTO',
    storageBucket: 'TU_PROYECTO.appspot.com',
    messagingSenderId: 'TU_SENDER_ID',
    appId: 'TU_APP_ID',
  },
};
```

> ⚠️ Actualmente estos archivos están versionados en el repositorio. Está pendiente moverlos a `.env`/`environment.example.ts` y regenerar las credenciales expuestas.

## Desarrollo

```bash
npm start
# o
ng serve
```

La app queda disponible en `http://localhost:4200/`.

## Build de producción

```bash
npm run build
```

Los archivos generados quedan en `dist/`.

## Tests

```bash
npm test
```

## Autor

**Alejandro Villa Villavicencio**
Ingeniero Informático | Soporte TI

- GitHub: [@DemWolfXZ](https://github.com/DemWolfXZ)

## Licencia

Este proyecto es de uso personal. Si quieres reutilizar partes del código, contáctame primero.
