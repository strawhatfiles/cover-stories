/**
 * ==========================================
 * 1. CONFIGURATION & ROUTING
 * ==========================================
 */

const tabContents = {
    'sbs': './pages/1_sbs.html',
    'cover-stories': './pages/2_cover-stories.html',
    'specials-movies': './pages/3_specials-movies.html',
    'filler': './pages/4_filler.html',
    'ops-eds': './pages/5_ops-eds.html'
};

const APP_VERSION = typeof SITE_VERSION !== 'undefined' ? SITE_VERSION : Date.now(); // Fallback

/**
 * Main function to handle tab switching via Fetch API
 */
async function showTab(tabName) {
    const display = document.getElementById('tab-display');
    const url = tabContents[tabName];

    if (!url) return;

    // 1. Reset UI states immediately
    window.scrollTo({ top: 0, behavior: "instant" });
    const tabContainer = document.querySelector(".tab-container");
    if (tabContainer) tabContainer.classList.remove("scrolled");

    try {
        // 2. Fetch the HTML file
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`);

        // 3. Inject the HTML
        display.innerHTML = await response.text();

        // 4. Update the active button visually
        updateActiveTabUI(tabName);

        // 5. Restart the fade-in animation
        display.style.animation = "none";
        display.offsetHeight; // Trigger reflow to restart animation
        display.style.animation = "fadeIn 0.5s ease-out";

        // 6. Run tab-specific JavaScript ONLY after the HTML is in the DOM
        if (tabName === 'cover-stories') {
            initializeCoverStories();
        } else if (tabName === 'ops-eds') {
            initializeOpsEds();
        } else if (tabName === 'filler') {
            initializeFiller();
        }

    } catch (error) {
        display.innerHTML = `<div style="padding: 20px; color: #ff6b6b; text-align: center;">Error: Page could not be loaded. Please ensure you are running on a local server.</div>`;
        console.error("Fetch error:", error);
    }
}

function updateActiveTabUI(tabName) {
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach((tab) => tab.classList.remove("active"));

    // Select the button that calls showTab with this specific tabName
    const activeTab = document.querySelector(`.tab[onclick*="'${tabName}'"]`);
    if (activeTab) activeTab.classList.add("active");
}


/**
 * ==========================================
 * 2. TAB-SPECIFIC INITIALIZERS
 * ==========================================
 */

// --- COVER STORIES TAB ---
function initializeCoverStories() {
    const pdfs = [
        { id: "pdf-1", path: "./Colored-Cover-Stories/01.pdf", driveUrl: "https://drive.google.com/file/d/1o1m-AOBmkYQnOCbGpgNqfuhypJw0LyFb/preview" },
        { id: "pdf-2", path: "./Colored-Cover-Stories/02.pdf", driveUrl: "https://drive.google.com/file/d/1ZMN2h90f8dtrsGeeJaFlMQ2ilexzjGNZ/preview" },
        { id: "pdf-3", path: "./Colored-Cover-Stories/03.pdf", driveUrl: "https://drive.google.com/file/d/1DGH137BYqBw8nk0Z7sSyo8o43ONz81Wf/preview" },
        { id: "pdf-4", path: "./Colored-Cover-Stories/04.pdf", driveUrl: "https://drive.google.com/file/d/11NCJhE-fjhxVzkF76g8vK9cK9jElHMLU/preview" },
        { id: "pdf-5", path: "./Colored-Cover-Stories/05.pdf", driveUrl: "https://drive.google.com/file/d/1jwst7A5x5-XdCp2uRMSV1Bzkcz3nyyZ5/preview" },
        { id: "pdf-6", path: "./Colored-Cover-Stories/06.pdf", driveUrl: "https://drive.google.com/file/d/1RG7C-0-w66xkNGV-BBma9wKuDrTzuiKS/preview" },
        { id: "pdf-7", path: "./Colored-Cover-Stories/07.pdf", driveUrl: "https://drive.google.com/file/d/1srYxhyx1WsHqzaXHAFr041A4qgVaqKxn/preview" },
        { id: "pdf-8", path: "./Colored-Cover-Stories/08.pdf", driveUrl: "https://drive.google.com/file/d/1E_rMKM3q0fsiRZSzUuJVHyC1WSlKXEdr/preview" },
        { id: "pdf-9", path: "./Colored-Cover-Stories/08_09.pdf", driveUrl: "https://drive.google.com/file/d/19viS9LFusX5zEy9aQWb2VPpnx7WwO5f5/preview" },
        { id: "pdf-10", path: "./Colored-Cover-Stories/09.pdf", driveUrl: "https://drive.google.com/file/d/14SoE08itCyfZoR01u17wuy5ropLGx4r4/preview" },
        { id: "pdf-11", path: "./Colored-Cover-Stories/09_10.pdf", driveUrl: "https://drive.google.com/file/d/1VicvvI0x5VAL8YXFdw8Hw2lQxrdKKQ9m/preview" },
        { id: "pdf-12", path: "./Colored-Cover-Stories/10.pdf", driveUrl: "https://drive.google.com/file/d/1Rji2KO-IFmOMCGX0WXpyeOt3awqvIsGR/preview" },
        { id: "pdf-13", path: "./Colored-Cover-Stories/11-18.pdf", driveUrl: "https://drive.google.com/file/d/18CFV8ayme9D-Y0Dzv39N1T2635MDXdE-/preview" },
        { id: "pdf-14", path: "./Colored-Cover-Stories/19.pdf", driveUrl: "https://drive.google.com/file/d/1MnJwXPs_R6H_UXeOQtGWXPSOWeZcsOCk/preview" },
        { id: "pdf-15", path: "./Colored-Cover-Stories/20_(with_Color_Spreads).pdf", driveUrl: "https://drive.google.com/file/d/1yTHdvkemkvoOL5fVcUxLdjmyVq5qTlKq/preview" },
        { id: "pdf-16", path: "./Colored-Cover-Stories/21_(with_Color_Spreads).pdf", driveUrl: "https://drive.google.com/file/d/1hUrvjyntwwSoI1Q0sMNgqn-s5NbhQaEj/preview" },
        { id: "pdf-17", path: "./Colored-Cover-Stories/22_(with_Color_Spreads).pdf", driveUrl: "https://drive.google.com/file/d/1UR2mF2LrGL8dqZmGevwc4ECGZD2kDIGi/preview" },
        { id: "pdf-18", path: "./Colored-Cover-Stories/23.pdf", driveUrl: "https://drive.google.com/file/d/yo/preview" },
        { id: "pdf-19", path: "./Colored-Cover-Stories/24.pdf", driveUrl: "https://drive.google.com/file/d/yo/preview" },
        { id: "pdf-20", path: "./Colored-Cover-Stories/25.pdf", driveUrl: "https://drive.google.com/file/d/yo/preview" },
        { id: "pdf-21", path: "./Colored-Cover-Stories/26.pdf", driveUrl: "https://drive.google.com/file/d/yo/preview" }
    ];

    // Load all PDFs with staggered delay to avoid freezing the browser
    pdfs.forEach((pdf, index) => {
        const container = document.getElementById(pdf.id);
        if (container) {
            const pdfNumber = pdf.id.replace("pdf-", "");
            setTimeout(() => {
                container.innerHTML = createPDFEmbed(pdf.path, pdfNumber, pdf.driveUrl);
            }, index * 200);
        }
    });

    // Staggered Entry Animations
    const coverStories = document.querySelectorAll(".cover-story");
    coverStories.forEach((story, index) => {
        story.style.setProperty("--item-index", index);
        story.style.opacity = "0";
        story.style.transform = "translateY(30px) scale(0.95)";
        setTimeout(() => {
            story.style.animation = `slideInUp 0.6s ease-out forwards`;
            story.style.animationDelay = `${index * 0.1}s`;
        }, 100);
    });

    setTimeout(updateLoadAllButton, pdfs.length * 220);

    // Calculate Cover Story progress bar
    const validMarkers = document.querySelectorAll('.progress-markers .marker.completed, .progress-markers .marker.incomplete');
    const completedMarkers = document.querySelectorAll('.progress-markers .marker.completed');

    if (validMarkers.length > 0) {
        const percentage = (completedMarkers.length / validMarkers.length) * 100;
        const progressFill = document.querySelector('.progress-fill');
        const progressLabel = document.querySelector('.progress-label');

        if (progressFill) progressFill.style.width = `${percentage}%`;
        if (progressLabel) progressLabel.innerHTML = `Cover Story Progress &bull; ${completedMarkers.length} of ${validMarkers.length} Complete`;
    }
}

// --- OPS & EDS TAB ---
function initializeOpsEds() {
    // Auto-inject Close buttons at the bottom of all collapsibles
    const collapsibles = document.querySelectorAll('.collapsible-section');

    collapsibles.forEach(section => {
        const inner = section.querySelector('.collapsible-content-inner');
        const content = section.querySelector('.collapsible-content');
        const header = section.querySelector('.collapsible-header');

        // Prevent duplicate injections if tab is re-opened
        if (inner && content && header && !inner.querySelector('.collapse-bottom-wrapper')) {
            const sectionId = content.id.replace('-content', '');

            const wrapper = document.createElement('div');
            wrapper.className = 'collapse-bottom-wrapper';

            const closeBtn = document.createElement('button');
            closeBtn.className = 'btn btn-secondary collapse-bottom-btn'; // Utilized your existing button classes
            closeBtn.style.marginTop = "2rem";
            closeBtn.style.display = "flex";
            closeBtn.style.gap = "0.5rem";
            closeBtn.style.alignItems = "center";
            closeBtn.style.marginInline = "auto";
            closeBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m18 15-6-6-6 6"/>
                </svg>
                Close Section
            `;

            closeBtn.onclick = function() {
                toggleCollapsible(sectionId);
                setTimeout(() => {
                    header.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 50);
            };

            wrapper.appendChild(closeBtn);
            inner.appendChild(wrapper);
        }
    });
}

