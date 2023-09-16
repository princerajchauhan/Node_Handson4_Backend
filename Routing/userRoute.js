const route = require("express").Router()
const {signup, login} = require("../Controller/apiControl")

route.post("/signup", signup)
route.post("/login", login)

module.exports = route