const searchEl = document.querySelector(".search");
const searchInputEl = searchEl.querySelector("input");

searchEl.addEventListener("click", function () {
    searchInputEl.focus();
});

searchInputEl.addEventListener("focus", function () {
    searchEl.classList.add("focused");
    searchInputEl.setAttribute("placeholder", "통합검색");
});

searchInputEl.addEventListener("blur", function () {
    searchEl.classList.remove("focused");
    searchInputEl.setAttribute("placeholder", "");
});

const badgeEl = document.querySelector("header .badges");
const toTopEl = document.querySelector('#toTop');

/* 뱃지 효과_.throttle(함수, 시간) */
// window라는 객체? → 프로젝트 화면
window.addEventListener(
    "scroll",
    _.throttle(function () {
        // throttle → 스크롤 함수 실행을 최소화 하기 위한 기능
        console.log(window.scrollY);
        if (window.scrollY > 500) {
            // badges 숨기기
            // badgeEl.style.display = 'none';
            // gsap.to(요소, 지속시간, 옵션);
            gsap.to(badgeEl, 0.03, {
                opacity: 0,
                display: "none"
            });
            // Top 버튼 숨기기!
            gsap.to(toTopEl, 0.2, {
                //옵션
                x: 0 // 해당영역으로 왔을 때 x축의 이동값 
            });
            // ★TIP!! gsap 라이브러리는 요소의 css 선택자로 적어도 해당요소를 찾아줌
        } else {
            // badges 보이기
            // badgeEl.style.display = 'block';
            gsap.to(badgeEl, 0.03, {
                opacity: 1,
                display: "block"
            });
            // Top 버튼 보이기!
            gsap.to(toTopEl, 0.2, {
                //옵션
                x: 100 // 해당영역으로 왔을 때 x축의 이동값 → 우측으로 사라짐
            });
        }
    }, 300)
);

/* Top 버튼 - 최상단으로 이동 */
toTopEl.addEventListener('click', () => {
    gsap.to(window, .7, {
        scrollTo :0
    });
});

/* 메인비주얼 애니메이션(요소 나타나기) */
const fadeEls = document.querySelectorAll(".visual .fade-in");
fadeEls.forEach(function (fadeEl, index) {
    // gsap.to(요소, 지속시간, 옵션); 지속 시간은 초단위
    gsap.to(fadeEl, 1, {
        // 각각의 요소가 0.7초 뒤 애니메이션 실행 0.7, 1.4, 2.1, 2.8
        delay: (index + 1) * 0.7,
        opacity: 1,
    });
});

/* 공지사항 Swiper */
// new.Swiper(선택자, 옵션);
new Swiper(".notice-line .swiper-container", {
    direction: "vertical",
    autoplay: true,
    loop: true,
});

/* 스타벅스 프로모션 Swiper */
new Swiper(".promotion .swiper-container", {
    // direction: 'horizontal' → 기본값
    slidesPerView: 3, // 한번에 보여줄 슬라이드 개수
    spaceBetween: 10, // 슬라이드 사이 여백
    centeredSlides: true, // 1번 슬라이드가 가운데 보이기
    loop: true,
    autoplay: {
        delay: 3000,
    },
    // 페이지 번호
    pagination: {
        el: ".promotion .swiper-pagination", // 페이지 번호 요소 선택자
        clickable: true, // 사용자의 페이지 번호 요소 제어 가능 여부
    },
    // 좌우버튼
    navigation: {
        prevEl: ".promotion .swiper-prev",
        nextEl: ".promotion .swiper-next",
    },
});

/* 인증내역 Swiper */
const awrdsSwiper = new Swiper(".awards .swiper-container", {
    autoplay: {
        delay: 0, //add
        disableOnInteraction: false,
    },
    speed: 5000,
    loop: true,
    loopAdditionalSlides: 1,
    slidesPerView: 5,
    spaceBetween: 30,
    navigation: {
        prevEl: ".awards .swiper-prev",
        nextEl: ".awards .swiper-next",
    },
});
/* 마우스 오버시 Swiper 멈춤 */
$(".awards .swiper-wrapper").hover(function () {
    awrdsSwiper.autoplay.stop();
});

/* 스타벅스 프로모션 숨김/펼침 */
const promotionEl = document.querySelector(".promotion"); // 숨김 or 펼침될 구역
const promotionToggleBtn = document.querySelector(".toggle-promotion"); // 토글 버튼
let isHidePromotion = false;
// ※ let → 재사용 O, 재할당 O

promotionToggleBtn.addEventListener("click", function () {
    isHidePromotion = !isHidePromotion;
    // → true -- !가 들어가면 반대의 값으로 전환, 즉 false가 true가 되어 값이 반환
    // → 어떤 특정 변수의 값을 지속적으로 반대값으로 전환시켜줄 수 있는 코드
    if (isHidePromotion) {
        // true이면 → 숨김 처리!
        promotionEl.classList.add("hide"); // 해당 요소 부분에 'hide'라는 클래스 추가!
    } else {
        // false이면 → 펼침 처리!
        promotionEl.classList.remove("hide"); // 해당 요소 부분에 'hide'라는 클래스 제거!
    }
});

/* 유투브 동영상 재생 영역 */
// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
    // `.toFixed()`를 통해 반환된 문자 데이터를,
    // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}
function floatingObject(selector, delay, size) {
    // gsap.to(요소, 시간, 옵션);
    gsap.to(
        selector, // 선택자
        random(1.5, 2.5), // 애니메이션 동작 시간(최대, 최소)
        {
            // 옵션
            y: size,
            repeat: -1, // 무한 반복
            yoyo: true, // 다시 원래 위치로 돌아가기(통통 튀는 느낌)
            ease: "power1.inOut", // easing 함수 → https://gsap.com/docs/v3/Eases/
            delay: random(0, delay),
        }
    );
}
floatingObject(".floating1", 1, 15); // delay: 1초, 움직이는 범위: 15px
floatingObject(".floating2", 0.5, 15); // delay: .5초, 움직이는 범위: 15px
floatingObject(".floating3", 1.5, 20); // delay: 1.5초, 움직이는 범위: 15px

/* 스크롤 애니메이션 */
/*
    ScrollMagic이라는 자바스크립트 라이브러리가 각각의 해당하는 '.scroll-spy'라는
    클래스를 가지고 있는 요소들을 지속적으로 감시하고 있다가 그 요소가 우리가 지정해 놓은
    해당하는 지점을 넘어서 화면에 보이는 순간 각각의 부분에 '.show'라는 클래스를 추가해줌!
*/
const spyEls = document.querySelectorAll("section.scroll-spy");
spyEls.forEach(function (spyEl) {
    new ScrollMagic.Scene({
        triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
        triggerHook: 0.8, // 화면에서 0 ~ 1까지의 영역 중 0.8에 도달할 경우
    })
        .setClassToggle(spyEl, "show") // 해당 요소를 추가했다 제거했다 → 토글
        .addTo(new ScrollMagic.Controller()); // 추가한 옵션들을 내부의 컨트롤러의 내용을 할당해서 실제 동작할 수 있는 구조로 만들어줌
});

const thisYear = document.querySelector(".this-year");
thisYear.textContent = new Date().getFullYear(); // 현재 년도 반환
/*
Node.textContent - <script>와 <style> 요소를 포함한 모든 요소의 컨텐츠를 가져옴
                    → 안에 태그 포함 요소일 때 사용이 용이함
Node.innerText - "사람이 읽을 수 있는 요소"만 처리(숨겨진 요소의 텍스트는 반환하지 않음)
Node.innerHTML - textContent의 성능이 더 좋음
*/
