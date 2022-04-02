import styled from 'styled-components';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
	display: flex;
    flex-direction: column;
    align-items: center;
    
    img {
        width: 90px;
        height: 90px;
        color: #126BA5;
        margin-top: 68px; 
    }
    p {
        font-family: 'Playball', cursive;
        font-size:69px;
        color: #126BA5;
        margin-bottom: 30px;
    }
    form{
        display: flex;
        flex-direction: column;
    } 
    input {
        width: 303px;
        height: 45px;
        margin-top: 5px;
        padding: 0 11px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 5px;
        font-size: 19.976px;
        line-height: 25px;
        color:  #DBDBDB;
    }
    button {
        width: 303px;
        height: 45px;
        margin: 5px 0 25px 0;
        background: #52B6FF;
        border: none;
        border-radius: 5px;
        font-size: 21px;
        color: #FFFFFF;
    }
    .link {
        font-family: 'Lexend Deca';
        font-size: 14px;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;
        color: #52B6FF;
    }
`;

export default Container;