import psycopg2
import functools
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
import bcrypt

bp = Blueprint('auth', __name__, url_prefix='/auth')

def get_db_connection():
    conn = psycopg2.connect(
        host="localhost",
        database="pillbox",
        user="sfransen",
        password="$tephenO0"
    )
    return conn

@bp.route('/register', methods=('GET', 'POST'))
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        fname = request.form['fName']
        lname = request.form['lName']
        mTime = request.form['mornTime']
        mdTime = request.form['midTime']
        eTime = request.form['eveTime']
        hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt());
        hashed = hash.decode('utf-8')

        conn = get_db_connection()
        db = conn.cursor()

        error = None

        if not username:
            error = 'Username is required.'
        elif not password:
            error = 'Password is required.'

        if error is None:
            try:
                db.execute("INSERT INTO logins (fname, lname, email, password, mtime, mdtime, etime) VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id, password",(fname, lname, username, hashed, mTime, mdTime, eTime))
                conn.commit()
                out = db.fetchone()
                print(out)
            except Exception as err:
                print(err)
                error = f"User {username} is already registered."
            else:
                return redirect(url_for("auth.login"))
        db.close()
        conn.close()
        flash(error)

    return render_template('auth/register.html')

@bp.route('/login', methods=('GET', 'POST'))
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        conn = get_db_connection()
        cur = conn.cursor()
        error = None
        cur.execute("SELECT * FROM logins WHERE email = %s", (username,))
        user = cur.fetchone()

        if user is None:
            error = 'Incorrect username.'
        else:
            pss = bytes(password, 'utf-8')
            dbpass = bytes(user[4], 'utf-8')
            if not bcrypt.checkpw(pss, dbpass):
                error = 'Incorrect password.'

        if error is None:
            session.clear()
            session['user_id'] = user[0]
            return redirect(url_for('index'))

        flash(error)

    return render_template('auth/login.html')

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

@bp.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for('auth.login'))

        return view(**kwargs)

    return wrapped_view