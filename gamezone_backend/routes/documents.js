var express = require('express');
var router = express.Router();
var pool= require('./pool.js')
var upload= require('./multer');
const e = require('express');
/* GET home page. */

router.post('/addnewdocuments',upload.any(), function(req, res, next) {

    pool.query("insert into documents (documents)values(?) ",
    [req.body.documents,]
    ,function(error,result){

        if(error){
            console.log(error)
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }

    })
});


router.get('/displayall',function(req,res){

    pool.query("select * from documents", function(error,result){
        if(error){
            res.status(500).json([])
        }
        else{
            res.status(200).json(result)
        }

    }) 

})


router.post('/editdocumentsdata', function(req, res, next) {

    
  pool.query("update documents set documents=? where id=? ",
    [ req.body.documents,
      req.body.id 
    ]
    ,function(error,result){

        if(error){
            console.log(error)
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }

    })

});



router.post('/deletedocuments', function(req, res, next) {

    pool.query("delete from documents  where id=? ",
    [ req.body.id ],function(error,result){

        if(error){
            console.log(error)
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }

    })
});


module.exports = router;