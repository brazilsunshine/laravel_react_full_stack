import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function UserForm () {
    const navigate = useNavigate();
    const { id } = useParams(); // allows you to access and extract dynamic parameters from the URL of the current page or component
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const { setNotification } = useStateContext();
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    /**
     * get User by id
     */
    if (id)
    {
        useEffect(() => {
            setLoading(true)

            axiosClient.get(`/users/${id}`)
            .then(response => {
                console.log('', response);

                if (response.status === 200)
                {
                    setLoading(false)

                    setUser(response.data.data)
                }
             })
            .catch(error => {
                console.log('', error);

                setLoading(false)
            });

        }, [])
    }


    /**
     * onSubmit
     */
    const onSubmit = (e) => {
        e.preventDefault();

        if (user.id) // if the user exists update the existing one
        {
            axiosClient.put(`/users/${user.id}`, user)
            .then(response => {
                console.log('onSubmit', response);

                if (response.status === 200)
                {
                    setNotification("User was successfully updated!");
                    navigate('/users')
                }
            })
            .catch(error => {
                console.log('onSubmit', error);

                const response = error.response;

                if (response && response.status === 422)
                {
                    //console.log(error.data.errors);
                    setErrors(response.data.errors);
                }
            });
        }
        else // or else create a new one
        {
            axiosClient.post(`/users/`, user)
            .then(response => {
                console.log('onSubmit', response);

                if (response.status === 201)
                {
                    setNotification("User was successfully updated!");
                    navigate('/users')
                }
            })
            .catch(error => {
                console.log('onSubmit', error);

                const response = error.response;

                if (response && response.status === 422)
                {
                    //console.log(error.data.errors);
                    setErrors(response.data.errors);
                }
            });
        }
    }

    return (
        <>
            {user.id &&
                <h1>Update User: {user.name}</h1>
            }

            {!user.id &&
                <h1>New User</h1>
            }

            <div className="card animated fadeInDown">
                {loading && (
                    <div className="text-center">Loading...</div>
                )}

                {errors && // if errors exist
                    <div className="alert">
                        {Object.keys(errors).map(key =>( // it will loop over the keys of the errors object using
                            // the Object.keys() method and map each key to a <p> element with the error message as its content.
                            <p key={key}> {errors[key][0]} </p>
                            // The key prop is used to provide a unique identifier for each <p> element in the loop
                        ))}
                    </div>
                }

                {!loading &&
                    <form onSubmit={onSubmit}>
                        <input
                            value={user.name}
                            onChange={e => setUser({...user, name: e.target.value})}
                            placeholder="Name"
                        />
                        <input
                            type="email"
                            value={user.email}
                            onChange={e => setUser({...user, email: e.target.value})}
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            onChange={e => setUser({...user, password: e.target.value})}
                            placeholder="Password"
                        />
                        <input
                            type="password"
                            onChange={e => setUser({...user, password_confirmation: e.target.value})}
                            placeholder="Password Confirmation"
                        />

                        <button className="btn">Save</button>
                    </form>
                }
            </div>
        </>
    )
}
