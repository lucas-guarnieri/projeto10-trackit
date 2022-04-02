import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Container from "../styles/ContainerForm";
import logo from "./../assets/logo.svg";

export default function SingUp(){
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [urlPic, setUrlPic] = useState("");
    
        function registerUser(event){
            event.preventDefault();
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up`, {
                email: email,
                name: name,
                image: urlPic,
                password: password
            });

            promise.then((response) => {
                console.log(response.data);
                window.location = "/";
            });

            promise.catch(error => {
                console.log(error.response);
            });
        }
    
    return(
        <Container>
            <img src={logo} alt="logo" />
            <p>TrackIt</p>
            <form onSubmit={registerUser}>
                <input 
                    type="email" 
                    placeholder="email" 
                    value={email}  
                    onChange={e => setEmail(e.target.value)}
                />
		        <input 
                    type="password" 
                    placeholder="senha" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                />
                <input 
                    type="text" 
                    placeholder="nome" 
                    value={name} 
                    onChange={e => setName(e.target.value)}
                />
                <input 
                    type="url" 
                    placeholder="foto" 
                    value={urlPic} 
                    onChange={e => setUrlPic(e.target.value)}
                />
		        <button type="submit">Cadastrar</button>
            </form>
            <Link className="link" to="/">Já tem uma conta? Faça login!</Link>
        </Container>
    );
}