const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Quiz = require('../models/quiz');

module.exports.validateToken = ((req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.json({
            message: 'Unauthorized',
            status: 401
        })
    }
    jwt.verify(token, 'secret', function (err, decoded) {
        if (err) {
            return res.json({
                message: 'Unauthorized',
                status: 401
            })
        } else {
            // const userData = await User.findById(userId);
            // console.log('decoded: ',decoded.data.user);

            // if (req.body.creator || req.body.userName ) {
                // console.log(decoded.data);
                req.body.userName = decoded.data.user;
                req.body.creator = decoded.data._id;
                // console.log('(auth)creator: ',req.body.creator); 

            // }
            next()
        }
    });
})