// --- FILLER TAB ---
function initializeFiller() {
    // Only run if the ESP toggle elements exist in the loaded HTML
    const espToggle = document.getElementById('espToggle');
    if (espToggle) {
        espToggle.addEventListener('change', toggleESP);
        toggleESP(); // Run once to set initial state
    }
}

function toggleESP() {
    const isChecked = document.getElementById('espToggle') ? document.getElementById('espToggle').checked : false;
    const espItems = document.querySelectorAll('.esp-filler');
    const countDisplay = document.getElementById('total-skipped-count');
    const countDesc = document.getElementById('total-skipped-desc');

    // Ensure BASE_SKIPPED_COUNT is defined in your filler.html file, otherwise default to 0
    const baseCount = typeof BASE_SKIPPED_COUNT !== 'undefined' ? BASE_SKIPPED_COUNT : 0;
    const espCount = espItems.length;
    const totalWithESP = baseCount + espCount;

    espItems.forEach(item => {
        item.style.display = isChecked ? 'block' : 'none';
    });

    if (countDisplay && countDesc) {
        if (isChecked) {
            countDisplay.innerText = `= ${totalWithESP}`;
            countDesc.innerHTML = `${totalWithESP} yet-to-watch filler episode count <u>includes</u> the ${espCount} E-SP recap summary episodes`;
        } else {
            countDisplay.innerText = `= ${baseCount}`;
            countDesc.innerHTML = `${baseCount} yet-to-watch filler episode count does <u>not</u> include the ${espCount} E-SP recap summary episodes`;
        }
    }
}


