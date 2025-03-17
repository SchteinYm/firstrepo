document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('toggle');
        });
    }


    document.querySelectorAll('a[href="#home"], a[href=""], a.home-link, .logo a').forEach(homeLink => {
        homeLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close any open modals
            closeAllModals();
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Removed the problematic redirect code
        });
    });

    
    document.querySelectorAll('a[href^="#"]:not([href="#home"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetSelector = this.getAttribute('href');
            const targetElement = document.querySelector(targetSelector);
            
            if (targetElement) {
                e.preventDefault();
                
                // Close any open modals
                closeAllModals();
                
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });


    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.property-images')) return;

            const modals = [
                'landTransactionsModal',
                'insuranceModal'
            ];
            
            if (index < modals.length) {
                const modal = document.getElementById(modals[index]);
                const overlay = document.getElementById('modalOverlay');
                
                if (modal && overlay) {
                    modal.style.display = 'block';
                    overlay.style.display = 'block';
                }
            }
        });
    });

    
    function closeAllModals() {
        // Close service modals
        document.querySelectorAll('.service-modal').forEach(modal => {
            modal.style.display = 'none';
        });
        
        // Close gallery modal
        const galleryModal = document.getElementById('gallery-modal');
        if (galleryModal) galleryModal.style.display = 'none';
        
        // Hide overlay
        const overlay = document.getElementById('modalOverlay');
        if (overlay) overlay.style.display = 'none';
        
        // Re-enable scrolling
        document.body.style.overflow = '';
    }


    document.addEventListener('click', function(e) {
        const modals = document.querySelectorAll('.service-modal');
        const overlay = document.getElementById('modalOverlay');

        modals.forEach(modal => {
            if (modal.style.display === 'block' && !modal.contains(e.target)) {
                modal.style.display = 'none';
                if (overlay) overlay.style.display = 'none';
            }
        });
    });

    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });


    document.querySelectorAll('.service-modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeAllModals);
    }

    // Property Gallery Functionality
    const galleryImages = [
        "images/property-management-1.jpg",
        "images/property-management-2.jpg",
        "images/property-management-3.jpg",
        "images/property-management-5.jpg",
        "images/property-management-6.jpg",
        "images/property-management-7.jpg",
        "images/property-management-8.jpg",
        "images/property-management-9.jpg",
        "images/property-management-10.jpg",
        "images/property-management-11.jpg",
        "images/property-management-12.jpg",
        "images/property-management-13.jpg"
    ];

    const galleryModal = document.getElementById('gallery-modal');
    const currentImage = document.getElementById('gallery-current-image');
    const currentImageCounter = document.getElementById('current-image');
    const totalImagesCounter = document.getElementById('total-images');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const closeGallery = document.querySelector('.close-gallery');
    
    const viewGalleryLink = document.getElementById('openGallery') || document.querySelector('.view-gallery-link');

    let currentImageIndex = 0;

    
    if (totalImagesCounter) {
        totalImagesCounter.textContent = galleryImages.length;
    }

    
    function updateGalleryImage() {
        if (currentImage) {
            currentImage.src = galleryImages[currentImageIndex];
        }
        if (currentImageCounter) {
            currentImageCounter.textContent = currentImageIndex + 1;
        }
        
        // Preload next image for smoother transitions
        const nextIndex = (currentImageIndex + 1) % galleryImages.length;
        const preloadImage = new Image();
        preloadImage.src = galleryImages[nextIndex];
    }

    
    function openGallery(e) {
        if (e) e.preventDefault();
        currentImageIndex = 0;
        updateGalleryImage();
        
        if (galleryModal) {
            galleryModal.style.display = 'flex';
        }
        if (modalOverlay) {
            modalOverlay.style.display = 'block';
        }
        document.body.style.overflow = 'hidden'; 
    }

    
    if (viewGalleryLink) {
        viewGalleryLink.addEventListener('click', openGallery);
    }

    
    if (closeGallery) {
        closeGallery.addEventListener('click', closeAllModals);
    }

    
    const backToHomeBtn = document.querySelector('.back-to-home') || document.createElement('button');
    if (backToHomeBtn && !backToHomeBtn.hasAttribute('data-initialized')) {
        if (!document.querySelector('.back-to-home')) {
            backToHomeBtn.className = 'back-to-home';
            backToHomeBtn.innerHTML = 'Back to Home';
            backToHomeBtn.style.position = 'absolute';
            backToHomeBtn.style.top = '20px';
            backToHomeBtn.style.left = '20px';
            backToHomeBtn.style.zIndex = '1001';
            backToHomeBtn.style.padding = '8px 15px';
            backToHomeBtn.style.borderRadius = '4px';
            backToHomeBtn.style.border = 'none';
            backToHomeBtn.style.backgroundColor = '#333';
            backToHomeBtn.style.color = '#fff';
            backToHomeBtn.style.cursor = 'pointer';
            
            // Add to gallery modal if it exists
            if (galleryModal) {
                galleryModal.appendChild(backToHomeBtn);
            }
        }
        
        backToHomeBtn.addEventListener('click', function() {
            closeAllModals();
            
            // Scroll to top of page
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        backToHomeBtn.setAttribute('data-initialized', 'true');
    }

    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            updateGalleryImage();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            updateGalleryImage();
        });
    }


    document.addEventListener('keydown', function(e) {
        if (galleryModal && galleryModal.style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
                updateGalleryImage();
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
                updateGalleryImage();
            }
        }
    });

    
    let touchStartX = 0;
    let touchEndX = 0;

    const galleryImageContainer = document.querySelector('.gallery-image-container');

    if (galleryImageContainer) {
        galleryImageContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        galleryImageContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
    }

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left, go to next image
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            updateGalleryImage();
        } else if (touchEndX > touchStartX + 50) {
            // Swipe right, go to previous image
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            updateGalleryImage();
        }
    }

    
    document.querySelectorAll('[data-open-gallery]').forEach(element => {
        element.addEventListener('click', openGallery);
    });
});