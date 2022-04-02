import { React, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";

import UserContext from "../contexts/UserContext";
import Container from "../styles/ContainerForm";
import logo from "./../assets/logo.svg";


export default function Login(){
    
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { setUser } = useContext(UserContext);
    
        function userLogin(event){
            event.preventDefault();
            //fazer função lock button com load animation
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
                //fazer função liberar botao
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
                />
		        <input 
                    type="password" 
                    placeholder="senha" 
                    value={password} onChange={e => setPassword(e.target.value)} 
                />
		        <button type="submit">Login</button>
            </form>
            <Link className="link" to="/cadastro">Não tem uma conta? Cadastre-se!</Link>
        </Container>
    );
}