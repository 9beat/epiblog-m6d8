import express from 'express'
import UsersModel from '../models/users.js'
const router = express.Router()
import bcrypt from 'bcrypt'
import logger from '../middlewares/logger.js'
// import verifyToken from '../middlewares/verifyToken.js'


//GET
router.get('/users', logger ,async(req,res)=>{
    const {page=1, pageSize=8}=req.query
    try {
        const users = await UsersModel.find()
        .limit(pageSize)
        .skip((page-1)*pageSize)

        const totalUsers = await UsersModel.count()

        res.status(200).send({
            count:totalUsers,
            currentPage: +page,
            totalPages: Math.ceil(totalUsers/pageSize),
            users
        })
    } catch (err) {
        res.status(500).send({
            message:`Server internal error${err.message}`
        })
    }
})

//POST
router.post('/users', async(req,res)=>{
    //ash pw
    const genSalt = await bcrypt.genSalt(10)
    const hashPW = await bcrypt.hash(req.body.password,genSalt)

    const user = new UsersModel({
        userName: req.body.userName,
        email: req.body.email,
        password: hashPW
    })
    try {
        const userExist = await UsersModel.findOne({email:req.body.email})
        if (userExist){
            return res.status(409).send({
                message:'This email is already registered'
            })
        }
        const newUser = await user.save();
        res.status(201).send({
            message: 'user registered',
            payload: newUser
        })
    } catch (err) {
        res.status(500).send({
            message:`Server internal error${err.message}`
        })
    }
})

//PATCH
router.patch('/users/:id', async(req,res)=>{
    const {id} = req.params;
    const userExist = await UsersModel.findById(id)
    if (!userExist){
        return res.status(404).send({
            message:`User not found`
        })
    }
    try {
        const dataUpdated = req.body;
        const options = {new: true}
        const result = await UsersModel.findByIdAndUpdate(id, dataUpdated, options)
        res.status(200).send({
            message: 'User updated successfully',
            payload: result
        })
    } catch (err) {
        res.status(500).send({
            message:`Server internal error${err.message}`
        })
    }
})

//DELETE
router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const userExist = await UsersModel.findByIdAndDelete(id)
        if (!userExist) {
            return res.status(404).send({
                message: "User does not exist"
            })
        }
        res.status(200).send({
            message: `User ${id} successfully deleted from database`
        })
    } catch (err) {
        res.status(500).send({
                message:`Server internal error${err.message}`
            })
    }
})


export default router