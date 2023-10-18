const User = require("../../models/Customer");
const mongoose = require("mongoose");


exports.bookAppoitment = async (req,res) =>{
    const { shopId ,isBooked } = req.body;
    var update = {};
    if(shopId === ''){
        update = {
            $unset: {
                ['shopId']: 1,
            },
            $set:{
                isBooked:isBooked
            }
        };
    }
    else{
        update = { 
            $set: { 
                isBooked: isBooked, 
                shopId: shopId 
            } 
        }
    }
    try{
        var data = await User.findByIdAndUpdate(req.Customer_id ,update,{new:true} );
    }catch (error) {
            return res.json({ status: "X", message: error });
    }

        res.json({ status: "OK" ,data });
};