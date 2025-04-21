/***************
 * routeHandler.ts
 * This file handles everything related to API endpoints, which is a core mechanic for the bot.
 */

/* Imports */
import { error, log } from "console";
import { Logger } from "./logger";
import { takeKits } from "./takeKits";

const express = require(`express`);

/* Type Imports */
import { Request, Response } from "express";
import { Bot } from "mineflayer";
import { deliverKits } from "./deliverKits";
import { kitBotMultiKit, kitbotMultiKitType } from "./kitBotHandler";
import { getArrayFromRequest } from "./aiKitFunction";

/* Variables */
const app = express();
const port = 3001;
const logger = new Logger();

export function setupExpressRoutes(bot: Bot) {
  app.get(`/`, (req: Request, res: Response) => {
    /* Always send a status code and a response so the GET request doesn't hang. */
    res.status(200).send(`Moonbot v2 MC index page`);
  });
  app.get(`/order`, (req: Request, res: Response) => {
    try {
      const quantity = Number(req.query.quantity)
      const kitType = req.query.kitType;

      /* Check to ensure that parameters are valid */
      if (typeof kitType !== `string`) {
        logger.error(`kitType is not a string: ${kitType}`);
        return;
      }
      if (typeof quantity !== `number`) {
        logger.error(`quantity is not a number: ${quantity}`);
        return;
      }
      /********************************************/

      takeKits(kitType, quantity, bot);
      res.status(200).send(`Success`);
    } catch (err) {
      logger.error(`Failed to order kits, ${err}`);
      res.status(500).send(`Failed to order kits`);
    }
  });
  app.get(`/deliverTo`, (req: Request, res: Response) => {
    try {
      const username = req.query.username;

      /* Check to ensure that parameters are valid */
      if (typeof username !== `string`) {
        logger.error(`Username is not a string: ${username}`);
        return;
      }
      /********************************************/

      deliverKits(username, bot);
      res.status(200).send(`Success`);
    } catch (err) {
      logger.error(`Failed to order kits, ${err}`);
      res.status(500).send(`Failed to order kits`);
    }
  });
  app.get(`/kitBotMultiKitType`, async (req: Request, res: Response) => {
    /* "kitbot" mode multi-kittype delivery (sends order and delivers multiple types of kits in one api endpoint) */
    /* Complicated code, needs seperate documentation. */
    try {
      const username = req.query.username;
      const orderRaw = req.query.order

      if (typeof username !== `string`) {
        logger.error(`Username is not a string: ${username}`);
        return;
      }
      if (typeof orderRaw !== `string`) {
        logger.error(`Username is not a string: ${username}`);
        return;
      }

      const order = JSON.parse(orderRaw)
      /********************************************/
      
      /* Check to ensure that parameters are valid */
      
      await kitbotMultiKitType(order, username, bot)
      res.status(200).send(`Success`);
    } catch (err) {
      logger.error(`Failed to order kits, ${err}`);
      res.status(500).send(`Failed to order kits`);
    }
  });
  
  app.listen(port, () => {
    logger.log(`Express server live on port ${port}`)
  })
  app.get(`/requestToArray`, async (req: Request, res: Response) => {
    const input = req.query.input
    if (typeof input !== "string") return;
    logger.log(input)
    res.status(200).send(`${ (await getArrayFromRequest(input)).choices[0].message.content}`);
  });
}
