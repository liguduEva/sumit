/* ==========================================================================
   SWEET CRUMBS POPS BAKERY - INTERACTIVE SCRIPT ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* 1. FAQ ACCORDION INTERACTIVITY */
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isOpen = content.style.display === 'block';
            
            document.querySelectorAll('.accordion-content').forEach(item => item.style.display = 'none');
            document.querySelectorAll('.accordion-header span').forEach(icon => icon.textContent = '+');

            if (!isOpen) {
                content.style.display = 'block';
                header.querySelector('span').textContent = '-';
            }
        });
    });

    /* 2. LEAFLET.JS MAP INTEGRATION (Pretoria HQ Coordinates) */
    const mapElement = document.getElementById('leaflet-map');
    if (mapElement) {
        const map = L.map('leaflet-map').setView([-25.7479, 28.2293], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        const hqMarker = L.marker([-25.7479, 28.2293]).addTo(map);
        hqMarker.bindPopup("<b>Sweet Crumbs Pops Bakery</b><br>12 Arcadia Street, Pretoria.<br>Fresh Baking Daily!").openPopup();
    }

    /* 3. DYNAMIC PRODUCT MENU SEARCH FILTER */
    const searchInput = document.getElementById('service-search-input');
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            const term = e.target.value.toLowerCase();
            const serviceCards = document.querySelectorAll('.service-item');

            serviceCards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(term)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    /* 4. CLIENT-SIDE ENQUIRY FORM VALIDATION */
    const enquiryForm = document.getElementById('enquiry-form');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

            const name = document.getElementById('enquiry-name').value.trim();
            const email = document.getElementById('enquiry-email').value.trim();
            const phone = document.getElementById('enquiry-phone').value.trim();
            const service = document.getElementById('enquiry-service').value;
            const quantity = parseInt(document.getElementById('enquiry-quantity').value) || 1;

            if (name.length < 3) {
                document.getElementById('err-enquiry-name').textContent = 'Please enter your full name (minimum 3 characters).';
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                document.getElementById('err-enquiry-email').textContent = 'Please enter a valid email address.';
                isValid = false;
            }

            if (!service) {
                document.getElementById('err-enquiry-service').textContent = 'Please select a bakery product.';
                isValid = false;
            }

            if (isValid) {
                let unitPrice = 180;
                if (service === 'cupcakes') unitPrice = 150;
                if (service === 'rainbowcake') unitPrice = 450;
                if (service === 'bread') unitPrice = 45;

                const total = unitPrice * quantity;

                const outputBox = document.getElementById('enquiry-response-output');
                outputBox.style.display = 'block';
                outputBox.style.background = '#FFFDD0';
                outputBox.style.border = '1px solid #4A2E2B';
                outputBox.style.padding = '20px';
                outputBox.style.borderRadius = '6px';
                outputBox.innerHTML = `
                    <h3 style="color: #4A2E2B;">Order Enquiry Processed!</h3>
                    <p>Thank you, <strong>${name}</strong>. Your order request has been logged successfully.</p>
                    <p><strong>Estimated Order Total:</strong> R${total}.00 (${quantity} unit(s))</p>
                    <p>Our kitchen team will contact you at <strong>${phone}</strong> to confirm order pickup or delivery details.</p>
                `;
                enquiryForm.reset();
            }
        });
    }

    /* 5. CONTACT FORM MAILTO COMPILER */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const subject = document.getElementById('contact-subject').value.trim();
            const message = document.getElementById('contact-message').value.trim();

            if (name.length < 3) {
                document.getElementById('err-contact-name').textContent = 'Please enter your name.';
                isValid = false;
            }

            if (message.length < 10) {
                document.getElementById('err-contact-message').textContent = 'Message must be at least 10 characters long.';
                isValid = false;
            }

            if (isValid) {
                const mailtoRecipient = "info@sweetcrumbspops.co.za";
                const mailtoBody = encodeURIComponent(`Client Name: ${name}\nClient Email: ${email}\n\nMessage:\n${message}`);
                const mailtoUrl = `mailto:${mailtoRecipient}?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;

                alert('Validation successful! Opening mail client to send compiled message.');
                window.location.href = mailtoUrl;
                contactForm.reset();
            }
        });
    }

});
/* ==========================================================================
   SWEET CRUMBS POPS BAKERY - INTERACTIVE SCRIPT & VALIDATION ENGINE
   IIE Web Development - Part 3 Enhancement Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       1. FAQ ACCORDION INTERACTIVITY & TABS (Rubric 2.1)
       ---------------------------------------------------------------------- */
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isOpen = content.style.display === 'block';

            // Close all active accordion panels
            document.querySelectorAll('.accordion-content').forEach(item => item.style.display = 'none');
            document.querySelectorAll('.accordion-header span').forEach(icon => icon.textContent = '+');

            if (!isOpen) {
                content.style.display = 'block';
                const icon = header.querySelector('span');
                if (icon) icon.textContent = '-';
            }
        });
    });

    // Tab Navigation System (e.g., Bakery Menu Categories or Story Tabs)
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            button.classList.add('active');
            const activePanel = document.getElementById(targetTab);
            if (activePanel) activePanel.classList.add('active');
        });
    });

    /* ----------------------------------------------------------------------
       2. LEAFLET.JS INTERACTIVE MAP (Pretoria HQ) (Rubric 2.1)
       ---------------------------------------------------------------------- */
    const mapElement = document.getElementById('leaflet-map');
    if (mapElement && typeof L !== 'undefined') {
        // Pretoria HQ Coordinates [-25.7479, 28.2293]
        const map = L.map('leaflet-map').setView([-25.7479, 28.2293], 14);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Custom Bakery Map Marker
        const hqMarker = L.marker([-25.7479, 28.2293]).addTo(map);
        hqMarker.bindPopup(`
            <div style="text-align: center;">
                <h4 style="margin: 0; color: #4A2E2B;">Sweet Crumbs Pops Bakery</h4>
                <p style="margin: 5px 0 0; font-size: 0.9rem;">12 Arcadia Street, Pretoria<br><strong>Hours:</strong> Mon - Sat: 07:00 - 18:00</p>
            </div>
        `).openPopup();
    }

    /* ----------------------------------------------------------------------
       3. INTERACTIVE GALLERY WITH LIGHTBOX (Rubric 2.1)
       ---------------------------------------------------------------------- */
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightboxModal && galleryItems.length > 0) {
        galleryItems.forEach(img => {
            img.addEventListener('click', () => {
                lightboxModal.style.display = 'block';
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                if (lightboxCaption) {
                    lightboxCaption.textContent = img.alt || 'Sweet Crumbs Pops Fresh Baked Goods';
                }
            });
        });

        if (lightboxClose) {
            lightboxClose.addEventListener('click', () => {
                lightboxModal.style.display = 'none';
            });
        }

        // Close Lightbox when clicking outside image
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.style.display = 'none';
            }
        });
    }

    /* ----------------------------------------------------------------------
       4. DYNAMIC MENU SEARCH & CATEGORY FILTERING (Rubric 2.2)
       ---------------------------------------------------------------------- */
    const searchInput = document.getElementById('service-search-input');
    const categoryFilter = document.getElementById('category-filter-select');

    function filterMenuProducts() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const selectedCategory = categoryFilter ? categoryFilter.value.toLowerCase() : 'all';
        const serviceCards = document.querySelectorAll('.service-item');

        serviceCards.forEach(card => {
            const cardText = card.textContent.toLowerCase();
            const cardCategory = (card.getAttribute('data-category') || '').toLowerCase();

            const matchesSearch = cardText.includes(searchTerm);
            const matchesCategory = (selectedCategory === 'all' || cardCategory === selectedCategory);

            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.4s ease-in-out';
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (searchInput) searchInput.addEventListener('keyup', filterMenuProducts);
    if (categoryFilter) categoryFilter.addEventListener('change', filterMenuProducts);

    /* ----------------------------------------------------------------------
       5. CLIENT-SIDE ENQUIRY FORM VALIDATION & CALCULATION (Rubric 4.1)
          (enquiry.html)
       ---------------------------------------------------------------------- */
    const enquiryForm = document.getElementById('enquiry-form');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let isValid = true;

            // Reset prior validation errors
            document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

            // Field references
            const nameEl = document.getElementById('enquiry-name');
            const emailEl = document.getElementById('enquiry-email');
            const phoneEl = document.getElementById('enquiry-phone');
            const dateEl = document.getElementById('enquiry-date');
            const serviceEl = document.getElementById('enquiry-service');
            const quantityEl = document.getElementById('enquiry-quantity');

            // Name Validation
            if (!nameEl || nameEl.value.trim().length < 3) {
                setError('err-enquiry-name', 'Please enter your full name (minimum 3 characters).');
                isValid = false;
            }

            // Email Validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailEl || !emailRegex.test(emailEl.value.trim())) {
                setError('err-enquiry-email', 'Please enter a valid email address (e.g. name@domain.co.za).');
                isValid = false;
            }

            // Phone Number Validation (South African format check)
            const phoneRegex = /^(\+27|0)[6-8][0-9]{8}$/;
            if (phoneEl && phoneEl.value.trim() !== '' && !phoneRegex.test(phoneEl.value.trim().replace(/\s+/g, ''))) {
                setError('err-enquiry-phone', 'Please enter a valid 10-digit SA phone number (e.g. 0821234567).');
                isValid = false;
            }

            // Pickup Date Validation (Must be today or in the future)
            if (dateEl && dateEl.value) {
                const selectedDate = new Date(dateEl.value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                if (selectedDate < today) {
                    setError('err-enquiry-date', 'Please choose a future date for order pickup.');
                    isValid = false;
                }
            }

            // Product/Service Selection Validation
            if (!serviceEl || serviceEl.value === '') {
                setError('err-enquiry-service', 'Please select a bakery product or service option.');
                isValid = false;
            }

            // Quantity Validation
            const quantity = parseInt(quantityEl ? quantityEl.value : '1') || 1;
            if (quantity < 1) {
                setError('err-enquiry-quantity', 'Quantity must be at least 1 unit.');
                isValid = false;
            }

            // If Valid: Process Price Engine Response
            if (isValid) {
                const selectedService = serviceEl.value;
                let unitPrice = 180; // Default price

                // Dynamic pricing breakdown
                switch (selectedService) {
                    case 'cupcakes': unitPrice = 150; break;      // Box of 6
                    case 'rainbowcake': unitPrice = 450; break;   // Custom Cake
                    case 'bread': unitPrice = 45; break;          // Artisanal Loaf
                    case 'cakepops': unitPrice = 120; break;       // Dozen Pops
                    case 'volunteer': unitPrice = 0; break;       // Volunteer Inquiry
                    case 'sponsor': unitPrice = 0; break;         // Sponsorship
                    default: unitPrice = 180;
                }

                const totalPrice = unitPrice * quantity;
                const outputBox = document.getElementById('enquiry-response-output');

                if (outputBox) {
                    outputBox.style.display = 'block';
                    outputBox.style.background = '#FFFDD0';
                    outputBox.style.border = '2px solid #4A2E2B';
                    outputBox.style.padding = '20px';
                    outputBox.style.borderRadius = '8px';
                    outputBox.style.marginTop = '20px';

                    if (selectedService === 'volunteer' || selectedService === 'sponsor') {
                        outputBox.innerHTML = `
                            <h3 style="color: #4A2E2B; margin-top: 0;">Partnership Enquiry Received!</h3>
                            <p>Thank you, <strong>${nameEl.value.trim()}</strong>. We are thrilled about your interest in becoming a ${selectedService} with Sweet Crumbs Pops!</p>
                            <p>Our community outreach coordinator will review your request and get back to you at <strong>${emailEl.value.trim()}</strong> within 24–48 hours.</p>
                        `;
                    } else {
                        outputBox.innerHTML = `
                            <h3 style="color: #4A2E2B; margin-top: 0;">Order Enquiry Processed Successfully!</h3>
                            <p>Thank you, <strong>${nameEl.value.trim()}</strong>. Your order quotation has been generated.</p>
                            <ul>
                                <li><strong>Selected Item:</strong> ${serviceEl.options[serviceEl.selectedIndex].text}</li>
                                <li><strong>Quantity:</strong> ${quantity} unit(s)</li>
                                <li><strong>Estimated Cost Total:</strong> R${totalPrice.toFixed(2)}</li>
                            </ul>
                            <p>Our bakery team in Pretoria will contact you at <strong>${phoneEl ? phoneEl.value.trim() : emailEl.value.trim()}</strong> to finalize delivery/pickup details.</p>
                        `;
                    }
                }
                enquiryForm.reset();
            }
        });
    }

    /* ----------------------------------------------------------------------
       6. CONTACT FORM MAILTO COMPILER & AJAX SIMULATION (Rubric 4.1)
          (contact.html)
       ---------------------------------------------------------------------- */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let isValid = true;

            // Clear previous error messages
            document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

            const nameEl = document.getElementById('contact-name');
            const emailEl = document.getElementById('contact-email');
            const subjectEl = document.getElementById('contact-subject');
            const messageEl = document.getElementById('contact-message');

            // Name Check
            if (!nameEl || nameEl.value.trim().length < 3) {
                setError('err-contact-name', 'Please enter your name (minimum 3 characters).');
                isValid = false;
            }

            // Email Check
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailEl || !emailRegex.test(emailEl.value.trim())) {
                setError('err-contact-email', 'Please enter a valid email address.');
                isValid = false;
            }

            // Message Length Check
            if (!messageEl || messageEl.value.trim().length < 10) {
                setError('err-contact-message', 'Your message must be at least 10 characters long.');
                isValid = false;
            }

            if (isValid) {
                const recipient = "info@sweetcrumbspops.co.za";
                const subject = subjectEl ? subjectEl.value.trim() : "General Website Enquiry";
                const bodyText = `Client Name: ${nameEl.value.trim()}\nClient Email: ${emailEl.value.trim()}\n\nMessage:\n${messageEl.value.trim()}`;

                const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

                // Show user feedback alert & open email client
                const contactStatus = document.getElementById('contact-status-msg');
                if (contactStatus) {
                    contactStatus.style.display = 'block';
                    contactStatus.style.color = '#2E7D32';
                    contactStatus.textContent = 'Validation successful! Redirecting to your email provider...';
                }

                setTimeout(() => {
                    window.location.href = mailtoUrl;
                    contactForm.reset();
                }, 1000);
            }
        });
    }

    // Helper Utility Function to display form errors
    function setError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.color = '#D32F2F';
            errorElement.style.fontSize = '0.85rem';
            errorElement.style.marginTop = '4px';
        }
    }

});