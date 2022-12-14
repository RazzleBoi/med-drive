const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[0];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                res.status(401).json("Invalid token!");
                return;
            }
            req.user = user;
            next();
        });
    }
    else {
        res.status(401).json("You are not authenticated");
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log(req)
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next();
        }
        else {
            res.status(403).json("You are not allowed");
        }
    });
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log(req)
        if(req.user.isAdmin) {
            next();
        }
        else {
            res.status(403).json("You are not allowed");
        }
    });
}

const verifyTokenAndDoctor = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log(req.user)
        if(req.user.isDoctor) {
            next();
        }
        else {
            res.status(403).json("You are not allowed");
        }
    });
}



module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyTokenAndDoctor};