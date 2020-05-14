const mongoclient = require("mongodb").MongoClient;
const chalk = require("chalk");

const DB = "macarena_ugarte";
const COLLECTION_NAME = "people";

const uri = `mongodb+srv://admin:betp2@cluster0-zdy6w.mongodb.net/${DB}?retryWrites=true&w=majority`;
const client = new mongoclient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let collection = null;
/*
Conectarse al cliente
Crear registro
Ver registros
Editar registro
Ver registro
Eliminar registro
ves registro
*/
function CRUD() {
  return client
    .connect()
    .then((result) => {
      console.log(chalk.green("[+] Cliente Conectado."));
      collection = result.db(DB).collection(COLLECTION_NAME);

      const newPerson = [
        {
          first: "Macarena",
          last: "Ugarte",
          age: 24,
          mail: "macarenasub@gmail.com",
        },
        {
          first: "Juan",
          last: "Rodríguez",
          age: 28,
          mail: "jrodriguez@gmail.com",
        },
      ];
      return collection.insertMany(newPerson);
    })
    .catch((err) => {
      console.log(chalk.red("Error: No se pudo conectar el cliente. "));
      return Promise.reject(err);
    })
    .then(() => {
      console.log(chalk.green("[+] Personas agregadas correctamente"));
      return collection.find().limit(20).toArray();
    })
    .then((inventors) => {
      console.log(chalk.blue("[+] Registros Obtenidos: "));
      inventors.forEach(({ first, last, age, mail }) => {
        console.log("  -", first, last, age, mail);
      });
    })
    .then(() => {
      return collection.updateOne(
        { last: "Ugarte" },
        { $set: { last: "Ugarte Barrone" } }
      );
    })
    .then(() => {
      console.log(chalk.green("[+] Persona editada correctamente"));
      return collection.find().limit(20).toArray();
    })
    .then((inventors) => {
      console.log(chalk.blue("[+] Registros Obtenidos: "));
      inventors.forEach(({ first, last, age, mail }) => {
        console.log("  -", first, last, age, mail);
      });
    })

    .then(() => {
      return collection.deleteOne({ mail: "macarenasub@gmail.com" });
    })
    .then(() => {
      console.log(chalk.green("Persona eliminada correctamente"));
      return collection.find().limit(20).toArray();
    })
    .then((inventors) => {
      console.log(chalk.blue("[+] Registros Obtenidos: "));
      inventors.forEach(({ first, last, age, mail }) => {
        console.log("  -", first, last, age, mail);
      });
    })

    .then(() => {
      return collection.deleteMany();
    })
    .then(() => {
      console.log(chalk.green("[+] Registros eliminados"));
    })
    .catch((err) => {
      console.log(chalk.red("Message: ", err.message));
    });
}

CRUD();
