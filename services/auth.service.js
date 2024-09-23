import axios from "axios";

const login = (data, callback) => {
    return(
        axios.post("https://fakestoreapi.com/auth/login", data)
        .then((res) => callback(true, res.data.token))
        .catch((error) => callback(false, error))
    )
}

export default login;