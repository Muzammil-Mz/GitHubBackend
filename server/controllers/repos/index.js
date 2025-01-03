import express from "express"
import reposModel from "../../models/Repos/Repos.js"

const router=express.Router()

router.get("/getall",async (req,res)=>{
    try {
        let getAll=await userModel.find({})
        res.status(200).json(getAll)
    } catch (error) {
        console.log(error);
        res.status(500).json({error})
    }
})


router.get("/getone/:id",async (req,res)=>{
    try {
        let getOne=req.params.id
        let get=await userModel.findOne({_id:getOne})
        res.status(200).json({msg:get})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.put("/edit/:id", async (req, res)=>{
    try {
        let paramsId = req.params.id;
        let userInp = req.body;
        await userModel.updateOne({_id: paramsId}, {$set: userInp});
        res.status(200).json({msg: `repo updated successfully!`})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
})

router.delete("/deleteone/:id", async (req, res)=>{
    try {
        let paramsId = req.params.id
        await userModel.deleteOne({_id: paramsId})
        res.status(200).json({msg: `repo deleted succesfully!`})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
})


router.delete("/deleteall", async (req, res)=>{
    try {
        await userModel.deleteMany({});
        res.status(200).json({msg: `all repo deleted`})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
})


export default router