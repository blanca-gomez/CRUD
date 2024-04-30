const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];


app.get('/usuarios', (req, res) => {
    res.send(`
        <h1>PERSONAJES DE STREET FIGHTER</h1>
        <ul>
            ${usuarios.map((usuario) => `
                <li>ID: ${usuario.id}, Nombre: ${usuario.nombre}, Edad: ${usuario.edad}, Lugar de procedencia: ${usuario.lugarProcedencia}</li>
            `).join('')}
        </ul>
        <form action="/usuarios" method="post">
            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" name="nombre" required>
            <label for="edad">Edad</label>
            <input type="number" id="edad" name="edad" required>
            <label for="lugarProcedencia">Lugar de Procedencia</label>
            <input type="text" id="lugarProcedencia" name="lugarProcedencia" required>
            <button type="submit">Agregar usuario</button>
        </form>
    `);
});


app.post('/usuarios', (req, res) => {
    const newUser = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia
    };
    usuarios.push(newUser);
    res.send(`El usuario con ID: ${newUser.id}, nombre: ${newUser.nombre}, edad: ${newUser.edad}, lugar de procedencia: ${newUser.lugarProcedencia} ha sido agregado exitosamente.`);
});


app.get('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre.toLowerCase();
    const findUser = usuarios.find((user) => user.nombre.toLowerCase() === nombre);
    if (findUser) {
        res.json(findUser);
    } else {
        res.status(404).send(`Usuario no encontrado.`);
    }
});




app.listen(port, () => {
    console.log(`Express is listening on port ${port}`);
});