/**
 * ==========================================
 * 3. PDF HANDLING LOGIC
 * ==========================================
 */
function createPDFEmbed(pdfPath, pdfId, driveUrl) {
    const isPlaceholder = driveUrl.includes('/yo/preview');

    const supportsPDF = (function () {
        const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
        const isSmallScreen = window.innerWidth <= 768;
        const userAgent = navigator.userAgent.toLowerCase();
        const isMobileBrowser = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i.test(userAgent);

        let hasPDFSupport;
        try {
            hasPDFSupport = navigator.pdfViewerEnabled || (navigator.plugins && Array.from(navigator.plugins).some((plugin) => plugin.name.toLowerCase().includes("pdf")));
        } catch (e) {
            hasPDFSupport = false;
        }

        return !isTouchDevice && !isSmallScreen && !isMobileBrowser && hasPDFSupport;
    })();

    if (isPlaceholder) {
        return `
            <div class="pdf-placeholder" id="placeholder-${pdfId}" style="opacity: 0.5; cursor: not-allowed;">
                <div class="load-button" style="pointer-events: none;">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" style="opacity: 0.5;">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                    <span style="opacity: 0.5;">Not Available Yet</span>
                </div>
            </div>
        `;
    }

    if (supportsPDF) {
        return `
            <div style="position: relative; width: 100%; height: 100%;">
                <object data="${pdfPath}#view=Fit" type="application/pdf"
                        style="width: 160%; height: 100%; margin-left: -30%; border: none;">
                    <div class="pdf-placeholder" id="placeholder-${pdfId}">
                        <div class="load-button" onclick="loadPDF('placeholder-${pdfId}', '${driveUrl}')">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                            <span>Error</span>
                        </div>
                    </div>
                </object>
                <button onclick="window.open('${pdfPath}', '_blank')"
                        style="position: absolute; top: 50%; right: 8px; transform: translateY(-50%); background: rgba(0, 0, 0, 0.7); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; color: white; cursor: pointer; transition: all 0.3s ease; backdrop-filter: blur(5px); z-index: 10;"
                        onmouseover="this.style.background='rgba(255, 107, 107, 0.9)'; this.style.transform='translateY(-50%) scale(1.1)'"
                        onmouseout="this.style.background='rgba(0, 0, 0, 0.7)'; this.style.transform='translateY(-50%) scale(1)'"
                        title="Open in new tab">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                    </svg>
                </button>
            </div>
        `;
    } else {
        return `
            <div class="pdf-placeholder" id="placeholder-${pdfId}">
                <div class="load-button" onclick="loadPDF('placeholder-${pdfId}', '${driveUrl}')">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                    <span>Load PDF</span>
                </div>
            </div>
        `;
    }
}

