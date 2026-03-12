const mineflayer = require('mineflayer')

function createBot() {

const password = "123456"

const bot = mineflayer.createBot({
  host: "mcfleet.net",
  port: 25565,
  username: "FleetBot_" + Math.floor(Math.random() * 10000),
  version: false
})

bot.on("login", () => {
  console.log("Bot connected to server")
})

bot.on("spawn", () => {
  console.log("Bot spawned in world")

  // Anti AFK system
  setInterval(() => {
    bot.setControlState("jump", true)

    setTimeout(() => {
      bot.setControlState("jump", false)
    }, 500)

  }, 30000)

})

bot.on("messagestr", (msg) => {

  const message = msg.toLowerCase()

  if (message.includes("/register")) {
    console.log("Registering bot account")

    setTimeout(() => {
      bot.chat(`/register ${password} ${password}`)
    }, 2000)
  }

  if (message.includes("/login")) {
    console.log("Logging in")

    setTimeout(() => {
      bot.chat(`/login ${password}`)
    }, 2000)
  }

})

bot.on("kicked", (reason) => {
  console.log("Kicked:", reason)
})

bot.on("error", (err) => {
  console.log("Error:", err)
})

bot.on("end", () => {
  console.log("Disconnected. Reconnecting in 10 seconds...")
  setTimeout(createBot, 10000)
})

}

createBot()
