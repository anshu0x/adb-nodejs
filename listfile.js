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

// Function to input passcode using ADB
const inputPasscode = async (passcode) => {
  try {
    // Check if ADB is installed and device is connected
    const adbVersion = await executeADBCommand('adb version');
    console.log(`ADB Version: ${adbVersion}`);

    const devices = await executeADBCommand('adb devices');
    if (!devices.includes('device')) {
      throw new Error('No device connected or unauthorized');
    }

    // Input the passcode using ADB
    await executeADBCommand(`adb shell input text "${passcode}"`);

    console.log(`Passcode inputted successfully: ${passcode}`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

// Specify the passcode to input
const passcode = "3333";

// Call the function to input the passcode
inputPasscode(passcode);
