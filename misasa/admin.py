#-*- coding: utf-8 -*-

import flask as fl
from flask_superadmin import Admin, BaseView, model
from misasa.app import app, db
from misasa import settings
from .models import PreRegistrationLog

# Create admin
admin = Admin(app, '5minLab')

class PreRegistrationLogModel(model.ModelAdmin):
    session = db
    list_display = ['phone', 'parent', 'os_type']

    def is_accessible(self):
        if fl.request.remote_addr in settings.VALID_IP_LIST:
            return True
        return False


admin.register(PreRegistrationLog, PreRegistrationLogModel)
