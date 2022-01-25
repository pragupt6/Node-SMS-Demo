import moongose from 'mongoose';

const otpSchema = moongose.Schema({
    number: {
        type: Number,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    }
},
    { timestamps: true }
);
const OTPModel = moongose.model('OTP', otpSchema);
export default OTPModel;
// module.exports.OTPmodel = moongose.model('OTP', otpSchema);
