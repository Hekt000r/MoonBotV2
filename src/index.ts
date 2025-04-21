/*********************
 * index.ts
 * The file that contains all the core logic, namely connecting, and reconnecting.
 *********************/

/* Imports */
import mineflayer = require("mineflayer");
import { Logger } from "./logger";
import { setupMessageHandlers } from "./messageHandler";


const fs = require(`fs`);
require(`dotenv`).config();
/* Type imports */
import type { Bot } from "mineflayer";

/* Variables */
let bot: Bot;
export let isRestarting: boolean;

const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));
const logger = new Logger();

/**************
 * setIsRestarting()
 * Basically a hook, is required to change the value of isRestarting as it is an export.
 **************/
export function setIsRestarting(value: boolean) {
  isRestarting = value
}


function initalizeBot() {
  bot = mineflayer.createBot({
    host: "6b6t.org",
    username: config.minecraftUsername,
    version: "1.20.1", // It's reccomended to keep the version on 1.20.1 for stability and less errors.
  });

  bot.on("login", () => {
    logger.log(`Bot joined server as ${bot.username}`);
    setupMessageHandlers(bot);
  });
  bot.on("end", () => {
    logger.log("Disconnected");
    if (isRestarting) {
      logger.log(
        `Server is restarting. Waiting ${
          config.restartTimeout / 1000 / 60
        } minutes before reconnecting.`
      );
      setTimeout(() => {
        isRestarting = false;
        initalizeBot;
      }, config.restartTimeout);
    } else {
      logger.log(`Reconnecting in ${config.reconnectTimeout / 1000} seconds. `);
      setTimeout(initalizeBot, config.reconnectTimeout);
    }
  });

  bot.on(`kicked`, (reason) => {
    logger.log(`Kicked: ${reason}`);
  });
  return bot;
}
bot = initalizeBot();
