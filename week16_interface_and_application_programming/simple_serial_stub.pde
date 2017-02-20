import processing.serial.*;

int w =500  ;  
int h = 500  ;   
int val =0;

// The serial port:
Serial myPort;       


void setup() {
  println(Serial.list());  // This will show all the available ports
  int p = 4;  // Choose one from the list printed above
  myPort = new Serial(this, Serial.list()[p], 9600); // opens the port
  
  fill(255,0,0);
  stroke(255,0,0);
  size(w, h);
  
}

void draw() {
  if (val == 0) { background(237,237,213); }
  while (myPort.available() > 0) {
    val = myPort.read();
    ellipse(w/2, h/2, val*2, val*2);
  }
 
}
