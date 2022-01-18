const mongoose = require('mongoose');

// Trivia Schema
const TriviaSchema = mongoose.Schema({
    index: {
        type: Number,
        unique: true
    },
    question: {
        type: String
    },
    options: {
        type: Array
    },
    answer: {
        type: Number
    },
    points: {
        type: Number
    },
    image: {
        type: String
    },
    video: {
        type: String
    },
    active: {
        type: Boolean
    }
});

const Trivia = module.exports = mongoose.model('Trivia',TriviaSchema);

//Obtiene Trivias
module.exports.getTrivias = async function(){
    return await Trivia.find();
}

//Obtiene Trivia por index
module.exports.getTriviaByIndex = async function(_index){
    return await Trivia.findOne({
        index: _index
    });
}

//Crear Trivia
module.exports.createTrivia = async function(_newTrivia){ 
    return await Trivia.create(_newTrivia);
}

//Eliminar Trivia
module.exports.deleteTrivia = async function(_id){
    return await  Trivia.findByIdAndDelete(_id);
}