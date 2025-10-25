gsap.registerPlugin(ScrollTrigger)

const info = document.querySelector('.information')
const fontIcon = document.querySelector('.information .font_icon > img')

gsap.set(fontIcon, {
    y: 80,  // top: 80px에서 시작
    opacity: 1
    })

    gsap.to(fontIcon, {
    y: () => info.clientHeight - fontIcon.clientHeight - 160, // 부모 높이 안에서 이동
    opacity: 0,                                              // 끝에 가면 안 보이게
    ease: 'none',
    scrollTrigger: {
        trigger: info,
        start: 'top center',
        end: 'bottom top',
        scrub: true,
    }
})

// 스크롤 y가 높이 지나가면 아이콘 등장
window.addEventListener('scroll', () => {
    const intro = document.querySelector('.intro')
    const info = document.querySelector('.information')
    const slogan = document.querySelector('.slogan')
    const upImg = document.querySelector('.slogan .up_img')

    const totalHeight = intro.offsetHeight + info.offsetHeight
    const scrollY = window.scrollY

    if (scrollY >= totalHeight) {
        upImg.style.bottom = '12%'
    } else {
        upImg.style.bottom = '-100%'
    }
})