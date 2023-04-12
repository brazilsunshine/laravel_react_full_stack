import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function GuestLayout () {
    const { token } = useStateContext()

    // if the user is authenticated and if the user is trying to open pages
    // like login or signup (only for guests), the user will be redirected to home
    if (token)
    {
        return <Navigate to="/" />
    }

    return (
        <div>
            {/* When a route is matched, the Outlet component will render any child routes that are defined for that route. */}
            <Outlet />
        </div>
    )
}
