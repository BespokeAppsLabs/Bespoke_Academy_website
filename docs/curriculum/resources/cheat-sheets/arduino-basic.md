

# Cheat Sheet: Arduino Basics

This cheat sheet gives beginners a simple overview of Arduino fundamentals.  
It is designed for students (ages 13–17) learning to build AI‑powered robotics projects.

---

## 1. What is Arduino?

Arduino is a small programmable circuit board used for:
- Robotics  
- Sensors  
- LEDs  
- Smart devices  
- Automation  

Arduino code is written in **C/C++**, but we keep things simple in this course.

Files use the extension **.ino**

---

## 2. Basic Arduino Code Structure

Every Arduino program has **two main functions**:

```cpp
void setup() {
  // Runs once when the Arduino turns on
}

void loop() {
  // Runs over and over (forever)
}
```

---

## 3. Variables & Basic Types

```cpp
int number = 5;         // whole number
float temp = 23.5;      // decimal
bool isOn = true;       // true/false
char letter = 'A';      // single character
String name = "Lucas";  // text
```

---

## 4. Digital Pins

Digital pins are ON or OFF.

### Set pin direction:
```cpp
pinMode(13, OUTPUT);
pinMode(7, INPUT);
```

### Write to a pin:
```cpp
digitalWrite(13, HIGH); // turn ON
digitalWrite(13, LOW);  // turn OFF
```

---

## 5. Analog Input

Used for sensors like light, temperature, potentiometers.

```cpp
int sensorValue = analogRead(A0);
```

---

## 6. PWM (Analog Output)

Pins with `~` support PWM — fake “analog” output.

```cpp
analogWrite(9, 128); // brightness (0–255)
```

---

## 7. LEDs

```cpp
void setup() {
  pinMode(13, OUTPUT);
}

void loop() {
  digitalWrite(13, HIGH);
  delay(500); // 500ms
  digitalWrite(13, LOW);
  delay(500);
}
```

---

## 8. Delays

```cpp
delay(1000); // wait 1 second
```

---

## 9. Using the Serial Monitor

Useful for debugging.

```cpp
void setup() {
  Serial.begin(9600); // start serial
}

void loop() {
  int value = analogRead(A0);
  Serial.println(value);
  delay(200);
}
```

---

## 10. Buttons

```cpp
int button = 7;

void setup() {
  pinMode(button, INPUT_PULLUP);
}

void loop() {
  int state = digitalRead(button);
  if (state == LOW) {
    // button is pressed
  }
}
```

---

## 11. Servos

```cpp
#include <Servo.h>

Servo myServo;

void setup() {
  myServo.attach(9);
}

void loop() {
  myServo.write(90); // angle 0–180
}
```

---

## 12. Ultrasonic Sensor (HC-SR04)

```cpp
const int trig = 9;
const int echo = 10;

void setup() {
  pinMode(trig, OUTPUT);
  pinMode(echo, INPUT);
  Serial.begin(9600);
}

void loop() {
  digitalWrite(trig, LOW);
  delayMicroseconds(2);
  digitalWrite(trig, HIGH);
  delayMicroseconds(10);
  digitalWrite(trig, LOW);

  long duration = pulseIn(echo, HIGH);
  long distance = duration * 0.034 / 2;

  Serial.println(distance);
}
```

---

## 13. Common Errors

### Missing semicolon
```cpp
int x = 5   // ❌ ERROR
```

### Wrong pin mode
```cpp
digitalWrite(7, HIGH); // ❌ if pin 7 was not set to OUTPUT
```

### Forgetting `#include`
```cpp
Servo myServo; // ❌ missing #include <Servo.h>
```

---

## Summary

Arduino lets you:
- Control LEDs, sensors, motors  
- Build robots  
- Connect real‑world hardware  
- Bridge AI → physical devices  

You will use these basics to build interactive robotics projects in the course.

---