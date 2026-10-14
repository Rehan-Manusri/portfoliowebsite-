/**
 * Mrunali Patil Portfolio - Interactive Script
 * Features: Scroll Reveal, Mouse Spotlight, Terminal Tabs, AI Study Buddy Simulator,
 * Typewriter, Project Filtering, Modal Management & Clipboard Actions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Scroll Reveal Observer
  initScrollReveal();

  // 3. Mouse Spotlight Tracker on Cards
  initSpotlightEffect();

  // 4. Dynamic Typewriter
  initTypewriter();

  // 5. Hero Terminal Code Tabs
  initTerminalTabs();

  // 6. Interactive AI Study Buddy Live Simulator
  initAISimulator();

  // 7. Mobile Navigation
  initMobileNav();

  // 8. ScrollSpy Active Header Navigation
  initScrollSpy();

  // 9. Project Category Filtering
  initProjectFilters();

  // 10. Resume Modal Keyboard & Backdrop Listeners
  initModalListeners();
});

/* -------------------------------------------------------------
   1. Scroll Reveal Animation (IntersectionObserver)
------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Trigger progress bars inside this reveal element
        const progressBars = entry.target.querySelectorAll('.progress-bar-fill');
        progressBars.forEach(bar => {
          const target = bar.getAttribute('data-target') || '80%';
          bar.style.width = target;
        });

        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* -------------------------------------------------------------
   2. Mouse Spotlight Tracker (Spotlight follows cursor)
------------------------------------------------------------- */
function initSpotlightEffect() {
  const cards = document.querySelectorAll('.spotlight-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* -------------------------------------------------------------
   3. Dynamic Typewriter Effect
------------------------------------------------------------- */
function initTypewriter() {
  const typewriterElement = document.getElementById('typewriter');
  if (!typewriterElement) return;

  const words = [
    'AI & Data Science Student',
    'Aspiring Machine Learning Developer',
    'Creator of AI Study Buddy Concept',
    'Python, Java & C Problem Solver',
    'Cybersecurity & Systems Enthusiast'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 75;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 75;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typingSpeed = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 450; // Pause before new word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* -------------------------------------------------------------
   4. Hero Interactive Developer Terminal Tabs
------------------------------------------------------------- */
const terminalFiles = {
  profile: `<span class="code-comment"># Engineer Identity & Academic Profile</span>
<span class="code-keyword">class</span> <span class="code-class">MrunaliPatil</span>:
    <span class="code-keyword">def</span> <span class="code-function">__init__</span>(<span class="code-variable">self</span>):
        <span class="code-variable">self</span>.name = <span class="code-string">"Mrunali Patil"</span>
        <span class="code-variable">self</span>.role = <span class="code-string">"AI & Data Science Engineering Student"</span>
        <span class="code-variable">self</span>.institute = <span class="code-string">"R.C. Patel Institute of Technology, Shirpur"</span>
        <span class="code-variable">self</span>.academic_status = <span class="code-string">"2nd Year (FY CGPA: 6.50)"</span>
        <span class="code-variable">self</span>.secondary_score = <span class="code-string">"10th Grade: 92.80% Distinction"</span>
        <span class="code-variable">self</span>.interests = [<span class="code-string">"Artificial Intelligence"</span>, <span class="code-string">"Cybersecurity"</span>, <span class="code-string">"Software Logic"</span>]
        <span class="code-variable">self</span>.open_for_internships = <span class="code-keyword">True</span>

    <span class="code-keyword">def</span> <span class="code-function">get_mission</span>(<span class="code-variable">self</span>):
        <span class="code-keyword">return</span> <span class="code-string">"Building practical AI assistants & secure software tools."</span>`,

  skills: `<span class="code-comment">// Technical Competencies Matrix</span>
{
  <span class="code-string">"languages"</span>: [<span class="code-string">"Python"</span>, <span class="code-string">"C Programming"</span>, <span class="code-string">"Java"</span>],
  <span class="code-string">"specializations"</span>: {
    <span class="code-string">"artificial_intelligence"</span>: [<span class="code-string">"Basic AI Concepts"</span>, <span class="code-string">"AI Application Architecture"</span>],
    <span class="code-string">"cybersecurity"</span>: [<span class="code-string">"Threat Modeling"</span>, <span class="code-string">"Network Basics"</span>, <span class="code-string">"Defensive Concepts"</span>],
    <span class="code-string">"problem_solving"</span>: [<span class="code-string">"Control Flow"</span>, <span class="code-string">"Arrays & Functions"</span>, <span class="code-string">"OOP Paradigms"</span>]
  },
  <span class="code-string">"flagship_project"</span>: <span class="code-string">"AI Study Buddy"</span>,
  <span class="code-string">"daily_routine"</span>: <span class="code-string">"Algorithmic practice & conceptual engineering"</span>
}`,

  assistant: `<span class="code-comment"># Flagship Project Prototype: AI Study Buddy</span>
<span class="code-keyword">class</span> <span class="code-class">AIStudyBuddy</span>:
    <span class="code-keyword">def</span> <span class="code-function">__init__</span>(<span class="code-variable">self</span>, <span class="code-variable">student_id</span>):
        <span class="code-variable">self</span>.student = <span class="code-variable">student_id</span>
        <span class="code-variable">self</span>.supported_topics = [<span class="code-string">"Data Structures"</span>, <span class="code-string">"OOP in Java"</span>, <span class="code-string">"Cybersecurity"</span>]
    
    <span class="code-keyword">def</span> <span class="code-function">assist</span>(<span class="code-variable">self</span>, <span class="code-variable">query</span>):
        <span class="code-comment"># Deconstruct complex engineering queries for students</span>
        <span class="code-variable">summary</span> = <span class="code-function">parse_and_explain</span>(<span class="code-variable">query</span>, <span class="code-variable">clarity</span>=<span class="code-string">"high"</span>)
        <span class="code-keyword">return</span> {<span class="code-string">"solution"</span>: <span class="code-variable">summary</span>, <span class="code-string">"status"</span>: <span class="code-string">"concept_in_progress"</span>}`
};

function initTerminalTabs() {
  const tabs = document.querySelectorAll('.terminal-tab');
  const codeDisplay = document.getElementById('terminal-code-display');
  const filenameLabel = document.getElementById('terminal-filename');

  if (!tabs.length || !codeDisplay) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('bg-slate-800/90', 'text-white', 'border-indigo-500');
        t.classList.add('text-slate-400', 'border-transparent');
      });

      tab.classList.add('bg-slate-800/90', 'text-white', 'border-indigo-500');
      tab.classList.remove('text-slate-400', 'border-transparent');

      const fileKey = tab.getAttribute('data-file');
      if (terminalFiles[fileKey]) {
        codeDisplay.innerHTML = terminalFiles[fileKey];
        if (filenameLabel) {
          filenameLabel.textContent = tab.getAttribute('data-label') || 'terminal.py';
        }
      }
    });
  });
}

