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