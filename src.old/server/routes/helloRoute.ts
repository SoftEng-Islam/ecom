import express from "express";
const helloRouter = express.Router();

import { helloMessage } from "../controllers/helloMessage.ts";
helloRouter.route("/hello").get(helloMessage);

export default helloRouter;
