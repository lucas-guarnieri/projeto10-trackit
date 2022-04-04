import { React, useState, useEffect, useContext } from "react";
import axios from "axios";
import styled from 'styled-components';
import { ThreeDots } from  'react-loader-spinner'

import Top from "./Top"
import Menu from "./Menu";
import GeralHabit from "./GeralHabit";

import UserContext from '../contexts/UserContext';

// ------------------------------------------------------------------------------------------------------

export default function Habits(){
    const [habitList, setHabitList] = useState([]);
    const [habitName, setHabitName] = useState("");
    const [sun, setSun] = useState(false);
    const [mon, setMon] = useState(false);
    const [tue, setTue] = useState(false);
    const [wed, setWed] = useState(false);
    const [thu, setThu] = useState(false);
    const [fri, setFri] = useState(false);
    const [sat, setSat] = useState(false);
    const [display, setDisplay] = useState("none");
    const [disable, setDisable] = useState("");
    const [aux, setAux] = useState(true);

    const { user, setUser } = useContext(UserContext);
    
    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }

    useEffect(() => {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);

        promise.then(response => {
            setHabitList(response.data);
            console.log(response.data);
        });
        promise.catch(error => console.log(error.response));

    }, [aux]);

    function changeDisplay(){
        if (display === "block"){
            setDisplay("none");
        }else{
            setDisplay("block");
        }
    }

    function addHabit(){
        const daysOfWeek = [];
        setDisable("disable");
        if (sun){
            daysOfWeek.push(0);
        }
        if (mon){
            daysOfWeek.push(1);
        }
        if (tue){
            daysOfWeek.push(2);
        }
        if (wed){
            daysOfWeek.push(3);
        }
        if (thu){
            daysOfWeek.push(4);
        }
        if (fri){
            daysOfWeek.push(5);
        }
        if (sat){
            daysOfWeek.push(6);
        }
        if (daysOfWeek.length === 0){
            alert("Escolha pelo menos um dia da semana");
            setDisable("");
        }
        if (habitName.length <= 2){
            alert("Nome deve ter mais de 2 letras!");
            setDisable("");
        }else{
            const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
            {
                name: habitName,
                days: daysOfWeek
            }, config
            );
            promise.then(res=>{
                console.log(res.data);
                setDisable("");
                cleanSlate();
                changeDisplay();
                setAux(!aux);
            });
            promise.catch(error=>{
                promise.catch(error=>console.log(error.data));
                alert("lamentamos, algo deu errado no nosso lado =(");
                setDisable("");
            })
        }
    }

    function cleanSlate(){
        setHabitName("");
        setSun(false);
        setMon(false);
        setTue(false);
        setWed(false);
        setThu(false);
        setFri(false);
        setSat(false);
    }

// ------------------------------------------------------------------------------------------------------

    return(
        <>
            <Top />
            <Container>
                <div className="mini-container">
                    <h1>Meus hábitos</h1>
                    <button onClick={changeDisplay}><ion-icon name="add-outline"></ion-icon></button>
                </div>
                <AddHabitBox display={display}>
                <form onSubmit={addHabit}>
                    <input 
                        type="text"
                        className="text" 
                        placeholder=" nome do hábito" 
                        value={habitName} 
                        onChange={e => setHabitName(e.target.value)}
                        disabled = {disable}
                    />
                    <div className="button-box">
                    <input 
                        type="button"
                        className={sun ? ("button clicked") : ("button")} 
                        value="D" 
                        onClick={() => setSun(!sun)}
                        disabled = {disable}
                    />
                    <input 
                        type="button" 
                        value="S"
                        className={mon ? ("button clicked") : ("button")}
                        onClick={() => setMon(!mon)}
                        disabled = {disable}
                    />
                    <input 
                        type="button"
                        className={tue ? ("button clicked") : ("button")} 
                        value="T"
                        onClick={() => setTue(!tue)}
                        disabled = {disable}
                    />
                    <input 
                        type="button"
                        className={wed ? ("button clicked") : ("button")} 
                        value="Q" 
                        onClick={() => setWed(!wed)}
                        disabled = {disable}
                    />
                    <input 
                        type="button"
                        className={thu ? ("button clicked") : ("button")} 
                        value="Q" 
                        onClick={() => setThu(!thu)}
                        disabled = {disable}
                    />
                    <input 
                        type="button" 
                        className={fri ? ("button clicked") : ("button")}
                        value="S" 
                        onClick={() => setFri(!fri)}
                        disabled = {disable}
                    />
                    <input 
                        type="button"
                        className={sat ? ("button clicked") : ("button")}
                        value="S"  
                        onClick={() => setSat(!sat)}
                        disabled = {disable}
                    />
                    </div>
                </form>
                <div className="button-box-botton">
                        <button className="botton-button" onClick={changeDisplay} disabled = {disable}>Cancelar</button>
                        {disable === "" ?
                         (<button className="botton-button right" onClick={addHabit} disabled = {disable}>Salvar</button>) : 
                         (<button className="botton-button right"  disabled = {disable}><ThreeDots color="#FFFFFF" heigth="60" width="60" /></button>)}
                    </div>
                </AddHabitBox>
                <div className="habit-list">
                    {habitList.length !== 0 ? (habitList.map(e => <GeralHabit key={e.id} habit={e} aux={aux} setAux={setAux}/>)) : (<p className="empty-list">Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>) }
                </div> 
            </Container>
            <Menu />
        </>
    );
}

// ------------------------------------------------------------------------------------------------------


const Container = styled.div`
    
    margin: 98px 17px 110px 17px;

    .mini-container {
        width: 340px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    h1 {
        font-size: 24px;
        line-height: 29px;
        color: #126BA5;
    }

    button {
        width: 40px;
        height: 35px;
        background: #52B6FF;
        border-style: none;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 27px;
        line-height: 34px;
        text-align: center;
        color: #FFFFFF;
    }

    .habit-list {
        margin-top: 28px;
    }

    .empty-list {
        margin-top: 28px;
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
    }
`
const AddHabitBox = styled.div`
    width: 340px;
    height: 180px;
    display: ${props => props.display};
    background: #FFFFFF;
    border-radius: 5px;

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    } 

    .text {
        width: 303px;
        height: 45px;
        margin-top: 18px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 5px;
        font-size: 20px;
        line-height: 25px;
        color: #DBDBDB;
    }

    .button-box {
        width: 302px;
        margin-top:8px;
    }

    .button {
        width: 30px;
        height: 30px;
        margin-right: 4px;
        background-color: #FFFFFF;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 5px;
        font-weight: 400;
        font-size: 20px;
        line-height: 25px;
        color: #DBDBDB;
    }

    .clicked {
        background-color: #CFCFCF;
        border: 1px solid #CFCFCF;
        color: #FFFFFF;
    }

    .button-box-botton {
        width: 322px;
        margin-top:29px;
        display: flex;
        justify-content: end;
        align-items: center;
    }

    .botton-button {
        width: 84px;
        height: 35px;
        background: #FFFFFF;
        border-radius: 5px;
        font-size: 16px;
        line-height: 20px;
        text-align: center;
        color: #52B6FF;
    }

    .right {
        background: #52B6FF;
        color: #FFFFFF;
        margin-left: 10px;
    }

    
`