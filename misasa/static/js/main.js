(function() {
  window.fbAsyncInit = function() {
    FB.init({
      appId: FACEBOOK_APP_ID,
      xfbml: true,
      version: 'v2.0'
    });
  };
  Kakao.init(KAKAO_API_KEY);

  function createShareData() {
    var url = 'http://google.com/'; 
    return {
      url: url,
      appid: 'como.5minlab.com',
      appname: '5분실험실',
      title: '제목 - 5분실험실',
      desc: '상세설명 - 5분실험실',
      imageurl: 'http://m1.daumcdn.net/photo-media/201209/27/ohmynews/R_430x0_20120927141307222.jpg'
    }
  }

  function executeKakaoStoryLink() {
    data = createShareData();
    kakao.link("story").send({
      post: data.url,
      appid: data.appid,
      appver: "1.0",
      appname: data.appname,
      urlinfo: JSON.stringify({
        title: data.title, 
        desc: data.desc, 
        imageurl: [data.imageurl], 
        type: "article"
      })
    });
  }

  function createKakaoTalkLink() {
    data = createShareData();
    // 카카오톡 링크 버튼을 생성합니다. 처음 한번만 호출하면 됩니다.
    Kakao.Link.createTalkLinkButton({
      container: '#kakao-link-btn',
      label: data.title,
      image: {
        src: data.imageurl,
        width: '300',
        height: '200'
      },
      webButton: {
        text: data.title,
        url: data.url
      }
    });
  }

  function executeFBShare() {
    data = createShareData();
    FB.ui({
      method: 'share',
      href: data.url,
    }, function(response){});
  }

  document.querySelector('.btn-kakao-story-link').onclick = executeKakaoStoryLink;
  document.querySelector('.btn-fb-share').onclick = executeFBShare;
  createKakaoTalkLink();

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

  $('.form-pre-registration').submit(function() {
    if(!validatePhoneNumber(this.phone.value)) {
      alert('휴대폰 번호를 다시 확인해주세요.');
      return false;
    }

    $.post(this.action, {
      'phone': filterPhoneNumber(this.phone.value),
      'parent': this.parent.value,
      'os_type': this.os_type.value
    }, function(data) {
      if(data.success) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    })
    return false;
  });

  $('.btn-parent-count').click(function() {
    var form = document.forms[0];
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
  })
})();
