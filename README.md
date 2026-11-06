# Actividad 1: Formulario Web con Node.js

## Integrantes
- Juan Jimenez
- Andres Lopez

## Descripción
Este proyecto consiste en un formulario web que permite ingresar datos personales como nombre, apellido, edad, correo electrónico y programa académico.

Los datos se envían a un servidor creado con Node.js y Express utilizando los métodos GET y POST.

## Tecnologías utilizadas
- HTML5
- JavaScript
- Node.js
- Express

## Instalación y ejecución

1. Descargar o clonar el proyecto.
2. Abrir la carpeta del proyecto en la terminal.
3. Instalar las dependencias:

```bash
npm install
```

4. Iniciar el servidor:

```bash
node server.js
```

5. Abrir el navegador e ingresar a:

```text
http://localhost:3000
```

## Funcionamiento
El proyecto permite:
- Registrar datos mediante un formulario HTML.
- Enviar información utilizando GET.
- Enviar información utilizando POST.
- Mostrar los datos recibidos en el navegador.
- Regresar al formulario para realizar otro registro.
- Ver todos los usuarios registrados por cada método en la página `/usuarios`.

## Usuarios registrados
El servidor guarda los registros en dos arreglos en memoria: `usuariosGet` y `usuariosPost`.
Para verlos, abre:

```text
http://localhost:3000/usuarios
```

También puedes entrar con el enlace **Ver usuarios registrados** del formulario o de la
página de respuesta. La página muestra dos tablas separadas: una para GET y otra para POST,
con el total de registros de cada método.

**Importante:** la información se guarda solo mientras el servidor esté encendido. Al
reiniciarlo, las listas vuelven a quedar vacías porque no se usa base de datos.

## Publicar en GitHub y en internet

GitHub sirve para guardar el código, pero **GitHub Pages no ejecuta Node.js ni Express**.
Para que el formulario funcione en línea se necesita un hosting de Node.js, por ejemplo
**Render**.

### 1. Subir el proyecto a GitHub

Crear un repositorio vacío en GitHub llamado `actividad1` y ejecutar en la carpeta del proyecto:

```bash
git init
git add .
git commit -m "Actividad 1: formulario GET y POST"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/actividad1.git
git push -u origin main
```

### 2. Publicar en Render

1. Entrar a <https://render.com> y crear una cuenta con GitHub.
2. Elegir **New +** → **Web Service**.
3. Conectar el repositorio `actividad1`.
4. Configurar:
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
5. Presionar **Create Web Service** y esperar el despliegue.
6. Render entrega una dirección parecida a `https://actividad1-xxxx.onrender.com`.

El servidor usa `process.env.PORT || 3000`, así que funciona tanto en local como en Render.

**Nota:** en el plan gratuito el servicio se suspende por inactividad, por eso la primera
carga puede tardar unos segundos. Los registros en memoria se pierden cuando el servicio se
reinicia.
