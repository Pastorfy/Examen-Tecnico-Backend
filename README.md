
# Instalación MSSQL con DOCKER
En el repositorio se encuentra la imagen `dockerfile`  y el archivo `docker-compose.yml`. 

Para instalar se debe ejecutar desde raiz el siguiente comando:
```bash
docker-compose up
```
Con esto ya se estara iniciando la instancia de `MSSQL`, seguido de esto ejecutar los scripts que estan dentro de la carpeta de `db`.
> Nota: Es necesario tener instalado docker.

# Instalación MSSQL local
En el repositorio se encuentra una carpeta llamada `db` donde se encuentran los archivos `.sql` para que pueda funcionar correctamente la api. Estos archivos se deben ejecutar en el servidor de MSSQL.
>Nota la versión utilizada es la `Microsoft SQL Server 2022 (RTM-CU11) (KB5032679) - 16.0.4105.2 (X64)  	Nov 14 2023 18:33:19  	Copyright (C) 2022 Microsoft Corporation 	Developer Edition (64-bit) on Linux (Ubuntu 20.04.6 LTS) <X64>`. Si se cambiara otra versión tomar en cuenta que soporte los `full text index`
# Archivos .env
Tanto dentro de la carpeta `Api` y `App` es necesario configurar los archivos `.env` para que funcionen correctamente.

En el caso de `App`, solo es necesario configurar la variable `VITE_API_URL`.

En el caso de `Api`, es necesario configurar las siguientes variables `DB_USER`, `DB_PASSWORD`,
`DB_NAME`,`DB_SERVER`,`PORT_API`

# Instalación Api y App 

Desde el repositorio raiz, ejecutar el siguiente comando para instalar todas las dependencias necesarias.
```bash
npm install
```
Para ejecutar la app ejecutar el siguiente comando:
```bash
npm run dev:app
```
Para ejecutar la api ejecutar el siguiente comando:
```bash
npm run dev:api
``` 

# Link de la prueba técnica
[Descargar documento PDF](https://drive.google.com/file/d/1zKp0MTdamXGTbSfhC8Vh7I4_CriUBukH/view)