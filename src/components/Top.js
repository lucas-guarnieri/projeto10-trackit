//import React from 'react';
import { useContext, React } from "react";
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';

export default function Top(){
    const { user } = useContext(UserContext);

    return(
        <Head>
            <p>TrackIt</p>
            {/* <p>{user.image}</p>  */}
            <img src={user.image} alt='user-image' />
        </Head>
    );
}

const Head = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    padding: 0 18px;
    align-items: center;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    font-family: 'Playball', cursive;
    font-size: 39px;
    color: #FFFFFF;

    img {
        width: 51px;
        height: 51px;
        border-radius: 98.5px;
    }
`;