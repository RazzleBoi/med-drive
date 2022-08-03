const mongoose = require("mongoose");

const drugstoreSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, unique: true},
        short_description: {type: String, maxLength: 200},
        address: {type: String},
        long: {type: Number, required: true, unique: true},
        lat: {type: Number, required: true, unique: true},
        image: {type: String},
        rating: {type: Number},
        meds: [{type: Schema.Types.ObjectId, ref: 'Medicine'}],
    },
    {timestamps: true}
);

module.exports = model("Drugstore", drugstoreSchema);