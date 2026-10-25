const Member = require('../models/Member');
const getMemberData = async (id) => {
  return await Member.findById(id).select('-password');
};
module.exports = { getMemberData };
