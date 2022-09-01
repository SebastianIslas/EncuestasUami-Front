import React from 'react'
import {Container, HeadBoard, 
    TitleWelcome, BoardOptions, 
    LimiterOption, GroupButtons, 
    BoxTable, ListLicenciaturas, 
    ButtonAddLicenciatura} from '../components/AdminHome/indexComponents.js';



export default function AdminHomePage() {
  return (
    <Container>
        <HeadBoard>
            <TitleWelcome />
            <BoardOptions>
                <LimiterOption />
                <GroupButtons />
            </BoardOptions>
        </HeadBoard>
        <BoxTable>
            <ListLicenciaturas />
        </BoxTable>
        <ButtonAddLicenciatura />
    </Container>
  )
}
