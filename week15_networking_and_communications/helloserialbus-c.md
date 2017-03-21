# Hello Serial Bus - Using C

![bus](http://blog.kaziunas.com/wp-content/uploads/2011/05/IMG_4737.jpg "IMG_4737")

The purpose of this hello world example is to network several boards together in the form of  a serial bus.  The bridge board is connected to a computer via a FTDI cable. The two node boards are connected to the bridge board.

#### To replicate this example:

1.  [Download the Fab Academy board diagrams / pngs and code.](http://academy.cba.mit.edu/classes/networking_communications/index.html)
2.  For each node in your network, you will need to modify the modify the "hello.bus.45.c" code.
3.  You need to change the line: #define node_id '0' --> each node needs to have a different number (0, 1, 2, 3 - for each additional node you add.
4.  After flashing boards with 3 different node numbers:
5.  Open a Arduino IDE
6.  Open the serial monitor
7.  Enter number of note into serial monitor - press "enter"
8.  The node name (ex: node 1) should echo in on the serial monitor and the LED on the board that was flashed with the node id of 1 should flash.

Alternately- If you don't have / want to use the Arduino IDE,

1.  After flashing boards with 3 different node numbers:
2.  [ Download term.py(righ click save as)](helloserialbus-c/term.py)
3.  Run term.py

        In Ubuntu this is:

        The node name (ex: node 1) should echo in on the serial monitor and the LED on the board that was flashed with the node id of 1 should flash.


**Original tutorial by:**

* Tutorial by [Anna Kaziunas France](http://www.kaziunas.com) - [Fab Academy AS220 Providence, RI](http://www.as220.org/fabacademy) - March 2012

Licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 3.0](https://creativecommons.org/licenses/by-nc-sa/3.0/) Unported License
