import { React, useState, useEffect, useContext } from "react";
import axios from "axios";
import styled from 'styled-components';

import UserContext from '../contexts/UserContext';

export default function TodayHabit(props){
    const { habit } = props;
    const { user } = useContext(UserContext);

    const [done, setDone] = useState(habit.done);
    const [currentSeq, setCurrentSeq] = useState(habit.currentSequence);
    const [recordtSeq, setrecordtSeq] = useState(habit.highestSequence);
    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }
    
    const id = habit.id
//id, name, done, currentSequence, highestSequence

    function toggleHabit(){
        if (done){
            console.log("desmarcando");
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,"", config);
            promise.then(res=>{
                console.log(res.data);
                setDone(false);
            });
            promise.catch(error=>console.log(error.data));
        }else{
            console.log("marcando");
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,"", config);
            promise.then(res=>{
                console.log(res.data);
                setDone(true);
            });
            promise.catch(error=>console.log(error.data));
        }
        setCurrentSeq(habit.currentSequence);
        setrecordtSeq(habit.highestSequence);
    }
    
    return(
        <Habit colorDone = {done ? ("#8FC549") : ("#E7E7E7")} 
            colorSeq = {done ? ("#8FC549") : ("#666666")}
            colorRec = {recordtSeq > 0 ? (currentSeq >= recordtSeq ? ("#8FC549") : ("#666666")) : ("#666666")}
        >
            <div className="habit-infos">
                <h1>{habit.name}</h1>
                <p>Sequência atual: <b className="actual-seq">{currentSeq}</b></p>
                <p>Recorde: <b className="record-seq">{recordtSeq}</b></p>
            </div>
            <ion-icon onClick={toggleHabit} name="checkbox"></ion-icon>
        </Habit>
    );
}

const Habit = styled.div`
    width: 340px;
    height: 94px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #FFFFFF;
    border-radius: 5px;

    h1{
        font-size: 20px;
        line-height: 25px;
        color: #666666;
    }

    p{
        font-size: 13px;
        line-height: 16px;
        color: #666666;
    }

    .actual-seq {
        font-weight: 400;
        color: ${props => props.colorSeq};
    }

    .record-seq {
        font-weight: 400;
        color: ${props => props.colorRec};
    }

    ion-icon{
        width: 69px;
        height: 69px;
        color: ${props => props.colorDone};
    }
`