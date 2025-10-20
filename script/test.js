// user name 작성할 때 영문만 작성 가능하도록
const inputs = document.querySelectorAll('.input_wrap input');

inputs.forEach(input => {
    input.addEventListener('input', () => {
        input.value = input.value.replace(/[^A-Za-z]/g, '');
    });
});

// start_btn 클릭 시 header 사라짐 & 다음페이지로 넘어감
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.querySelector(".test .start_btn");
    const header = document.querySelector('header');

    if (!startBtn) return;

    startBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const current = startBtn.closest('section');
        const next = current?.nextElementSibling;

        if (!next) return;

        // ✅ header가 존재하고, 첫 섹션(test)일 때만 처리
        if (current.classList.contains('test') && header) {
        header.style.transition = 'opacity 0.5s ease';
        header.style.opacity = '0';

        // header.fade 클래스 추가 (display:none 효과)
        setTimeout(() => header.classList.add('fade'), 500);
        }

        // ✅ 현재 섹션 페이드아웃
        current.style.transition = 'opacity 0.5s ease';
        current.style.opacity = '0';

        // ✅ 다음 섹션 디졸브 등장
        setTimeout(() => {
        current.classList.remove('active');
        current.style.display = 'none';

        next.style.display = 'flex';
        next.style.opacity = '0';
        next.classList.add('active');

        setTimeout(() => {
            next.style.transition = 'opacity 0.5s ease';
            next.style.opacity = '1';
        }, 10);
        }, 500);
    });
});


const backBtns = document.querySelectorAll('.back_btn');

backBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();

        const current = btn.closest('section');
        const prev = current?.previousElementSibling;
        const header = document.querySelector('header');

        if (!prev) return;

        // 현재 섹션 페이드아웃
        current.style.opacity = '0';
        header.classList.remove('fade');
        header.style.transition = 'all 0.5s ease';
        header.style.opacity = '1';


        // 이전 섹션 디졸브로 복귀
        setTimeout(() => {
        current.classList.remove('active');
        current.style.display = 'none';

        prev.style.display = 'flex';
        prev.style.opacity = '0';
        prev.classList.add('active');

        setTimeout(() => {
            prev.style.opacity = '1';
        }, 10);
        }, 500);
    });
});

// go_btn 클릭 시 다음페이지로 넘어감
document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.querySelector(".user .go_btn");

    startBtn.addEventListener("click", () => {
        e.preventDefault();
        e.stopPropagation();

        const current = btn.closest('section');
        const next = current?.nextElementSibling;

        if (!next) return;

        // ✅ 현재 섹션 페이드아웃
        current.style.opacity = '0';

        // ✅ 다음 섹션 디졸브 등장
        setTimeout(() => {
            current.classList.remove('active');
            current.style.display = 'none';

            next.style.display = 'flex';
            next.style.opacity = '0';
            next.classList.add('active');

            // 살짝 지연 후 트랜지션 발동
            setTimeout(() => {
            next.style.opacity = '1';
            }, 10);
        }, 500);
    });
});

