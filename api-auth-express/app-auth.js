// auth.js
var passport = require("passport");  
var passportJWT = require("passport-jwt"); 
var config = require("./app-config");  
var strategyParams = {  
    secretOrKey: config.jwtSecret,
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken()
};
const jwt = require("jsonwebtoken");

module.exports = (function() {
    // The callback function in strategy is called whenever there's an authentication request
    // The request invokes the function returned by authentication() function
    // And typically we don't query and validate to the database anymore
    // Since it will defeat the purpose of JWT authentication
    var strategy = new passportJWT.Strategy(strategyParams, function(payload, verified) {
        return verified(null, payload);
    });
    passport.use(strategy);
    return {
        initialize: function() {
            // Initialize is called only once
            return passport.initialize();
        },
        authenticate: function() {
            // The authenticate() function will return a handler function
            return passport.authenticate("jwt", config.jwtSession);
        },
        // Synchronous function
        signToken: function(user){
            var payload = {
                iss: config.jwtIssuer,
                sub: {
                    id: user.id,
                    name: user.username
                },
                iat: Date.now(),
                exp: Date.now() + (config.jwtDuration * 1000)
            };
            return jwt.sign(payload, config.jwtSecret);
        }
    }
})();