require("dotenv").config();
const fs = require("fs");
const http = require("http");

// const https = require("https");
// const privateKey = fs.readFileSync(
//   "/etc/letsencrypt/live/tmcoder.ru/privkey.pem",
//   "utf8"
// );
// const certificate = fs.readFileSync(
//   "/etc/letsencrypt/live/tmcoder.ru/cert.pem",
//   "utf8" 
// );
// const ca = fs.readFileSync(
//   "/etc/letsencrypt/live/tmcoder.ru/chain.pem",
//   "utf8" 
// );  
const express = require("express"); 
const sequelize = require("./db");

const PORT = process.env.PORT || 5000;
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
const ErrorHandlingMiddleware = require("./middleware/ErrorHandlingMiddleware");
const path = require("path");
const { getStatus } = require("./service/getStatusDeal");
const { Status, Manager, Contact, Deal, Event } = require("./models/models");
const { getManager } = require("./service/getManager");
const { getContacts } = require("./service/getContacts");
const { getDeals } = require("./service/getDeals");
const { events } = require("./utils/constData");
const app = express();


// const credentials = {
//   key: privateKey,
//   cert: certificate,
//   ca: ca,
// };

app.use(cors());
app.use(express.json());
app.use("/api/static", express.static(path.resolve(__dirname, "files", "images")));
app.use(fileUpload({}));
app.use("/api", router);
app.use(ErrorHandlingMiddleware);






 

const start = async () => {
  // const httpServer = http.createServer(app);
  // const httpsServer = https.createServer(credentials, app);
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    // httpsServer.listen(443, () => console.log(`server started on port 443`));
    app.listen(PORT, ()=> console.log(`server started on port ${PORT}`))
    const checkStatus = await Status.count()
    const checkManager = await Manager.count()
    const checkContacts = await Contact.count()
    const checkDeals = await Deal.count()
    const checkEvents = await Event.count()
    if (checkEvents === 0){
      events.map((i)=>{
        Event.create({
          event: i
        })
      })
    }
    if (checkStatus === 0){
      await getStatus()
    }
    if (checkManager === 0){
      await getManager('start')
    }
    if (checkDeals === 0){
      await getDeals('start')
    }
    setInterval(async()=>{
      await getManager('update')
    }, 10 * 24 * 60 * 60 * 1000)
    if (checkContacts === 0){
      await getContacts('start')
    }
    setInterval(async()=>{
      await getContacts('update') 
    }, 24 * 60 * 60 * 1000)
    setInterval(async()=>{
      await getDeals('update')
    }, 24 * 60 * 60 * 1000)
  } catch (error) { 
    console.log(error);  
  }  
}; 
start();


