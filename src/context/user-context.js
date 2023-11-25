import { useState, useEffect, createContext, useContext } from "react"
import { NotificationManager } from "react-notifications"
import BackendApi from "./client/index"

const UserContext = createContext({
    user: null,
    loginUser: () => { },
})

const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setIsAdmin(user && user.role === 'admin')
    }, [user])

    useEffect(() => {
        
        const userr =(window.localStorage.getItem("userrr"));
        if (userr){
            const userrrr=JSON.parse(userr)
            const username = userrrr.username
            BackendApi.user.getProfile(username).then(({ user }) => {
               setUser(user);
               
            }).catch((error)=>console.log(error));

        }
        
    }, [])

    const registerUser = async (username, password,checked) => {
        const { user, error } = await BackendApi.user.register(username, password,checked)
        if (error) {
            NotificationManager.error(error)
        } else {
            NotificationManager.success("Registered successfully","",1000)
           
            setUser(user)
            window.localStorage.setItem("userrr",JSON.stringify(user));
        }
    }

    const loginUser = async (username, password) => {
        const { user, error } = await BackendApi.user.login(username, password)
        if (error) {
            NotificationManager.error(error)
        } else {
            NotificationManager.success("Logged in successfully","",1000)
           
            setUser(user)
            window.localStorage.setItem("userrr",JSON.stringify(user));
        }
    }

    const logoutUser = () => {
        setUser(null)
        window.localStorage.removeItem("userrr");
    }

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser,registerUser, isAdmin }}>
            {children}
        </UserContext.Provider>
    )
}

export { useUser, UserProvider }