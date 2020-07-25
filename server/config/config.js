
//===================
// Configuracion de puertos
//===================

process.env.PORT = process.env.PORT || 3000;


//===================
// Configuracion de ambiente
//===================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlBD;

if(process.env.NODE_ENV === 'dev'){
    this.urlBD = 'mongodb://localhost:27017/cafe';
}else{
    this.urlBD = process.env.MONGO_URI;
}

process.env.URLDB = this.urlBD;

//===================
// Configuracion del token
//===================

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//===================
// Configuracion de SEE de autenticacion
//===================

process.env.SEED = process.env.SEED || 'este-es-el-seed-dll';