const Humans = require("./models.js");

module.exports = {
    getAllHumans: (req,res)=>Humans.find({})
                                .then(data=>(console.log("The data is: ", data)||res.json(data)))
                                .catch(errs=>res.json(errs)),
}