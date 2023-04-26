import React, {useRef, useState} from 'react';
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";


export default function Signup () {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const [errors, setErrors] = useState(null);
    const {setUser, setToken} = useStateContext()

    function onSubmit (e) {
        e.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }

        console.log({payload});

        axiosClient.post('/signup', payload)
        .then(response => {
            console.log('signup', response);

            if (response.data.success)
            {
                alert('you created you account')
                setUser(response.data.user)
                setToken(response.data.token)
            }

         })
        .catch(error => {
            console.log('signup-test', error);

            const response = error.response;

            if (response && response.status === 422)
            {
                //console.log(error.data.errors);
                setErrors(response.data.errors);
            }
        });
    }


    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">
                        Signup for free
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

                    <input ref={nameRef} placeholder="Full Name"/>
                    <input ref={emailRef} type="email" placeholder="Email Address"/>
                    <input ref={passwordRef} type="password" placeholder="Password"/>
                    <input ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation"/>
                    <button className="btn btn-block">
                        Signup
                    </button>
                    <p className="message">
                        Already Registered? <Link to="/login">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

