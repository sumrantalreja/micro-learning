/* ============================================================
   LEARNAI — App Logic & SPA Router
   ============================================================ */

/* ── State ── */
const state = {
  view: 'landing',
  cohortId: null,
  roleType: null,
  roleText: '',
  onboardingStep: 1,
  onboardingAnswers: {},
  pricingPeriod: 'monthly',
  activeLessonId: null,
  quizAnswered: false,
  openModuleId: null,
  activeTab: 'notes',
};

/* ── Role helpers ── */
const RECOMMENDED_MODULES = {
  grad:         ['g2', 'g3'],
  nontech:      ['n2', 'n3'],
  switcher:     ['s2', 's3'],
  entrepreneur: ['e2', 'e3'],
};

function inferCohortFromRole(type, roleText) {
  const r = roleText.toLowerCase();
  if (type === 'tech') {
    if (['student','graduate','intern','fresher','entry','fresh'].some(k => r.includes(k))) return 'grad';
    return 'switcher';
  }
  if (['founder','entrepreneur','startup','ceo','owner','solopreneur','co-founder'].some(k => r.includes(k))) return 'entrepreneur';
  return 'nontech';
}

function getRoleContext(cohortId, roleText) {
  const ctx = ROLE_CONTEXT[cohortId];
  if (!ctx) return null;
  if (ctx[roleText]) return ctx[roleText];
  const match = Object.keys(ctx).find(k =>
    k !== 'default' && roleText.toLowerCase().split(/[\s/]+/).some(w => w.length > 3 && k.toLowerCase().includes(w))
  );
  return ctx[match] || ctx.default;
}

