// user name 작성할 때 영문만 작성 가능하도록
const inputs = document.querySelectorAll('.input_wrap input');

inputs.forEach(input => {
    input.addEventListener('input', e => {
        e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    });
    
    // ✅ 포커스 시 영문 입력 모드로 설정
    input.addEventListener('focus', e => {
        e.target.setAttribute('lang', 'en');
        e.target.setAttribute('inputmode', 'latin');
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
    const loadingPage = document.querySelector('.loading');
    const nextBtns = document.querySelectorAll('.next_btn');
    const prevBtns = document.querySelectorAll('.prev_btn');

    // 🚩 TEST → USER 이동
    if (startBtn) {
        startBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // ✅ 이전 메시지 기록만 초기화
        localStorage.removeItem('user1Message');
        localStorage.removeItem('user2Message');

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

        // ✅ 사용자 이름 가져오기
        const user1Input = document.getElementById('user1');
        const user2Input = document.getElementById('user2');
        const user1Name = user1Input?.value.trim();
        const user2Name = user2Input?.value.trim();

        // ✅ 이름이 입력되지 않은 경우 경고
        if (!user1Name || !user2Name) {
            alert('두 사용자의 이름을 모두 입력해주세요.');
            return;
        }

        // ✅ 모든 question의 user name span에 이름 적용
        const user1NameSpans = document.querySelectorAll('.user1Name');
        const user2NameSpans = document.querySelectorAll('.user2Name');
        
        user1NameSpans.forEach(span => {
            span.textContent = user1Name;
        });
        
        user2NameSpans.forEach(span => {
            span.textContent = user2Name;
        });

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
            
            // ✅ progress bar 초기화 (첫 질문 = 20%)
            updateProgressBar();
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

    // 🔹 progress bar 업데이트 함수
    function updateProgressBar() {
        const progressFill = document.querySelector('.progress_fill');
        const progressPercent = document.querySelector('.progress_wrap .percent');
        
        if (!progressFill || !progressPercent) return;
        
        // 현재 질문 인덱스 찾기
        let currentIndex = 0;
        questionItems.forEach((item, index) => {
            if (item.classList.contains('current')) {
                currentIndex = index;
            }
        });
        
        // 진행률 계산 (첫 질문은 0%, 두 번째부터 20%씩 증가)
        const progress = (currentIndex / 5) * 100;
        
        // progress bar와 퍼센트 업데이트
        progressFill.style.width = `${progress}%`;
        progressPercent.textContent = `${progress}%`;
    }

    // 🔹 question 전환 함수 (겹침 방지 안정 버전)
    function switchQuestion(current, target) {
        if (!target) return;

        questionItems.forEach(item => {
        item.style.transition = 'none';
        item.style.opacity = '0';
        item.style.display = 'none';
        item.classList.remove('current');
        item.querySelectorAll('.user_btns').forEach(btn => btn.style.opacity = '0');
        });

        target.style.display = 'block';
        target.style.opacity = '0';
        target.classList.add('current');

        setTimeout(() => {
        target.style.transition = 'opacity 0.5s ease';
        target.style.opacity = '1';
        triggerQuestionAnimation();
        
        // ✅ progress bar 업데이트
        updateProgressBar();
        }, 10);
    }

    // 🚩 next 버튼 클릭
nextBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const current = questionItems[index];
        const next = questionItems[index + 1];

        // ✅ 선택 여부 검증
        const selectedUser1 = current.querySelector('.user_btn.user1.selected');
        const selectedUser2 = current.querySelector('.user_btn.user2.selected');

        if (!selectedUser1 || !selectedUser2) {
            // 두 사용자 모두 선택하지 않은 경우
            if (!selectedUser1 && !selectedUser2) {
                alert('두 사용자 모두 옵션을 선택해주세요.');
            }
            // user1만 선택하지 않은 경우
            else if (!selectedUser1) {
                const user1Name = document.querySelector('.user1Name')?.textContent || 'User 1';
                alert(`${user1Name}님이 옵션을 선택해주세요.`);
            }
            // user2만 선택하지 않은 경우
            else if (!selectedUser2) {
                const user2Name = document.querySelector('.user2Name')?.textContent || 'User 2';
                alert(`${user2Name}님이 옵션을 선택해주세요.`);
            }
            return; // 다음으로 넘어가지 않음
        }

        // ✅ 마지막 질문(Q5) → loading 이동 처리
        if (!next && loadingPage) {
            // header 페이드아웃
            if (header) {
                header.style.transition = 'opacity 0.5s ease';
                header.style.opacity = '0';
                setTimeout(() => {
                    if (nav) nav.style.display = 'none';
                    if (tryBtn) tryBtn.style.display = 'none';
                }, 500);
            }

            // 현재 질문 페이드아웃
            current.style.transition = 'opacity 0.5s ease';
            current.style.opacity = '0';

            // ✅ loading 등장
            setTimeout(() => {
                current.style.display = 'none';
                loadingPage.style.display = 'flex';
                loadingPage.style.opacity = '0';

                // ✅ progress bar 100%로 설정
                const progressFill = document.querySelector('.progress_fill');
                const progressPercent = document.querySelector('.progress_wrap .percent');
                if (progressFill && progressPercent) {
                    progressFill.style.width = '100%';
                    progressPercent.textContent = '100%';
                }

                setTimeout(() => {
                    loadingPage.style.transition = 'opacity 0.6s ease';
                    loadingPage.style.opacity = '1';
                }, 10);

                // ✅ 3.5초 후 result 섹션으로 자동 전환
                setTimeout(() => {
                    const resultSection = document.querySelector('.result');
                    const questionSection = document.querySelector('.question');
                    if (!resultSection || !questionSection) return;

                    // ✅ 사랑의 언어 결과 계산 및 적용
                    calculateAndApplyLoveLanguage();

                    // question section 전체 페이드아웃
                    questionSection.style.transition = 'opacity 0.6s ease';
                    questionSection.style.opacity = '0';

                    setTimeout(() => {
                        questionSection.style.display = 'none'; // 완전히 숨김

                        // ✅ result section 등장
                        resultSection.style.display = 'flex';
                        resultSection.style.opacity = '0';
                        resultSection.classList.add('active');

                        setTimeout(() => {
                            resultSection.style.transition = 'opacity 0.6s ease';
                            resultSection.style.opacity = '1';

                            // ✅ header 다시 나타나기
                            if (header) {
                                header.style.display = 'block';
                                header.style.transition = 'opacity 0.6s ease';
                                header.style.opacity = '1';
                            }

                            // ✅ 1.5초 후 h1 크기 6rem & margin-bottom 80px, 버튼 등장
                            setTimeout(() => {
                                const resultTitle = resultSection.querySelector('h1');
                                const resultBtn = resultSection.querySelector('.btn');
                                
                                // h1 크기 축소 & margin-bottom 조정
                                if (resultTitle) {
                                    resultTitle.style.transition = 'all 0.5s ease';
                                    resultTitle.style.fontSize = '6rem';
                                    resultTitle.style.marginBottom = '80px';
                                    
                                    const resultStrong = resultTitle.querySelector('strong');
                                    if (resultStrong) {
                                        resultStrong.style.transition = 'font-size 0.5s ease';
                                        resultStrong.style.fontSize = '6rem';
                                    }
                                }
                                
                                // 버튼 등장
                                if (resultBtn) {
                                    resultBtn.style.display = 'block';
                                    resultBtn.style.opacity = '0';
                                    
                                    setTimeout(() => {
                                        resultBtn.style.transition = 'opacity 0.5s ease';
                                        resultBtn.style.opacity = '1';
                                    }, 10);
                                }
                            }, 1800);

                        }, 1000);
                    }, 600); // question 사라진 후 result 등장
                }, 3500); // 3.5초 후 실행
            }, 500);

            return;
        }

        // 일반 질문 간 전환
        switchQuestion(current, next);
    });
});

    // 🚩 prev 버튼 클릭
    prevBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const current = questionItems[index];
        const prev = questionItems[index - 1];
        if (!prev) return; // 첫 질문에서는 이전 없음

        switchQuestion(current, prev);
    });
    });
});


