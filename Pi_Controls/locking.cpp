// g++ -std=c++11 -o ServoControl ServoControl.cpp -lwiringPi

#include <wiringPi.h>
#include <softPwm.h>
#include <stdio.h>

#define SERVO_MIN_MS 5
#define SERVO_MAX_MS 25
#define SERVO_MIN_ANGLE 0
#define SERVO_MAX_ANGLE 45

/* signal pin of the servo GPIO ReadAll*/ 
#define servoPin 7 //Physical pin 7

//Specific a certain rotation angle (0-180) for the servo
 void servoWrite(int pin, int angle){     
     long time = 0;
     time = ((angle*4/SERVO_MAX_ANGLE));  /* map the desired angle to time*/
     printf("%d\n", time);
     softPwmWrite(pin,time); 
     delay(time);  
 }

void locking(int value){
    //int d = 45;        //Common Delay Value

    if (value == 0){    //Unlock
        /*make servo rotate from minimum angle to maximum, use the function 
        servoWrite(int pin, int angle), increase 1 degree each time*/
         for(int i = SERVO_MIN_ANGLE; i <= SERVO_MAX_ANGLE; i++){
            servoWrite(servoPin, i);
        }
        // servoWrite(servoPin, 45);
        // //delay(d);
    }

    // if (value == 1){  //Lock
    //     /*make servo rotate from maximum angle to minimum, use the function 
    //     servoWrite(int pin, int angle), increase 1 degree each time*/
    //     // servoWrite(servoPin, 0);
    //     //  for(int i = SERVO_MAX_ANGLE; i >= SERVO_MIN_ANGLE; i--){
    //     //     servoWrite(servoPin, i);
    //     //     //delay(5);
    //     // }
    //     servoWrite(servoPin, 45);
    // //    // delay(d);  
    // }
}

int main(void)
{
    wiringPiSetup();    
    softPwmCreate(servoPin,  0, 200);
    locking(0);
    // delay(2000);
    // locking(1);
}