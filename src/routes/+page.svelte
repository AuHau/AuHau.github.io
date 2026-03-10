<script>
  import { onMount } from 'svelte';
  import Nav from '$lib/Nav.svelte';

  const navItems = [
    { anchor: 'about-me', label: 'About me' },
    { anchor: 'experiences', label: 'My experience' },
    { anchor: 'contact', label: 'Contact' },
  ];

  function nextFrame(e) {
    e.preventDefault();
    const page = document.querySelector('.page');
    if (page) page.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  }

  onMount(() => {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
</script>

<svelte:head>
  <title>Adam Uhlíř</title>
  <meta name="description" content="Personal web page of Adam Uhlir">
</svelte:head>

<div class="main">
  <Nav items={navItems} />
  <div class="page">
    <div class="frame welcome" data-anchor="welcome">
      <div class="welcome-container">
        <div class="hello">
          <div class="i-am">Hello, <span class="adam">I am Adam Uhlíř</span></div>
          <div class="portfolio">Welcome to my portfolio!</div>
        </div>
        <div class="work">
          I am...
          <div class="links">
            <a href="/diy" class="btn toPhoto">DIY tinker</a>
            <a href="/it" class="btn toIt">Developer</a>
          </div>
        </div>
      </div>
      <a href="#" class="nextFrame" onclick={nextFrame}></a>
    </div>

    <div class="frame orange about-me" data-anchor="about-me">
      <div class="wrapper">
        <h2>About me</h2>
        <div class="text-container">
          <div class="col-sm-8 text">
            My name is Adam Uhlir and I am a <span id="age">26</span>-year-old guy who loves to be proactive in
            his life.
            <br><br>
            I am interested in a variety of things starting with IT world, browsing through photography and
            timelapsing, enjoying listening to music, getting excited while dancing, feeling the moment while
            practicing sports (frisbee and squash to name a few) and being creative through DIY projects.
            Moreover I love to travel, discover new cultures, meet interesting people and above all, I have a
            passion for nature and (ultra-light) backpacking.
            <br><br>
            My motto is to live the life to the fullest, by seeking and accepting all challenges laid in front
            of me and being happy by embracing all the small things that come and go in my life.
          </div>
          <div class="col-sm-4 image-container">
            <img src="/images/me_square.jpg" alt="Photo of Adam Uhlir" class="me">
          </div>
        </div>
        <div class="quote">
          „Two roads diverged in a wood, and I — I took the one less traveled by. And that has made all the
          difference."<br>
          <div class="author">–Robert Frost</div>
        </div>
      </div>
      <a href="#" class="nextFrame" onclick={nextFrame}></a>
    </div>

    <div class="frame white experiences" data-anchor="experiences">
      <div class="wrapper">
        <h2>My experience</h2>
        <div class="small-container">
          <div class="col-md-6">
            <h3>Work experience</h3>
            <ul>
              <li><a href="https://logos.co/">Logos Storage / Codex</a> - Senior Software Engineer<br>Nop

                (Feb 2023 - present)
              </li>
              <li><a href="https://ethswarm.org/">Swarm Foundation</a> - Senior Software Engineer<br>
                (Feb 2021 - Jan 2023)
              </li>
              <li><a href="https://iovlabs.org/">IOV Labs</a> - Senior Software Engineer<br>
                (Nov 2019 - Feb 2021)
              </li>
              <li><a href="https://www.sap.com/">SAP</a> - Technology Associate in Multi-cloud Technology Office<br>
                (June 2018 - June 2019)
              </li>
              <li><a href="https://u.plus/">Usertech s.r.o.</a> - Backend developer<br>
                (October 2017 - May 2018)
              </li>
              <li><a href="https://www.honeywell.com/">Honeywell s.r.o.</a> - Research engineer<br>
                (July 2017 - December 2017)
              </li>
              <li><a href="http://www.adastra.cz/en">Adastra s.r.o.</a> - Big Data consultant<br>
                (February 2017 - May 2017)
              </li>
              <li>Multiple companies - Web developer<br>
                (May 2009 - December 2015)
              </li>
            </ul>
          </div>
          <div class="col-md-6">
            <h3>Education</h3>
            <ul>
              <li>
                MSc., <a href="http://www.masterschool.eitdigital.eu/">EIT Digital Master school</a> (2015 - 2017)<br>
                Double degree program, Cloud Computing and Services
                <ul>
                  <li><a href="http://www.aalto.fi/en/">Aalto University</a>, Finland</li>
                  <li><a href="https://www.kth.se/en">KTH Royal Institue of Technology</a>, Sweden</li>
                </ul>
              </li>
              <li>
                Bc., <a href="https://www.cvut.cz/en">Czech Technical University in Prague</a> (2011 - 2014)<br>
                <a href="https://oi.fel.cvut.cz/en/" target="_blank">Computer and Information Science</a>
              </li>
              <li>TOEFL iBT certificate (100 points)</li>
            </ul>
            <div style="margin-top: 30px;">
              <strong>For complete overview of my experience see my <a href="https://www.linkedin.com/in/adamuhlir/">LinkedIn profile</a>.</strong>
            </div>
          </div>
        </div>
      </div>
      <a href="#" class="nextFrame" onclick={nextFrame}></a>
    </div>

    <div class="frame choice" data-anchor="choice" data-menuclass="orange">
      <div class="frame-overlay">
        <div class="frame-align">
          <h2>Which of my <span class="dark">dark</span> sides you want to discover?</h2>
          <div class="col-md-6">
            <a href="/diy" class="toPhoto">
              <span class="arrow-left-big"></span>
              <span class="choice-image">
                <img src="/images/photo.png" alt="Photographer">
                <span class="overlay">
                  <span class="overlay-align">
                    <span class="overlay-text">DIY tinker</span>
                  </span>
                </span>
              </span>
            </a>
          </div>
          <div class="col-md-6">
            <a href="/it" class="toIt">
              <span class="choice-image">
                <img src="/images/developer.png" alt="Software developer">
                <span class="overlay">
                  <span class="overlay-align">
                    <span class="overlay-text">Software developer</span>
                  </span>
                </span>
              </span>
              <span class="arrow-right-big"></span>
            </a>
          </div>
        </div>
        <a href="#" class="nextFrame" onclick={nextFrame}></a>
      </div>
    </div>

    <div class="frame orange contact" data-anchor="contact">
      <h2>Contact</h2>
      <div class="contact-details">
        Adam Uhlíř<br>
        <a href="mailto:adam@uhlir.dev">adam@uhlir.dev</a><br>
      </div>
      <div class="pgp">
        <a href="/key.pgp" download="adam_uhlir_pubkey.pgp"><strong>GPG</strong>: 0x5DF6C83ACFBD5247</a><br>
      </div>
      <div class="networks">
        <a href="https://www.linkedin.com/in/adamuhlir" target="_blank" rel="noopener" title="LinkedIn">
          <!-- LinkedIn icon -->
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
        <a href="https://github.com/AuHau" target="_blank" rel="noopener" title="GitHub">
          <!-- GitHub icon -->
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
        </a>
        <a href="https://x.com/UhlirAdam" target="_blank" rel="noopener" title="Twitter">
          <!-- X/Twitter icon -->
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
      </div>
      <div class="footer">
        Photos of me by Kateřina Bodorová<br>
        &copy; <span id="year">2019</span> Adam Uhlíř
      </div>
    </div>
  </div>
</div>
