/*************
 * takeKits.ts
 * Contains functions for taking kits from chests
 *************/

/* Imports */
require(`dotenv`).config()

import { Vec3 } from "vec3"
import { Logger } from "./logger"

/* Type Imports */
import { Bot } from "mineflayer"

/* Variables */
const logger = new Logger()

const shulkerBoxTypes = [
    'shulker_box',
    'white_shulker_box',
    'orange_shulker_box',
    'magenta_shulker_box',
    'light_blue_shulker_box',
    'yellow_shulker_box',
    'lime_shulker_box',
    'pink_shulker_box',
    'gray_shulker_box',
    'light_gray_shulker_box',
    'cyan_shulker_box',
    'purple_shulker_box',
    'blue_shulker_box',
    'brown_shulker_box',
    'green_shulker_box',
    'red_shulker_box',
    'black_shulker_box'
  ];

function getKitVector3 (kitName: string) {
    const kitEnvName = `${kitName.toUpperCase()}_KIT_CHEST_POS` /* Convert kitname to uppercase and add _KIT_CHEST_POS suffix */

    const position = process.env[kitEnvName] /* get the XYZ value from .ENV file */
    logger.logDebug(position)
    if (position) {
        /* since the xyz positions is stored in a single string, we have to split it 
           example of .env coordinate format: "6531,89,4535" */
        const [x,y,z] = position.split(",").map(Number) /* turns it into 3 values by splitting after every comma and turns 
        them into numbers. */
        logger.logDebug(`here at the splitting`)
        return new Vec3(x,y,z) // converts into Vec3 for usage
    } else {
        logger.warn(`Could not find the kit ${kitEnvName}.`)
        return new Vec3(0,0,0);
    }
}

export async function takeKits(kit: string, quantity: number, bot: Bot) {
    logger.log(`Bot taking ${quantity} ${kit} kits.`)
    const chestPosition = getKitVector3(kit)
    if (chestPosition == new Vec3(0,0,0)) {
      logger.log(`Kit not found.`)
    }
    const chestBlock = bot.blockAt(chestPosition)
    logger.logDebug(`here at blockAt`)
    if (!chestBlock) {
        logger.error(`No block found at ${chestPosition}`)
        return;
    } /* Important error handling (im putting this here because it has slipped through in last version of the bot,
    thank you TypeScript for some excellent analysis.) */
    logger.logDebug(`here at the opening`)
    const chestWindow = await bot.openContainer(chestBlock)
    logger.logDebug(`here at the taking`)
    /* Go through each slot in the chest and if it has a shulker box, then withdraw() it (put it in bots'inventory) */
    for (const slot of chestWindow.containerItems()) {
        if (slot && shulkerBoxTypes.includes(slot.name)) {
          await chestWindow.withdraw(slot.type, null, quantity);
          logger.log(`Picked up ${quantity}x ${slot.name}.`);
          break;
        }
      }
    chestWindow.close()
}