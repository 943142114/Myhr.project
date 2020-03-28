var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var mongoose = require('mongoose')
var User = mongoose.model("users")
var keys = require('../config/keys')
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrkeytwo;

module.exports = passport =>{
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=> {
        User.findById(jwt_payload.id)
            .then(user =>{
                if (user){
                    return done(null,user)
                }
                return done(null,false)
            })
            .catch(err=> console.log(err))
    }));
}