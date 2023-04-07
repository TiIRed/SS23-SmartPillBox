# from picamera2 import Picamera2   
# from time import sleep

# camera = Picamera2()

# camera.start_preview()
# sleep(10)
# camera.stop_preview()

# from picamera2 import Picamera2, Preview ,Controls
# import time
# picam2 = Picamera2()
# camera_config = picam2.create_still_configuration(main={"size": (1920, 1080)}, lores={"size": (640, 480)}, display="lores")
# #picam2.set_controls({"AfMode": Controls.Continous})
# picam2.configure(camera_config)
# picam2.start_preview(Preview.QTGL)
# picam2.start()
# time.sleep(100)
# picam2.capture_file("test.jpg")

from picamera2 import Picamera2, Preview
import time
from libcamera import controls
picam2 = Picamera2()
camera_config = picam2.create_still_configuration(main={"size": (1920, 1080)}, lores={"size": (640, 480)}, display="lores")
picam2.configure(camera_config)
picam2.start_preview(Preview.QTGL)
picam2.start()
picam2.set_controls({"AfMode": controls.AfModeEnum.Continuous})
#picam2.set_controls( {"AfRange": controls.AfRangeEnum.Normal})
time.sleep(100)
picam2.capture_file("test.jpg")
picam2.stop()


print(picam2.sensor_modes)