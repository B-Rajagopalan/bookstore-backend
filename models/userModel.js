const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String
});

userSchema.pre('save', function(next) {
    var user = this;

    // mongoose checks whether the current password in db is changed. If its not, no need to rehash
    if(!user.isModified('password')) {
        return next();
    }

    bcrypt.hash(user.password, null, null, (err, hash) => {
        if(err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
})

module.exports = mongoose.model('User', userSchema);