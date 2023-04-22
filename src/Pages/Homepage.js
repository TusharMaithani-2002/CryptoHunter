import React from 'react'
import styled from "styled-components"
import Banner from '../components/Banner';
import CoinTable from '../components/CoinTable';


function Homepage() {
  return (
    <Container>
        <Banner/>
        <CoinTable />
    </Container>
  )
}
const Container = styled.div`
 color:white;
`;
export default Homepage