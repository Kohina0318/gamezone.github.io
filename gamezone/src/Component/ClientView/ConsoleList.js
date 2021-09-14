import React, { useEffect,useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Header from "./Header";
import { getData,ServerURL,postData } from "../FetchNodeServices";
import Divider from "@material-ui/core/Divider"
import Paper from "@material-ui/core/Paper"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Footer from "./Footer";
import QtySpinner from "./QtySpinner"

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from "@material-ui/core/IconButton"

import {useDispatch} from 'react-redux';
import { EditLocation } from '@material-ui/icons';

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

export default function ConsoleList(props) 
{
    const classes = useStyles();
    const [listConsole,setListConsole]=useState([])
   // alert(props.history.location.state.categoryid)
    // console.log(props.history.location.state.categoryid)

    const [pageRender,setPageRender]=useState(false)

   var categoryid=props.history.location.state.categoryid;
   
   var dispatch=useDispatch();
 
    var settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    function getCurrentDate(){
        var d=new Date()
        var dd=d.getDate()
        if(dd<=9){
            dd="0"+dd;
        }
        var mm=d.getMonth()+1
        if(mm<=9){
            mm="0"+mm;
        }
        var cd=d.getFullYear()+"-"+mm+"-"+dd

        return cd
    }

    function addDays(days,dt){
        var d=new Date(dt)
        d.setDate(d.getDate()+days)

        var dd=d.getDate()
        if(dd<=9){
            dd="0"+dd;
        }
        var mm=d.getMonth()+1
        if(mm<=9){
            mm="0"+mm;
        }
        var cd=d.getFullYear()+"-"+mm+"-"+dd

        return cd
    }
    

    const fetchAllSubCategory=async()=>{
        var body={'categoryid':categoryid}
        var list=await postData('subcategory/displayallsubcategorybycategoryid',body);
        setListConsole(list)

    }

    const showConsole=()=>{
        return listConsole.map((item)=>{
                return(
                    <div>
                        <div style={{width:200,justifyContent:"center",alignItems:'center',display:'flex',flexDirection:"column",padding:10,margin:15}}>
                      
                        <Paper  elevation={3} className={classes.paperstyle}>

                           <div onClick={()=>props.history.push({'pathname':'/productview'},{'product':item})} className={classes.imageview}>
                              <img src={`${ServerURL}/images/${item.icon}` } width="150"  />
                           </div>

                           <div style={{fontSize:14,fontWeight:'bold',padding:10}} >
                               {item.subcategoryname.length<=20?item.subcategoryname.toUpperCase():item.subcategoryname.toUpperCase().substring(0,18)+".."}
                            </div>

                            <div style={{fontSize:16, padding:10}}>
                                Day Price: <s>&#8377; {item.rentamt}</s> <span><b>&#8377; {item.offer}</b></span>
                            </div>

                            <div style={{fontSize:16,padding:10}}>
                                <span style={{color:'green'}}><b> You Save </b></span> <b>&#8377; {item.rentamt-item.offer} </b>
                            </div>

                            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <QtySpinner value={0} onChange={(value)=>handleQtyChange(value,item)} />
                            </div>

                        </Paper>
                        </div>
                    </div>
                    
                )
            })
    }

    const handleQtyChange=(value,item)=>{
         // alert(value)

        if(value==0){
            dispatch({type: 'REMOVE_CART',payload:[item.subcategoryid,item]})    
        }
        else{
           item['qtydemand']=value
           // alert(JSON.stringify(item))
           item['duration']=1;
           item['time']='Day';

           var cd=getCurrentDate()
           item['startdate']=cd
           
           var ed=addDays(1,cd)
           item['enddate']=ed

            dispatch({type: 'ADD_CART',payload:[item.subcategoryid,item]})
       }
       setPageRender(!pageRender)
    }

    
    useEffect(function(){
       fetchAllSubCategory();

    },[])

    return(
        <div>
            <Header history={props.history} />

            <div style={{padding:8,flexDirection:'row',display:'flex',flexWrap:'wrap',justifyContent:'left'}}>
            {showConsole()}
            </div>

               <Footer  />

        </div>
    )

}