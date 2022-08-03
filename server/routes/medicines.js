const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");
const router = require("express").Router();
const User = require("../models/User");
const Medicine = require("../models/Medicine");

// CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
   const newMedicine = new Medicine(req.body);

    try {
        const savedMedicine = await newMedicine.save();
        res.status(200).json(savedMedicine);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedMedicine = await Medicine.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        });
        res.status(200).json(updatedMedicine);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Medicine.findByIdAndDelete(req.params.id);
        res.status(200).json("Medicine has been deleted");
    }
    catch (err) {
        res.status(500).json(err);
    }
});


// GET
router.get("/:id", async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);
        res.status(200).json(medicine);
    }
    catch (err) {
        res.status(500).json(err);
    }
});


// GET ALL MEDS
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let medicines;
        if (qNew) {
            if (!qCategory) {
                medicines = await Medicine.find().sort({_id: -1}).limit(5);
            }
            else {
                medicines = await Medicine.find({
                    categories: {
                        $in: [qCategory]
                    }
                }).sort({_id: -1}).limit(5);
            }
        }
       else {
            if (!qCategory) {
                medicines = await Medicine.find();
            }
            else {
                medicines = await Medicine.find({
                    categories: {
                        $in: [qCategory]
                    }
                });
            }
        }
        res.status(200).json(medicines);
    }
    catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;