import MaterialTable from "material-table";
import React, { useState, useEffect } from "react";
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

import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';


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
formControl: {
    minWidth: 700,
  },

}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DisplayDocuments(props)
{
  const [list,setList]=useState()
  const classes = useStyles();

  DisplayDocuments.modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  }
  /* 
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  DisplayDocuments.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]




/////////////////////////////////////////////////Edit form/////////////////////////////////////////////////////////

const [ID,setID]=useState('')
const [documents,setDocuments]=useState('')
const [getRowData,setRowData]=useState([])


const handleDelete=async()=>{

  var body={id:ID}
  var result=await postData("documents/deletedocuments",body)

  if(result){
    swal({
        title: "Documents Data Deleted Successfully",
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
  if(isBlank(documents)){
      error=true
      msg+="<font color='#e74c3c'><b>Documents should not be blank..</b></font><br> "
  }
  
  msg+="</div>"

  if(error){
      swalhtml(renderHTML(msg))
  }
  else{
   
   var body={
     id:ID,
     documents:documents,
         }
    
   var result= await postData('documents/editdocumentsdata',body)
    if(result){
      swal({
          title: "Documents Data updated Successfully",
          icon: "success",
          dangerMode: true,
        })
    }
  }
}


const editFormView=()=>{

  return(
    <div className={classes.root} >
        <div className={classes.subdiv} >
            <Grid container spacing={1}>

                <Grid item xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center' }}>
                    <div style={{fontSize:22,fontWeight:700,letterSpacing:2,padding:20}}>
                    Documents Interface
                    </div>
                </Grid>

                
                <Grid item xs={12}>
                       <ReactQuill value={documents}
                          modules={DisplayDocuments.modules}
                          formats={DisplayDocuments.formats}                     
                         onChange={(value)=>setDocuments(value)} />
                    </Grid>     
         

            </Grid>

        </div>
    
    </div>
)
}




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////Edit Dialog//////////////////////////////////////////////////////////


  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (rowData) => {
    setRowData(rowData)
    setOpen(true);

    setID(rowData.id)
    setDocuments(rowData.documents)
  };

  const handleClose = () => {
    setOpen(false);
    fetchDocuments()
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
                Edit/Delete Documents
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

  const fetchDocuments=async()=>{
      var result=await getData("documents/displayall")
      setList(result)
  
  }
  
  useEffect(function(){
      fetchDocuments()
  
  },[])
  
function displayAll() {
    return (
      <div>
      <MaterialTable
        title="Documents List"
        columns={[
          { title: 'Id', field: 'id' },
          { title: 'Documents', field: 'documents' },
          
        ]}
        data={list}        
        actions={[
          {
            icon: 'editoutlined',
            tooltip: 'Edit Documents',
            onClick: (event, rowData) =>handleClickOpen(rowData), 
          },
        ]}
      />
      {showEditDialog()}
      </div>
    );
}
      
  

return(

  <div style={{display:'flex', justifyContent:'center',alignItems:'center'}} >
    <div style={{width:900,marginTop:10,padding:3}}>
    {displayAll()}
    </div>
  </div>
  ); 
}


