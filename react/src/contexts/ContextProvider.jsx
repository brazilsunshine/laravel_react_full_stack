import {createContext, useContext, useState} from "react";


/**
 * createContext function is used to create a new context object.
 * A context object allows data to be passed down from a parent component to its descendants,
 * without the need to pass the data through each level of the component tree explicitly
 */
const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {}, // setUser to be a function
    setToken: () => {}, // setToken to be function
});

/**
 * BASED ON WHETHER THE TOKEN IS AVAILABLE OR NOT, WE NEED TO
 * EITHER RENDER THE DefaultLayout.jsx OR THE GuestLayout.jsx WITH
 * THE CORRESPONDING PAGES
 */

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({
        name: 'John Doe',
    });
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    // get the token from localStorage so the user will still be logged in after refresh the page

    const setToken = (token) => {
        _setToken(token)

        if (token)
        {
            localStorage.setItem('ACCESS_TOKEN', token);
            // saving the token in the localStorage so whenever the user is authenticated,
            // even after refreshing the page the user will remain as
            // an authenticated user
        }
        else
        {
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }

    return (
        <StateContext.Provider
            value={{
                user,
                token,
                setUser,
                setToken,
            }}
        >
            { children }
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)

