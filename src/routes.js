const express = require("express");
const { login, protectedContent, protectedContent2, protectedContent3 } = require("./controllers/authController");

const router = express.Router();

// Rota pública
router.get("/", (request, response) => {
  response.json({ message: "Endpoint que não exige autenticação!" });
});

// Rota de login
router.post("/login", login);

// Rota protegida
router.get("/protected", protectedContent);

//rota protegida 2
router.get("/protected2", protectedContent2);

//rota protegida 3
router.get("/protected3", protectedContent3);

module.exports = router;
