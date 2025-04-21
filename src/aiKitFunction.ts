/******************
 * aiKitFunction.ts
 * Returns an array that you can use with kitBotMultiKit() using AI.
 ******************/

/* Imports */
import Groq from "groq-sdk"

/* Variables */
const groqApikey = process.env.GROQ_API_KEY
const groq = new Groq({apiKey: groqApikey})

export async function getArrayFromRequest(input: string) {
    return groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: 'Based on the user request, return an array in this format: ["kitName,kitQuantity", "anotherKit,kitQuantity"] , and do not output ANYTHING ELSE.'
            }, {
                role: "user",
                content: `get ${input}`
            }
        ], model: "gemma2-9b-it"
    })
}   