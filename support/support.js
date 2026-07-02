// header/footer
fetch('../common/header.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('headers').innerHTML = data;
                initHeader(); 
            });
        fetch('../common/footer.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('footer').innerHTML = data;

            });

//-----------------아코디언------------------------ 
document.querySelectorAll('.faq-question').forEach((question) => {
    question.addEventListener('click', () => {
        const currentItem = question.closest('.faq-item');

        document.querySelectorAll('.faq-item').forEach((item) => {
            if (item !== currentItem) {
                item.classList.remove('active');
            }
        });

        currentItem.classList.toggle('active');
    });
});

//공지사항 모달
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("newsModal");
    const closeBtn = document.querySelector(".news-modal-close");
    
    const modalNum = document.getElementById("modalNum");
    const modalTitle = document.getElementById("modalTitle");
    const modalAuthor = document.getElementById("modalAuthor");
    const modalDate = document.getElementById("modalDate");
    const modalText = document.getElementById("modalText");

    // 각 공지사항 번호별 실제 보여줄 내용 정리
    const noticeContents = {
        "8": `<p>안녕하세요. FOR-LOG 관리자입니다.</p>
              <p>안정적인 서비스 제공과 신속한 문의 처리를 위해 FOR-LOG 고객센터가 새롭게 운영됩니다.</p>
              <p><strong>[운영 시간]</strong><br>• 평일: 09:00 ~ 18:00 (점심시간 12:00 ~ 13:00)<br>• 주말 및 공휴일: 휴무</p>
              <p>앞으로도 회원님들께 쾌적한 환경을 제공할 수 있도록 최선을 다하겠습니다.</p>`,
              
        "7": `<p>안녕하세요, FOR-LOG 팀입니다.</p>
              <p>더 나은 서비스를 만들어가기 위해 이용자 만족도 조사를 실시합니다. 참여해 주신 분들 중 추첨을 통해 소정의 상품을 지급해 드립니다.</p>
              <p><strong>[조사 기간]</strong> 2026.06.25 ~ 2026.07.05<br>많은 참여와 소중한 의견 부탁드립니다.</p>`,
              
        "6": `<p>FOR-LOG 회원님들을 위한 혜택 업데이트 안내입니다.</p>
              <p>신규 가입 및 연속 로그인을 달성하신 회원님들을 위한 등급별 특별 포인트 지급 및 쿠폰 팩 혜택이 강화되었습니다. 자세한 등급별 조건은 마이페이지 혜택 탭에서 확인하실 수 있습니다.</p>`,
              
        "5": `<p>서버 안정화 및 시스템 고도화를 위한 정기 점검이 진행될 예정입니다.</p>
              <p><strong>[점검 시간]</strong> 2026년 06월 24일 새벽 02:00 ~ 06:00 (약 4시간)<br>점검 시간 동안에는 서비스 접속이 일시적으로 제한되오니 이용에 참고해 주시기 바랍니다.</p>`,
              
        "4": `<p>개인정보보호법 개정에 따라 FOR-LOG의 개인정보처리방침이 일부 변경됩니다.</p>
              <p>개정된 방침은 2026년 7월 1일부로 효력이 발생하며, 주요 개정 사항은 위탁 업체 변경 및 보안 시스템 강화에 따른 항목 추가입니다.</p>`,
              
        "3": `<p>회원님들께서 가장 많이 의견을 주셨던 앱세스 접근성 및 로딩 속도 관련 기능이 개선되었습니다.</p>
              <p>기존 대비 반응 속도가 약 30% 향상되었으며, 저사양 기기에서도 부드럽게 구동되도록 최적화 작업을 완료했습니다.</p>`,
              
        "2": `<p>모바일 앱 환경 최적화 업데이트가 완료되었습니다.</p>
              <p>일부 OS에서 간헐적으로 발생하던 튕김 현상을 수정하였고, UI 레이아웃을 좀 더 직관적으로 다듬었습니다. 스토어에서 최신 버전으로 업데이트 후 이용해 주세요.</p>`,
              
        "1": `<p>기다려주신 모든 분들께 감사드립니다!</p>
              <p>기록을 위한 최고의 파트너, <strong>FOR-LOG</strong>가 드디어 정식 서비스를 오픈했습니다.</p>
              <p>오픈 기념 다양한 이벤트가 진행 중이니 많은 관심과 참여 부탁드립니다. 감사합니다!</p>`
    };

    // 모든 공지사항 리스트 아이템에 클릭 이벤트 부여
    document.querySelectorAll(".news-item").forEach(item => {
        item.addEventListener("click", () => {
            // 글 번호 추출
            const num = item.querySelector(".td-num").textContent.trim();
            
            // 제목 추출 (NEW 배지가 있다면 제거하고 순수 텍스트만)
            const titleElement = item.querySelector(".td-title").cloneNode(true);
            const badge = titleElement.querySelector(".badge-new");
            if(badge) badge.remove(); 
            const title = titleElement.textContent.trim();
            
            // 작성자, 날짜 추출
            const author = item.querySelector(".td-author").textContent.trim();
            const date = item.querySelector(".td-date").textContent.trim();

            // 모달창 텍스트 채우기
            modalNum.textContent = num;
            modalTitle.textContent = title;
            modalAuthor.textContent = author;
            modalDate.textContent = date;
            
            // 글 번호에 맞는 본문 내용을 가져오고, 없으면 기본 메시지 출력
            modalText.innerHTML = noticeContents[num] || `<p>상세 내용 준비 중입니다.</p>`;

            // 모달 열기 및 본문 스크롤 막기
            modal.style.display = "block";
            document.body.style.overflow = "hidden"; 
        });
    });

    // 닫기 기능들
    closeBtn.addEventListener("click", closeModal);
    window.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    function closeModal() {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; 
    }
});

