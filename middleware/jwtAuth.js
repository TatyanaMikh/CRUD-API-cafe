const jwt = require('jsonwebtoken');

const jwtAuth = async(req,res,next)=>{

    try {

        const token = req.cookies.token;
        console.log(token);

        if(!token) {
            throw new Error('no token provided');
        }

        const decode = await jwt.verify(token, process.env.JWT_SECRET);

        console.log(decode);


        next();

    } catch (error) {
        return res.status(401).json({
            message:"invalid token",
            error:error.message
        })
    }
};

module.exports = jwtAuth