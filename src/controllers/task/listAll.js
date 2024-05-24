import taskModel from "../../models/taskModel.js";

const listAll = async (req, res) => {
  try {

    const IdUser = +req.params.id
    const tasks = await taskModel.getAll({ user: IdUser });
    return res.json({
      success: "tarefas listadas com sucesso",
      tasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'o servidor deu erro ae, paizão',
    })
  }
};

export default listAll;
