/*
This is a simulator for driver
*/

const io = require("socket.io-client");
const socket = io("http://localhost:3000");
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})



/**
 * This is to send command to the device to get the response.
 * @param {string} command
 * @param {string} text
 * @returns void
 */
async function sendCommand(command, text) {

    /* Send Command Once*/
    // let command = "S";
    let asciiCommand = command.charCodeAt(0);

    let asciiCommandArray = getAsciiArray(command);
    // console.log("asciiCommandArray",asciiCommandArray);

    if (text != null)
        console.log(text);

    await sleep(1000);
    console.log("Sending \"" + command + "\\n\"");
    socket.emit('sendCommandEvent',asciiCommand+"\"");
    sendCommndAscii(asciiCommandArray);
}


/**
 * This is to send command to the device to get the response.
 * @param {string} sendCommndAscii
 * @returns void
 */
async function sendCommndAscii(asciiCommandArray) {
    //console.log("sendCommndAscii ",asciiCommandArray);
    for (var i_asciiindex = 0 ; i_asciiindex < asciiCommandArray.length; i_asciiindex++) {
        socket.emit('sendCommandEvent', asciiCommandArray[i_asciiindex]);        
        await sleep(1000);
        //console.log("sendCommandEvent",asciiCommandArray[i_asciiindex]);
    }
    socket.emit('sendCommandCompleted', asciiCommandArray[i_asciiindex]);


}


/**
 * This is to send command to the device to get the response.
 * @param {string} comandString
 * @returns{Array} asciiCommandArray // array of asciicharacters of command string
 */
function getAsciiArray(comandString) {

    var asciiCommandArray = [];

    for (var i_index = 0; i_index < comandString.length; i_index++) {
        let asciiCommand = comandString.charCodeAt(i_index);
        asciiCommandArray.push(asciiCommand);
    }

    //console.log("asciiCommandArray length",asciiCommandArray.length);
    return asciiCommandArray
}



/**
 * Read command from command line - user input
 * @param {string}
 * @returns void
 */
function readCommandFromCommadLine() {

    readline.question(`Enter Command [S,TAR,TS]:`, sample => {
        //console.log(`\n ${sample}!`)
        sendCommand(sample);
        // readline.close()
    })

}



/**
 * This is to check the connection status between device and driver the status wil be emitted though the event
 * @returns void
 */
function checkDriverConnectionStatus() {

    socket.on('checkConnectionStatus', () => {
        console.log("Driver online");
        sendCommand('S', "Sending Command: Send stable weight value");
    })

}

/**
 * This is to check the connection status between device and driver the status wil be emitted though the event
 * @param {string} value
 * @returns void
 */
function deviceResponse(value) {

    socket.on('deviceResponse', (value) => {
        console.log(`\n${value}\n`);
    })
    socket.on('deviceResponseCompleted', () => {
        readCommandFromCommadLine();
    })
}





/**
 * This is and function for delaying the thread - and  awaiting the executions
 * @param {number} ms // wait in milliseconds
 * @returns void
 */
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}


deviceResponse();
checkDriverConnectionStatus();
