const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
};

let usuarioSchema = new Schema({
    nombre : {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    password : {
        type: String,
        required: [true, 'La contraseña es requerida']
    },
    email : {
        type: String,
        unique: true,
        required: [true, 'El correo es requerida']
    },
    role : {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado : {
        type: Boolean,
        default: true
    },
    img : {
        type: String,
        required: false
    },
    google : {
        type: Boolean,
        default: false
    }
});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });

module.exports = mongoose.model('Usuario', usuarioSchema);