import serial
import time

# Set the COM port and baud rate to match your Arduino setup
arduino = serial.Serial(port='COM5', baudrate=9600, timeout=1)


arduino.write('T'.encode())  # Send command
    # time.sleep(0.1)  # Give the Arduino time to respond
    # response = arduino.readline().decode().strip()  # Read response
    # return response

# Example: Send commands to turn the LED on and off