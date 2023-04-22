import {
  Container,
  createTheme,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  ThemeProvider
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { React, useEffect, useState } from "react";

import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import {useNavigate} from 'react-router-dom';
import { numberWithCommas } from "./Carousel";
import { Pagination } from "@material-ui/lab";


const useStyle = makeStyles(()=> ({
  row:{
    backgroundColor: '#16171a',
    cursor: 'pointer',
    '&:hover' : {
      backgroundColor: '#131111'
    }
  },
  pagination: {
    "& .MuiPaginationItem-root" : {
      color: 'gold'
    }
  }
})); 


function CoinTable() {
  
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setpage] = useState(1);
  let { currency,symbol,coins,setCoins } = CryptoState();
  const fetchCoins = async () => {
    const { data } = await axios.get(CoinList(currency));
    // console.log(data);
    setCoins(data);
    setLoading(false);
  };
  const history = useNavigate();
  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const handleSearch = () => {
    //  console.log(search[search.length-1]);
    if(search[search.length-1] === " ") setSearch(search.substring(1)) 
      return coins.filter((coin) => (
          coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
      ))
  }

 
  const classes = useStyle();
  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{
            margin: 18,
          }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search here for crypto currnecy.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress
              style={{ backgroundColor: "gold" }}
            ></LinearProgress>
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                      }}
                      key={head}
                      align={head === "coin" ? "" : "right"}
                      // this gives coin more space than others
                    >{head}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>{search !== "" ? null: handleSearch().slice((page-1)*10,(page-1)*10 + 10).map(row=>{
                  const profit = row.price_change_percentage_24h > 0;

                  return (
                      <TableRow onClick = {() => history(`/coins/${row.id}`)}
                      className={classes.row} 
                      key={row.name}
                    
                      >
                          <TableCell component='th' style={{
                              display:'flex',
                              gap: 15,
                          }}>
                              <img src={row?.image} alt={row.name} height='50' style={{marginBottom: 10 }}/>
                              <div style={{display: 'flex',flexDirection: 'column',color: 'white' }}>
                                  <span style ={{
                                      textTransform : 'uppercase',
                                      fontSize: 18,
                                      color: 'white'
                                  }}>
                                      {row.symbol}
                                  </span>
                                  <span style = {{color: 'darkgrey'}}>{row.name}</span>
                              </div>
                          </TableCell>
                          <TableCell align='right'   style={{color:'white'}}>{symbol} {" "} {numberWithCommas(row.current_price.toFixed(2))}</TableCell>
                          <TableCell align="right" style={{
                            color: profit>0 ? "rgb(14,203,129)" : "red",
                            fontWeight:500,
                          }}> {row.price_change_percentage_24h.toFixed(2)}</TableCell>
                          <TableCell align="right"   style={{color:'white'}}>{symbol}{" "}
                          { numberWithCommas(
                            row.market_cap.toString()
                          )}
                          </TableCell>
                      </TableRow>
                  )
              })}</TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination number={(handleSearch()?.length/10).toFixed(0)}
        style={{
          padding: 20,
          width:'100%',
          display: 'flex',
          justifyContent:'center',
        }}
        classes={{ul:classes.pagination}}
        onChange={(_,value) => {
          setpage(value);
          window.scroll(0,450);
        }}
        ></Pagination>
      </Container>
    </ThemeProvider>
  );
}

export default CoinTable;
