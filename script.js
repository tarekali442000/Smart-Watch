document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle functionality
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });
  }

  // Close mobile menu when a link is clicked
  const links = document.querySelectorAll(".nav-links a");
  links.forEach((link) => {
    link.addEventListener("click", function () {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
      }
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Calculate header height to offset scrolling
        const navbar = document.querySelector(".navbar");
        const navbarHeight = navbar ? navbar.offsetHeight : 0;

        window.scrollTo({
          top: targetElement.offsetTop - navbarHeight,
          behavior: "smooth",
        });
      }
    });
  });

  // Form submission handling
  const contactForm = document.querySelector(".contact-form form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form input values
      const name = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const message = this.querySelector("textarea").value;

      // Here you would typically send this data to a server
      console.log("Form submitted with the following data:");
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Message:", message);

      // Show success message (example)
      alert("Thank you for your message! We will get back to you soon.");

      // Reset the form
      this.reset();
    });
  }

  // Add a scroll event to change navbar style on scroll
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {
      navbar.style.background = "#ffffff";
      navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.background = "#ffffff";
      navbar.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
    }
  });

  // Image Gallery Lightbox Functionality
  const createLightbox = () => {
    // Create lightbox elements if they don't exist
    if (!document.querySelector(".lightbox-container")) {
      const lightboxContainer = document.createElement("div");
      lightboxContainer.className = "lightbox-container";
      lightboxContainer.innerHTML = `
        <div class="lightbox-overlay"></div>
        <div class="lightbox-content">
          <img src="" alt="Lightbox Image" class="lightbox-image">
          <div class="lightbox-caption"></div>
          <button class="lightbox-close">&times;</button>
          <button class="lightbox-prev"><i class="fas fa-chevron-left"></i></button>
          <button class="lightbox-next"><i class="fas fa-chevron-right"></i></button>
        </div>
      `;
      document.body.appendChild(lightboxContainer);

      // Add event listeners for lightbox controls
      const lightbox = {
        container: lightboxContainer,
        overlay: lightboxContainer.querySelector(".lightbox-overlay"),
        content: lightboxContainer.querySelector(".lightbox-content"),
        image: lightboxContainer.querySelector(".lightbox-image"),
        caption: lightboxContainer.querySelector(".lightbox-caption"),
        closeBtn: lightboxContainer.querySelector(".lightbox-close"),
        prevBtn: lightboxContainer.querySelector(".lightbox-prev"),
        nextBtn: lightboxContainer.querySelector(".lightbox-next"),
        images: [],
        currentIndex: 0,
      };

      // Close lightbox when clicking on overlay or close button
      lightbox.overlay.addEventListener("click", () => {
        lightboxContainer.classList.remove("active");
      });

      lightbox.closeBtn.addEventListener("click", () => {
        lightboxContainer.classList.remove("active");
      });

      // Navigation buttons
      lightbox.prevBtn.addEventListener("click", () => {
        if (lightbox.images.length > 1) {
          lightbox.currentIndex =
            (lightbox.currentIndex - 1 + lightbox.images.length) %
            lightbox.images.length;
          updateLightboxImage(lightbox);
        }
      });

      lightbox.nextBtn.addEventListener("click", () => {
        if (lightbox.images.length > 1) {
          lightbox.currentIndex =
            (lightbox.currentIndex + 1) % lightbox.images.length;
          updateLightboxImage(lightbox);
        }
      });

      // Keyboard navigation
      document.addEventListener("keydown", (e) => {
        if (!lightboxContainer.classList.contains("active")) return;

        if (e.key === "Escape") {
          lightboxContainer.classList.remove("active");
        } else if (e.key === "ArrowLeft") {
          lightbox.prevBtn.click();
        } else if (e.key === "ArrowRight") {
          lightbox.nextBtn.click();
        }
      });

      return lightbox;
    }

    return {
      container: document.querySelector(".lightbox-container"),
      overlay: document.querySelector(".lightbox-overlay"),
      content: document.querySelector(".lightbox-content"),
      image: document.querySelector(".lightbox-image"),
      caption: document.querySelector(".lightbox-caption"),
      closeBtn: document.querySelector(".lightbox-close"),
      prevBtn: document.querySelector(".lightbox-prev"),
      nextBtn: document.querySelector(".lightbox-next"),
      images: [],
      currentIndex: 0,
    };
  };

  // Function to update the lightbox image
  const updateLightboxImage = (lightbox) => {
    const current = lightbox.images[lightbox.currentIndex];
    lightbox.image.src = current.src;
    lightbox.caption.textContent = current.alt || "";
  };

  // Initialize gallery lightbox
  const galleryItems = document.querySelectorAll(".gallery-item img");
  if (galleryItems.length > 0) {
    const lightbox = createLightbox();

    // Add CSS for lightbox
    if (!document.getElementById("lightbox-styles")) {
      const style = document.createElement("style");
      style.id = "lightbox-styles";
      style.textContent = `
        .lightbox-container {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2000;
        }
        
        .lightbox-container.active {
          display: block;
        }
        
        .lightbox-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.9);
        }
        
        .lightbox-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          max-width: 90%;
          max-height: 80%;
        }
        
        .lightbox-image {
          display: block;
          max-width: 100%;
          max-height: 80vh;
          border: 3px solid white;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        }
        
        .lightbox-caption {
          color: white;
          text-align: center;
          padding: 10px 0;
          font-size: 1rem;
        }
        
        .lightbox-close, .lightbox-prev, .lightbox-next {
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          position: absolute;
          font-size: 1.5rem;
        }
        
        .lightbox-close {
          top: -40px;
          right: 0;
          font-size: 2rem;
        }
        
        .lightbox-prev {
          left: -50px;
          top: 50%;
          transform: translateY(-50%);
        }
        
        .lightbox-next {
          right: -50px;
          top: 50%;
          transform: translateY(-50%);
        }
        
        @media (max-width: 768px) {
          .lightbox-prev, .lightbox-next {
            top: auto;
            bottom: -50px;
            transform: none;
          }
          
          .lightbox-prev {
            left: 30%;
          }
          
          .lightbox-next {
            right: 30%;
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Populate the images array and add click event listeners
    lightbox.images = Array.from(galleryItems).map((img) => ({
      src: img.src,
      alt: img.alt,
    }));

    galleryItems.forEach((img, index) => {
      // Find the eye icon in parent gallery-item
      const galleryItem = img.closest(".gallery-item");
      const eyeIcon = galleryItem
        ? galleryItem.querySelector(".fa-eye").closest("a")
        : null;

      if (eyeIcon) {
        eyeIcon.addEventListener("click", (e) => {
          e.preventDefault();
          lightbox.currentIndex = index;
          updateLightboxImage(lightbox);
          lightbox.container.classList.add("active");
        });
      }
    });
  }

  // Lazy loading images
  if ("IntersectionObserver" in window) {
    const imgOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px 100px 0px",
    };

    const lazyImages = document.querySelectorAll("img[data-src]");

    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;

          img.addEventListener("load", () => {
            img.classList.add("loaded");
          });

          observer.unobserve(img);
        }
      });
    }, imgOptions);

    lazyImages.forEach((img) => {
      lazyLoadObserver.observe(img);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    document.querySelectorAll("img[data-src]").forEach((img) => {
      img.src = img.dataset.src;
    });
  }

  // Add image zoom effect on hover for hero section
  const heroImages = document.querySelectorAll(".hero-img");
  if (heroImages.length) {
    heroImages.forEach((img) => {
      img.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-10px) scale(1.05)";
      });

      img.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)";
      });
    });
  }
});
//scroll button
// JavaScript
window.addEventListener("scroll", function () {
  const scrollBtn = document.getElementById("scrollToTop");
  if (window.scrollY > 300) {
    // يظهر السهم بعد 300 بكسل من السكرول
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});

document.getElementById("scrollToTop").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // اسكرول سلس
  });
});
