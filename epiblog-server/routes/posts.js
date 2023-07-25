const router = express.Router();
import express from 'express';
import PostModel from '../models/posts.js';

// GET ALL
router.get('/posts', async (req, res) => {

    const { page = 1, pageSize = 8 } = req.query

    try {
        const posts = await PostModel.find()
            .limit(pageSize)
            .skip((page - 1) * pageSize)

        const totalPosts = await PostModel.count()
        
        res.status(200).send({
            count: totalPosts,
            currentPage: +page,
            totalPage: Math.ceil(totalPosts / pageSize),
            posts
        })
    } catch (err) {
        res.status(500).send({
                message: `Server internal error${err.message}`
            })
    }
})

// GET ONE
router.get('/posts/:title', async (req, res) => {
    try {
        const { title } = req.params
        const postByTitle = await PostModel.find({
            title: {
                $regex: `.*${title}.*`,
                $options: 'i'
            }
        })
        if (!postByTitle || postByTitle.length === 0) {
            return res.status(404).send({
                    message: "This post does not exist"
                })
        }
        res.status(200).send({
            message: "Post found successfully",
            postByTitle
        })
    } catch (err) {
        res.status(500).send({
                message: `Server internal error${err.message}`
            })
    }
})

// CREATE POST
router.post('/posts', async (req, res) => {
    const post = new PostModel({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        rate: req.body.rate
    })

    try {
        await post.save()
        res.status(201).send({
                message: "Post successfully saved on database"
            })
    } catch (err) {
        res.status(500).send({
                message: `Error sending post${err.message}`
            })
    }
})

//PATCH
router.patch('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const postExist = await PostModel.findById(id)
    if (!postExist) {
        return res.status(404).send({
            message: "This post does not exist"
        })
    }
    try {
        const dataUpdated = req.body;
        const options = { new: true }
        const result = await PostModel.findByIdAndUpdate(id, dataUpdated, options)
        res.status(200).send({
            message: "Post successfully updated",
            result
        })
    } catch (err) {
        res.status(500).send({
                message: `Server internal error${err.message}`
            })
    }
})

//DELETE
router.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const postExist = await PostModel.findByIdAndDelete(id)
        if (!postExist) {
            return res.status(404).send({
                message: "This post does not exist"
            })
        }
        res.status(200).send({
            message: `Post ${id} successfully deleted from database`
        })
    } catch (err) {
        res.status(500).send({
                message: `Server internal error${err.message}`
            })
    }
})

export default router