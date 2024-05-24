import userModel from "../../models/userModel.js";
import validadeUserToUpdate from '../../models/userModel.js'

const update = async (req, res) => {
  const { id, name, email, avatar } = req.body;

  if (id !== req.userLogged.id) {
    return res.status(401).json({ error: "voce não pode atualizar os outros :(" });
  }


  const result = userModel.validadeUserToUpdate(id, name, email, avatar);
  console.log(result);
  if (!result.success) {
    const errorFormated = result.error.flatten();
    return res.status(400).json({
      error: "dados de atualização invalidos",
      fields: errorFormated.fieldErrors,
    });
  }

  const user = await userModel.update(id, name, email, avatar);
  return res.status(200).json({
    success: `o Usuario ${id} ta ai editado`,
    user,
  });
};

export default update;
