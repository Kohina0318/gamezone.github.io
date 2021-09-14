import MaterialTable from "material-table"
import React,{useState,useEffect} from "react"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';


import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import swalhtml from "@sweetalert/with-react";
import swal from "sweetalert";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {ServerURL,postDataAndImage,getData,postData} from "./FetchNodeServices"
import {isBlank} from "./Checks";
import renderHTML from "react-render-html" ;




const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});




export default function DisplayGames(props)
{
    const [list,setList]=useState()
    const classes = useStyles();




/////////////////////////////////////////////////Edit form/////////////////////////////////////////////////////////

const [categoryId,setCategoryId]=useState('')
const [subcategoryId,setSubCategoryId]=useState('')
const [gameID,setGameID]=useState('')
const [gameName,setGameName]=useState('')
const [gameDescription,setGameDescription]=useState('')
const [price,setPrice]=useState('')
const [stock,setStock]=useState('')
const [rented,setRented]=useState('')
const [rentAmt,setRentAmt]=useState('')
const [offer,setOffer]=useState('')
const [picture,setPicture]=useState({bytes:'',file:'/noimage.png' })


const [pictureSaveCancel,setPictureSaveCancel]=useState(false)
const [getRowData,setRowData]=useState([])
const [listCategory,setListCategory]=useState([])
const [listSubCategory,setListSubCategory]=useState([])




const handlePicture=(event)=>{
    setPicture({bytes:event.target.files[0],
    file:URL.createObjectURL(event.target.files[0])})
    setPictureSaveCancel(true)
}

 

const handleDelete=async()=>{

  var body={gameid:gameID}
  var result=await postData("game/deletegame",body)

  if(result){
    swal({
        title: "Game Deleted Successfully",
        icon: "success",
        dangerMode: true,
      })
  }
  else{
    swal({
      title: "Fail to Deleted Record",
      icon: "success",
      dangerMode: true,
    })
  }

}



const handleClick=async()=>{
    var error=false
    var msg="<div>"
    if(isBlank(categoryId)){
      error=true
      msg+="<font color='#e74c3c'><b>CategoryId should not be blank..</b></font><br> "
  }
  if(isBlank(subcategoryId)){
    error=true
    msg+="<font color='#e74c3c'><b>SubCategoryId should not be blank..</b></font><br> "
  }
    if(isBlank(gameName)){
        error=true
        msg+="<font color='#e74c3c'><b>Game should not be blank..</b></font><br> "
    }
    if(isBlank(gameDescription)){
        error=true
        msg+="<font color='#e74c3c'><b>Description should not be blank..</b></font><br> "
    }
    if(isBlank(price)){
      error=true
      msg+="<font color='#e74c3c'><b>price should not be blank..</b></font><br> "
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
      msg+="<font color='#e74c3c'><b>RentAmt should not be blank..</b></font><br> "
  }
  if(isBlank(offer)){
    error=true
    msg+="<font color='#e74c3c'><b>Offer should not be blank..</b></font><br> "
  }

    msg+="</div>"

    if(error){
        swalhtml(renderHTML(msg))
    }
    else{

   var body={
    categoryid:categoryId,
    subcategoryid:subcategoryId,
    gameid:gameID,
    gamename:gameName,
    description:gameDescription,
    price:price,
    stock:stock,
    rented:rented,
    rentamt:rentAmt,
    offer:offer,
    
   }
   
    var result= await postData('game/editgamedata',body)
    if(result){
        swal({
            title: "Game updated Successfully",
            icon: "success",
            dangerMode: true,
          })
    }
}
}


const handleCancelPicture=()=>{
  setPictureSaveCancel(false)
  setPicture({btyes:"",file:`${ServerURL}/images/${getRowData.picture}`})
}


const handleClickSavePicture=async()=>{

  var formData=new FormData()
  formData.append("gameid",gameID)
  formData.append("picture",picture.bytes)
  var config={headers:{"content-type":"multipart/form-data"}}
  var result= await postDataAndImage('game/editpicture',formData,config)
  if(result){
    swal({
        title: "Picture updated Successfully",
        icon: "success",
        dangerMode: true,
      })
      setPictureSaveCancel(false)
  }
}


const editFormView=()=>{

  
  return(
    <div className={classes.root} >
        <div className={classes.subdiv} >
            <Grid container spacing={1}>

                <Grid item xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center' }}>
                    <div style={{fontSize:22,fontWeight:700,letterSpacing:2,padding:20}}>
                        Game Interface
                    </div>
                </Grid>
                
                
                <Grid item xs={12}>
                    <FormControl variant="outlined" fullWidth className={classes.formControl}>
                       <InputLabel id="demo-simple-select-outlined-category">Category Id</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-category"
                        id="demo-simple-select-outlined-category"
                        value={categoryId}
                        onChange={(event)=>handleCategoryChange(event)}
                        label="Category Id">
                       {fillCategory()}
                      </Select>
                     </FormControl>
                  </Grid>

    
                  <Grid item xs={12}>
                    <FormControl variant="outlined" fullWidth className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-subcategory">SubCategory Id</InputLabel>
                       <Select
                        labelId="demo-simple-select-outlined-subcategory"
                        id="demo-simple-select-outlined-subcategory"
                        value={subcategoryId}
                        onChange={(event)=>setSubCategoryId(event.target.value)}
                        label="SubCategory Id">
                        {fillSubCategory()}
                       </Select>
                    </FormControl>
                    </Grid>


                <Grid item xs={12}>
                   <TextField value={gameName} onChange={(event)=>setGameName(event.target.value)} label="Game Name" variant="outlined" fullWidth/>
                </Grid>

                <Grid item xs={12}>
                   <TextField value={gameDescription} onChange={(event)=>setGameDescription(event.target.value)} label="Game Description" variant="outlined" fullWidth/>
                </Grid>

                
                <Grid item xs={12} sm={4}>
                       <TextField value={price} onChange={(event)=>setPrice(event.target.value)} label="Price" variant="outlined" fullWidth/>
                    </Grid>

                <Grid item xs={12} sm={4}>
                       <TextField value={stock} onChange={(event)=>setStock(event.target.value)} label="Stock" variant="outlined" fullWidth/>
                    </Grid>
                    
                    <Grid item xs={12} sm={4}>
                       <TextField value={rented} onChange={(event)=>setRented(event.target.value)} label="Rented" variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                       <TextField value={rentAmt} onChange={(event)=>setRentAmt(event.target.value)} label="Rentamt" variant="outlined" fullWidth/>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                       <TextField value={offer} onChange={(event)=>setOffer(event.target.value)} label="Offer" variant="outlined" fullWidth/>  
                  </Grid>


                    <Grid item xs={6}>
                    <span style={{fontSize:16,fontWeight:300}} >
                      Edit Game Picture
                      </span>
                    <input onChange={(event)=>handlePicture(event)} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">
                       <IconButton color="primary" aria-label="upload picture" component="span">
                       <PhotoCamera />
                       </IconButton>
                    </label>
                </Grid>

                <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column' }} >
                <Avatar  variant="rounded" src={picture.file} className={{width:60,height:60}} />

                {pictureSaveCancel?<span><Button onClick={()=>handleClickSavePicture()} color="secondary">Save</Button><Button color="secondary" onClick={()=>handleCancelPicture()} >Cancel</Button></span>:<></>}

                </Grid>


                    
            </Grid>

        </div>
    
    </div>
)



}






/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





////////////////////////////////////////////////Edit Dialog//////////////////////////////////////////////////////////


  
const [open, setOpen] = React.useState(false);

const handleClickOpen = (rowData) => {
  setRowData(rowData)
  setOpen(true);
  setCategoryId(rowData.categoryid)
  fillSubCategoryByCategoryId(rowData.categoryid)
  setSubCategoryId(rowData.subcategoryid)
  setGameID(rowData.gameid)
  setGameName(rowData.gamename)
  setGameDescription(rowData.description)
  setPrice(rowData.price)
  setStock(rowData.stock)
  setRented(rowData.rented)
  setRentAmt(rowData.rentamt)
  setOffer(rowData.offer)
  setPicture({bytes:"",file:`${ServerURL}/images/${rowData.picture}`})
  
 };

const handleClose = () => {
  setOpen(false);
  fetchAllGame()
};

const showEditDialog=()=>{

  return (
    <div>
      
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Edit/Delete Game 
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClick}>
              Update
            </Button>

            <Button autoFocus color="inherit" onClick={handleDelete}>
              Delete
            </Button>

          </Toolbar>
        </AppBar>

        {editFormView()}
        
      </Dialog>
    </div>
  );


}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    const fetchAllGame=async()=>{
        var result=await getData("game/displayall")
        setList(result)
    
    }

    const fetchAllCategory=async()=>{
      var result=await getData("categories/displayall")
      setListCategory(result)
  
    }

  const handleCategoryChange=async(event)=>{
      setCategoryId(event.target.value)
      fillSubCategoryByCategoryId(event.target.value)
      
  } 

  const fillSubCategoryByCategoryId =async(cid)=>{
    var body={categoryid:cid}
      var result= await postData("subcategory/displaysubcategorybycategoryid",body)
      setListSubCategory(result);

  }


  const fillCategory=()=>{
    return listCategory.map((item)=>{
        return(
            <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        )
    })
  }
  
  const fillSubCategory=()=>{
    return listSubCategory.map((item)=>{
        return(
            <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        )
    })
}

    
    useEffect(function(){
        fetchAllGame()
        fetchAllCategory()
    
    },[])
    
    
