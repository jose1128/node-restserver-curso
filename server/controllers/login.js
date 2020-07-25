const express = require('express');
const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const app = express();

app.post('/login', (req, res) => {

    let dataBody = req.body;

    Usuario.findOne({email: dataBody.email}, (err, userDB)=>{

        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!userDB){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'usuario o contraseña incorrecta.'
                }
            });
        }

        if( !bcrypt.compareSync( dataBody.password, userDB.password )){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'usuario o contraseña incorrecta'
                }
            });
        }

        let token = jwt.sign({
            usuario: userDB
        }, process.env.SEED,{ expiresIn: process.env.CADUCIDAD_TOKEN })

        res.json({
            ok: true,
            usuario: userDB,
            token
        });

    });
});


module.exports = app;