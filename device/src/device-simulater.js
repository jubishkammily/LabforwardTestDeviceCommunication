/*
This is a simulator for device to demonstrate the device driver communnication
This uses the websocket.io for demonstration
*/

const constantModule = require('./device-constants');
const deviceCommandsMap = constantModule.deviceCommandsMap;


const http = require('http');
const express = require('express');
const { Server } = require("socket.io");
const { Socket } = require('dgram');

const app = express();
const port = 3000;

const server = http.createServer(app);
const io = new Server(server);
let commandGlobal = "";
let hexArrayGlobal = [];
let socketGlobal;



startDevice();

/**
 * This starts the device simulator
 * @returns void
 */
function startDevice(){
    server.listen(port,()=>{
        //console.log(`Device up on ${port}!`)
    }); 
    connectionEvent();    
}


/**
 * This is an event which will be triggerd when a driver connects to the device
 * @returns void
 */
 function connectionEvent(){
    io.on('connection',async (socket)=>{

        socket.on('sendCommandCompleted',()=>{
            //console.log("completed");            
            initiateTriggeringCommands(commandGlobal,socket);
            
        })
        await sleep(1000);
        console.log('Device online');       
        socket.emit('checkConnectionStatus');
        console.log('Listening');
        listenToCommandEvent(socket);
      
    })
}


/**
 * This creates a sample event to the connected socket and listen for data from the client
 * @param {Socket} socket
 * @returns void
 */
const listenToCommandEvent = async (socket)=>{
    socket.on('sendCommandEvent',async (command)=>{
        //console.log("Test Command ", command);
        let strCommand = processCommands(command);
        hexArrayGlobal.push("0x"+command.toString(16));
        console.log(`Received: [${hexArrayGlobal}] is "${strCommand}"`);

        // to avoid invalid unkon characters
        if((/[a-zA-Z]/).test(strCommand))
        commandGlobal = commandGlobal +strCommand;

        //commandGlobal = strCommand;
        //console.log(`commandGlobal${commandGlobal}t`);
        socketGlobal = socket;
        await sleep(1000);               
        
    })
}

/**
 * This will initiate triggering and processing of commands in the device
 * @param {string} command
 * @returns void
 */
function initiateTriggeringCommands(strCommand,socket){
    //console.log("initiateTriggeringCommands strCommand",strCommand);
    //console.log("initiateTriggeringCommands deviceCommandsMap[strCommand]",deviceCommandsMap[strCommand.toString()]);
    if( deviceCommandsMap[strCommand]!= null){ 
        console.log("Command Recognized");
        console.log(deviceCommandsMap[strCommand]);
        processMapping(strCommand,socket)
    }else{
        commandGlobal = [];
        hexArrayGlobal = [];
        socket.emit('deviceResponseCompleted');
        // console.log("Command Not Recognized");
        console.log('Listening');
    }
    
}



/**
 * This will start the taring process
 * @param {string} commandString
 * @returns void
 */
function processMapping(commandString,socket) {

    
    if (commandString == 'S' || commandString == 'TS') {
        //console.log("commandString",commandString);
        socket.emit('deviceResponse',deviceCommandsMap[commandString]);  
        commandGlobal = [];
        hexArrayGlobal = [];         
        socket.emit('deviceResponseCompleted');
    }
    if (commandString == 'TAR') {
        taringProcess(socket,commandString);
    }

}

/**
 * This will start the taring process trigger the events respectievely
 * @returns void
 */
function taringProcess(socket,commandString){

    socket.emit('deviceResponse',deviceCommandsMap[commandString]);
    socket.emit('deviceResponse',"Taring Process has completed");
    commandGlobal = [];
    hexArrayGlobal = [];
    socket.emit('deviceResponseCompleted');

}


/**
 * This creates a sample event to the connected socket and listen for data from the client
 * @param {string} command
 * @returns {string} convertedString
 */
function processCommands(command){
let strCommand = String.fromCharCode(command);
return strCommand;
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




