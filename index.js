const { exec } = require('child_process');

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

// Function to reset Samsung J6 Plus device
const resetSamsungJ6PlusDevice = async () => {
  try {
    // Check if ADB is installed and device is connected
    const adbVersion = await executeADBCommand('adb version');
    console.log(`ADB Version: ${adbVersion}`);

    const devices = await executeADBCommand('adb devices');
    if (!devices.includes('device')) {
      throw new Error('No device connected or unauthorized');
    }

    // Send shell command to perform factory reset
    const resetOutput = await executeADBCommand('adb shell reboot recovery');
    console.log(resetOutput);

    // Wait for the device to boot into recovery mode
    await new Promise((resolve, reject) => {
      setTimeout(resolve, 5000);
    });

    // Send shell command to perform factory reset in recovery mode
    const resetOutput1 = await executeADBCommand('adb shell recovery --wipe_data');
    console.log(resetOutput1);

    console.log('Reset command sent successfully. The device will perform a factory reset.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

// Call the reset function
resetSamsungJ6PlusDevice();