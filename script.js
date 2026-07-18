// Script for Ultra Arts & Science College Portfolio website

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when a link is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 2. Admission Modal (Apply Now)
    const applyModal = document.getElementById('applyModal');
    const openModalBtns = document.querySelectorAll('.open-modal-btn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const admissionForm = document.getElementById('admissionForm');
    
    if (applyModal) {
        // Open Modal
        openModalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                applyModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Disable scroll behind modal
            });
        });
        
        // Close Modal via close button
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                applyModal.classList.remove('active');
                document.body.style.overflow = ''; // Restore scroll
            });
        }
        
        // Close Modal by clicking outside
        applyModal.addEventListener('click', (e) => {
            if (e.target === applyModal) {
                applyModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Form Submission
        if (admissionForm) {
            admissionForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('studentName').value;
                const course = document.getElementById('studentCourse').value;
                
                alert(`Thank you, ${name}! Your application request for ${course} has been submitted successfully. Our admission cell will contact you shortly.`);
                
                admissionForm.reset();
                applyModal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    }

    // 3. Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.card, section h2, .about-image-wrapper, .about-content > *, .students-main-img-wrapper, .testimonial-card, .book-page, .course-showcase-panel');
    
    if ('IntersectionObserver' in window && revealElements.length > 0) {
        // Initial setup style for elements to animate
        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target); // Stop observing after animation triggers
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters center
        });
        
        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }

    // 4. Interactive Courses Book Section
    const courseData = {
        'computer-it': {
            title: 'Computer & IT Courses',
            icon: '💻',
            description: 'Prepare for the digital frontier with industry-focused technology programs, hands-on programming labs, and cutting-edge software training.',
            courses: [
                { name: 'B.Sc Computer Science', desc: 'Study software engineering, algorithms, networking, data structures, and computer architectures.' },
                { name: 'B.Sc Information Technology (IT)', desc: 'Focuses on database management, system administration, web technologies, and security.' },
                { name: 'B.Sc Animation & Game Designing', desc: 'Unleash creativity through 3D modeling, rendering, game engine development, and digital art.' },
                { name: 'B.Sc Artificial Intelligence', desc: 'Delve into machine learning, neural networks, computer vision, and cognitive computing systems.' },
                { name: 'B.Sc Cloud Computing & Cyber Security', desc: 'Learn network protection, ethical hacking, virtualization, and secure cloud infrastructures.' },
                { name: 'B.Sc Data Science & Analytics', desc: 'Analyze complex data patterns, statistical methods, business intelligence, and predictive modeling.' },
                { name: 'BCA (Bachelor of Computer Applications)', desc: 'Learn core programming languages, web application development, databases, and practical coding frameworks.' }
            ]
        },
        'commerce': {
            title: 'Commerce Courses',
            icon: '📊',
            description: 'Build a strong foundation in trade, finance, financial systems, and commerce-related regulations.',
            courses: [
                { name: 'B.Com Computer Applications', desc: 'Integrates commerce education with modern business programming and database skills.' },
                { name: 'B.Com Professional Accounting', desc: 'Tailored for students aspiring to Chartered Accountancy (CA) or certified financial analysis.' },
                { name: 'B.Com E-Commerce', desc: 'Covers online retail operations, digital payment systems, logistics, and digital marketing.' },
                { name: 'B.Com Blockchain & FinTech', desc: 'Explore modern financial technologies, smart contracts, decentralized ledgers, and transactions.' }
            ]
        },
        'professional': {
            title: 'Professional Courses',
            icon: '⚙️',
            description: 'Bridge creative art, technical skills, and operational excellence for unique industrial career opportunities.',
            courses: [
                { name: 'B.Sc. Visual Communication', desc: 'Learn creative design, media production, drawing, video editing, photography, and mass communication.' },
                { name: 'B.Sc. Forensic Science', desc: 'Focuses on crime scene investigation, evidence analysis, toxicology, and legal procedures.' },
                { name: 'B.Sc. Fire & Safety Management', desc: 'Industrial safety regulations, fire hazards management, risk assessment, and rescue operations.' },
                { name: 'B.Sc. Hotel Management & Catering Science', desc: 'Hospitality training, culinary arts, front desk operations, and tourism services.' },
                { name: 'B.Sc. Costume Designing & Fashion Technology', desc: 'Apparel design, garment engineering, textile science, fashion illustration, and boutique management.' }
            ]
        },
        'arts': {
            title: 'Arts & Literature Courses',
            icon: '🎨',
            description: 'Gain deep insights into human literature, history, economics, and social sciences while developing communication.',
            courses: [
                { name: 'B.A. Tamil', desc: 'Advanced studies in regional literature, grammar, history of language, and literary criticism.' },
                { name: 'B.A. English', desc: 'Covers global english literature, language study, professional writing, and communication theory.' },
                { name: 'B.A. Economics', desc: 'Micro and macro economics, financial theories, statistical application, and developmental policies.' },
                { name: 'B.A. Political Science', desc: 'Explore state structures, global governance models, public administration, and political theory.' },
                { name: 'B.A. History', desc: 'Chronological analysis of world cultures, archival studies, ancient civilizations, and historiography.' }
            ]
        },
        'postgraduate': {
            title: 'Postgraduate Courses',
            icon: '🎓',
            description: 'Advance your career with specialized postgraduate study in management, science, or humanities.',
            courses: [
                { name: 'MBA (Master of Business Administration)', desc: 'Specialize in HR, Finance, Marketing, Business Analytics, or Logistics & Supply Chain Management.' },
                { name: 'M.Com. (Master of Commerce)', desc: 'Advanced finance, accounting practices, banking laws, global taxation, and investment management.' },
                { name: 'M.Sc. Programs', desc: 'Advanced research and logical frameworks in select science and software disciplines.' },
                { name: 'M.A. Programs', desc: 'In-depth research and analytical studies in selected arts and humanities disciplines.' }
            ]
        }
    };

    const bookPages = document.querySelectorAll('.book-page');
    const showcaseGrid = document.getElementById('showcaseGrid');
    const showcaseHeaderIcon = document.getElementById('showcaseHeaderIcon');
    const showcaseCategoryTitle = document.getElementById('showcaseCategoryTitle');
    const showcaseCategoryDesc = document.getElementById('showcaseCategoryDesc');
    const courseShowcasePanel = document.getElementById('courseShowcasePanel');

    if (bookPages.length > 0 && showcaseGrid && showcaseCategoryTitle) {
        bookPages.forEach(page => {
            page.addEventListener('click', () => {
                const category = page.getAttribute('data-category');
                const data = courseData[category];
                
                if (!data) return;

                // 1. Remove active class from all pages
                bookPages.forEach(p => p.classList.remove('active'));
                
                // 2. Add active class to clicked page
                page.classList.add('active');

                // 3. Trigger fade-out animation
                showcaseGrid.style.opacity = '0';
                if (courseShowcasePanel) {
                    courseShowcasePanel.style.transform = 'translateY(10px)';
                    courseShowcasePanel.style.opacity = '0.7';
                }

                setTimeout(() => {
                    // 4. Update texts and icon
                    if (showcaseHeaderIcon) showcaseHeaderIcon.textContent = data.icon;
                    showcaseCategoryTitle.textContent = data.title;
                    if (showcaseCategoryDesc) showcaseCategoryDesc.textContent = data.description;

                    // 5. Build and insert new course cards
                    let cardsHtml = '';
                    data.courses.forEach(course => {
                        cardsHtml += `
                            <div class="showcase-card animate-fade-in">
                                <h4>${course.name}</h4>
                                <p>${course.desc}</p>
                            </div>
                        `;
                    });
                    showcaseGrid.innerHTML = cardsHtml;

                    // 6. Fade in new data
                    showcaseGrid.style.opacity = '1';
                    if (courseShowcasePanel) {
                        courseShowcasePanel.style.transform = 'translateY(0)';
                        courseShowcasePanel.style.opacity = '1';
                    }
                }, 300);
            });
        });
    }
});
