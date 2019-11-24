var  notesModel =  require("../models/notes");

class user{

    putData = async(userInfo) =>{
       
        let {title,content,id,email} = userInfo;

        let data;

        let objInDb = {};

        if(id){

            objInDb = await this.getData({item});

        } 

        if(objInDb["data"] && objInDb["data"][0]){

            data = objInDb["data"][0];

            data.title = title;

            data.content = content;

            data.email = email;

        }else{

             data = new notesModel({
                title,
                content,
                email
            })

        }
        try{
           let dataAdd = await data.save();

           return({
                type:"success",
                data: dataAdd
           })

        }catch(error){

            return ({
                type:"fail",
                data:error
            })

        }
    }

    getData = async(query,options) =>{
        try{

            let data ;

            if(options && query){
                // Animals.find({}, {limit:10, skip:20} function (err, animals) {   
                    data = await notesModel.find(query).skip(options["offset"]).limit(options["limit"]);

            }else if(query){

                data = await notesModel.find(query);

            }else{

                data = await notesModel.find();
            
            }

            return ({
                type: "success",
                data
            });

        }catch(err){

            return ({
                type: "fail",
                data : err,
            })

        }
    }

    deleteData = async(dataItem) =>{

        let {id,email} = dataItem;

        let data = {}

        let delObj = await notesModel.remove({ _id: id, email: email }, function(err) {
            
            if (!err) {
                    data.type = 'success';
            }
            else {
                    data.type = 'fail';
            }

        });

        return({data});
    }

}

module.exports = new user();