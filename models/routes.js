const express = require("express")
const Post = require("./Hero") // new
const router = express.Router()

// Get all heroes
router.get("/heroes", async (req, res) => {
	const heroes = await Post.find({})
	res.send(heroes)
})

module.exports = router