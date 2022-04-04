import { React, useState, useEffect, useContext } from "react";
import axios from "axios";
import styled from 'styled-components';
import dayjs from "dayjs";
import "dayjs/locale/pt";

import Top from "./Top";
import Menu from "./Menu";
import TodayHabit from "./TodayHabit";

import UserContext from '../contexts/UserContext';
import PercentageContext from "../contexts/PercentageContext";
import advancedFormat from "dayjs/plugin/advancedFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(advancedFormat);
dayjs.extend(localizedFormat);

export default function Today(){
    const [habitList, setHabitList] = useState([]);
    const [dividend, setDividend] = useState(0);
    const [divisor, setDivisor] = useState(0);
    const [aux, setAux] = useState(true);

    const { user } = useContext(UserContext);
    const { percentage, setPercentage } = useContext(PercentageContext);

    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }
    
    useEffect(() => {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);

        promise.then(response => {
            setHabitList(response.data);
            setDivisor(response.data.length);
            setDividend(response.data.filter(isDone).length);
            setPercentage((response.data.filter(isDone).length/response.data.length).toFixed(2));

            console.log(response.data);
        });
        promise.catch(error => console.log(error.response));

    }, [aux]);

    function isDone(obj){
        return obj.done;
    }
    
    return(
        <>
            <Top />
            <Container>
                <h2>{dayjs().locale("pt").format("ddd, DD/MM").charAt(0).toUpperCase()+
                    dayjs().locale("pt").format("ddd, DD/MM").slice(1)}
                </h2>


                {habitList.length == 0 ? 
                    (<p className="nothing-done">Nenhum hábito concluído ainda</p>) : 
                    (<p className="something-done">{percentage*100}% dos hábitos concluídos</p>)
                }
                <div className="habit-list">
                    {habitList.map(e => <TodayHabit key={e.id} habit={e} aux={aux} setAux={setAux} />)}
                </div>
            </Container>
            <Menu />
        </>
    );
}

const Container = styled.div`
    
    margin: 98px 17px 70px 17px;

    h2 {
        font-size: 24px;
        line-height: 29px;
        color: #126BA5;
    }
    .nothing-done { 
        font-size: 18px;
        line-height: 22px;
        color: #BABABA;
    }

    .something-done {
        font-size: 18px;
        line-height: 22px;
        color: #8FC549;
    }

    .habit-list {
        margin-top: 28px;
    }
`