// ===== Try Now Page Script =====

document.addEventListener('DOMContentLoaded', function() {
    
    // 요소 선택
    const loading = document.getElementById('loading');
    const sidebar = document.getElementById('sidebar');
    const textDisplay = document.querySelector('.text-display');
    const fontPreview = document.getElementById('fontPreview');
    const fontSelect = document.getElementById('fontSelect');
    
    // try now 페이지가 아니면 실행하지 않음
    if (!loading || !sidebar) {
        return;
    }
    
    // 컨트롤 요소
    const fontSize = document.getElementById('fontSize');
    const letterSpacing = document.getElementById('letterSpacing');
    const lineHeight = document.getElementById('lineHeight');
    const sizeValue = document.getElementById('sizeValue');
    const spacingValue = document.getElementById('spacingValue');
    const lineHeightValue = document.getElementById('lineHeightValue');

    // 애니메이션: 로딩 → 사이드바 → 텍스트
    setTimeout(() => {
        loading.classList.add('hidden');
        
        setTimeout(() => {
            sidebar.classList.add('active');
            
            setTimeout(() => {
                if (textDisplay) {
                    textDisplay.style.opacity = '1';
                }
            }, 800);
        }, 800);
    }, 1500);

    // 폰트 변경
    fontSelect.addEventListener('change', (e) => {
        const selectedFont = e.target.value;
        switch(selectedFont) {
            case 'ACTA':
                fontPreview.style.fontFamily = "'LUV_ACTA', sans-serif";
                break;
            case 'TEMPORA':
                fontPreview.style.fontFamily = "'LUV_TEMPORA', sans-serif";
                break;
            case 'SERVIA':
                fontPreview.style.fontFamily = "'LUV_SERVIA', sans-serif";
                break;
            case 'LENTUS':
                fontPreview.style.fontFamily = "'LUV_LENTUS', sans-serif";
                break;
            case 'GIFTIS':
                fontPreview.style.fontFamily = "'LUV_GIFTIS', sans-serif";
                break;
        }
    });

    // 글씨 크기 조절
    fontSize.addEventListener('input', (e) => {
        const value = e.target.value;
        fontPreview.style.fontSize = value + 'px';
        sizeValue.textContent = value + 'px';
    });

    // 자간 조절
    letterSpacing.addEventListener('input', (e) => {
        const value = e.target.value;
        fontPreview.style.letterSpacing = value + 'px';
        spacingValue.textContent = value + 'px';
    });

    // 행간 조절
    lineHeight.addEventListener('input', (e) => {
        const value = e.target.value;
        fontPreview.style.lineHeight = value;
        lineHeightValue.textContent = value;
    });

    // 정렬 버튼
    document.querySelectorAll('[data-align]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('[data-align]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            fontPreview.style.textAlign = btn.dataset.align;
        });
    });

    // 대소문자 변환 버튼
    document.querySelectorAll('[data-case]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('[data-case]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            fontPreview.style.textTransform = btn.dataset.case;
        });
    });

    // 초기 스타일 적용
    fontPreview.style.fontSize = '110px';
    fontPreview.style.letterSpacing = '0px';
    fontPreview.style.lineHeight = '1.2';
    fontPreview.style.textAlign = 'center';
    fontPreview.style.textTransform = 'none';
    fontPreview.style.fontFamily = "'LUV_ACTA', sans-serif";
});