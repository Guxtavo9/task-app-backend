import userModel from "../../models/userModel.js";

const removeUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (id !== req.userLogged.id) {
      return res.status(401).json({ error: "voce não pode deletar os outros :(" });
    }

    const result = await prisma.userModel.deletear(id);

    return res.json({
      message: `O Usuario ${id} foi deletado`,
      result
    });
  } catch (error) {
    return res.status(500).json({ error: "Ocorreu um erro ao remover o usuário" });
  }
};

export default removeUser;
