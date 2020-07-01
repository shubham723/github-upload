const getAdmin = require ('../usecases/admin/getAdmin');
const addAdmin = require ('../usecases/admin/addAdmin');
const passport = require('passport');
const User = require('../modal/admin');

var LocalStrategy = require('passport-local').Strategy;


// bcrpt for password
const bcrypt = require ('bcrypt'); 

// require jwt
const jwt = require ('jsonwebtoken');

//getadmin
exports.getAdmin = async(adminprops) => {
    let filter = {};
    if(adminprops.id) filter._id = adminprops.id;
    if(adminprops.username) filter.username = adminprops.username;
    let adminRecords = await getAdmin(filter);

    adminRecords = adminRecords.map(it=>{
        return {
            id:it._id,
            username:it.username,
            password:it.password
        }
    })
    
    return adminRecords;
} 

// addadmin
exports.addAdmin = async(admin) => {
    if (!admin.username) throw new error ('Name is required');
    if (!admin.password) throw new error ('Password is required');
    // hash password
    let hash = bcrypt.hashSync(admin.password,10);

    let  newAdmin = {
        username:admin.username,
        password:hash
    }
    let savedAdmin = await addAdmin(newAdmin);
    return savedAdmin;
}

//login admin
exports.loginAdmin = async(adminprops) => {
    let adminRecords = await getAdmin({username:adminprops.username})
    if (!adminRecords)
        return {Error:"Invalid username"}
    const password = await bcrypt.compare(adminprops.password, adminRecords[0].password);
    if(!password)
        return {Error:"Password Incorrect"}
    console.log(adminRecords)
    const token = jwt.sign(
        {
            id:adminRecords[0]._id,
            username:adminRecords[0].username
        },
        "shubham"
    );
    adminRecords = {
        token:token
    }
    return adminRecords;
}

// profile of admin
exports.profile = async(adminprops) => {
    console.log('7')
    //console.log(this.loginAdmin.adminRecords)
    let adminRecords = await getAdmin({_id:adminprops.id});
    
    console.log('1')
    if (adminRecords.length == 0){
        return {Error:'Invalid Id'}
    }
    console.log('*')
    adminRecords = adminRecords.map(it=>{
        return {
            id: it._id,
            username: it.username
        }
    })
    return adminRecords
}

// exports.log = async (passport) => {
//     passport.use(new LocalStrategy({
//     usernameField: 'username',
//     passwordField: 'password'
// },
//     (username, password, done) => {
//         user.findOne(({ username: username }),  async (err, user) => {
            
//         console.log(user)
//         if (err) { return done(err); }
//         if (!user) { return done(null, false); }
//         const cpassword = await bcrypt.compare(password, user.password);
//         if (!cpassword) { return done(null, false); }
//         const token = jwt.sign(
//             {
//                 id:user.id,
//                 username:user.username
//             },
//             "shubham"            
//         );
//         adminRecords = {
//             token:token
//         }
//         console.log(user)
//         return done(null, user, adminRecords);
        
//         //req.data = adminRecords
//         });
//     }
// ));
// }

// passport.serializeUser(function (user, done) {
// done(null, user)
// })

// passport.deserializeUser(function (id, done) {
// user.find(id, function (err, user) {
//     done(err, user)       
//     });
// }); 
