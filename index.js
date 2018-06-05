import Migi from '@popcorn.moe/migi'
import Welcome from './src/Welcome'

const migi = new Migi({
  root: __dirname
})

migi.loadModule(Welcome)

migi.on('ready', () => console.log(`Moe moe kyun @${migi.user.tag}`))

migi.login(process.env.DISCORD_TOKEN)

process.on('unhandledRejection', e => console.error(e))
