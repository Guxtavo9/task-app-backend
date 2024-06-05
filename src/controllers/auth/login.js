import userModel from "../../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_KEY, TOKEN_EXPIRES_IN } from "../../config.js";
import sessionModel from "../../models/sessionModel.js";

const login = async (req, res) => {
  try {
    const { email, pass } = req.body;

    const result = userModel.validadeUserToLogin({ email, pass });
    if (!result.success) {
      return res.status(400).json({
        error: `Dados de Atualização Inválido`,
        fields: zodErrorFormat(result.error),
      });
    }

    const userFound = await userModel.getByEmail(email);
    if (!userFound) {
      return res.status(401).json({
        error: `Email ou senha inválida`,
      });
    }

    const passIsValid = await bcrypt.compare(pass, userFound.pass);
    if (!passIsValid) {
      return res.status(401).json({
        error: `Email ou senha inválida`,
      });
    }
    if (passIsValid) {
      const token = jwt.sign(
        {
          id: userFound.id,
          name: userFound.name,
        },
        SECRET_KEY,
        {
          expiresIn: TOKEN_EXPIRES_IN,
        }
      );
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      let date = new Date();
      date.setHours(date.getHours() - 3);

      await sessionModel.create({
        userId: userFound.id,
        token,
        createdAt: date,
      });
      return res.json({
        message: "User Logado!",
        token,
        user: {
          id: userFound.id,
          name: userFound.name,
          email: userFound.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Opsss erro no servidor, tente novamente!",
    });
  }
};

export default login;
