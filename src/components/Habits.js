import { React, useState, useEffect, useContext } from "react";
import axios from "axios";
import styled from 'styled-components';

import Top from "./Top"
import Menu from "./Menu";

import UserContext from '../contexts/UserContext';


export default function Habits(){
    const { user, setUser } = useContext(UserContext); 

    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }
   
    return(
        <>
            <Top />
            <Menu />
        </>
    );
}