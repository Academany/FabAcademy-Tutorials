# ATtiny44A Fuses

![Fab ISP](attiny44_fuses/full_board.jpg)

## What are the fuses?

There are 3 bytes of permanent storage in the chip called 'fuse low byte', 'fuse high byte' and 'fuse extended byte'. These bytes are called fuses and can be reprogrammed as many times as you want and determines the behaviour of the chip. To do that, their value is not erased when the chip is powered off or reprogrammed.

Each microchip has its own definition for the values that must have the fuses. In this tutorial, we are going to work with the fuses of the Atmel Attiny44A.

## Fuses for the Attiny44A

<table><thead><tr><th>Name</th><th>Description</th><th>Default Value</th><th>Byte</th><th>Bit range</th><th>Datasheet page</th></tr></thead><tbody><tr><th>CKDIV8</th><td>The prescaler feature can be used to change the power consumption when not high performance is required. This feature can be used with any clock source. The prescaler divides the clock frecuency by a defined factor that can be configured using the CLKPS(3...0) register (Datasheet - Table 6-11), being its default value "0011" (divistion factor of 8).</td><td>0</td><td>LOW</td><td>(7)</td><td>30</td></tr><tr><th>CKOUT</th><td>This fuse allows us to use the chip clock as a clock source to drive other circuits. Once this bit is programmed, the PIN B2 will output the clock.</td><td>1</td><td>LOW</td><td>(6)</td><td>30</td></tr><tr><th>SUT</th><td>This fuses determine the Start-up Times for the external clock selection. This time must be long enough to ensure that the MCU is kept in reset mode while the clock is changing (is not stable). Its default value defines the longest Start-up time.</td><td>10</td><td>LOW</td><td>(5,4)</td><td>26</td></tr><tr><th>CKSEL</th><td>The AMTEL Attiny44A can use several clock sources. By default, the clock used is the internal 8MHz oscillator. The available configurations can be found in the datasheet, in table 6-1.</td><td>0010</td><td>LOW</td><td>(3...0)</td><td>25</td></tr><tr><th>RSTDISBL</th><td>When programmed (0), the PB3, instead of being used as a reset pin, it can be used as an I/O pin.</td><td>1</td><td>HIGH</td><td>(7)</td><td>3</td></tr><tr><th>DWEN</th><td>This fuse allows the activation of the 'debug' mode. Once it is programmed, the RESET port is configured as a bidirectional I/O pin with pull-up enabled.</td><td>1</td><td>HIGH</td><td>(6)</td><td>150</td></tr><tr><th>SPIEN</th><td>Fuse that enables serial program and data downloading. Once unprogrammed this fuse, in order to reset its value, you will need a 12V programmer.</td><td>0</td><td>HIGH</td><td>(5)</td><td>159</td></tr><tr><th>WDTON</th><td>A watchdog timer is a mechanism to prevent closed loops and errors in the microchip. It consists on a decreasing counter. If it reaches 0, it generates a timeout signal that triggers an action to restore the system. To avoid this, the program must restart the timer before it times out.</td><td>1</td><td>HIGH</td><td>bit range</td><td>41</td></tr><tr><th>EESAVE</th><td>If programmed (0) the EEPROM memory will be preserved through chip erase.</td><td>1</td><td>HIGH</td><td>(4)</td><td>159</td></tr><tr><th>BODLEVEL</th><td>This fuse controles the Brown-out detector. A Broun-out detector is a circuit that monitors the supply voltage while operating. It compares the supplied voltage to a fixed one. If the supplied voltage decreases blow a fixed one (V<sub>BOT-</sub>), the Brown-out reset is enabled until the voltage raises above a V<sub>BOT+</sub>. Then a timer starts; if it times out, the reset is disabled. By default, the Brown-out detector is disabled. In table 20-6 of the Datasheet all the modes are specified.</td><td>111</td><td>HIGH</td><td>(2...0)</td><td>159 & 176</td></tr><tr><th>SELDPRGEN</th><td>This fuse, if programmed, allows to the device the ability to upload a program to the MCU by itself.</td><td>1</td><td>EXTENDED</td><td>(0)</td><td>152</td></tr></tbody></table>

As seen, there is just one bit in the Extended byte of the fuses whose value will change the microchip behaviour. The bytes 7...1 should be set with a value of 1.

# Fuse Calculator

For using the fuse calculator you need to download [this folder](attiny44_fuses/attiny44_fuses.rar) (right click on the link and "save as")and open the html inside.

**Original tutorial by:**

* [Alejandro Escario Ménde](http://fabacademy.org/archives/2015/eu/students/escario_mendez.alejandro/index.html)
[about me](https://www.linkedin.com/in/aescariom/)


Licensed under a [MIT  License](https://opensource.org/licenses/MIT)
