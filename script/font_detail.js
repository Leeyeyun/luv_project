// scroll trigger 폰트 -> 3d 폰트로 바뀌는 인터랙션

gsap.registerPlugin(ScrollTrigger)

const info = document.querySelector('.information')
const img1 = document.querySelector('.information .font_icon img:nth-child(1)')
const img2 = document.querySelector('.information .font_icon img:nth-child(2)')

// 두 아이콘 공통 초기 세팅
gsap.set([img1, img2], {
    y: 80,
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
})

// 개별 투명도 초기값
gsap.set(img1, { y: 80, opacity: 1 })
gsap.set(img2, { y: 20, opacity: 0 })

// 같은 경로로 아래로 이동
const moveDistance = () => info.clientHeight - img1.clientHeight - 280

// 첫 번째 아이콘: 내려가며 사라짐
gsap.to(img1, {
    y: moveDistance,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
        trigger: info,
        start: 'top center',
        end: 'bottom 90%',
        scrub: true,
    }
})

// 두 번째 아이콘: 같은 거리 내려가며 나타남
gsap.to(img2, {
    y: moveDistance,
    opacity: 1,
    ease: 'none',
    scrollTrigger: {
        trigger: info,
        start: 'top center',
        end: 'bottom 80%',
        scrub: true,
    }
})



// 스크롤 y가 높이 지나가면 아이콘 등장
window.addEventListener('scroll', () => {
    const slogan = document.querySelector('.slogan')
    const upImg = slogan.querySelector('.up_img')

    const triggerY = slogan.offsetTop
    const scrollY = window.scrollY
    const windowHeight = window.innerHeight

    // slogan이 화면에 절반쯤 들어왔을 때 실행
    if (scrollY + windowHeight * 0.5 >= triggerY) {
        upImg.style.bottom = '12%'
    } else {
        upImg.style.bottom = '-100%'
    }
})


// 슬라이더 진행 바 색상 업데이트
function updateSliderProgress(slider) {
    const percentage = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.setProperty('--value', percentage + '%');
}

const typingArea = document.querySelector('.typing_area');

// 1. 폰트 크기 조절
const fontSizeSlider = document.getElementById('fontSize');
updateSliderProgress(fontSizeSlider);
fontSizeSlider.addEventListener('input', function() {
    updateSliderProgress(this);
    document.getElementById('fontSizeValue').textContent = this.value + 'px';
    typingArea.style.fontSize = this.value + 'px';
});

// 2. 자간 조절
const letterSpacingSlider = document.getElementById('letterSpacing');
updateSliderProgress(letterSpacingSlider);
letterSpacingSlider.addEventListener('input', function() {
    updateSliderProgress(this);
    document.getElementById('letterSpacingValue').textContent = this.value;
    typingArea.style.letterSpacing = this.value + 'px';
});

// 3. 정렬 토글
const alignButtons = document.querySelectorAll('.align button');
alignButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
        alignButtons.forEach(btn => btn.setAttribute('data-active', 'false'));
        this.setAttribute('data-active', 'true');
        
        if (index === 0) {
            typingArea.style.textAlign = 'left';
        } else if (index === 1) {
            typingArea.style.textAlign = 'center';
        }
    });
});

// 4. 대소문자 토글
const caseButtons = document.querySelectorAll('.case button');
caseButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
        caseButtons.forEach(btn => btn.setAttribute('data-active', 'false'));
        this.setAttribute('data-active', 'true');
        
        if (index === 0) {
            typingArea.style.textTransform = 'uppercase'; // AA
        } else if (index === 1) {
            typingArea.style.textTransform = 'none'; // Aa
        }
    });
});

// 5. 다크모드 토글
const darkmodeButton = document.querySelector('.darkmode button');
const typingSection = document.querySelector('.typing');
const sliderLabels = document.querySelectorAll('.slider_wrap label img');
const fontSizeValue = document.getElementById('fontSizeValue');
const letterSpacingValue = document.getElementById('letterSpacingValue');

darkmodeButton.addEventListener('click', function() {
    const currentMode = this.getAttribute('data-active');
    
    if (currentMode === 'dark') {
        // 라이트 모드로 전환
        this.setAttribute('data-active', 'light');
        typingSection.style.backgroundColor = '#ffffff';
        typingArea.style.color = '#000000';
        
        // 슬라이더 라벨 아이콘 invert
        sliderLabels.forEach(img => img.style.filter = 'invert(1)');
        
        // 값 표시 색상 변경
        fontSizeValue.style.color = '#000000';
        letterSpacingValue.style.color = '#000000';
        
        // align 버튼 invert
        alignButtons.forEach(btn => btn.style.filter = 'invert(1)');
        
        // case 버튼 색상 변경
        caseButtons.forEach(btn => btn.style.color = '#000000');
        
        // 다크모드 버튼 자체도 invert
        this.style.filter = 'invert(1)';
        
    } else {
        // 다크 모드로 전환
        this.setAttribute('data-active', 'dark');
        typingSection.style.backgroundColor = '#000000';
        typingArea.style.color = '#ffffff';
        
        // 원래대로 복원
        sliderLabels.forEach(img => img.style.filter = 'none');
        fontSizeValue.style.color = '#ffffff';
        letterSpacingValue.style.color = '#ffffff';
        alignButtons.forEach(btn => btn.style.filter = 'none');
        caseButtons.forEach(btn => btn.style.color = '#ffffff');
        this.style.filter = 'none';
    }
});


// Glyphs - hover 시 왼쪽 preview 변경
const glyphDisplay = document.querySelector('.glyph_display');
const glyphItems = document.querySelectorAll('.glyph_item');

glyphItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        glyphDisplay.textContent = this.textContent;
    });
});