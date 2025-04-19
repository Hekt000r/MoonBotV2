/*
    Moonbot v2 index.ts

    The file that contains all the core logic, namely connecting, and reconnecting.

*/

/* Imports */
import mineflayer = require("mineflayer");
import { Logger } from "./logger";

const fs = require(`fs`);
require(`dotenv`).config()
/* Type imports */
import type { Bot } from "mineflayer";

/* Variables */
let bot: Bot;
let isRestarting = false;

const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));
const logger = new Logger();
function initalizeBot() {
    bot = mineflayer.createBot({
        host: "6b6t.org",
        username: "555amazon1",
        version: "1.20.1" // It's reccomended to keep the version on 1.20.1 for stability and less errors.
    })

    bot.on("login", () => {
        logger.log(`Bot joined server as ${bot.username}`)
    })
    bot.on("end", () => {
        logger.log("Disconnected")
        if (isRestarting) {
            logger.log(`Server is restarting. Waiting `)
        }
    })
    
}