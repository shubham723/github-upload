const contactController = require('../../core/controller/contactController');

getContact = async (req,res,next) => {
    try {
        let contact = await contactController.getContact(req.body)
        req.data = contact
        next()
    }
    catch (e) {
        req.status = 400;
        next(e)
    }
}

addContact = async (req,res,next) => {
    try {
        let contact = await contactController.addContact(req.body)
        req.data = contact
        next()
    }
    catch (e) {
        req,status = 400;
        next(e)
    }
}

module.exports = {getContact,addContact}