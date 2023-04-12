import React from 'react';
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function DefaultLayout () {
    const { user, token } = useStateContext()

    // if there's no token the user is not authenticated and the user is trying to access a page
    // only for authenticated users
    if (!token)
    {
        return <Navigate to="/login" />
    }

    function onLogout (e)
    {
        e.preventDefault()
    }

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
        </div>
    )
}
