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
const downloadFileFromDevice = async (deviceFilePath, localDestination) => {
  try {
    // Check if ADB is installed and device is connected
    const adbVersion = await executeADBCommand('adb version');
    console.log(`ADB Version: ${adbVersion}`);

    const devices = await executeADBCommand('adb devices');
    if (!devices.includes('device')) {
      throw new Error('No device connected or unauthorized');
    }

    // List root files on the device
    const rootFilesList = await executeADBCommand('adb shell ls /sdcard/Download');
    console.log(rootFilesList);

    console.log('Root files listed successfully.');

    // Read the data of a file
    const filePath = '/sdcard/Download/sample3.txt'; // Specify the file path you want to read
    const fileData = await executeADBCommand(`adb shell cat ${filePath}`);
    // console.log(fileData);
       // Download the file from the device
      //  await executeADBCommand(`adb pull ${deviceFilePath} ${localDestination}`);

      //  console.log(`File downloaded successfully. Destination: ${localDestination}`);
   
           // Upload the file to the device
    const localFilePath = '/home/anshu/Desktop/anshu.txt'; // Specify the local file path
    const deviceDestination = '/sdcard/Download/sample11.txt'; // Specify the device destination path
    await executeADBCommand(`adb push ${localFilePath} ${deviceDestination}`);

    console.log(`File uploaded successfully. Destination: ${deviceDestination}`);
 
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

// Specify the device file path and local destination path
const deviceFilePath = '/sdcard/Download/sample3.txt'; // Specify the device file path
const localDestination = '/home/anshu/Desktop/anshu.txt'; // Specify the local destination path

// Call the function to download the file from the device
downloadFileFromDevice(deviceFilePath, localDestination);