import userModel from "../../models/userModel.js";

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.getById(parseInt(id));
    return res.status(200).json({
      success: `Usuario com o ID ${id} foi encontrado com sucesso.`,
      user
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error."
    });
  }
};

export default getById;