// 🚩 RESULT → MESSAGE 이동 & MESSAGE → LOVE_TANK 이동
document.addEventListener('DOMContentLoaded', () => {
    const resultGoBtn = document.querySelector(".result .go_btn");
    const messageGoBtn = document.querySelector(".message .go_btn");
    const header = document.querySelector('header');

    // RESULT → MESSAGE
    if (resultGoBtn) {
        resultGoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const current = resultGoBtn.closest('section');
            const next = current?.nextElementSibling;
            if (!next) return;

            // 현재 섹션 페이드아웃
            current.style.transition = 'opacity 0.5s ease';
            current.style.opacity = '0';

            setTimeout(() => {
                current.classList.remove('active');
                current.style.display = 'none';

                // 다음 섹션 등장
                next.style.display = 'flex';
                next.style.opacity = '0';
                next.classList.add('active');

                setTimeout(() => {
                    next.style.transition = 'opacity 0.5s ease';
                    next.style.opacity = '1';
                }, 10);
            }, 500);
        });
    }

    // MESSAGE → LOVE_TANK 부분에 비디오 재설정 추가
    if (messageGoBtn) {
        messageGoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const message1Input = document.getElementById('message1');
            const message2Input = document.getElementById('message2');
            const user1Message = message1Input?.value.trim();
            const user2Message = message2Input?.value.trim();

            if (!user1Message || !user2Message) {
                alert('두 사용자의 메시지를 모두 입력해주세요.');
                return;
            }

            localStorage.setItem('user1Message', user1Message);
            localStorage.setItem('user2Message', user2Message);

            const current = messageGoBtn.closest('section');
            const next = current?.nextElementSibling;
            if (!next) return;

            current.style.transition = 'opacity 0.5s ease';
            current.style.opacity = '0';

            setTimeout(() => {
                current.classList.remove('active');
                current.style.display = 'none';

                next.style.display = 'flex';
                next.style.opacity = '0';
                next.classList.add('active');

                // ✅ 비디오 재설정 추가
                setupTankVideo(); // 비디오 소스 재설정
                
                const tankVideo = document.querySelector('.tank_motion video');
                if (tankVideo) {
                    // 비디오 재생 (약간의 딜레이 후)
                    setTimeout(() => {
                        tankVideo.play().catch(err => {
                            console.error('Video play error:', err);
                        });
                    }, 100);
                }

                setTimeout(() => {
                    next.style.transition = 'opacity 0.5s ease';
                    next.style.opacity = '1';
                }, 10);
            }, 500);
        });
    }

    // ✅ 메시지 입력 실시간 반영 및 저장
    const messageInputs = document.querySelectorAll('#message_form input');
    const writedMessages = document.querySelectorAll('.writedMessage');

    messageInputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        const message = input.value.trim();

        // 콘솔에 표시
        console.log(`User${index + 1} Message:`, message);

        // localStorage에 실시간 덮어쓰기
        localStorage.setItem(`user${index + 1}Message`, message);

        // 감정탱크 메시지 즉시 반영 (writedMessage 영역)
        if (writedMessages[index]) {
        writedMessages[index].textContent = message || ''; // 공백이면 비움
        }
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


