const nextButton = document.querySelector('.next-btn');
const video = document.querySelector('.hero-video');
const movieList = ['videos/hero-1.mp4', 'videos/hero-2.mp4', 'videos/hero-3.mp4', 'videos/hero-4.mp4'];
let index = 0;

if (nextButton && video) {
  nextButton.addEventListener('click', function() {
    index += 1;
    if (index >= movieList.length) {
      index = 0;
    }
    video.src = movieList[index];
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const contactBtn = document.querySelector(".cnt-btn");
  if (contactBtn) {
    contactBtn.addEventListener("click", () => {
      window.location.href = "https://www.linkedin.com/in/sagar-sharma-751943336";
    });
  }

  // Gaming Style Watch Trailer Modal Logic
  const watchTrailerBtn = document.getElementById("watchTrailerBtn") || document.querySelector(".watch-trailer-btn") || document.querySelector(".hero-info button");
  const trailerModal = document.getElementById("trailerModal");
  const trailerOverlay = document.getElementById("trailerOverlay");
  const closeTrailerBtn = document.getElementById("closeTrailerBtn");
  const trailerVideo = document.getElementById("trailerVideo");
  const heroVideo = document.querySelector(".hero-video");

  function openTrailer() {
    if (!trailerModal || !trailerVideo) return;

    // Pause hero background video while trailer is active
    if (heroVideo && !heroVideo.paused) {
      heroVideo.pause();
    }

    // Activate trailer modal
    trailerModal.classList.add("active");
    trailerModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // Reset and play trailer video with sound
    trailerVideo.currentTime = 0;
    const playPromise = trailerVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn("Trailer playback caught notice:", err);
      });
    }
  }

  function closeTrailer() {
    if (!trailerModal || !trailerVideo) return;

    trailerModal.classList.remove("active");
    trailerModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    // Pause trailer
    trailerVideo.pause();

    // Resume hero background video
    if (heroVideo) {
      heroVideo.play().catch(() => {});
    }
  }

  if (watchTrailerBtn) {
    watchTrailerBtn.addEventListener("click", openTrailer);
  }

  if (closeTrailerBtn) {
    closeTrailerBtn.addEventListener("click", closeTrailer);
  }

  if (trailerOverlay) {
    trailerOverlay.addEventListener("click", closeTrailer);
  }

  // Keyboard accessibility: ESC key closes trailer
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && trailerModal && trailerModal.classList.contains("active")) {
      closeTrailer();
    }
  });

  // Mobile menu toggle
  const menuBtn = document.getElementById("menuBtn");
  const headRight = document.getElementById("headRight");
  if (menuBtn && headRight) {
    menuBtn.addEventListener("click", () => {
      headRight.classList.toggle("active");
    });

    const links = headRight.querySelectorAll("a");
    links.forEach(link => {
      link.addEventListener("click", () => {
        headRight.classList.remove("active");
      });
    });
  }

  // Scroll Animation Fallback (Ensures autoBlur, autoTakeFull, autoDisplay work in all browsers)
  const supportsScrollTimeline = window.CSS && CSS.supports && CSS.supports('animation-timeline', 'view()');
  
  if (!supportsScrollTimeline) {
    let ticking = false;

    function updateScrollAnimations() {
      const windowHeight = window.innerHeight;

      // 1. autoBlur animation
      document.querySelectorAll('.autoBlur').forEach(el => {
        const rect = el.getBoundingClientRect();
        // Progress from entering bottom (0) to exiting top (1)
        const totalDistance = windowHeight + rect.height;
        const currentDistance = windowHeight - rect.top;
        const progress = Math.min(Math.max(currentDistance / totalDistance, 0), 1);

        let blur = 0;
        let opacity = 1;
        let translateY = 0;

        if (progress < 0.4) {
          const p = progress / 0.4;
          blur = 40 * (1 - p);
          opacity = p;
        } else if (progress > 0.6) {
          const p = (progress - 0.6) / 0.4;
          blur = 40 * p;
          opacity = 1 - p;
          translateY = -200 * p;
        }

        el.style.filter = `blur(${blur}px)`;
        el.style.opacity = `${opacity}`;
        el.style.transform = `translateY(${translateY}px)`;
      });

      // 2. autoTakeFull animation
      document.querySelectorAll('.autoTakeFull').forEach(el => {
        const rect = el.getBoundingClientRect();
        const start = windowHeight * 0.7;
        const end = windowHeight * 0.35;
        if (rect.top <= start) {
          const progress = Math.min(Math.max((start - rect.top) / (start - end), 0), 1);
          const initialWidth = 360;
          const targetWidth = window.innerWidth;
          const currentWidth = initialWidth + (targetWidth - initialWidth) * progress;
          const currentHeight = 510 + (windowHeight - 510) * progress;
          const currentRadius = 50 * (1 - progress);
          el.style.width = `${currentWidth}px`;
          el.style.height = `${currentHeight}px`;
          el.style.borderRadius = `${currentRadius}px`;
        } else {
          el.style.width = `360px`;
          el.style.height = `510px`;
          el.style.borderRadius = `50px`;
        }
      });

      // 3. autoDisplay animation
      document.querySelectorAll('.autoDisplay').forEach(el => {
        const rect = el.getBoundingClientRect();
        const enterPoint = windowHeight * 0.95;
        const fullyVisible = windowHeight * 0.3;
        if (rect.top <= enterPoint) {
          const progress = Math.min(Math.max((enterPoint - rect.top) / (enterPoint - fullyVisible), 0), 1);
          const translateY = 200 * (1 - progress);
          const scale = 0.3 + 0.7 * progress;
          el.style.opacity = '1';
          el.style.transform = `translateY(${translateY}px) scale(${scale})`;
        } else {
          el.style.opacity = '0.3';
          el.style.transform = `translateY(200px) scale(0.3)`;
        }
      });

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollAnimations);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateScrollAnimations();
  }
});
