// START VARIABLE DKK
const { token, default_prefix } = require("./config.json");
const { config } = require("dotenv");
const Discord = require("discord.js");
const bot = new Discord.Client();
require("./extendMessage");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(bot);
});

bot.on("ready", () => {
  console.log("HalalBot is halal");

  // BOT STATUS
  let setatus = [
    "Saekyo",
    `${bot.guilds.cache.size} servers`,
    `${bot.channels.cache.size} channels`,
    `${bot.users.cache.size} users`,
    `Made with 💙 by Saekyo`
  ];
  setInterval(() => {
    let index = Math.floor(Math.random() * (setatus.length - 1) + 1);

    bot.user.setActivity(`100% Halal` + setatus[index], {
      type: "STREAMING",
      URL: "https://www.twitch.tv/chilledcatradio"
    });
  }, 600000);

  // NOTIF BOT RESTART
  const upchannel = bot.channels.cache.get("767545904592322572");
  const upembed = new Discord.MessageEmbed()
    .setThumbnail(bot.user.avatarURL())
    .setTitle("Bot restart Notification")
    .setDescription(
      "Maybe some glitch or my owner restarted me I am back online"
    );
  upchannel.send(upembed);
});

//==============================================================================

bot.on("message", async message => {
  if (message.author.bot) return;

  if (message.content === "<@725432896533299200>") {
   // let prefix = db.get(`prefix_${message.guild.id}`);
   let prefix= default_prefix;
    //if (prefix === null) prefix = default_prefix;
    const Menembed = new Discord.MessageEmbed()
    .setDescription(`My Prefix in this guild is \`${prefix}\` \nTo get started type \`${prefix}help\``);
    message.channel.send(Menembed);
  }

  //==============================================================================

  // SETUP COMMAND
  if (!message.guild) return;
  //let prefix = db.get(`prefix_${message.guild.id}`);
  let prefix = default_prefix;
  if (message.content.startsWith(`<@!${bot.user.id})`) || message.content.startsWith(`<@${bot.user.id}>`)){
    prefix = `<@${bot.user.id}>`;
  }
  if (prefix === null) prefix = default_prefix;
  if (!message.content.startsWith(prefix)) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = bot.commands.get(cmd);
  if (!command) command = bot.commands.get(bot.aliases.get(cmd));
  if (command) command.run(bot, message, args);

});

//==============================================================================

// EVENT COMMANDS

// BOT NOTIF JOIN SERVER
bot.on("guildCreate", guild => {
  const channelId = "769433563795161088";
  const channel = bot.channels.cache.get(channelId);
  const sowner = guild.owner.user;
  if (!channel) return;
  const embed = new Discord.MessageEmbed()
    .setTitle("I Joined A Guild!")
    .setDescription(
      `**Guild Name:** ${guild.name} (${guild.id})\n**Members:** ${guild.memberCount}\n**Owner:** ${sowner.tag}`
    )
    .setTimestamp()
    .setColor("GREEN")
    .setFooter(`I'm In ${bot.guilds.cache.size} Guilds Now!`);
  channel.send(embed);
});

//BOT NOTIF LEFT SERVER
bot.on("guildDelete", guild => {
  const channelId = "769433563795161088";
  const channel = bot.channels.cache.get(channelId);
  const sowner = guild.owner.user;
  if (!channel) return;
  const embed = new Discord.MessageEmbed()
    .setTitle("I Left A Guild!")
    .setDescription(
      `**Guild Name:** ${guild.name} (${guild.id})\n**Members:** ${guild.memberCount}\n**Owner:** ${sowner.tag}`
    )
    .setTimestamp()
    .setColor("RED")
    .setFooter(`I'm In ${bot.guilds.cache.size} Guilds Now!`);
  channel.send(embed);
});

bot.login(token);