//----------------지도-----------------
let searchMarkers = []; 
    
// 정확한 위도와 경도 고정 좌표
const companyCoords = new kakao.maps.LatLng(37.30836859, 126.8509804); 

const mapContainer = document.getElementById('map'); 
const mapOption = {
    center: companyCoords, 
    level: 3 
};  

// 지도를 생성합니다    
const map = new kakao.maps.Map(mapContainer, mapOption); 

// 장소 검색 객체를 생성합니다
const ps = new kakao.maps.services.Places();  
const infowindow = new kakao.maps.InfoWindow({ zIndex: 5 });

// 1. 회사 고정 핀 마커 생성
const companyMarker = new kakao.maps.Marker({
    position: companyCoords
});
companyMarker.setMap(map); // 처음에는 지도에 표시

// 2. 메인 초록 큰 말풍선 구조 세팅
const overlayContent = `
<div class="map-overlay-box">
    <!-- CSS 클래스만 깔끔하게 적용 -->
    <div class="overlay-close-btn" onclick="window.closeCompanyWindow()">✕</div>
    
    <div class="overlay-header">
        <span class="overlay-title">FOR-LOG</span>
    </div>
    <div class="overlay-body">
        <div class="overlay-img">
            <img src="img/mostra 1.png" alt="FOR-LOG 개구리">
        </div>
        <div class="overlay-content">
            <p class="addr">경기 안산시 상록구 광덕1로 375</p>
            <p class="sub">4호선 한대앞역 2번 출구 > 도보 200m</p>
        </div>
    </div>
</div>
`;

const companyWindow = new kakao.maps.CustomOverlay({
    content: overlayContent,
    map: map,
    position: companyCoords,
    yAnchor: 1.35 
});

// 1) 말풍선 내부의 ✕ 버튼 클릭 시 작동하는 함수
window.closeCompanyWindow = function() {
    if (typeof companyWindow !== 'undefined') {
        companyWindow.setMap(null); // 큰 말풍선만 지도에서 숨김
    }
};

// 2) 회사 고정 핀(마커)을 클릭했을 때 말풍선을 다시 띄우는 이벤트 추가
if (typeof companyMarker !== 'undefined' && typeof companyWindow !== 'undefined') {
    kakao.maps.event.addListener(companyMarker, 'click', function() {
        companyWindow.setMap(map); // 말풍선을 다시 지도에 표시
        map.setCenter(companyCoords); // 클릭 시 지도 중심을 회사 위치로 이동 (선택사항)
    });
}

// 렌더링 타이밍 이슈 방지 리사이즈 처리
setTimeout(function() {
    map.relayout();
    map.setCenter(companyCoords);
}, 300);

// 키워드 검색 함수 실행 시 (회사 고정 핀과 큰 말풍선을 모두 지도에서 숨김)
window.searchPlaces = function() {
    const keyword = document.getElementById('keyword').value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }

    removeSearchMarkers();

    // 1) 검색창이 뜨면 큰 초록색 말풍선을 숨깁니다.
    if (typeof companyWindow !== 'undefined') {
        companyWindow.setMap(null);
    }
    
    // 2) 주변 맛집 클릭을 방해하지 않도록 회사 고정 핀도 지도에서 완전히 숨깁니다.
    if (typeof companyMarker !== 'undefined') {
        companyMarker.setMap(null);
    }

    if (companyCoords) {
        ps.keywordSearch(keyword, placesSearchCB, {
            location: companyCoords,
            radius: 2000 
        });
    } else {
        ps.keywordSearch(keyword, placesSearchCB, {
            location: map.getCenter(),
            radius: 2000
        });
    }
};

