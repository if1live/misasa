#-*- coding: utf-8 -*-

from .app import app, db

import views
import admin

@app.teardown_request
def cleanup_db_session(exc=None):
    _exc = exc
    db.remove()
