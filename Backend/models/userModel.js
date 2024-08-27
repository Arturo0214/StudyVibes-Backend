const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
     name: {
        type: String,
         equired: [true, "Por favor ingresa tu nombre"]
     },
     middlename: {
        type: String,
        required: [true, "Por favor ingresa tu apellido"]
     },
     email: {
        type: String,
        required: [true, 'Indica tu email'],
        validate: {
          validator: function(value) {
            return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
          },
          message: 'Ingresa una dirección de correo electrónico válida'
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Por favor teclea una password'],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema)