const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports.config = {
 name: "admin",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "SHAHADAT SAHU",
 description: "Show Owner Info",
 commandCategory: "info",
 usages: "admin",
 cooldowns: 2
};

module.exports.run = async function({ api, event }) {
 const time = moment().tz("Asia/Dhaka").format("DD/MM/YYYY hh:mm:ss A");

 const callback = () => api.sendMessage({
 body: `
┌───────────────⭓
╭────────────◊
├‣ 𝐎𝐖𝐍𝐄𝐑 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍
├‣ 𝐍𝐀𝐌𝐄: 𝐂𝐎𝐂𝐀 𝐀𝐑𝐀𝐕 👑
├‣ 𝐅𝐑𝐎𝐌: 𝐘𝐎𝐔𝐑 𝐇𝐄𝐀𝐑𝐓 💘
├‣ 𝐂𝐋𝐀𝐒𝐒: 𝐇𝐍𝐑’𝐒 🎓
├‣ 𝐀𝐆𝐄: 𝐃𝐎𝐄𝐒𝐍’𝐓 𝐌𝐀𝐓𝐓𝐄𝐑 😏
├‣ 𝐑𝐄𝐋𝐀𝐓𝐈𝐎𝐍𝐒𝐇𝐈𝐏: 𝐒𝐄𝐂𝐑𝐄𝐓 💔
├‣ 𝐁𝐋𝐎𝐎𝐃 𝐆𝐑𝐎𝐔𝐏: 𝐍𝐎𝐓 𝐒𝐔𝐑𝐄 🩸
├‣ 𝐁𝐈𝐑𝐓𝐇𝐃𝐀𝐘: 𝟐𝟕 𝐅𝐄𝐁𝐑𝐔𝐀𝐑𝐘 🎂
├‣ 𝐇𝐄𝐈𝐆𝐇𝐓: 𝟓.𝟖 📏
├‣ 𝐑𝐄𝐋𝐈𝐆𝐈𝐎𝐍: 𝐈𝐒𝐋𝐀𝐌 🕌
├‣ 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊: 𝐂𝐎𝐂𝐀 𝐀𝐑𝐀𝐕 ✔️
├‣ 𝐈𝐍𝐒𝐓𝐀𝐆𝐑𝐀𝐌: 𝐋𝐎𝐀𝐃𝐈𝐍𝐆 ⏳
├‣ 𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏: 𝟎𝟏𝟑𝟐𝟎𝟓𝟕𝟖𝟓 🎀
├‣ 𝐃𝐈𝐒𝐂𝐎𝐑𝐃: 𝐋𝐎𝐀𝐃𝐈𝐍𝐆 🎭
╰────────────◊

      𝐂𝐨𝐜𝐚 𝐀𝐫𝐚𝐯 👑
   ⚜️ 𝐋𝐨𝐰 𝐊𝐞𝐲 | 𝐑𝐨𝐲𝐚𝐥 𝐕𝐢𝐛𝐞 ⚜️

┌───────────────⭓
│ 𝗖𝗢𝗡𝗧𝗔𝗖𝗧 𝗟𝗜𝗡𝗞𝗦
├───────────────
│ 📘 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸:
│ http://fb.com/61552846104112
│ 💬 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽:
│ https://wa.me/013205785🎀
└───────────────⭓

┌───────────────⭓
│ 🕒 𝗨𝗽𝗱𝗮𝘁𝗲𝗱 𝗧𝗶𝗺𝗲
├───────────────
│ ${time}
└───────────────⭓
 `,
 attachment: fs.createReadStream(__dirname + "/cache/owner.jpg")
 }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/owner.jpg"));

 return request("https://i.imgur.com/mXcJIVz.jpeg")
 .pipe(fs.createWriteStream(__dirname + '/cache/owner.jpg'))
 .on('close', () => callback());
};
