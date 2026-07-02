let item = document.querySelectorAll('.item')
        let observer = new IntersectionObserver(function(entries){ //entries가 화면에 나타났는지 안나타났는지 감시
            entries.forEach(function(item){ //entries들을 item으로 이름짓고 순서대로 실행
                if(item.isIntersecting){ //해당 item(entries)이 화면에 나타났다면
                    item.target.classList.add('on')
                }
            })
        },{
            threshold : 0.7 //개체가 얼마나 보여야 시작할지 설정
        })
        item.forEach(function(item){ //boxs를 item으로 이름짓고 순서대로 실행
            observer.observe(item) //item(boxs)를 observer의 entries로 넣고 감시 시작(observe)하라고 명령
        })
        