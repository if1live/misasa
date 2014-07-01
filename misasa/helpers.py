#-*- coding: utf-8 -*-

from misasa import settings
import bitly_api


def create_shorturl(phone):
    bitly = bitly_api.Connection(access_token=settings.BITLY_TOKEN)
    url = 'http://como.5minlab.com/' + phone
    data = bitly.shorten(url)
    shorturl = data['url']
    return shorturl
