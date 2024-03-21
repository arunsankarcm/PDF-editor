const jwt = require('jsonwebtoken');

exports.isAuthenticated = (req, res, next) => {
       
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

           
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.sendStatus(403);    
            }
 
            req.user = {
                _id: decoded.userId,    
                ...decoded    
            };

            next();    
        });
    } else {
        res.sendStatus(401);    
    }
};