/* -------------------------------------------------------------
   5. Interactive AI Study Buddy Live Simulator Widget
------------------------------------------------------------- */
const aiSimResponses = {
  recursion: {
    q: 'Can you explain Recursion with an intuitive analogy?',
    a: 'Think of recursion like opening a series of Russian nesting dolls (Matryoshka). Each function call unpacks a smaller doll with the same logic, until you reach the smallest doll that cannot be opened (the Base Case). Once reached, the dolls are assembled back together in reverse order!'
  },
  oop: {
    q: 'What is Encapsulation in Java and why is it important?',
    a: 'Encapsulation is bundling data (variables) and the methods that operate on that data into a single unit (class), while restricting direct access to internal components using private access modifiers and public getters/setters. It prevents unauthorized state tampering and ensures modular, robust software.'
  },
  cyber: {
    q: 'What is the Principle of Least Privilege in Cybersecurity?',
    a: 'The Principle of Least Privilege (PoLP) states that every user, process, or program must be granted only the minimum permissions necessary to perform its intended task. If an entity is compromised, this principle isolates the potential attack surface and limits lateral movement.'
  },
  c_arrays: {
    q: 'Why are Arrays in C stored in contiguous memory?',
    a: 'In C, contiguous memory storage allows O(1) constant-time direct indexing using pointer arithmetic (`*(arr + i)`). Knowing the base address and the data type size enables the CPU to calculate exact memory offsets in hardware instantly.'
  }
};

