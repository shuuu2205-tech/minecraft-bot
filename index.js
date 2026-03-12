const mineflayer = require('mineflayer')

function createBot(){

const bot = mineflayer.createBot({
  host: "mcfleet.net",
  port: 25565,
  username: "FleetBot123"
})

bot.on("login", () => {
  console.log("Bot joined server")
})

bot.on("spawn", () => {
  console.log("Bot spawned")
})

bot.on("end", () => {
  console.log("Reconnecting in 5 seconds")
  setTimeout(createBot, 5000)
})

bot.on("kicked", console.log)
bot.on("error", console.log)

}

createBot()
