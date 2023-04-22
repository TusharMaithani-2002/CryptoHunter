import React from "react";
import { BrowserRouter, Route,Routes } from "react-router-dom";
import "./App.css";
import styled from "styled-components";
import Header from "./components/Header";
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";
import Alert from "./components/Alert";


function App() {
  return (
    <BrowserRouter>
      <Container>
       <Header />
       <Routes>
         <Route exact path="/" element={<Homepage />}/>
         <Route  path="/coins/:id" element={<CoinPage />}/>
       </Routes>
      </Container>
      {/* <Alert /> */}
    </BrowserRouter>
  );
}

const Container = styled.div`
 background-color: #14161a;
 color : white;
 min-height:100vh;
`;

export default App;
