const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");
const router = require("express").Router();
const Drugstore = require("../models/Drugstore");

// CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
   const newDrugstore = new Drugstore(req.body);

    try {
        const savedDrugstore = await newDrugstore.save();
        res.status(200).json(savedDrugstore);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedDrugstore = await Drugstore.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        });
        res.status(200).json(updatedDrugstore);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Drugstore.findByIdAndDelete(req.params.id);
        res.status(200).json("Drugstore has been deleted");
    }
    catch (err) {
        res.status(500).json(err);
    }
});


// GET
router.get("/:id", verifyToken, async (req, res) => {
    try {
        const drugstore = await Drugstore.findById(req.params.id).populate({path: "meds", model: "Medicine"});
        res.status(200).json(drugstore);
    }
    catch (err) {
        res.status(500).json(err);
    }
});


// GET ALL PRODUCTS
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let drugstores;
        if (qNew) {
            if (!qCategory) {
                drugstores = await Drugstore.find().populate({path: "meds", model: "Medicine"}).sort({_id: -1}).limit(5);
            }
            else {
                drugstores = await Drugstore.find({
                    categories: {
                        $in: [qCategory]
                    }
                }).populate({path: "meds", model: "Medicine"}).sort({_id: -1}).limit(5);
            }
        }
       else {
            if (!qCategory) {
                drugstores = await Drugstore.find().populate({path: "meds", model: "Medicine"});
            }
            else {
                drugstores = await Drugstore.find({
                    categories: {
                        $in: [qCategory]
                    }
                }).populate({path: "meds", model: "Medicine"});
            }
        }
        res.status(200).json(drugstores);
    }
    catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;