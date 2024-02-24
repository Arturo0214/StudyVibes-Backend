const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Admin = require('../models/adminModel')

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}

const adminLogin = asyncHandler (async (req, res) => {
    //destructuring de la informacion del body request
    const {email, password} = req.body
    //mandar error por si no se pusieron todos los datos en la solicitud
    if(!email || !password) {
        res.status(400)
        throw new Error('Favor de verificar que esten todos los datos')
    }
    //verificar que el usuario exista 
    const admin = await Admin.findOne({email})

    //comparamos el hash del password y el usuario
    if(admin && (await bcrypt.compare(password, admin.password))){
        res.status(200).json({
            _id: admin.id,
            name: admin.name,
            email: admin.email,
            isAdmin: admin.isAdmin,
            token: generateToken(admin.id)
        })
    } else {
        res.status(400)
        throw new Error('Credenciales incorrectas')
    }
})

const adminRegister = asyncHandler (async (req, res) => {
    //desestructuramos el body request
    const {name, email, password} = req.body
    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Favor de verificar que esten todos los datos')
    }
    //verificamos que recibamos la informacion que el modelo User necesita
    const adminExists = await Admin.findOne({email})
    if(adminExists){
        res.status(400)
        throw new Error('Este email ya fue registrado, el usuario ya existe')
    }
    //hash al password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    //creamos el usuario
    const admin = await Admin.create({
        name,
        email,
        password: hashedPassword
    })
    //mandamos la respuesta de la funcion
    if(admin) {
        res.status(201).json({
            _id: admin.id,
            name: admin.name,
            email: admin.email
    })
    } else {
        res.status(400)
        throw new Error('No se pudo crear el usuario, datos incorrectos')
    }
})

const getData = asyncHandler(async (req, res) => {
    res.json(req.admin)
})


const getAdminById = asyncHandler(async (req, res) => {
    const adminId = req.params.id
    const admin = await Admin.findById(adminId)
    res.json(admin)

})

const getAllAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find({});

  if (admins) {
    res.status(200).json(admins);
  } else {
    res.status(404);
    throw new Error('No se encontraron administradores');
  }
});

const deleteAdmin = asyncHandler(async (req, res) => {
    const adminId = req.params.id;

    // Ensure the logged-in admin is deleting their own account
    if (adminId !== req.admin.id.toString()) {
        res.status(403);
        throw new Error('Unauthorized: You can only delete your own account');
    }

    // Find and delete the admin
    const admin = await Admin.findByIdAndDelete(adminId);

    if (admin) {
        res.status(200).json({ message: 'Admin account deleted successfully' });
    } else {
        res.status(404);
        throw new Error('Admin account not found');
    }
});

module.exports = {
  adminLogin,
  adminRegister,
  getData,
  getAdminById,
  getAllAdmins,
  deleteAdmin
}