#-*- coding: utf-8 -*-

import flask as fl
from flask_superadmin import Admin, BaseView, model
from misasa.app import app, db
from .models import PreRegistrationLog

VALID_IP_LIST = [
    '127.0.0.1',
    # if1live
    '175.197.16.188',
    '192.168.0.1',
    # 5minlab
    '14.39.150.215',
]

# Create admin
admin = Admin(app, '5minLab')

class PreRegistrationLogModel(model.ModelAdmin):
    session = db
    list_display = ['phone', 'parent', 'os_type']

    def is_accessible(self):
        if fl.request.remote_addr in VALID_IP_LIST:
            return True
        return False


admin.register(PreRegistrationLog, PreRegistrationLogModel)
