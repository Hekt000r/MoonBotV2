/***************
 * kitBotHandlers.ts
 * Handles functions related to kitbot, grabbing kits, grabbing multiple kits, etc.
 ***************/

/* Imports */
import { deliverKits } from "./deliverKits";
import { Logger } from "./logger";
import { takeKits } from "./takeKits";

/* Type Imports */
import { Bot } from "mineflayer";


/* Variables */
const logger = new Logger();

/* Notice: The function is named like this so it has compatibility with my old discord bot (dont wanna make people wait
until that's complete too). */
export async function kitBotMultiKit(kit: string, username: string, quantity: number, bot: Bot) {
    logger.log(`Doing KitBot delivery to ${username}`)
    try {
        await takeKits(kit, quantity, bot)
        await deliverKits(username, bot)
    } catch (error) {
        logger.error(`Error while doing kitbot delivery: ${error}`)
        return;
    }
}

export async function kitbotMultiKitType(order: Array<string>, username: string, bot: Bot) {
    logger.log(`Doing KitBot delivery to ${username}`)
    try {
        /* An input order example: order = ["cpvp,1", "neth,2"] .. */
        /* This code is somewhat complicated, should be documented seperately. */ 
        function finishOrderAndDeliver() {
            deliverKits(username, bot)
        }

        for (let i = 0; i < order.length; i++) {
            const kitName = order[i].split(`,`)[0]
            const kitQuantity = Number(order[i].split(`,`)[1])

            await takeKits(kitName, kitQuantity, bot)
            if (i == order.length - 1) {
                finishOrderAndDeliver()
            }
        }
    } catch (error) {
        logger.error(`Error while doing kitbot delivery: ${error}`)
        return;
    }
}

