<script>
  import { onMount } from 'svelte';

  let { images = [], interval = 4000 } = $props();

  let current = $state(0);

  function prev() {
    current = (current - 1 + images.length) % images.length;
  }

  function next() {
    current = (current + 1) % images.length;
  }

  onMount(() => {
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  });
</script>

<div class="carousel slide">
  <div class="carousel-inner" role="listbox">
    {#each images as image, i}
      <div class="item" class:active={i === current}>
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
