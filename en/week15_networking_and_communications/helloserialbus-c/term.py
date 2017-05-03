#!/usr/bin/env python
#
# term.py
#
# term.py serial_port port_speed
#
# Neil Gershenfeld
# CBA MIT 7/27/07
#
# (c) Massachusetts Institute of Technology 2007
# Permission granted for experimental and personal use;
# license for commercial sale available from MIT.
#

import sys,time,serial
from Tkinter import *
from select import *

NROWS = 25
NCOLS = 80

def key(event):
   #
   # key press event handles
   #
   key = event.char
   #print 'send',ord(key)
   if (ord(key) == 13):
      key = chr(10)
   ser.write(key)

def quit():
   #
   # clean up and quit
   #
   sys.exit()

def idle(parent):
   #
   # idle loop
   #
   wait = ser.inWaiting()
   if (wait != 0):
      #
      # read character
      #
      byte = ser.read()
      widget_text.config(state=NORMAL)
      #print byte,ord(byte)
      if (ord(byte) == 10):
         #
	 # CR
	 #
	 widget_text.insert(INSERT,'\n')
	 if (int(float(widget_text.index(END))) > (NROWS+1)):
	    widget_text.delete(1.0,2.0)
      #if (ord(byte) == 13):
         #
	 # CR
	 #
	 #widget_text.insert(INSERT,'\n')
	 #if (int(float(widget_text.index(END))) > (NROWS+1)):
	 #   widget_text.delete(1.0,2.0)
      elif (byte == 8):
         #
         # BS
         #
         widget_text.delete(INSERT+"-1c",INSERT)
      else:
         #
         # character
         #
         widget_text.insert(INSERT,byte)
      widget_text.config(state=DISABLED)
   time.sleep(0.001)
   parent.after_idle(idle,parent)

#
#  check command line arguments
#
if (len(sys.argv) != 3):
   print "command line: term.py serial_port speed"
   sys.exit()
port = sys.argv[1]
speed = int(sys.argv[2])
#
# open serial port
#
ser = serial.Serial(port,speed)
ser.setDTR()
#
# set up UI
#
root = Tk()
root.bind('<Key>',key)
root.title('term.py')
#
widget_quit = Button(root, text="quit",command=quit)
widget_quit.pack()
#
address_frame = Frame(root)
Label(address_frame,text="port: "+port).pack(side='left')
Label(address_frame,text="  speed: "+str(speed)).pack(side='left')
address_frame.pack()
#
widget_text = Text(root, bg='white', bd=5, width=NCOLS, height=NROWS, font=('arial',10,'bold'))
#widget_text.bind('<Key>',key)
widget_text.config(state=DISABLED)
widget_text.pack()
#
# begin event loop
#
root.after(100,idle,root)
root.mainloop()
