var express = require('express');
var router = express.Router();
let userController = require("../controller/userController");
let notesController = require("../controller/notesController");

var jwt = require("jsonwebtoken");
var constants = require("../constants");


router.post('/user',function(req,res){

    let data =  JSON.parse(Object.keys(req.body)[0]);

    userController.putData(data).then((result,err)=>{

            let user = {
                email : data.email
            }

            jwt.sign({user},constants.secretKey,(token,tokenErr) => {

                console.log("err..",tokenErr);
                console.log("token is .",res);

            })

            if(err){

                res.send({
                    type: "fail",
                    data:"got an error"+ err
                });

            }else{

                res.send({
                    type: result["type"],
                    data:result["data"]
                })

            }
    });
});

router.post('/validate',function(req,res){

    let data =  JSON.parse(Object.keys(req.body)[0]);

    userController.validate(data).then((result,err)=>{

            if(err){

                res.send({
                    type: "fail",
                    data:"got an error"+ err
                });

            }else{

                res.send({
                    type: result["type"],
                    data:result["data"],
                    token: req["token"]
                })

            }

    });

});


router.get('/notes',function(req,res){

    let query = {};

    let options = {}

    query["email"] = req.user.email;

    if(req.query && req.query.id){
        query["_id"] =  req.query.id
    }

    if(req.query && req.query.offset){
        options["offset"] = Number(req.query.offset);
        options["limit"] = 10;
    }

    notesController.getData(query,options).then((result,err)=>{

        if(err){

            res.send({
                type: "fail",
                data:"got an error"+ err
            });

        }else{

            res.send({
                type: result["type"],
                data:result["data"]
            })

        }
    });

    
})

router.post('/notes',function(req,res){

    let data =  JSON.parse(Object.keys(req.body)[0]);

    data["email"] = req.user.email;

    notesController.putData(data).then((result,err)=>{

        if(err){

            res.send({
                type: "fail",
                data:"got an error"+ err
            });

        }else{

            res.send({
                type: result["type"],
                data:result["data"]
            })

        }

    });

})

router.post('/deletenotes',function(req,res){

    let data =  JSON.parse(Object.keys(req.body)[0]);

    data["email"] = req.user.email;

    notesController.deleteData(data).then((result,err)=>{

        if(err){

            res.send({
                type: "fail",
                data:"got an error"+ err
            });

        }else{

            res.send({
                type: "success",
                data: "successfully deleted.."
            })

        }

    });

})

module.exports = router;