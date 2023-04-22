import { Box, Button, TextField } from '@material-ui/core';
import React,{useState} from 'react'
import { CryptoState } from '../../CryptoContext';
import {auth} from '../../firebase'
import {createUserWithEmailAndPassword} from '@firebase/auth'




function SignUp({handleClose}) {


    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    
    const {setAlert} = CryptoState();
    const handleSubmit = async () => {
      if(password !== confirmPassword) {

       const alert = document.getElementById("alert")
       alert.innerText = "Password do not match"
       return;
      }
      try{
        const result = await createUserWithEmailAndPassword(auth,email,password)
        
        alert("SignUp successful")
      console.log(result);
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

        <TextField variant='outlined'
        label='Confirm Password'
        type='password'
        onChange={(e)=>{
          setConfirmPassword(e.target.value);  
        }}
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

export default SignUp