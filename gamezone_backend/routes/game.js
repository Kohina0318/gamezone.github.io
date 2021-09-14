var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload=require('./multer')

/* GET home page. */

router.post('/addnewgame',upload.any(), function(req, res, next) {

    pool.query("insert into game (categoryid,subcategoryid,gamename,description,price,stock,rented,rentamt,offer,picture)values(?,?,?,?,?,?,?,?,?,?)",
    [
        req.body.categoryid,
        req.body.subcategoryid,
        req.body.gamename,
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

    pool.query("select * from game",function(error,result){
      
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

        pool.query("update game set picture=? where gameid=?",
        [
            req.file.originalname,
            req.body.gameid
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
    
    router.post('/editgamedata', function(req, res, next) {

        pool.query("update game set categoryid=?,subcategoryid=?,gamename=?,description=?,price=?,stock=?,rented=?,rentamt=?,offer=? where gameid=?",
        [
            req.body.categoryid,
            req.body.subcategoryid,
            req.body.gamename,
            req.body.description,
            req.body.price,
            req.body.stock,
            req.body.rented,
            req.body.rentamt,
            req.body.offer,
            req.body.gameid
        ],function(error,result){
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

    router.post('/deletegame', function(req, res, next) {

        pool.query("delete from game where gameid=?",
        [
            req.body.gameid
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

    router.get('/gamesoffers',function(req,res) {

        pool.query("select * from game where offer>0 ",function(error,result){
          
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
    
      
      router.post('/displayallgamebysubcategoryid',function(req,res) {

        pool.query("select * from game where subcategoryid=? ",[req.body.subcategoryid],function(error,result){
          
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