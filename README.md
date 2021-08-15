# Device - Driver  Communication Simulator
This is a project with two small node js application which demonstraites the asynchronous communication between a hardware and a driver. This uses websockets to demonstrate a real time communication between hardware and driver.

## Conetents

Download the package. There are two nodejs applications in the downloaded folder.
- Device 
- Device 

#### Usage

Download project to your computer

Go to device folder and run the command in the command prompt.

```bash
 npm install
 npm run start
```


Go to drive folder and run the command. in the second command prompt

```bash
 npm install
 npm run start
```


The above commands starts the device and driver. it will start the communication in the begining automatically. 

All the messags are displayed in the respective console.

## Working Description

As a demonstration the first command sent automatically by the driver. 
The command is 'S'. This command tells the device to send back the weight.
The intermediate states will be printed on both console.The data will be converted to ASCII and send to device. The device will parse and process and match against the commands in the file. If command is recognized then necessary action will start and sth status will be sent back driver in real time. 
The driver will print the status on the console.
After finishing this command the driver will ask the user to enter command in the console(command line).

###  Driver

```bash
Driver online
Sending Command: Send stable weight value
Sending "S\n"

The current Stable Weight Value is 100.00g

Enter Command [S,TAR,TS]:
```
###  Device

```bash
Device online
Listening
Received: [0x83"] is ""
Received: [0x83",0x53] is "S"
Command Recognized
The current Stable Weight Value is 100.00g

```
Enter the command . The command will be porcessed and if recognized the response will be printed on the decvice console.

###  Driver

```bash
Driver online
Sending Command: Send stable weight value
Sending "S\n"

The current Stable Weight Value is 100.00g

Enter Command [S,TAR,TS]:TAR
Sending "TAR\n"

Taring command started


Taring Process has completed

Enter Command [S,TAR,TS]:
```
###  Device

```bash
Device online
Listening
Received: [0x83"] is ""
Received: [0x83",0x53] is "S"
Command Recognized
The current Stable Weight Value is 100.00g
Received: [0x84"] is ""
Received: [0x84",0x54] is "T"
Received: [0x84",0x54,0x41] is "A"
Received: [0x84",0x54,0x41,0x52] is "R"
Command Recognized
Taring command started

```

