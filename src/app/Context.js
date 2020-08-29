import React, {createContext, useState, Children} from 'react'
import Axios from 'axios'
import * as Subscription from '../subscription'
import { ToastContainer, toast } from 'react-toastify';
const Context = createContext()



const Provider = ({children}) => {
    const [isAuth, setIsAuth] = useState(()=>{
        return window.sessionStorage.getItem('user')
    })
    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [currentUser, setCurrentUser] = useState(() => {
        let currentSession = JSON.parse(window.sessionStorage.getItem('user')) || {} 
        return currentSession.user
    })


    const val =  {
        isAuth,
        email,
        password,
        currentUser,
        changeEmail: (e) => {
            setEmail(e.target.value)
        } ,
        changePassword: (e) => {
            setpassword(e.target.value)
        },
        removeAuth: () =>{
            Subscription.subscribeUser(false);
            setIsAuth(!isAuth)
            window.sessionStorage.removeItem('user')
        },
        submit: (e) => {
            e.preventDefault()
            Axios('/api/users/login',{
                method: 'POST',
                data: {email, password}
            })
            .then(res => { 
                if(res.data.status === "success") {
                    setIsAuth(!isAuth)
                    setEmail("")
                    setpassword("")
                    setCurrentUser(res.data.user)
                    Subscription.subscribeUser(true);
                    window.sessionStorage.setItem('user',JSON.stringify(res.data))
                }else{
                    toast.error('Hubo un error iniciando sesión',{position: toast.POSITION.TOP_CENTER})
                    const error = new Error(res.error)
                    throw error
                }
            })
            .catch(err => {
                toast.error('Hubo un error iniciando sesión',{position: toast.POSITION.TOP_CENTER})
            });
        }
    }

    return (
        <Context.Provider value={val} >
            {children}
        </Context.Provider>
    )
}

export default {
    Provider,
    Consumer: Context.Consumer
}