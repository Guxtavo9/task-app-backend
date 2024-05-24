import userModel from "../../models/userModel.js";
// import { zodErrorFormat } from "../../helpers/zodErrorFormat.js";
import bcrypt from "bcrypt";

const create = async (req, res) => {
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

  result.pass = await bcrypt.hash(result.pass, 10);

  const user = await userModel.create(name, email, pass);
  return res.status(200).json({
    success: `o Usuario ${user.id} ta ai criado`,
    user,
  });
};

export default create;
