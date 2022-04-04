import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import UserContext from "../contexts/UserContext";
import PercentageContext from "../contexts/PercentageContext";
import GlobalStyle from "../styles/GlobalStyles";
import Login from "./Login"
import SingUp from "./SingUp";
import Habits from "./Habits"
import Today from "./Today"
import Historic from "./Historic";


export default function App(){
    const [user, setUser] = useState(null);
    const [percentage, setPercentage] = useState([0,0]); 

    return(
        <PercentageContext.Provider value={{percentage, setPercentage}}>
            <UserContext.Provider value={{ user, setUser }}>
                <BrowserRouter>
                    <GlobalStyle />
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/cadastro" element={<SingUp />} />
                        <Route path="/habitos" element={<Habits />} />
                        <Route path="/hoje" element={<Today />} />
                        <Route path="/historico" element={<Historic />} />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </PercentageContext.Provider>
    );
}