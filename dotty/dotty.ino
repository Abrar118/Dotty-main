#include <LedControl.h>

// Pin assignments for the MAX7219
const int dataIn = 7;  // Data In
const int clk = 6;     // Clock
const int cs = 5;      // Chip Select
const int cs2 = 4;
byte matNum = 1;
String hDirection = "right";
String vDirection = "up";
int _delay = 50;
const int ps = 3;
int lip = 3;
int rip = 3;
int current32 = 1;  // 1 is the one with yellow cs pin

int P1Score = 0;
int P2Score = 0;

#define JH1 A0
#define JV1 A1
#define JH2 A2
#define JV2 A3

// Create a new LedControl object
LedControl lc = LedControl(dataIn, clk, cs, 4);  // (DataIn, CLK, CS, number of devices)
LedControl lc2 = LedControl(dataIn, clk, cs2, 4);

void setup() {

  turnOnLeds();
  Serial.begin(9600);
  Serial.println("Start");
}

void loop() {
  int x = 1;
  int y = 4;

  while (true) {
    // clearLED(2, 0);
    // delay(_delay);
    // lightLED(2, 0, x, y);
    int H1 = analogRead(JH1);
    int V1 = analogRead(JV1);
    int H2 = analogRead(JH2);
    int V2 = analogRead(JV2);

    // makeLeftPaddle();
    // makeRightPaddle();
    makeBothPaddles();
    moveLeftBat(H1);
    moveRightBat(H2);

    bool pointUpdated = checkIfPointScored(x, y);
    if (pointUpdated) {
      for (int i = 0; i <= 3; i++) {
        clearLED(current32, i);
      }
      makeBothPaddles();
      delay(3000);
      x = 4;
      y = 0;
      matNum = 1;
    }
    if (hDirection == "right") {
      if (y < 0) {
        matNum = matNum + 1;
        y = 7;
      }
      if (y == 1 && matNum == 3) {
        hDirection = "left";
      }

      if (x == 7) {
        vDirection = "down";
      }
      if (x == 0) {
        vDirection = "up";
      }

      if (vDirection == "up") moveUpRight(x, y);
      else moveDownRight(x, y);
    }

    else if (hDirection == "left") {
      if (y > 7) {
        matNum = matNum - 1;
        y = 0;
      }
      if (y == 6 && matNum == 0) {
        hDirection = "right";
      }

      if (x == 7) {
        vDirection = "down";
      }
      if (x == 0) {
        vDirection = "up";
      }

      if (vDirection == "up") moveUpLeft(x, y);
      else moveDownLeft(x, y);
    }

    // clearLED(current32, matNum);
  }
}

void lightLED(int _ledNo, int matNum, int& x, int& y) {
  if (_ledNo == 1) lc.setLed(matNum, x, y, true);
  else lc2.setLed(matNum, x, y, true);
}

void clearLED(int _ledNo, int matNum) {
  if (_ledNo == 1) lc.clearDisplay(matNum);
  else lc2.clearDisplay(matNum);
}

void moveUpRight(int& x, int& y) {
  lightLED(current32, matNum, x, y);
  delay(_delay);
  // clearLED(current32, matNum);
  for (int i = 0; i <= 3; i++) {
    clearLED(current32, i);
  }
  --y;
  ++x;
}

void moveDownRight(int& x, int& y) {
  lightLED(current32, matNum, x, y);
  delay(_delay);
  // clearLED(current32, matNum);
  for (int i = 0; i <= 3; i++) {
    clearLED(current32, i);
  }
  --y;
  --x;
}

void moveUpLeft(int& x, int& y) {
  lightLED(current32, matNum, x, y);
  delay(_delay);
  // clearLED(current32, matNum);
  for (int i = 0; i <= 3; i++) {
    clearLED(current32, i);
  }
  ++y;
  ++x;
}

void moveDownLeft(int& x, int& y) {
  lightLED(current32, matNum, x, y);
  delay(_delay);
  // clearLED(current32, matNum);
  for (int i = 0; i <= 3; i++) {
    clearLED(current32, i);
  }
  ++y;
  --x;
}

void makeLeftPaddle() {

  for (int i = lip; i < lip + ps; i++) {
    int temp = 7;
    lightLED(current32, 0, i, temp);
  }
  delay(_delay);
  clearLED(current32, 0);
}

void makeRightPaddle() {

  for (int i = rip; i < rip + ps; i++) {
    int temp = 0;
    lightLED(current32, 3, i, temp);
  }
  delay(_delay);
  clearLED(current32, 3);
}

void makeBothPaddles() {

  for (int i = lip; i < lip + ps; i++) {
    int temp = 7;
    lightLED(current32, 0, i, temp);
  }

  for (int i = rip; i < rip + ps; i++) {
    int temp = 0;
    lightLED(current32, 3, i, temp);
  }
  // delay(_delay);
  // clearLED(current32 , 0);
  // clearLED(current32 , 3);
}

void moveLeftBat(int H1) {
  if (H1 > 0 && H1 < 100) {
    if (lip > 0) {
      lip = lip - 1;
    }
  }
  if (H1 > 650 && H1 < 1032) {
    if (lip < 5) {
      lip = lip + 1;
    }
  }
}

void moveRightBat(int H2) {
  if (H2 > 0 && H2 < 100) {
    if (rip > 0) {
      rip = rip - 1;
    }
  }
  if (H2 > 650 && H2 < 1032) {
    if (rip < 5) {
      rip = rip + 1;
    }
  }
}

bool checkIfPointScored(int x, int y) {
  //P1 Score Update
  int temp1 = P1Score, temp2 = P2Score;
  if (matNum == 3 && y == 0 && (x < rip || x >= rip + ps)) {
    P1Score++;
  }
  //P2 Score Update
  if (matNum == 0 && y == 7 && (x < lip || x >= lip + ps)) {
    P2Score++;
  }
  if (temp1 != P1Score) {
    Serial.println("Player 1 Score: ");
    Serial.println(P1Score);
    return true;
  }

  if (temp2 != P2Score) {
    Serial.println("Player 2 Score: ");
    Serial.println(P2Score);
    return true;
  }
  return false;
}

void turnOnLeds() {
  lc.shutdown(0, false);
  lc.shutdown(1, false);
  lc.shutdown(2, false);
  lc.shutdown(3, false);

  // lc2.shutdown(0, false);
  // lc2.shutdown(1, false);
  // lc2.shutdown(2, false);
  // lc2.shutdown(3, false);

  lc.setIntensity(0, 8);
  lc.setIntensity(1, 8);
  lc.setIntensity(2, 8);
  lc.setIntensity(3, 8);
  lc.clearDisplay(0);

  // lc2.setIntensity(0, 8);
  // lc2.clearDisplay(0);
}