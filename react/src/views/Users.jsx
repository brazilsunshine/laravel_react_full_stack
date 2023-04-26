import React, {useEffect, useState} from 'react';
import axiosClient from "../axios-client.js";

export default function Users () {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {

        setLoading(true);

        axiosClient.get('/users')
        .then(response => {
            console.log('users', response);

            setLoading(false)
         })
        .catch(error => {
            console.log('users', error);

            setLoading(false);
        });
    }

    return (
        <div>
            Users
        </div>
    )
}

