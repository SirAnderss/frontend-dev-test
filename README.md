# Frontend dev test

Pasos para correr el proyecto

1. Clonar este repositorio o descargar el codigo

```
git clone git@github.com:SirAnderss/frontend-dev-test.git
```

2. Instalar las dependencias con el gestor de paquetes que prefiera

`npm install`
o
`yarn install`
o
`pnpm install`

3. Agregar las variables de entorno al archivo env enviadas al correo

`cp env.example env.development.local`

3. Puede correr los test con el comando

`npm test`
o
`yarn test`
o
`pnpm test`

4. Para probar la ui se levanta el servidor de pruebas con el comando

`npm run dev`
o
`yarn dev`
o
`pnpm dev`

## Si desea desplegar el sitio estatico a surge.sh

1. Instala el CLI de surge si no lo tiene instalado en su maquina local

```
npm i --global surge
```

2. Debe modificar las variables de entorno para la redireccion de wompi

```
// env.development.local

- VITE_WOMPI_REDRECT=http://localhost:port/checkout
+ VITE_WOMPI_REDRECT=hsttp://subdomain.surge.sh/checkout
```

3. Genera los archivos estaticos

`npm run build`
o
`yarn build`
o
`pnpm build`

4. Crea el archivo 200.html para las redirecciones

```
cd dist
cp index.html 200.html
```

5. Dentro del directorio dir ejecuta el comando

`surge`

6. Sigue los pasos del CLI