// 🎯 사랑의 언어 테스트 - 데이터 및 계산 로직
// 사랑의 언어 매핑 (질문번호-옵션 : 언어)
const loveLanguageMap = {
    'q1-a': 'words',      // 인정하는 말
    'q1-b': 'gifts',      // 선물
    'q2-a': 'words',      // 인정하는 말
    'q2-b': 'time',       // 함께하는 시간
    'q3-a': 'touch',      // 스킨십
    'q3-b': 'service',    // 봉사
    'q4-a': 'service',    // 봉사
    'q4-b': 'gifts',      // 선물
    'q5-a': 'time',       // 함께하는 시간
    'q5-b': 'touch'       // 스킨십
};

// 사랑의 언어 정보 (한글명, 설명, 아이콘, 폰트)
const loveLanguageInfo = {
    'words': {
        name: '인정하는 말',
        nameEn: 'Words of Affirmation',
        desc: '따뜻한 말과 칭찬을 통해<br>사랑을 느끼고 표현하는 타입',
        icon: './images/3d/3d_img_2/3d01_heart.png',
        font: 'ACTA'  // ✅ ACTA → LUV_ACTA
    },
    'time': {
        name: '함께하는 시간',
        nameEn: 'Quality Time',
        desc: '온전히 집중하며 함께하는 시간을 통해<br>사랑을 느끼고 표현하는 타입',
        icon: './images/3d/3d_img_2/3d02_arrow.png',
        font: 'TEMPORA'  // ✅ TEMPORA → LUV_TEMPORA
    },
    'service': {
        name: '봉사',
        nameEn: 'Acts of Service',
        desc: '상대를 위해 실질적으로 도움을 주는 행동으로<br>사랑을 느끼고 표현하는 타입',
        icon: './images/3d/3d_img_2/3d03_wing.png',
        font: 'SERVIA'  // ✅ SERVIA → LUV_SERVIA
    },
    'touch': {
        name: '스킨십',
        nameEn: 'Physical Touch',
        desc: '따뜻한 접촉과 신체적 친밀감을 통해<br>사랑을 느끼고 표현하는 타입',
        icon: './images/3d/3d_img_2/3d04_hand.png',
        font: 'LENTUS'  // ✅ LENTUS → LUV_LENTUS
    },
    'gifts': {
        name: '선물',
        nameEn: 'Receiving Gifts',
        desc: '상대방을 생각하며 준비하는 선물과<br>그에 담긴 정성을 통해 사랑을 느끼는 타입',
        icon: './images/3d/3d_img_2/3d05_ribbon.png',
        font: 'GIFTIS'  // ✅ GIFTIS → LUV_GIFTIS
    }
};

