const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/Users');



let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
	User.findOne({ _id : jwt_payload.id}, (err,user)=> {
		if (err) {
			return done(err, false);
		}
		console.log(user)
		if (user) {
			return done(null, user);
		} else {
			return done(null, false);
		}
	})
}))

module.exports = passport;