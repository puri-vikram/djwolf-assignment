const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');

const InvoiceSchema = mongoose.Schema({
  invoiceNumber: {
    type: Number,
    required: true
  },
  invoiceName: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    unique: true,
    required: true
  },
  status: {
    type: String,
    enum: ['paid', 'pending'],
    required: true
  }
});

module.exports = mongoose.model("invoice", InvoiceSchema);