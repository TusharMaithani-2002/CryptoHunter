import React from 'react'
import { AppBar,Container, createTheme, MenuItem, Select, Toolbar, Typography,ThemeProvider } from '@material-ui/core'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { CryptoState } from '../CryptoContext'
import AuthModal from './Authentication/AuthModal'
import UserSidebar from './Authentication/UserSidebar'


const Header = () => {
    const navigate = useNavigate();
    const darkTheme = createTheme({
        palette: {
            primary: {
                main:'#fff'
            },
            type: 'dark',
        },
    })



    const {currency,setCurrency,user} = CryptoState(); 
    console.log(currency);
  return (
      <ThemeProvider theme={darkTheme}>
    <AppBar color='transparent' position='static' style={{width: "100%",
     display: 'flex', flexDirection: 'row', justifyContent:'center'
     }}>
      <Container>
         <Toolbar >

             <Typography onClick = {() => navigate("/")} variant="h6"><Title>CryptoHunter</Title></Typography>
             <Select variant='outlined' style={{
                 width:100,
                 height: 40,
                 marginLeft: 50,
             }}
             value = {currency}
             onChange={(e) => setCurrency(e.target.value)}
             >
                 <MenuItem value={"USD"}>USD</MenuItem>
                 <MenuItem value={"INR"}>INR</MenuItem>
             </Select>
             &nbsp;&nbsp;&nbsp;
            { user ? < UserSidebar/> : <AuthModal />}
         </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  )
}

const Title = styled.div`
 flex:1;
 color:gold;
 font-weight: bold;
 cursor: pointer;
 display: flex;
 flex-direction: row;
 width:100%;
`;

export default Header