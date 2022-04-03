    import Top from "./Top"
    import Menu from "./Menu";
    import styled from 'styled-components'

    export default function Historic(){
        return(
            <>
                <Top />
                <Container>
                    <h1>Histórico</h1>
                    <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
                
                </Container>
                <Menu />
            </>
        );
    }

    const Container = styled.div`
        margin: 98px 17px 70px 17px;

        h1 {
            font-size: 23px;
            line-height: 29px;
            margin-bottom: 17px;
            color: #126BA5;
        }

        p {
            font-size: 18px;
            line-height: 22px;
            color: #666666;
        }
    `