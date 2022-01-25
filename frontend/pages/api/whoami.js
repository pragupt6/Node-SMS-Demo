import AuthContext from '@/context/AuthContext';
import { useContext } from 'react';
import axios from 'axios';
import * as configURL from '@/config/index';
export default async function (req, res) {
    try {
        const config2222 = {
            headers: {
                Authorization: `Bearer ${req.body.token}`
            },
        }
        const details = await axios.post(`${configURL.API_URL}/user/me`, { number: req.body.number }, config2222);
        res.status(200).send({ user: details.data, message: 'success' });
    }

    catch (error) {
        res.status(401).send({
            error: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
}