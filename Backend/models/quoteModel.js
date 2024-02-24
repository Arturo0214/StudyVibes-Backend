const mongoose = require('mongoose');

const quoteSchema = mongoose.Schema({
    taskType: {
      type: String,
      required: [true, 'Especifica el tipo de tarea']
    },
    studyArea: {
      type: String,
      enum: ['Área 1', 'Área 2', 'Área 3', 'Área 4'],
      required: [true, 'Especifica el area de estudios']
    },
    educationLevel: {
      type: String,
      enum: ["Licenciatura", "Maestría", "Otro"],
      required: [true, "Especifica tu nivel de estudios"]
    },
    taskTitle: {
      type: String,
      required: [true, 'El titulo de la tarea es necesario']
    },
    requirements: {
      text: {
        type: String
      },
      file: {
        type: Object
      }
    },
    length: {
      type: Number,
      required: [true, 'Por favor, ingresa la extensión del proyecto (cuartillas)'],
    },
    dueDate: {
      type: Date,
      required: [true, 'Indica la fecha de entrega']
    },
    email: {
        type: String,
        required: [true, 'Indica tu email'],
        validate: {
          validator: function(value) {
            return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
          },
          message: 'Ingresa una dirección de correo electrónico válida'
        }
      },
    whatsApp: {
      type: Number,
      required: [true, 'Indica tu número de WhatsApp']
    }


}, {
  timestamps: true,
});

module.exports = mongoose.model('Quote', quoteSchema)