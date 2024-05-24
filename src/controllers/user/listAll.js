import userModel from "../../models/userModel.js";

const listAll = async (req, res) => {
  try {
    const users = await userModel.getAll();
    return res.json({
      success: "Usuarios listados com sucesso",
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'o servidor deu erro ae, paizão',
    })
  }
};

export default listAll;
