import taskModel from "../../models/taskModel.js";

const getById = async (req, res) => {
  const id = req.params.id;
  const task = await taskModel.getById(parseInt(id))
  return res.status(200).json({
    success: `a tarefas ${id} ta ai`,
    task
  });
};

export default getById