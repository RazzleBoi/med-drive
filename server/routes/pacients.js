const {verifyTokenAndDoctor, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");
const CryptoJS = require("crypto-js");
const router = require("express").Router();
const User = require("../models/User");
const Pacient = require("../models/Pacient");

// // DELETE
// router.delete("/:id", verifyTokenAndDoctor, async (req, res) => {
//     try {
//         await Pacient.findOne({doctor: res.body.doctor_id, pacient: res.body.pacient_id});
//         res.status(200).json("Pacient has been deleted");
//     }
//     catch (err) {
//         res.status(500).json(err);
//     }
// });


// GET one
router.get("/:id", verifyTokenAndDoctor, async (req, res) => {
    try {
        const pacient = await Pacient.findOne({doctor: req.body.doctor, pacient: req.params.id}).populate({path: "pacient", model: "User"});
        const { ...others} = pacient._doc;
        res.status(200).json(others);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// POST addOne
router.post("/", verifyTokenAndDoctor, async (req, res) => {
  const newPacient = new Pacient(req.body);

    try {
        const savedPacient = await newPacient.save();
        res.status(200).json(savedPacient);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// GET ALL Pacients
router.get("/", verifyTokenAndDoctor,async (req, res) => {
    const query = req.query.new;
    try {
      console.log(req.params)
        const pacients = query ? await Pacient.find({doctor: req.query.doctor}).populate({path: "pacient", model: "User"})
            : await Pacient.find({doctor: req.query.doctor}).populate({path: "pacient", model: "User"});
        res.status(200).json(pacients);
    }
    catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;