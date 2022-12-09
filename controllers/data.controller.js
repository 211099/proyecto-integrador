import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { getDatas } from "../models/data.models.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const data = dotenv.config({
  path: path.resolve("archivo", `../environments/.env.${process.env.NODE_ENV}`),
});

const data_view = async function (req, res) {
  getDatas.Data
    .findAll()
    .then((r) => {
      res.send(r);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const data_create = async function (req, res) {

  getDatas.Data
    .create(
      {
        lluvia: req.body.lluvia,
        temperatura: req.body.temperatura,
        humedad: req.body.humedad,
        presionA: req.body.presionA,
        metros: req.body.metros,
        rayosUv: req.body.rayosUv,
        fotoResistencia: req.body.fotoResistencia,
      },
      {
        fields: ["lluvia", "temperatura", "humedad", "presionA", "metros", "rayosUv", "fotoResistencia"],
      }
    )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
const data_update = (req, res) => {
  let id = req.body.id;
  let temperatura = req.body.temperatura;
  let humedad=req.body.humedad
  let ultrasonico = req.body.ultrasonico;
  let luminosidad = req.body.luminosidad;
  let newDatas = { temperatura, humedad, ultrasonico, luminosidad };
  getDatas.Data
    .findOne({ where: { id: id } })

    .then((r) => {
      r.update(newDatas);
      res.status(200).json({ message: "update successfully" });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};


const data_delete = async function (req, res) {
  getDatas.Data
    .destroy({ where:{},truncate:true})
    .then((r) => {
      res.status(200).json({ message: "Deleted successfully" });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};



export const dataController = {
  data_create,
  data_update,
  data_view,
  data_delete
};