// 동점 시 우선순위 (인정>시간>봉사>스킨십>선물)
const priorityOrder = ['words', 'time', 'service', 'touch', 'gifts'];

// 사용자별 선택 저장
const userChoices = {
    user1: {},
    user2: {}
};

// user 버튼 하나만 selected 되도록
const userBtns = document.querySelectorAll('.user_btn');

userBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const questionItem = btn.closest('.question_item'); // 현재 질문 아이템
        const isUser1 = btn.classList.contains('user1');
        const userClass = isUser1 ? 'user1' : 'user2';

        // 현재 질문 전체에서 같은 유저 클래스의 다른 버튼 선택 해제
        questionItem.querySelectorAll(`.user_btn.${userClass}`).forEach(b => {
            b.classList.remove('selected');
        });

        btn.classList.add('selected');

        // ✅ 선택 저장
        const questionIndex = Array.from(document.querySelectorAll('.question_item')).indexOf(questionItem);
        const option = btn.closest('.option');
        const isOptionA = Array.from(questionItem.querySelectorAll('.option')).indexOf(option) === 0;
        const questionKey = `q${questionIndex + 1}-${isOptionA ? 'a' : 'b'}`;
        
        if (isUser1) {
            userChoices.user1[`q${questionIndex + 1}`] = questionKey;
        } else {
            userChoices.user2[`q${questionIndex + 1}`] = questionKey;
        }

        // ✅ 현재 질문에서 user1과 user2가 각각 하나씩 선택되었는지 확인
        setTimeout(() => {
            const selectedUser1 = questionItem.querySelector('.user_btn.user1.selected');
            const selectedUser2 = questionItem.querySelector('.user_btn.user2.selected');

            // 두 유저가 각각 선택했으면 자동으로 다음 질문으로
            if (selectedUser1 && selectedUser2) {
                const currentIndex = Array.from(document.querySelectorAll('.question_item')).indexOf(questionItem);
                const nextBtn = document.querySelectorAll('.next_btn')[currentIndex];
                
                if (nextBtn) {
                    // 1초 후 자동으로 다음 질문으로
                    setTimeout(() => {
                        nextBtn.click();
                    }, 1000);
                }
            }
        }, 100);
    });
});

// 가장 많이 선택된 언어 계산 함수
function calculateLoveLanguage(choices) {
    const counts = {
        words: 0,
        time: 0,
        service: 0,
        touch: 0,
        gifts: 0
    };

    // 각 선택을 언어로 변환하여 카운트
    Object.values(choices).forEach(choice => {
        const language = loveLanguageMap[choice];
        if (language) {
            counts[language]++;
        }
    });

    // 최대값 찾기
    const maxCount = Math.max(...Object.values(counts));
    
    // 최대값을 가진 언어들 필터링
    const topLanguages = Object.keys(counts).filter(lang => counts[lang] === maxCount);
    
    // 동점이면 우선순위에 따라 선택
    if (topLanguages.length > 1) {
        for (const lang of priorityOrder) {
            if (topLanguages.includes(lang)) {
                return lang;
            }
        }
    }
    
    return topLanguages[0];
}

