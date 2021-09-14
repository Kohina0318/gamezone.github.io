var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload=require('./multer')

/* GET home page. */

router.post('/addgamespicture',upload.any(), function(req, res, next) {
    console.log(req.body)
    console.log(req.files)
        
    var q="insert into gamespicture (categoryid,subcategoryid,gameid,image)values ?"
    pool.query(q,[req.files.map((item)=>
    [
        req.body.categoryid,
        req.body.subcategoryid,
        req.body.gameid,
        item.originalname
        
    ]),],
    function(error,result){
       console.log(req.body)
        if(error)
        {console.log(error)
            res.status(500).json({result:false})
        }
        else
        {
            console.log(result)
            res.status(200).json({result:true})
        }
    })
  
});

router.get('/displayall',function(req,res) {

    pool.query("select * from gamespicture ",function(error,result){
      
        if(error)
        {console.log(error)
            res.status(500).json([])
        }
        else
        {
           
            res.status(200).json(result)
        }
    })
  });
    



  router.post('/editimage',upload.single('image'), function(req, res, next) {

    pool.query("update gamespicture set image=? where imageid=?",
    [
        req.file.originalname,
        req.body.imageid
    ],
    function(error,result){
       console.log(req.body)
        if(error)
        {console.log(error)
            res.status(500).json({result:false})
        }
        else
        {
            console.log(result)
            res.status(200).json({result:true}) 
        }
    })



});

    router.post('/editgamespicturedata', function(req, res, next) {

        pool.query("update gamespicture set categoryid=?,subcategoryid=?,gameid=? where imageid=?",
        [
            req.body.categoryid,
            req.body.subcategoryid,
            req.body.gameid,
            req.body.imageid
        ],
        function(error,result){
            console.log(req.body)
             if(error)
             {console.log(error)
                 res.status(500).json({result:false})
             }
             else
             {
                 console.log(result)
                 res.status(200).json({result:true})
             }
         })
       
    
    });

    router.post('/deletegamespicture', function(req, res, next) {

        pool.query("delete from gamespicture where imageid=?",
        [
            req.body.imageid
        ],
        function(error,result){
           
            if(error)
            {console.log(error)
                res.status(500).json({result:false})
            }
            else
            {
                console.log(result)
                res.status(200).json({result:true}) 
            }
        })
    });
    
module.exports = router;

