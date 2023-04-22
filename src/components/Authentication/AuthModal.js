import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { AppBar, Box, Button, Tab, Tabs } from '@material-ui/core';
import SignUp from './SignUp';
import Login from './Login';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    width: 400,
    color: 'white',
    borderRadius: 10,
  },
  google : {
    textAlign: 'center',
    padding : 24,
    paddingTop: 0,
    display: 'flex',
    flexDirection : "column",
    gap: 20,
    fontSize: 20
  }
}));

export default function AuthModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  
  const [value, setValue] = useState(0);
  const handleChange = (e,newValue) => {
   setValue(newValue);
  }
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
     signInWithPopup(auth,googleProvider).then(res => {
       alert(`Welcome ${res.user.email}`);
       handleClose();
     }).catch((error) => {
       alert(error.message.subString(10));
       return; 
     })
  }

  return (
    <div>
      <Button variant='contained' style = {{
          width: 85,
          height: 40,
          marginLeft:15,
          backgroundColor: "#EEBC1D"
      }} onClick= {handleOpen}>Login</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <AppBar position='static' style={{
              backgroundColor: 'transparent',
              color: 'white'
            }}>
              <Tabs value={value}
              onChange= {handleChange}
              variant='fullWidth'
              style={{
                borderRadius: 10
              }}
              >
                <Tab label='Login'>
                  tab 1
                </Tab>
                <Tab label = 'Sign Up'>
                  tab2
                </Tab>
              </Tabs>
            </AppBar>
            {value === 0 && <Login handleClose = { handleClose}/>}
            {value === 1 && <SignUp handleClose = {handleClose} />}

            <Box className={classes.google}>
              <span>OR</span>
                <GoogleButton 
                style={{width: "100%", outline: "none"}}
                onClick={signInWithGoogle} 
                />
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