// 사랑의 언어 결과 계산 및 적용 함수
function calculateAndApplyLoveLanguage() {
    // 결과 계산
    const user1Language = calculateLoveLanguage(userChoices.user1);
    const user2Language = calculateLoveLanguage(userChoices.user2);
    
    console.log('User1 Language:', user1Language); // 디버깅용
    console.log('User2 Language:', user2Language); // 디버깅용
    
    // ✅ localStorage에 폰트 정보 저장 (love_tank에서 사용)
    localStorage.setItem('user1Font', loveLanguageInfo[user1Language].font);
    localStorage.setItem('user2Font', loveLanguageInfo[user2Language].font);
    
    // ✅ localStorage에 아이콘 정보 저장 (비디오 선택에 사용)
    localStorage.setItem('user1Icon', loveLanguageInfo[user1Language].icon);
    localStorage.setItem('user2Icon', loveLanguageInfo[user2Language].icon);
    
    // ✅ localStorage에 사랑의 언어 저장 (URL 파라미터용)
    localStorage.setItem('user1Language', user1Language);
    localStorage.setItem('user2Language', user2Language);
    
    // user1 결과 업데이트
    const user1Result = document.querySelector('.user1_result');
    if (user1Result) {
        const user1LoveSpans = user1Result.querySelectorAll('.result_love span');
        const user1Icon = user1Result.querySelector('.result_love_icn img');
        const user1NameSpans = user1Result.querySelectorAll('.user1Name');
        
        // 사랑의 언어 이름 (첫 번째 span)
        if (user1LoveSpans[0]) {
            user1LoveSpans[0].textContent = loveLanguageInfo[user1Language].name;
        }
        
        // 설명 (두 번째 span)
        if (user1LoveSpans[1]) {
            user1LoveSpans[1].innerHTML = loveLanguageInfo[user1Language].desc;
        }
        
        // 아이콘
        if (user1Icon) {
            user1Icon.src = loveLanguageInfo[user1Language].icon;
            user1Icon.alt = loveLanguageInfo[user1Language].name;
        }
        
        // ✅ 사랑의 언어 폰트 적용
        user1NameSpans.forEach(span => {
            span.style.fontFamily = `'LUV_${loveLanguageInfo[user1Language].font}', sans-serif`;
        });
    }
    
    // user2 결과 업데이트
    const user2Result = document.querySelector('.user2_result');
    if (user2Result) {
        const user2LoveSpans = user2Result.querySelectorAll('.result_love span');
        const user2Icon = user2Result.querySelector('.result_love_icn img');
        const user2NameSpans = user2Result.querySelectorAll('.user2Name');
        
        // 사랑의 언어 이름 (첫 번째 span)
        if (user2LoveSpans[0]) {
            user2LoveSpans[0].textContent = loveLanguageInfo[user2Language].name;
        }
        
        // 설명 (두 번째 span)
        if (user2LoveSpans[1]) {
            user2LoveSpans[1].innerHTML = loveLanguageInfo[user2Language].desc;
        }
        
        // 아이콘
        if (user2Icon) {
            user2Icon.src = loveLanguageInfo[user2Language].icon;
            user2Icon.alt = loveLanguageInfo[user2Language].name;
        }
        
        // ✅ 사랑의 언어 폰트 적용
        user2NameSpans.forEach(span => {
            span.style.fontFamily = `'LUV_${loveLanguageInfo[user2Language].font}', sans-serif`;
        });
    }
}

