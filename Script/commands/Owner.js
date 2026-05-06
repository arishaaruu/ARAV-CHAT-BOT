const request = require("request");
const fs = require("fs-extra");

module.exports.config = {
  name: "owner",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "SHAHADAT SAHU",
  description: "Show Owner Info with styled box & random photo",
  commandCategory: "Information",
  usages: "owner",
  cooldowns: 2
};

module.exports.run = async function ({ api, event }) {

  
  const info = `
╭────────────◊
│ ✨ 𝐎𝐖𝐍𝐄𝐑 𝐈𝐍𝐅𝐎 ✨
╰────────────◊

👑 𝐍𝐀𝐌𝐄         : 𝐂𝐎𝐂𝐀 𝐀𝐑𝐀𝐕
💘 𝐅𝐑𝐎𝐌         : 𝐘𝐎𝐔𝐑 𝐇𝐄𝐀𝐑𝐓
🎓 𝐂𝐋𝐀𝐒𝐒        : 𝐇𝐍𝐑’𝐒
😏 𝐀𝐆𝐄          : 𝐃𝐎𝐄𝐒𝐍’𝐓 𝐌𝐀𝐓𝐓𝐄𝐑
💔 𝐑𝐄𝐋𝐀𝐓𝐈𝐎𝐍     : 𝐒𝐄𝐂𝐑𝐄𝐓
🩸 𝐁𝐋𝐎𝐎𝐃 𝐆𝐑𝐎𝐔𝐏  : 𝐍𝐎𝐓 𝐒𝐔𝐑𝐄
🎂 𝐁𝐈𝐑𝐓𝐇𝐃𝐀𝐘    : 𝟐𝟕 𝐅𝐄𝐁𝐑𝐔𝐀𝐑𝐘
📏 𝐇𝐄𝐈𝐆𝐇𝐓       : 𝟓.𝟖
🕌 𝐑𝐄𝐋𝐈𝐆𝐈𝐎𝐍     : 𝐈𝐒𝐋𝐀𝐌

╭────────────◊
│ 🔗 𝐂𝐎𝐍𝐓𝐀𝐂𝐓 𝐋𝐈𝐍𝐊𝐒
╰────────────◊

✔️ 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊  : http://fb.com/61552846104112
⏳ 𝐌𝐄𝐒𝐒𝐄𝐍𝐆𝐄𝐑  : https://m.me/61552846104112
🎀 𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏   : 𝟎𝟏𝟑𝟐𝟎𝟓𝟕𝟖𝟓🎀
🎭 𝐃𝐈𝐒𝐂𝐎𝐑𝐃    : 𝐋𝐎𝐀𝐃𝐈𝐍𝐆_

╭────────────◊
│ 👑 𝐂𝐎𝐂𝐀 𝐀𝐑𝐀𝐕 👑
╰────────────◊

⚜️ 𝐋𝐎𝐖 𝐊𝐄𝐘 | 𝐑𝐎𝐘𝐀𝐋 𝐕𝐈𝐁𝐄 ⚜️
`;

  const images = [
    "https://i.imgur.com/5OPkBBM.jpeg",
    "https://i.imgur.com/mXcJIVz.jpeg",
    "https://i.imgur.com/MXAci64.jpeg",
    ""
  ];

  const randomImg = images[Math.floor(Math.random() * images.length)];

  const callback = () => api.sendMessage(
    {
      body: info,
      attachment: fs.createReadStream(__dirname + "/cache/owner.jpg")
    },
    event.threadID,
    () => fs.unlinkSync(__dirname + "/cache/owner.jpg")
  );

  return request(encodeURI(randomImg))
    .pipe(fs.createWriteStream(__dirname + "/cache/owner.jpg"))
    .on("close", () => callback());
};
