// user name 작성할 때 영문만 작성 가능하도록
const inputs = document.querySelectorAll('.input_wrap input');

inputs.forEach(input => {
    input.addEventListener('input', e => {
        e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    });
});

// start_btn 클릭 시 다음 페이지 넘어감 & 다음페이지로 넘어감
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.querySelector(".test .start_btn");
    const goBtn = document.querySelector(".user .go_btn");
    const header = document.querySelector('header');
    const nav = document.querySelector('header nav');
    const tryBtn = document.querySelector('header .try');
    const questionItems = document.querySelectorAll('.question_item');
    const nextBtns = document.querySelectorAll('.next_btn');
    const prevBtns = document.querySelectorAll('.prev_btn');

    // 🚩 TEST → USER 이동
    if (startBtn) {
        startBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const current = startBtn.closest('section');
        const next = current?.nextElementSibling;
        if (!next) return;

        // header 페이드아웃 + nav, try 숨김
        if (current.classList.contains('test') && header) {
            header.style.transition = 'opacity 0.5s ease';
            header.style.opacity = '0';

            setTimeout(() => {
            if (nav) nav.style.display = 'none';
            if (tryBtn) tryBtn.style.display = 'none';
            }, 500);
        }

        // 현재 섹션 페이드아웃
        current.style.transition = 'opacity 0.5s ease';
        current.style.opacity = '0';

        // 다음 섹션 디졸브 등장
        setTimeout(() => {
            current.classList.remove('active');
            current.style.display = 'none';

            next.style.display = 'flex';
            next.style.opacity = '0';
            next.classList.add('active');

            setTimeout(() => {
            next.style.transition = 'opacity 0.5s ease';
            next.style.opacity = '1';

            if (header) {
                header.style.transition = 'opacity 0.5s ease';
                header.style.opacity = '1';
            }
            }, 10);
        }, 500);
        });
    }

    // 🚩 USER → QUESTION 이동
    if (goBtn) {
        goBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const current = goBtn.closest('section');
        const next = current?.nextElementSibling;
        if (!next) return;

        header.style.opacity = '1';
        current.style.transition = 'opacity 0.5s ease';
        current.style.opacity = '0';

        setTimeout(() => {
            current.classList.remove('active');
            current.style.display = 'none';

            next.style.display = 'flex';
            next.style.opacity = '0';
            next.classList.add('active');

            setTimeout(() => {
            next.style.transition = 'opacity 0.5s ease';
            next.style.opacity = '1';

            // ✅ question 애니메이션 실행
            triggerQuestionAnimation();
            }, 10);
        }, 500);
        });
    }

    // 🔹 공통 애니메이션 함수 (transform 버전)
    function triggerQuestionAnimation() {
        const currentItem = document.querySelector('.question_item.current');
        if (!currentItem) return;

        const qNum = currentItem.querySelector('.q_num');
        const userBtns = currentItem.querySelectorAll('.user_btns');

        // 초기화
        currentItem.style.transform = 'translateY(0)';
        if (qNum) qNum.style.opacity = '1';
        userBtns.forEach(btn => btn.style.opacity = '0');

        // 1초 후 애니메이션
        setTimeout(() => {
        currentItem.style.transition = 'transform 0.6s ease';
        currentItem.style.transform = 'translateY(-50px)';

        if (qNum) {
            qNum.style.transition = 'opacity 0.6s ease';
            qNum.style.opacity = '0';
        }

        userBtns.forEach(btn => {
            btn.style.transition = 'opacity 0.6s ease';
            btn.style.opacity = '1';
        });
        }, 1000);
    }

    // 🔹 question 전환 함수 (겹침 방지 안정 버전)
    function switchQuestion(current, target) {
        if (!target) return;

        // 모든 li 초기화 (겹침 방지)
        questionItems.forEach(item => {
            item.style.transition = 'none';
            item.style.opacity = '0';
            item.style.display = 'none';
            item.classList.remove('current');
            item.querySelectorAll('.user_btns').forEach(btn => btn.style.opacity = '0');
        });

        // target 준비
        target.style.display = 'block';
        target.style.opacity = '0';
        target.classList.add('current');

        // 살짝 텀 두고 페이드인
        setTimeout(() => {
        target.style.transition = 'opacity 0.5s ease';
        target.style.opacity = '1';

        // ✅ 애니메이션 실행
        triggerQuestionAnimation();
        }, 10);
    }

    // 🚩 next 버튼 클릭
    nextBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
        const current = questionItems[index];
        const next = questionItems[index + 1];
        switchQuestion(current, next);
        });
    });

    // 🚩 prev 버튼 클릭
    prevBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
        const current = questionItems[index];
        const prev = questionItems[index - 1];
        switchQuestion(current, prev);
        });
    });
});


// back 버튼 누르면 이전으로
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


// user 버튼 하나만 selected 되도록
const userBtns = document.querySelectorAll('.user_btn');

userBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const question = btn.closest('.question'); // 현재 질문 단위
        const isUser1 = btn.classList.contains('user1');
        const userClass = isUser1 ? 'user1' : 'user2';

        question.querySelectorAll(`.user_btn.${userClass}`).forEach(b => {
        b.classList.remove('selected');
        });

        btn.classList.add('selected');
    });
});





