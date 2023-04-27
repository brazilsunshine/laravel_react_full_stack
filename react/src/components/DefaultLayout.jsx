import React, {useEffect} from 'react';
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.js";

export default function DefaultLayout () {
    const { user, token, notification, setUser, setToken } = useStateContext()

    // if there's no token the user is not authenticated and the user is trying to access a page
    // only for authenticated users
    if (!token)
    {
        return <Navigate to="/login" />
    }

    function onLogout (e)
    {
        e.preventDefault()

        axiosClient.post('/logout')
        .then(response => {
            console.log('logout', response);

            if (response.status === 200)
            {
                setUser({})
                setToken(null)
            }
         })
        .catch(error => {
            console.log('logout', error);
        });
    }

    useEffect (() =>
    {
        axiosClient.get('/user')
        .then(response => {
            console.log('user', response);

            if (response.status === 200)
            {
                setUser(response.data);
            }

         })
        .catch(error => {
            console.log('', error);
        });
    }, [])

    /**
     * JSX
     */
    return (
        <div id="defaultLayout">

            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>

            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        { user.name }
                        <a
                            href="#"
                            onClick={onLogout}
                            className="btn-logout"
                        >
                            Logout
                        </a>
                    </div>
                </header>
            <main>
                {/* When a route is matched, the Outlet component will render any child routes that are defined for that route. */}
                <Outlet />
            </main>
            </div>

            {notification &&
                <div className="notification">
                    {notification}
                </div>
            }
        </div>
    )
}
