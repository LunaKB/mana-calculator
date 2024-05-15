const express = require("express");
const cors = require("cors");

const app = express();
const bodyParser = require('body-parser')
const port = 3000;

function setCorsHeaders(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}
app.use(cors());
app.use(setCorsHeaders);

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

const affinityConflictRouter = require("./sql_server/routes/affinity-conflicts.routes")
const casterRouter = require("./sql_server/routes/caster.routes")
const codaRouter = require("./sql_server/routes/coda.routes")
const customSpellRouter = require("./sql_server/routes/custom-spell.routes")
const primaryEffectRouter = require("./sql_server/routes/primary-effect.routes")
const secondaryEffectRouter = require("./sql_server/routes/secondary-effect.routes")
const spellLevelRouter = require("./sql_server/routes/spell-level.routes")
const spellBaseRouter = require("./sql_server/routes/spell-base.routes")
const testRouter =  require("./sql_server/routes/test-routes")

app.use("/affinity-conflicts", affinityConflictRouter)
app.use("/casters", casterRouter)
app.use("/codas", codaRouter)
app.use("/custom-spells", customSpellRouter)
app.use("/primary-effects", primaryEffectRouter)
app.use("/secondary-effects", secondaryEffectRouter)
app.use("/spell-levels", spellLevelRouter)
app.use("/spell-bases", spellBaseRouter)
app.use("/test", testRouter)

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

// set port, listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});