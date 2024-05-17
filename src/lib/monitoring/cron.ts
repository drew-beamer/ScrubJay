import { APIEmbedField, Client, EmbedBuilder, TextChannel } from 'discord.js';

const MONITOR_CHANNEL = '1152333983124828280';

async function notifyOfCronJob(client: Client, title: string, fields: APIEmbedField[], success = true) {
  const embed = new EmbedBuilder()
    .setTitle(`Cron Job: ${title}`)
    .setColor(success ? 0x00ff00 : 0xff0000)
    .setDescription('Cron job is running!')
    .addFields(fields)
    .setTimestamp();

  try {
    const channel = client.channels.cache.get(MONITOR_CHANNEL) as TextChannel;
    if (channel) {
        await channel.send({embeds: [embed]});
    } else {
        throw Error("Channel is undefined.")
    }
  } catch (err) {
    console.error(err);
  }
}

export default notifyOfCronJob;
