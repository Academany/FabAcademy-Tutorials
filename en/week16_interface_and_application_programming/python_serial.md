# Reading data from serial in Python

Reading data from serial in Python is very simple, but this is only the start.. Install PySerial with _pip install pyserial_

    # Import the library
    import serial

    # Try to connect to the port
    try:
    fabkit = serial.Serial('/dev/tty.usbmodem1421', 9600)
    except:
    print "Failed to connect"
    exit()

    # Read data and print it to terminal... until you stop the program
    while 1:
    line = fabkit.readline()
    print line

    # We should close the connection... but since there's a while 1 loop before, we never reach this
    fabkit.close()


**Original tutorial by:**

* Massimo Menichinelli - [info at openp2pdesign.org](mailto:info@openp2pdesign.org) - [massimo.menichinelli at aalto.fi](mailto:massimo.menichinelli@aalto.fi)


This work is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).
