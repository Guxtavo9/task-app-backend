import taskModel from "../../models/taskModel.js";
// import { zodErrorFormat } from "../../helpers/zodErrorFormat.js";
import bcrypt from "bcrypt";

const create = async (req, res) => {
  try {
    const IdUser = +req.params.id
    const { title, description, isChecked, } = req.body;

    const result = taskModel.validadeTaskToCreate(title, description, isChecked, IdUser);
    console.log(result);
    if (!result.success) {
      const errorFormated = result.error.flatten();
      return res.status(400).json({
        error: "dados de cadastro invalidos",
        fields: errorFormated.fieldErrors,
      });
    }
    const task = await taskModel.create(result.data.title, result.data.description, result.data.isChecked, result.data.IdUser);
    return res.status(200).json({
      success: `o Usuario ${task.id} ta ai criado`,
      task,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: 'Opsss erro no servidor, tente novamente!'
    })
  };

}

export default create;
