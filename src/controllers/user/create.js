// import userModel from "../../models/userModel.js";
// import { v1 as uuidv1 } from 'uuid';
// import bcrypt from "bcrypt";
// import { zodErrorFormat } from "../../helpers/zodErrorFormat.js";

// const uuidName = async () => {
//   try {
//     const uuidName = await fetch('https://www.uuidtools.com/api/generate/timestamp-first/count/1')
//     const name = uuidName.data
//     await console.log(name)
//     return name
//   } catch (error) {
//     console.log('Error ao gerar nome ' + error.message)
//   }
// }

// const create = async (req, res) => {
//   try {
//     // const { email, pass } = req.body;
//     const email = 'test@test.com'
//     const pass = uuidv1()
//     const name = uuidv1()
//     const result = userModel.validadeUserToCreate(name, email, pass);
//     console.log(result);
//     if (!result.success) {
//       const errorFormated = result.error.flatten();
//       return res.status(400).json({
//         error: "dados de cadastro invalidos",
//         fields: errorFormated.fieldErrors,
//       });
//     }
//     result.data.pass = await bcrypt.hash(result.data.pass, 10);

//     const user = await userModel.create(result.data.name, result.data.email, result.data.pass);
//     return res.status(200).json({
//       success: `o Usuario ${user.id} ta ai criado`,
//       user,
//     });
//   } catch (error) {
//     console.log(error)
//     return res.status(500).json({
//       error: 'Opsss erro no servidor, tente novamente!'
//     })
//   };

// }

///

import userModel from "../../models/userModel.js";
// import { zodErrorFormat } from "../../helpers/zodErrorFormat.js";
import bcrypt from "bcrypt";

const create = async (req, res) => {
  try {
    const user = req.body;
    const result = userModel.validadeUserToCreate(user);
    console.log(result);
    if (!result.success) {
      const errorFormated = result.error.flatten();
      return res.status(400).json({
        error: "dados de cadastro invalidos",
        fields: errorFormated.fieldErrors,
      });
    }
    result.data.pass = await bcrypt.hash(result.data.pass, 10);

    const newUser = await userModel.create(result.data);
    return res.status(200).json({
      success: `o Usuario ${newUser.id} ta ai criado`,
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Opsss erro no servidor, tente novamente!",
    });
  }
};

export default create;

///

// export default create;
