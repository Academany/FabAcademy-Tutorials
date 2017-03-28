# wxPython

[wxPython](http://en.wikipedia.org/wiki/WxPython) is a wrapper for the cross-platform GUI API wxWidgets, which have a native look and file. Here are few resources for working with it.

## Installation

*   **Ubuntu:**_sudo apt-get install python-wxtools_
*   **OSX:** download the binary from [here](http://www.wxpython.org/download.php) or with _brew install wxwidgets wxpython_
*   **Windows:** download the binary from [here](http://www.wxpython.org/download.php)

## A very nice guide to wxPython

[http://zetcode.com/wxpython/](http://zetcode.com/wxpython/)

## A sample wxPython app

A GCode-STL viewer in Python (wxPython for the GUI and PyOpenGl for the 3D visualization): [https://github.com/dkobozev/tatlin](https://github.com/dkobozev/tatlin)

## A wxPython GUI builder

There are manu GUI builders, my favourite is wxFormBuilder. But only from version 3.3 it exports the code in Python, so here's the link to the right folder: [http://sourceforge.net/projects/wxformbuilder/files/wxformbuilder-nightly/3.3.04-beta/](http://sourceforge.net/projects/wxformbuilder/files/wxformbuilder-nightly/3.3.04-beta/). Remember that the app export only the classes that you create/customize, you then have to create objects and launch the app, for example with a code like this:

      # -*- coding: utf-8 -*-

      # Main library
      import wx
      # This is the file as exported from wxFormBuilder. It is just a .py file in the same folder
      import wxidelib

      # Create an app
      ex = wx.App()
      # Create a frame from my custom class
      ex1 = wxidelib.MyFrame1(None)
      # Show the frame! Otherwise it won't work. wxFormBuilder does not add this
      ex1.Show()
      # Initialize the event loop
      ex.MainLoop()

## Reading data from serial and drawing it on wxPython

The important thing when [reading data from serial](python_serial.md), is to bind the reading of the data to a timer, so that the app will read data only at a certain rate and it won't crash. Here's a basic example that draws a line and a rectangle from the wxPython API (but you can use other Python libraries for drawing, like Matplotlib or Cairo).

**Code**

https://gist.github.com/openp2pdesign/a027a9fc5aac66e6a382.js

## Drawing serial data with wxPython+Matplotlib

You can also include Matplotlib visualizations in wxPython. Here are some sample codes: [01](http://stackoverflow.com/questions/10737459/embedding-a-matplotlib-figure-inside-a-wxpython-panel), [02](http://wiki.wxpython.org/MatplotlibFourierDemo). Here's my code, that reads from serial data:

**Code**

https://gist.github.com/openp2pdesign/adf137826b688f08ab35.js



**Original tutorial by:**

* Massimo Menichinelli - [info at openp2pdesign.org](mailto:info@openp2pdesign.org) - [massimo.menichinelli at aalto.fi](mailto:massimo.menichinelli@aalto.fi)


This work is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).
