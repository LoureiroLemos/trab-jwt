const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

const secretKey = process.env.SECRET_KEY;

const login = (request, response) => {
  const { username, password } = request.body;

  if (username === "professor.lucas" && password === "1234") {
    const payload = {
      sub: username,
      name: "Lucas José de Souza",
      iat: Math.floor(Date.now() / 1000),
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: "1d" });
    return response.json({ message: "Login bem-sucedido!", token });
  }

  response.status(401).json({ message: "Credenciais inválidas" });
};

const protectedContent = (request, response) => {
  const token = request.headers["authorization"];

  if (!token) {
    return response.status(403).json({ message: "Token não fornecido" });
  }

  try {
    const bearerToken = token.split(" ")[1];
    const decoded = jwt.verify(bearerToken, secretKey);

    response.json({ message: "Conteúdo protegido acessado!", user: decoded });
  } catch (error) {
    return response.status(403).json({ message: "Token inválido ou expirado" });
  }
};

const protectedContent2 = (request, response) => {
  const token = request.headers["authorization"];

  if (!token) {
    return response.status(403).json({ message: "Token não fornecido" });
  }

  try {
    const bearerToken = token.split(" ")[1];
    const decoded = jwt.verify(bearerToken, secretKey);

    enviarContatosMock(request, response);
    //response.json({ message: "Essa é a rota protegida 2!", user: decoded });
  } catch (error) {
    return response.status(403).json({ message: "Token inválido ou expirado" });
  }
};

const protectedContent3 = (request, response) => {
  const token = request.headers["authorization"];

  if (!token) {
    return response.status(403).json({ message: "Token não fornecido" });
  }

  try {
    const bearerToken = token.split(" ")[1];
    const decoded = jwt.verify(bearerToken, secretKey);

    enviarContatosMock(request, response);
    //response.json({ message: "Essa é a rota protegida 3!", user: decoded });
  } catch (error) {
    return response.status(403).json({ message: "Token inválido ou expirado" });
  }
};

const enviarContatosMock = (request, response) => {
  const filePath = path.join(__dirname, '../mockContacts.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return response.status(500).json({ error: 'Erro ao ler o arquivo JSON' });
    } else {
      try {
        const jsonData = JSON.parse(data);
        return response.json(jsonData);
      } catch (parseError) {
        return response.status(500).json({ error: 'Erro ao parsear o arquivo JSON' });
      }
    }
  });
};

module.exports = { login, protectedContent, protectedContent2, protectedContent3 };
