// Swiper 초기화
const backgroundSwiper = new Swiper('.backgroundSwiper', {
    direction: 'vertical', // 세로 슬라이드
    loop: true, // 무한 반복
    autoplay: {
        delay: 5000, // 5초마다 전환
        disableOnInteraction: false,
    },
    speed: 1000, // 전환 속도 (조금 느리게)
    
    // Creative 효과로 레이어드 스타일
    effect: 'creative',
    creativeEffect: {
        prev: {
            // 이전 슬라이드: 위로 올라가면서 작아지고 투명해짐
            translate: [0, '-100%', -200],
            scale: 0.85,
            opacity: 0,
        },
        next: {
            // 다음 슬라이드: 아래에서 크게 시작해서 정상 크기로
            translate: [0, '100%', 0],
            scale: 0.9,
            opacity: 0.7,
        },
    },
    
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});


// 타이핑 효과
const typingText = document.getElementById('typingText');
const words = ['SPOKEN', 'SPOKEN', 'SPOKEN', 'SPOKEN', 'SPOKEN'];
const fonts = ['font-acta', 'font-tempora', 'font-servia', 'font-lentus', 'font-giftis'];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150; // 타이핑 속도
let deletingSpeed = 100; // 삭제 속도
let pauseTime = 2000; // 단어가 완성된 후 대기 시간

function type() {
    const currentWord = words[wordIndex];
    const currentFont = fonts[wordIndex];
    
    // 폰트 클래스 변경
    typingText.className = currentFont;
    
    if (isDeleting) {
        // 글자 지우기
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // 다음 단어로
            setTimeout(type, 500); // 짧은 대기 후 다음 단어 타이핑
            return;
        }
        setTimeout(type, deletingSpeed);
    } else {
        // 글자 타이핑
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(type, pauseTime); // 완성 후 대기
            return;
        }
        setTimeout(type, typingSpeed);
    }
}

// 페이지 로드 후 타이핑 시작
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000); // 1초 후 시작
});