const express = require("express")
const router = express.Router()
const qController = require("../controllers/qController")

// Register Endpoint 
router.post("/register", async (req, res) => {
    console.log(req.body)
    const response = await qController.register(req, res)
    res.status(200).send(response)
})

router.get("/detail/:name", qController.detail);
//do i need async here or in post^ if i put it in the qController par

router.get("/test", async (req, res) => {
    res.send("Hello, testing12345!")
})

module.exports = router