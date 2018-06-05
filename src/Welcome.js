import { on, configurable } from '@popcorn.moe/migi'

@configurable('welcome', {
  guilds: {
    '225296987770060820': {
      channel: '340620490009739265',
      role: '308615845129617408',
      welcome: [
        'Hey bienvenue $user!\n',
        'Ici on aime les licornes. <#225296987770060820>'
      ],
      bye: '$user ($displayName) n\'aime plus les licornes...'
    }
  }
})
export default class Welcome {
  constructor(migi, settings) {
    this.migi = migi
    this.settings = settings
  }

	@on('guildMemberAdd')
	onWelcome(member) {
    const sGuild = this.settings.guilds[member.guild.id]
    if (!sGuild) return
    const { channel: sChannel, role, welcome } = sGuild

    const channel = member.guild.channels.get(sChannel)

    return Promise.all([
      channel && welcome && channel.send(this.fillMessage(welcome, member)),
      member.addRole(role)
    ])
  }

	@on('guildMemberRemove')
	onBye(member) {
    const sGuild = this.settings.guilds[member.guild.id]
    if (!sGuild) return
    const { channel: sChannel, bye } = sGuild
    
    const channel = member.guild.channels.get(sChannel)

    if (channel && bye)
      return channel.send(this.fillMessage(bye, member))
	}
  
  fillMessage(message, member) {
    return (Array.isArray(message) ? message.join('') : message)
      .replace('$user', member)
      .replace('$displayName', member.displayName)
  }
}