function initAISimulator() {
  const promptButtons = document.querySelectorAll('.ai-sim-prompt');
  const questionBox = document.getElementById('ai-sim-question');
  const answerBox = document.getElementById('ai-sim-answer');
  const statusIndicator = document.getElementById('ai-sim-status');

  if (!promptButtons.length || !questionBox || !answerBox) return;

  promptButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const promptKey = btn.getAttribute('data-prompt');
      const item = aiSimResponses[promptKey];
      if (!item) return;

      // Update question text
      questionBox.textContent = `"${item.q}"`;

      // Status indicator animation
      if (statusIndicator) {
        statusIndicator.innerHTML = `<span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span><span>AI Buddy thinking...</span>`;
      }

      // Stream simulated response
      answerBox.innerHTML = '';
      let i = 0;
      const text = item.a;

      function streamLetter() {
        if (i < text.length) {
          answerBox.textContent += text.charAt(i);
          i++;
          setTimeout(streamLetter, 12);
        } else {
          if (statusIndicator) {
            statusIndicator.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-400"></span><span>Response Generated</span>`;
          }
        }
      }

      streamLetter();
    });
  });
}

/* -------------------------------------------------------------
   6. Mobile Navigation
------------------------------------------------------------- */
function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    if (isHidden) {
      mobileMenu.classList.remove('hidden');
    } else {
      mobileMenu.classList.add('hidden');
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

/* -------------------------------------------------------------
   7. ScrollSpy Active Header Navigation
------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('nav a.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    desktopLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      if (href === currentId) {
        link.classList.add('text-indigo-400', 'bg-indigo-500/10', 'border-indigo-500/30');
        link.classList.remove('text-slate-300', 'border-transparent');
      } else {
        link.classList.remove('text-indigo-400', 'bg-indigo-500/10', 'border-indigo-500/30');
        link.classList.add('text-slate-300', 'border-transparent');
      }
    });
  });
}

/* -------------------------------------------------------------
   8. Project Category Filtering
------------------------------------------------------------- */
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => {
        btn.classList.remove('bg-indigo-600', 'text-white', 'active');
        btn.classList.add('text-slate-400');
      });
      button.classList.add('bg-indigo-600', 'text-white', 'active');
      button.classList.remove('text-slate-400');

      const filterValue = button.getAttribute('data-filter');

      projectItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = '';
          item.classList.add('reveal', 'active');
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------
   9. Resume Modal Controls & Listeners
------------------------------------------------------------- */
function openResumeModal() {
  const modal = document.getElementById('resume-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function closeResumeModal() {
  const modal = document.getElementById('resume-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
}

function downloadResumePDF() {
  // Directly opens the print dialogue which allows "Save as PDF" cleanly
  window.print();
}

function initModalListeners() {
  const modal = document.getElementById('resume-modal');
  if (!modal) return;

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeResumeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeResumeModal();
    }
  });
}

/* -------------------------------------------------------------
   10. Copy Email Address to Clipboard
------------------------------------------------------------- */
function copyEmail() {
  const emailText = document.getElementById('email-address')?.innerText || 'mrunali.patil@example.com';

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(emailText).then(() => {
      showToast('Email address copied to clipboard!');
      toggleCopyBtnSuccess();
    }).catch(() => {
      fallbackCopy(emailText);
    });
  } else {
    fallbackCopy(emailText);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  showToast('Email address copied to clipboard!');
  toggleCopyBtnSuccess();
}

function toggleCopyBtnSuccess() {
  const btn = document.getElementById('copy-btn');
  if (!btn) return;
  const originalHTML = btn.innerHTML;
  btn.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i><span class="text-emerald-400 font-semibold">Copied!</span>`;
  if (window.lucide) window.lucide.createIcons();
  setTimeout(() => {
    btn.innerHTML = originalHTML;
    if (window.lucide) window.lucide.createIcons();
  }, 2200);
}

/* -------------------------------------------------------------
   11. Contact Form Submission Handling
------------------------------------------------------------- */
function handleContactSubmit(event) {
  event.preventDefault();
  const form = document.getElementById('contact-form');
  const successBanner = document.getElementById('form-success');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  const originalBtnContent = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span>Sending...</span>`;

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnContent;
    if (window.lucide) window.lucide.createIcons();

    if (successBanner) {
      successBanner.classList.remove('hidden');
    }

    form.reset();
    showToast('Your message has been dispatched successfully!');
  }, 750);
}

/* -------------------------------------------------------------
   12. Toast Notifications
------------------------------------------------------------- */
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.remove('hidden');
  toast.classList.add('flex');

  setTimeout(() => {
    toast.classList.add('hidden');
    toast.classList.remove('flex');
  }, 3200);
}
