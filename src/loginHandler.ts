/*****************************
 * loginHandler.ts
 * Handles all the login functions.
 * ***************************/

/* Imports */
import { Bot } from "mineflayer"
import { Logger } from "./logger"
import { Movements, goals, pathfinder } from "mineflayer-pathfinder"

require(`dotenv`).config()

const minecraftPassword = process.env.minecraftPassword
const logger = new Logger()
/* Sends the login command and loads pathfinder plugin for navigating to portal */
export function login(bot: Bot) {
    logger.log(`Sending login command`)
    bot.chat(`/login ${minecraftPassword}`)
    bot.loadPlugin(pathfinder)

    setTimeout(() => {
        // navigate to portal here
    }, 5000)
}