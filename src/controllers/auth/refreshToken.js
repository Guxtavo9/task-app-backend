import sessionModel from "../../models/sessionModel.js";
import userModel from "../../models/userModel.js";
import {
  SECRET_KEY,
  TOKEN_EXPIRES_IN,
  DB_TOKEN_EXPIRES_DAYS,
} from "../../config.js";
import jwt from "jsonwebtoken";

const refreshToken = async (req, res) => {
  try {
    let token = false;
    token = req.cookies?.token;
    token = req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        error: `Usuário não autenticado`,
      });
    }

    try {
      console.log(token, SECRET_KEY);
      const { id, name } = jwt.verify(token, SECRET_KEY);
      return res.json({ message: "Token ativo!", user: { id, name } });
    } catch (error) {
      console.log(error);
      if (error.name === "TokenExpiredError") {
        const session = await sessionModel.getByToken(token);
        if (!session) {
          res.clearCookie("token", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
          });
          return res.status(401).json({
            error: "Sessão não encontrada, faça o login novamente!",
            code: "logout",
          });
        }
        const now = new Date();
        now.setDate(now.getDate() - DB_TOKEN_EXPIRES_DAYS);

        if (session.createdAt < now) {
          await sessionModel.deletear(session.userId, token);
          res.clearCookie("token", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
          });
          return res.status(401).json({
            error: "Sessão expirada, faça o login novamente!",
            code: "logout",
          });
        }

        const userFound = await userModel.getById(session.userId);
        if (!userFound) {
          return res.status(500).json({
            error: "Usuário da sessão não encontrado!",
            code: "logout",
          });
        }

        const newToken = jwt.sign(
          {
            id: session.userId,
            name: userFound.name,
          },
          SECRET_KEY,
          {
            expiresIn: TOKEN_EXPIRES_IN,
          }
        );
        res.cookie("token", newToken, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          maxAge: 24 * 60 * 60 * 1000,
        });

        let date = new Date();
        date.setHours(date.getHours() - 3);

        await sessionModel.update({
          id: session.id,
          userId: session.userId,
          token: newToken,
          createdAt: date,
        });

        return res.json({
          message: "Token atualizado com sucesso!",
          newToken,
          user: {
            id: userFound.id,
            name: userFound.name,
            email: userFound.email,
          },
        });
      }
      return res.status(401).json({ error: "Token Inválido.", code: "logout" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Opsss erro no servidor, tente novamente!",
    });
  }
};

export default refreshToken;
