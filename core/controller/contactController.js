const getContact = require ('../usecases/contact/getContact');
const addContact = require ('../usecases/contact/addContact');

// get contact details
exports.getContact = async() => {
     
    let contactRecords = await getContact();    
    
    //console.log(contactRecords.userid)
    contactRecords = contactRecords.map(it => {
        return{
            id:it._id,
            name:it.name,
            email:it.email,
            phone:it.phone,
            user:it.userid,
            blog:it.blogid,
            message:it.message
        }
    })
    return contactRecords;
}

// add contact details
exports.addContact = async (contact) => {
    if (!contact.name) throw new error ('Name is required');
    if (!contact.email) throw new error ('Email is required');
    if (!contact.phone) throw new error ('Phone is required');
    if (!contact.message) throw new error ('Message is required');

    let newContact = {
        name:contact.name,
        email:contact.email,
        phone:contact.phone,
        userid:contact.userid,
        blogid:contact.blogid,
        message:contact.message
    }
    let savedContact = await addContact(newContact)
    return savedContact;
}