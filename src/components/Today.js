import { React, useState, useEffect, useContext } from "react";
import axios from "axios";
import styled from 'styled-components';
import dayjs from "dayjs";
import "dayjs/locale/pt";

import Top from "./Top";
import Menu from "./Menu";
import TodayHabit from "./TodayHabit";

import UserContext from '../contexts/UserContext';
import advancedFormat from "dayjs/plugin/advancedFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(advancedFormat);
dayjs.extend(localizedFormat);

export default function Today(){
    const [habitList, setHabitList] = useState([]);
    const [aux, setAux] = useState(true);

    const { user, setUser } = useContext(UserContext);

    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }
    
    useEffect(() => {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);

        promise.then(response => {
            setHabitList(response.data);
            console.log(response.data);
        });
        promise.catch(error => console.log(error.response));

    }, [aux]);
    
    return(
        <>
            <Top />
            <Container>
                <h2>{dayjs().locale("pt").format("ddd, DD/MM").charAt(0).toUpperCase()+
                    dayjs().locale("pt").format("ddd, DD/MM").slice(1)}
                </h2>

                {/* ADD VERIFICATION FOR EMPTY LIST */}

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

    .habit-list {
        margin-top: 28px;
    }
`