const mongoose = require('mongoose');

// Message Schema
const MessageSchema = mongoose.Schema({
    user: {
        email: {
            type: String
        },
        nombre: {
            type: String
        },
        apellido: {
            type: String
        }
    },
    message: {
        type: String
    }
});

const Message = module.exports = mongoose.model('Message',MessageSchema);

//Obtiene Messages
module.exports.getMessages = async function(){
    return await Message.find();
}

//Obtiene Message por Id
module.exports.getMessage = async function(_id){
    return await Message.findById(_id);
}

//Crear Message
module.exports.createMessage = async function(_newMessage){ 
    return await Message.create(_newMessage);
}

//Modificar Message
module.exports.updateMessage = async function(_message){ 
    return await Message.findByIdAndUpdate(_message._id,{
        message: _message.message
    });
}

//Eliminar Message
module.exports.deleteMessage = async function(_id){
    return await Message.findByIdAndDelete(_id);
}