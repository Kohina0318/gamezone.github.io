//import Swal from 'sweetalert2'

var axios=require("axios")
var ServerURL="http://localhost:5000"


const getData = async (url) => {
    try {
        const response = await fetch(`${ServerURL}/${url}`
/*     ,{
            method:'GET',
            // mode: 'core',
            headers: { 
                "Authorization":localStorage.getItem("token"),
                "Content-Type": "application/json;charset=utf-8"
             },
        }   
*/    
        );
        const result = await response.json();
    {/*     
        //alert(JSON.stringify(result));
        if(result =='expire'){
            //alert("Session Expire")

            Swal.fire({
                title: 'Session Expire plz Login Again', 
                icon: 'warning',
                confirmButtonText: 'Login Again',
              }).then((result) => {

                if (result.isConfirmed) {
                 window.location.href="http://localhost:3000/adminlogin"
                } 
                
              })
              return [];
        }
    */}    
        return result;
    }
    catch (e){
        console.log(e);
        return null;
    }
};

const postDataAndImage=async(url,formData,config)=>{

    try{
        var response= await axios.post( `${ServerURL}/${url}`,formData,config);
        const result=response.data.result
        return result
    }
    catch(e){
        return null

    }
};

const postData = async (url, body)=> {
    try{
        const response = await fetch(`${ServerURL}/${url}`,{
            method: "POST",
            mode: "cors",
            headers: {

                // "Authorization":localStorage.getItem('token'),

                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(body),
        })
        const result = await response.json();
        return result;
    } 
    catch (e){
        return null;
    }

};

export {postDataAndImage,ServerURL,getData,postData}