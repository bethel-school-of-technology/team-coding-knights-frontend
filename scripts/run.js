/**
 * @author Collin Blosser / VisualSource
 * 
 * Node script to run json server and angular at the same time.
 */

const { spawn } = require("child_process");

const start_json_server = async () => {
    /** @type {ChildProcessWithoutNullStreams} */
    const dev_db = spawn("npm",["run","dev:db"], { shell: true });

    dev_db.stdout.on('data', (data) => {
        console.log(`${data}`);
    });
    
    dev_db.stderr.on('data', (data) => {
        console.error(`json server stderr: ${data}`);
    });
    
    dev_db.on('close', (code) => {
        console.log(`\x1b[31mJson server exited with code ${code}\x1b[0m`);
    });
    return dev_db;
}

const start_angular = async () => {
    /** @type {ChildProcessWithoutNullStreams} */
    const angular = spawn("npm",["run","ng","serve"], { shell: true });

    angular.stdout.on('data', (data) => {
        if(data.toString() === "Type s + enter at any time to create a snapshot of the database"){
            
        }
        console.log(`${data}`);
    });
    
    angular.stderr.on('data', (data) => {
        console.error(`${data}`);
    });
    
    angular.on('close', (code) => {
        console.log(`\x1b[31mAngular exited with code ${code}\x1b[0m`);
    });

    return angular;
}

async function main(){
    console.log('\x1b[33m Welcome, starting Json server and Angular! \x1b[0m');
    const dev_db = await start_json_server();
    const angular = await start_angular();


    console.log('   \x1b[31mAngular \x1b[33mLive Development Server  |  http://localhost:4200/ \x1b[31m');
    console.log('   \x1b[33mDevelopment\x1b[32m Json \x1b[33mDatabase Server |  http://localhost:3000/ \x1b[0m');

    process.on("exit",()=>{
        dev_db.kill();
        angular.kill();
    });
}

main();


