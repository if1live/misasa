#-*- coding: utf-8 -*-

from sqlalchemy import types, Column
from misasa.app import Base

u"""
전화번호는 - 없이 숫자만 저장한다. 설마 앞자리 4자리인 폰번호는 없겟지?
010으로 전화번호가 확정되서 010은 날렸다.
"""
PHONE_LENGTH = 4 + 4

class PreRegistrationLog(Base):
    __tablename__ = 'pre_registration_log'

    id = Column(types.Integer, primary_key=True)
    phone = Column(types.Unicode(PHONE_LENGTH), nullable=False, unique=True)
    parent = Column(types.Unicode(PHONE_LENGTH), nullable=True, index=True)
    os_type = Column(types.Unicode(1), nullable=False)
