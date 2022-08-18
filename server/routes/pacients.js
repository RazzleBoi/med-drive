const {
  verifyTokenAndDoctor,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const CryptoJS = require("crypto-js");
const router = require("express").Router();
const User = require("../models/User");
const Pacient = require("../models/Pacient");
const { populate } = require("../models/Pacient");

// DELETE
router.delete("/:id", verifyTokenAndDoctor, async (req, res) => {
  try {
    console.log(req.query);
    const pacient = await Pacient.findByIdAndDelete(req.query.id);
    if (pacient == null) res.status(400).json("Pacient non existent");
    else res.status(200).json("Pacient has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT
router.put("/:id", verifyTokenAndDoctor, async (req, res) => {
  try {
    //returns the OLD record
    const pacient = await Pacient.findByIdAndUpdate(req.params.id, req.body);
    if (pacient == null) res.status(400).json("Pacient non existent");
    else {
      console.log(pacient);
      const populatedPacient = await pacient.populate({
        path: "pacient",
        model: "User",
      });
      res.status(200).json(populatedPacient);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one
router.get("/:id", verifyTokenAndDoctor, async (req, res) => {
  try {
    const pacient = await Pacient.findOne({
      doctor: req.body.doctor,
      pacient: req.params.id,
    }).populate({ path: "pacient", model: "User" });
    const { ...others } = pacient._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST addOne
router.post("/", verifyTokenAndDoctor, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.pacient_email });
    const pacient = await Pacient.findOne({
      pacient: user._id,
      doctor: req.body.doctor,
    });
    if (pacient) res.status(400).json("Pacient already exists");
    else {
      const newPacient = new Pacient({
        pacient: user._id,
        doctor: req.body.doctor,
      });
      const savedPacient = await newPacient.save();
      const populatedPacient = await savedPacient.populate({
        path: "pacient",
        model: "User",
      });
      console.log(savedPacient);
      res.status(200).json(savedPacient);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL Pacients
router.get("/", verifyTokenAndDoctor, async (req, res) => {
  const query = req.query.new;
  try {
    console.log(req.params);
    const pacients = query
      ? await Pacient.find({ doctor: req.query.doctor }).populate({
          path: "pacient",
          model: "User",
        })
      : await Pacient.find({ doctor: req.query.doctor }).populate({
          path: "pacient",
          model: "User",
        });
    res.status(200).json(pacients);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
