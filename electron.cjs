const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { exec } = require("child_process");

// Disable GPU acceleration to avoid macOS Skia mailbox warnings in some environments
app.disableHardwareAcceleration();

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js"), // ensure this is set correctly
    },
    title: "Futuristic Mac",
    vibrancy: "ultra-dark",
    show: false,
  });

  win.once("ready-to-show", () => win.show());
  win.loadFile(path.join(__dirname, "dist", "index.html"));

  // Only open DevTools when explicitly requested to avoid noisy Autofill warnings in console
  if (process.env.SHOW_DEVTOOLS === "1") {
    win.webContents.openDevTools();
  }

  win.webContents.on("did-fail-load", (_, errorCode, errorDescription) => {
    console.error("Failed to load:", errorCode, errorDescription);
  });
}

ipcMain.handle("get-volume", async () => {
  return new Promise((resolve, reject) => {
    exec(
      "osascript -e 'output volume of (get volume settings)'",
      (error, stdout) => {
        if (error) {
          console.error("Error fetching volume:", error);
          reject(error);
        } else {
          console.log("Raw volume output:", stdout); // Debug log
          const vol = Number(stdout.trim());
          resolve(isNaN(vol) ? 50 : vol);
        }
      }
    );
  });
});

app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
