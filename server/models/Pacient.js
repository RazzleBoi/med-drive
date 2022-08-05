
const mongoose = require("mongoose");
const pacientSchema = new mongoose.Schema(
    {
      doctor: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
      pacient: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
      prescribed_ingredients: [{type: String}],
    },
    {timestamps: true}
);

module.exports = mongoose.model("Pacient", pacientSchema);