import moongose from 'mongoose';
import jwt from 'jsonwebtoken';
const userSchema = new moongose.Schema({
    number: {
        type: Number,
        required: true,
    }
},
    {
        timestamps: true,
    });

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id,
        number: this.number,
    }, process.env.JWT_KEY);
    return token;
}
const User = moongose.model('User', userSchema);
// module.exports.User = moongose.model('User', userSchema);
export default User;

//export default moongose.model('User', userSchema);