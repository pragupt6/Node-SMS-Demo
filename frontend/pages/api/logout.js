import AuthContext from '@/context/AuthContext';
import { useContext } from 'react';

export default async function (req, res) {
    // const context = useContext(AuthContext);
    // const { user } = context;

    res.status(200).send(req.headers);
}
