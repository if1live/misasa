# misasa

꼬모:냥이추적자 사전등록

## Install
1. ```cp misasa/settings.sample.py misasa/settings.py```
2. ```vim misasa/settings.py```
3. ```pip install -r requirement.txt```
4. ```python main.py create_all```
5. ```python main.py```

## Configuration
* DB_URI
* VALID_IP_LIST : ```/admin``` 에 접속해서 기능을 쓸 수 있는 remote_addr
* BITLY_TOKEN : shorturl을 포기해서 사실상 안씀
* FACEBOOK_APP_ID, KAKAO_API_KEY : JS를 통해서 어차피 노출되니 그냥 코드에 포함시킴. 특별히 건들필요 없다.
