import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});


/**
 * interceptors are special functions which will be executed before the request
 * is sent or after the response is received
 */
// here I'm telling axios to use the following interceptors BEFORE making the request
axiosClient.interceptors.request.use((config) => {
    console.log({ config });

    const token = localStorage.getItem('ACCESS_TOKEN') // get the token from localStorage

    config.headers.Authorization = `Bearer ${token}`
    return config;
})

axiosClient.interceptors.response.use((response) => { //onFulfilled when the promise is successful
    console.log({ response });

    return response;

}, (error) => { // onRejected when the promise is rejected
    console.log({ error });

    const {response} = error;

    if (response.status === 401)
    {
        localStorage.removeItem('ACCESS_TOKEN')
    }

    throw error;
})

export default axiosClient;
