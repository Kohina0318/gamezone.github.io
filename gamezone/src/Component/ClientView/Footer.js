import React,{useState,useEffect} from 'react'
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import { makeStyles } from '@material-ui/core/styles';
import { postData, getData, ServerURL } from "../FetchNodeServices";
import Divider from "@material-ui/core/Divider"
import Typography from '@material-ui/core/Typography';

import HouseIcon from '@material-ui/icons/House';
import PhoneEnabledIcon from '@material-ui/icons/PhoneEnabled';
import EmailIcon from '@material-ui/icons/Email';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';


const useStyles = makeStyles((theme) => ({
    root: {
  
      width:'97%', 
      backgroundColor:'#1e6b7b',
      color:'white',
      padding:20,  
      
    },

    subdiv:{
       padding:20,
       width:'100%',
       marginLeft:'10px',
       
    },

  }));


export default function Footer(props){

    const classes = useStyles();
    const [listCategory, setListCategory] = useState([]);
    
    const fetchAllCategory = async () => {
        var result = await getData("categories/displayall");
        setListCategory(result);
      };

      useEffect(function () {
        fetchAllCategory();
      }, []);

      const menuCategory = () => {
        return listCategory.map((item) => {
          return (
            <Grid item xs={12}>
              {item.categoryname}
            </Grid>
          );
        });
      };

    return(
      
        <div className={classes.root} >
                   
            <Grid container spacing={1} style={{display:'flex',justifyContent:'center'}}>

                <Grid item xs={12} sm={3}>
                    <Grid container spacing={2} className={classes.subdiv} >
                        <Grid item xs={12} fullWidth style={{fontWeight:'bold'}}>
                            MOST POPULAR CATEGORIES
                            </Grid> 
                       {menuCategory()}
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <Grid container spacing={2} className={classes.subdiv} >
                    <Grid item xs={12} >
                            <b>CUSTOMER SERVICES </b>
                            </Grid> 
                        <Grid item xs={12}>
                            Terms & Conditions
                        </Grid>
                        <Grid item xs={12}>
                            FAQ
                        </Grid>
                        <Grid item xs={12}>
                            About US
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={2}>
                   <Grid container spacing={2} className={classes.subdiv} >
                         <Grid item xs={12} >
                            <b>VISIT</b>
                         </Grid> 

                          <Grid item xs={12}>
                            Home
                          </Grid>

                          <Grid item xs={12}>
                            Blog
                          </Grid>

                          <Grid item xs={12}>
                            Offers
                          </Grid>


                    </Grid>
                </Grid>

                <Grid item xs={1} >
                  <Divider orientation='vertical' fullWidth style={{height:'100%',backgroundColor:'white'}} />
                </Grid>
             

                
                <Grid item xs={12} sm={3} >
                
                    <Grid container spacing={2} className={classes.subdiv}>
                    
                    <Grid item xs={12} fullWidth style={{fontWeight:'bold'}}>
                            CONTACT US
                         </Grid> 

                        <Grid item xs={12} style={{display:'flex',flexDirection:'center',alignItems:'center'}}>
                          <HouseIcon style={{marginRight:15}} />
                          Gwalior,M.P,India
                        </Grid>

                        <Grid item xs={12} style={{display:'flex',flexDirection:'center',alignItems:'center'}}>
                          <EmailIcon style={{marginRight:15}} />
                          <b>xxxx@gmail.com</b>
                        </Grid>

                        <Grid item xs={12} style={{display:'flex',flexDirection:'center',alignItems:'center'}}>
                          <PhoneEnabledIcon style={{marginRight:15,}} />
                          +0256-85621488
                        </Grid>
                           
                        <Grid item xs={12}>
                          GameZone is yours destination for new and used video games.
                          Rent video games online for your favorite systems including PS4, XBox 360, Wii U, 3DS and more..
                        </Grid>

                        <Grid item xs={12} style={{marginLeft:45, fontSize:15}}>
                       <b>Download App</b>
                        </Grid>
                      
                        <Grid item xs={12} sm={4}  style={{marginRight:20}}>
                          <img src="/ios_store.jpeg" ></img>
                        </Grid>
                        
                        <Grid item xs={12} sm={4}>
                          <img src="/play_store.jpeg" />
                        </Grid>
                        
                        
                    </Grid>
                </Grid>

            </Grid>

            <Grid item xs={12}  style={{display:'flex',flexDirection:'left',alignItems:'left'}}>

              <Grid  container spacing={1} style={{marginLeft:140}}>
              <Grid item xs={12} sm={2} style={{display:'flex',flexDirection:'center',alignItems:'center'}}>
              <VideogameAssetIcon style={{marginRight:10}} />
                 2500+ GAMES
              </Grid>
              <Grid item xs={12} sm={2} style={{display:'flex',flexDirection:'center',alignItems:'center'}}>
              <LocalShippingIcon style={{marginRight:10}} />
                 FREE SHIPPING
              </Grid>
              <Grid item xs={12} sm={2} style={{display:'flex',flexDirection:'center',alignItems:'center'}}>
              <SportsEsportsIcon style={{marginRight:1}} />
                 GENUINE PRODUCTS
              </Grid>
              </Grid>

            </Grid>


            
            <Divider style={{marginTop:10,marginBottom:5,backgroundColor:'white'}} />

          <Grid container spacing={2} >
            <Grid item xs={12} sm={8} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
              Best viewed on Microsoft Edge 81+,Mozilla FireFox 75+, Safari 5.1.1,Google Chrome 81+
            </Grid>
            <Grid item xs={12} sm={4}>
             Â© 2021 All rights reserved. The GameZone      
            </Grid>
          </Grid>
          
          
        </div>

        
    )
}