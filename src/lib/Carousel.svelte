<script>
  import { onMount, tick } from 'svelte';

  let { images = [], interval = 4000 } = $props();

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
  }

  function closeModal() {
    modalOpen = false;
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
          <button class="img-open" onclick={() => openModal(i)} aria-label="Open image">
            <img src={image.src} alt={image.alt}>
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
      <img src={images[modalIndex].src} alt={images[modalIndex].alt}>
      <p class="carousel-modal-caption">{images[modalIndex].alt}</p>
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
