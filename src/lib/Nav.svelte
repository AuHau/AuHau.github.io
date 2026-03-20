<script>
  import { onMount } from 'svelte';

  let { showBack = false, items = [] } = $props();

  let menuOpen = $state(false);
  let navClass = $state('');
  let activeAnchor = $state('');

  const CLASSES = ['orange', 'white'];

  function isActive(item) {
    if (!activeAnchor) return false;
    if (item.matchPrefix) return activeAnchor.startsWith(item.matchPrefix);
    return activeAnchor === item.anchor;
  }

  function handleNavClick(e, anchor) {
    e.preventDefault();
    menuOpen = false;
    const el = document.querySelector(`[data-anchor="${anchor}"]`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onMount(() => {
    const nav = document.querySelector('nav');

    const getClassFromFrame = (frame) => {
      for (const cls of CLASSES) {
        if (frame.classList.contains(cls)) return cls;
      }
      return frame.dataset.menuclass || null;
    };

    const menuColorSwitcher = () => {
      const frames = document.querySelectorAll('.frame');
      const navHeight = nav ? nav.getBoundingClientRect().height : 64;
      for (const frame of frames) {
        const rect = frame.getBoundingClientRect();
        if (rect.top < navHeight && rect.bottom > navHeight) {
          const cls = getClassFromFrame(frame);
          navClass = cls || '';
          break;
        }
      }
    };

    const page = document.querySelector('.page');

    const isDesktop = () => window.innerWidth >= 1025;

    let observer;

    const createObserver = () => {
      if (observer) observer.disconnect();
      const root = isDesktop() ? page : null;
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const anchor = entry.target.dataset.anchor;
            if (anchor) {
              activeAnchor = anchor;
              history.replaceState(history.state, '', '#' + anchor);
              menuColorSwitcher();
            }
          }
        }
      }, { root, threshold: 0.6 });
      document.querySelectorAll('.frame[data-anchor]').forEach(f => observer.observe(f));
    };

    // Assign id to each frame from its data-anchor for deep linking
    document.querySelectorAll('.frame[data-anchor]').forEach(f => {
      f.id = f.dataset.anchor;
    });

    createObserver();

    const onResize = () => {
      menuColorSwitcher();
      createObserver();
    };

    if (page) page.addEventListener('scroll', menuColorSwitcher);
    window.addEventListener('scroll', menuColorSwitcher);
    window.addEventListener('resize', onResize);
    menuColorSwitcher();

    // Handle initial hash or fall back to first frame
    const hash = window.location.hash.slice(1);
    const targetFrame = hash ? document.querySelector(`.frame[data-anchor="${hash}"]`) : null;
    if (targetFrame) {
      activeAnchor = hash;
      setTimeout(() => targetFrame.scrollIntoView(), 0);
    } else {
      const firstFrame = document.querySelector('.frame[data-anchor]');
      if (firstFrame) activeAnchor = firstFrame.dataset.anchor;
    }

    return () => {
      observer.disconnect();
      if (page) page.removeEventListener('scroll', menuColorSwitcher);
      window.removeEventListener('scroll', menuColorSwitcher);
      window.removeEventListener('resize', onResize);
    };
  });
</script>

<nav class={navClass}>
  {#if showBack}
    <a href="/" class="back">
      <span class="arrow-left"></span>
      <div class="logo"></div>
    </a>
  {:else}
    <div class="logo"></div>
  {/if}
  <div class="menu-container">
    <button
      class="nav-toggle"
      onclick={() => (menuOpen = !menuOpen)}
      aria-label="Toggle navigation"
    >
      <svg viewBox="0 0 24 18" width="24" height="18" fill="currentColor" aria-hidden="true">
        <rect y="0" width="24" height="2"/>
        <rect y="8" width="24" height="2"/>
        <rect y="16" width="24" height="2"/>
      </svg>
    </button>
    <ul id="menu" class:open={menuOpen}>
      {#each items as item}
        <li
          id={item.id || undefined}
          data-menuanchor={item.anchor}
          class:active={isActive(item)}
        >
          <a
            href="#{item.anchor}"
            onclick={(e) => handleNavClick(e, item.anchor)}
          >{item.label}</a>
        </li>
      {/each}
    </ul>
  </div>
</nav>
