require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/usuario', (req, res) => {
    res.json('get usuario');
});

app.post('/usuario', (req, res) => {
    let dataBody = req.body;

    if(dataBody.nombre === undefined){
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es requirido'
        });
    }

    res.json({
        persona : dataBody
    });
});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    res.json({
        id
    });
});

app.delete('/usuario', (req, res) => {
    let id = req.params.id;
    res.json('delete usuario')
});

app.listen(process.env.PORT, () => {
    console.log('escuchando el puerto 3000');
});