// 목록 우측 상단 ✕ 버튼 클릭 시 작동하는 함수 (회사 위치 복원)
window.closePlacesList = function() {
    const menuEl = document.getElementById('menu_wrap');
    if (menuEl) menuEl.style.display = 'none';
    
    // 검색된 마커들을 싹 지웁니다.
    removeSearchMarkers();

    // ✕ 버튼을 누르면 회사 고정 핀과 큰 말풍선을 다시 지도에 나타나게 하고 중심으로 이동합니다.
    if (typeof companyMarker !== 'undefined') {
        companyMarker.setMap(map);
    }

    if (typeof companyWindow !== 'undefined' && typeof map !== 'undefined') {
        companyWindow.setMap(map);
        map.setCenter(companyCoords);
    }
};

// 장소검색 완료 콜백함수
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        const menuEl = document.getElementById('menu_wrap');
        if (menuEl) menuEl.style.display = 'block';

        displayPlaces(data);
        displayPagination(pagination);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
    } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
    }
}

// 검색 결과 목록과 마커를 표출하는 함수
function displayPlaces(places) {
    const listEl = document.getElementById('placesList'); 
    const menuEl = document.getElementById('menu_wrap');
    const fragment = document.createDocumentFragment(); 
    const bounds = new kakao.maps.LatLngBounds(); 
    
    if (listEl) removeAllChildNods(listEl);
    removeSearchMarkers();
    
    for (let i = 0; i < places.length; i++) {
        const placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
        const marker = addMarker(placePosition, i); 
        const itemEl = getListItem(i, places[i]); 

        bounds.extend(placePosition);

        (function(marker, title) {
            kakao.maps.event.addListener(marker, 'click', function() {
                displayInfowindow(marker, title);
            });
            if (itemEl) {
                itemEl.onmouseover = function () {
                    displayInfowindow(marker, title);
                };
                itemEl.onmouseout = function () {
                    infowindow.close();
                };
            }
        })(marker, places[i].place_name);

        if (itemEl) fragment.appendChild(itemEl);
    }

    if (listEl) {
        listEl.appendChild(fragment);
        if (menuEl) menuEl.scrollTop = 0;
    }

    map.setBounds(bounds);
}

// 검색결과 항목을 엘리먼트로 반환하는 함수
function getListItem(index, places) {
    const el = document.createElement('li');
    let itemStr = '<div class="info" style="padding:10px 0; border-bottom:1px solid #eee; font-size:13px; cursor:pointer;">' +
                  '   <h5 style="margin:0 0 5px 0; color:#2C4224; font-size:14px;">' + places.place_name + '</h5>';

    if (places.road_address_name) {
        itemStr += '    <span style="color:#666;">' + places.road_address_name + '</span><br>';
    } else {
        itemStr += '    <span style="color:#666;">' +  places.address_name  + '</span><br>'; 
    }
    itemStr += '  <span style="color:#999; font-size:11px;">' + places.phone  + '</span>' +
               '</div>';           

    el.innerHTML = itemStr;
    return el;
}

// 검색 마커 생성 함수
function addMarker(position, idx) {
    const marker = new kakao.maps.Marker({
        position: position
    });

    marker.setMap(map); 
    searchMarkers.push(marker); 

    return marker;
}

// 검색 마커 제거 함수
function removeSearchMarkers() {
    for (let i = 0; i < searchMarkers.length; i++) {
        searchMarkers[i].setMap(null);
    }   
    searchMarkers = [];
    infowindow.close();
}

// 페이지번호 표시 함수
function displayPagination(pagination) {
    const paginationEl = document.getElementById('pagination');
    if (!paginationEl) return;

    const fragment = document.createDocumentFragment(); 

    while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
    }

    for (let i = 1; i <= pagination.last; i++) {
        const el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;
        el.style.margin = "0 5px";
        el.style.textDecoration = "none";
        el.style.color = "#333";

        if (i === pagination.current) {
            el.style.fontWeight = "bold";
            el.style.color = "var(--main-color, #2C4224)";
        } else {
            el.onclick = (function(i) {
                return function() {
                    pagination.gotoPage(i);
                }
            })(i);
        }

        fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
}

// 인포윈도우 표출 함수 (검색 리스트용)
function displayInfowindow(marker, title) {
    const content = '<div style="padding:5px;z-index:1;font-size:12px;color:#333;">' + title + '</div>';
    infowindow.setContent(content);
    infowindow.open(map, marker);
}

function removeAllChildNods(el) { 
    while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
    }
}

// 엔터키 검색 이벤트
const keywordInput = document.getElementById('keyword');
if (keywordInput) {
    keywordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            window.searchPlaces();
        }
    });
}


// ------------------스크롤 이벤트-------------------
document.addEventListener("DOMContentLoaded", () => {
    const fadeTitles = document.querySelectorAll(".scroll-fade");

    const titleObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 화면에 타이틀이 걸치면 show 클래스 부여해서 애니메이션 작동
                entry.target.classList.add("show");
                // 한 번 뜬 이후에는 다시 사라지지 않도록 관찰 종료
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1 // 타이틀의 10%만 화면에 걸쳐도 즉시 부드럽게 올라옴
    });

    fadeTitles.forEach(title => titleObserver.observe(title));
});