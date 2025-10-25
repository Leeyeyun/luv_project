// 폰트 메인 페이지 인트로 루프 애니메이션

const icons = [
    { img: './images/3d_img_2/3d01_heart.png',  text: 'ACTA<br>Words of Affirmation', font: 'LUV_ACTA' },
    { img: './images/3d_img_2/3d02_arrow.png',  text: 'TEMPORA<br>Quality Time',       font: 'LUV_TEMPORA' },
    { img: './images/3d_img_2/3d03_wing.png',   text: 'SERVIA<br>Acts of Service',     font: 'LUV_SERVIA' },
    { img: './images/3d_img_2/3d04_hand.png',   text: 'LENTUS<br>Physical Love',       font: 'LUV_LENTUS' },
    { img: './images/3d_img_2/3d05_ribbon.png', text: 'GIFTIS<br>Receiving Gifts',     font: 'LUV_GIFTIS' }
    ]

    let i = 0
    const img = document.querySelector('.icon_3d img')
    const iconName = document.querySelector('.icon_name')
    const change = document.querySelector('.top h1 .change')

    function loop() {
    const current = icons[i]

    // 초기화
    img.style.transition = 'none'
    img.style.width = '0'
    img.style.opacity = '0'
    iconName.style.opacity = '0'

    // 초기 상태 강제 인식
    void img.offsetWidth

    // 이미지, 폰트, 텍스트 변경
    img.src = current.img
    iconName.innerHTML = current.text
    change.style.fontFamily = current.font + ', sans-serif'
    iconName.style.fontFamily = current.font + ', sans-serif'

    // 트랜지션 복구
    img.style.transition = 'all 1s ease-in-out'
    iconName.style.transition = 'opacity 1s ease-in-out'

    // 0.1초 후 이미지 확장
    setTimeout(() => {
        img.style.opacity = '1'
        img.style.width = '500px'
    }, 100)

    // 1.7초 뒤 이미지 사라지고 텍스트 등장
    setTimeout(() => {
        img.style.opacity = '0'
        iconName.style.opacity = '1'
    }, 2000)

    // 텍스트 2초 유지 후 사라짐
    setTimeout(() => {
        iconName.style.opacity = '0'
    }, 3700)

    // 다음 루프 (총 템포 4.2초)
    setTimeout(() => {
        i = (i + 1) % icons.length
        loop()
    }, 5000)
}

loop()



// font hover or click 시 변화
let activeItem = null

const overviewTxt = document.querySelector('.overview_txt')
const fontItems = document.querySelectorAll('.overview_font li')

fontItems.forEach(li => {
    const fontName = li.querySelector('h2').textContent.trim()

    li.addEventListener('mouseenter', () => {
        li.classList.add('hover')
        overviewTxt.style.fontFamily = `LUV_${fontName}, sans-serif`
    })

    li.addEventListener('mouseleave', () => {
        li.classList.remove('hover')

        if (activeItem) {
        const activeFont = activeItem.querySelector('h2').textContent.trim()
        overviewTxt.style.fontFamily = `LUV_${activeFont}, sans-serif`
        } else {
        overviewTxt.style.fontFamily = ''
        }
    })

    li.addEventListener('click', () => {
        if (activeItem) activeItem.classList.remove('active')
        activeItem = li
        li.classList.add('active')
        overviewTxt.style.fontFamily = `LUV_${fontName}, sans-serif`
    })
})

// ✅ 페이지 로드 시 첫 번째 li를 기본 활성화
window.addEventListener('DOMContentLoaded', () => {
    const first = fontItems[0]
    if (first) {
        first.classList.add('active')
        activeItem = first
        const firstFont = first.querySelector('h2').textContent.trim()
        overviewTxt.style.fontFamily = `LUV_${firstFont}, sans-serif`
    }
})