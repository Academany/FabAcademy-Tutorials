# Repository visualization with Gource

As some of you already know, for the past 10 years I've been researching how to analyse, visualise and design collaborative processes and organizations. I started this research at Politecnico di Milano (MSc), then continued independently (openp2pdesign.org), and then started a doctorate at Aalto University (Doctor of Arts). The research is still going on, and the Fab Academy might be an interesting context for this as well.

When I attended the Fab Academy in 2012 ([here](http://www.fabacademy.org/archives/2012/students/menichinelli.massimo/index.html#) the documentation, under Exercises > 20 BONUS), I created a video of its process with the [Gource](https://code.google.com/p/gource/) software:

[![Embedded Video](https://img.youtube.com/vi/EdmP596Pyv8/0.jpg)](https://www.youtube.com/embed/EdmP596Pyv8)

At the moment, there are very few softwares for visualizing the process in a Git/Hg repository, and I will probably work on new visualization softwares soon, but it will take some time. Meanwhile, I used again Gource for visualizing the process in the repositories I worked with during this Fab Academy: Europe, and the [Opendot](http://www.fabacademy.org/archives/2015/eu/labs/milan_od/index.html) + [WeMake](http://www.fabacademy.org/archives/2015/eu/labs/milan_wm/index.html) Fab Labs in Milan where I am the instructor. These videos were generated quite quickly, so they are not very refined at the moment, but they can give you an idea of what happened:

### EU Repo

[![Embedded Video](https://img.youtube.com/vi/_jeb2pRt-40/0.jpg)](https://www.youtube.com/embed/_jeb2pRt-40)

### WeMake Repo

[![Embedded Video](https://img.youtube.com/vi/VqDTP_llMwI/0.jpg)](https://www.youtube.com/embed/VqDTP_llMwI)

### Opendot Repo

[![Embedded Video](https://img.youtube.com/vi/fBtp9rNTxSQ/0.jpg)](https://www.youtube.com/embed/fBtp9rNTxSQ)

## Instructions

On Linux, you can download and compile Gource. On Mac, I installed Gource with:

    brew install gource

...and Avconv, for rendering the video, with:

    brew install libav

You can then export a log file from the repo, in order to use that for rendering the video:

    gource --output-custom-log file.log

The basic usage of Gource is without avatars. There are few scripts around that download avatars from gravatar.com, I modified them in two scripts: one that get avatars also from GitHub, and another that get avatars from a Mercurial repo:

https://gist.github.com/openp2pdesign/df8d5117f1ead0d65b75.js

https://gist.github.com/openp2pdesign/15db406825a4b35783e2.js

There are many many options for controlling Gource, here's my setup for creating the video and converting at the same time:

> gource 1280x720 --user-image-dir ../FabAcademy2015-WeMake/.git/avatar/ gource --seconds-per-day 1 --stop-at-end --highlight-users --multi-sampling --output-ppm-stream --output-framerate 30 --title "Fab Academy 2015 - WeMake (Milan)" --hide mouse,filenames,progress wemake.log -o - | avconv -y -r 30 -f image2pipe -vcodec ppm -i - -b 65536K wemake.mp4

The EU repo is too big: too many files and users, so I changed a bit the settings:

> gource 1280x720 --user-image-dir ../europe/.hg/avatar/ gource --seconds-per-day 1 --stop-at-end --highlight-users --multi-sampling --output-ppm-stream --output-framerate 30 --title "Fab Academy 2015 - Europe" --hide dirnames,bloom,mouse,filenames,progress eu.log -o - | avconv -y -r 30 -f image2pipe -vcodec ppm -i - -b 65536K europe.mp4</div>
<div id="footer">

**Original tutorial by:**

Massimo Menichinelli - [info at openp2pdesign.org](mailto:info@openp2pdesign.org) - [massimo.menichinelli at aalto.fi](mailto:massimo.menichinelli@aalto.fi)

This work is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).
