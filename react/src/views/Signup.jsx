import React, {useRef} from 'react';
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";


export default function Signup () {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const {setUser, setToken} = useStateContext()

    function onSubmit (e) {
        e.preventDefault();

        const payload = {
            nameRef: nameRef.current.value,
            emailRef: emailRef.current.value,
            passwordRef: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }

        axiosClient.post('/signup', payload)
        .then(response => {
            console.log('signup', response);

            setUser(response.user)
            setToken(response.token)
         })
        .catch(error => {
            console.log('', error);
            // if (error)
            // {
            // }
        });
    }


    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">
                        Signup for free
                    </h1>
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
