var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload=require('./multer')

/* GET home page. */

router.post('/addaccessoriespicture',upload.any(), function(req, res, next) {
    console.log(req.body)
    console.log(req.files)
    
    var q="insert into accessoriespicture (categoryid,subcategoryid,accessoriesid,image)values ?"
    pool.query(q,[req.files.map((item)=>

    [
        req.body.categoryid,
        req.body.subcategoryid,
        req.body.accessoriesid,
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

    pool.query("select * from accessoriespicture ",function(error,result){
      
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

    pool.query("update accessoriespicture set image=? where imageid=?",
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

    router.post('/editaccessoriespicturedata', function(req, res, next) {

        pool.query("update accessoriespicture set categoryid=?,subcategoryid=?,accessoriesid=? where imageid=?",
        [
            req.body.categoryid,
            req.body.subcategoryid,
            req.body.accessoriesid,
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

    router.post('/deleteaccessoriespicture', function(req, res, next) {

        pool.query("delete from accessoriespicture where imageid=?",
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

