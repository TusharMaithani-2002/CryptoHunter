import { makeStyles, Typography, LinearProgress, Button } from '@material-ui/core';
import axios from 'axios';
import {React,useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
import CoinInfo from '../components/CoinInfo'
import ReactHtmlParser from 'react-html-parser'
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
// import numberWithCommas from '../components/Carousel'
// import LinearProgress from '@material-ui/core'

function CoinPage() {

  const {id} = useParams();
  const [coin, setCoin] = useState();

  const {currency,symbol,user,watchlist } = CryptoState(); 
  const fetchCoin = async() => {
   const {data} = await axios.get(SingleCoin(id));
   setCoin(data); 
  }



  useEffect(() => {
    fetchCoin();
  });


  function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
  }


  const useStyles =  makeStyles((theme) => ({
     container: {
       display: 'flex',
       [theme.breakpoints.down('md')] : {
         flexDirection: 'column',
         alignItems : 'center',
       },
     },
     sidebar : {
       width: '30%',
       [theme.breakpoints.down("md")] : {
         width:'100%',
       },
       display: 'flex',
       flexDirection: 'column',
       alignItems: 'center',
       marginTop: 25,
       borderRight: '2px solid grey',
       padding: 20
     },
     heading: {
       fontWeight: 'bold',
       marginBottom: 20
     },
     description: {
       width: '100%',
       padding: 25,
       paddingBottom:15,
       paddingTop: 0,
       textAlign:'justify'
     },
     marketData: {
       alignSelf: 'start',
       padding: 25,
       paddingTop: 10,
       width:'100%',

       // Making it responsive
       [theme.breakpoints.down('md')] : {
         display: 'flex',
         justifyContent: 'space-around',
       },
       [theme.breakpoints.down('sm')] : {
         flexDirection: 'column',
         alignItems: 'center',
       },
       [theme.breakpoints.down('xs')] : {
         alignItems: 'start',
       },
     }
  }))
 
  const inWatchList = watchlist.includes(coin?.id);
  const addToWatchlist = async () => {
    const coinRef = doc(db,"watchlist",user.uid);

    try {
    await setDoc(coinRef,
      {coins: watchlist?[...watchlist,coin.id] : [coin?.id]}
      
      )
      alert("Added to WatchList !")
    } catch (error) {
      alert(error.message.subString(10));
    }
  };

 const removeFromWatchList = async() => {
    const coinRef = doc(db,"watchlist",user.uid);

    try {
    await setDoc(coinRef,
      {coins: watchlist.filter((watch) => watch !== coin?.id)},
      {merge: true}
      
      )
      alert("Removed from WatchList !")
    } catch (error) {
      alert(error.message.subString(10));
    }
  }
  let classes = useStyles();
  if(!coin) return <LinearProgress style={{backgroundColor: 'gold'}} />
  // console.log(coin.market_data.market_cap);
  return  (
    <div className={classes.container}>
      <div className={classes.sidebar }>
        <img src={coin?.image.large} alt={coin?.name} 
        height='200' width='200'
        style = {{marginBottom: 20}}
        />
        <Typography
        variant='h3' className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant='subtitle1'>
         {ReactHtmlParser(coin?.description.en.split(". ")[0])}
        </Typography>
        <div className={classes.marketData}>
          <span style={{display:'flex'}}>
            <Typography variant='h5' className={classes.heading}>Rank:</Typography>
            &nbsp; &nbsp;
            <Typography variant='h5'>{coin?.market_cap_rank}</Typography> 
          </span>
          <span style={{display:'flex'}}>
            <Typography variant='h5' className={classes.heading}>Current Price:</Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' >{symbol}{" "}{numberWithCommas(coin.market_data.current_price[currency.toLowerCase()])}</Typography>
          </span>
          <span style={{display:'flex'}}>
            <Typography variant='h5' className={classes.heading}>Market Cap:</Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' >{symbol}{" "}{numberWithCommas(coin.market_data.market_cap[currency.toLowerCase()])}</Typography>
          </span>

          {user && (
            <Button variant='outlined' 
            style={{
              width: "100%",
              height: 40,
              backgroundColor: inWatchList ? "red": "#EEBC1D",
            }}
            onClick={inWatchList?removeFromWatchList:addToWatchlist}>{inWatchList?'Remove from Watchlist' :'Add to WatchList'}</Button>
          ) }
        </div>
      </div>
      <CoinInfo coin={coin}/>
    </div>
  )
}

export default CoinPage