// ✅ 비디오 소스 설정 함수
function setupTankVideo() {
    const tankVideo = document.querySelector('.tank_motion video');
    console.log('=== 비디오 설정 시작 ===');
    
    if (!tankVideo) {
        console.error('tankVideo element not found!');
        return;
    }
    
    const user1Icon = localStorage.getItem('user1Icon');
    const user2Icon = localStorage.getItem('user2Icon');
    
    console.log('User1 Icon Path:', user1Icon);
    console.log('User2 Icon Path:', user2Icon);
    
    if (!user1Icon || !user2Icon) {
        console.warn('Icon data missing, using default video');
        tankVideo.src = './video/heart_heart.mp4';
        tankVideo.load();
        return;
    }
    
    const getIconName = (iconPath) => {
        const match = iconPath.match(/3d\d+_(\w+)\./);
        return match ? match[1] : 'heart';
    };
    
    const icon1Name = getIconName(user1Icon);
    const icon2Name = getIconName(user2Icon);
    
    console.log('Extracted icon names - User1:', icon1Name, 'User2:', icon2Name);
    
    const videoMap = {
        'heart-heart': 'heart_heart.mp4',
        'arrow-arrow': 'arrow_arrow.mp4',
        'wing-wing': 'wing_wing.mp4',
        'hand-hand': 'hand_hand.mp4',
        'ribbon-ribbon': 'ribbon_ribbon.mp4',
        'arrow-heart': 'heart_arrow.mp4',
        'heart-arrow': 'heart_arrow.mp4',
        'heart-wing': 'heart_wing.mp4',
        'wing-heart': 'heart_wing.mp4',
        'hand-heart': 'heart_hand.mp4',
        'heart-hand': 'heart_hand.mp4',
        'heart-ribbon': 'heart_ribbon.mp4',
        'ribbon-heart': 'heart_ribbon.mp4',
        'arrow-wing': 'arrow_wing.mp4',
        'wing-arrow': 'arrow_wing.mp4',
        'arrow-hand': 'arrow_hand.mp4',
        'hand-arrow': 'arrow_hand.mp4',
        'arrow-ribbon': 'arrow_ribbon.mp4',
        'ribbon-arrow': 'arrow_ribbon.mp4',
        'hand-wing': 'wing_hand.mp4',
        'wing-hand': 'wing_hand.mp4',
        'ribbon-wing': 'wing_ribbon.mp4',
        'wing-ribbon': 'wing_ribbon.mp4',
        'hand-ribbon': 'hand_ribbon.mp4',
        'ribbon-hand': 'hand_ribbon.mp4'
    };
    
    const combinationKey = `${icon1Name}-${icon2Name}`;
    const videoFileName = videoMap[combinationKey] || 'heart_heart.mp4';
    const videoPath = `./video/${videoFileName}`;
    
    console.log('Combination key:', combinationKey);
    console.log('Selected video:', videoPath);
    
    tankVideo.src = videoPath;
    tankVideo.load();
    console.log('비디오 소스 설정 완료!');
    console.log('======================');
}

