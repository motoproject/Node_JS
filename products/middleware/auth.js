const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        let token = req.header('Authorization').split(" ")[1];
        console.log("\n----token----"+ token);
        
        let decoded = jwt.verify(token, process.env.TOKEN_KEY);
        if(decoded){
            next();
        }else{
            return res.status(401).json({
                message: 'Authentication failed'
            });
        }

    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};