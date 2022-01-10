const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const User = require('../models/user');

// Create User
router.put('/', (req, res, next) => {
    User.getUserByEmail(req.body.email, (err,one)=>{
        if(err){
            res.json({success: false, msg:'Error de registro'});
        } else {
            if(one){
                res.json({success: true, msg:'User creado', id: one._id});
            } else {
                let newUser = new User({
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    email: req.body.email,
                    cedula: req.body.cedula,
                    numero: req.body.numero
                });
                User.createUser(newUser, (err, user) => { 
                    if(err){
                        res.json({success: false, msg:'Error de registro'});
                    } else {
                        res.json({success: true, msg:'User creado', id: user._id});
                    }
                })
            }
        }
    })
})
  
//Get Users
router.get('/', ( _req, res, next) => {
    User.getUsers((err, users) => {
        if(err){
            console.log(err);
            return res.json({success: false, msg: 'Error al obtener user'});
        } else {
            if(!users){
                return res.json({success: false, msg: 'No existen users'});
            } else {
                res.json({
                success: true, users
                });
            };
        } 
    });
});

//Get User by id
router.get('/:id', (_req, res, next) => {
    User.getUser(req.params.id,(err,one) => {
        if(err){
            return res.json({success: false, msg: 'User no encontrado'});
        } else {
            if(one){
                return res.json({success: true, one});
            } else {
                return res.json({success: false, msg: 'User no encontrado'});
            }
        }
    });
});

//Delete User by id
router.delete('/:id', (req, res, next) => {
    User.deleteUser(req.body.id,(err) => {
        if(err){
        return res.json({success: false, msg: 'Error al eliminar user'});
        } else {
        return res.json({success: true, msg: 'User borrada'});
        }
    });
});

//Send Email
router.post('/send', (req, res, next) => {
    let image = '';
    let cid = '';
    let subject = '';

    if(req.body.type === 'Live'){
        image = 'promo2.jpg'
        cid = 'promo2';
        subject = 'Es Hoy!! Vive la noche blanca';
    }else{
        image = 'promo1.jpg'
        cid = 'promo1';
        subject = 'Es Hoy!! Soy Martinez Borja';
    }

    if(req.body.email){
        var transporter = nodemailer.createTransport({
            host: 'smtp.titan.email',
            port: '465',
            auth: {
                user: 'admin@soymartinezborja.com',
                pass: 'X3on.2021'
            },
            secure: true, 
            tls: {
                rejectUnauthorized:false
            }
        });
    
        let mailOptions = {
            from: '"Soy Martinez Borja" <admin@soymartinezborja.com>',
            to: req.body.email,
            subject: subject,
            html: '<img src="cid:' + cid + '"/>',
            attachments: [{
                filename: image,
                path: './settings/'+ image,
                cid: cid
            }] 
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
            }
        });
        return res.json({success: true, msg: 'Email Enviado'});
    } else {
        User.getUsers((err, users) => {
            if(err){
                console.log(err);
                return res.json({success: false, msg: 'Error al obtener user'});
            } else {
                for(let i=0;i<users.length;i++){
                    console.log(users[i].email)
                    var transporter = nodemailer.createTransport({
                        host: 'smtp.titan.email',
                        port: '465',
                        auth: {
                            user: 'admin@soymartinezborja.com',
                            pass: 'X3on.2021'
                        },
                        secure: true, 
                        tls: {
                            rejectUnauthorized:false
                        }
                    });
                
                    let mailOptions = {
                        from: '"Soy Martinez Borja" <admin@soymartinezborja.com>',
                        to: users[i].email,
                        subject: subject,
                        html: '<img src=cid:"' + cid + '"/>',
                        attachments: [{
                            filename: image,
                            path: '../settings/'+ image,
                            cid: cid
                        }]
                    };
                    
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } else {
                        }
                    }); 
                }
                return res.json({success: true, msg: 'Campaña enviada'});
            } 
        });    
    }
});

module.exports = router;