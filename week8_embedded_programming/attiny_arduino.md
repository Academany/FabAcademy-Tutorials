# ATtiny Embedded Programming with the Arduino IDE


The assignment for this week is to read a microcontroller [datasheet](http://academy.cba.mit.edu/classes/embedded_programming/doc8183.pdf) and to program your [Hello Button + LED board](http://academy.cba.mit.edu/classes/embedded_programming/index.html) to do something, in as many different programming languages as possible.

## <a name="LED_board" id="LED_board"></a>Arduino: Program your Hello Button + LED Board

This tutorial shows you how to program an ATtiny44A microcontroller on your Hello Button + LED board that we made during the [Electronics Design week](http://academy.cba.mit.edu/classes/electronics_design/index.html) using the Arduino software.  The ATtiny44A is a small, cheap microcontrollers that are convenient for running simple programs.

_This content is extracted from: [http://hlt.media.mit.edu/?p=1695](http://hlt.media.mit.edu/?p=1695)__and revised to work with the Hello Button + LED board example._

### Materials and Tools

You need an in-system programmer (ISP) use the[ FabISP](http://academy.cba.mit.edu/classes/electronics_production/index.html) we made in class.

### Get the Software

##### Download the Arduino IDE Software

You'll need the Arduino software,. You can [download Arduino ](http://arduino.cc/en/Main/Software) from the Arduino site.  Installation instructions are available [for Windows](http://arduino.cc/en/Guide/Windows) and [for Mac OS X](http://arduino.cc/en/Guide/MacOSX).


##### Make Sure You Have the FTDI Drivers Installed

Get the drivers for your OS here: [http://www.ftdichip.com/Drivers/VCP.htm](http://www.ftdichip.com/Drivers/VCP.htm)

### ATtiny 44A Microcontroller Pin-Outs

Note that the pinouts on the microcontroller are not the same numbers in the Arduino code. The microcontroller pin number is listed on the microcontroller body below.  The corresponding Arduino pin is listed on the outside - to the right or left.


#### ATtiny 44A vs. Arduino Pin-Out Numbering

<table cellspacing="3" cellpadding="3" border="1" width="607"><tbody><tr><td align="center" width="129">**ATtiny 44A

              Pin Number**</td><td align="center" width="208">**Corresponding Arduino

              Pin Number**</td><td align="center" width="238">**Details**</td></tr><tr><td align="center">1</td><td align="center">No number, no access?</td><td align="center">VCC (+) </td></tr><tr><td align="center">2</td><td align="center">Pin 10</td><td align="center"></td></tr><tr><td align="center">3</td><td align="center">Pin 9</td><td align="center"></td></tr><tr><td align="center">4</td><td align="center">No number, no access?</td><td align="center">Reset</td></tr><tr><td align="center">5</td><td align="center">Pin 8</td><td align="center">PWM</td></tr><tr><td align="center">6</td><td align="center">Pin 7 </td><td align="center">PWM, Analog Input 7</td></tr><tr><td align="center">7</td><td align="center">Pin 6</td><td align="center">MOSI, PWM, Analog Input 6 </td></tr><tr><td align="center">8</td><td align="center">Pin 5 </td><td align="center">Analog Input 5, PWM, MISO</td></tr><tr><td align="center">9</td><td align="center">Pin 4 </td><td align="center">Analog Input 4, SCK</td></tr><tr><td align="center">10</td><td align="center">Pin 3</td><td align="center">Analog Input 3</td></tr><tr><td align="center">11</td><td align="center">Pin 2 </td><td align="center">Analog Input 2</td></tr><tr><td align="center">12</td><td align="center">Pin 1</td><td align="center">Analog Input 1</td></tr><tr><td align="center">13</td><td align="center">Pin 0</td><td align="center">Analog Input 0, AREF</td></tr><tr><td align="center">14</td><td align="center"> No number, no access?</td><td align="center">GND (-) </td></tr></tbody></table>

##### Download the ATtiny Board (Board Manager)

To make arduino ATtiny compatible we need to install the ATtiny support.

Everything is clearly explained in [High-Low Tech](http://highlowtech.org/?p=1695)

### Installing ATtiny support in Arduino (skip this step if you already used the Arduino Boards Manager for installing the support)

*   Download: [ATtiny](https://github.com/damellis/attiny/zipball/Arduino1) (from [this GitHub repository](https://github.com/damellis/attiny/tree/Arduino1))
*   Locate your Arduino sketchbook folder (you can find its location in the preferences dialog in the Arduino software)
*   Create a new sub-folder called "hardware" in the sketchbook folder.
*   Copy the attiny folder from inside the .zip to the hardware folder.
*   Restart the Arduino development environment.
*   You should see ATtiny entries in the Tools > Board menu.


### Connecting the ATtiny

*   You'll need to provide power to the ATtiny and connect it to your programmer (FabISP).  That is, connecting MISO, MOSI, SCK, RESET, VCC, and GND of the programmer to the corresponding pins on the ATtiny.
*   Connect the programmer to the ISP header on the LED + Button board
*   You will also need to power the LED + Button board with an FTDI cable **in case your FabIsp doesn't supply current**.

### Configuring the ATtiny to run at 20 MHz

*   By default, the ATtiny's run at 1 MHz (the setting used by the unmodified "ATtiny44)
*   You need to do an extra step to configure the microcontroller to run at 20 MHz – as we have an external 20 MHZ resonator on the Hello Button + LED board.
* Once you have the LED + Button board connected to your FabISP, select the "**ATtiny44 (external 20 MHz clock)**" from the Boards menu.


### If You are Using Linux (Ubuntu)

Avrdude needs sudo access in order to send your Arduino code to the board. You will need to run avrdude as sudo. *Mac users do not need to do this.*

To enable this: We need to create a file called 10-usbtinyisp.rules in the directory /etc/udev/rules.d.

          Here is how to do it (in terminal):

          Type:

              >cd ~/Desktop

          Then:
              >nano 10-usbtinyisp.rules

          A blank file will open up in a text editor. Enter the following text. Paste code is all in one line.

              >SUBSYSTEM=="usb", SYSFS{idVendor}=="1781", SYSFS{idProduct}=="0c9f",
              GROUP="adm", MODE="0666"

          Save the file by pressing: <CONTOL> + O. Hit <ENTER>

          Close the file by pressing: <CONTROL> + X

          Move the file from the desktop to /etc/udev/rules.d by typing:

            >sudo mv 10-usbtinyisp.rules /etc/udev/rules.d

          Then type:
              >sudo restart udev

          Then you should be able to burn the bootloader.

### Burn the Bootloader

  Then, run the

 **"Burn Bootloader"** command from the Tools menu.  This configures the fuse bits of the microcontroller.
*   Note that:
    * the fuse bits keep their value until you explicitly change them,
    * so you'll only need to do this step once for each microcontroller. **
    * this doesn't actually burn a program code onto the board; you'll still need to upload new programs using an external programmer.)


### Programming the ATtiny

Next, we can use the Arduino  IDE to upload a program to the ATtiny.

#### Modify the Code

*   Open the Button sketch from the examples menu. File > Examples > Digital > Button
*   Change the pin numbers from to correspond to the pins used for the LED and the button our your Hello Button + LED board.

**Locate this section of code:**

    // constants won't change. They're used here to
    // set pin numbers:
    const int buttonPin = 2;     // the number of the pushbutton pin
    const int ledPin =  13;      // the number of the LED pin

**Change it to match the pins on your Hello Button + LED Board:**

    // constants won't change. They're used here to
    // set pin numbers:
    const int buttonPin = 3;     // the number of the pushbutton pin
    const int ledPin =  7;      // the number of the LED pin

#### Select a Programmer

*   Select the appropriate item from the Tools > Board menu (leave the serial port set to that of your Arduino board).
*   Select the appropriate item from the Tools > Programmer menu

> USBtinyISP


### Upload the Sketch

Make sure your board is plugged into the computer via the FTDI cable and that your FabISP is connected to the 6 pin programming header on the Hello Button + LED board.

To upload the sketch to your Hello Button + LED board - select the arrow button in the Arduino IDE.

> You should see "Done uploading." in the Arduino software and no error messages.

**Your LED should be glowing on the board. When you press the button, the LED should turn off.**

### Code Example

Here is a code example with lots of comments for explanation of what is happening in the code.(Just cut and paste the code below)

    /*
    LED Off Until Button Pressed

    Blinks a light emitting diode(LED) connected to digital  
    pin 7, when pressing a pushbutton attached to pin 3.


    The circuit:
    * LED attached from pin 7 to ground
    * pushbutton attached to pin 3 from +5V
    * 10K resistor attached to pin 3 to +5V
    * 10K resistor pulls pin 3 and the button to HIGH by default

    created 2005
    by DojoDave
    modified 30 Aug 2011
    by Tom Igoe
    modified for Hello Button + LED Board - 19 Mar 2012
    by Anna Kaziunas France

    */

    // constants won't change.
    // They're used here to set pin numbers:
    const int buttonPin = 3;     // the number of the pushbutton pin
    const int ledPin =  7;      // the number of the LED pin

    // initialize variables:
    int buttonState = 0;         // variable for reading the pushbutton status

    void setup() {
    // initialize the LED pin as an output:
    pinMode(ledPin, OUTPUT);    
    // initialize the pushbutton pin as an input:
    pinMode(buttonPin, INPUT);     
    }

    void loop(){
    // read the state of the pin the pushbutton is connected to:
    buttonState = digitalRead(buttonPin);

    // is the push button pressed?
    // if not pressed - the button state is HIGH
    // the pull up resistor the button / pin 3 makes the button state HIGH by default.
    if (buttonState == HIGH) {     
    // turn LED off (LED is off by default)
    digitalWrite(ledPin, LOW);
    }
    //otherwise.....
    // button is pressed
    else {
    // turn LED on:
    digitalWrite(ledPin, HIGH);
    }
    }

### Try Modifing the Code

Modify the code so that the LED blinks when you press the button. Hint - use the delay() function. See the "Blink" example for details.

        The blink example comes with your Arduino IDE - It is under File > examples > basics > blink

### Supported Arduino Commands / Limitations

Due to the memory limitations of this microcontroller, not all of the Arduino commands are supported.

>For more info [High-Low Tech](http://highlowtech.org/?p=1695) gives a nice explanation

The following Arduino commands are supported:

*   [pinMode()](http://arduino.cc/en/Reference/PinMode)
*   [digitalWrite()](http://arduino.cc/en/Reference/DigitalWrite)
*   [digitalRead()](http://arduino.cc/en/Reference/DigitalRead)
*   [analogRead()](http://arduino.cc/en/Reference/AnalogRead)
*   [analogWrite()](http://arduino.cc/en/Reference/AnalogWrite)
*   [shiftOut()](http://arduino.cc/en/Reference/ShiftOut)
*   [pulseIn()](http://arduino.cc/en/Reference/PulseIn)
*   [millis()](http://arduino.cc/en/Reference/Millis)
*   [micros()](http://arduino.cc/en/Reference/Micros)
*   [delay()](http://arduino.cc/en/Reference/Delay)
*   [delayMicroseconds()](http://arduino.cc/en/Reference/DelayMicroseconds)
*   [SoftwareSerial](http://arduino.cc/en/Reference/SoftwareSerial) (has been updated in Arduino 1.0)


**Original tutorial by:**

* [Anna Kaziunas France](http://www.kaziunas.com) - [Fab Academy AS220 Providence, RI](http://www.as220.org/fabacademy) - March 2012
