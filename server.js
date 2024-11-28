import express from "express";
import routes from "./src/routes/postroutes.js";

const posts = [
  {
    id: 1,
    descricao: "Uma foto teste",
    imagem: "https://placecats.com/millie/300/150",
  },
  {
    id: 2,
    descricao: "Gato brincando com um novelo de lã",
    imagem: "https://placekitten.com/400/300",
  },
  {
    id: 3,
    descricao: "Paisagem com um gato",
    imagem: "https://picsum.photos/id/237/400/300",
  },
  {
    id: 4,
    descricao: "Gato preto em uma noite escura",
    imagem: "https://source.unsplash.com/random/400x300/?cat,dark",
  },
  {
    id: 5,
    descricao: "Gato dormindo em uma caixa",
    imagem: "https://loremflickr.com/400/300/kitten",
  },
  {
    id: 6,
    descricao: "Gato olhando pela janela",
    imagem: "https://unsplash.com/photos/260740/download",
  },
];

const app = express();
app.use(express.static("uploads"));
routes(app);

app.listen(process.env.PORT, () => {
  console.log("Servidor escutando...");
});

/* function buscarPostPorId(id) {
  return posts.findIndex((post) => {
    return post.id === Number(id);
  });
}

app.get("/posts/:id", (req, res) => {
  const index = buscarPostPorId(req.params.id);
  res.status(200).json(posts[index]);
}); */
