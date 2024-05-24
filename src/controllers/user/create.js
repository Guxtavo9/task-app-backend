import userModel from "../../models/userModel.js";
// import { zodErrorFormat } from "../../helpers/zodErrorFormat.js";
import bcrypt from "bcrypt";

const create = async (req, res) => {
  try {
    const { name, email, pass } = req.body;
    const result = userModel.validadeUserToCreate(name, email, pass);
    console.log(result);
    if (!result.success) {
      const errorFormated = result.error.flatten();
      return res.status(400).json({
        error: "dados de cadastro invalidos",
        fields: errorFormated.fieldErrors,
      });
    }
    result.data.pass = await bcrypt.hash(result.data.pass, 10);

    const user = await userModel.create(result.data.name, result.data.email, result.data.pass);
    return res.status(200).json({
      success: `o Usuario ${user.id} ta ai criado`,
      user,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: 'Opsss erro no servidor, tente novamente!'
    })
  };

}

export default create;
