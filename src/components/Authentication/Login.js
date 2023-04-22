import { Box, Button, TextField } from '@material-ui/core';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React,{useState} from 'react'
import {auth} from '../../firebase'


function Login({handleClose}) {

    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    async function handleSubmit() {
        if(!email || !password) {
            alert("please fill all the fields")
            return;
        }

        try {
           const result = await signInWithEmailAndPassword(auth,email,password)
           alert(`Welcome ${result.user.email}`)
           handleClose();
        } catch (error) {
           alert(error.message.substring(10))
        }
    }
    return (
        <Box p={3} style={{
            display: 'flex',
            flexDirection: 'column',
            gap:' 20px'
           }}>
               <TextField variant='outlined'
               type='email'
               label='Enter Email'
               value={email}
               onChange= {(e) => {
                   setEmail(e.target.value);
               }}
               fullWidth
               ></TextField>
       
               <TextField  variant='outlined'
               type='password'
               label='Enter Password'
               onChange={(e) => {
                   setPassword(e.target.value);
               }}
               fullWidth
               />
       
               
               <Button variant='contained'
               size='large'
               style={{backgoundColor: '#EEBC1D'}}
               onClick={handleSubmit}
               >
                   Sign UP
       
               </Button>
           </Box>
    )
}

export default Login