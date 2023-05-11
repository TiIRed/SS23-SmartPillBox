from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
import psycopg2

def get_db_connection():
    conn = psycopg2.connect(
        host='enter database IP address here',
        database='enter database name here',
        user='enter database role here',
        password='enter role password here'
    )
    return conn

bp = Blueprint('photo', __name__)

@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')
    conn = get_db_connection()
    cur = conn.cursor()

    if user_id is None:
        g.user = None
    else:
        cur.execute("SELECT * FROM logins WHERE id = %s", (user_id,))
        g.user = cur.fetchone()

@bp.route('/',methods=('GET', 'POST'))
def index():
    if g.user is None:
        return redirect(url_for('auth.login'))
    filename = "static/photos/default.jpg"
    time = "default"
    day = "default"
    if request.method == 'POST':
        conn = get_db_connection()
        cur = conn.cursor()
        day = request.form['Day']
        time = request.form['Time']
        filename = "static/photos/" + g.user[3] + "-" + time + "-" + day + ".jpg"
        cur.execute('SELECT data FROM photos WHERE username = %s AND time = %s AND dayofweek = %s;', (g.user[3], time, day))
        photo = cur.fetchone()
        if photo is None:
            error = 'No photos match this description'
            filename = "static/photos/default.jpg"
            flash(error)
        else:
            with open(("./" + filename), "wb")as fh:
                fh.write(photo[0])
            cur.close()
            conn.close()
    return render_template('photo/index.html', filename=filename, time=time, day=day)