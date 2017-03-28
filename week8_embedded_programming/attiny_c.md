# Echo Keyboard Input Using C

## Program Your Board in C to Echo Back Keyboard Input

This tutorial shows you how to program an ATtiny44A microcontroller on your Hello Button + LED board that we made during the [Electronics Design week](http://academy.cba.mit.edu/classes/electronics_design/index.html) using Neil's C code to echo back keyboard input.

### Necessary Toolchain Software

If you completed the electronics production assignment and programmed your FabISP  - *you should ALREADY HAVE the necessary toolchain.*  If you missed this week - [see the Electronics Production page](http://academy.cba.mit.edu/classes/electronics_production/index.html) for how to get the necessary software for your OS.

### Get the C Code From the Academy Site

Download Neil's  C code and makefile from the [week 9 lessons page, under "host communication"](http://academy.cba.mit.edu/classes/embedded_programming/index.html).

##### You will need the following files:

*   [hello.ftdi.44.echo.c](http://academy.cba.mit.edu/classes/embedded_programming/hello.ftdi.44.echo.c)
*   [hello.ftdi.44.echo.c.make](http://academy.cba.mit.edu/classes/embedded_programming/hello.ftdi.44.echo.c.make)

You will need open terminal and navigate to the location where you saved these files in order for the commands below to work. You must be in the same directory (or provide a path to the file).

### Connecting the Your Board and Programmer

*   You'll need to provide power to both your board and your
          programmer (FabISP).
*   Connect the programmer to the ISP
          header on the LED + Button board

### Configuring the ATtiny to run at 20 MHz (setting the fuses)

*   If you have already completed the first tutorial - [Using the Arduino IDE to program your board ](attiny_arduino.md)- you have already set the fuses to run at 20 MHz when you "burned the bootloader" and DO NOT need to do it again.

*   **If you have not completed this step** or by passe this tutorial then you need to set the fuses. To do this using the C code you downloaded:

### Programming the ATtiny with the Echo C Code

To program your board - open terminal and navigate to where you saved the C code and makefile. Type:

### To See the Code in Action:

We can use the **serial monitor** in the Arduino IDE to enter a single character and the hello echo program on your board will store the character and then echo (repeat it back) to the serial monitor. The program will store each character and repeat the series back to you each time.

#### Using the Arduino IDE:

##### Step 1: Open Arduino and then enable the Serial Monitor

  The serial monitor window will open.
  Make sure the "115200 baud" setting is selected.

##### Step 2: Type a single character into the top text entry area.

  Press "send" or hit the <ENTER> key.

  The character you type on the keyboard will be sent to the board via the serial port on your computer.  **The C code on the board will echo back the character that you typed.**


  Type another character into the top text entry area and hit "send" or hit the <ENTER> key. The characters you have typed so far are stored and echoed back along with the new character that you typed.

  Keep typing characters and letting them echo back until you reach the limit.


**Original tutorial by:**

* [Anna Kaziunas France](http://www.kaziunas.com) - [Fab Academy AS220 Providence, RI](http://www.as220.org/fabacademy) - March 2012
