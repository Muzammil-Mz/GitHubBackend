import express from "express"
import gistModel from "../../models/Gists/Gists.js"
const router=express.Router()

router.get("/getall",async (req,res)=>{
    try {
        let getAll=await gistModel.find({})
        res.status(200).json(getAll)
    } catch (error) {
        console.log(error);
        res.status(500).json({error})
    }
})

router.post("/Creategist", async (req, res)=>{
    try {

        let userInp = req.body

        await gistModel.create(userInp);
        res.status(200).json({msg: `gist  created `})
        
    } catch (error) {
        console.log(error);
        res.status(200).json({msg: error})
    }
})

router.get("/getone/:id",async (req,res)=>{
    try {
        let getOne=req.params.id
        let get=await gistModel.findOne({_id:getOne})
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
        await gistModel.updateOne({_id: paramsId}, {$set: userInp});
        res.status(200).json({msg: `gist updated successfully!`})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
})

router.delete("/deleteone/:id", async (req, res)=>{
    try {
        let paramsId = req.params.id
        await gistModel.deleteOne({_id: paramsId})
        res.status(200).json({msg: `gist deleted succesfully!`})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
})


router.delete("/deleteall", async (req, res)=>{
    try {
        await gistModel.deleteMany({});
        res.status(200).json({msg: `all gist deleted`})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
})


export default router