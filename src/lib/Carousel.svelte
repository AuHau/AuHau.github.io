<script>
  import { onMount, tick } from 'svelte';

  let { images = [], interval = 4000 } = $props();

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

    entering = newIdx;   // Position incoming slide off-screen (no transition)
    await tick();        // Flush DOM update with entering position

    // Wait for the browser to actually paint the entering position before
    // triggering the transition — without this rAF the browser batches both
    // DOM updates into one frame and the slide-in animation never fires.
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
</script>

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
          <img src={image.src} alt={image.alt}>
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
