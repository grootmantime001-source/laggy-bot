const mineflayer = require('mineflayer')

const OWNER = 'BEST_MC_PLAYER'
let bot
let afkInterval

function createBot() {
  bot = mineflayer.createBot({
    host: 'minearc.xyz',
    port: 25565,
    username: 'LaggyOnA05',
    auth: 'offline',
    version: '1.21.11'
  })

  bot.on('spawn', () => {
    console.log('[LaggyOnA05] Spawned! Going to AFK zone...')
    setTimeout(() => bot.chat('/warp afk'), 3000)

    setInterval(() => {
      bot.chat('/warp afk')
      console.log('Re-warped to AFK zone')
    }, 1800000)

    if (afkInterval) clearInterval(afkInterval)
    afkInterval = setInterval(() => {
      if (!bot.entity) return
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 400)
      bot.look(Math.random() * Math.PI * 2, (Math.random() - 0.5) * 0.5, true)
      bot.swingArm('right')
      bot.setControlState('forward', true)
      setTimeout(() => bot.setControlState('forward', false), 300)
    }, 15000)
  })

  bot.on('chat', (username, message) => {
    if (username === OWNER) {
      if (message === '!come') bot.chat(`/tpa ${OWNER}`)
      if (message === '!afk') bot.chat('/warp afk')
    }
  })

  bot.on('death', () => setTimeout(() => bot.chat('/warp afk'), 3000))
  bot.on('end', () => {
    if (afkInterval) clearInterval(afkInterval)
    setTimeout(createBot, 10000)
  })
}
createBot()
