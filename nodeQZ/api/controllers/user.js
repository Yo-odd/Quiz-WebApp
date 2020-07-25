const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// -------------Login mgt-----------------
generatePasswordHash = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function (err, hash) {
            if (err) {
                resolve(false);
            } else {
                // console.log('hash',hash);
                resolve(hash);
            }
        })
    })
}

validatePassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function (err, result) {
            if (err) {
                resolve(false);
            } else {
                resolve(result);
            }
        });
    })
}

generateToken = (user) => {
    const token = jwt.sign({
        data: {
            user: user.userName,
            _id: user._id
        }
    }, 'secret', { expiresIn: '3h' });
    return token;
}

router.verify_token = (async (req, res) => {
    try {
        const token = req.headers['authorization'];
        jwt.verify(token, 'secret', function (err, decoded) {
            if (err) {
                return res.json({
                    message: 'Unauthorized',
                    status: 401
                })
            } else {
                // const userData = await User.findById(userId);
                // console.log('decoded: ',decoded.data.user);
                res.json({
                    tokenData: decoded.data
                });
                // console.log(decoded.data);

                // }
                next()
            }
        });
    } catch (e) {

    }
})

router.login = (async (req, res) => {
    try {
        const user = await User.findOne({ userName: req.body.userName })
        if (!user) {
            return res.json({
                message: 'Invalid user name',
                status: 401
            })
        }
        const isPasswordMatched = await validatePassword(req.body.password, user.password);
        if (!isPasswordMatched) {
            return res.json({
                message: 'Invalid password',
                status: 401
            })
        }
        const token = generateToken(user);
        delete user._doc.password;
        res.json({
            message: 'User logged in successfully',
            status: 200,
            payload: {
                ...user._doc,
                token
            }
        })
    } catch (e) {
        console.log(e);
        res.json(e)
    }
})


// --------------------Add User ------------------------
router.addUser = (async (req, res) => {
    try {
        const passwordHash = await generatePasswordHash(req.body.password);
        const user = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: passwordHash
        })
        const result = await user.save()
        // res.json(result);
        res.json({
            message: 'User Registered in successfully',
            status: 201,
            payload: {
                ...result
            }
        });
    } catch (e) {
        if (e.code === 11000) {
            res.json({
                message: 'Duplicate record',
                status: 409,
                payload: {
                    ...e
                }
            })
        }
        console.log(e);
        res.json({
            message: 'Bad request',
            status: 400,
            payload: {
                ...e
            }
        })
    }
});


// --------------------Update User------------------------

router.updateUser = (async (req, res) => {
    try {
        const user = {
            current_userName: req.body.current_userName,
            new_userName: req.body.new_userName
        };
        const result = await User.findOneAndUpdate({
            userName: user.current_userName
        }, {
            userName: user.new_userName
        }, { new: true });
        res.json(result);
        // res.json(op);
    } catch (e) {
        console.log(e);
        res.json(e);
    }
});
// --------------------Update email------------------------

router.updatemail = (async (req, res) => {
    try {
        const user = {
            userName: req.body.userName,
            new_email: req.body.new_email
        };
        const result = await User.findOneAndUpdate({
            userName: user.userName
        }, {
            email: user.new_email
        }, { new: true });
        res.json(result);
        // res.json(op);
    } catch (e) {
        console.log(e);
        res.json(e);
    }
});
// --------------------Update password------------------------

router.updatepassword = (async (req, res) => {
    try {
        const user = {
            userName: req.body.userName,
            new_password: req.body.new_password
        };
        const result = await User.findOneAndUpdate({
            userName: user.userName
        }, {
            new_password: user.new_password
        }, { new: true });
        res.json(result);
        // res.json(op);
    } catch (e) {
        console.log(e);
        res.json(e);
    }
});


// --------------------Get User Details------------------------
router.getUserDetails = (async (req, res) => {
    try {
        const user = new User({
            userName: req.body.userName
        });
        const result = await User.find({
            userName: user.userName
        }).select('-password');

        res.json(result);
    } catch (e) {
        console.log(e);
        res.json(e);
    }
});
// --------------------Get User Details------------------------
router.getUserBasicDetails = (async (req, res) => {
    try {
        const user = new User({
            _id: req.body._id
        });
        const result = await User.find({
            _id: user._id
        }).select({ "_id": 1, "userName": 1});
        res.json(result);
    } catch (e) {
        console.log(e);
        res.json(e);
    }
});


// --------------------Get All User------------------------
router.getUser = (async (req, res) => {
    try {
        // console.log(req.body);
        const result = await User.find({

        }).select({ "_id": 1, "userName": 1});
        console.log(result);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.json(e);
    }
});
// --------------------Get All Admin------------------------
router.allAdmin = (async (req, res) => {
    try {
        console.log(req.body);
        const result = await User.find({
            role:'admin'
        }).select({ "_id": 1, "userName": 1,"email":1});
        console.log(result);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.json(e);
    }
});

//-----------------Delete User-----------------------
router.deleteUser = (async (req, res) => {
    try {
        const user = new User({
            userName: req.body.userName
        });
        const result = await User.deleteOne({
            userName: user.userName
        });
        res.json(result);
    } catch (e) {
        console.log(e);
        res.json(e);
    }
});


module.exports = router;