var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload=require('./multer')

/* GET home page. */

router.post('/addconsolepicture',upload.any(), function(req, res, next) {
    console.log(req.body)
    console.log(req.files)
    
    var q="insert into consolepicture (categoryid,subcategoryid,image)values ?"
    pool.query(q,[req.files.map((item)=>
    [
        req.body.categoryid,
        req.body.subcategoryid,
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

    pool.query("select * from consolepicture ",function(error,result){
      
        if(error)
        {
            res.status(500).json([])
        }
        else
        {
           
            res.status(200).json(result)
        }
    })
  });
    

  router.post('/editimage',upload.single('image'), function(req, res, next) {

    pool.query("update consolepicture set image=? where imageid=?",
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

    router.post('/editconsolepicturedata', function(req, res, next) {

        pool.query("update consolepicture set categoryid=?,subcategoryid=? where imageid=?",
        [
            req.body.categoryid,
            req.body.subcategoryid,
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

    router.post('/deleteconsolepicture', function(req, res, next) {

        pool.query("delete from consolepicture where imageid=?",
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

    
router.post('/displayallproductpictures',function(req,res) {

    pool.query("select * from consolepicture where subcategoryid=? ",[req.body.subcategoryid],function(error,result){
      
        if(error)
        {
            res.status(500).json([])
        }
        else
        {
           console.log(result);
            res.status(200).json(result)
        }
    })
  });
    

    
module.exports = router;

