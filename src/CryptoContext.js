import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react'
import App from '../src/App'
import {auth, db} from "./firebase"

const Crypto = createContext({});

function CryptoContext({children}) {
    const [currency,setCurrency] = useState("INR");
    const [symbol,setSymbol] = useState('₹'); 
    const [user, setUser] = useState(null);
    const [watchlist,setWatchlist] = useState('')
    const [coins, setCoins] = useState([]);
     useEffect(()=> {
       if(user) {
        const coinRef = doc(db,"watchlist",user.uid);
        
        // to check wether the database is updated or not
       var unsubscribe =  onSnapshot(coinRef,coin=> {
          if(coin.exists()) {
            setWatchlist(coin.data().coins)
          } else {
            console.log("No items in watchlist");
          }
        })
        return() => {
          unsubscribe();
        }
       }
     },[user])

    useEffect(() => { 
       onAuthStateChanged(auth, user => {
         if(user) setUser(user);
         else setUser(null)
       })
    })

    useEffect(() => {
        if(currency === "INR") setSymbol("₹")
        else if (currency === "USD") setSymbol("$");
    },[currency]);


  return (
    <Crypto.Provider value={{currency,setCurrency,symbol,user,watchlist,coins,setCoins }}>
        {children}
    </Crypto.Provider>
  )
}

export default CryptoContext;


export const CryptoState = () => {
    return useContext(Crypto);
}