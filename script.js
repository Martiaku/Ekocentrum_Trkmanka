document.addEventListener('DOMContentLoaded', () => {
    // 1. JAZYK
    const btnCz = document.getElementById('lang-cz');
    const btnEn = document.getElementById('lang-en');
    const elementsToTranslate = document.querySelectorAll('[data-cz]');

    const savedLang = localStorage.getItem('siteLang') || 'cz';
    setLanguage(savedLang);

    function setLanguage(lang) {
        window.currentLang = lang;
        localStorage.setItem('siteLang', lang);

        if (lang === 'cz') {
            if (btnCz) btnCz.classList.add('active');
            if (btnEn) btnEn.classList.remove('active');
            document.documentElement.lang = 'cs';
        } else {
            if (btnEn) btnEn.classList.add('active');
            if (btnCz) btnCz.classList.remove('active');
            document.documentElement.lang = 'en';
        }

        elementsToTranslate.forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            if (text) {
                el.textContent = text;
            }
        });
    }

    if (btnCz) btnCz.addEventListener('click', () => setLanguage('cz'));
    if (btnEn) btnEn.addEventListener('click', () => setLanguage('en'));

    // 2. TMAVÝ / SVĚTLÝ REŽIM
    const themeToggleBtn = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('siteTheme') || 'light';

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
            localStorage.setItem('siteTheme', isDark ? 'dark' : 'light');
        });
    }

    // 3. COOKIES BANNER
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieDecline = document.getElementById('cookieDecline');

    if (!localStorage.getItem('cookieConsent')) {
        if (cookieBanner) cookieBanner.style.display = 'block';
    }

    if (cookieAccept) {
        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieBanner.style.display = 'none';
        });
    }

    if (cookieDecline) {
        cookieDecline.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'declined');
            cookieBanner.style.display = 'none';
        });
    }

    // MOBILNÍ MENU
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('menu-open');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (link.classList.contains('dropdown-toggle') && window.innerWidth <= 1000) {
                    return;
                }
                navMenu.classList.remove('menu-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        navMenu.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            toggle.addEventListener('click', event => {
                if (window.innerWidth <= 1000) {
                    event.preventDefault();
                    toggle.parentElement.classList.toggle('open');
                }
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 1000) {
                navMenu.classList.remove('menu-open');
                navMenu.querySelectorAll('.dropdown.open').forEach(dropdown => {
                    dropdown.classList.remove('open');
                });
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
});

// GALERIE POKOJŮ
function openGallery(roomFolder, imageNames) {
    const modal = document.getElementById('galleryModal');
    const modalTitle = document.getElementById('modalTitle');
    const mainImg = document.getElementById('mainGalleryImg');
    const thumbnailsContainer = document.getElementById('modalThumbnails');

    const isEn = window.currentLang === 'en';
    modalTitle.textContent = isEn ? `Photo gallery - Room ${roomFolder}` : `Fotogalerie pokoje ${roomFolder}`;
    thumbnailsContainer.innerHTML = ''; 

    const basePath = `images/hlavni_budova/${roomFolder}/`;

    if (imageNames.length > 0) {
        mainImg.src = basePath + imageNames[0];
    }

    imageNames.forEach((imgName, index) => {
        const thumb = document.createElement('img');
        thumb.src = basePath + imgName;
        thumb.alt = isEn ? `Thumbnail ${index + 1}` : `Náhled ${index + 1}`;
        thumb.className = `thumb-img ${index === 0 ? 'active' : ''}`;

        thumb.addEventListener('click', () => {
            mainImg.src = basePath + imgName;
            document.querySelectorAll('.thumb-img').forEach(el => el.classList.remove('active'));
            thumb.classList.add('active');
        });

        thumbnailsContainer.appendChild(thumb);
    });

    modal.style.display = 'flex';
}

function closeGallery() {
    document.getElementById('galleryModal').style.display = 'none';
}

