function animate() {
    // 부드럽게 따라가기
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const dx = currentX - (cx - container.offsetWidth / 2);
        const dy = currentY - (cy - container.offsetHeight / 2);

        // 거리 계산 (루트 안 쓰면 좀 더 빠름)
        const dist = Math.sqrt(dx * dx + dy * dy);

        // 거리값을 반대로 감도(weight)로 변환
        // 가까울수록 감도 큼, 멀수록 감도 작음
        const maxDist = Math.min(container.offsetWidth, container.offsetHeight);
        const weight = 1 - Math.min(dist / (maxDist / 2), 1); // 0~1 사이

        const moveX = currentX * weight * 0.04;
        const moveY = currentY * weight * 0.04;

        item.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });

    requestAnimationFrame(animate);
}

animate();


const cupids = document.querySelectorAll('.cupid');

cupids.forEach(cupid => {
    cupid.addEventListener('mouseenter', () => {
        cupids.forEach(card => card.classList.remove('active', 'inactive'));
        cupid.classList.add('active');
        cupids.forEach(card => {
        if (card !== cupid) card.classList.add('inactive');
        });

        cupids.forEach(card => {
        const h3 = card.querySelector('.front .info > h3');
        const p = card.querySelector('.front .info > p');
        if (!h3 || !p) return;

        h3.style.transition = 'opacity 0.4s ease';
        p.style.transition = 'opacity 0.4s ease';

        if (card.classList.contains('inactive')) {
            // 1. 사라지기
            h3.style.opacity = '0';
            p.style.opacity = '0';

            // 2. 사라진 상태에서 회전 적용 (안 보임)
            setTimeout(() => {
            h3.style.transform = 'rotate(-90deg)';
            }, 400);

            // 3. 회전된 상태로 다시 등장 (h3만)
            setTimeout(() => {
            h3.style.opacity = '1';
            }, 500);
        } else {
            // active 카드 유지
            h3.style.opacity = '1';
            h3.style.transform = 'rotate(0deg)';
            p.style.opacity = '1';
        }
        });
    });

    cupid.addEventListener('mouseleave', () => {
        // 상태 복귀
        cupids.forEach(card => {
        card.classList.remove('active', 'inactive');
        const h3 = card.querySelector('.front .info > h3');
        const p = card.querySelector('.front .info > p');
        if (!h3 || !p) return;

        h3.style.transition = 'opacity 0.4s ease';
        p.style.transition = 'opacity 0.4s ease';

        h3.style.opacity = '1';
        h3.style.transform = 'rotate(0deg)';
        p.style.opacity = '1'; // hover 해제 시 p 다시 복귀
        });
    });
});