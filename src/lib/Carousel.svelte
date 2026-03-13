<script>
  import { onMount, tick } from 'svelte';

  let { images = [], interval = 4000 } = $props();

  function isYoutube(slide) {
    return !!slide.youtube;
  }

  function youtubeThumbnail(id) {
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  }

  // --- Carousel state ---
  let current = $state(0);
  let previous = $state(-1);
  let entering = $state(-1);
  let direction = $state('next');
  let busy = false;

  async function navigate(dir) {
    if (busy) return;
    busy = true;
    direction = dir;
    const newIdx = dir === 'next'
      ? (current + 1) % images.length
      : (current - 1 + images.length) % images.length;

    entering = newIdx;
    await tick();
    await new Promise(resolve => requestAnimationFrame(resolve));

    previous = current;
    current = newIdx;
    entering = -1;

    setTimeout(() => {
      previous = -1;
      busy = false;
    }, 400);
  }

  function prev() { navigate('prev'); }
  function next() { navigate('next'); }

  let timer;

  function startTimer() {
    timer = setInterval(next, interval);
  }

  function stopTimer() {
    clearInterval(timer);
  }

  onMount(() => {
    startTimer();
    return stopTimer;
  });

  // --- Modal state ---
  let modalOpen = $state(false);
  let modalIndex = $state(0);

  function openModal(i) {
    modalIndex = i;
    modalOpen = true;
    stopTimer();
  }

  function closeModal() {
    modalOpen = false;
    startTimer();
  }

  function modalPrev() {
    modalIndex = (modalIndex - 1 + images.length) % images.length;
  }

  function modalNext() {
    modalIndex = (modalIndex + 1) % images.length;
  }

  function onKeydown(e) {
    if (!modalOpen) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') modalPrev();
    if (e.key === 'ArrowRight') modalNext();
  }

  function onOverlayClick(e) {
    if (e.target === e.currentTarget) closeModal();
  }
</script>

<svelte:window onkeydown={onKeydown} />

<div class="carousel slide" onmouseenter={stopTimer} onmouseleave={startTimer}>
  <div class="carousel-inner" role="listbox">
    {#each images as image, i}
      <div class="item"
           class:active={i === current}
           class:exit-left={i === previous && direction === 'next'}
           class:exit-right={i === previous && direction === 'prev'}
           class:enter-right={i === entering && direction === 'next'}
           class:enter-left={i === entering && direction === 'prev'}>
        <div class="item-wrapper">
          <button class="img-open" onclick={() => openModal(i)} aria-label="Open {image.alt}">
            <img src={isYoutube(image) ? youtubeThumbnail(image.youtube) : image.src} alt={image.alt}>
            {#if isYoutube(image)}
              <span class="yt-play-icon" aria-hidden="true">
                <svg viewBox="0 0 68 48"><path d="M66.5 7.7A8.5 8.5 0 0 0 60.7 2C55.4.5 34 .5 34 .5S12.6.5 7.3 2A8.5 8.5 0 0 0 1.5 7.7C0 13 0 24 0 24s0 11 1.5 16.3A8.5 8.5 0 0 0 7.3 46C12.6 47.5 34 47.5 34 47.5s21.4 0 26.7-1.5a8.5 8.5 0 0 0 5.8-5.7C68 35 68 24 68 24s0-11-1.5-16.3z" fill="#f00"/><path d="M27 34l18-10-18-10z" fill="#fff"/></svg>
              </span>
            {/if}
          </button>
        </div>
      </div>
    {/each}
  </div>
  <button class="left control" onclick={prev} aria-label="Previous">
    <span class="arrow-left"></span>
    <span class="sr-only">Previous</span>
  </button>
  <button class="right control" onclick={next} aria-label="Next">
    <span class="arrow-right"></span>
    <span class="sr-only">Next</span>
  </button>
</div>

{#if modalOpen}
  <div class="carousel-modal-overlay" onclick={onOverlayClick} role="dialog" aria-modal="true" aria-label={images[modalIndex].alt}>
    <button class="carousel-modal-close" onclick={closeModal} aria-label="Close">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>

    <button class="carousel-modal-nav carousel-modal-nav--prev" onclick={modalPrev} aria-label="Previous image">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    </button>

    <div class="carousel-modal-content">
      {#if isYoutube(images[modalIndex])}
        <div class="carousel-modal-video">
          <iframe
            src="https://www.youtube.com/embed/{images[modalIndex].youtube}?autoplay=1"
            title={images[modalIndex].alt}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      {:else}
        <img src={images[modalIndex].src} alt={images[modalIndex].alt}>
        <p class="carousel-modal-caption">{images[modalIndex].alt}</p>
      {/if}
    </div>

    <button class="carousel-modal-nav carousel-modal-nav--next" onclick={modalNext} aria-label="Next image">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </button>

    <div class="carousel-modal-dots">
      {#each images as _, i}
        <button class="carousel-modal-dot" class:active={i === modalIndex} onclick={() => modalIndex = i} aria-label="Image {i + 1}"></button>
      {/each}
    </div>
  </div>
{/if}
