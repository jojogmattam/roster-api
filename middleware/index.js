function validateFields(req, res, next) {
  const { name, location } = req.body;
  if (!name || !location) {
    return res.status(400).json({
      message: "Please provide a name and location.",
    });
  }
  next();
}
module.exports = {
  validateFields
};
