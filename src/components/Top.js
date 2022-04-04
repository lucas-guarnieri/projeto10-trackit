import { useContext, React } from "react";
import UserContext from '../contexts/UserContext';

import styled from 'styled-components';
import bubble from "../assets/bubble.png";

export default function Top(){
    const { user } = useContext(UserContext);

    return(
        <Head>
            <p>TrackIt</p>
            <img src={user.image} />
            {user.name === "Doge" ? (<img className="easter-egg" src={bubble} /> ) : <img className="easter-egg none" src={bubble} /> }
        </Head>
    );
}

const Head = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 18px;
    position: fixed;
    top: 0px;
    left: 0px;
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

   .easter-egg{
       width: 100px;
       height: 50px;
       border-radius: 0px;
       position: fixed;
       top: 10px;
       right: 75px;
   }

   .none {
       display: none;
   }
`;