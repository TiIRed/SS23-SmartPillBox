import io
import psycopg2
from PIL import Image
from picamera2 import Picamera2, Preview
import time
import sys

if len(sys.argv) > 1:

    timestr = time.strftime("%Y%m%d-%H%M%S")
    filename = timestr + ".jpg"
    #save picture
    picam2 = Picamera2()
    camera_config = picam2.create_still_configuration(main={"size": (1920, 1080)}, lores={"size": (640, 480)}, display="lores")
    picam2.configure(camera_config)
    picam2.start_preview(Preview.QTGL)
    picam2.start()
    time.sleep(1 )
    picam2.capture_file(filename) 


    # create PSQL Query Object
    conn = psycopg2.connect(
        host="localhost",
        database="pillbox",
        user="sfransen",
        password="$tephenO0"
    )
    cur = conn.cursor()

    #Read picture file and convert to bytes
    with open(filename, "rb")as image:
        f = image.read()
        j = list(f)

    #send to DB
    cur.execute("INSERT INTO photos (time, data, username, dayofweek) VALUES (%s, %s,%s, %s)", (sys.argv[1], f, sys.argv[2],sys.argv[3]))

    #close currsor
    conn.commit()
    cur.close()
    conn.close()
else:
    print("pass arguments such that photoman.py time username dayofweek ")