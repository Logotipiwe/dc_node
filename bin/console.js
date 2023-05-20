import {processConsole} from "../routes/controllers/console/controller";
import readline from "readline";

let continueFlag = true

function preprocessInput(input){
    return input.toString().trim();
}

const rl = readline.createInterface(process.stdin, process.stdout);
rl.prompt();
rl.on('line', async function(line) {
    const ans = await processConsole(line);
    if(ans === "end") rl.close();
    console.log(ans);
    rl.prompt();
}).on('close',function(){
    process.exit(0);
});
