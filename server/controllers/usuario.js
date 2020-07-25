
const express = require('express');
const bcrypt  = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const { verificarToke, verificaRole } = require('../middelwares/autenticacion'); 

const app = express();


app.get('/usuario', verificarToke ,(req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

   Usuario.find( { estado: true }, 'nombre email role estado google img').skip(desde).limit(limite).exec( (err, usuariosResponse) => {

       if(err){
            return res.status(400).json({
                ok: false,
                err
            })
       }

       Usuario.countDocuments( { estado: true }, (err, usuariosConteo) => {
            res.json({
                ok: true,
                total_registros: usuariosConteo,
                usuarios: usuariosResponse
            });
       });
   });

});

app.post('/usuario', [verificarToke, verificaRole] ,(req, res) => {
    let dataBody = req.body;

    let usuario = new Usuario({
        nombre   : dataBody.nombre,
        email    : dataBody.email,
        password : bcrypt.hashSync(dataBody.password, 10),
        role      : dataBody.role
    });

    usuario.save( (err, usuarioDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});

app.put('/usuario/:id', [verificarToke, verificaRole]  ,(req, res) => {
    let id = req.params.id;
    let dataBody = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, dataBody, {new: true, runValidators: true}, (err, usuarioDB) => {

        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.delete('/usuario/:id', [verificarToke, verificaRole]  ,(req, res) => {

    let id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioDel) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(!usuarioDel){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDel
        });
    });

});

app.delete('/usuarioDel/:id', [verificarToke, verificaRole]  ,(req, res) => {

    let id = req.params.id;

    Usuario.findByIdAndUpdate(id, { estado: false }, (err, usuarioDel) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(!usuarioDel){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDel
        });
    });


});


module.exports = app;
