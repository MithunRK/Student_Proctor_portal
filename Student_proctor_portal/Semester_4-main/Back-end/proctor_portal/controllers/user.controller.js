const User = require("../models/user")

exports.create = (req, res) => {
    if(req.body.gid === "" && req.body.role === "")
        res.status(404).send({
            message:"Cannot sent empty request!"
        })
    
    const user = new User({
        gid: req.body.gid,
        role:req.body.role,
        profile: req.body.profile,
        details: req.body.details
    })
    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occured while creating user"
            })
        else res.send(data)
    })
}



exports.findUser = (req, res) => {
    User.findUser(req.params.gid, (err, data) => {
        if (err){        
            if(err.type === "not_found")
                res.status(404).send({
                    message: `Not found user`
                })
            else
                res.status(500).send({
                    message: `Some error in retriving user`
                })
            return
        }
        res.send(data)
    })
}
