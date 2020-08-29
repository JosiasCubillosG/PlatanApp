import React from "react";
import "./styles/recoverpass.css";
import {Link} from "react-router-dom"
import {MdPhoneAndroid} from 'react-icons/md'


const Recover = (props) => {
    return(
        <div className="recover-container">
            <div className="recover">
                <h2>Recuperar Contraseña</h2>
                
                <div >
                    <a  href="https://api.whatsapp.com/send?phone=573186337855&text=Hola,%20quiero%20cambiar%20la%20contraseña." target="_blank" className="recover-btn">Solicitar recuperación</a>
                </div>

                <Link to="/" className="login-p">
                    Ya tengo una cuenta
                </Link>

                <Link to="/register" className="login-p">
                    Registrarse
                </Link>
            </div>
        </div>
    )
}

export default Recover;