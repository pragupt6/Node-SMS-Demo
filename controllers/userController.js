import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import OTPModel from '../models/otp.js';
import _ from 'lodash';
import axios from 'axios';
import cookie from 'cookie';
import otpGenerator from 'otp-generator';
import protect from '../middlewares/authMiddleware.js';
import cookieParser from 'cookie-parser';

const signUP = async (req, res) => {
    console.log('=============cookies=======================');
    console.log(req.headers);
    console.log('====================================');

    console.log(req.body.number);
    const user = await User.findOne({ number: req.body.number });
    const otp = otpGenerator.generate(4, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
    });
    console.log(otp);
    const number = req.body.number;
    console.log(number);

    const salt = await bcrypt.genSalt(9);
    const otphash = await bcrypt.hash(otp, salt);
    const Otp = await OTPModel.create({
        otp: otphash,
        number: number
    });
    const message = `Your OTP is ${otp}`;
    const url = `https://www.fast2sms.com/dev/bulkV2?authorization=vgeGqkuOZ4RJl3wsYQSFi8Hr21KUPDhVCWtpbENjI6zM05oB9XHYEsZl7ozWLJSTe1GrahcNKC0MuA8i&route=q&message=${message}&language=english&flash=0&numbers=${number}`;
    //await axios.get(url);
    return res.status(200).send({
        message: 'OTP sent successfully',
        otp: otphash
    });
    res.status(200).send('user created');
    //}
}

const verifyOTP = async (req, res) => {

    let token = '';
    let result = '';
    const rounds = 10;
    const otpHandler = await OTPModel.find({ number: req.body.number });
    if (otpHandler == null || otpHandler.length === 0) {
        return res.status(400).send('Your OTP is expired');
    }
    const rightOTP = otpHandler[otpHandler.length - 1];
    const existingUser = await User.findOne({ number: req.body.number });
    const validuser = await bcrypt.compare(req.body.otp, String(rightOTP.otp));

    if (rightOTP.number === Number(req.body.number) && validuser) {
        if (existingUser) {
            token = existingUser.generateAuthToken();
            result = await existingUser.save();
        }
        else {
            const user = new User({
                number: req.body.number,
            });
            token = user.generateAuthToken();
            result = await user.save();
        }
        const OTPDelete = await OTPModel.deleteMany({ number: rightOTP.number });
        return res.status(200).send({
            message: 'OTP verified successfully',
            token: token,
            user: {
                _id: result._id,
                number: result.number,

            },
            error: false,
        });
    } else {
        return res.status(400).send({
            message: 'OTP is not valid',
            error: true
        });
    }
}
const whoAmI = async (req, res) => {
    const existingUser = await User.findOne({ number: req.body.number });
    return res.status(200).send({ user: existingUser, message: 'controller called' });
}

const signOut = async (req, res) => {
    return res.status(200).send({ message: 'Logged out successful!' });
}

export { signUP, verifyOTP, whoAmI, signOut };