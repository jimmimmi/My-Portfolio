document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav .nav-link');
    const sections = document.querySelectorAll('main section');
    const backToTopButton = document.querySelector('.back-to-top'); // "맨 위로 가기" 버튼 선택
    
    // --- 다크 모드 로직 (신규 추가) ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // 1. 페이지 로드 시 localStorage 확인
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    } else {
        body.classList.remove('dark-mode');
        darkModeToggle.checked = false;
    }

    // 2. 토글 스위치 클릭 이벤트
    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark'); // 선택 저장
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light'); // 선택 저장
        }
    });
    // --- 다크 모드 로직 끝 ---


    // 스크롤 이벤트 리스너
    window.addEventListener('scroll', () => {
        let currentSectionId = '';

        // --- "맨 위로 가기" 버튼 표시 로직 ---
        if (window.scrollY > 300) { // 300px 이상 스크롤되면
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }

        // --- 내비게이션 활성화 로직 ---
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // 현재 스크롤 위치가 섹션 범위 내에 있는지 확인
            // (sectionTop - 50)으로 상단에 약간의 여유를 줍니다.
            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // 활성 링크 업데이트
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // --- 스크롤 애니메이션 (Intersection Observer) ---
    const elementsToAnimate = document.querySelectorAll('.fade-in-element');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 화면에 보이면 'is-visible' 클래스 추가
                entry.target.classList.add('is-visible');
            }
            // (선택 사항) 화면 밖으로 나갈 때 다시 숨기려면
            // else {
            //     entry.target.classList.remove('is-visible');
            // }
        });
    }, {
        threshold: 0.1 // 요소가 10% 보일 때 트리거
    });

    // 모든 대상 요소 관찰 시작
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
});
