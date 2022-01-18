const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { authorization } = require('../utils/authentication')

// Create User
router.put('/', async (req, res, next) => {
    try {
        const user = await User.getUserByEmail(req.body.email)
        if (user) {
            res.status(201).json({ msg: "Usuario ya registrado" })
        } else {
            req.body.password = await bcrypt.hash(req.body.password ? req.body.password : req.body.cedula, 10)
            const newUser = await User.createUser(req.body)
            res.json({ msg: 'Usuario creado', id: newUser._id });
        }
    } catch (error) {
        console.error(error.toString())
        res.status(500).json({ msg: "Error al crear el registro" })
    }
})

//Get Users
router.get('/', async (req, res, next) => {
    try {
        const users = await User.getUsers()
        if (users.length) {
            res.json({ users })
        } else {
            res.status(201).json({ msg: 'No existen registros' })
        }
    } catch (error) {
        console.error(error.toString())
        return res.status(401).json({ msg: 'Error al encontrar los registros' })
    }
});

//Get User by id
router.get('/:id', authorization, async (req, res, next) => {
    try {
        const user = await User.getUser(req.params.id)
        if (user) {
            res.json({ user })
        } else {
            res.status(201).json({ msg: 'Registro no encontrado' })
        }
    } catch (error) {
        console.error(error.toString())
        return res.status(401).json({ msg: 'Error al encontrar el registro' })
    }
});


// Update User
router.patch('/:id', authorization, async (req, res, next) => {
    try {
        const user = await User.getUserById(req.params.id)
        if (!user) {
            res.status(201).json({ msg: "Usuario no encontrado" })
        } else { 
            let newPassword
            if (req.body.password) { 
                if (!req.body.newPassword) return res.status(402).json({ msg: "Se requiere la contraseña nueva"})
                const verified = await bcrypt.compare(req.body.password, user.password)
                if (verified) {
                    newPassword = await bcrypt.hash(req.body.newPassword, 10)
                } else {
                    return res.status(402).json({ msg: "Contraseña incorrecta"})
                } 
            }

            await User.updateUser({
                _id: user._id,
                email: req.body.email ? req.body.email : user.email,
                password: newPassword ? newPassword : user.password,
                nombre: req.body.nombre ? req.body.nombre : user.nombre,
                apellido: req.body.apellido ? req.body.apellido : user.apellido,
                cedula: req.body.cedula ? req.body.cedula : user.cedula,
                numero: req.body.numero ? req.body.numero : user.numero
            })
            res.json({ msg: 'Registro modificado' });
        }
    } catch (error) {
        console.error(error.toString())
        res.status(500).json({ msg: "Error al modificar el registro" })
    }
})

//Delete User by id
router.delete('/:id', authorization, async (req, res, next) => {
    try {
        await User.deleteUser(req.params.id)
        res.json({ msg: 'Registro eliminado' })
    } catch (error) {
        console.error(error.toString())
        return res.status(401).json({ msg: 'Error al eliminar el registro' })
    }
});

//Log in
router.post('/login', async (req, res, next) => {
    try {
        const user = await User.getUserByEmail(req.body.email)
        if (user) {
            const verified = await bcrypt.compare(req.body.password, user.password)
            if (verified) {
                const token = jwt.sign({user}, process.env.SECRET);
                return res.cookie("access_token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "prod",
                }).status(200).json({ msg: "Autenticacion correcta" });
            } else {
                return res.status(402).json({ msg: 'Contraseña incorrecta' })
            }
        } else {
            return res.status(404).json({ msg: 'Usuario no encontrado' })
        }
    } catch (error) {
        console.error(error.toString())
        return res.status(401).json({ msg: 'Error al autenticar el usuario' })
    }
});

module.exports = router;