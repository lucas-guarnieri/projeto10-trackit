import { React, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";
import { ThreeDots } from  'react-loader-spinner'

import UserContext from "../contexts/UserContext";
import Container from "../styles/ContainerForm";
import logo from "./../assets/logo.svg";


export default function Login(){
    
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const [disable, setDisable] = useState("");
    const navigate = useNavigate();

    const { setUser } = useContext(UserContext);
    
        function userLogin(event){
            event.preventDefault();
            setDisable("disable");
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login`,{
                email,
                password
            });
            
            promise.then(response => {
                console.log(response.data);
                setUser(response.data);
                navigate("/hoje");

            });
            
            promise.catch(() => {
                alert("Login Error");
                setDisable("");
            })
        }

    return(
        <Container>
            <img src={logo} alt="logo" />
            <p>TrackIt</p>
            <form onSubmit={userLogin}>
                <input 
                    type="email" 
                    placeholder="email" 
                    value={email} onChange={e => setEmail(e.target.value)}
                    disabled = {disable}
                />
		        <input 
                    type="password" 
                    placeholder="senha" 
                    value={password} onChange={e => setPassword(e.target.value)}
                    disabled = {disable} 
                />
                {disable === "" ? 
                    (<button type="submit">Login</button>) : 
                    (<button type="submit" className="button-disable"><ThreeDots color="#FFFFFF" heigth="60" width="60" /></button>)
                }
		        
            </form>
            <Link className="link" to="/cadastro">Não tem uma conta? Cadastre-se!</Link>
        </Container>
    );
}