function loadPDF(placeholderId, pdfUrl) {
    const versionedUrl = `${pdfUrl}${pdfUrl.includes("?") ? "&" : "?"}v=${APP_VERSION}`;
    const placeholder = document.getElementById(placeholderId);
    if (placeholder) {
        placeholder.innerHTML = `<iframe src="${versionedUrl}" allow="autoplay" style="width: 100%; height: 100%; border: none;"></iframe>`;
        placeholder.classList.remove("pdf-placeholder");
    }
}

function loadAllPDFs() {
    const unloadedPlaceholders = document.querySelectorAll('.pdf-placeholder .load-button[onclick*="loadPDF"]');
    if (unloadedPlaceholders.length === 0) return;

    const button = document.getElementById("loadAllBtn");
    if (!button) return;

    const container = document.querySelector(".load-all-container");
    button.disabled = true;
    button.classList.add("loading");
    button.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg> Loading...';

    // Extract all pending Drive URLs from the buttons dynamically
    Array.from(unloadedPlaceholders).forEach((btn, index) => {
        const onClickAttr = btn.getAttribute('onclick');
        // Extract parameters from onclick="loadPDF('placeholder-x', 'url')"
        const match = onClickAttr.match(/loadPDF\('([^']+)',\s*'([^']+)'\)/);
        if (match) {
            setTimeout(() => {
                loadPDF(match[1], match[2]);

                // Hide container when finished
                if (index === unloadedPlaceholders.length - 1) {
                    button.classList.remove("loading");
                    setTimeout(() => {
                        container.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
                        container.style.opacity = "0";
                        container.style.transform = "translateY(-20px)";
                        setTimeout(() => container.style.display = "none", 500);
                    }, 500);
                }
            }, index * 200);
        }
    });
}

