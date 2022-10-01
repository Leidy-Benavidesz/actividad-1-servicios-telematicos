const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Requerido'
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    city: {
        type: String
    },
    vendedor: {
        type: String
    },
    valor_factura: {
        type: String
    }
});

// Custom validation for email
productSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'E-mail invalido.');

mongoose.model('Product', productSchema);