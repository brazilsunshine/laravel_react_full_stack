import React, {useRef, useState} from 'react';
import {Link} from "react-router-dom";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Login () {
    const emailRef = useRef();
    const passwordRef = useRef();

    const [errors, setErrors] = useState(null);

    const {setUser, setToken} = useStateContext()

    function onSubmit (e)
    {
        e.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        setErrors(null);

        axiosClient.post('/login', payload)
        .then(response => {
            console.log('signup', response);

            if (response.data.success)
            {
                alert('you are logged in')
                setUser(response.data.user)
                setToken(response.data.token)
            }

        })
        .catch(error => {
            console.log('signup-test', error);

            const response = error.response;

            if (response && response.status === 422)
            {
                if (response.data.errors)
                {
                    setErrors(response.data.errors);
                }
                else
                {
                    setErrors({
                        email: [response.data.message]
                    })
                }
            }
        });
    }


    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">
                        Login into your account
                    </h1>

                    {errors && // if errors exist
                        <div className="alert">
                            {Object.keys(errors).map(key =>( // it will loop over the keys of the errors object using
                                // the Object.keys() method and map each key to a <p> element with the error message as its content.
                                <p key={key}> {errors[key][0]} </p>
                                // The key prop is used to provide a unique identifier for each <p> element in the loop
                            ))}
                        </div>
                    }


                    <input ref={emailRef} type="email" placeholder="Email"/>
                    <input ref={passwordRef} type="password" placeholder="Password"/>
                    <button className="btn btn-block">
                        Login
                    </button>
                    <p className="message">
                        Not Registered? <Link to="/signup">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
