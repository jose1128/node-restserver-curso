process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlBD;

if(process.env.NODE_ENV === 'dev'){
    this.urlBD = 'mongodb://localhost:27017/cafe';
}else{
    this.urlBD = process.env.MONGO_URI;
}

process.env.URLDB = this.urlBD;