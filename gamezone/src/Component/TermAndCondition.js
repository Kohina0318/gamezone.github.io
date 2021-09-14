import React,{useEffect, useState} from "react"
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
import { makeStyles } from '@material-ui/core/styles';
import {ServerURL,postDataAndImage} from "./FetchNodeServices"
import {isBlank} from "./Checks"
import renderHTML from "react-render-html"

import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';

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

export default function TermAndCondition(props)
{ const classes =useStyles();
    
    const [termAndCondition,setTermAndCondition]=useState('')
    
    TermAndCondition.modules = {
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
      TermAndCondition.formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
      ]
    
    
   
    const handleClick=async()=>{
        var error=false
        var msg="<div>"
        if(isBlank(termAndCondition)){
            error=true
            msg+="<font color='#e74c3c'><b>Term And Condition should not be blank..</b></font><br> "
        }
        
        msg+="</div>"

        if(error){
            swalhtml(renderHTML(msg))
        }
        else{


        var formData=new FormData()
        formData.append("termandcondition",termAndCondition)

        var config={headers:{"content-type":"multipart/form-data"}}
        var result= await postDataAndImage('termandcondition/addnewtermandcondition',formData,config)
        if(result){
            swal({
                title: "Term And Condition Submitted Successfully",
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
                        Term And Condition Interface
                        </div>
                    </Grid>
     
                      
                    <Grid item xs={12}>
                       <ReactQuill value={termAndCondition}
                          modules={TermAndCondition.modules}
                          formats={TermAndCondition.formats}                     
                         onChange={(value)=>setTermAndCondition(value)} />
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