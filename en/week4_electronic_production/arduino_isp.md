# Arduino as an ISP

## You need to create a FabISP as a first exercise for working with electronics. *But what if you don't have another FabISP or a commercial ISP to program it?* You can use any Arduino UNO for this task!

**Summary:**

* Code
* Setup
* Makefile

### Step 1 Code

First download [Arduino IDE](https://www.arduino.cc/en/Main/Software)

Under File > Examples > ArduinoISP you can find the code you need to upload to your Arduino in order to transform it into an ISP:

![image](arduino_isp/1.jpg)

This is the right code:

![image](arduino_isp/2.jpg)

If you check the code, you will find the configuration for connecting the Arduino to the FabISP.
So there they are (plus, of course VCC connected to 5V and GND connected to GND).

**Check carefully your wiring before power anything**

    // slave reset: 10:               53
    // MOSI:        11:               51
    // MISO:        12:               50
    // SCK:         13:               52

You can then upload the code to your Arduino.

>Note: This step needs to be done while the Arduino is still not connected to the board you need to program, or you will get an error.

### Step 2 Setup

**After(!) programming the arduino, connect a 10 uF capacitor between RESET and GND.**

Read why here
>This has to do with the special way we will be using the arduino after we programmed it with the ArduinoISP sketch. Now we want to send code through it, not reprogram it. If we leave out the capacitor the arduino will interpret us sending code to it as an attempting to reprogram it and do an automatic reset, sending the code that we inteded for our FabISP to the arduino bootloader instead. If we include the capacitor, it absorbs the reset pulse and lets us send the code through the arduino to the FabISP card being programmed instead.[source](http://forum.arduino.cc/index.php?topic=104435.0)

According to the setup of the code, you can then connect Arduino with your FabISP, something like this:

![image](arduino_isp/3.jpg)

### Step 3 Makefile configuration for avrdude

Inside your Makefile for the configuration of your FabISP firmware, you need to use this setting:

>AVRDUDE = avrdude -c stk500v1 -b19200 -P /dev/tty.usbmodem1411 -p $(DEVICE)

How do I know which is the port my Arduino is attached to? Open the Arduino IDE, and check under Tools > Port. Then substitute /dev/tty.usbmodem1411 with your specific port. *This is for OSX/LINUX*

**Original tutorial by:**

* [Massimo Menichinelli ](mailto:massimo.menichinelli@aalto.fi)
[openp2pdesign](mailto:info@openp2pdesign.org) | v1.0 |


* Remixed/Updated by [Eduardo Chamorro](http://eduardochamorro.github.io/beansreels/index.html), Fab Lab Seoul 01.2017


Licensed under a [Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/)
