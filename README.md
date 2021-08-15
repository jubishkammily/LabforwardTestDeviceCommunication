# Device - Driver  Communication Simulator
This is a project with two small node js application which demonstraites the asynchronous communication between a hardware and a driver. This uses websockets to demonstrate a real time communication between hardware and driver.

## Conetents

Download the package. There are two nodejs applications in the downloaded folder.
- Device 
- Device 

#### Usage

Download project to your computer

Go to device/src folder and run the command.

```bash
 npm run start
```


Go to drive folder and run the command.

```bash
 npm run start
```


The above commands starts the device and driver. it will start the communication in the begining automatically. 

All the messags are displayed in the respective console.

As demonstration first command sent automatically by the driver. 
The command is 'S'. This command tells the device to send back the weight.
The intermediate states will be printed on both console.
After finishing this command the driver will as to enter command to the duser 

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



