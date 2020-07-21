process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlBD;

if(process.env.NODE_ENV === 'dev'){
    this.urlBD = 'mongodb://localhost:27017/cafe';
}else{
    this.urlBD = 'mongodb+srv://josebl97:4rtY3nSeGccY9zMa@cluster0.4oecl.mongodb.net/cafe?retryWrites=true&w=majority'
}

process.env.URLDB = this.urlBD;