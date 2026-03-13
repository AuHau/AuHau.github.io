<script>
  import Nav from '$lib/Nav.svelte';
  import Carousel from '$lib/Carousel.svelte';

  const navItems = [
    { anchor: 'it-skills', label: 'My DIY skills' },
    { anchor: 'projects-gitrack', label: 'My projects', id: 'projects', matchPrefix: 'projects' },
  ];

  const diyPhotos = [
    { src: '/images/diy/diy1.jpg', alt: 'DIY project 1' },
    { src: '/images/diy/diy2.jpg', alt: 'DIY project 2' },
    { src: '/images/diy/diy3.jpg', alt: 'DIY project 3' },
    { src: '/images/diy/diy4.jpg', alt: 'DIY project 4' },
  ];

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
    modalIndex = (modalIndex - 1 + diyPhotos.length) % diyPhotos.length;
  }

  function modalNext() {
    modalIndex = (modalIndex + 1) % diyPhotos.length;
  }

  function onOverlayClick(e) {
    if (e.target === e.currentTarget) closeModal();
  }

  function onKeydown(e) {
    if (!modalOpen) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') modalPrev();
    if (e.key === 'ArrowRight') modalNext();
  }

  function nextFrame(e) {
    e.preventDefault();
    const page = document.querySelector('.page');
    if (page) page.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  }

  // GitHub SVG icon used inline in buttons
</script>

<svelte:window onkeydown={onKeydown} />

<svelte:head>
  <title>Adam Uhlíř | DIY tinker</title>
  <meta name="description" content="Personal web page of Adam Uhlir">
</svelte:head>

