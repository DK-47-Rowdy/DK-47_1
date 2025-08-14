#include <Wire.h>

#define VSYNC 3
#define HREF  4
#define PCLK  2

const int dataPins[8] = {5, 6, 7, 8, 9, 10, 11, 12};

void setup() {
  Serial.begin(115200);
  for (int i = 0; i < 8; i++) {
    pinMode(dataPins[i], INPUT);
  }
  pinMode(VSYNC, INPUT);
  pinMode(HREF, INPUT);
  pinMode(PCLK, INPUT);
}

void loop() {
  // Wait for VSYNC (start of frame)
  while (digitalRead(VSYNC) == HIGH);
  while (digitalRead(VSYNC) == LOW);

  for (int y = 0; y < 60; y++) {
    for (int x = 0; x < 80; x++) {
      while (digitalRead(PCLK) == LOW);
      byte pixel = 0;
      for (int i = 0; i < 8; i++) {
        pixel |= (digitalRead(dataPins[i]) << i);
      }
      Serial.write(pixel);
      while (digitalRead(PCLK) == HIGH);
    }
  }
}
