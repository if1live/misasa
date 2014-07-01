#-*- coding: utf-8 -*-


import flask as fl
from misasa.app import app, db
from .models import PreRegistrationLog
from misasa import constants
from sqlalchemy import func


class MisasaException(Exception):
    def __init__(self, message):
        Exception.__init__(self, message)

@app.route('/api/register-user/', methods=['POST'])
def api_register_user():
    try:
        phone = fl.request.form.get('phone', None)
        parent = fl.request.form.get('parent', None)
        os_type = fl.request.form.get('os_type', None)

        if not phone:
            raise MisasaException('올바르지 않은 번호입니다.')
        if os_type not in (constants.OS_ANDROID, constants.OS_IOS):
            raise MisasaException('올바르지 않은 플랫폼입니다.')

        phone = phone.replace('-', '')
        if parent:
            parent = parent.replace('-', '')

        # 같은 전화번호로 2번 등록하는것은 불가능하다
        prev = db.query(PreRegistrationLog).filter_by(phone=phone).first()
        if prev:
            raise MisasaException('동일한 번호로 이미 등록되었습니다.')

        log = PreRegistrationLog(os_type=os_type,
                                 phone=phone,
                                 parent=parent)
        db.add(log)
        db.commit()

        return fl.jsonify(success=True, message=u'등록되었습니다.')

    except MisasaException as e:
        return fl.jsonify(success=False, message=e.message)

@app.route('/api/parent-count/', methods=['GET'])
def api_parent_count():
    try:
        phone = fl.request.args.get('phone', None)
        if not phone:
            raise MisasaException('올바르지 않은 번호입니다.')
        phone = phone.replace('-', '')

        q = db.query(func.count(PreRegistrationLog.id).label('parent_count')).filter_by(parent=phone)
        val = q.first().parent_count
        return fl.jsonify(success=True, count=val)

    except MisasaException as e:
        return fl.jsonify(success=False, message=e.message)


@app.route('/')
@app.route('/<parent>')
def view_index(parent=None):
    if parent is None:
        parent = fl.request.args.get('p', None)
    return fl.render_template('index.html', parent=parent)

@app.route('/dev/')
def view_dev():
    return fl.render_template('dev.html')