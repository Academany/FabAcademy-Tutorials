# Timing a second using an AVR microcontroller

## This tutorial runs through how to use timer interrupts to efficiently time a second, whilst doing other tasks at the same time (synchronously).

**Summary:**

* If you want a microcontroller to do something regularly, there are several ways to get that to happen
* For the purposes of this tutorial, we will be toggling an LED connected to PA7 once a second using an ATtiny44 with a 20 MHz crystal, but the code should be easily adaptable to other situations.

###  Method one - using a delay
The first way you might learn to do this is by using **_delay_ms()** to wait a second between switching the LED on or off.


    #include <avr/io.h>

    #include <util/delay.h>

     int main (void) {
        DDRA |= (1 << PA7); // set LED pin as output
        while(1) { // main loop
          PORTA |= (1 << PA7); // switch on the LED
          _delay_ms(1000); // wait a second
          PORTA &= ~(1 << PA7); // switch off the LED
          _delay_ms(1000); // wait a second
        }
      }


We can already make this a little more efficient by using the ^= assignment operator to toggle the LED:



    #include <avr/io.h>

    #include <util/delay.h>

    int main (void) {
      DDRA |= (1 << PA7); // set LED pin as output
      while(1) { // main loop
        PORTA ^= (1 << PA7); // toggle the LED
        _delay_ms(1000); // wait a second
      }
    }

So this works fine, but while the program is waiting in the **_delay_ms()** function, it can't be doing anything else. What would be more useful is if the program could be doing other tasks, and each time a second is up it could get a reminder to toggle the LED then go back to what it was doing.

### Method two - using a timer

The ATtiny44 has two internal timers that can be very useful in this situation.

>Timers are registers that increase from zero to 0xFF (255) or 0xFFFF (65535) depending on whether they are 8-bit or 16-bit. By default they increment at the speed of the microcontroller (in this case 20 MHz, or 20,000,000 times per second). When they reach the maximum value, they overflow back to zero and start counting again. The function of the timers can be modified by settings various control bits, as outlined in the [datasheet](http://www.atmel.com/devices/ATTINY44.aspx).

 Timers generate interrupts which is how they can interact with your program. An interrupt is something that occurs when a particular trigger (either from an internal or external source) happens; the interrupt allows the program to stop what it was doing, perform a short task, and then return to where it left off in the main program.

To accurately count a second, it doesn't make sense to count 20,000,000 clock cycles.
* Instead it is more efficient to slow down the rate of the timer in relation to the microcontroller, and count to a lower number that fits within an 8- or in this case a 16-bit register. To do this, we can pre-scale the timer by settings the Clock Select bits **(CS12:10)** in Timer/Counter1 Control Register B **(TCCR1B)**. *This allows us to slow down the timer by a factor of 1, 8, 64, 256 or 1024 compared with the clock source. However, it is unlikely that counting to 65535 at any of these speeds with take exactly one second.*

* Instead we need to calculate what number must be counted to, and make the timer overflow when it hits that number. This is a different mode of timer operation, called CTC (Clear Timer on Compare). To use this mode, the Waveform Generation Mode bits **(WGM13:10)** in **TCCR1A** and **TCCR1B** must be set accordingly. To ensure that a signal is received when the timer overflows, the Timer/Counter1 Output Compare A Match interrupt **(OCIE1A)** bit must be set in the Timer/Counter1 Interrupt Mask Register **(TIMSK1)**.

* So what number shall we count to? In relation to the 20 MHz clock speed, a second is a very long time so it makes sense to pre-scale the timer to as slow as possible. So it will be incrementing at a rate of **20000000 Hz/1024 = 19531.25 Hz**. Counting to 65535 at this speed would take **65535/19431.25 = 3.355392 seconds**. Therefore 1 second will take** 65535/3.355392=19531.25** increments. To set this as the maximum the timer should count to, we set Output Compare Register 1 A **(OCR1A)** to 19531.

That was everything required to prepare the timer, so the only thing remaining is to handle the interrupt. 
* Firstly, interrupts must be enabled with sei(). We then include the function that corresponds to the interrupt that we have activated; in this case setting the **OCIE1A** bit corresponds to the **TIM1_COMPA_vect** Interrupt Service Routine **(ISR)**. Inside this routine, we simply toggle the LED as before. Here is the completed program:

    #include <avr/io.h>
    #include <avr/interrupt.h> // notice that we have swapped libraries, from delay to interrupt


      int main (void) {
        DDRA |= (1 << PA7); // set LED pin as output
        TCCR1B |= (1 << WGM12); // configure timer1 for CTC mode
        TIMSK1 |= (1 << OCIE1A); // enable the CTC interrupt
        sei(); // enable global interrupts
        OCR1A   = 19531; // set the CTC compare value
        TCCR1B |= ((1 << CS10) | (1 << CS12)); // start the timer   at 20MHz/1024
        while(1) { // main loop - do anything you like here!
        }
      }



      ISR(TIM1_COMPA_vect) { // this function is called every time the timer reaches the threshold we set
        PORTA ^= (1 << PA7); // toggle the LED
      }






Hopefully that all makes sense. Timers have several other functions not discussed here, including direct manipulation of pins and generation of pulse width modulation signals. There are also a range of interrupt vectors, including ones useful for checking pin states and communication protocols.

**Original tutorial by:**

* Joel Rae | v1.0 | May 2013


Licensed under a [Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/)
