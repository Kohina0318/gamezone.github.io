import React,{useState,useEffect} from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import swalhtml from "@sweetalert/with-react"
import swal from "sweetalert"

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {ServerURL,postDataAndImage,getData} from "./FetchNodeServices"
import { makeStyles } from '@material-ui/core/styles';
import {isBlank} from "./Checks"
import renderHTML from "react-render-html" 


const useStyles = makeStyles((theme) => ({
    root: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
     
    },
    subdiv:{
        padding:20,
        width:700,
        marginTop:20,
        background:'#FFF'
    },
    input: {
        display: 'none',
    },
  }));


  export default function SubCategoryInterface(props)
  { const classes =useStyles();
    const [categoryId,setCategoryId]=useState('')
    const [subcategoryName,setSubCategoryName]=useState('')
    const [subcategoryDescription,setSubCategoryDescription]=useState('')
    const [price,setPrice]=useState('')
    const [stock,setStock]=useState('')
    const [rented,setRented]=useState('')
    const [rentAmt,setRentAmt]=useState('')
    const [offer,setOffer]=useState('')
    const [icon,setIcon]=useState({bytes:'',file:'/noimage.png' })
    const [ad,setAd]=useState({bytes:'',file:'/noimage.png' })
    const [adStatus,setAdStatus]=useState('')
    

    const [listCategory,setListCategory]=useState([])

    const fetchAllCategory=async()=>{
        var result=await getData("categories/displayall")
        setListCategory(result)
    
    }
    useEffect(function(){
        fetchAllCategory()
    },[])

    const fillCategory=()=>{
        return listCategory.map((item)=>{
            return(
                <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
            )
        })
    }
   

    const handleAd=(event)=>{
        setAd({bytes:event.target.files[0],
        file:URL.createObjectURL(event.target.files[0])})

    }
    
    const handleIcon=(event)=>{
        setIcon({bytes:event.target.files[0],
        file:URL.createObjectURL(event.target.files[0])})

    }

    const handleClick=async()=>{
        var error=false
        var msg="<div>"
        if(isBlank(categoryId)){
            error=true
            msg+="<font color='#e74c3c'><b>Category Id should not be blank..</b></font><br> "
        }
        if(isBlank(subcategoryName)){
            error=true
            msg+="<font color='#e74c3c'><b>SubCategory Name should not be blank..</b></font><br> "
        }
        if(isBlank(subcategoryDescription)){
            error=true
            msg+="<font color='#e74c3c'><b>Description should not be blank..</b></font><br> "
        }
        if(isBlank(price)){
            error=true
            msg+="<font color='#e74c3c'><b>Price should not be blank..</b></font><br> "
        }
        if(isBlank(stock)){
            error=true
            msg+="<font color='#e74c3c'><b>Stock should not be blank..</b></font><br> "
        }
        if(isBlank(rented)){
            error=true
            msg+="<font color='#e74c3c'><b>Rent should not be blank..</b></font><br> "
        }
        if(isBlank(rentAmt)){
            error=true
            msg+="<font color='#e74c3c'><b>Rentamt should not be blank..</b></font><br> "
        }
        if(isBlank(offer)){
            error=true
            msg+="<font color='#e74c3c'><b>Offer should not be blank..</b></font><br> "
        }
        if(isBlank(icon.bytes)){
            error=true
            msg+="<font color='#e74c3c'><b>Plz select subcategory icon..</b></font><br> "
        }
        if(isBlank(ad.bytes)){
            error=true
            msg+="<font color='#e74c3c'><b>Plz select picture for advertisment.. </b></font><br> "
        }
        if(isBlank(adStatus)){
            error=true
            msg+="<font color='#e74c3c'><b>Plz choose ad status..</b></font><br> "
        }


        msg+="</div>"

        if(error){
            swalhtml(renderHTML(msg))
        }
        else{


        var formData=new FormData()
        formData.append("categoryid",categoryId)
        formData.append("subcategoryname",subcategoryName)
        formData.append("description",subcategoryDescription)
        formData.append("price",price)
        formData.append("stock",stock)
        formData.append("rented",rented)
        formData.append("rentamt",rentAmt)
        formData.append("offer",offer)
        formData.append("icon",icon.bytes)
        formData.append("ad",ad.bytes)
        formData.append("adstatus",adStatus)
        

        var config={headers:{"content-type":"multipart/form-data"}}
        var result= await postDataAndImage('subcategory/addnewsubcategory',formData,config)
        if(result){
            swal({
                title: "SubCategory Submitted Successfully",
                icon: "success",
                dangerMode: true,
              })
        }
    }
}



    return(
        <div className={classes.root} >
            <div className={classes.subdiv} >
                <Grid container spacing={1}>

                    <Grid item xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center' }}>
                        <div style={{fontSize:22,fontWeight:700,letterSpacing:2,padding:20}}>
                            SubCategory Interface
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                       <FormControl variant="outlined" fullWidth className={classes.formControl}>
                          <InputLabel id="demo-simple-select-outlined-category">Category Id</InputLabel>
                          <Select
                             labelId="demo-simple-select-outlined-category"
                             id="demo-simple-select-outlined-category"
                             //value={age}
                             onChange={(event)=>setCategoryId(event.target.value)}
                              label="Category Id">
                              {fillCategory()}
                           </Select>
                        </FormControl>
                    </Grid>


                    <Grid item xs={12}>
                       <TextField onChange={(event)=>setSubCategoryName(event.target.value)} label="SubCategory Name" variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={12}>
                       <TextField onChange={(event)=>setSubCategoryDescription(event.target.value)} label="SubCategory Description" variant="outlined" fullWidth/>
                    </Grid>

                    
                    <Grid item xs={12} sm={4}>
                       <TextField onChange={(event)=>setPrice(event.target.value)} label="Price" variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                       <TextField onChange={(event)=>setStock(event.target.value)} label="Stock" variant="outlined" fullWidth/>
                    </Grid>
                    
                    <Grid item xs={12} sm={4}>
                       <TextField onChange={(event)=>setRented(event.target.value)} label="Rented" variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                       <TextField onChange={(event)=>setRentAmt(event.target.value)} label="Rentamt" variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                       <TextField onChange={(event)=>setOffer(event.target.value)} label="Offer" variant="outlined" fullWidth/>
                    </Grid>
                   

                    <Grid item xs={6}>
                        <span style={{fontSize:16,fontWeight:300}} >Upload SubCategory Icon</span>
                        <input onChange={(event)=>handleIcon(event)} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file">
                           <IconButton color="primary" aria-label="upload picture" component="span">
                           <PhotoCamera />
                           </IconButton>
                        </label>
                    </Grid>

                    <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center' }} >
                    <Avatar  variant="rounded" src={icon.file} className={{width:60,height:60}} />
                    </Grid>


                    <Grid item xs={12} sm={6}>
                        <span style={{fontSize:16,fontWeight:300}} >Upload SubCategory Ad</span>
                        <input onChange={(event)=>handleAd(event)} accept="image/*" className={classes.input} id="icon-button-ad" type="file" />
                        <label htmlFor="icon-button-ad">
                           <IconButton color="primary" aria-label="upload picture" component="span">
                           <PhotoCamera />
                           </IconButton>
                        </label>
                    </Grid>

                    <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center' }} >
                    <Avatar  variant="rounded" src={ad.file} className={{width:60,height:60}} />
                    </Grid>


                    <Grid item xs={12} >
                    <FormControl variant="outlined" fullWidth className={classes.formControl}>
                       <InputLabel id="demo-simple-select-outlined-label">Ad Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            //value={age}
                            onChange={(event)=>setAdStatus(event.target.value)}
                            label="Ad Status" >
                            <MenuItem value={'Activate'}>Activate</MenuItem>
                            <MenuItem value={'Deactivate'}>Deactivate</MenuItem>  
                        </Select>
                    </FormControl>
                    </Grid>



                    <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center'}} >
                        <Button onClick={()=>handleClick()} fullWidth variant="contained" color="primary" >Save</Button>
                    </Grid>

                    <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <Button fullWidth variant="contained" color="secondary">Reset</Button>
                    </Grid>




                </Grid>

            </div>
        
        </div>
    )
}


