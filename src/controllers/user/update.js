import userModel from "../../models/userModel.js";
import validadeUserToUpdate from '../../models/userModel.js'

const update = async (req, res) => {
  try {
    const user = req.body
    user.id = +req.params.id
    if (id !== req.userLogged.id) {
      return res.status(401).json({ error: "voce não pode atualizar os outros :(" });
    }


    const result = userModel.validadeUserToUpdate(user);
    console.log(result);
    if (!result.success) {
      const errorFormated = result.error.flatten();
      return res.status(400).json({
        error: "dados de atualização invalidos",
        fields: errorFormated.fieldErrors,
      });
    }

    const userUpdated = await userModel.update(user);
    return res.status(200).json({
      success: `o Usuario ${id} ta ai editado`,
      user: userUpdated,
    });
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({
      error: "Ocorreu um erro ao atualizar o usuário" 
    })
  }
}

export default update;


