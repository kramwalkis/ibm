const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const querySchema = new Schema({
  query: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
    default: 1,       
  }
});

const query = mongoose.model("queryModel", querySchema);

module.exports = query;
