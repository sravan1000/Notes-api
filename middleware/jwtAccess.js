var userController = require("../controller/userController");
var jwt = require("jsonwebtoken");
var constants = require("../constants");

 var jwtAccess = function (req, res, next) {

        let bearerHeader = req.headers["authorization"];

        if(bearerHeader && bearerHeader.split(" ")[1]){

            const token = bearerHeader.split(" ")[1];

            jwt.verify(token,constants.secretKey,(err, data)=>{

                if(err){

                    res.send({
                        type: "fail",
                        data: "extracting data from token failed, Please re login"
                    })

                }else{

                    req.user = data.user;

                    req.token = token;

                    next();
                }

            })

        }else{

            //validate req by redirecting to login and get email and pass
            if(Object.keys(req.body).length == 0){

                res.send({
                    type: "fail",
                    data: "Please relogin"
                })

            }else{

                let data =  JSON.parse(Object.keys(req.body)[0]);

                userController.validate(data).then((result,err)=>{

                    if(err){

                        res.send({
                            type:"fail",
                            data: "validation of credentials failed"
                        }) 

                    }else{

                        let user = {
                            email : data.email
                        }
            
                        jwt.sign({user},constants.secretKey,(tokenErr,token) => {

                            if(tokenErr){

                                res.send({
                                    type:"fail",
                                    data: "error generating token"
                                }) 

                            }else{

                                req.token = token;

                                req.user = user;

                                next();

                            }

                        })

                    }
                });
                
            }

        }
            

    }


module.exports = jwtAccess;