/* ── Router ── */
function navigate(viewId, opts = {}) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById('view-' + viewId);
  if (target) target.classList.add('active');
  state.view = viewId;

  // Update nav active state
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const activeLink = document.querySelector(`.nav-link[data-view="${viewId}"]`);
  if (activeLink) activeLink.classList.add('active');

  // Show/hide nav actions
  updateNavbar(viewId);

  if (opts.cohortId) state.cohortId = opts.cohortId;

  // Render view-specific content
  if (viewId === 'dashboard') renderDashboard();
  if (viewId === 'lesson')    renderLesson(opts.lessonId);
  if (viewId === 'pricing')   renderPricing();
  if (viewId === 'metrics')   renderMetrics();
  if (viewId === 'onboarding') {
    if (!opts.keepState) { state.onboardingAnswers = {}; state.roleText = ''; }
    renderOnboarding(1);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateNavbar(viewId) {
  const authArea = document.getElementById('nav-auth');
  const userArea  = document.getElementById('nav-user');
  const isLoggedIn = ['dashboard','lesson'].includes(viewId);
  if (authArea) authArea.style.display = isLoggedIn ? 'none' : 'flex';
  if (userArea)  userArea.style.display  = isLoggedIn ? 'flex'  : 'none';
  // Close mobile nav on every navigation
  const mobileNav  = document.getElementById('mobile-nav');
  const hamburger  = document.getElementById('hamburger');
  if (mobileNav) mobileNav.classList.remove('open');
  if (hamburger) hamburger.classList.remove('open');
}

function toggleMobileNav() {
  const mobileNav = document.getElementById('mobile-nav');
  const hamburger = document.getElementById('hamburger');
  if (!mobileNav || !hamburger) return;
  mobileNav.classList.toggle('open');
  hamburger.classList.toggle('open');
}

/* ── LANDING ── */
function renderLanding() {
  const cohortGrid = document.getElementById('cohort-cards');
  if (!cohortGrid) return;
  cohortGrid.innerHTML = COHORTS.map(c => `
    <div class="cohort-card" onclick="startOnboarding('${c.id}')">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:0.5rem;margin-bottom:0.75rem">
        <div class="cohort-icon" style="background:${c.gradient}20;border:1px solid ${c.color}40;margin-bottom:0">${c.icon}</div>
        <span class="badge ${c.techRequired ? 'badge-tech' : 'badge-nocode'}">${c.techRequired ? '💻 Coding' : '🚫 No Code'}</span>
      </div>
      <h3>${c.title}</h3>
      <p>${c.desc}</p>
      <div class="cohort-tags">
        ${c.tags.map(t => `<span class="badge badge-blue">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');

  const tmGrid = document.getElementById('testimonials-grid');
  if (!tmGrid) return;
  tmGrid.innerHTML = TESTIMONIALS.map(t => `
    <div class="testimonial-card">
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text">${t.text}</p>
      <div class="testimonial-author">
        <div class="avatar" style="background:${t.color}22;color:${t.color}">${t.avatar}</div>
        <div>
          <div class="author-name">${t.name}</div>
          <div class="author-role">${t.role}</div>
        </div>
      </div>
    </div>
  `).join('');
}

function startOnboarding(cohortId) {
  state.cohortId = cohortId;
  state.onboardingAnswers = { cohort: cohortId };
  const cohort = COHORTS.find(c => c.id === cohortId);
  if (cohort) state.roleType = cohort.techRequired ? 'tech' : 'nontech';
  state.roleText = '';
  navigate('onboarding');
}

/* ── ONBOARDING ── */
const OB_QUESTIONS = [
  {
    step: 2,
    title: 'How much have you used AI so far?',
    sub: "Be honest — there's no wrong answer. We'll calibrate your starting point.",
    key: 'level',
    options: [
      { id:'beginner',     icon:'🌱', title:'Complete Beginner',  desc:"I've heard of AI but haven't really used it." },
      { id:'dabbler',      icon:'🔧', title:'Curious Dabbler',    desc:"I've tried ChatGPT and a few AI tools." },
      { id:'practitioner', icon:'⚙️', title:'Practitioner',      desc:'I use AI tools regularly at work.' },
      { id:'builder',      icon:'🏗️', title:'Builder',           desc:"I've built something with an AI API." },
    ]
  },
  {
    step: 3,
    title: "What's your primary goal?",
    sub: "We'll set the right milestones and unlock the right resources for you.",
    key: 'goal',
    options: [
      { id:'job',       icon:'💼', title:'Get a Job in AI',         desc:'I want to land a full-time AI role.' },
      { id:'upskill',   icon:'📈', title:'Upskill & Stay Relevant', desc:'I want to grow and future-proof my role.' },
      { id:'freelance', icon:'💻', title:'Freelance & Consult',     desc:'I want to offer AI services to clients.' },
      { id:'startup',   icon:'🚀', title:'Build My Own Product',    desc:'I want to launch an AI startup or tool.' },
    ]
  }
];

function renderOnboarding(step) {
  state.onboardingStep = step;
  const container = document.getElementById('ob-questions');
  if (!container) return;

  document.querySelectorAll('.progress-step').forEach((el, i) => {
    el.classList.remove('active','done');
    if (i + 1 < step)  el.classList.add('done');
    if (i + 1 === step) el.classList.add('active');
  });

  if (step === 1) {
    const suggestions = (state.roleType ? ROLE_SUGGESTIONS[state.roleType] : []) || [];
    container.innerHTML = `
      <div class="ob-question active" id="ob-q1">
        <h2 class="ob-title">Tell us about yourself</h2>
        <p class="ob-sub">We'll build your AI learning path around your actual role and goals.</p>

        <div class="role-type-toggle">
          <div class="role-type-card ${state.roleType === 'tech' ? 'selected' : ''}" onclick="selectRoleType('tech')">
            <span class="ob-option-icon">💻</span>
            <div>
              <h4>Tech Professional</h4>
              <p>Developer, Engineer, Analyst, Student…</p>
            </div>
          </div>
          <div class="role-type-card ${state.roleType === 'nontech' ? 'selected' : ''}" onclick="selectRoleType('nontech')">
            <span class="ob-option-icon">⚡</span>
            <div>
              <h4>Non-Tech Professional</h4>
              <p>Marketing, HR, Finance, Ops, Founder…</p>
            </div>
          </div>
        </div>

        <div id="role-input-area" style="${state.roleType ? '' : 'display:none'}">
          <div style="margin:1.5rem 0 0.5rem">
            <label style="font-size:0.875rem;font-weight:600;color:var(--text-secondary)">What's your current role?</label>
          </div>
          <input type="text" id="role-text-input" class="role-text-input"
                 placeholder="${state.roleType === 'tech' ? 'e.g. Software Engineer, Data Analyst…' : 'e.g. Marketing Manager, HR Manager…'}"
                 value="${state.roleText || ''}"
                 oninput="onRoleTextInput(this.value)" />
          <div class="role-chips">
            ${suggestions.map(r => `<span class="role-chip ${state.roleText === r ? 'active' : ''}" onclick="fillRole('${r.replace(/'/g, "\\'")}')">${r}</span>`).join('')}
          </div>
        </div>

        <div class="ob-nav">
          <div></div>
          <button class="btn btn-primary" id="ob-next-1" onclick="obNext(1)"
                  ${state.roleType && state.roleText && state.roleText.trim().length >= 2 ? '' : 'disabled'}>
            Next →
          </button>
        </div>
      </div>
    `;
    return;
  }

  const q = OB_QUESTIONS.find(x => x.step === step);
  if (!q) return;
  container.innerHTML = `
    <div class="ob-question active" id="ob-q${q.step}">
      <h2 class="ob-title">${q.title}</h2>
      <p class="ob-sub">${q.sub}</p>
      <div class="ob-options">
        ${q.options.map(o => `
          <div class="ob-option ${state.onboardingAnswers[q.key] === o.id ? 'selected' : ''}"
               data-key="${q.key}" data-val="${o.id}"
               onclick="selectOBOption('${q.key}','${o.id}',${q.step})">
            <span class="ob-option-icon">${o.icon}</span>
            <div class="ob-option-text">
              <h4>${o.title}</h4>
              <p>${o.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="ob-nav">
        <button class="btn btn-outline" onclick="renderOnboarding(${q.step - 1})">← Back</button>
        ${q.step < 3
          ? `<button class="btn btn-primary" id="ob-next-${q.step}" onclick="obNext(${q.step})" ${state.onboardingAnswers[q.key] ? '' : 'disabled'}>Next →</button>`
          : `<button class="btn btn-primary" id="ob-next-${q.step}" onclick="obFinish()" ${state.onboardingAnswers[q.key] ? '' : 'disabled'}>Build My Path 🚀</button>`
        }
      </div>
    </div>
  `;
}

function selectRoleType(type) {
  state.roleType = type;
  state.roleText = '';
  renderOnboarding(1);
}

function onRoleTextInput(val) {
  state.roleText = val;
  const btn = document.getElementById('ob-next-1');
  if (btn) btn.disabled = !(state.roleType && val.trim().length >= 2);
  document.querySelectorAll('.role-chip').forEach(chip => {
    chip.classList.toggle('active', chip.textContent === val);
  });
}

function fillRole(roleName) {
  state.roleText = roleName;
  const input = document.getElementById('role-text-input');
  if (input) input.value = roleName;
  document.querySelectorAll('.role-chip').forEach(chip => {
    chip.classList.toggle('active', chip.textContent === roleName);
  });
  const btn = document.getElementById('ob-next-1');
  if (btn) btn.removeAttribute('disabled');
}

function selectOBOption(key, val, step) {
  state.onboardingAnswers[key] = val;
  document.querySelectorAll(`.ob-option[data-key="${key}"]`).forEach(el => {
    el.classList.toggle('selected', el.dataset.val === val);
  });
  const nextBtn = document.getElementById(`ob-next-${step}`);
  if (nextBtn) nextBtn.removeAttribute('disabled');
}

function obNext(step) {
  if (step === 1) {
    if (!state.roleType || !state.roleText || state.roleText.trim().length < 2) {
      showToast('Please select your role type and enter your role.', 'error');
      return;
    }
    state.cohortId = inferCohortFromRole(state.roleType, state.roleText);
    state.onboardingAnswers.cohort = state.cohortId;
    renderOnboarding(2);
    return;
  }
  const q = OB_QUESTIONS.find(x => x.step === step);
  if (!q || !state.onboardingAnswers[q.key]) {
    showToast('Please select an option to continue.', 'error');
    return;
  }
  renderOnboarding(step + 1);
}

function obFinish() {
  if (!state.onboardingAnswers['goal']) {
    showToast('Please select your goal.', 'error');
    return;
  }
  showToast('🎉 Your personalised path is ready!', 'success');
  setTimeout(() => navigate('dashboard'), 600);
}

/* ── DASHBOARD ── */
function renderDashboard() {
  const cohort = COHORTS.find(c => c.id === state.cohortId) || COHORTS[0];

  // Welcome banner
  const wb = document.getElementById('welcome-banner');
  if (wb) {
    const roleLabel = state.roleText ? ` · <span style="color:var(--blue-bright)">${state.roleText}</span>` : '';
    wb.innerHTML = `
      <div class="welcome-text">
        <h2>Welcome back 👋${roleLabel}</h2>
        <p>${cohort.tagline} &mdash; You're on track. Keep it up!</p>
      </div>
      <div class="streak-badge">
        <div class="streak-fire">🔥</div>
        <div class="streak-num">5</div>
        <div class="streak-label">Day Streak</div>
      </div>
    `;
  }

  // Role context card
  const roleCtxEl = document.getElementById('role-context-card');
  if (roleCtxEl) {
    if (state.roleText) {
      const ctx = getRoleContext(cohort.id, state.roleText);
      if (ctx) {
        roleCtxEl.style.display = 'flex';
        roleCtxEl.innerHTML = `
          <div style="font-size:1.5rem;flex-shrink:0">🎯</div>
          <div>
            <div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--blue-bright);margin-bottom:0.2rem">${ctx.tag}</div>
            <h4 style="margin-bottom:0.2rem;font-size:0.95rem">Learning AI to <span style="color:var(--text-primary)">${ctx.why}</span></h4>
            <p style="font-size:0.825rem;margin:0">Your path is focused on <strong style="color:var(--text-primary)">${ctx.focus}</strong> — the highest-leverage AI skills for a ${state.roleText}.</p>
          </div>
        `;
      } else {
        roleCtxEl.style.display = 'none';
      }
    } else {
      roleCtxEl.style.display = 'none';
    }
  }

  // Progress
  const totalLessons = cohort.modules.reduce((a, m) => a + m.lessons.length, 0);
  const doneLessons  = cohort.modules.reduce((a, m) => a + m.lessons.filter(l => l.done).length, 0);
  const pct = Math.round((doneLessons / totalLessons) * 100);

  const po = document.getElementById('progress-overview');
  if (po) {
    po.innerHTML = `
      <div class="dashboard-section-title">📊 Overall Progress — ${cohort.path}</div>
      <div class="progress-bar-wrap">
        <div class="progress-bar-label">
          <span>${doneLessons} of ${totalLessons} lessons complete</span>
          <span style="color:var(--blue-bright);font-weight:700">${pct}%</span>
        </div>
        <div class="progress-bar-track">
          <div class="progress-bar-fill" id="main-progress-fill" style="width:0%"></div>
        </div>
      </div>
    `;
    setTimeout(() => {
      const fill = document.getElementById('main-progress-fill');
      if (fill) fill.style.width = pct + '%';
    }, 100);
  }

  // Modules — free modules open by default, locked ones show paywall banner
  const ml = document.getElementById('modules-list');
  if (ml) {
    const paidMods  = cohort.modules.filter(m => !m.free);
    const paidTotal = paidMods.reduce((a,m) => a + m.lessons.length, 0);
    const paidMins  = paidMods.reduce((a,m) => a + m.lessons.reduce((b,l) => b + parseInt(l.dur), 0), 0);

    const recommended = RECOMMENDED_MODULES[cohort.id] || [];
    const moduleCards = cohort.modules.map((mod, mi) => {
      const modDone  = mod.lessons.filter(l => l.done).length;
      const modTotal = mod.lessons.length;
      const modPct   = Math.round((modDone / modTotal) * 100);
      const isOpen   = state.openModuleId === mod.id || mi === 0;
      const isRecommended = state.roleText && recommended.includes(mod.id);

      return `
        <div class="module-card${isRecommended ? ' module-recommended' : ''}" id="mod-${mod.id}">
          <div class="module-header" onclick="toggleModule('${mod.id}')">
            <div class="module-icon" style="background:${mod.color}20;border:1px solid ${mod.color}40">${mod.icon}</div>
            <div class="module-info">
              <div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.25rem">
                <h4 style="margin:0">${mod.title}</h4>
                ${isRecommended ? `<span class="badge badge-purple" style="font-size:0.65rem">🎯 For your role</span>` : ''}
              </div>
              <p style="margin:0">${modDone}/${modTotal} lessons · ${mod.lessons.reduce((a,l) => a + parseInt(l.dur), 0)} min total</p>
            </div>
            <div class="module-meta">
              ${mod.free
                ? `<span class="badge badge-green">FREE</span>`
                : `<span class="badge badge-lock">🔒 PRO</span>`}
              <span style="font-size:0.8rem;color:var(--text-muted)">${mod.free ? modPct + '%' : 'Locked'}</span>
            </div>
          </div>
          <div class="lessons-list ${isOpen ? 'open' : ''}" id="lessons-${mod.id}">
            ${mod.lessons.map(lesson => {
              const done  = lesson.done;
              const free  = lesson.free;
              const statusClass = free ? (done ? 'done' : 'current') : 'lock';
              const statusIcon  = done ? '✓' : (free ? '▶' : '🔒');
              return `
                <div class="lesson-item ${free ? '' : 'locked'}"
                     onclick="${free ? `goToLesson('${lesson.id}','${mod.id}')` : `showUpgradeModal()`}">
                  <div class="lesson-status ${statusClass}">${statusIcon}</div>
                  <span class="lesson-title">${lesson.title}</span>
                  <span class="lesson-duration">${lesson.dur}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');

    // Paywall banner between free and paid modules
    const paywallBanner = `
      <div id="paywall-banner" style="
        background:linear-gradient(135deg,#1A1040,#0D1F3C);
        border:1px solid rgba(139,92,246,0.35);
        border-radius:var(--radius-lg);
        padding:1.75rem 2rem;
        display:flex;align-items:center;justify-content:space-between;gap:1.5rem;
        flex-wrap:wrap;
      ">
        <div>
          <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem">
            <span style="font-size:1.25rem">🔒</span>
            <span style="font-weight:700;font-size:1rem">You've completed your free preview</span>
          </div>
          <p style="font-size:0.875rem;margin:0;color:var(--text-secondary)">
            <strong style="color:var(--text-primary)">${paidMods.length} more modules · ${paidTotal} lessons · ${paidMins} min of content</strong>
            are waiting. 847 learners in your cohort upgraded this month.
          </p>
        </div>
        <button class="btn btn-primary" onclick="navigate('pricing')" style="white-space:nowrap;flex-shrink:0">
          Unlock All Modules →
        </button>
      </div>
    `;

    ml.innerHTML = moduleCards.replace(
      `<div class="module-card" id="mod-${paidMods[0]?.id}">`,
      paywallBanner + `<div class="module-card" id="mod-${paidMods[0]?.id}">`
    );
  }

  // Sidebar — outcome-focused upgrade card
  const sc = document.getElementById('sidebar-upgrade');
  if (sc) {
    const outcomeMap = {
      grad:        { outcome: 'land an AI job', stat: '3 of your cohort got hired this week' },
      nontech:     { outcome: 'automate your workflow', stat: 'Avg Pro learner saves 6 hrs/week' },
      switcher:    { outcome: 'become an AI engineer', stat: 'Median salary jump: +40%' },
      entrepreneur:{ outcome: 'ship your AI product', stat: '12 founders launched this month' },
    };
    const oc = outcomeMap[cohort.id] || outcomeMap.grad;
    const lockedCount = cohort.modules.filter(m => !m.free).reduce((a,m) => a + m.lessons.length, 0);

    sc.innerHTML = `
      <div class="upgrade-card sidebar-card">
        <div style="font-size:0.75rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#A78BFA;margin-bottom:0.75rem">You're ${doneLessons} lessons in</div>
        <h3 style="font-size:1rem;margin-bottom:0.4rem">You're ${pct}% of the way to <span style="color:#A78BFA">${oc.outcome}</span></h3>
        <p style="font-size:0.8rem;margin-bottom:1rem">${oc.stat}. Unlock ${lockedCount} more lessons to complete your path.</p>
        <div style="background:var(--bg-secondary);border-radius:var(--radius-sm);padding:0.875rem;margin-bottom:1rem;font-size:0.8rem">
          <div style="display:flex;justify-content:space-between;margin-bottom:0.4rem">
            <span style="color:var(--text-muted)">Path completion (free)</span>
            <span style="color:var(--blue-bright);font-weight:700">${pct}%</span>
          </div>
          <div style="height:6px;background:var(--border);border-radius:3px;margin-bottom:0.75rem">
            <div style="width:${pct}%;height:100%;background:var(--gradient-blue);border-radius:3px"></div>
          </div>
          <div style="color:var(--text-muted)">🔒 ${lockedCount} lessons locked behind Pro</div>
        </div>
        <button class="btn btn-primary w-full" onclick="navigate('pricing')">Unlock Full Path — ₹1,499/mo</button>
        <p style="font-size:0.72rem;text-align:center;margin-top:0.6rem;color:var(--text-muted)">7-day free trial · Cancel anytime</p>
      </div>
    `;
  }

  // Achievements
  const ach = document.getElementById('sidebar-achievements');
  if (ach) {
    ach.innerHTML = `
      <div class="sidebar-card">
        <div class="dashboard-section-title">🏆 Achievements</div>
        <div class="achievements-grid">
          ${[
            { icon:'🔥', label:'5-day streak',  earned:true  },
            { icon:'📚', label:'First lesson',  earned:true  },
            { icon:'⭐', label:'Quiz ace',       earned:true  },
            { icon:'🎯', label:'Path set',       earned:true  },
            { icon:'🤝', label:'Community',      earned:false },
            { icon:'🏅', label:'Module done',    earned:false },
          ].map(a => `
            <div class="achievement-item" style="${a.earned ? '' : 'opacity:0.35'}">
              <div class="achievement-icon">${a.icon}</div>
              <div class="achievement-label">${a.label}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

function toggleModule(modId) {
  const list = document.getElementById('lessons-' + modId);
  if (!list) return;
  const isOpen = list.classList.contains('open');
  document.querySelectorAll('.lessons-list').forEach(l => l.classList.remove('open'));
  if (!isOpen) list.classList.add('open');
  state.openModuleId = isOpen ? null : modId;
}

function goToLesson(lessonId, moduleId) {
  state.activeLessonId = lessonId;
  state.activeModuleId = moduleId;
  navigate('lesson', { lessonId });
}

/* ── LESSON VIEW ── */
function renderLesson(lessonId) {
  const cohort = COHORTS.find(c => c.id === state.cohortId) || COHORTS[0];
  let lesson = null, module = null;
  for (const mod of cohort.modules) {
    const l = mod.lessons.find(x => x.id === lessonId);
    if (l) { lesson = l; module = mod; break; }
  }
  if (!lesson) {
    // fallback to first free lesson
    module = cohort.modules[1];
    lesson = module.lessons[0];
  }

  // Header
  const lh = document.getElementById('lesson-header-info');
  if (lh) {
    lh.innerHTML = `
      <div>
        <div class="text-muted" style="font-size:0.8rem;margin-bottom:0.2rem">${module.icon} ${module.title}</div>
        <h2 style="font-size:1.25rem">${lesson.title}</h2>
      </div>
      <span class="badge badge-blue">${lesson.dur}</span>
    `;
  }

  // Video player
  const vp = document.getElementById('video-player-area');
  if (vp) {
    vp.innerHTML = `
      <div class="video-player">
        <div class="video-bg">
          <div class="play-btn" onclick="this.innerHTML='⏸';this.style.background='var(--green)'">▶</div>
          <div class="video-title">${lesson.title}</div>
        </div>
        <div class="video-controls">
          <div class="video-progress-bar" onclick="seekVideo(event, this)">
            <div class="video-progress-fill" id="vp-fill"></div>
          </div>
          <div class="video-controls-row">
            <div style="display:flex;gap:0.75rem;align-items:center">
              <button class="ctrl-btn">⏮</button>
              <button class="ctrl-btn">▶</button>
              <button class="ctrl-btn">⏭</button>
              <span class="video-time">3:12 / ${lesson.dur.replace(' min','').trim()}:00</span>
            </div>
            <div style="display:flex;gap:0.75rem;align-items:center">
              <button class="ctrl-btn">🔊</button>
              <button class="ctrl-btn">⛶</button>
              <span style="font-size:0.8rem;color:rgba(255,255,255,0.6)">1x</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Lesson notes tab
  const notes = document.getElementById('lesson-notes');
  if (notes) {
    notes.innerHTML = `
      <div class="lesson-notes">
        <p>In this lesson, you'll learn the core concepts behind <strong style="color:var(--text-primary)">${lesson.title}</strong>.
        By the end, you'll be able to apply these ideas in real-world scenarios.</p>

        <h4>Key Concepts Covered</h4>
        <ul>
          <li>The fundamental theory and intuition behind the topic</li>
          <li>Common patterns and practical implementation tips</li>
          <li>How this fits into the broader AI/ML ecosystem</li>
          <li>Gotchas and best practices from industry practitioners</li>
        </ul>

        <h4>Why It Matters</h4>
        <p>Understanding these foundations will directly improve your ability to build robust AI systems and
        communicate effectively in technical interviews and team settings.</p>

        <h4>Resources</h4>
        <ul>
          <li>📄 Lesson PDF — downloadable cheatsheet</li>
          <li>🔗 Paper: "Attention Is All You Need" (Vaswani et al., 2017)</li>
          <li>💻 Colab notebook — follow along with code</li>
        </ul>
      </div>
    `;
  }

  // Quiz
  const quizArea = document.getElementById('lesson-quiz');
  if (quizArea) {
    state.quizAnswered = false;
    quizArea.innerHTML = `
      <div class="quiz-container">
        <p class="quiz-question">Q: ${QUIZ.question}</p>
        <div class="quiz-options">
          ${QUIZ.options.map((opt, i) => `
            <div class="quiz-option" onclick="answerQuiz(${i})">${opt}</div>
          `).join('')}
        </div>
        <div class="quiz-result" id="quiz-result"></div>
      </div>
    `;
  }

  // Lesson outline sidebar
  renderLessonOutline(cohort, lesson);

  // Key concepts
  const kc = document.getElementById('key-concepts');
  if (kc) {
    const tags = ['Transformers','Self-Attention','LLMs','Neural Networks','Embeddings','Fine-tuning','Inference'];
    kc.innerHTML = tags.map(t => `<span class="concept-tag">${t}</span>`).join('');
  }

  // Next lesson button
  const nextBtn = document.getElementById('next-lesson-btn');
  if (nextBtn) {
    const allLessons = cohort.modules.flatMap(m => m.lessons);
    const curIdx = allLessons.findIndex(l => l.id === lesson.id);
    const nextLesson = allLessons[curIdx + 1];
    if (nextLesson) {
      nextBtn.innerHTML = nextLesson.free
        ? `Next: ${nextLesson.title} →`
        : `🔒 Unlock Next: ${nextLesson.title}`;
      nextBtn.onclick = nextLesson.free
        ? () => renderLesson(nextLesson.id)
        : showUpgradeModal;
      nextBtn.className = nextLesson.free ? 'btn btn-primary' : 'btn btn-ghost';
    } else {
      nextBtn.innerHTML = '✓ Module Complete — Unlock More';
      nextBtn.className = 'btn btn-coral';
      nextBtn.onclick = () => navigate('pricing');
    }
  }
}

function renderLessonOutline(cohort, currentLesson) {
  const ol = document.getElementById('lesson-outline');
  if (!ol) return;
  const module = cohort.modules.find(m => m.lessons.some(l => l.id === currentLesson.id));
  if (!module) return;
  ol.innerHTML = `
    <h4>${module.icon} ${module.title}</h4>
    ${module.lessons.map((l, i) => `
      <div class="outline-item ${l.id === currentLesson.id ? 'active' : ''} ${l.free ? '' : 'locked'}"
           onclick="${l.free ? `renderLesson('${l.id}')` : 'showUpgradeModal()'}">
        <div class="outline-num">${l.free ? (i+1) : '🔒'}</div>
        <span class="outline-title">${l.title}</span>
        <span class="outline-dur">${l.dur}</span>
      </div>
    `).join('')}
  `;
}

function answerQuiz(idx) {
  if (state.quizAnswered) return;
  state.quizAnswered = true;
  const isCorrect = idx === QUIZ.correct;
  document.querySelectorAll('.quiz-option').forEach((opt, i) => {
    if (i === QUIZ.correct) opt.classList.add('correct');
    else if (i === idx && !isCorrect) opt.classList.add('wrong');
  });
  const result = document.getElementById('quiz-result');
  if (result) {
    result.className = `quiz-result show ${isCorrect ? 'success' : 'fail'}`;
    result.innerHTML = isCorrect
      ? `✓ Correct! ${QUIZ.explanation}`
      : `✗ Not quite. ${QUIZ.explanation}`;
  }
  if (isCorrect) showToast('🎉 Quiz passed! +10 XP', 'success');
}

function seekVideo(e, track) {
  const rect = track.getBoundingClientRect();
  const pct  = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
  const fill  = document.getElementById('vp-fill');
  if (fill) fill.style.width = pct + '%';
}

function switchTab(tabId) {
  document.querySelectorAll('.lesson-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  const tab = document.getElementById('tab-' + tabId);
  const content = document.getElementById('tc-' + tabId);
  if (tab) tab.classList.add('active');
  if (content) content.classList.add('active');
  state.activeTab = tabId;
}

/* ── PRICING ── */
function renderPricing() {
  const grid = document.getElementById('pricing-cards');
  if (!grid) return;
  const isAnnual = state.pricingPeriod === 'annual';

  grid.innerHTML = PLANS.map(p => `
    <div class="pricing-card ${p.popular ? 'popular' : ''}">
      ${p.popular ? '<div class="popular-label">⭐ Most Popular</div>' : ''}
      <div class="plan-name">${p.name}</div>
      <div class="plan-price">
        ${p.monthly === 0
          ? '<span class="price-amount">Free</span>'
          : `<span class="price-amount">₹${isAnnual ? (p.annual*83).toFixed(0) : (p.monthly*83).toFixed(0)}</span>
             <span class="price-period">/mo</span>`
        }
      </div>
      ${p.monthly !== 0 && isAnnual ? `<div style="font-size:0.8rem;color:var(--green);margin-bottom:0.5rem">Billed ₹${(p.annual*83*12).toFixed(0)}/yr — save ${Math.round((1-(p.annual/p.monthly))*100)}%</div>` : ''}
      <p class="plan-desc">${p.desc}</p>
      <ul class="plan-features">
        ${p.features.map(f => `
          <li>
            <span class="feat-icon ${f.yes ? 'feat-yes' : 'feat-no'}">${f.yes ? '✓' : '✗'}</span>
            <span style="${f.yes ? '' : 'color:var(--text-muted);text-decoration:line-through'}">${f.text}</span>
          </li>
        `).join('')}
      </ul>
      <button class="btn ${p.ctaStyle} w-full" onclick="selectPlan('${p.id}')">${p.cta}</button>
    </div>
  `).join('');
}

function selectPlan(planId) {
  if (planId === 'free') {
    navigate('dashboard');
    showToast('Welcome to LearnAI Free!', 'success');
  } else {
    showToast(`🚀 Starting 7-day free trial for ${planId.toUpperCase()}...`, 'success');
    setTimeout(() => navigate('dashboard'), 1000);
  }
}

function togglePricing(period) {
  state.pricingPeriod = period;
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.period === period);
  });
  renderPricing();
}

/* ── METRICS ── */
function renderMetrics() {
  // KPI cards
  const kpiGrid = document.getElementById('kpi-grid');
  if (kpiGrid) {
    const kpis = [
      { label:'Weekly Active Learners', value:'12,480', change:'+18%', up:true, color:'var(--blue)' },
      { label:'Free → Paid Conversion', value:'6.4%',   change:'+0.8pp', up:true, color:'var(--green)' },
      { label:'Avg Lessons / Week',     value:'4.2',    change:'+0.6', up:true, color:'var(--purple)' },
      { label:'Monthly Churn',          value:'3.1%',   change:'-0.4pp', up:false, color:'var(--orange)' },
    ];
    kpiGrid.innerHTML = kpis.map(k => `
      <div class="kpi-card">
        <div class="kpi-label">${k.label}</div>
        <div class="kpi-value" style="color:${k.color}">${k.value}</div>
        <div class="kpi-change ${k.up ? 'up' : 'down'}">
          ${k.up ? '↑' : '↓'} ${k.change} vs last month
        </div>
      </div>
    `).join('');
  }

  // Funnel
  const funnel = document.getElementById('funnel-chart');
  if (funnel) {
    const funnelData = [
      { label:'Visitors',         count:'84,200', pct:100, color:'var(--blue)',   conv:'' },
      { label:'Signed Up',        count:'21,050', pct:25,  color:'var(--purple)', conv:'25% of visitors' },
      { label:'Completed Free Lesson', count:'13,460', pct:64, color:'var(--cyan)',  conv:'64% of signups' },
      { label:'Hit Paywall',      count:'5,384',  pct:40,  color:'var(--orange)', conv:'40% of activated' },
      { label:'Upgraded to Pro',  count:'1,350',  pct:25,  color:'var(--green)',  conv:'25% of paywall hits' },
    ];
    funnel.innerHTML = `
      <div class="funnel-bars">
        ${funnelData.map(f => `
          <div class="funnel-row">
            <div class="funnel-label-row">
              <span>${f.label}</span>
              <span style="color:var(--text-primary);font-weight:600">${f.count} ${f.conv ? `<span style="color:var(--text-muted);font-weight:400;font-size:0.8rem">(${f.conv})</span>` : ''}</span>
            </div>
            <div class="funnel-bar-track">
              <div class="funnel-bar-fill" style="width:0%;background:${f.color}" data-width="${f.pct}%"></div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    setTimeout(() => {
      document.querySelectorAll('.funnel-bar-fill').forEach(el => {
        el.style.width = el.dataset.width;
      });
    }, 150);
  }

  // Cohort breakdown
  const cohortChart = document.getElementById('cohort-chart');
  if (cohortChart) {
    const cohortData = [
      { label:'Career Switcher',        pct:34, color:'#8B5CF6' },
      { label:'Working Professional',   pct:28, color:'#10B981' },
      { label:'Fresh Graduate',         pct:24, color:'#3B82F6' },
      { label:'Entrepreneur',           pct:14, color:'#F97316' },
    ];
    cohortChart.innerHTML = `
      <div class="cohort-breakdown">
        ${cohortData.map(c => `
          <div class="cohort-row">
            <div class="cohort-dot" style="background:${c.color}"></div>
            <span class="cohort-name">${c.label}</span>
            <div class="cohort-bar">
              <div class="cohort-bar-fill" style="width:${c.pct}%;background:${c.color}"></div>
            </div>
            <span class="cohort-pct" style="color:${c.color}">${c.pct}%</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  // North star metrics
  const ns = document.getElementById('north-star');
  if (ns) {
    ns.innerHTML = `
      <h2 style="margin-bottom:0.25rem">North Star Metrics</h2>
      <p style="margin-bottom:0">The two metrics that matter most — engagement and monetisation health.</p>
      <div class="north-star-grid">
        <div class="ns-card">
          <div class="ns-icon">⚡</div>
          <div class="ns-value">12,480</div>
          <div class="ns-label">Weekly Active Learners (WAL)</div>
          <p class="ns-desc">Users who complete at least 1 lesson per week. Primary indicator of product engagement and content quality. Target: 50K by Q4.</p>
        </div>
        <div class="ns-card">
          <div class="ns-icon">💎</div>
          <div class="ns-value">6.4%</div>
          <div class="ns-label">Free → Paid Conversion Rate</div>
          <p class="ns-desc">% of free users who upgrade to Pro within 30 days of first paywall hit. Measures freemium model health. Industry benchmark: 3–5%.</p>
        </div>
      </div>
    `;
  }
}

/* ── UPGRADE MODAL ── */
function showUpgradeModal() {
  const modal = document.getElementById('upgrade-modal');
  if (modal) modal.classList.add('open');
}
function closeUpgradeModal() {
  const modal = document.getElementById('upgrade-modal');
  if (modal) modal.classList.remove('open');
}

/* ── TOAST ── */
function showToast(msg, type = 'success') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.className = `toast ${type}`;
  void toast.offsetWidth; // force reflow
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  renderLanding();
  navigate('landing');

  // Close modal on overlay click
  document.getElementById('upgrade-modal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeUpgradeModal();
  });
});
