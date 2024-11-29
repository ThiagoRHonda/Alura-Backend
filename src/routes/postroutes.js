import express from "express";
import multer from "multer";
import cors from "cors";
import {
  listarTodosPosts,
  postarNovoPost,
  uploadImagem,
  listarTodosLivros,
  postarNovoLivro,
  atualizarNovoPost,
  listarPost,
} from "../controlers/postscontroler.js";

// Configura o armazenamento do Multer para uploads de imagens no Windows
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Especifica o diretório para armazenar as imagens enviadas
    cb(null, "uploads/"); // Substitua por seu caminho de upload desejado
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo por simplicidade
    cb(null, file.originalname); // Considere usar uma estratégia de geração de nomes únicos para produção
  },
});

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200,
};

const upload = multer({ dest: "./uploads", storage });

const routes = (app) => {
  app.use(express.json());
  app.use(cors(corsOptions));

  app.get("/posts", listarTodosPosts);
  app.get("/posts/:id", listarPost);
  app.post("/posts", postarNovoPost);
  app.post("/upload", upload.single("imagem"), uploadImagem);
  app.put("/upload/:id", atualizarNovoPost);

  app.get("/livros", listarTodosLivros);
  app.post("/livros", postarNovoLivro);
};

export default routes;
