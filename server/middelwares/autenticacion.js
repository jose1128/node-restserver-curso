const jwt = require('jsonwebtoken');

// =================
// Verificar token
// =================
let verificarToke = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if(err){
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valida'
                }
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};

// =================
// Verificar roles
// =================

let verificaRole = (req, res, next) => {
    let usuario = req.usuario;

    if(usuario.role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            ok: false,
            err: {
                message: 'Usuario no esta habilitado para la creacion de usuario'
            }
        });
    }
    next();
};

module.exports = {
    verificarToke,
    verificaRole
};