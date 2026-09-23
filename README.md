# Portafolio – Alejandro Villa Villavicencio

Portafolio profesional desarrollado con **Angular**, **Ionic** y **Firebase**. Presenta mi perfil
como Ingeniero Informático con experiencia en 3 áreas relacionadas: **Soporte de Aplicaciones/TI**,
**Desarrollo** web/móvil y **Análisis de Datos**, junto a experiencia, proyectos y un formulario de
contacto funcional.

🔗 **Demo:** [portafolio-alejandro-villa.web.app](https://portafolio-alejandro-villa.web.app)

## Stack

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Ionic](https://img.shields.io/badge/Ionic-3880FF?style=for-the-badge&logo=ionic&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)

| Capa | Tecnología |
|---|---|
| Lenguaje | [TypeScript](https://www.typescriptlang.org/) |
| Framework | [Angular](https://angular.dev/) 18 |
| UI / Componentes | [Ionic Framework](https://ionicframework.com/) 8 |
| Multiplataforma | [Capacitor](https://capacitorjs.com/) |
| Backend / Datos | [Firebase](https://firebase.google.com/) (Firestore, Hosting) |
| Estilos | SCSS / Sass |

## Características

- Diseño responsive de una sola página con secciones: Hero, Sobre mí, Experiencia, Habilidades,
  Proyectos y Contacto, con routing por sección (lazy loading) y modo claro/oscuro (`theme.service.ts`).
- Identidad profesional única con 3 áreas relacionadas (Soporte de Aplicaciones, Desarrollo, Datos)
  y **3 CV descargables** según el área de interés del reclutador (`download.service.ts`).
- Proyectos filtrables por categoría de origen y por área profesional (Desarrollo / Datos /
  Sistemas-Soporte), incluyendo un caso de estudio real de limpieza de datos con SQL y Python.
- Contacto directo por email, teléfono, WhatsApp y LinkedIn (sin intermediarios), más un formulario
  con validación y sanitización en el cliente que guarda las consultas en Firestore (`contact.service.ts`),
  protegido con reglas de Firestore que solo permiten *crear* documentos validados (ver Seguridad).
- SEO dinámico por sección, incluyendo Open Graph/Twitter Card y JSON-LD (`seo.service.ts`,
  conectado desde `app.component.ts`).
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
- [Firebase CLI](https://firebase.google.com/docs/cli) (solo para desplegar)

## Instalación

```bash
npm install
```

### Variables de entorno

El proyecto usa Firebase. Necesitas definir tu propia configuración en `src/environments/environment.ts`
(y `environment.prod.ts`, `environment.development.ts` según corresponda) con los datos de tu proyecto
de Firebase:

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

Estos archivos ya están excluidos de git (`.gitignore`) y no deben commitearse con credenciales reales.

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

Los archivos generados quedan en **`www/`** (no en `dist/`: el `outputPath` está configurado así en
`angular.json` porque el proyecto usa convención Ionic), listo para servir como sitio estático.

## Tests y linting

```bash
npm test    # Pruebas unitarias (Karma/Jasmine)
npm run lint
```

## Firebase / Despliegue

El sitio se despliega en Firebase Hosting, con Firestore como único backend (solo dos colecciones,
sin lectura pública: ver Seguridad).

```bash
firebase login              # una sola vez
npm run build                # genera www/
firebase deploy --only hosting            # despliega solo el sitio
firebase deploy --only firestore:rules    # despliega solo las reglas de Firestore, tras editarlas
firebase deploy                            # despliega hosting + reglas de Firestore + Storage
```

## Seguridad

- El sitio **nunca lee datos de Firestore** desde el cliente; solo escribe en dos colecciones muy
  acotadas: `contact-messages` (formulario de contacto) y `downloads` (analítica de descargas de CV/WAD).
- `firestore.rules` permite únicamente **crear** documentos en esas dos colecciones, validando la forma
  exacta de los datos (tipos y longitudes), y deniega leer, editar o borrar desde el cliente. Cualquier
  otra colección queda completamente bloqueada por defecto.
- `storage.rules` permite solo lectura pública de los assets estáticos (imágenes, CV, WAD) y bloquea
  toda escritura desde el cliente.
- El `apiKey` de Firebase que viaja en `environment.ts` es la configuración pública estándar del SDK web
  (no es un secreto por diseño), pero los archivos `environment*.ts` estuvieron versionados en git por
  error y ya se destrackearon (`git rm --cached`). Si vas a reutilizar este repo, verifica que tu propio
  `apiKey` no haya quedado expuesto en el historial y rótalo desde la consola de Firebase si es necesario.
- No se commitean credenciales de Firebase Admin SDK, `serviceAccountKey.json` ni archivos `.env` reales
  (ver `.gitignore`).

## Autor

**Alejandro Villa Villavicencio**
Ingeniero Informático | Soporte de Aplicaciones · Desarrollo · Datos

- GitHub: [@alejandro-villa-dev](https://github.com/alejandro-villa-dev)

## Licencia

Este proyecto es de uso personal. Si quieres reutilizar partes del código, contáctame primero.
