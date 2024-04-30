const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Lista de usuarios
let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

//GET 
app.get('/usuarios', (req, res) => {
    res.send(usuarios);
});

//POST
app.post('/usuarios', (req, res) => {
    const newUser = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia
    };
    usuarios.push(newUser);
    res.send(newUser);
});

//GET /usuarios/:nombre
app.get('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre.toLowerCase();
    const findUser = usuarios.find((user) => user.nombre.toLowerCase() === nombre);
    if(findUser) {
        res.send(findUser)
    }
});

//PUT
app.put('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre.toLowerCase();
    const findUser = usuarios.find((user) => user.nombre.toLowerCase() === nombre);
    if(findUser){
        findUser.id= req.body.id || findUser.id;
        findUser.nombre = req.body.nombre || findUser.nombre;
        findUser.edad = req.body.edad || findUser.edad;
        findUser.lugarProcedencia = req.body.lugarProcedencia || findUser.lugarProcedencia;
    }
    res.send(findUser)
})


//DELETE
app.delete('/usuarios/:id', (req, res) => {
    const userID = parseInt(req.params.id);
    const deleteUser = usuarios.filter(user => user.id !== userID);
    usuarios = deleteUser
    res.send(usuarios)
})


app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
