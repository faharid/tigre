const mongoose = require('mongoose');

// Result Schema
const ResultSchema = mongoose.Schema({
    userId: {
        type: String
    },
    answers: {
        type: Array
    },
    total: {
        type: String
    }
});

const Result = module.exports = mongoose.model('Result',ResultSchema);

//Obtiene Results
module.exports.getResults = async function(){
    return await Result.find();
}

//Obtiene Result
module.exports.getResultByUserId = async function(_id){
    return await Result.findOne({
        userId: _id
    });
}

//Crear Result
module.exports.createResult = async function(_newResult){ 
    return await Result.create(_newResult);
}

//Modifica Result
module.exports.updateResult = async function(_result){ 
    return await Result.updateOne({
        userId: _result.userId
    }, { 
        $set: { 
            answers: _result.answers,
            total: _result.total
        } 
    });
}

//Eliminar Result
module.exports.deleteResult = async function(_id){
    return await Result.findByIdAndDelete(_id);
}