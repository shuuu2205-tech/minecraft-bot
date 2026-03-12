const mineflayer = require('mineflayer')

function createBot() {

const password = "123456"

const bot = mineflayer.createBot({
  host: "mcfleet.net",
  port: 25565,
  username: "FleetBot_" + Math.floor(Math.random()*10000),
  version: "1.8.9"
})

console.log("Starting bot...")

bot.on("login", () => {
  console.log("[LOGIN] Connected to server")
})

bot.on("spawn", () => {
  console.log("[SPAWN] Bot spawned in world")

  // Anti AFK movement
  setInterval(() => {
    bot.setControlState("jump", true)
    setTimeout(() => bot.setControlState("jump", false), 500)
  }, 30000)
})

bot.on("messagestr", (msg) => {
  console.log("[CHAT]", msg)

  const m = msg.toLowerCase()

  if (m.includes("/register")) {
    console.log("[AUTH] Register command detected")
    bot.chat(`/register ${password} ${password}`)
  }

  if (m.includes("/login")) {
    console.log("[AUTH] Login command detected")
    bot.chat(`/login ${password}`)
  }
})

bot.on("kicked", (reason) => {
  console.log("[KICKED BY SERVER]")
  console.log(reason)
})

bot.on("error", (err) => {
  console.log("[ERROR]")
  console.log(err)
})

bot.on("end", () => {
  console.log("[DISCONNECTED] Reconnecting in 20 seconds...")
  setTimeout(createBot, 20000)
})

}

createBot()
