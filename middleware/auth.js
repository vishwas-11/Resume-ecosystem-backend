const jwt = require('jsonwebtoken');

// This function is our middleware.
// It will be placed before the route handler on any route we want to protect.
module.exports = function(req, res, next) {
    // 1. Get token from the request header
    const token = req.header('x-auth-token');

    // 2. Check if no token is present
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // 3. If a token is found, verify it
    try {
        // jwt.verify() decodes the token. If it's valid, the original payload is returned.
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // We attached the user object (containing the id) to the payload when we created the token.
        // Now, we attach that decoded user object to the request object.
        req.user = decoded.user;
        
        // 'next()' passes control to the next function in the chain (the actual route handler).
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
