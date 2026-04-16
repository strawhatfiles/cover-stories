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
 * Handles tab switching via Fetch API
 * Clears DOM early to abort pending media requests before fetching new content
 */
async function showTab(tabName) {
    const display = document.getElementById('tab-display');
    const url = tabContents[tabName];

    if (!url) return;

    // 1. Update active button state visually
    updateActiveTabUI(tabName);
    // Clear DOM immediately to force the browser to abort pending PDF network requests
    display.innerHTML = '<div style="text-align: center; padding: 3rem; color: #4ecdc4; font-style: italic;">Loading...</div>';

    // 2. Reset scroll position and header styling
    window.scrollTo({ top: 0, behavior: "instant" });
    const tabContainer = document.querySelector(".tab-container");
    if (tabContainer) tabContainer.classList.remove("scrolled");

    try {
        // 3. Fetch new HTML with cache-busting parameter
        const fetchUrl = `${url}?v=${APP_VERSION}`;
        const response = await fetch(fetchUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`);

        // 4. Inject fetched HTML
        display.innerHTML = await response.text();

        // 5. Restart entry animations
        display.style.animation = "none";
        display.offsetHeight; // Trigger reflow
        display.style.animation = "fadeIn 0.5s ease-out";

        // 6. Execute tab-specific initialization logic
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
    // Set up the Intersection Observer
    const galleryObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const container = entry.target;
                const galleryId = container.id;

                // Find matching Gallery data from our new array
                const galleryData = coverStoryGalleries.find(g => g.id === galleryId);
                if (galleryData) {
                    container.innerHTML = createGalleryEmbed(galleryData);
                }

                // Stop watching this container once it loads
                observer.unobserve(container);
            }
        });
    }, {
        rootMargin: "300px 0px" // Starts loading when within 300px of the viewport
    });

    // Observe all containers
    coverStoryGalleries.forEach((gallery) => {
        const container = document.getElementById(gallery.id);
        if (container) {
            galleryObserver.observe(container);
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
    injectCollapsibleCloseButtons();
}

// --- FILLER TAB ---
function initializeFiller() {
    // Only run if the ESP toggle elements exist in the loaded HTML
    const espToggle = document.getElementById('espToggle');
    if (espToggle) {
        espToggle.addEventListener('change', toggleESP);
        toggleESP(); // Run once to set initial state
    }

    injectCollapsibleCloseButtons();
}

function toggleESP() {
    const espToggle = document.getElementById('espToggle');
    const isChecked = espToggle ? espToggle.checked : false;
    const espItems = document.querySelectorAll('.esp-filler');
    const countDisplay = document.getElementById('total-skipped-count');
    const countDesc = document.getElementById('total-skipped-desc');

    // Read the base count directly from the toggle's data attribute
    const baseCount = espToggle && espToggle.dataset.baseCount ? parseInt(espToggle.dataset.baseCount) : 0;
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

function createGalleryEmbed(galleryData) {
    return `
        <div style="position: relative; width: 100%; height: 100%; cursor: pointer; overflow: hidden; border-radius: 10px;" 
             onclick="openCoverStoryGallery('${galleryData.id}')"
             onmouseover="this.querySelector('.gallery-indicator').style.transform='scale(1.15)'; this.querySelector('.gallery-indicator').style.background='rgba(78, 205, 196, 0.9)'; this.querySelector('.gallery-indicator').style.color='white';"
             onmouseout="this.querySelector('.gallery-indicator').style.transform='scale(1)'; this.querySelector('.gallery-indicator').style.background='rgba(0, 0, 0, 0.7)'; this.querySelector('.gallery-indicator').style.color='#4ecdc4';">
             
            <img src="${galleryData.folder}${galleryData.thumbnail}" 
                 style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;" 
                 alt="${galleryData.title.replace(/"/g, '&quot;').replace(/'/g, '&#39;')} Preview" />
                 
            <div class="gallery-indicator" style="position: absolute; bottom: 8px; right: 8px; width: 28px; height: 28px; background: rgba(0, 0, 0, 0.7); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #4ecdc4; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); backdrop-filter: blur(5px); border: 1px solid rgba(78, 205, 196, 0.5); box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                </svg>
            </div>
            
        </div>
    `;
}

/**
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

    // Dynamically extract pending Drive URLs
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
*/


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

function injectCollapsibleCloseButtons() {
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
            closeBtn.className = 'btn btn-secondary collapse-bottom-btn';
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

function openLightbox(imageSrc) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const galleryUI = document.getElementById("gallery-ui");
    if (!lightbox || !lightboxImg) return;

    // HIDE gallery elements & disable clicking the image to go forward
    if(galleryUI) galleryUI.style.display = "none";
    lightboxImg.onclick = function(e) { e.stopPropagation(); };
    lightboxImg.style.cursor = "default";

    lightboxImg.src = imageSrc;
    const filename = imageSrc.split("/").pop();
    lightboxImg.alt = filename
        .replace(/\.(webp|jpg|jpeg|png|gif)$/i, "")
        .replace(/^\d+\s*-\s*/, "")
        .replace(/[-_]/g, " ")
        .trim();
    lightbox.style.display = "block";
}

let currentGalleryImages = [];
let currentGalleryIndex = 0;
let currentActiveGallery = null;
let isColoredMode = true;

function openCoverStoryGallery(galleryId) {
    currentActiveGallery = coverStoryGalleries.find(g => g.id === galleryId);
    if (!currentActiveGallery) return;
    currentGalleryIndex = 0;

    // SHOW gallery elements & re-enable clicking the image to advance
    const galleryUI = document.getElementById("gallery-ui");
    if(galleryUI) galleryUI.style.display = "block";

    const lightboxImg = document.getElementById("lightbox-img");
    if (lightboxImg) {
        lightboxImg.onclick = function(e) { navigateGallery(1); e.stopPropagation(); };
        lightboxImg.style.cursor = "e-resize";
    }

    // Sync the toggle switch with our global state before showing
    const toggleCheckbox = document.getElementById("color-toggle-checkbox");
    if (toggleCheckbox) toggleCheckbox.checked = isColoredMode;

    generateGalleryImages();
    updateLightboxImage();
    updateColorToggleUI();

    document.getElementById("lightbox").style.display = "block";
    document.addEventListener("keydown", handleGalleryKeyboard);
}

function generateGalleryImages() {
    if (!currentActiveGallery) return;

    let baseFolder = currentActiveGallery.folder;
    let fileExtension = "png"; // Colored stories are always PNG

    // If they switched to manga mode, strip out "Colored-" and swap to JPG!
    if (!isColoredMode) {
        baseFolder = baseFolder.replace("Colored-Cover-Stories", "Cover-Stories");
        fileExtension = "jpg"; // Original manga stories are always JPG
    }

    currentGalleryImages = Array.from(
        { length: currentActiveGallery.pageCount },
        (_, i) => `${baseFolder}${String(i + 1).padStart(2, '0')}.${fileExtension}`
    );
}

function toggleColorMode(e) {
    if (e) e.stopPropagation();
    // Grab the true/false state directly from the new switch toggle
    const toggleCheckbox = document.getElementById("color-toggle-checkbox");
    if (toggleCheckbox) {
        isColoredMode = toggleCheckbox.checked;
    }
    generateGalleryImages();
    updateLightboxImage();
    updateColorToggleUI();
}

function updateColorToggleUI() {
    const label = document.querySelector(".color-toggle-label");
    const wrapper = document.querySelector(".color-toggle-wrapper");

    if (label && wrapper) {
        if (isColoredMode) {
            label.innerText = "COLORED";
            label.style.color = "#4ecdc4";
            wrapper.style.borderColor = "rgba(78, 205, 196, 0.3)";
        } else {
            label.innerText = "ORIGINAL";
            label.style.color = "#d0d0d0";
            wrapper.style.borderColor = "rgba(208, 208, 208, 0.3)";
        }
    }
}

function updateLightboxImage() {
    const lightboxImg = document.getElementById("lightbox-img");
    const counter = document.getElementById("lightbox-counter");
    if (lightboxImg && currentGalleryImages.length > 0) {
        lightboxImg.src = currentGalleryImages[currentGalleryIndex];
        if (counter) {
            counter.innerText = `${currentGalleryIndex + 1} / ${currentGalleryImages.length}`;
        }
    }
}

function navigateGallery(direction) {
    currentGalleryIndex += direction;
    // Loop around if out of bounds
    if (currentGalleryIndex < 0) {
        currentGalleryIndex = currentGalleryImages.length - 1;
    } else if (currentGalleryIndex >= currentGalleryImages.length) {
        currentGalleryIndex = 0;
    }
    updateLightboxImage();
}

function handleGalleryKeyboard(e) {
    if (e.key === "ArrowRight") navigateGallery(1);
    if (e.key === "ArrowLeft") navigateGallery(-1);
    if (e.key === "Escape") closeLightbox();
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    if (lightbox) lightbox.style.display = "none";
    // Clean up gallery keyboard listeners so they don't fire in the background
    document.removeEventListener("keydown", handleGalleryKeyboard);
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
        scrollBtn.style.display = "block";
        // Only change the icon graphic here
        if (nearBottom) {
            scrollIcon.innerHTML = '<path d="m18 15-6-6-6 6"/>';
        } else {
            scrollIcon.innerHTML = '<path d="m6 9 6 6 6-6"/>';
        }
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

// Optimized Scroll Events
let isTicking = false;
window.addEventListener("scroll", function () {
    if (!isTicking) {
        window.requestAnimationFrame(function () {
            updateScrollButton();
            updateTabContainer();
            isTicking = false;
        });
        isTicking = true;
    }
});

// Typewriter Effect
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
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
    // Calculate the direction ONLY when the button is actually clicked
    if (scrollBtn) {
        scrollBtn.addEventListener("click", () => {
            const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
            if (nearBottom) {
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
            }
        });
    }
    // 2. Default tab
    await showTab('cover-stories');
});
