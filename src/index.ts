/*
    Moonbot v2 index.ts

    The file that contains all the core logic, namely connecting, and reconnecting.

*/

/* Imports */
import mineflayer = require("mineflayer");
import { Logger } from "./logger";

const fs = require(`fs`);
require(`dotenv`).config();
/* Type imports */
import type { Bot } from "mineflayer";

/* Variables */
let bot: Bot;
let isRestarting = false;

const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));
const logger = new Logger();

/* Message handler 
  Handles in-game messages that often relate to TPA's, whispers, login, etc.
***************************************************************************/

/* SetupMessageHandlers - Handles all messages in game chat for bot. */
function setupMessageHandlers(bot: Bot) {
  bot.on("message", async (msgJson) => {
    const message = msgJson.toString(); // Since the message is given in JSON, convert it into a string.
    if (
      message === "Server restarts in 5s" ||
      "The main server is restarting. We will be back soon! Join our Discord with /discord command in the meantime."
    ) {
      logger.log("Server is restarting, disconnecting bot.")
      isRestarting = true
      bot.end("Server restart");
    }
  });
}

/***************************************************************************/

function initalizeBot() {
  bot = mineflayer.createBot({
    host: "6b6t.org",
    username: config.minecraftUsername,
    version: "1.20.1", // It's reccomended to keep the version on 1.20.1 for stability and less errors.
  });

  bot.on("login", () => {
    logger.log(`Bot joined server as ${bot.username}`);
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
initalizeBot();
