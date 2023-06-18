const { exec } = require("child_process");

// Function to execute ADB commands
const executeADBCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout.trim());
      }
    });
  });
};

// Function to list all installed apps using ADB
const listInstalledApps = async () => {
  try {
    // Check if ADB is installed and device is connected
    const adbVersion = await executeADBCommand("adb version");
    console.log(`ADB Version: ${adbVersion}`);

    const devices = await executeADBCommand("adb devices");
    if (!devices.includes("device")) {
      throw new Error("No device connected or unauthorized");
    }
    const packageName = "com.google.android.apps.magazines"
    // List all installed apps using ADB
    const packageList = await executeADBCommand("adb shell pm list packages -3");
    const uninstallOutput = await executeADBCommand(`adb uninstall ${packageName}`);
    console.log("Uninstalling app...", uninstallOutput);
    console.log("List of installed apps:");
    console.log(packageList);
    console.log("App listing completed.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

// Call the function to list installed apps
listInstalledApps();
