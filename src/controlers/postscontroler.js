import {
  getTodosPosts,
  criarPost,
  atualizarPost,
} from "../models/postsmodels.js";
import gerarDescricaoComGemini from "../services/geminiservice.js";
import fs from "fs";

const livrosjson = "livros.json";
const lerLivros = () => {
  const dados = fs.readFileSync(livrosjson, "utf-8");
  return JSON.parse(dados);
};

export async function listarTodosPosts(req, res) {
  const posts = await getTodosPosts();
  res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
  const novoPost = req.body;
  try {
    const postCriado = await criarPost(novoPost);
    res.status(200).json(postCriado);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ Erro: "Erro ao criar o post" });
  }
}

export async function uploadImagem(req, res) {
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: "",
  };

  try {
    const postCriado = await criarPost(novoPost);
    const imagemAtualizada = `uploads/${postCriado.insertedId}.jpg`;
    fs.renameSync(req.file.path, imagemAtualizada);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ Erro: "Erro ao criar o post" });
  }
}

export async function atualizarNovoPost(req, res) {
  const id = req.params.id;
  const urlImagem = `http://localhost:3000/${id}.jpg`;

  try {
    const imageBuffer = fs.readFileSync(`uploads/${id}.jpg`);
    const descricao = await gerarDescricaoComGemini(imageBuffer);

    const postAtualizado = {
      imgUrl: urlImagem,
      descricao: descricao,
      alt: req.body.alt,
    };

    const postCriado = await atualizarPost(id, postAtualizado);
    res.status(200).json(postCriado);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ Erro: "Erro ao criar o post" });
  }
}

export async function listarTodosLivros(req, res) {
  //const livros = ;
  res.status(200).json(await lerLivros());
}

export async function postarNovoLivro(req, res) {
  const livro = JSON.parse(fs.readFileSync(livrosjson));
  const dados = JSON.stringify(livro, null, 2);
  fs.writeFileSync(livrosjson, dados);
  res.status(200).json(req.body);
}
