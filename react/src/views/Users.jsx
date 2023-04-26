import React, {useEffect, useState} from 'react';
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";

export default function Users () {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    /**
     * Mount Hook
     */
    useEffect(() => {
        getUsers();
    }, []);


    /**
     * onDelete
     */

    const onDelete = (user) =>
    {
        if (!window.confirm("Are you sure you want to delete this user?"))
        {
            return
        }

        axiosClient.delete(`/users/${user.id}`)
        .then(response => {
            console.log('onDelete', response);
            // todo show notification

            getUsers()
         })
        .catch(error => {
            console.log('onDelete', error);
        });
    }



    /**
     * getUsers
     */
    const getUsers = () => {

        setLoading(true);

        axiosClient.get('/users')
        .then(response => {
            console.log('users-test', response);

            setLoading(false)

            if (response.status === 200)
            {
               setUsers(response.data.data)
            }
         })
        .catch(error => {
            console.log('users', error);

            setLoading(false);
        });
    }



    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <h1>Users</h1>
                <Link to="/users/new" className="btn-add"> Add New </Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>CREATE DATE </th>
                            <th>ACTION</th>
                        </tr>
                    </thead>

                    {loading &&
                        <tbody>
                        <tr>
                            <td colSpan="5" className="text-center">
                                Loading...
                            </td>
                        </tr>
                        </tbody>
                    }

                    {!loading &&
                        <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.created_at}</td>
                                <td>
                                    <Link className="btn-edit" to={'/users/' + user.id}>Edit</Link>
                                    &nbsp;
                                    <button onClick={e => onDelete(user)} className="btn-delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    }
                </table>
            </div>
        </div>
    )
}

