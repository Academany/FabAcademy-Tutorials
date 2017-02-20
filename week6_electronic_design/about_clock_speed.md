# About Clock and Speed

## Why did we put a 20MHz crystal on the Hello FTDI?


Partially it's serial rates-- the 20MHz crystal comfortably achieves all but one of the standard speeds:

* [http://wormfood.net/avrbaudcalc.php](http://wormfood.net/avrbaudcalc.php)

Partially it's that the 8MHz internal oscillator varies a lot with voltage and temperature. The internal oscillator is perfect for low-power applications, however, and will run as low as 128kHz, consuming very little power. The upper limit for serial speed at that clock rate is 8000 bits per second, which is reasonable for a lot of applications. A good set of rules of thumbs (and perhaps big toes, if you run out of thumbs) is that since a character's a byte, a byte's 8 bits, an english word is about 5 characters on average, that's about a page of english text per second. Not a fun speed to browse the web at, but more than enough for a plant humidity monitor.

You'll notice that 8MHz can do 250kbps, hypothetically. I believe it, but we'd need a very stable environment to a achieve that without errors.

Here's a stackexchange thread about high speed serial specifically on Arduino.
* [http://arduino.stackexchange.com/questions/296/how-high-of-a-baud-rate-can-i-go-without-errors](http://arduino.stackexchange.com/questions/296/how-high-of-a-baud-rate-can-i-go-without-errors)


**Original tutorial by:**

* Nadya Bedford
By Xinao Wang, Dean, and Virginia McCreary | v1.0 | 10.2014

* Remixed/Updated by [Eduardo Chamorro](http://eduardochamorro.github.io/beansreels/index.html), Fab Lab Seoul 01.2017

Licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 3.0](https://creativecommons.org/licenses/by-nc-sa/3.0/) Unported License
