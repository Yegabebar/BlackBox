const execSync = require('child_process').execSync;
const os = require('os');

const execAndCheck = (command, pattern) => {
  const output = execSync(command, { encoding: 'utf-8' });
  return output.includes(pattern) ? true : output;
}

const pullCommand = 'docker pull bigchaindb/bigchaindb:all-in-one';
const shaExpected = 'sha256:ea3975fef58a75501fe5ced712d324570ded374b592993362a206fe95314f1c1';
const pullResult = execAndCheck(pullCommand, shaExpected);

// Pulls the bigchaindb image and checks the result
if(pullResult === true){
  console.log('INFO: Image successfully pulled/updated');
  
  const imageListCmd = 'docker images';
  const image = 'bigchaindb/bigchaindb';
  const isListed = execAndCheck(imageListCmd, image);

  // If the docker image is listed,
  if(isListed === true){
    console.log('INFO: Image found in the docker images list');
    
    // Creates a container with port forwarding and volume mapping
      const runCmd = os.platform() === 'win32' ? 'cmd.exe /C .\\startContainer.bat' : './startContainer.sh';
      const existsMsg = `"/bigchaindb" is already in use`;
      let alreadyExists;
      try{
        alreadyExists = execAndCheck(runCmd, existsMsg);
      }catch(e){
        if(e.toString().includes(existsMsg)){
          alreadyExists = true;
        }
      }

      // If there is a conflict, then we just start the existing one.
      if(alreadyExists === true){
        console.log('INFO: Container already exists');

        const startCmd = 'docker start bigchaindb';
        const startOutput = execSync(startCmd, { encoding: 'utf-8' });

        if(startOutput.includes('bigchaindb')){
            console.log('INFO: BigchainDB container running! Success!');
        }else{
          console.log('ERR: Cannot run the existing container:', startOutput);
        }
      } else {
        const checkRunCmd = 'docker ps';
        const imgName = 'bigchaindb/bigchaindb:all-in-one';
        const isRunning = execAndCheck(checkRunCmd, imgName);
        if(isRunning === true){
          console.log('INFO: First run for BigchainDB container: Success!');
        }else{
          console.log('ERROR: BigchainDB container not started');
        }
      }
    } else {
      console.log('ERR: Image not found locally', isListed);
    }
} else {
  console.log('ERR: Image not correctly pulled', pullResult);
}