// DATA PRO AKTIVITY (DVOJJAZYČNĚ)
const activityData = {
    iwana: {
        cz: {
            title: "IWANA ART kresby, malby, výtvarné kurzy",
            content: `
                <p class="mb-3">Již odmalička mě to ke kresbě a malování, jakož i jiné tvůrčí činnosti neodolatelně táhne. Mým snem je předat lidem, kteří moje dílka mají doma, kus krásné energie, kterou jsem do obrázků vložila.</p>
                <div class="contact-card-info">
                    <h4>IVANA TESAŘOVÁ</h4>
                    <ul class="info-contact-list">
                        <li>✉️ <a href="mailto:ivana.tesarova@volny.cz">ivana.tesarova@volny.cz</a></li>
                        <li>🌐 <a href="http://www.iwana.cz" target="_blank" rel="noopener">www.iwana.cz</a></li>
                    </ul>
                </div>
            `
        },
        en: {
            title: "IWANA ART Drawings, Paintings, Art Courses",
            content: `
                <p class="mb-3">Ever since I was a child, I have been irresistibly drawn to drawing, painting, and other creative activities. My dream is to pass on a piece of beautiful energy to people who own my artwork.</p>
                <div class="contact-card-info">
                    <h4>IVANA TESAŘOVÁ</h4>
                    <ul class="info-contact-list">
                        <li>✉️ <a href="mailto:ivana.tesarova@volny.cz">ivana.tesarova@volny.cz</a></li>
                        <li>🌐 <a href="http://www.iwana.cz" target="_blank" rel="noopener">www.iwana.cz</a></li>
                    </ul>
                </div>
            `
        }
    },
    keramika: {
        cz: {
            title: "KERAMIKA při Ekocentru Trkmanka",
            content: `<p class="mb-3">Kurzy keramiky jsou momentálně pozastaveny.</p>`
        },
        en: {
            title: "CERAMICS at Ekocentrum Trkmanka",
            content: `<p class="mb-3">Ceramics courses are currently suspended.</p>`
        }
    },
    kmenvlku: {
        cz: {
            title: "KMEN VLKŮ na Ekocentru Trkmanka",
            content: `<p class="mb-3">Jezdíte rádi do přírody? Poznejte partu dobrých kamarádů, napínavé hry a dobrodružství. Přidejte se k nám!</p>`
        },
        en: {
            title: "WOLF TRIBE (Kmen Vlků) at Ekocentrum Trkmanka",
            content: `<p class="mb-3">Do you love spending time in nature? Meet a great group of friends, enjoy exciting games and adventure. Join us!</p>`
        }
    },
    joga: {
        cz: {
            title: "JÓGA - Aneta Pavliňáková - na Ekocentru Trkmanka",
            content: `<p class="mb-3">Kurzy jógy jsou momentálně pozastaveny.</p>`
        },
        en: {
            title: "YOGA - Aneta Pavliňáková - at Ekocentrum Trkmanka",
            content: `<p class="mb-3">Yoga classes are currently suspended.</p>`
        }
    },
    ncod: {
        cz: {
            title: "Taneční studio N. C. O. D. na Ekocentru Trkmanka",
            content: `<p class="mb-3">Taneční kurzy jsou momentálně pozastaveny.</p>`
        },
        en: {
            title: "Dance Studio N. C. O. D. at Ekocentrum Trkmanka",
            content: `<p class="mb-3">Dance classes are currently suspended.</p>`
        }
    }
};

function openActivityModal(key) {
    const activity = activityData[key];
    if (!activity) return;

    const lang = window.currentLang || 'cz';
    const data = activity[lang] || activity['cz'];

    const modal = document.getElementById('infoModal');
    document.getElementById('infoModalTitle').textContent = data.title;
    document.getElementById('infoModalBody').innerHTML = data.content;

    modal.style.display = 'flex';
}

function closeInfoModal() {
    document.getElementById('infoModal').style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section[id], header[id]");
    const navLinks = document.querySelectorAll(".nav-menu > a, .nav-menu .dropdown-toggle");

    function changeNavOnScroll() {
        let scrollPos = window.scrollY + 150; // Odsazení pro dřívější aktivaci

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    // Pokud je to dropdown, odebereme aktivní třídu i jemu
                    const dropdown = link.closest(".dropdown");
                    if (dropdown) dropdown.classList.remove("active");

                    // Kontrola pro normální odkazy i dropdown (např. fotografie)
                    if (link.getAttribute("href") === "#" + sectionId || 
                        (sectionId.startsWith("foto") && link.getAttribute("href") === "#fotografie")) {
                        link.classList.add("active");
                        if (dropdown) dropdown.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", changeNavOnScroll);
    
    // Kliknutí na odkaz ručně nastaví aktivní stav
    navLinks.forEach(link => {
        link.addEventListener("click", function() {
            navLinks.forEach(l => {
                l.classList.remove("active");
                const d = l.closest(".dropdown");
                if (d) d.classList.remove("active");
            });
            this.classList.add("active");
            const parentDropdown = this.closest(".dropdown");
            if (parentDropdown) parentDropdown.classList.add("active");
        });
    });
});