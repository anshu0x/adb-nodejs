const { exec } = require("child_process");

// Function to execute ADB commands
const executeADBCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout.trim());
      }
    });
  });
};

// Function to list root files on the device
const listRootFilesOnDevice = async () => {
  try {
    // Check if ADB is installed and device is connected
    const adbVersion = await executeADBCommand('adb version');
    console.log(`ADB Version: ${adbVersion}`);

    const devices = await executeADBCommand('adb devices');
    if (!devices.includes('device')) {
      throw new Error('No device connected or unauthorized');
    }

    // List root files on the device
    const rootFilesList = await executeADBCommand('adb shell ls /');
    console.log(rootFilesList);

    console.log('Root files listed successfully.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

// Call the function to list root files on the device
listRootFilesOnDevice();
