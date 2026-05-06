module.exports.config = {
  name: "leave",
  eventType: ["log:unsubscribe"],
  version: "1.0.0",
  credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
  description: "Thông báo bot hoặc người rời khỏi nhóm",
  dependencies: {
    "fs-extra": "",
    "path": ""
  }
};

module.exports.run = async function({ api, event, Users, Threads }) {
  if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;

  const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];
  const { join } = global.nodemodule["path"];
  const { threadID } = event;

  const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data;
  const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);

  const type = (event.author == event.logMessageData.leftParticipantFbId)
    ? " 💔 {name} left the group\n🌙 We hope to see you again soon \n✦──── 𝐀𝐫𝐚𝐯 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 ────✦\n🌑 𝐒𝐢𝐥𝐞𝐧𝐜𝐞 𝐬𝐩𝐞𝐚𝐤𝐬, 𝐩𝐨𝐰𝐞𝐫 𝐫𝐞𝐦𝐚𝐢𝐧𝐬 🖤"
    : "𝐄𝐗𝐈𝐓 𝐂𝐎𝐍𝐅𝐈𝐑𝐌𝐄𝐃 🚫\n🚫 𝐀𝐃𝐌𝐈𝐍 𝐇𝐀𝐒 𝐑𝐄𝐌𝐎𝐕𝐄𝐃 𝐘𝐎𝐔 𝐅𝐑𝐎𝐌 𝐓𝐇𝐄 𝐆𝐑𝐎𝐔𝐏\n✦──── 𝐀𝐫𝐚𝐯 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 ────✦\n🌑 𝐒𝐢𝐥𝐞𝐧𝐜𝐞 𝐬𝐩𝐞𝐚𝐤𝐬, 𝐩𝐨𝐰𝐞𝐫 𝐫𝐞𝐦𝐚𝐢𝐧𝐬 🖤";

  const path = join(__dirname, "Shahadat", "leaveGif");
  const gifPath = join(path, `leave1.gif`);

  if (!existsSync(path)) mkdirSync(path, { recursive: true });

  let msg = (typeof data.customLeave == "undefined")
    ? "ইস {name} {type} "
    : data.customLeave;

  msg = msg.replace(/\{name}/g, name).replace(/\{type}/g, type);

  const formPush = existsSync(gifPath)
    ? { body: msg, attachment: createReadStream(gifPath) }
    : { body: msg };

  return api.sendMessage(formPush, threadID);
};
