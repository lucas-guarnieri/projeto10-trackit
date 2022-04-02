import { useContext, React } from "react";
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

export default function Menu(){
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    return(
        <BottonBar>
            <Link className="menu-link" to="/habitos">Hábitos</Link>
            <Link to="/hoje">
            <CircularProgressbar
                className="progress-bar" 
                value="55" 
                text="Hoje"
                background
                backgroundPadding={6}
                styles={buildStyles({
                    backgroundColor: "#3e98c7",
                    textColor: "#fff",
                    pathColor: "#fff",
                    trailColor: "transparent",
                })}
            />
            </Link>
            
            <Link className="menu-link" to="/historico">Histórico</Link>
        </BottonBar>
    );
}

const BottonBar = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    position: fixed;
    bottom: 0px;
    left: 0px;
    align-items: center;
    justify-content: space-between;
    padding: 0 36px;
    background: #FFFFFF;
    color: #52B6FF;
    font-size: 18px;
    

    .menu-link {
        cursor: pointer;
        color: #52B6FF;
        font-size: 18px;
        text-decoration: none;
    }

    .progress-bar {
        width: 91px;
        height: 91px;
        margin-bottom: 40px;
    }
    
  
`;