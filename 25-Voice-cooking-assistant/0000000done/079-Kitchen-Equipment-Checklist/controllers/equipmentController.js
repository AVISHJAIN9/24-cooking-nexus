const Equipment = require('../models/Equipment');
const getEquipment = async (req, res) => {
  const items = await Equipment.find();
  res.status(200).json(items);
};
const addEquipment = async (req, res) => {
  const item = await Equipment.create(req.body);
  res.status(201).json(item);
};
module.exports = { getEquipment, addEquipment };
