import time
import base64
import psycopg2
from flask import Flask, render_template

app = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(
        host="localhost",
        database="pillbox",
        user="sfransen",
        password="$tephenO0"
    )
    return conn

timestr = time.strftime("%Y%m%d-%H%M%S")
filename = "./static/photos/"+timestr+".jpg"
filename2 = "static/photos/"+timestr+".jpg"
@app.route('/')
def index():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT data FROM photos ORDER BY id DESC;')
    photo = cur.fetchall()
    with open(filename, "wb")as fh:
        fh.write(photo[0][0])
    cur.close()
    conn.close()
    return render_template('index.html', filename=filename2)

