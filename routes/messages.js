const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const User = require('../models/user');
const { authorization } = require('../utils/authentication')

// Create Message
router.put('/:userId', authorization, async (req, res, next) => {
    try {
        const user = await User.getUser(req.params.userId)
        const newMessage = await Message.createMessage({
            user: {
                email: user.email,
                nombre: user.nombre,
                apellido: user.apellido
            },
            message: req.body.message
        })
        res.json({ msg: 'Mensaje creado', id: newMessage._id });
    } catch (error) {
        console.error(error.toString())
        res.status(500).json({ msg: "Error al crear el registro" })
    }
})

//Get Messages
router.get('/', async (req, res, next) => {
    try {
        const messages = await Message.getMessages()
        if (messages.length) {
            res.json({ messages })
        } else {
            res.status(201).json({ msg: 'No existen registros' })
        }
    } catch (error) {
        console.error(error.toString())
        return res.status(401).json({ msg: 'Error al encontrar los registros' })
    }
});

//Get Message by id
router.get('/:id', authorization, async (req, res, next) => {
    try {
        const message = await Message.getMessage(req.params.id)
        if (message) {
            res.json({ message })
        } else {
            res.status(201).json({ msg: 'Registro no encontrado' })
        }
    } catch (error) {
        console.error(error.toString())
        return res.status(401).json({ msg: 'Error al encontrar el registro' })
    }
});


// Update Message
router.patch('/:id', authorization, async (req, res, next) => {
    try {
        const message = await Message.getMessage(req.params.id)
        if (!message) {
            res.status(201).json({ msg: "Usuario no encontrado" })
        } else { 
            
            await Message.updateMessage({
                _id: message._id,
                message: req.body.message ? req.body.message : message.message
            })
            res.json({ msg: 'Registro modificado' });
        }
    } catch (error) {
        console.error(error.toString())
        res.status(500).json({ msg: "Error al modificar el registro" })
    }
})

//Delete Message by id
router.delete('/:id', authorization, async (req, res, next) => {
    try {
        await Message.deleteMessage(req.params.id)
        res.json({ msg: 'Registro eliminado' });
    } catch (error) {
        console.error(error.toString())
        return res.status(401).json({ msg: 'Error al eliminar el registro' })
    }
});

module.exports = router;