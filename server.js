const express = require('express');
const path = require('path');

const app = express();
// En local usa 3000; en un hosting como Render usa el puerto que asigna la plataforma.
const PORT = process.env.PORT || 3000;

// Guardan los registros mientras el servidor esté encendido.
const usuariosGet = [];
const usuariosPost = [];

// Permite leer los datos que llegan por POST desde el formulario.
app.use(express.urlencoded({ extended: true }));

// Permite usar el archivo de estilos estilos.css.
app.use(express.static(__dirname));

// Muestra el formulario al entrar a http://localhost:3000
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'formulario.html'));
});

// Ruta para recibir los datos por GET.
app.get('/registro-get', (req, res) => {
  usuariosGet.push(req.query);
  res.send(crearRespuesta(req.query, 'GET'));
});

// Ruta para recibir los datos por POST.
app.post('/registro-post', (req, res) => {
  usuariosPost.push(req.body);
  res.send(crearRespuesta(req.body, 'POST'));
});

// Ruta para ver todos los usuarios registrados.
app.get('/usuarios', (req, res) => {
  res.send(crearListaUsuarios());
});

// Arma la página de respuesta con los datos recibidos.
function crearRespuesta(datos, metodo) {
  const nombre = datos.nombre || '(sin dato)';
  const apellido = datos.apellido || '(sin dato)';
  const edad = datos.edad || '(sin dato)';
  const correo = datos.correo || '(sin dato)';
  const programa = datos.programa || '(sin dato)';

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Datos recibidos por ${metodo}</title>
      <link rel="stylesheet" href="/estilos.css">
    </head>
    <body>
      <main>
        <h1>Datos recibidos</h1>
        <h2>Los datos fueron recibidos mediante ${metodo}</h2>

        <div class="datos">
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Apellido:</strong> ${apellido}</p>
          <p><strong>Edad:</strong> ${edad}</p>
          <p><strong>Correo electrónico:</strong> ${correo}</p>
          <p><strong>Programa académico:</strong> ${programa}</p>
        </div>

        <a class="volver" href="/">Volver al formulario</a>
        <a class="volver secundario" href="/usuarios">Ver usuarios registrados</a>
      </main>
    </body>
    </html>
  `;
}

// Arma la página con las dos listas de usuarios.
function crearListaUsuarios() {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Usuarios registrados</title>
      <link rel="stylesheet" href="/estilos.css">
    </head>
    <body>
      <main class="ancho">
        <h1>Usuarios registrados</h1>
        <p class="nota">Los registros se guardan solo mientras el servidor esté encendido.</p>

        <h2>Registros por GET (${usuariosGet.length})</h2>
        ${crearTablaUsuarios(usuariosGet)}

        <h2>Registros por POST (${usuariosPost.length})</h2>
        ${crearTablaUsuarios(usuariosPost)}

        <a class="volver" href="/">Volver al formulario</a>
      </main>
    </body>
    </html>
  `;
}

// Crea una tabla con los datos de una lista de usuarios.
function crearTablaUsuarios(usuarios) {
  if (usuarios.length === 0) {
    return '<p class="vacio">No hay registros todavía.</p>';
  }

  const filas = usuarios.map((usuario, indice) => `
    <tr>
      <td>${indice + 1}</td>
      <td>${usuario.nombre || '(sin dato)'}</td>
      <td>${usuario.apellido || '(sin dato)'}</td>
      <td>${usuario.edad || '(sin dato)'}</td>
      <td>${usuario.correo || '(sin dato)'}</td>
      <td>${usuario.programa || '(sin dato)'}</td>
    </tr>
  `).join('');

  return `
    <div class="tabla-contenedor">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
            <th>Correo</th>
            <th>Programa</th>
          </tr>
        </thead>
        <tbody>${filas}</tbody>
      </table>
    </div>
  `;
}

// Inicia el servidor en el puerto 3000.
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
