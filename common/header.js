function initHeader(){
$(function(){
            function getHomeUrl() {
                const pathParts = window.location.pathname.split('/');
                const sectionIndex = pathParts.findIndex(function (part) {
                    return ['Home', 'products', 'support', 'brandstory'].includes(part);
                });
                const rootParts = sectionIndex >= 0 ? pathParts.slice(0, sectionIndex) : pathParts.slice(0, -1);
                const rootPath = rootParts.join('/') || '';

                return `${window.location.origin}${rootPath}/Home/index.html`;
            }

            $('.logo > a').attr('href', getHomeUrl()).on('click', function(e){
                const homeUrl = getHomeUrl();
                const currentUrl = `${window.location.origin}${window.location.pathname}`;

                if (currentUrl === homeUrl) {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            })

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
        })
    }
