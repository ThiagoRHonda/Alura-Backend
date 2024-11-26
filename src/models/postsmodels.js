import "dotenv/config";
import { ObjectId } from "mongodb";
import conectarAoBancoDeDados from "../config/dbconfig.js";

const conexao = await conectarAoBancoDeDados(process.env.STRING_CONEXAO);

export async function getTodosPosts() {
  //const db = conexao.db("imersao-instabytes");
  //const colecao = db.collection("posts");
  return conexao.db("imersao-instabytes").collection("posts").find().toArray();
}

export async function criarPost(novopost) {
  //const db = conexao.db("imersao-instabytes");
  //const colecao = db.collection("posts");
  return conexao
    .db("imersao-instabytes")
    .collection("posts")
    .insertOne(novopost);
}

export async function atualizarPost(id, novopost) {
  const objId = ObjectId.createFromHexString(id);
  return conexao
    .db("imersao-instabytes")
    .collection("posts")
    .updateOne({ _id: new ObjectId(objId) }, { $set: novopost });
}
