const { app, BrowserWindow } = require("electron");

//设置 config dir 环境变量
if (
  require("fs").existsSync(
    require("path").join(process.resourcesPath, "config")
  )
) {
  process.env.NODE_CONFIG_DIR = require("path").join(
    process.resourcesPath,
    "config"
  );
  process.env.DV2EX_WWW = require("path").join(process.resourcesPath, "www");
  console.log("running in producation mode !!!");
}

// 开发准备config文件夹
const rootdir = require("path").join(app.getPath("userData"), "dv2ex");
process.env.NODE_CONFIG = JSON.stringify({
  db: {
    dbPrefix: require("path").join(rootdir, "data/"),
  },
  ipfs: {
    repo: require("path").join(rootdir, "ipfs"),
  },
});

if (!require("fs").existsSync(require("config").get("db.dbPrefix"))) {
  require("fs").mkdirSync(require("config").get("db.dbPrefix"), {
    recursive: true,
  });
}

async function main() {
  const { start } = require("dv2ex");
  await Promise.all([start(), app.whenReady()]);
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
  });
  win.loadURL("http://127.0.0.1:4698");
}

main();
