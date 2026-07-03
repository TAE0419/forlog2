function initHeader(){
$(function(){
            $('.gnb > li').mouseenter(function(){
                $('.snb').stop().slideUp(300)
                $(this).children('.snb').stop().slideDown(300)
            })
            $('.gnb > li').mouseleave(function(){
                $('.snb').stop().slideUp(300)
            })

            $('.ham').click(function(){
                $('.dim').addClass('on')
                $('.hamSideMenu').addClass('on')
            })
            $('.dim').click(function(){
                $('.dim').removeClass('on')
                $('.hamSideMenu').removeClass('on')
            })
            $('.close').click(function(){
                $('.dim').removeClass('on')
                $('.hamSideMenu').removeClass('on')
            })
            //사이드(슬라이드 메뉴) :: 아코디언 구현
            $('.hamGnb>li>a').mouseenter(function(e){
                e.preventDefault() //a태그가 원래 가지고 있던 기능을 막기

                let myMenu = $(this).siblings('.hamSnb') //클릭한 li a태그의 형제(hamSnb)

                $('.hamSnb').not(myMenu).stop().slideUp(300) //내가 클릭한 메뉴 말고 다 닫기

                $(this).siblings('.hamSnb').stop().slideToggle(300) //내가 선택한 메뉴의 서브메뉴만 보이기
            })
            
            $('.hamGnb>li>a').on('touchstart', function(e) {
    let $this = $(this);
    let $myMenu = $this.siblings('.hamSnb');
    let $myLi = $this.parent();

    // 1. 하위 메뉴가 있는 경우만 로직 수행
    if ($myMenu.length > 0) {
        e.preventDefault(); // 무조건 기본 이동 방지

        // 이미 열려있을 때 다시 누르면 페이지 이동
        if ($myLi.hasClass('on')) {
            window.location.href = $this.attr('href');
        } else {
            // 다른 메뉴 닫기
            $('.hamSnb').not($myMenu).stop().slideUp(300);
            $('.hamGnb>li').not($myLi).removeClass('on');

            // 클릭한 메뉴 열기
            $myMenu.stop().slideToggle(300);
            $myLi.addClass('on');
        }
    }
    // 하위 메뉴가 없는 일반 링크는 그대로 이동함
});
        })
    }