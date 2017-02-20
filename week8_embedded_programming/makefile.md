# Makefile for Embedded Programming


**Summary:**
* 01. AVR, avr-gcc and avrdude
* 02. Make and makefiles
* 03. The Fab Academy example

###  AVR, avr-gcc and avrdude
According to [Wikipedia](https://en.wikipedia.org/wiki/Atmel_AVR):

 >The AVR is a modified [Harvard architecture](https://en.wikipedia.org/wiki/Modified_Harvard_architecture) [8-bit](https://en.wikipedia.org/wiki/8-bit) [RISC](https://en.wikipedia.org/wiki/Reduced_instruction_set_computing) single-chip [microcontroller](https://en.wikipedia.org/wiki/Microcontroller), which was developed by [Atmel](https://en.wikipedia.org/wiki/Atmel) in 1996.

Since we normally use AVR microcontrollers in the Fab Academy, we need write a C code for them, compile it with avr-gcc and send it to the microcontroller with avrdude.
*All the instructions on the Makefile for this exercises basically deals with almost only these two commands.*
 **But what is a Makefile?**

###  AVR, avr-gcc and avrdude

 When you need to deal with multiple configurations and commands when compiling a software, you can use the [make](https://en.wikipedia.org/wiki/Make_(software)) command on Mac/Linux for automatizing this task. Furthermore, you can distribute it to other people that can therefore use it for compiling your software easily.

 **make** reads automatically a **Makefile** file in the folder where you launch it (it should be the folder where your project can be found). Otherwise, you can specify it with **make -f filename**, especially if you have more Makefiles with different names.

 The structure of a **Makefile** is very simple, and more tutorials about it can be found [here](https://en.wikipedia.org/wiki/Make_(software)), [here](http://mrbook.org/blog/tutorials/make/) or [here](http://www.opussoftware.com/tutorial/TutMakefile.htm)

  #### Let's look at a ready-made example for the Fab Academy.

### The Fab Academy example

On the [lecture page](http://academy.cba.mit.edu/classes/embedded_programming/index.html) there is already a [C program](academy.cba.mit.edu/classes/embedded_programming/hello.ftdi.44.echo.c) that can be compiled and uploaded to the Hello Board (with an Attiny44).

Let's say that the program is ok for your board (and that your board is ok), so we can learn from its **Makefile** in order to understand how to modify it or create our own **Makefile**. The file is called [hello.ftdi.44.echo.c.make](academy.cba.mit.edu/classes/embedded_programming/hello.ftdi.44.echo.c.make) so you can download it and rename it to **Makefile**, so that make will automatically load it. Here is its content:

>PROJECT=hello.ftdi.44.echo
SOURCES=$(PROJECT).c
MMCU=attiny44
F_CPU = 20000000

>CFLAGS=-mmcu=$(MMCU) -Wall -Os -DF_CPU=$(F_CPU)

>$(PROJECT).hex: $(PROJECT).out
	avr-objcopy -O ihex $(PROJECT).out $(PROJECT).c.hex;\
	avr-size --mcu=$(MMCU) --format=avr $(PROJECT).out

>$(PROJECT).out: $(SOURCES)
	avr-gcc $(CFLAGS) -I./ -o $(PROJECT).out $(SOURCES)

>program-bsd: $(PROJECT).hex
	avrdude -p t44 -c bsd -U flash:w:$(PROJECT).c.hex

>program-dasa: $(PROJECT).hex
	avrdude -p t44 -P /dev/ttyUSB0 -c dasa -U flash:w:$(PROJECT).c.hex

>program-avrisp2: $(PROJECT).hex
	avrdude -p t44 -P usb -c avrisp2 -U flash:w:$(PROJECT).c.hex

>program-avrisp2-fuses: $(PROJECT).hex
	avrdude -p t44 -P usb -c avrisp2 -U lfuse:w:0x5E:m

>program-usbtiny: $(PROJECT).hex
	avrdude -p t44 -P usb -c usbtiny -U flash:w:$(PROJECT).c.hex

>program-usbtiny-fuses: $(PROJECT).hex
	avrdude -p t44 -P usb -c usbtiny -U lfuse:w:0x5E:m

>program-dragon: $(PROJECT).hex
	avrdude -p t44 -P usb -c dragon_isp -U flash:w:$(PROJECT).c.hex

If you launch a simple **make** in the terminal, only the first part will be executed, this:

>PROJECT=hello.ftdi.44.echo
SOURCES=$(PROJECT).c
MMCU=attiny44
F_CPU = 20000000

>CFLAGS=-mmcu=$(MMCU) -Wall -Os -DF_CPU=$(F_CPU)

>$(PROJECT).hex: $(PROJECT).out
	avr-objcopy -O ihex $(PROJECT).out $(PROJECT).c.hex;\
	avr-size --mcu=$(MMCU) --format=avr $(PROJECT).out

>$(PROJECT).out: $(SOURCES)
	avr-gcc $(CFLAGS) -I./ -o $(PROJECT).out $(SOURCES)

The first four lines are for configuring the Makefile:

    * Name of the file to compile
    * Extension of the file to compile
    * Microcontroller to program
    * Frequency of the board to program

The other lines initialize the process and compile the C script with avr-gcc.

The other part of the file (and that won't be executed with a simple **make** command) consists of different instructions, that can be specified after **make**:

  *   make program-bsd
  *   make program-dasa
  *   make program-avrisp2
  *   make program-avrisp2-fuses
  *   make program-usbtiny
  *   make program-usbtiny-fuses

>program-bsd: $(PROJECT).hex
	avrdude -p t44 -c bsd -U flash:w:$(PROJECT).c.hex

>program-dasa: $(PROJECT).hex
	avrdude -p t44 -P /dev/ttyUSB0 -c dasa -U flash:w:$(PROJECT).c.hex

>program-avrisp2: $(PROJECT).hex
	avrdude -p t44 -P usb -c avrisp2 -U flash:w:$(PROJECT).c.hex

>program-avrisp2-fuses: $(PROJECT).hex
	avrdude -p t44 -P usb -c avrisp2 -U lfuse:w:0x5E:m

>program-usbtiny: $(PROJECT).hex
	avrdude -p t44 -P usb -c usbtiny -U flash:w:$(PROJECT).c.hex

>program-usbtiny-fuses: $(PROJECT).hex
	avrdude -p t44 -P usb -c usbtiny -U lfuse:w:0x5E:m

>program-dragon: $(PROJECT).hex
	avrdude -p t44 -P usb -c dragon_isp -U flash:w:$(PROJECT).c.hex

Each section specifies the terminal commands that will be executed for each option. In this case, each option is configured for a different ISP, sometimes the programming of the fuses is separated from the programming of the board. You can even add your own section, with the name that you prefer. For example, if you insert this section called "all-in-once", you can program the fuses and the board with the FabISP with one command (**make all-in-once**):

>all-in-once: $(PROJECT).hex
    avrdude -p t44 -P usb -c usbtiny -U lfuse:w:0x5E:m
    avrdude -p t44 -P usb -c usbtiny -U flash:w:$(PROJECT).c.hex

**Original tutorial by:**

* [Massimo Menichinelli ](mailto:massimo.menichinelli@aalto.fi)
[openp2pdesign](mailto:info@openp2pdesign.org) | v1.0 |


Licensed under a [Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/)
