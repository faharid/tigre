const mongoose = require('mongoose');

// User Schema
const UserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String
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
module.exports.getUsers = async function(){
    return await User.find().select({password:0});
}

//Obtiene User
module.exports.getUserByEmail = async function(email){
    return await User.findOne({
        email: email
    });
}

//Obtiene User por Id
module.exports.getUser = async function(_id){
    return await User.findById(_id).select({password:0});
}

//Obtiene User por Id
module.exports.getUserById = async function(_id){
    return await User.findById(_id);
}

//Crear User
module.exports.createUser = async function(_newUser){ 
    return await User.create(_newUser);
}

//Modificar User
module.exports.updateUser = async function(_user){ 
    return await User.findByIdAndUpdate(_user._id,{
        email: _user.email,
        password: _user.password,
        nombre: _user.nombre,
        apellido: _user.apellido,
        cedula: _user.cedula,
        numero: _user.numero
    });
}

//Eliminar User
module.exports.deleteUser = async function(_id){
    return await User.findByIdAndDelete(_id);
}