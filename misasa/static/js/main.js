(function() {
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
    if(numCount === (3 + 3 + 4) || numCount === (3 + 4 + 4)) {
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
