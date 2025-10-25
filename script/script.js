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
        cupids.forEach(card => {
        card.classList.remove('active', 'inactive');
        });

        cupid.classList.add('active');
        cupids.forEach(card => {
        if (card !== cupid) {
            card.classList.add('inactive');
        }
        });
    });

    cupid.addEventListener('mouseleave', () => {
        cupids.forEach(card => {
        card.classList.remove('active', 'inactive');
        });
    });
});