function displayAll() {
    return (
      <div>
      <MaterialTable
        title="Game List"
        columns={[
          { title: 'CategoryId', field: 'categoryid' },
          { title: 'SubCategoryId', field: 'subcategoryid' },
          { title: 'Id', field: 'gameid' },
          { title: 'Name', field: 'gamename' },
          { title: 'Description', field: 'description' },
          { title: 'Price', field: 'price' },
          { title: 'Stock', field: 'stock' },
          { title: 'Rented', field: 'rented' },
          { title: 'Rentamt', field: 'rentamt' },
          { title: 'Offer', field: 'offer' },
          { title: 'Picture', field: 'picture',
           render: rowData =><div><img src={`${ServerURL}/images/${rowData.picture}`} style={{borderRadius:5}} width='40' height='40'/></div> },
          
        ]}

        data={list}        
        actions={[
          {
            icon: 'editoutlined',
            tooltip: 'Edit Game',
            onClick: (event, rowData) => handleClickOpen(rowData),
          },
        ]}
      />
      {showEditDialog()}
      </div>
    )
  }

  return(

    <div style={{display:'flex', justifyContent:'center',alignItems:'center'}} >
      <div style={{width:900,marginTop:10,padding:3}}>
      {displayAll()}
      </div>
    </div>
    ) 


}
