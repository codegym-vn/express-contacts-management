var express = require('express');
var router = express.Router();
var Contact = require('../models/Contact');

/* GET home page. Listing all contacts */
router.get('/', function(req, res, next) {
    Contact.find({}, function(err, contacts){
        res.render('index', { contacts: contacts });
    });
});

/* Show create contact form */
router.get('/new', function(req, res){
    res.render('new');
})

/* Create new contact */
router.post('/new', function(req, res){
    var contact = new Contact();
    contact.name = req.body.name;
    contact.phone = req.body.phone;
    contact.email = req.body.email;
    contact.created_at = Date.now();

    contact.save(function(err){
        if(err){
            res.render('error', {message: "Error creating contact", error: {status: 500}});
        } else {
            res.redirect('/');
        }
    });
});

/* Show delete contact form */
router.get('/delete/:id', function(req, res){
    Contact.findById(req.params.id, function(err, contact){
        if(contact){
            res.render('delete', {contact: contact});
        } else {
            res.render('error', {message: "Contact not found", error: {status: 404}});
        }
    });
});

/* Delete a contact */
router.post('/delete/:id', function(req, res){
    Contact.findById(req.params.id, function(err, contact){
        if(contact) {
            contact.remove(function(err2){
                if(err2) {
                    res.render('error', {message: "Error deleting contact", error: {status: 500}});
                } else {
                    res.redirect('/');
                }
            });
        } else {
            res.render('error', {message: "Contact not found", error: {status: 404}});
        }
    });
});

/* Show edit contact form */
router.get('/edit/:id', function(req, res){
    Contact.findById(req.params.id, function(err, contact){
        if(contact){
            res.render('edit', {contact: contact});
        } else {
            res.render('error', {message: "Contact not found", error: {status: 404}});
        }
    });
});

/* Update new contact */
router.post('/edit/:id', function(req, res){
    Contact.findById(req.params.id, function(err, contact){
        if(contact){
            contact.name = req.body.name;
            contact.phone = req.body.phone;
            contact.email = req.body.email;
            contact.save(function(err){
                if(err){
                    res.render('error', {message: "Error updating contact", error: {status: 500}});
                } else {
                    res.redirect('/');
                }
            });

        } else {
            res.render('error', {message: "Contact not found", error: {status: 404}});
        }
    });
});




module.exports = router;
