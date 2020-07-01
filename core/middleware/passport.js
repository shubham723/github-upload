const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const user = require('../modal/admin');
const bcrypt = require('bcrypt');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
// var opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretorkey = 'shubham';
const jwt = require('jsonwebtoken');

// const cookieExtractor = (req) => {
//     let token = null;
//     if (req && req.headers)
//     {
//         token = req.headers['x-access-token'];
//     }
//     return token;
// };

// module.exports = (passport) => {
//     passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
//         user.findOne({id: jwt_payload.sub}, function(err, user) {
//             if (err) {
//                 return done(err, false);
//             }
//             if (user) {
//                 return done(null, user);
//             } else {
//                 return done(null, false);
//                 // or you could create a new account
//             }
//         });
//     }));
// }

module.exports = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
        (username, password, done) => {
            user.findOne(({ username: username }), async (err, user) => {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                const cpassword = await bcrypt.compare(password, user.password);
                if (!cpassword) { return done(null, false); }
                console.log(user._id)
                const token = jwt.sign(
                    {
                        id: user._id,
                        username: user.username
                    },
                    "shubham"
                );
                adminRecords = {
                    token: token
                }

                return done(null, user, adminRecords);
            });
        }
    ));
    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('jwt'),
        secretOrKey   : 'shubham'
    }, function(jwt_payload, done) {
        console.log('1')
        user.findOne({id: jwt_payload.sub}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
};

passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (id, done) {
    user.find(id, function (err, user) {
        done(err, user)
    });
}); 