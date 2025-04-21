/*************
 * messageHandler.ts
 * Handles in-game messages
 *************/

/* Imports */
import { login } from "./loginHandler";
import { Logger } from "./logger";
import { isRestarting } from ".";
import { setIsRestarting } from ".";

const fs = require(`fs`)
/* Type Imports */
import { Bot } from "mineflayer"; // Bot type import

/* Variables */
const logger = new Logger();
const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));
const whitelist = config.tpaWhitelist




export function setupMessageHandlers(bot: Bot) {
  bot.on("message", async (msgJson) => {
    const message = msgJson.toString(); // Since the message is given in JSON, convert it into a string.
    if (
      message ===
      `${bot.username}, please login with the command: /login <password>`
    ) {
      login(bot);
    }

    if (
      message === "Server restarts in 5s" ||
      message ===
        "The main server is restarting. We will be back soon! Join our Discord with /discord command in the meantime."
    ) {
      logger.log("Server is restarting, disconnecting bot.");
      setIsRestarting(true)
      bot.end("Server restart");
    }

    /* Teleporting trusted players */
    if (message.includes("wants to teleport to you.")) {
      const username = message.split(" ")[0] /* Get the username by getting the first word in the message, by seperating the words and getting the first one. */
      if (whitelist.includes(username)) {
        bot.chat(`/tpy ${username}`)
        logger.log(`Teleported ${username}`)
      }
    }

  });
}