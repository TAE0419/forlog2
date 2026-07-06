// header/footer
$(document).ready(function() {
            // 1. 헤더 연결 (html 폴더에서 두 번 나간 뒤 common 폴더 안의 header.html)
            $('#headers').load('../../common/header.html', function() {
                // 헤더가 다 불러와지면 실행할 함수
                if (typeof initHeader === 'function') {
                    initHeader();
                }
            });

            // 2. 푸터 연결
            $('#footer').load('../../common/footer.html');
        });

// FAQ아코디언기능
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
        const currentItem = question.closest(".faq-item");

        // 다른 질문 클릭 시 기존 열린 답변 자동 닫기
        document.querySelectorAll(".faq-item").forEach((item) => {
            if (item !== currentItem) {
                item.classList.remove("active");
            }
        });

        // 현재 항목 열고 닫기 토글
        currentItem.classList.toggle("active");
    });
});