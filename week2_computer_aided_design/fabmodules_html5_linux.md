

# HTML5 FabModules setup tutorial



### This short tutorial shows how to setup the new HTML5-based version of Fab Modules

## Find the modules

You can find the new modules at the following address

[http://mod.cba.mit.edu/mods.html](http://mod.cba.mit.edu/mods.html)

## Pre-requisites

There are some pre-requisites

*   wget (apt-get install wget on a debian / ubuntu system)

*   node.js & npm (download from [nodejs.org](http://nodejs.org) and follow instructions there)

*   Python

*   PySerial library. After getting python working, just run

    sudo pip install pyserial

## Download instructions

Open a terminal and create a folder where you like the fabmodules to be downloaded.

In my case its /opt/fabmodules, and I'm creating it with sudo and I'm changing the ownership for this folder to my user :

    sudo mkdir /opt/fabmodules
    sudo chown -R fiore /opt/fabmodules

At this point make sure you have wget installed. Start downloading the first file:

    cd /opt/fabmodules
    wget http://mod.cba.mit.edu/mod_get

Now make it executable and run it:

    chmod +x mod_get
    ./mod_get

If you followed all the instructions correctly you should now have inside /opt/fabmodules a folder named **mod.cba.mit.edu**.

    cd mod.cba.mit.edu

You now need to copy it alogn with the mod_server folder to /usr/local/bin, make sure you use sudo if you don't have enough privileges. Also you need to make the mod_serve file executable:

    sudo cp -R mod_serve mod_server /usr/local/bin
    sudo chmod +x /usr/local/bin/mod_serve

We are almost done.

## Start Fab Modules

You now can run the mod_serve, check /usr/local/bin is in your path:

    mod_serve &
    listening for connections from 127.0.0.1 on 12345

You can install mod_serve on all machines where you have machines attached. Then from the Fab Modules interface type in your server/port combination instead of 127.0.0.1:12345.

You can change the host and port inside the mod_server.js file, look at the top the two lines:

    var server_port = '12345'
    var client_address = '127.0.0.1'

Changing client_address to 0.0.0.0 will make the server listen for connections coming from any machine in the local network (or the whole internet if the machine has a public ip-address, not recommended).

You can also change the port to any greater than 1024 (otherwise you must launch mod_serve with sudo, again not recommended).

### Starting mod_serve every time the machine is switched on

As you might notice you must launch the mod_serve manually every time you want to use Fab Modules.

You can automate this process, assuming you are running a Linux system supporting "Upstart" by creating a service entry for it.

Add a user to the system. I.e. fabmodules

    sudo adduser fabmodules

Create (with sudo/root) a new file named /etc/init/fabmodules.conf, and add inside it

    # upstart service file at /etc/init/fabmodules.conf
    description "HTML5 Fab Modules"
    author "http://mod.cba.mit.edu"

    # When to start the service
    start on runlevel [2345]

    # When to stop the service
    stop on shutdown

    # Automatically restart process if crashed
    respawn
    respawn limit 10 5

    # drop root proviliges and switch to mymetorapp user
    setuid fabmodules
    setgid fabmodules

    script
    export PATH=/usr/local/bin:/opt/local/sbin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
    export NODE_PATH=/usr/lib/nodejs:/usr/lib/node_modules:/usr/share/javascript
    # set to home directory of the user Meteor will be running as
    export PWD=/home/fabmodules
    export HOME=/home/fabmodules
    exec /usr/local/bin/mod_serve >> /home/fabmodules/fabmodules.log
    end script

You can test / start your service with

    sudo service fabmodules start

Stop your service with

    sudo service fabmodules stop

If you find any issue go and look into the /home/fabmodules/fabmodules.log file. Be aware the log might grow big in time. So you might replace the >> with single >, to replace the whole file at each startup rather than appending to it.

## Using Fab Modules

You can use the new Fab Modules in different ways:

### Locally from your computer

Just open the index.html in your browser, and you should be going.

### Locally from a web server

You can run your own webserver on the local folder. Assuming you have Python installed just run inside the folder:

    python -m SimpleHTTPServer

The open the page http://localhost:8000

### Using the CBA server

Open your browser on the http://mod.cba.mit.edu page and use the hosted version of the modules.

## Optional configuration

The file mod_settings contains the ports and speeds used for the modules operation. Make sure they match your actual devices.

You can load your mod_settings using the last menu item appearing when you open the index.html page.

* * *




**Original tutorial by:**

* Fiore Basile - [fiore.basile@gmail.com](mailto:fiore.basile@gmail.com) - Last updated 2015-01-26
