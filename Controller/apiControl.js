const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const arr = []

// secretKey = "asldfhkasdfhiasdjuhfiasebfasodhfasdfsdf"

const signup = (req, res) =>{
    const detail = req.body
    const dupicate = arr.find(item => item.Email == detail.Email)
    if (dupicate) {
        return res.send({msg: "user is already registered with this email....."})
    }
    const hashPassword = bcrypt.hashSync(detail.Password, 10)
    detail.Password = hashPassword
    arr.push(detail)
    console.log(arr)
    const token = jwt.sign({detail}, process.env.secretKey, {expiresIn:"300s"})
    res.status(200).send({msg: "user registered successfully.....", detail:detail, token: token})
}

const login = (req, res) =>{
    const details = req.body
    const find = arr.find(item => item.Email == details.Email)
    if (!find) {
        return res.send({msg: "you are not a registered user...."})
    }
    const validpass = bcrypt.compareSync(details.Password, find.Password)
    if (!validpass) {
        return res.send({msg:"your email and password does not match..."})
    }
    const token = jwt.sign({details}, process.env.secretKey, {expiresIn:"300s"})
    res.status(200).send({msg:"user is successfully logged in.............", details: find ,token: token})
}

module.exports = {signup, login}