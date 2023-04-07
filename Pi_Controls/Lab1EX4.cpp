// g++ -std=c++11 -o Lab1EX4 Lab1EX4.cpp -lwiringPi

#include <wiringPi.h>
#include <softPwm.h>
#include <stdio.h>

#define SERVO_MIN_MS 5
#define SERVO_MAX_MS 25
#define SERVO_MIN_ANGLE 0
#define SERVO_MAX_ANGLE 180

/* signal pin of the servo GPIO ReadAll*/ 
#define servoPin 7 //Physical pin 7

//Specific a certain rotation angle (0-180) for the servo
 void servoWrite(int pin, int angle){     
     long time = 0;
     time = (5 + (angle/9));  /* map the desired angle to time*/
     printf("%d\n", time);
     softPwmWrite(pin,time);   
 }

int main(void)
{
    wiringPiSetup();    
    softPwmCreate(servoPin,  0, 200);
    // while(1){
    //     servoWrite(servoPin,0);
    //     delay(2000);
    //     servoWrite(servoPin,180);
    //     delay(2000);
    // }

    while(1){
        int d = 500;

        /*make servo rotate from minimum angle to maximum, use the function 
        servoWrite(int pin, int angle), increase 1 degree each time*/

         for(int i = 0; i <= SERVO_MAX_ANGLE; i++){
            servoWrite(servoPin, i);
            // delay(5);
        }
        delay(d);


        /*make servo rotate from maximum angle to minimum, use the function 
        servoWrite(int pin, int angle), increase 1 degree each time*/
        // delay(d);
        //  servoWrite(servoPin, 0);
        for(int i = SERVO_MAX_ANGLE; i >= 0; i--){
            servoWrite(servoPin, i);
            //delay(5);
        }
        // delay(500); //Correct Delay for 180
        delay(d);
     }
    return 0;
}

