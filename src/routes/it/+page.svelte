<script>
  import { onMount } from 'svelte';
  import Nav from '$lib/Nav.svelte';
  import Carousel from '$lib/Carousel.svelte';

  const navItems = [
    { anchor: 'it-skills', label: 'My IT skills' },
    { anchor: 'projects-gitrack', label: 'My projects', id: 'projects', matchPrefix: 'projects' },
  ];

  const daGuiImages = [
    { src: '/images/daGui-logo.png', alt: 'daGui logo' },
    { src: '/images/daGui-design.png', alt: 'daGui design' },
    { src: '/images/daGui_exec.png', alt: 'daGui execution' },
  ];

  function nextFrame(e) {
    e.preventDefault();
    const page = document.querySelector('.page');
    if (page) page.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  }

  // GitHub SVG icon used inline in buttons
</script>

<svelte:head>
  <title>Adam Uhlíř | Software Developer</title>
  <meta name="description" content="Personal web page of Adam Uhlir">
</svelte:head>

<div class="it">
  <Nav items={navItems} showBack={true} />
  <div class="page">
    <div class="frame it-skills pt white" data-anchor="it-skills">
      <div class="wrapper">
        <div class="collage-container">
          <img src="/images/kolaz.png" alt="Collage of Logos of technologies">
        </div>
        <div class="description">
          <h2>I am software developer...</h2>
          I have a diverse knowledge of several areas. The main focus of my experience lays in full-stack web
          development, but I have also worked with cloud computing technologies, Big Data systems and DevOps area.
          An hobby of mine inside IT is a security and I use this knowledge in my daily work.<br><br>

          I have used many tools, many frameworks and many languages, some of which I have already forgotten, but
          the ability to learn and get up to speed with new things persists. I am always looking for the right tool
          for the job.<br><br>

          I was always fascinated with distributed systems (hence the Master in Cloud Computing and Services) and
          recently I got really into technology called <a href="https://ipfs.io/">Interplanetary File System (IPFS)</a>.
          If you don't know it, check it out! <strong>It is the future...</strong>
        </div>
      </div>
      <a href="#" class="nextFrame" onclick={nextFrame}></a>
    </div>

    <div class="frame gitrack orange" data-anchor="projects-gitrack">
      <div class="project-container wrapper">
        <div class="column">
          <h2>giTrack</h2>
          <div class="tags">
            <div>Toggl</div><div>Git</div><div>Automatization</div>
          </div>
          <div class="text">
            giTrack is an utility that aims to make developer's life simpler by taking out the frequent
            management's requirement of reporting the time spent. It does so using Git's commit messages and
            times for creating time entries, which to my experience correlates quiet a lot. It won't produce
            100% accurate reports, but it should be "good enough" to meet the requirement.
          </div>
          <div class="text-center">
            <a href="https://github.com/AuHau/giTrack" class="check-github btn" target="_blank" rel="noopener">Check on GitHub
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
          </div>
        </div>
        <div class="column text-center">
          <img src="/images/gitrack.gif" alt="giTrack demonstration">
        </div>
      </div>
      <a href="#" class="nextFrame" onclick={nextFrame}></a>
    </div>

    <div class="frame ipfs-publish white" data-anchor="projects-ipfs-publish">
      <div class="project-container wrapper reversed">
        <div class="column">
          <h2>IPFS Publish</h2>
          <div class="tags">
            <div>IPFS</div><div>Continuous Delivery</div>
          </div>
          <div class="text">
            IPFS Publish is a tool that aims to enable automatic publishing of static webpages from Git
            repositories into IPFS. It consists of two parts: small web server and management CLI.

            Web server exposes an endpoint which you use as your Git's webhook. When the hook is invoked, it
            clones your repo, build it (if needed), add it to the IPFS node (pin it if configured) and publish
            the new IPFS address under configured IPNS name.
          </div>
          <div class="text-center">
            <a href="https://github.com/AuHau/ipfs-publish" class="check-github btn" target="_blank" rel="noopener">Check on GitHub
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
          </div>
        </div>
        <div class="column text-center">
          <img src="/images/ipfs-publish.png" alt="IPFS Publish love">
        </div>
      </div>
      <a href="#" class="nextFrame" onclick={nextFrame}></a>
    </div>

    <div class="frame togglcli orange" data-anchor="projects-togglcli">
      <div class="project-container wrapper">
        <div class="column">
          <h2>Toggl CLI</h2>
          <div class="tags">
            <div>Toggl</div><div>CLI</div><div>API</div><div>Python</div>
          </div>
          <div class="text">
            Command line tool and set of Python wrapper classes for interacting with <a href="https://toggl.com">toggl</a>'s API
          </div>
          <div class="text-center">
            <a href="https://github.com/AuHau/toggl-cli" class="check-github btn" target="_blank" rel="noopener">Check on GitHub
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
          </div>
        </div>
        <div class="column text-center">
          <img src="/images/toggl_logo.png" alt="Toggl logo">
        </div>
      </div>
      <a href="#" class="nextFrame" onclick={nextFrame}></a>
    </div>

    <div class="frame dagui white" data-anchor="projects-dagui">
      <div class="project-container wrapper reversed">
        <div class="column">
          <h2>daGui</h2>
          <div class="tags">
            <div>Node.js</div><div>React</div><div>Electron</div><div>Apache Spark</div>
          </div>
          <div class="text">
            daGui is an application which enables you to create Big Data programs for frameworks that utilizes
            Directed Acyclic Graph (DAG) for execution, by building the graph in user friendly way.<br>
            It has system of adaptors, so new frameworks can be plugged-in. Currently it supports Apache Spark.
            <br><br>
            daGui was developed as part of my Master thesis.
          </div>
          <div class="text-center">
            <a href="https://github.com/AuHau/daGui" class="check-github btn" target="_blank" rel="noopener">Check on GitHub
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
          </div>
        </div>
        <div class="column text-center">
          <Carousel images={daGuiImages} interval={4000} />
        </div>
      </div>
      <a href="#" class="nextFrame" onclick={nextFrame}></a>
    </div>

    <div class="frame home-myo orange" data-anchor="projects-home-myo">
      <div class="project-container wrapper">
        <div class="column">
          <h2>Home Myo</h2>
          <div class="tags">
            <div>Android</div><div>Java</div><div>Smart Homes</div><div>Myo armband</div>
          </div>
          <div class="text">
            Home Myo is a proof-of-concept project of advanced Smart Home control using hand gestures. It was
            developed as part of my <a href="https://dspace.cvut.cz/handle/10467/61122?locale-attribute=en">Bachelor
            thesis</a>.
            It utilizes Myo armband with its hand gesture detection capabilities and in-house developed basic
            indoor localization.

            It consists of an Android application, which connects several components into a whole system. The
            user can configure and map the hand gestures to the actions inside the Smart Home, then the
            application listens for the Myo detected hand gestures and when some gesture is detected, based on
            the user location inside the Smart Home, it sends the proper command into the Smart Home network.
          </div>
          <div class="text-center">
            <a href="https://github.com/AuHau/home-myo" class="check-github btn" target="_blank" rel="noopener">Check on GitHub
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
          </div>
        </div>
        <div class="column text-center">
          <img src="/images/home-myo.png" alt="Home Myo Cover">
        </div>
      </div>
      <a href="#" class="nextFrame" onclick={nextFrame}></a>
    </div>

    <div class="frame picker white" data-anchor="projects-picker">
      <div class="project-container reversed wrapper">
        <div class="column">
          <h2>Select Picker</h2>
          <div class="tags">
            <div>JavaScript</div><div>jQuery</div><div>Plugin</div>
          </div>
          <div class="text">
            Select Picker is a jQuery plugin supporting work with select boxes. It extends the default
            possibilities of select boxes with a new range of features. In the basic setup, it will simply mimic
            a basic select box, but at the same time provide you with extensive ways of styling the appearance
            of your select box and several more neat features.<br><br>
            The main area where Select Picker truly rocks is when you want to use multiple-selection select
            boxes. It will give you an easy way how to facilitate user's selections with a tag-like appearance
            solution, providing features like custom styling and search.
          </div>
          <div class="text-center">
            <a href="https://github.com/AuHau/select-picker" class="check-github btn" target="_blank" rel="noopener">Check on GitHub
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
          </div>
        </div>
        <div class="column text-center">
          <img src="/images/picker.png" alt="Selection Picker">
        </div>
      </div>
      <a href="#" class="nextFrame" onclick={nextFrame}></a>
    </div>
  </div>
</div>
