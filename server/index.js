import express from "express";

//node side m extension likhni jruri hoti h so write db.js
import Connection from "./database/db.js";
import route from "./routes/route.js";

import bodyParser from "body-parser";

import cors from "cors";

const app = express();

//jb bhi empty route hoga sara traffic route krdo route folder pe
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', route);

Connection();
const PORT = 8000; 

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})