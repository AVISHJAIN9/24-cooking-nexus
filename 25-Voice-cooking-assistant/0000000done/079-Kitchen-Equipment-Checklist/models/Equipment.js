const mongoose = require('mongoose');
const equipmentSchema = mongoose.Schema({
  name: { type: String, required: [true, 'Please add a name'] },
  category: { type: String, required: true, enum: ['Appliances', 'Cookware', 'Storage', 'Utensils', 'Safety'] },
  status: { type: String, default: 'Functional', enum: ['Functional', 'Needs Repair', 'Broken'] },
  quantity: { type: Number, default: 1 }
}, { timestamps: true });
module.exports = mongoose.model('Equipment', equipmentSchema);