function updateLoadAllButton() {
    const placeholders = document.querySelectorAll('.pdf-placeholder .load-button[onclick]');
    const drivePlaceholders = Array.from(placeholders).filter(el => {
        const onclick = el.getAttribute("onclick");
        return onclick && onclick.includes("drive.google.com") && el.offsetParent !== null;
    });

    const loadAllContainer = document.getElementById("mobileLoadAllContainer");
    if (loadAllContainer) {
        loadAllContainer.style.display = drivePlaceholders.length > 0 ? "block" : "none";
    }
}


/**
 * ==========================================
 * 4. UI INTERACTION HELPERS
 * ==========================================
 */

function toggleSpoiler(element) {
    element.classList.toggle("revealed");
}

function toggleCollapsible(sectionId) {
    const content = document.getElementById(sectionId + '-content');
    const toggle = document.getElementById(sectionId + '-toggle');

    if (!content || !toggle) return;

    if (content.classList.contains('expanded')) {
        content.classList.remove('expanded');
        toggle.innerHTML = '+';
        toggle.style.transform = 'rotate(0deg)';
    } else {
        content.classList.add('expanded');
        toggle.innerHTML = '−';
        toggle.style.transform = 'rotate(180deg)';
    }
}

function openLightbox(imageSrc) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    if (!lightbox || !lightboxImg) return;

    lightboxImg.src = imageSrc;
    const filename = imageSrc.split("/").pop();
    lightboxImg.alt = filename
        .replace(/\.(webp|jpg|jpeg|png|gif)$/i, "")
        .replace(/^\d+\s*-\s*/, "")
        .replace(/[-_]/g, " ")
        .trim();
    lightbox.style.display = "block";
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    if (lightbox) lightbox.style.display = "none";
}

document.addEventListener("click", function (e) {
    if (e.target.id === "lightbox" || e.target.id === "lightbox-img") {
        closeLightbox();
    }
});


/**
 * ==========================================
 * 5. SCROLL & GLOBAL EVENTS
 * ==========================================
 */

const scrollBtn = document.getElementById("scrollToggle");
const scrollIcon = document.getElementById("scrollIcon");

function updateScrollButton() {
    if (!scrollBtn || !scrollIcon) return;
    const scrolled = window.scrollY;
    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

    if (scrolled > 300) {
        if (nearBottom) {
            scrollIcon.innerHTML = '<path d="m18 15-6-6-6 6"/>';
            scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            scrollIcon.innerHTML = '<path d="m6 9 6 6 6-6"/>';
            scrollBtn.onclick = () => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        }
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
}

function updateTabContainer() {
    const tabContainer = document.querySelector(".tab-container");
    if (!tabContainer) return;

    const scrollY = window.scrollY;
    if (scrollY <= 100) {
        tabContainer.classList.remove("scrolled");
    } else if (scrollY >= 400) {
        tabContainer.classList.add("scrolled");
    }
}

// Debounced Scroll Events
let scrollTimeout;
window.addEventListener("scroll", function () {
    updateScrollButton();
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateTabContainer, 10);
});

// Typewriter Effect
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}


/**
 * ==========================================
 * 6. INITIALIZATION ON LOAD
 * ==========================================
 */
document.addEventListener("DOMContentLoaded", async function () {
    // 1. Run global UI triggers
    const header = document.querySelector('h1');
    if (header) {
        const originalText = header.textContent;
        typeWriter(header, originalText, 80);
    }
    updateScrollButton();

    // 2. Default tab
    await showTab('cover-stories');
});
