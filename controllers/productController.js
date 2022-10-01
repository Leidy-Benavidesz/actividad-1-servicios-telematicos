const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Product = mongoose.model('Product');

router.get('/', (req, res) => {
    res.render("product/addOrEdit", {
        viewTitle: "Insertar Producto"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var product = new Product();
    product.fullName = req.body.fullName;
    product.email = req.body.email;
    product.mobile = req.body.mobile;
    product.city = req.body.city;
    product.vendedor = req.body.vendedor;
    product.valor_factura = req.body.valor_factura;
    product.save((err, doc) => {
        if (!err)
            res.redirect('product/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("product/addOrEdit", {
                    viewTitle: "Inserte Producto",
                    product: req.body
                });
            }
            else
                console.log('Error durante inserción : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Product.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('product/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("product/addOrEdit", {
                    viewTitle: 'Update Product',
                    product: req.body
                });
            }
            else
                console.log('Error tratando de actualizar : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Product.find((err, docs) => {
        if (!err) {
            res.render("product/list", {
                list: docs
            });
        }
        else {
            console.log('Error consultando productos :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("product/addOrEdit", {
                viewTitle: "Actualizar Producto",
                product: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/product/list');
        }
        else { console.log('Error eliminando producto :' + err); }
    });
});

module.exports = router;