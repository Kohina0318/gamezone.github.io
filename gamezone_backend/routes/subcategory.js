var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload=require('./multer')

/* GET home page. */

router.post('/addnewsubcategory',upload.any(), function(req, res, next) {

    pool.query("insert into subcategory (categoryid,subcategoryname,description,price,stock,rented,rentamt,offer,icon,ad,adstatus)values(?,?,?,?,?,?,?,?,?,?,?)",
    [
        req.body.categoryid,
        req.body.subcategoryname,
        req.body.description,
        req.body.price,
        req.body.stock,
        req.body.rented,
        req.body.rentamt,
        req.body.offer,
        req.files[0].originalname,
        req.files[1].originalname,
        req.body.adstatus,
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


router.post('/displaysubcategorybycategoryid',function(req,res) {

    pool.query("select * from subcategory where categoryid=?",[req.body.categoryid],function(error,result){
      
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


router.get('/displayall',function(req,res) {

    pool.query("select * from subcategory",function(error,result){
      
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
    


router.post('/editicon',upload.single('icon'), function(req, res, next) {

        pool.query("update subcategory set icon=? where subcategoryid=?",
        [
            req.file.originalname,
            req.body.subcategoryid
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
    
    router.post('/editad',upload.single('ad'), function(req, res, next) {

        pool.query("update subcategory set ad=? where subcategoryid=?",
        [
            req.file.originalname,
            req.body.subcategoryid
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

    router.post('/editsubcategorydata', function(req, res, next) {

        pool.query("update subcategory set categoryid=?,subcategoryname=?,description=?,price=?,stock=?,rented=?,rentamt=?,offer=?,adstatus=? where subcategoryid=?",
        [
            req.body.categoryid,
            req.body.subcategoryname,
            req.body.description,
            req.body.price,
            req.body.stock,
            req.body.rented,
            req.body.rentamt,
            req.body.offer,
            req.body.adstatus,
            req.body.subcategoryid],function(error,result){
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

    router.post('/deletesubcategory', function(req, res, next) {

        pool.query("delete from subcategory where subcategoryid=?",
        [
            req.body.subcategoryid
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

    
router.get('/subcategoryoffers',function(req,res) {

    pool.query("select * from subcategory where offer>0 ",function(error,result){
      
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

  router.post('/displayallsubcategorybycategoryid',function(req,res) {

    pool.query("select * from subcategory where categoryid=? ",[req.body.categoryid],function(error,result){
      
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

     

    

    
module.exports = router;