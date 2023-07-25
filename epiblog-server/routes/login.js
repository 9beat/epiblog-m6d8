import express from 'express';
import UsersModel from '../models/users.js';
const router = express.Router();
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken';

// POST
router.post('/login', async (req, res) => {
  
  const user = await UsersModel.findOne({
    email: req.body.email,
  });

  if(!user) {
    return res.status(404).send({
      message: "Wrong email or password"
    });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if(!validPassword) {
    return res.status(400).send({
      message: "Wrong email or password"
    })
  }

  const token = jsonwebtoken.sign({email: user.email}, process.env.SECRET_JWT_KEY, {expiresIn: "24h"})

  res.header('Authorization', token).status(200).send({
    token,
    message: "Login successful"
  })

});

export default router;
