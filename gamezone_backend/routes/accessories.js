var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload=require('./multer')

/* GET home page. */

router.post('/addnewaccessories',upload.any(), function(req, res, next) {

    pool.query("insert into accessories (categoryid,subcategoryid,accessoriesname,description,price,stock,rented,rentamt,offer,picture)values(?,?,?,?,?,?,?,?,?,?)",
    [
        req.body.categoryid,
        req.body.subcategoryid,
        req.body.accessoriesname,
        req.body.description,
        req.body.price,
        req.body.stock,
        req.body.rented,
        req.body.rentamt,
        req.body.offer,
        req.files[0].originalname
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


router.get('/displayall',function(req,res) {

    pool.query("select * from accessories",function(error,result){
      
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
    


router.post('/editpicture',upload.single('picture'), function(req, res, next) {

        pool.query("update accessories set picture=? where accessoriesid=?",
        [
            req.file.originalname,
            req.body.accessoriesid
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
    
    router.post('/editaccessoriesdata', function(req, res, next) {

        pool.query("update accessories set categoryid=?,subcategoryid=?,accessoriesname=?,description=?,price=?,stock=?,rented=?,rentamt=?,offer=? where accessoriesid=?",
        [
            req.body.categoryid,
            req.body.subcategoryid,
            req.body.accessoriesname,
            req.body.description,
            req.body.price,
            req.body.stock,
            req.body.rented,
            req.body.rentamt,
            req.body.offer,
            req.body.accessoriesid
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

    router.post('/deleteaccessories', function(req, res, next) {

        pool.query("delete from accessories where accessoriesid=?",
        [
            req.body.accessoriesid
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

    router.get('/displayalloffers',function(req,res) {

        pool.query("select * from accessories where offer>0 ",function(error,result){
          
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

      router.post('/displayallaccessoriesbysubcategoryid',function(req,res) {

        pool.query("select * from accessories where subcategoryid=? ",[req.body.subcategoryid],function(error,result){
          
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
    
    
        
    
    
module.exports = router;