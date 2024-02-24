const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Admin = require('../models/adminModel');

const protect = asyncHandler (async(req, res, next) => {
  let token 
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      try {
          //obtengo el token del encabezado
          token = req.headers.authorization.split(' ')[1]
          //verificar la firma del token
          const decoded = jwt.verify(token, process.env.JWT_SECRET)
          //obtener el usuario/admin del token
          req.admin = await Admin.findById(decoded.id).select('-password')
          next()
      } catch (error) {
          console.log(error)
          res.status(401)
          throw new Error('Acceso no autorizado')
      }
  }
  if(!token){
      res.status(401)
      throw new Error('Acceso no autorizado, no se recibió ningún token')
  }
})

module.exports = {
  protect
};