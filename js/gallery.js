document.addEventListener('DOMContentLoaded', function () {
  var container = document.getElementById('gallery');
  if (!container) return;

  fetch('photos/gallery/manifest.json')
    .then(function (r) { return r.json(); })
    .then(function (photos) {
      if (!photos.length) {
        container.innerHTML = '<p class="text-center gallery-muted">No projects to display yet.</p>';
        return;
      }
      buildGallery(container, photos);
    })
    .catch(function () {
      container.innerHTML = '<p class="text-center gallery-muted">Gallery is currently unavailable.</p>';
    });

  function buildGallery(el, photos) {
    var currentModal = -1;

    // Build reel
    var html = '<div class="greel-wrap">';
    html += '<button class="greel-arrow greel-prev" aria-label="Previous">\u2039</button>';
    html += '<div class="greel">';
    for (var i = 0; i < photos.length; i++) {
      var src = 'photos/gallery/' + encodeURIComponent(photos[i].file);
      html += '<div class="greel-slide" data-index="' + i + '">';
      html += '<img src="' + src + '" alt="Rendering project in ' + photos[i].location + ' by Mins Constructions" loading="lazy">';
      html += '<span class="greel-caption">' + photos[i].location + '</span>';
      html += '</div>';
    }
    html += '</div>';
    html += '<button class="greel-arrow greel-next" aria-label="Next">\u203A</button>';
    html += '</div>';

    // Build modal
    html += '<div class="gmodal" id="galleryModal">';
    html += '<div class="gmodal-backdrop"></div>';
    html += '<button class="gmodal-close" aria-label="Close">\u00D7</button>';
    html += '<button class="gmodal-nav gmodal-prev" aria-label="Previous">\u2039</button>';
    html += '<div class="gmodal-body">';
    html += '<img src="" alt="" id="gmodalImg">';
    html += '<div class="gmodal-info">';
    html += '<span class="gmodal-label" id="gmodalLabel"></span>';
    html += '<span class="gmodal-counter" id="gmodalCounter"></span>';
    html += '</div>';
    html += '</div>';
    html += '<button class="gmodal-nav gmodal-next" aria-label="Next">\u203A</button>';
    html += '</div>';

    el.innerHTML = html;

    // Reel scrolling
    var reel = el.querySelector('.greel');
    var prevBtn = el.querySelector('.greel-prev');
    var nextBtn = el.querySelector('.greel-next');

    function getScrollAmount() {
      var slide = reel.querySelector('.greel-slide');
      return slide ? slide.offsetWidth + 20 : 340;
    }

    prevBtn.addEventListener('click', function () {
      reel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', function () {
      reel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    // Arrow visibility based on scroll position
    function updateArrows() {
      var atStart = reel.scrollLeft <= 10;
      var atEnd = reel.scrollLeft + reel.clientWidth >= reel.scrollWidth - 10;
      prevBtn.style.opacity = atStart ? '0' : '1';
      prevBtn.style.pointerEvents = atStart ? 'none' : 'auto';
      nextBtn.style.opacity = atEnd ? '0' : '1';
      nextBtn.style.pointerEvents = atEnd ? 'none' : 'auto';
    }
    reel.addEventListener('scroll', updateArrows);
    updateArrows();

    // Slide click -> open modal
    var slides = el.querySelectorAll('.greel-slide');
    for (var j = 0; j < slides.length; j++) {
      (function (slide) {
        slide.addEventListener('click', function () {
          openModal(parseInt(slide.getAttribute('data-index')));
        });
      })(slides[j]);
    }

    // Modal elements
    var modal = document.getElementById('galleryModal');
    var modalImg = document.getElementById('gmodalImg');
    var modalLabel = document.getElementById('gmodalLabel');
    var modalCounter = document.getElementById('gmodalCounter');
    var modalClose = el.querySelector('.gmodal-close');
    var modalPrev = el.querySelector('.gmodal-prev');
    var modalNext = el.querySelector('.gmodal-next');
    var modalBackdrop = el.querySelector('.gmodal-backdrop');

    function openModal(index) {
      currentModal = index;
      showModalImage(false);
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      currentModal = -1;
    }

    function showModalImage(animate) {
      var p = photos[currentModal];
      var src = 'photos/gallery/' + encodeURIComponent(p.file);

      if (animate) {
        modalImg.style.opacity = '0';
        modalImg.style.transform = 'scale(0.97)';
        setTimeout(function () {
          modalImg.src = src;
          modalImg.alt = 'Rendering project in ' + p.location;
          modalLabel.textContent = p.location;
          modalCounter.textContent = (currentModal + 1) + ' / ' + photos.length;
          modalImg.style.opacity = '1';
          modalImg.style.transform = 'scale(1)';
        }, 180);
      } else {
        modalImg.src = src;
        modalImg.alt = 'Rendering project in ' + p.location;
        modalLabel.textContent = p.location;
        modalCounter.textContent = (currentModal + 1) + ' / ' + photos.length;
      }
    }

    function navPrev() {
      currentModal = (currentModal - 1 + photos.length) % photos.length;
      showModalImage(true);
    }

    function navNext() {
      currentModal = (currentModal + 1) % photos.length;
      showModalImage(true);
    }

    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
    modalPrev.addEventListener('click', navPrev);
    modalNext.addEventListener('click', navNext);

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
      if (currentModal === -1) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') navPrev();
      if (e.key === 'ArrowRight') navNext();
    });

    // Touch swipe in modal
    var touchStartX = 0;
    modal.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    modal.addEventListener('touchend', function (e) {
      var diff = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) navPrev();
        else navNext();
      }
    }, { passive: true });
  }
});
