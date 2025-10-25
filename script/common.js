// header 스크롤 했을 때 디자인 적용
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// main-lovelanguages 마우스 트래킹
const container = document.querySelector('.lovelanguages');
const items = document.querySelectorAll('.item_area .item');

let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;

container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = e.clientX - rect.width / 2;
    mouseY = e.clientY - rect.height / 2;
});