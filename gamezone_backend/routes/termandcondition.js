var express = require('express');
var router = express.Router();
var pool= require('./pool.js')
var upload= require('./multer');
const e = require('express');
/* GET home page. */

router.post('/addnewtermandcondition',upload.any(), function(req, res, next) {

    pool.query("insert into termandcondition (termandcondition)values(?) ",
    [req.body.termandcondition,]
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

    pool.query("select * from termandcondition", function(error,result){
        if(error){
            res.status(500).json([])
        }
        else{
            res.status(200).json(result)
        }

    }) 

})


router.post('/edittermandconditiondata', function(req, res, next) {

    
  pool.query("update termandcondition set termandcondition=? where id=? ",
    [ req.body.termandcondition,
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



router.post('/deletetermandcondition', function(req, res, next) {

    pool.query("delete from termandcondition  where id=? ",
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