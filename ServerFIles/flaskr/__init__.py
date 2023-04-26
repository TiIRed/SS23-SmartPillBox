import os
import time
import base64
import psycopg2
from threading import Thread
from flask import Flask, render_template

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


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass
 
    @app.route('/')
    def index():
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT data FROM photos ORDER BY id DESC;')
        photo = cur.fetchall()
        with open(("./" + filename), "wb")as fh:
            fh.write(photo[0][0])
        cur.close()
        conn.close()
        return render_template('index.html', filename=filename)


    return app