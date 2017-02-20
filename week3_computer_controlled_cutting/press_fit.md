# Press-Fit Construction Tips

## Press-fit construction is also known as [interference fit or friction fit](https://en.wikipedia.org/wiki/Interference_fit)

**Summary for press-fit**

* Your pieces must fit together without using glue, nails, screws or other fasteners.
* You will need to adjust your joints to fit together in a precise way.
* Please note that if you change your material type (or switch to a different supplier - for example: swapping one type of plywood for another type.) the thickness of your material will change and your joints may no longer fit snuggly together.

### Press-Fit Construction Tips
Check out the Full Text [Here](http://blog.makezine.com/2010/01/14/letters-from-the-fab-academy-part-1/)

Fairly **precise** cuts are necessary in press-fit construction, in the thousandth-of-inch range. Although the laser cutter is a very precise tool, you'll still find a measurable variance in **kerf** (i.e. width of material removed) depending on the material, the state of the optics, and the quality of the air exhaust. You'll also find that off-the-shelf sheet material like plywood usually varies from piece-to-piece by +/- .005 inches or so.

Because you will inevitably have to tweak a press-fit design to match the materials and equipment at hand, your design should be created so that the width of slots and notches can be changed parametrically. *It's also important to chamfer (i.e. cut at a 45 degree angle) the edges of the press-fit notches*

>Without a proper chamfer, you may not be able to slide the pieces together to get an effective joint.
FabAcademy01img05.jpg

[Inkscape](https://inkscape.org/en/) is a great open source vector drawing program. When designing for the laser cutter, thin red lines cut and black/grey values are engraved. Note the chamfers…

Full-featured CAD programs, like QCad, make it relatively easy to parameterize parts, but it's also possible to use Inkscape to make parametric designs using the clone tool.

### Steps to follow

First, follow these steps to determine the base size of a press-fit notch:


* With calipers, measure the kerf created by your laser cutter. Cut a square, then measure the inner dimension of the hole and the outer dimension of the piece. Subtract and divide by two: this is the kerf for that material.
* Measure the thickness of the material, preferably with calipers.
* Use these measurements to draw your best guess for a notch
* Duplicate the notch a few times and bracket in .001 inch increments (i.e., make some at w-.002″, w-.001″, w+.001″, w+.002″ etc.).
* Cut and test the fit
* Repeat an do minor adjustments

Once you have a good dimension, create a [template layer in Inkscape](press_fit_inkscape.md) with your basic notch shapes. When adding a notch to your design, use the Edit->Clone option to create a linked copy of the notch.

When faced with modifying your drawing for a new material width, update the dimensions of the notch in the template layer and watch those changes update throughout the document.

### More About Using Clones In Inkscape

Inkscape is capable of creating "clones" of objects, which are somewhat similar to Adobe Illustrator's Symbols. *When you edit the original, the changes are propagated to all of its clones.* Clones can be transformed, but their nodes cannot be edited. Clones can themselves be cloned.

You can use the Edit > Tile clones command to create patterns and arrangements of clones. A clone can be painted if the original has unset fill or stroke.

>Inkscape's clones are not stored in a palette.

**How to Clone / Resize**

* [Cloning and tiling](http://www.linuxformat.com/wiki/index.php/Inkscape_-_cloning_and_tiling#PART_1_.E2.80.93_HOW_CLONING_WORKS)
* [Quick guide to inkscape](http://www.microugly.com/inkscape-quickguide/#clone-objects)

### Other press-fit resources

http://www.makercase.com/

http://boxmaker.rahulbotics.com/

http://www.slideshare.net/bereketnesh/press-fit-exercise

http://makearchitecture.wordpress.com/people-2/jd-sassaman/asn2-laser-cutterpress-fit/

http://www.instructables.com/id/Press-fit-Construction-Kit/

http://cucfablab.org/book/press-fit-box

http://unlimiteddesigncontest.org/en/product/magic-box-entirely-new

http://www.adafruit.com/blog/2011/08/12/laser-cut-project-box-tutorial/

http://store.curiousinventor.com/blog/how-to-make-cheap-lasercut-custom-boxes-for-your-diy-electronics

http://www.slideshare.net/AYSHESHIM/press-fit

http://fablab.waag.org/archive/stand-camm-1-gx-24-vinyl-cutter

http://www.fabhub.net/showthread.php?31-quot-Getting-Started-quot-projects-20-1-hour-projects-at-the-Fab-Lab

http://www.ehow.com/how_7978816_press-fit-magnets.html

http://mauimakers.com/wiki2/doku.php?id=laser_cutting

**Original tutorial by:**

* [Anna Kaziunas France](http://www.kaziunas.com/site/404.php)
| v1.0 | 2012

* Updated by [Eduardo Chamorro](http://eduardochamorro.github.io/beansreels/index.html), Fab Lab Seoul 01.2017

Licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 3.0](https://creativecommons.org/licenses/by-nc-sa/3.0/) Unported License
