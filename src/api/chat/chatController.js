
const sendMessage = (req, res) => {
  console.log("hit")
  res.status(201).json({ message: "goood" });
}

module.exports = {
  sendMessage
}