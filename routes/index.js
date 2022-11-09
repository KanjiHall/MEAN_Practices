const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const routes = require("./routes") 

mongoose.connect('mongodb://127.0.0.1:27017/HeroDB', { useMongoClient: true })
        .then(() => {
          const app = express()
          app.use("/api", routes)
          app.listen(3000, () => {
            console.log("Server has started!")
          })
        });

module.exports = router;
