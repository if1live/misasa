#-*- coding: utf-8 -*-

import flask as fl
from misasa import settings

app = fl.Flask(__name__)
app.config.from_object(settings)

# sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# for unit test
engine = create_engine(settings.DB_URI, echo=settings.DB_ECHO)
Base = declarative_base()
Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = scoped_session(Session)


