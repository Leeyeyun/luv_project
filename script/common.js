// header 스크롤 했을 때 디자인 적용
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

//header sub 나오도록
document.addEventListener('DOMContentLoaded', function() {
    const fontsMenu = document.querySelector('.gnb > li:nth-child(2)');
    const subMenu = fontsMenu.querySelector('.sub');
    
    let timeoutId;
    
    fontsMenu.addEventListener('mouseenter', function() {
        clearTimeout(timeoutId);
        subMenu.classList.add('active');
    });
    
    fontsMenu.addEventListener('mouseleave', function() {
        timeoutId = setTimeout(function() {
            subMenu.classList.remove('active');
        }, 100); // 약간의 여유 시간
    });
    
    // 서브메뉴에 마우스 올렸을 때도 유지
    subMenu.addEventListener('mouseenter', function() {
        clearTimeout(timeoutId);
        subMenu.classList.add('active');
    });
    
    subMenu.addEventListener('mouseleave', function() {
        subMenu.classList.remove('active');
    });
});