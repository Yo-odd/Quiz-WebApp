const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName:{
        type : String,
        required: [true, 'Username is required'],
        unique: [true,'User name already exist, try another combination ;)']
    },
    email:{
        type : String,
        required: [true, 'email is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: true
    },
    password:{
        type : String,
        required: [true, 'Password is required'],
    },
    role:{
        type : String,
    }
},{
    timestamps: true
});

module.exports = mongoose.model('user',userSchema);