module.exports.config = {
  name: "joinnoti",
  eventType: ["log:subscribe"],
  version: "1.0.2",
  credits: "SHAHADAT SAHU",
  description: "Welcome message with optional image/video",
  dependencies: {
    "fs-extra": "",
    "path": ""
  }
};

module.exports.onLoad = function () {
  const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
  const { join } = global.nodemodule["path"];
  const paths = [
    join(__dirname, "cache", "joinGif"),
    join(__dirname, "cache", "randomgif")
  ];
  for (const path of paths) {
    if (!existsSync(path)) mkdirSync(path, { recursive: true });
  }
};

module.exports.run = async function({ api, event }) {
  const fs = require("fs");
  const path = require("path");
  const { threadID } = event;
  
  const botPrefix = global.config.PREFIX || "!";
  const botName = global.config.BOTNAME || "〔 🔥 𝐀𝐫𝐚𝐯 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 👑 〕";

 
  if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
    await api.changeNickname(`[ ${botPrefix} ] • ${botName}`, threadID, api.getCurrentUserID());

    api.sendMessage("🔥 𝐈’𝐯𝐞 𝐀𝐫𝐫𝐢𝐯𝐞𝐝 —〔 𝐀𝐫𝐚𝐯 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 👑 〕Now it’s time to chill, talk & rule the chat 💬⚡", threadID, () => {
      const randomGifPath = path.join(__dirname, "cache", "randomgif");
      const allFiles = fs.readdirSync(randomGifPath).filter(file =>
        [".mp4", ".jpg", ".png", ".jpeg", ".gif", ".mp3"].some(ext => file.endsWith(ext))
      );

      const selected = allFiles.length > 0 
        ? fs.createReadStream(path.join(randomGifPath, allFiles[Math.floor(Math.random() * allFiles.length)])) 
        : null;

      const messageBody = `╭•┄┅═══❁🌸❁═══┅┄•╮
     𝐀𝐬𝐬𝐚𝐥𝐚𝐦𝐮𝐚𝐥𝐚𝐢𝐤𝐮𝐦 🤍🌷
╰•┄┅═══❁🌸❁═══┅┄•╯

🌿 𝐓𝐡𝐚𝐧𝐤 𝐲𝐨𝐮 𝐬𝐨 𝐦𝐮𝐜𝐡 𝐟𝐨𝐫 𝐚𝐝𝐝𝐢𝐧𝐠 𝐦𝐞, 𝐀𝐫𝐚𝐯 𝐒𝐢𝐫 🤗  

🤍 𝐈 𝐚𝐦 𝐡𝐞𝐫𝐞 𝐭𝐨 𝐛𝐫𝐢𝐧𝐠 𝐩𝐞𝐚𝐜𝐞, 𝐩𝐨𝐬𝐢𝐭𝐢𝐯𝐞 𝐯𝐢𝐛𝐞𝐬 𝐚𝐧𝐝 𝐬𝐦𝐢𝐥𝐞𝐬 ✨  

🌸 𝐈𝐧𝐬𝐡𝐚𝐀𝐥𝐥𝐚𝐡, 𝐈 𝐰𝐢𝐥𝐥 𝐚𝐥𝐰𝐚𝐲𝐬 𝐬𝐞𝐫𝐯𝐞 𝐰𝐢𝐭𝐡 𝐤𝐢𝐧𝐝𝐧𝐞𝐬𝐬 🎀

𝐓𝐨 𝐯𝐢𝐞𝐰 𝐚𝐧𝐲 𝐜𝐨𝐦𝐦𝐚𝐧𝐝:
${botPrefix}Help
${botPrefix}Info
${botPrefix}Admin

★ 𝐅𝐨𝐫 𝐚𝐧𝐲 𝐡𝐞𝐥𝐩 𝐨𝐫 𝐜𝐨𝐦𝐩𝐥𝐚𝐢𝐧𝐭𝐬, 𝐩𝐥𝐞𝐚𝐬𝐞 𝐜𝐨𝐧𝐭𝐚𝐜𝐭 𝐭𝐡𝐞 𝐀𝐝𝐦𝐢𝐧 𝐂𝐨𝐜𝐚 𝐀𝐫𝐚𝐯 ★
➤𝐌𝐞𝐬𝐬𝐞𝐧𝐠𝐞𝐫: https://m.me/61552846104112
➤𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩: https://wa.me/013205785🎀

❖⋆═══════════════════════⋆❖
          𝐁𝐨𝐭 𝐎𝐰𝐧𝐞𝐫 ➢ 𝐂𝐨𝐜𝐚 𝐀𝐫𝐚𝐯 🔥`;

      if (selected) {
        api.sendMessage({ body: messageBody, attachment: selected }, threadID);
      } else {
        api.sendMessage(messageBody, threadID);
      }
    });

    return;
  }

 
  try {
    const { createReadStream, readdirSync } = global.nodemodule["fs-extra"];
    let { threadName, participantIDs } = await api.getThreadInfo(threadID);
    const threadData = global.data.threadData.get(parseInt(threadID)) || {};
    let mentions = [], nameArray = [], memLength = [], i = 0;

    for (let id in event.logMessageData.addedParticipants) {
      const userName = event.logMessageData.addedParticipants[id].fullName;
      nameArray.push(userName);
      mentions.push({ tag: userName, id });
      memLength.push(participantIDs.length - i++);
    }
    memLength.sort((a, b) => a - b);

    let msg = (typeof threadData.customJoin === "undefined") ? `╭•┄┅═══❁🌸🎀❁═══┅┄•╮
     𝐀𝐬𝐬𝐚𝐥𝐚𝐦𝐮𝐚𝐥𝐚𝐢𝐤𝐮𝐦 🤍
╰•┄┅═══❁🌸🎀❁═══┅┄•╯

😊 𝐋𝐞𝐭 𝐬𝐦𝐢𝐥𝐞𝐬, 𝐣𝐨𝐤𝐞𝐬 𝐚𝐧𝐝 𝐟𝐮𝐧 𝐛𝐮𝐢𝐥𝐝  
💝 𝐚 𝐛𝐞𝐚𝐮𝐭𝐢𝐟𝐮𝐥 𝐛𝐨𝐧𝐝 𝐨𝐟 𝐟𝐫𝐢𝐞𝐧𝐝𝐬𝐡𝐢𝐩 🥰  

🌸 𝐇𝐞𝐫𝐞, 𝐰𝐞 𝐛𝐞𝐥𝐢𝐞𝐯𝐞 𝐢𝐧 𝐩𝐨𝐬𝐢𝐭𝐢𝐯𝐞 𝐯𝐢𝐛𝐞𝐬 𝐚𝐧𝐝 𝐠𝐨𝐨𝐝 𝐞𝐧𝐞𝐫𝐠𝐲 ✨  

➤ 𝐄𝐧𝐣𝐨𝐲 𝐜𝐡𝐚𝐭𝐭𝐢𝐧𝐠 𝐚𝐧𝐝 𝐟𝐫𝐢𝐞𝐧𝐝𝐥𝐲 𝐚𝐝𝐝𝐚 😍  
➤ 𝐑𝐞𝐬𝐩𝐞𝐜𝐭 𝐞𝐯𝐞𝐫𝐲𝐨𝐧𝐞 𝐚𝐧𝐝 𝐬𝐭𝐚𝐲 𝐜𝐥𝐚𝐬𝐬𝐲 😉  
➤ 𝐍𝐨 𝐭𝐨𝐱𝐢𝐜 𝐨𝐫 𝐧𝐞𝐠𝐚𝐭𝐢𝐯𝐞 𝐯𝐢𝐛𝐞𝐬 🚫  
➤ 𝐅𝐨𝐥𝐥𝐨𝐰 𝐚𝐝𝐦𝐢𝐧 𝐫𝐮𝐥𝐞𝐬 𝐩𝐫𝐨𝐩𝐞𝐫𝐥𝐲 ✅  

›› 𝐏𝐫𝐢𝐲𝐨 {name},  
𝐲𝐨𝐮 𝐚𝐫𝐞 𝐦𝐞𝐦𝐛𝐞𝐫 𝐧𝐮𝐦𝐛𝐞𝐫 {soThanhVien} 🤗  

›› 𝐆𝐫𝐨𝐮𝐩: {threadName} 💬  

💌 🌸 𝐖 𝐄 𝐋 𝐂 𝐎 𝐌 𝐄 🌸 💌  

╭─╼╾─╼💚🌸💚╾─╼╾───╮  
   𝐂𝐨𝐜𝐚 𝐀𝐫𝐚𝐯 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 👑  
╰───╼╾─╼💚🌸💚╾─╼╾─╯  

❖⋆══════════════════════════⋆❖` : threadData.customJoin;

    msg = msg
      .replace(/\{name}/g, nameArray.join(', '))
      .replace(/\{soThanhVien}/g, memLength.join(', '))
      .replace(/\{threadName}/g, threadName);

    const joinGifPath = path.join(__dirname, "cache", "joinGif");
    const files = readdirSync(joinGifPath).filter(file =>
      [".mp4", ".jpg", ".png", ".jpeg", ".gif", ".mp3"].some(ext => file.endsWith(ext))
    );
    const randomFile = files.length > 0 
      ? createReadStream(path.join(joinGifPath, files[Math.floor(Math.random() * files.length)])) 
      : null;

    return api.sendMessage(
      randomFile ? { body: msg, attachment: randomFile, mentions } : { body: msg, mentions },
      threadID
    );
  } catch (e) {
    console.error(e);
  }
};
