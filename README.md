# Front-End
Front end para el sistema de encuestas de la UAMI

## TODO Tecnologías

Aquí describimos las tecnologías usadas

## TODO Herramientas

Aquí van las herramientas que recomendamos usar para los nuevos programadores. Por ejemplo, VSCode y extensiones

## Development

**Nota**: se recomienda crear un directorio llamado `encuestas-uami`.
Ya que también está el repositorio de backend y pueden estar ambos en este directorio para mejor organización.

Para comenzar a trabajar en el proyecto:

1. Clonar este repositorio

```shell
git clone https://github.com/encuestas-uami/front-end.git
```

2. Después, ingresar al directorio o carpeta del repositorio.

```shell
cd front-end
```

3. Instalar las dependencias de `node`:

```shell
npm install
```

4. Iniciar el servidor de desarrollo:

```shell
npm start
```

## Estructura del proyecto

La carpeta de `src` tiene las siguientes carpetas:
```
src
├── assets
├── components
├── context
├── data
├── hooks
├── pages
├── services
├── styles
└── utils
```
- **`assets`** almacenará archivos de imágenes, svg y cualquier archivo que no sea código de JS.
- **`context`** contendrá cualquier [*contexto*](https://reactjs.org/docs/context.html) que se requiera en la aplicación.
- **`data`** guardará cualquier archivo JSON *placeholder* y el archivo con las constantes utilizadas.
- **`hooks`** almacenará los [*hooks personalizados*](https://reactjs.org/docs/hooks-custom.html).
- **`pages`** contendrá los componentes de las *Vistas*.
- **`styles`** almacenará los archivos css de las vistas y el css global.
- **`utils`** incluirá las funciones de utilidades (pequeñas, simples y de propósito general).
- **`services`** contendrá las funciones que hacen peticiones a la API.
- **`components`** almacenará los componentes que forman nuestras *Vistas* divididos en carpetas con el nombre de la vista; por ejemplo si un conjunto *c* de componentes forman la vist *Home* entonces el conjunto *c* deberá estar en el directorio `src/components/Home`, si el conjunto de componentes *c* se utilizan en mas de una vista entonces estarían en `src/components`.

## TODO Tailwind

### TODO Instalación de TailwindCSS
