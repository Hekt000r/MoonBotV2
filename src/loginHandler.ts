/*****************************
 * loginHandler.ts
 * Handles all the login functions.
 * ***************************/

/* Imports */
import { Bot } from "mineflayer"
import { Logger } from "./logger"
import { Movements, goals, pathfinder } from "mineflayer-pathfinder"
import MinecraftData from "minecraft-data"
import { Vec3 } from "vec3"

require(`dotenv`).config()

const minecraftPassword = process.env.minecraftPassword
const logger = new Logger()

/* Pathfinds its way to the portal block */

function navigateToPortal(bot: Bot) {
    
    /* Check if the pathfinder is loaded */
    if (!bot.pathfinder) {
        logger.log(`Error: Pathfinder not loaded!`)
        return;
    }

    const mcData = MinecraftData(bot.version)
    const movements = new Movements(bot)
    bot.pathfinder.setMovements(movements)

    /* Set the movement goal */
    const destination = new Vec3(-1001, 101, -988) /* Login lobby portal coordinates */

    bot.pathfinder.setGoal(
        new goals.GoalBlock(destination.x, destination.y, destination.z)
    )

    bot.once("goal_reached", (goal) => {
        if (
            goal.x == destination.x && /* */
            goal.y == destination.y && /* Make sure bot has gone through the portal */
            goal.z == destination.z    /* */
        ) {
            logger.log(`${bot.username} has passed through authentication.`)  
        }
    })
}

/* Sends the login command and loads pathfinder plugin for navigating to portal */

export function login(bot: Bot) {
    logger.log(`Sending login command`)
    bot.chat(`/login ${minecraftPassword}`)
    bot.loadPlugin(pathfinder)

    setTimeout(() => {
        navigateToPortal(bot)
    }, 5000)
}