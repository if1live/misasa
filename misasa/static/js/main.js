(function() {
  var isMobile = {
    Android: function() {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };
  window.fbAsyncInit = function() {
    FB.init({
      appId: FACEBOOK_APP_ID,
      xfbml: true,
      version: 'v2.0'
    });
  };
  Kakao.init(KAKAO_API_KEY);

  function createShareURL() {
    var url = 'http://como.5minlab.com';

    var rawPhone = $('form[name=form-pre-registration] [name=phone]').val();
    var phone = filterPhoneNumber(rawPhone);
    if(phone.length !== '') {
      url = url + '/' + phone;
    }
    //console.log(url);
    return url;
  }

  function createShareURLFB() {
    var url = 'http://como.5minlab.com';
    return url;
  }

  function createTitleImageURL() {
    var host = 'http://como.5minlab.com';
    var path = '/static/images/shared-badge/badge-270.jpg';
    return host + path;
  }

  function executeKakaoStoryLink() {
    if(isMobile.any()) {
      ga('send', 'event', 'social-btn', 'kakaostory');
    }
    kakao.link("story").send({
      post: createShareURL(),
      appid: 'como.5minlab.com',
      appver: "1.0",
      appname: '꼬모:냥이 추적자',
      urlinfo: JSON.stringify({
        title: '꼬모:냥이 추적자 사전등록', 
        desc: '게임인재단 3회 대상 수상작! 같이 즐기고 선물도 받아요~!', 
        imageurl: [createTitleImageURL()], 
        type: "article"
      })
    });
  }

  function executeKakaoTalkLink() {
    if(isMobile.any()) {
      ga('send', 'event', 'social-btn', 'kakaotalk');
    }
    Kakao.Link.sendTalkLink({
      label: '게임인재단 3회 대상 수상작! 꼬모:냥이 추적자에 사전등록했어요. 같이 즐기고 선물도 받아요~!',
      image: {
        src: createTitleImageURL(),
        width: '270',
        height: '270'
      },
      webButton: {
        text: '사전등록하러 가기',
        url: createShareURL()
      }
    });
  }

  function executeFBShare() {
    ga('send', 'event', 'social-btn', 'fb');
    FB.ui({
      method: 'share',
      href: createShareURLFB()
    }, function(response){});
  }

  var kakaostroyNode = document.querySelector('.btn-kakao-story-link');
  if(kakaostroyNode) {
    kakaostroyNode.onclick = executeKakaoStoryLink;
  }
  var fbNode = document.querySelector('.btn-fb-share');
  if(fbNode) {
    fbNode.onclick = executeFBShare;
  }
  var kakaotalkNode = document.querySelector('.btn-kakao-talk-link');
  if(kakaotalkNode) {
    kakaotalkNode.onclick = executeKakaoTalkLink;
  }

  function validatePhoneNumber(val) {
    var numCount = 0;
    for(var i = 0 ; i < val.length ; ++i) {
      var ch = val[i];
      if(ch === '-') {
        continue;
      }
      if(ch >= '0' && ch <= '9') {
        numCount++;
        continue;
      }
      // 올바르지 않은 글자 존재
      break;
    }
    if(i !== val.length) {
      return false;
    }
    if(numCount === (3 + 4) || numCount === (4 + 4)) {
      return true;
    }
    return false;
  }

  function filterPhoneNumber(val) {
    var numList = [];
    for(var i = 0 ; i < val.length ; ++i) {
      var ch = val[i];
      if(ch >= '0' && ch <= '9') {
        numList.push(ch);
      }
    }
    return numList.join('');
  }

  $('form[name=form-pre-registration]').submit(function() {
    if(!validatePhoneNumber(this.phone.value)) {
      alert('휴대폰 번호를 다시 확인해주세요.');
      return false;
    }

    var agreementList = $(this).find('[name=agreement]:checked');
    if(agreementList.length === 0) {
      alert('약관에 동의해주세요.');
      return false;
    }

    if(filterPhoneNumber(this.phone.value) === filterPhoneNumber(this.parent.value)) {
      alert('자신을 추천할수 없습니다.');
      return false;
    }

    $.post(this.action, {
      'phone': filterPhoneNumber(this.phone.value),
      'parent': this.parent.value,
      'os_type': this.os_type.value
    }, function(data) {
      if(data.success) {
        alert(data.message);
		ga('send', 'event', 'registration', 'ok');
      } else {
        alert(data.message);
		ga('send', 'event', 'registration', 'failed');
      }
    })
    return false;
  });

  $('form[name=form-refcount-pc]').submit(function() {
    var form = this;
    if(!validatePhoneNumber(form.phone.value)) {
      alert('휴대폰 번호를 다시 확인해주세요.');
      return false;
    }
    var phone = filterPhoneNumber(form.phone.value);
    $.get('/api/parent-count', {
      'phone': phone
    }, function(data) {
      if(data.success) {
        $('input[name=parent_count]').val(data.count);
      } else {
        alert(data.message);
      }
    })
    return false;
  })

  $('.label-agreement').click(function(evt) {
    evt.preventDefault();

    var cbs = $('form[name=form-pre-registration] [type=checkbox]');    
    cbs.prop("checked", !cbs.prop("checked"));

    $(this).find('i').toggleClass('sprite-segments-check');
  })
})();
