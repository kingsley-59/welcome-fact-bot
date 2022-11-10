const { Telegraf } = require('telegraf')
const { v4: uuidV4 } = require('uuid')
require('dotenv').config()
let factGenerator = require('./factGenerator')


const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => {
    let message = ` Please use the /fact command to receive a new fact`
    ctx.reply(message)
})

bot.on('new_chat_members', async ctx => {
    for (const user of ctx.message.new_chat_members) {
        try {
            console.log(user.username)
            await ctx.replyWithMarkdownV2(`Welcome *${user.first_name}* \\. Please read the group description and follow the rules to avoid ban\\.`, {reply_to_message_id: ctx.message.message_id});
        } catch (error) {
            console.log(error)
        }
    }
})

bot.command('fact', async (ctx) => {
    try {
        ctx.reply('Generating image, Please wait !!!')
        let imagePath = `./temp/${uuidV4()}.jpg`
        await factGenerator.generateImage(imagePath)
        await ctx.replyWithPhoto({ source: imagePath })
        factGenerator.deleteImage(imagePath)
    } catch (error) {
        console.log('error', error)
        ctx.reply('error sending image')
    }
})

bot.launch()
