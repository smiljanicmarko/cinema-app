import TestAxios from "../apis/TestAxios"


export const login = async (username, password) => {
    const params = {
        username: username,
        password: password
    }

    try {
        const res = await TestAxios.post("/korisnici/auth", params)
        window.localStorage.setItem("jwt", res.data)
        window.location.replace("http://localhost:3000")
    } catch(e) {
        console.log(e)
        alert("Login nije uspeo")
    }
}

export const logout = () => {
    window.localStorage.removeItem("jwt")
    window.location.replace("http://localhost:3000")
}