$(document).ready(function(){
  // swiper
  var swiper = new Swiper(".mySwiper", {
      effect: "coverflow",
      initialSlide: 2,
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 50,
        modifier: 5,
        slideShadows: true,
      },
      pagination: {
        el: ".swiper-pagination",
      },
    });

  // fullpage
  $('#fullpage').fullpage({
    //options here
    autoScrolling: true,
    navigation: true,
    responsiveWidth: 1024,
    // callback
    afterLoad: function (anchorLink, index) {
        if (index == 1) {
          console.log('wir');
        }
    }
	});
  $("html, body").on('mousewheel DOMMouseScroll', function(e) {
    console.log('mouseEvent');
    if($('.white_nav').hasClass('active')){
      console.log('great');
      $('#fp-nav a').css({
        border: '2px solid #fff'
      })
    }else {
      $('#fp-nav a').css({
        border: '2px solid #000'
      })
    }
  });
  // 2
  $('#fp-nav li').click(function(){
    var fpNav = $(this).index();
    console.log(fpNav)
    if(fpNav == 3){
      $('#fp-nav a').css({
        border: '2px solid #fff'
      })
    }else {
      $('#fp-nav a').css({
        border: '2px solid #000'
      });
    };
  });
  $('#fp-nav a').eq(3).click(function(){
    console.log('nav has clicked')
  });

  // postnav 호버시 인터벌 중지/재시작
  $('.post-nav').hover(function(){
    clearInterval(postInt);
  },function(){
    postInt = setInterval(postWrap, 3000)
  });

  // postnav 클릭시 
  $('.post-nav span').click(function(){
    var selNum = $(this).index();
    // 공통 
    $('.post-nav span').removeClass('active');
    $(this).addClass('active');

    $('.inf').removeClass('active');
    $('.inf').eq(selNum).addClass('active');

    $('.sec1 .shape-wrap').removeClass('active')
    $('.sec1 .shape-wrap').eq(selNum).addClass('active')

    // 다음꺼 클릭할 경우
    if(((postNum % 3) - selNum) == -1 || ((postNum % 3) - selNum) == 2){
      $('.post').eq(postNum % 3).css({
        zIndex: 8
      });
      $('.post').eq(postNum % 3).animate({
        left: '30%',
        opacity: 0
      }, 300);
      postNum = selNum;
      $('.post').eq(postNum).css({
        transform: 'translate(-50%, -50%) scale(1)',
        zIndex: 7
      })
      $('.post').eq(postNum).animate({
        opacity: 1,
        left: '50%'
      }, 300);
      $('.post').eq((postNum + 1) % 3).css({
        left: '55%',
        transform: 'translate(-50%, -50%) scale(0.96)',
        zIndex: 6,
        opacity: 1
      })
      setTimeout(function(){
        $('.post').eq((postNum - 1) % 3).css({
          transform: 'translate(-50%, -50%) scale(0.96)',
        });
      }, 300)
      // 전꺼 클릭할 경우
    }else if((postNum % 3) - selNum == 1 || (postNum % 3) - selNum == -2) {
      console.log('you clicked before')
      console.log(postNum % 3)
      $('.post').eq(selNum).css({
        left: '30%',
        opacity: 0,
        transform: 'translate(-50%, -50%) scale(1)',
        zIndex: 9
      })
      $('.post').eq(selNum).animate({
        left: '50%',
        opacity: 1,
      }, 300)

      $('.post').eq((selNum + 1) % 3).css({
        transform: 'translate(-50%, -50%) scale(0.96)',
        zIndex: 8
      })
      $('.post').eq((selNum + 1) % 3).animate({
        left: '55%'
      }, 300)
      $('.post').eq((selNum + 2) % 3).css({
        zIndex: 7
      })
      setTimeout(function(){
        $('.post').eq((selNum + 2) % 3).css({
          left: '55%'
        })
      }, 300)
      postNum = selNum;
    }
  });
  // MOB__SUBMENU 상호작용
  $('.mob__header-dot').click(function(){
    $('body').css({
      height: '100vh',
      overflow: 'hidden'
    });
    $('.mob__submenu').css({
        top: 0,
        opacity: 1,
        visibility: 'visible'
    });
  });
  $('.mob__submenu-head .close').click(function(){
    $('body').css({
      height: 'unset',
      overflow: 'unset'
    });
    $('.mob__submenu').css({
        top: '40px',
        opacity: 0,
        visibility: 'hidden'
    });
  });
  var postInt = setInterval(function(){
    postMove();
    postNav();
    postInf();
    postBg();
    console.log(postNum % 3);
    postNum++;
  }, 3000)
  var postNum = 0;


  function postWrap() {
    postMove();
    postNav();
    postInf();
    postBg();
    console.log(postNum % 3);
    postNum++;
  }

  // bg change 
  function postBg () {
    var bg = $('.sec1 .shape-wrap')
    bg.removeClass('active')
    bg.eq((postNum + 1) % 3).addClass('active')
  }
  // post nav active
  function postNav () {
    $('.post-nav span').removeClass('active')
    $('.post-nav span').eq((postNum + 1) % 3).addClass('active');
  }
  // post inf
  function postInf() {
    $('.inf').eq(postNum % 3).removeClass('active')
    $('.inf').eq((postNum + 1) % 3).addClass('active')
  }
    // poster 움직이기
    function postMove() {
      $('.post').eq(postNum % 3).css({
        zIndex: 8
      });
      $('.post').eq(postNum % 3).animate({
        left: '30%',
        opacity: 0
      }, 300);
      $('.post').eq((postNum + 1) % 3).css({
        transform: 'translate(-50%, -50%) scale(1)',
        zIndex: 7
      });
      $('.post').eq((postNum + 1) % 3).animate({
        left: '50%'
      }, 300);
      $('.post').eq((postNum + 2) % 3).css({
        left: '55%',
        transform: 'translate(-50%, -50%) scale(0.96)',
        zIndex: 6,
        opacity: 1
      })
      setTimeout(function(){
        $('.post').eq((postNum - 1) % 3).css({
          transform: 'translate(-50%, -50%) scale(0.96)',
        });
      }, 300)
    }
  });//end