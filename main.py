#-*- coding: utf-8 -*-

import sys
from misasa import app
from misasa.app import Base, engine

if __name__ == '__main__':
    if len(sys.argv) == 1:
        app.run(host='0.0.0.0', port=5000)

    elif len(sys.argv) == 2:
        if sys.argv[1] == 'create_all':
            Base.metadata.create_all(engine)
