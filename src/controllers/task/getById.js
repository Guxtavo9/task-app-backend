import userModel from "../../models/userModel.js";

const getById = async (req, res) => {
  const id = req.params.id;
  const user = await userModel.getById(parseInt(id))
  return res.status(200).json({
    success: `o Usuario ${id} ta ai`,
    user
  });
};

export default getById