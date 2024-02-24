const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Teclea un nombre'],
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
    required: [true, 'Por favor teclea un password'],
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Admin', adminSchema);