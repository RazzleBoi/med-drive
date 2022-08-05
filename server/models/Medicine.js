
const mongoose = require("mongoose");
const medicineSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, unique: true},
        short_description: {type: String, maxLength: 200},
        active_ingredient: {type: String},
        price: {type: Number, required: true},
        image: {type: String},
    },
    {timestamps: true}
);

module.exports = mongoose.model("Medicine", medicineSchema);