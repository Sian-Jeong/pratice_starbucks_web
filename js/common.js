/* HEADER  */
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

/* FOOTER */
const thisYear = document.querySelector(".this-year");
thisYear.textContent = new Date().getFullYear(); // 현재 년도 반환
/*
Node.textContent - <script>와 <style> 요소를 포함한 모든 요소의 컨텐츠를 가져옴
                    → 안에 태그 포함 요소일 때 사용이 용이함
Node.innerText - "사람이 읽을 수 있는 요소"만 처리(숨겨진 요소의 텍스트는 반환하지 않음)
Node.innerHTML - textContent의 성능이 더 좋음
*/
