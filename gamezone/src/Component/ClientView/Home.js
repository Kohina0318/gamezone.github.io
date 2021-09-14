import React, { useEffect,useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Header from "./Header";
import { getData,ServerURL } from "../FetchNodeServices";
import Divider from "@material-ui/core/Divider"
import Paper from "@material-ui/core/Paper"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Footer from "./Footer";

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from "@material-ui/core/IconButton"

const useStyles = makeStyles((theme) => ({
    root:{
        padding:10,
        display:'flex',
        flexDirection:'column'

    },
    paperstyle:{
        justifyContent:"flex-start",
        display:'flex',
        padding:10,
        width:215,
        height:310,
        margin:10,
        borderRadius:10,
        flexDirection:'column'
    },
    imageview:{
        width:160,
        height:160,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        margin:2,
        cursor:"pointer",
        '&:hover':{
            transform:"scale(1.25)",
            transition:"all 0.5s ease 0s"
        }
    },
    arrowstyle:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    }

}))

export default function Home(props) 
{
    const classes = useStyles();
    const [listCategory,setListCategory]=useState([])
    const [listSubOffers,setListSubOffers]=useState([])
    const [listGames,setListGames]=useState([])
    const [listConsole,setListConsole]=useState([])

 
    var settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
      };

      var itemsettings ={
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        arrows: false,
      }


    const fetchAllCategory=async()=>{
        var list=await getData('categories/displayall')
        setListCategory(list)

    }

    const showSlider=()=>{
        return listCategory.map((item)=>{
            return(
                <div >
                    <img src={`${ServerURL}/images/${item.ad}` } width="100%" height="400" />
                </div>
            )
        })
    }

    const handleConsoleList=(categoryid)=>{
        props.history.push({'pathname':'/consolelist'},{'categoryid':categoryid})
        
    }


    const showCategory=()=>{
        return listCategory.map((item)=>{
                return(
                    <div 
                    style={{
                        border:'1px solid #ecf0f1',
                        width:'98%', 
                        justifyContent:'center',
                        alignItems:'center',
                        display:'flex',
                        flexDirection:'column',
                        padding:10,
                        margin:5 }}
                        onClick={()=>handleConsoleList(item.categoryid)}
                    >
                        <img src={`${ServerURL}/images/${item.icon}` } width="50%" />
                        <div style={{fontSize:22,fontWeight:'bold',padding:10}} >
                            {item.categoryname.toUpperCase()}
                        </div>

                    </div>
                )
            })
    }

    const fetchAllSubcategoryOffers=async()=>{
        var list=await getData('subcategory/subcategoryoffers')
        setListSubOffers(list)
        

    }
    
    const showOffers=()=>{
        return listSubOffers.map((item)=>{
                return(
                    <div >

                        <Paper elevation={7} className={classes.paperstyle}>

                           <div className={classes.imageview}>
                              <img src={`${ServerURL}/images/${item.icon}` } width="150"  />
                           </div>

                           <div style={{fontSize:14,fontWeight:'bold',padding:10}} >
                               {item.subcategoryname.length<=20?item.subcategoryname.toUpperCase():item.subcategoryname.toUpperCase().substring(0,18)+".."}
                            </div>
                            <div style={{fontSize:16, padding:10}}>
                                Day Price: Price<s>&#8377; {item.rentamt}</s> <span><b>&#8377; {item.offer}</b></span>
                            </div>
                            <div style={{fontSize:16,padding:10}}>
                                <span style={{color:'green'}}><b> You Save </b></span> <b>&#8377; {item.rentamt-item.offer} </b>
                            </div>

                        </Paper>
                        </div>
                    
                )
            })
    }

    const fetchGamesOffers=async()=>{
        var list=await getData('game/gamesoffers')
        setListGames(list)   

    }

    const showGamesOffers=()=>{
        return listGames.map((item)=>{
                return(
                    <div>

                <Paper elevation={7} className={classes.paperstyle}>

                    <div  className={classes.imageview}>
                        <img src={`${ServerURL}/images/${item.picture}` } width="150" />
                    </div>


                        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center' }}>
                           <div style={{fontSize:14,fontWeight:'bold',padding:10}} >
                               {item.gamename.toUpperCase()}
                            </div>
                            <div style={{fontSize:16, padding:10}}>
                                Day Price: Price<s>&#8377; {item.rentamt}</s> <span><b>&#8377; {item.offer}</b></span>
                            </div>
                            <div style={{fontSize:16,padding:10}}>
                                <span style={{color:'green'}}><b> You Save </b></span> <b>&#8377; {item.rentamt-item.offer} </b>
                            </div>
                        </div>
                </Paper>
                </div>
                    
                )
            })
    }


    const fetchConsoleOffers=async()=>{
        var list=await getData('accessories/displayalloffers')
        setListConsole(list)   

    }

    const showConsoleOffers=()=>{
        return listConsole.map((item)=>{
                return(
                    <div>

                <Paper elevation={7} className={classes.paperstyle}>

                    <div  className={classes.imageview}>
                        <img src={`${ServerURL}/images/${item.picture}` } width="150" />
                    </div>


                        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center' }}>
                           <div style={{fontSize:14,fontWeight:'bold',padding:10}} >
                               {item.accessoriesname.toUpperCase()}
                            </div>
                            <div style={{fontSize:16, padding:10}}>
                                Day Price: Price<s>&#8377; {item.rentamt}</s> <span><b>&#8377; {item.offer}</b></span>
                            </div>
                            <div style={{fontSize:16,padding:10}}>
                                <span style={{color:'green'}}><b> You Save </b></span> <b>&#8377; {item.rentamt-item.offer} </b>
                            </div>
                        </div>
                </Paper>
                </div>
                    
                )
            })
    }



    useEffect(function(){
        fetchAllCategory()
        fetchAllSubcategoryOffers()
        fetchGamesOffers()
        fetchConsoleOffers()

    },[])

    return(
        <div>
            <Header history={props.history} />

        <div 
            style={{display: "flex",alignItems:"center",justifyContent: "center", marginTop:10 }} >

                <div style={{ width:"98%"  }} >
                    <Slider {...settings}>{showSlider()}</Slider>
                </div>
            </div>

            <div className={classes.root} >

                <div style={{display:'flex',flexDirection:'column'}} >
                <div 
                style={{
                    fontSize:30,
                    color: "#636e72",
                    fontWeight:'normal',
                    display: "flex",
                    letterSpacing: "3.9px",
                    fontFamily: 'Georgia,Times,"Times New Roman",serif',
                    justifyContent: "center",
                    padding: 10,
                    }} >
                    TOP CATEGORIES
                </div>
                
                <Divider style={{marginTop:5, marginBottom:5}} />

                
                <div style={{display:'flex',flexDirection:'row',marginTop:5}} >
                    {showCategory()}
                </div>
                </div>

                <div style={{display:'flex',flexDirection:'column'}} >
                <div style={{
                    fontSize:30,
                    color: "#636e72",
                    fontWeight:'normal',
                    display: "flex",
                    letterSpacing: "3.9px",
                    fontFamily: 'Georgia,Times,"Times New Roman",serif',
                    justifyContent: "center",
                    padding: 10,
                    
                    }} >
                    TOP OFFERS CONSOLE
                </div>
                
                <Divider style={{marginTop:5, marginBottom:5}} />

            <div style={{ width:'100%' ,display:'flex',justifyContent:'center',alignItems:'center'}}>  

            <IconButton className={classes.arrowstyle} style={{background:'#1e6b7b',position:'absolute',zIndex:1,left:5,opacity:0.8}}>
                <ArrowBackIosIcon style={{color:'#FFF',fontSize:'large',}} />
            </IconButton>

                <div style={{ width:"98%" }} >
                    <Slider {...itemsettings}>{showOffers()}</Slider>
                </div>

            <IconButton className={classes.arrowstyle} style={{background:'#1e6b7b',position:'absolute',zIndex:1,right:5,opacity:0.8}}>
                <ArrowForwardIosIcon style={{color:'#FFF',fontSize:'large',}} />
            </IconButton>
    


            </div>  



   {/*         <div style={{display:'flex',flexDirection:'row', flexWrap:'wrap',alignContent:'center',justifyContent:'center', marginTop:5}} >
                    {showOffers()}
                </div>     
   */}

                </div>

                <div style={{display:'flex',flexDirection:'column'}} >
                <div style={{
                    fontSize:30,
                    color: "#636e72",
                    fontWeight:'normal',
                    display: "flex",
                    letterSpacing: "3.9px",
                    fontFamily: 'Georgia,Times,"Times New Roman",serif',
                    justifyContent: "center",
                    padding: 10,
                    
                    }} >
                    TOP OFFERS GAMES
                </div>
                
                <Divider style={{marginTop:5, marginBottom:5}} />

                <div style={{ width:'100%' ,display:'flex',justifyContent:'center',alignItems:'center'}}>  

            <IconButton className={classes.arrowstyle} style={{background:'#1e6b7b',position:'absolute',zIndex:1,left:5,opacity:0.8}}>
                <ArrowBackIosIcon style={{color:'#FFF',fontSize:'large',}} />
            </IconButton>

                <div style={{ width:"98%" }} >
                    <Slider {...itemsettings}>{showGamesOffers()}</Slider>
                </div>

            <IconButton className={classes.arrowstyle} style={{background:'#1e6b7b',position:'absolute',zIndex:1,right:5,opacity:0.8}}>
                <ArrowForwardIosIcon style={{color:'#FFF',fontSize:'large',}} />
            </IconButton>


            </div>  


     {/*           <div style={{display:'flex',flexDirection:'row', flexWrap:'wrap',alignContent:'center',justifyContent:'center', marginTop:5}} >
                    {showGamesOffers()}
                </div>
                
     */}

            </div>
            

            <div style={{display:'flex',flexDirection:'column'}} >
                <div style={{
                    fontSize:30,
                    color: "#636e72",
                    fontWeight:'normal',
                    display: "flex",
                    letterSpacing: "3.9px",
                    fontFamily: 'Georgia,Times,"Times New Roman",serif',
                    justifyContent: "center",
                    padding: 10,
                    
                    }} >
                    TOP ACCESSORIES OFFERS 
                </div>
                
                <Divider style={{marginTop:5, marginBottom:5}} />

                <div style={{ width:'100%' ,display:'flex',justifyContent:'center',alignItems:'center'}}>  

            <IconButton className={classes.arrowstyle} style={{background:'#1e6b7b',position:'absolute',zIndex:1,left:5,opacity:0.8}}>
                <ArrowBackIosIcon style={{color:'#FFF',fontSize:'large',}} />
            </IconButton>

                <div style={{ width:"98%" }} >
                    <Slider {...itemsettings}>{showConsoleOffers()}</Slider>
                </div>

            <IconButton className={classes.arrowstyle} style={{background:'#1e6b7b',position:'absolute',zIndex:1,right:5,opacity:0.8}}>
                <ArrowForwardIosIcon style={{color:'#FFF',fontSize:'large',}} />
            </IconButton>


            </div>  


     {/*           <div style={{display:'flex',flexDirection:'row', flexWrap:'wrap',alignContent:'center',justifyContent:'center', marginTop:5}} >
                    {showConsoleOffers()}
                </div>
                
     */}

            </div>

         </div>



               <Footer  />

        </div>
    )

}