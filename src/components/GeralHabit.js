import { React, useState, useEffect, useContext } from "react";
import axios from "axios";
import styled from 'styled-components';

import UserContext from '../contexts/UserContext';
import Container from "../styles/ContainerForm";

export default function GeralHabit(props){
    const { habit, aux, setAux } = props;
    const { user } = useContext(UserContext);

    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }

    function deleteHabit(id){
        let text = "Tem certeza que gostaria de deletar esse hábito?";
        if (window.confirm(text) === true){
            const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, config);
            promise.then(response => console.log(response.data));
            promise.catch(error => console.log(error.response));
            setAux(!aux);
        }
    }
    return(
        <Habit>
            <div className="top">
                <p>{habit.name}</p>
                <ion-icon name="trash-outline" onClick={() => deleteHabit(habit.id)}></ion-icon>
            </div>
            <div className="week-days">
                {habit.days.includes(0) ? (<div className="week-day marked">D</div>) : (<div className="week-day">D</div>)}
                {habit.days.includes(1) ? (<div className="week-day marked">S</div>) : (<div className="week-day">S</div>)}
                {habit.days.includes(2) ? (<div className="week-day marked">T</div>) : (<div className="week-day">T</div>)}
                {habit.days.includes(3) ? (<div className="week-day marked">Q</div>) : (<div className="week-day">Q</div>)}
                {habit.days.includes(4) ? (<div className="week-day marked">Q</div>) : (<div className="week-day">Q</div>)}
                {habit.days.includes(5) ? (<div className="week-day marked">S</div>) : (<div className="week-day">S</div>)}
                {habit.days.includes(6) ? (<div className="week-day marked">S</div>) : (<div className="week-day">S</div>)}
            </div>
        </Habit>
    );
}

const Habit = styled.div`
    width: 340px;
    height: 91px;
    padding: 13px;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    font-size: 20px;
    line-height: 25px;
    color: #666666;
    background: #FFFFFF;
    border-radius: 5px;

    .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .week-days {
        display: flex;
        align-items: center;
        margin-top: 8px;
    }

    .week-day {
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 4px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-size: 20px;
        line-height: 25px;
        color: #DBDBDB;
   }

   .marked {
    background: #CFCFCF;
    border: 1px solid #CFCFCF;
    color: #FFFFFF;
   }

   

   
`
