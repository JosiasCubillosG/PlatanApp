import React, {useEffect} from "react";
import "./styles/login.css";
import {Link, withRouter, Redirect} from "react-router-dom"
import Context from '../Context'
import {FaUserAlt} from 'react-icons/fa'
import {MdEmail} from 'react-icons/md'
import {RiLockPasswordLine} from 'react-icons/ri'
import Axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';


class Register extends React.Component {

    
    state = {
        email:"",
        password: "",
        name: ""
    }

    changeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    changePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    changeName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    submitRegister = (e) => {
        e.preventDefault()
        Axios('/api/users/signup',{
            method: 'POST',
            data: {...this.state}
        })
        .then(res => { 
            console.log(res)
            if(res.data.status === "success") {
                toast.success('Registro realizado con exito',{position: toast.POSITION.TOP_CENTER, autoClose:2000})
                setTimeout(() =>{
                    this.props.history.push({
                        pathname: '/'
                    })
                },2000)
            }else{
                toast.error('Hubo un error en el registro',{position: toast.POSITION.TOP_CENTER})
                const error = new Error(res.error)
                throw error
            }
        })
        .catch(err => {
            toast.error('Hubo un error en el registro',{position: toast.POSITION.TOP_CENTER})
        });
    }


    render(){
        return(
            <div className="login-container-register">
                <div className="register">
                    <h2>REGISTRO</h2>
                    <form className="login-form" onSubmit={this.submitRegister}>
                        <div className="group-email">
                            <div className="group-email-icon">
                                <FaUserAlt className="login-icon" />
                            </div>
                            
                            <div className="group-email-input">
                                <input className="login-email" onChange={this.changeName}  value={this.state.name} type="text"  name="nombre" placeholder="Nombre" required></input>
                            </div>      
                            
                        </div>


                        <div className="group-email">
                            <div className="group-email-icon">
                                <MdEmail className="login-icon" />
                            </div>
                            
                            <div className="group-email-input">
                                <input className="login-email" onChange={this.changeEmail}  value={this.state.email} type="email"  name="email" placeholder="Correo" required></input>
                            </div>      
                            
                        </div>
                        
                        <div className="group-password">
                            <div className="group-password-icon">
                                <RiLockPasswordLine className="password-icon" />
                            </div>
                            <div className="group-password-input">
                                <input className="login-password" onChange={this.changePassword} value={this.state.password} type="password"  name="password" placeholder="Contraseña" required></input>                      
                            </div>       
                        </div>
                        
                        
                        <button type="submit" value="Submit" className="login-btn">Registrarse</button>
                        
                        <Link to="/" className="login-p">
                            Ya tengo una cuenta
                        </Link>
                    </form>
                </div>
                <ToastContainer />
            </div>
        )
    }
}

export default Register;