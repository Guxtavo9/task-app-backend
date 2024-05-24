import userModel from "../../models/userModel.js";
const removeUser = async (req, res) => {
  const id = parseInt(req.params.id);

  if (id !== req.userLogged.id) {
    return res.status(401).json({ error: "voce não pode matar os outros :(" });
  }

  const morte = await prisma.userModel.deletear(id);

  return res.json({
    message: `O Usuario ${id} Morreu`,
  });
  morte;
};
export default removeUser;
