const express = require('express');
const router = express.Router();
const Trivia = require('../models/trivia');
const Result = require('../models/result');
const User = require('../models/user');
const { authorization } = require('../utils/authentication')

// Create Trivia
router.put('/', async (req, res, next) => {
    try {
        const trivia = await Trivia.getTriviaByIndex(req.body.index)
        if (trivia) {
            res.status(201).json({ msg: "Trivia ya registrada" })
        } else {
            if(req.body.answer > req.body.options.length) return res.status(401).json({ msg: 'La respuesta debe ser parte de las preguntas' })
            const newTrivia = await Trivia.createTrivia(req.body)
            res.json({ msg: 'Trivia creada', id: newTrivia._id });
        }
    } catch (error) {
        console.error(error.toString())
        res.status(500).json({ msg: "Error al crear el registro" })
    }
})

//Get Trivias
router.get('/', async (req, res, next) => {
    try {
        const trivias = await Trivia.getTrivias()
        if (trivias.length) {
            res.json({ trivias })
        } else {
            res.status(201).json({ msg: 'No existen registros' })
        }
    } catch (error) {
        console.error(error.toString())
        return res.status(401).json({ msg: 'Error al encontrar los registros' })
    }
});

//Get Trivia by index
router.get('/:index', async (req, res, next) => {
    try {
        const trivia = await Trivia.getTriviaByIndex(req.params.index)
        if (trivia) {
            res.json({ trivia })
        } else {
            res.status(201).json({ msg: 'Registro no encontrado' })
        }
    } catch (error) {
        console.error(error.toString())
        return res.status(401).json({ msg: 'Error al encontrar el registro' })
    }
});

//Validate Questions
router.post('/validate/:userId', authorization, async (req, res, next) => {
    try {
        const result = await Result.getResultByUserId(req.params.userId)
        if(!result){
            const trivias = await Trivia.getTrivias()
            if (trivias) {
                let total = 0;
                for (const [index, answer] of req.body.answers.entries()){
                    if(trivias[index]?.answer === answer){
                        total += +trivias[index]?.points
                    }
                }
                await Result.createResult({
                    userId: req.params.userId,
                    answers: req.body.answers,
                    total: total
                })
                res.json({
                    total: total
                })
            } else {
                res.status(201).json({ msg: 'Pregunta no encontrada' })
            }
        } else {
            return res.json({ msg: 'La trivia ya fue contestada'});
        }
    } catch (error) {
        console.error(error.toString())
        return res.status(401).json({ msg: 'Error al validar los registro' })
    }
});

//Validate Question
router.post('/:index/validate/:userId', authorization, async (req, res, next) => {
    try {
        const trivia = await Trivia.getTriviaByIndex(req.params.index)
        if (trivia) {
            const result = await Result.getResultByUserId(req.params.userId);
            if (result?.answers?.[req.params.index] !== undefined) {
                return res.json({ msg: 'La pregunta ya fue contestada'});
            } else {

                if(! result?.answers.length){ 
                    await Result.createResult({
                        userId: req.params.userId,
                        answers: [req.body.answer],
                        total: trivia?.answer === req.body.answer ? trivia?.points : 0
                    })
                } else {
                    result.answers.push(req.body.answer)
                    await Result.updateResult({
                        userId: req.params.userId,
                        answers: result.answers,
                        total: trivia?.answer === req.body.answer ? +result.total + +trivia?.points : +result.total
                    })
                }

                if (trivia?.answer === req.body.answer) {
                    return res.json({
                        msg: 'Respuesta correcta'
                    })
                } else {
                    return res.json({
                        msg: `Respuesta incorrecta, la respuesta correcta es: ${trivia?.options[trivia?.answer]}`,
                        correctAnswer: trivia?.answer
                    })
                }
            }
        } else {
            res.status(201).json({ msg: 'Pregunta no encontrada' })
        }
    } catch (error) {
        console.error(error.toString())
        return res.status(401).json({ msg: 'Error al validar los registro' })
    }
});

//Get Results
router.get('/:userId/results', authorization, async (req, res, next) => {
    try{
        const result = await Result.getResultByUserId(req.params.userId)
        if (result){
            const trivias = await Trivia.getTrivias()
            const answers = []
            for (const [index, answer] of result.answers.entries()){
                answers.push({
                    index: index,
                    question: trivias[index].question,
                    answer: trivias[index].options[answer],
                    status: trivias[index].answer === answer ? "Correcto" : "Incorrecto"
                })
            }
            return res.json({
                answers: answers,
                total: result?.total
            }); 
        } else {
            return res.status(401).json({ msg: 'No se ha contestado la trivia' })
        }
    } catch (error) {
        console.error(error.toString())
        return res.status(401).json({ msg: 'Error al encontrar el resultado' })
    }
});

//Get Winners
router.post('/winners', authorization, async (req, res, next) => {
    try{
        const results = await Result.getResults()

        const sorted = results.sort((a, b) => b.total - a.total).splice(0,3)

        const winners = []

        for ( const sort of sorted){
            const user = await User.getUser(sort.userId)
            winners.push({
                nombre: user?.nombre,
                apellido: user?.apellido,
                email: user?.email,
                total: sort.total
            })
        }

        return res.json({
            winners
        });
    } catch (error) {
        console.error(error.toString())
        return res.status(401).json({ msg: 'Error al encontrar ganadores' })
    }
});

//Delete Trivia by id
router.delete('/:id', async (req, res, next) => {
    try {
        await Trivia.deleteTrivia(req.body.id)
        res.json({ msg: 'Registro eliminado' });
    } catch (error) {
        console.error(error.toString())
        return res.status(401).json({ msg: 'Error al eliminar el registro' })
    }
});

module.exports = router;