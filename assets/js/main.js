/**
 * FrameLock — Modern Trending Landing Page Interactions
 * Features:
 * - Real-time phone simulator with draggable floating HUD badge
 * - Live SVG frametime waveform generator
 * - Scenario switching (60 FPS, 120 FPS, 30 FPS drops, Standby)
 * - Dynamic setup guide carousel/tab switcher
 * - Interactive FAQ accordion
 * - Direct download trigger toast notification
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Draggable Floating FPS Overlay Badge (Touch & Mouse Support)
     ========================================================================== */
  const badge = document.getElementById('draggableBadge');
  const screen = document.getElementById('phoneScreen');

  if (badge && screen) {
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    function getPointerPos(e) {
      if (e.touches && e.touches.length > 0) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
      return { x: e.clientX, y: e.clientY };
    }

    function onPointerDown(e) {
      isDragging = true;
      const pos = getPointerPos(e);
      startX = pos.x;
      startY = pos.y;
      
      const rect = badge.getBoundingClientRect();
      const parentRect = screen.getBoundingClientRect();
      
      initialLeft = rect.left - parentRect.left;
      initialTop = rect.top - parentRect.top;

      badge.style.transition = 'none';
      if (e.type === 'touchstart') {
        e.preventDefault(); // Prevent page scroll while dragging inside mockup
      }
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      const pos = getPointerPos(e);
      const dx = pos.x - startX;
      const dy = pos.y - startY;

      let newLeft = initialLeft + dx;
      let newTop = initialTop + dy;

      // Constrain within the simulated phone screen boundaries
      const maxLeft = screen.clientWidth - badge.offsetWidth - 8;
      const maxTop = screen.clientHeight - badge.offsetHeight - 8;

      newLeft = Math.max(8, Math.min(newLeft, maxLeft));
      newTop = Math.max(8, Math.min(newTop, maxTop));

      badge.style.left = `${newLeft}px`;
      badge.style.top = `${newTop}px`;
    }

    function onPointerUp() {
      if (!isDragging) return;
      isDragging = false;
      badge.style.transition = 'box-shadow var(--duration-fast)';
    }

    badge.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    badge.addEventListener('touchstart', onPointerDown, { passive: false });
    window.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('touchend', onPointerUp);
  }

  /* ==========================================================================
     2. FPS Simulation & Live SVG Frametime Waveform
     ========================================================================== */
  const fpsText = document.getElementById('liveFpsText');
  const simBtns = document.querySelectorAll('.sim-btn');
  const frametimePath = document.getElementById('frametimePath');

  let currentTargetFps = 60;
  let currentJitter = 0.8;
  const waveformPoints = new Array(11).fill(20);

  simBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      simBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      currentTargetFps = parseFloat(btn.dataset.fps);
      currentJitter = parseFloat(btn.dataset.jitter);
    });
  });

  // Simulator tick every 450ms
  setInterval(() => {
    if (!fpsText) return;

    if (currentTargetFps === 0) {
      fpsText.textContent = '--';
      fpsText.style.color = '#8b9bb4';
      // Flat idle waveform
      updateWaveform(20, 0);
    } else {
      const jitter = (Math.random() * currentJitter * 2) - currentJitter;
      const val = Math.max(1, (currentTargetFps + jitter)).toFixed(1);
      fpsText.textContent = val;

      if (currentTargetFps >= 100) {
        fpsText.style.color = '#00f5ff';
      } else if (currentTargetFps >= 50) {
        fpsText.style.color = '#00e676';
      } else {
        fpsText.style.color = '#ff3366';
      }

      // Height variation based on frametime latency
      const targetHeight = currentTargetFps <= 35 ? 12 : (currentTargetFps >= 100 ? 28 : 20);
      updateWaveform(targetHeight, currentJitter * 2.5);
    }
  }, 450);

  function updateWaveform(baseY, variance) {
    if (!frametimePath) return;

    // Shift points left
    waveformPoints.shift();
    const noise = (Math.random() * variance * 2) - variance;
    const nextY = Math.max(5, Math.min(35, baseY + noise));
    waveformPoints.push(nextY);

    // Build SVG Path d string
    const stepX = 300 / (waveformPoints.length - 1);
    let d = `M 0 ${waveformPoints[0].toFixed(1)}`;
    for (let i = 1; i < waveformPoints.length; i++) {
      d += ` L ${(i * stepX).toFixed(1)} ${waveformPoints[i].toFixed(1)}`;
    }
    frametimePath.setAttribute('d', d);

    // Change stroke color dynamically based on stability
    if (currentTargetFps <= 35) {
      frametimePath.style.stroke = 'var(--red-crimson)';
    } else if (currentTargetFps >= 100) {
      frametimePath.style.stroke = 'var(--cyan-primary)';
    } else {
      frametimePath.style.stroke = 'var(--green-neon)';
    }
  }

  /* ==========================================================================
     3. Setup Guide Step Switcher
     ========================================================================== */
  const stepCards = document.querySelectorAll('.step-card');
  const setupDisplayImg = document.getElementById('setupDisplayImg');

  stepCards.forEach(card => {
    card.addEventListener('click', () => {
      stepCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const newSrc = card.dataset.image;
      if (setupDisplayImg && newSrc) {
        setupDisplayImg.style.opacity = '0.3';
        setTimeout(() => {
          setupDisplayImg.src = newSrc;
          setupDisplayImg.style.opacity = '1';
        }, 150);
      }
    });
  });

  /* ==========================================================================
     4. Interactive FAQ Accordion
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     5. Toast Notification on APK Download Trigger
     ========================================================================== */
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toastText');
  const downloadTriggers = document.querySelectorAll('.download-trigger');
  let toastTimeout;

  downloadTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      if (!toast) return;
      clearTimeout(toastTimeout);

      if (toastText) {
        toastText.textContent = 'Direct download started: FrameLock-v1.0.0-release.apk (6.37 MB)';
      }
      toast.classList.add('show');

      toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
      }, 3500);
    });
  });

  /* ==========================================================================
     6. Smooth Anchor Navigation
     ========================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});

