const jwt = require("jsonwebtoken");

module.exports.authorization = async (req, res, next) => {

  if(req.cookies?.access_token){
    try {
        await jwt.verify(req.cookies.access_token, process.env.SECRET)
        return next()
    } catch (error) {
        console.error(error.toString())
        return res.status(403).json({ msg: 'Autenticacion no valida' })
    }
  } else {
      return res.status(403).json({ msg: 'Error usuario no autenticado' })
  }

};