const mongoose = require('mongoose');

// User Schema
const UserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    nombre: {
        type: String
    },
    apellido: {
        type: String
    },
    cedula: {
        type: String
    },
    numero: {
        type: String
    }
});

const User = module.exports = mongoose.model('User',UserSchema);

//Obtiene Users
module.exports.getUsers = function(callback){
    User.find(callback);
}

//Obtiene User
module.exports.getUserByEmail = function(email,callback){
    const query = {
        email: email
    }
    User.findOne(query, callback);
}

//Obtiene User por Id
module.exports.getUser = function(id,callback){
    User.findById(id, callback);
}

//Crear User
module.exports.createUser = function(newUser, callback){ 
    newUser.save(callback);
}

//Eliminar User
module.exports.deleteUser = function(id,callback){
    User.findByIdAndDelete(id,callback);
}