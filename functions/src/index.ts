import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
import * as admin from 'firebase-admin';

const serviceAccount = require('../firebase-adminsdk.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: ""
});

import * as express from 'express';
import * as bodyParser from "body-parser";
import * as cors from "cors";

import { routesConfig} from "./items/routes-config";


//initialize express server
const app = express();

//add the path to receive request and set json as bodyParser to process the body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: true }));
//initialize the database and the collection

routesConfig(app);


//define google cloud function name
export const profileApi = functions.https.onRequest(app);