<div class="diy">
  <Nav items={navItems} showBack={true} />
  <div class="page">
    <div class="frame skills-description pt white" data-anchor="it-skills">
      {#each diyPhotos as photo, i}
        <button class="diy-photo diy-photo-{i + 1}" onclick={() => openModal(i)} aria-label="Open {photo.alt}">
          <img src={photo.src} alt={photo.alt}>
        </button>
      {/each}
      <div class="description">
        <h2>I am DIY tinker...</h2>

        I have always been drawn to tinkering with things. Since I was a kid, I loved to take broken appliances
        and take them apart. Sometimes learning how they work, sometimes just playing with some parts inside. <br><br>

        Since then, I have moved on from learning by destruction to learning by doing. Nowadays, I enjoy my free time
        to explore all new areas, usually through some project that introduces me to the problematic and usually results
        in either my kids having a new toy or ... me having some new toy. <br><br>

        I am not focused on one specific skill; rather, I enjoy "hoarding of capabilities". While I might not be master
        of one domain, this allows projects to be created end-to-end without outsourcing parts.

        Some machines I have collected over the years are a MIG welder, a woodworking combined machine (table-saw, shaper, planner),
        CO2 laser, electronic bench with solder, etc., 3D printer, and more. Usually, new projects bring new tools.
      </div>
      <a href="#" class="nextFrame" onclick={nextFrame}></a>
    </div>

    <div class="frame orange" data-anchor="projects-projector">
      <div class="project-container wrapper">
        <div class="column">
          <h2>Motorized UST projector cabinet</h2>
          <div class="tags">
            <div>ESP32</div><div>MicroPython</div><div>Electronics</div><div>3D modelling</div>
          </div>
          <div class="text">
            From my childhood, I have dreamed of my own home cinema. Before we find some final living accommodation, where I could do a proper
            home-cinema setup, I needed something portable and limited in footprint. That is why I have opted for an Ultra Short Throw (UST) projector, which meets this requirement exactly. In order to have it nicely stowed away when not it unsed, I have set out to build a custom cabinet with a special
            motorized drawer that opens/closes based on the projector.<br><br>
            I have designed the cabinet in Fusion 360, my friend cabinet-maker built it, and I have set out to build the electronics powering it. I used
            ESP32 for the "brain" of the cabinet, built custom firmware with MicroPython, and used a linear actuator for moving the drawer. See the linked
            GitHub repo for more details.
          </div>
          <div class="text-center">
            <a href="https://github.com/AuHau/projector-cabinet" class="check-github btn" target="_blank" rel="noopener">Check on GitHub
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
          </div>
        </div>
        <div class="column text-center">
          <Carousel images={[
            { youtube: 'b7_Dzy0piuk', alt: 'Cabinet in action' },
            { src: '/images/diy/projector/render.png', alt: 'Fusion 360 model of the cabinet' },
            { src: '/images/diy/projector/prototyping-done.jpeg', alt: 'Electronic\'s prototype' },
            { src: '/images/diy/projector/ready-to-be-installed.jpeg', alt: 'Electronic\'s ready to be installed' },
            { src: '/images/diy/projector/electronic-installed.jpeg', alt: 'Electronic\'s installed' },
          ]} interval={4000} />
        </div>
      </div>
      <a href="#" class="nextFrame" onclick={nextFrame}></a>
    </div>

    <div class="frame white" data-anchor="projects-space-control">
      <div class="project-container wrapper reversed">
        <div class="column">
          <h2>Space rocket control panel</h2>
          <div class="tags">
            <div>WIP</div><div>MicroPython</div><div>Electronics</div><div>3D modelling</div><div>CO2 laser</div><div>Woodworking</div>
          </div>
          <div class="text">
            For space-themed summer camp where I volunteer, I was tasked to make a space-rocket out of a tent - including a control panel for it.
            I started working on it and, well... ended up with maybe a bit of an over-engineered solution. Proper backlit, Apollo-mission inspired
            fully operational control panel.
            Unfortunately, due to time constraints, I did not manage to finish it properly by implementing the game loop I had designed for it. Only finished the case with the panels and populated it with all the switches and buttons, but they are not operational yet. This is all still TBD, and once my son grows up a bit, he will get it for some of his birthday.<br><br>

            Big inspiration for this project was <a href="https://www.youtube.com/@thewarthogproject" target="_blank">The Warthog Project</a> and
            <a href="https://www.youtube.com/watch?v=j6zseFi070E" target="_blank">Mission Control Desk</a>.
          </div>
        </div>
        <div class="column text-center">
          <Carousel images={[
            { src: '/images/diy/space_control/current_state_front.jpg', alt: 'Current state of the panel. Front view' },
            { src: '/images/diy/space_control/current_state_back.jpg', alt: 'Current state of the panel. Inside of the panel.' },
            { src: '/images/diy/space_control/backlighting_front.jpg', alt: 'Back-lighting of the panel. Front view.' },
            { src: '/images/diy/space_control/backlighting_back.jpg', alt: 'Back-lighting of the panel. Back view.' },
            { src: '/images/diy/space_control/housing_wip.jpg', alt: 'WIP of the housing for the panel.' },
          ]} interval={4000} />
        </div>
      </div>
      <a href="#" class="nextFrame" onclick={nextFrame}></a>
    </div>

    <div class="frame orange" data-anchor="projects-panak">
      <div class="project-container wrapper">
        <div class="column">
          <h2>Real-life sized Operation game</h2>
          <div class="tags">
            <div>Woodworking</div><div>Electronics</div><div>3D printing</div>
          </div>
          <div class="text">
            Another year at our summer camp, about a medical hospital, I was tasked with making some sort of surgical simulator.
            I was inspired by the Operation game and made a real-life-size version. <br><br>
            There are nine "organs" that the kids need to "operate", which means to extract them from the organ's cavity
            with the provided tools. If they touch the cavity, the simulator will buzz and light up. Maybe in some future
            I would like to make a more "high-tech" version with a microcontroller that would make it more competitive.
            Track the time and number of touches. Maybe someday...
          </div>
        </div>
        <div class="column text-center">
          <Carousel images={[
            { src: '/images/diy/panak/in_action.jpg', alt: 'Operation in process' },
            { src: '/images/diy/panak/transporting.jpg', alt: 'Simulator on the way to the summer camp' },
            { src: '/images/diy/panak/wip.jpeg', alt: 'Work in progress' },
          ]} interval={4000} />
        </div>
      </div>
      <a href="#" class="nextFrame" onclick={nextFrame}></a>
    </div>

    <div class="frame white" data-anchor="projects-chair">
      <div class="project-container wrapper reversed">
        <div class="column">
          <h2>Kid's chair</h2>
          <div class="tags">
            <div>Bending</div><div>Welding</div>
          </div>
          <div class="text">
            Somewhere I saw similar chair for kids and decided to reproduce it.
          </div>
        </div>
        <div class="column text-center">
          <img src="/images/diy/chair/chair.jpeg" alt="Rope chair" style="max-height: 600px">
        </div>
      </div>
      <a href="#" class="nextFrame" onclick={nextFrame}></a>
    </div>

    <div class="frame orange" data-anchor="projects-zahon">
      <div class="project-container wrapper">
        <div class="column">
          <h2>Raised garden bed</h2>
          <div class="tags">
            <div>Woodworking</div><div>Garden</div>
          </div>
          <div class="text">
            Created a second raised garden bed with help from my son. Now we are growing veggies!
          </div>
        </div>
        <div class="column text-center">
          <Carousel images={[
            { src: '/images/diy/panak/in_action.jpg', alt: 'Operation in process' },
            { src: '/images/diy/panak/transporting.jpg', alt: 'Simulator on the way to the summer camp' },
            { src: '/images/diy/panak/wip.jpeg', alt: 'Work in progress' },
          ]} interval={4000} />
        </div>
      </div>
      <a href="#" class="nextFrame" onclick={nextFrame}></a>
    </div>
  </div>
</div>

{#if modalOpen}
  <div class="carousel-modal-overlay" onclick={onOverlayClick} role="dialog" aria-modal="true" aria-label={diyPhotos[modalIndex].alt}>
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
      <img src={diyPhotos[modalIndex].src} alt={diyPhotos[modalIndex].alt}>
    </div>

    <button class="carousel-modal-nav carousel-modal-nav--next" onclick={modalNext} aria-label="Next image">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </button>

    <div class="carousel-modal-dots">
      {#each diyPhotos as _, i}
        <button class="carousel-modal-dot" class:active={i === modalIndex} onclick={() => modalIndex = i} aria-label="Image {i + 1}"></button>
      {/each}
    </div>
  </div>
{/if}