// love_tank 섹션 진입 감지 및 비디오 재생, user_result_wrap 페이드인 처리
document.addEventListener('DOMContentLoaded', function() {
    const loveTankSection = document.querySelector('.love_tank');
    const tankVideo = document.querySelector('.tank_motion video');
    const userResultWrap = document.querySelector('.user_result_wrap');
    const writedMessages = document.querySelectorAll('.writedMessage');
    
    // ✅ URL 파라미터 확인 및 결과 복원
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('u1') && urlParams.has('u2')) {
        console.log('Loading results from URL parameters...');
        
        // URL에서 데이터 가져오기
        const user1Name = urlParams.get('u1');
        const user2Name = urlParams.get('u2');
        const user1Lang = urlParams.get('r1');
        const user2Lang = urlParams.get('r2');
        const user1Msg = urlParams.get('m1');
        const user2Msg = urlParams.get('m2');
        
        // localStorage에 저장
        localStorage.setItem('user1Name', user1Name);
        localStorage.setItem('user2Name', user2Name);
        localStorage.setItem('user1Language', user1Lang);
        localStorage.setItem('user2Language', user2Lang);
        localStorage.setItem('user1Font', loveLanguageInfo[user1Lang].font);
        localStorage.setItem('user2Font', loveLanguageInfo[user2Lang].font);
        localStorage.setItem('user1Icon', loveLanguageInfo[user1Lang].icon);
        localStorage.setItem('user2Icon', loveLanguageInfo[user2Lang].icon);
        localStorage.setItem('user1Message', user1Msg);
        localStorage.setItem('user2Message', user2Msg);
        
        // love_tank 섹션으로 바로 이동
        document.querySelectorAll('main > section').forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });
        loveTankSection.classList.add('active');
        loveTankSection.style.display = 'flex';
        loveTankSection.style.opacity = '1';
        
        // 이름 적용
        document.querySelectorAll('.user1Name').forEach(span => {
            span.textContent = user1Name;
            span.style.fontFamily = `'LUV_${loveLanguageInfo[user1Lang].font}', sans-serif`;
        });
        document.querySelectorAll('.user2Name').forEach(span => {
            span.textContent = user2Name;
            span.style.fontFamily = `'LUV_${loveLanguageInfo[user2Lang].font}', sans-serif`;
        });
        
        // ✅ URL 파라미터로 접근 시에도 비디오 설정
        setupTankVideo();
    }
    
    // user_result_wrap 초기 상태 설정
    if (userResultWrap) {
        userResultWrap.style.opacity = '0';
        userResultWrap.style.transition = 'opacity 1s ease-in-out';
    }
    
    // Intersection Observer로 섹션 진입 감지
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Love tank section is now visible');
                // 비디오 재생
                if (tankVideo) {
                    tankVideo.play().catch(err => {
                        console.error('Video play error:', err);
                    });
                    
                    // 5초 후 user_result_wrap 페이드인 및 폰트 적용
                    setTimeout(() => {
                        if (userResultWrap) {
                            userResultWrap.style.opacity = '1';
                            
                            // ✅ localStorage에서 폰트 정보 가져오기
                            const user1Font = localStorage.getItem('user1Font');
                            const user2Font = localStorage.getItem('user2Font');
                            
                            console.log('Applying fonts - User1:', user1Font, 'User2:', user2Font);
                            
                            // ✅ love_tank 섹션의 user_area 폰트 적용
                            const userAreas = userResultWrap.querySelectorAll('.user_area');
                            
                            if (userAreas[0]) {
                                // USER 1 폰트 적용
                                const user1NameSpan = userAreas[0].querySelector('.user1Name');
                                const user1FontSpan = userAreas[0].querySelector('.user_font');
                                
                                if (user1NameSpan && user1Font) {
                                    user1NameSpan.style.fontFamily = `'LUV_${user1Font}', sans-serif`;
                                }
                                if (user1FontSpan && user1Font) {
                                    user1FontSpan.textContent = user1Font;
                                }
                                
                                // message_txt의 span들도 user1 폰트 적용
                                const user1MessageSpans = userAreas[0].querySelectorAll('.message_txt span');
                                user1MessageSpans.forEach(span => {
                                    span.style.fontFamily = `'LUV_${user1Font}', sans-serif`;
                                });
                            }
                            
                            if (userAreas[1]) {
                                // USER 2 폰트 적용
                                const user2NameSpan = userAreas[1].querySelector('.user2Name');
                                const user2FontSpan = userAreas[1].querySelector('.user_font');
                                
                                if (user2NameSpan && user2Font) {
                                    user2NameSpan.style.fontFamily = `'LUV_${user2Font}', sans-serif`;
                                }
                                if (user2FontSpan && user2Font) {
                                    user2FontSpan.textContent = user2Font;
                                }
                                
                                // message_txt의 span들도 user2 폰트 적용
                                const user2MessageSpans = userAreas[1].querySelectorAll('.message_txt span');
                                user2MessageSpans.forEach(span => {
                                    span.style.fontFamily = `'LUV_${user2Font}', sans-serif`;
                                });
                            }
                        }
                    }, 5000);
                }
            }
        });
    }, {
        threshold: 0.5
    });
    
    if (loveTankSection) {
        observer.observe(loveTankSection);
    }
    
    // ✅ localStorage에서 메시지 가져오기
    const user1Message = localStorage.getItem('user1Message') || 'I love you';
    const user2Message = localStorage.getItem('user2Message') || 'You mean the world to me';
    
    // ✅ writedMessage에 메시지 표시
    if (writedMessages.length >= 2) {
        writedMessages[0].textContent = user1Message;
        writedMessages[1].textContent = user2Message;
    }
});



document.querySelector('.goto_btn button').addEventListener('click', () => {
    window.location.href = './index.html';
});