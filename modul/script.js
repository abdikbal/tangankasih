// PROSES: MODUL INTERAKTIF & KUIS
let currentActiveModule = null;
let currentQuizIndex = 0;
let userAnswers = {};

function loadModule(moduleId) {
    currentActiveModule = modules.find(m => m.id === moduleId);
    if (!currentActiveModule) return;

    currentQuizIndex = 0;
    userAnswers = {};

    // Render Header
    const header = document.getElementById('module-header-bg');
    header.className = `p-8 text-white relative rounded-t-3xl bg-gradient-to-r ${currentActiveModule.color}`;
    document.getElementById('module-category-badge').innerText = `${currentActiveModule.category} • Tingkat ${currentActiveModule.level}`;
    document.getElementById('module-title-display').innerText = currentActiveModule.title;
    document.getElementById('module-desc-display').innerText = currentActiveModule.description;
    document.getElementById('module-content-body').innerHTML = currentActiveModule.content;

    renderQuiz();
}

function renderQuiz() {
    const quiz = currentActiveModule.quizzes[currentQuizIndex];
    const total = currentActiveModule.quizzes.length;

    document.getElementById('quiz-progress-text').innerText = `Soal ${currentQuizIndex + 1} dari ${total}`;
    document.getElementById('quiz-question').innerText = quiz.question;

    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';

    const feedbackBox = document.getElementById('quiz-feedback');
    feedbackBox.classList.add('hidden');

    quiz.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = `option-btn w-full text-left p-4 rounded-2xl border-2 font-semibold text-slate-700 transition-all flex items-center justify-between ${userAnswers[currentQuizIndex] === idx ? 'border-brand-blue bg-blue-50' : 'border-slate-200 bg-white hover:border-slate-300'}`;

        btn.innerHTML = `
            <span>${opt}</span>
            <i class="fa-regular fa-circle text-slate-300"></i>
        `;
        btn.onclick = () => selectOption(idx);
        optionsContainer.appendChild(btn);
    });

    // Update Navigation state
    if (userAnswers[currentQuizIndex] !== undefined) applyAnswer(userAnswers[currentQuizIndex], false);

    document.getElementById('prev-question-btn').disabled = currentQuizIndex === 0;
    document.getElementById('next-question-btn').innerText = (currentQuizIndex === total - 1) ? 'Selesaikan Kuis 🎉' : 'Selanjutnya';
}

function selectOption(optionIndex) {
    if (userAnswers[currentQuizIndex] !== undefined) return; // jawaban terkunci
    userAnswers[currentQuizIndex] = optionIndex;
    applyAnswer(optionIndex, true);
}

function applyAnswer(optionIndex, withSound) {
    const quiz = currentActiveModule.quizzes[currentQuizIndex];
    const feedbackBox = document.getElementById('quiz-feedback');
    if (optionIndex === quiz.correct) {
        if (withSound) playAudioTone(587.33, 'sine');
        feedbackBox.className = 'p-4 rounded-2xl font-fun font-bold text-center text-sm bg-emerald-100 text-emerald-800 border border-emerald-200 block';
        feedbackBox.innerHTML = '<i class="fa-solid fa-circle-check mr-2"></i>Hebat! Jawabanmu Tepat Sekali ⭐';
    } else {
        if (withSound) playAudioTone(220, 'sawtooth');
        feedbackBox.className = 'p-4 rounded-2xl font-fun font-bold text-center text-sm bg-rose-100 text-rose-800 border border-rose-200 block';
        feedbackBox.innerHTML = '<i class="fa-solid fa-circle-xmark mr-2"></i>Hampir Benar, Jawaban yang tepat ditandai hijau ya!';
    }
    renderQuizOptionsHighlight(optionIndex, quiz.correct);
}

function renderQuizOptionsHighlight(selected, correct) {
    const btns = document.querySelectorAll('.option-btn');
    btns.forEach((btn, idx) => {
        if (idx === correct) {
            btn.className = 'option-btn w-full text-left p-4 rounded-2xl border-2 font-semibold transition-all flex items-center justify-between border-emerald-500 bg-emerald-50 text-emerald-800';
        } else if (idx === selected && selected !== correct) {
            btn.className = 'option-btn w-full text-left p-4 rounded-2xl border-2 font-semibold transition-all flex items-center justify-between border-rose-400 bg-rose-50 text-rose-800';
        } else {
            btn.className = 'option-btn w-full text-left p-4 rounded-2xl border-2 font-semibold text-slate-400 bg-white opacity-60';
        }
    });
}

function nextQuestion() {
    if (userAnswers[currentQuizIndex] === undefined) {
        const fb = document.getElementById('quiz-feedback');
        fb.className = 'p-4 rounded-2xl font-fun font-bold text-center text-sm bg-amber-100 text-amber-800 border border-amber-200 block';
        fb.innerHTML = 'Pilih satu jawaban dulu ya 😊';
        return;
    }
    const total = currentActiveModule.quizzes.length;
    if (currentQuizIndex < total - 1) {
        currentQuizIndex++;
        renderQuiz();
    } else {
        finishQuiz();
    }
}

function prevQuestion() {
    if (currentQuizIndex > 0) {
        currentQuizIndex--;
        renderQuiz();
    }
}

function finishQuiz() {
    // Calculate Score
    let correctCount = 0;
    currentActiveModule.quizzes.forEach((q, idx) => {
        if (userAnswers[idx] === q.correct) correctCount++;
    });

    const scorePercent = Math.round((correctCount / currentActiveModule.quizzes.length) * 100);

    // Update User Profile Stars & Scores
    const doneKey = currentUser.id + ':' + currentActiveModule.id;
    const firstTime = !completedModules[doneKey];
    completedModules[doneKey] = true;
    if (firstTime) currentUser.stars += 20;
    currentUser.scores[currentActiveModule.category] = Math.max(currentUser.scores[currentActiveModule.category], scorePercent);

    persist();
    updateProfileUI();

    alert(`Selamat! Kamu menyelesaikan Kuis ${currentActiveModule.title}.\nSkor Kamu: ${scorePercent}%\n${firstTime ? 'Kamu mendapatkan +20 Bintang! ⭐' : 'Modul ini sudah pernah diselesaikan, bintang tidak bertambah.'}`);
    switchView('recommendations');
}

function playAudioTone(freq, type) {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.3);
        osc.stop(ctx.currentTime + 0.35);
    } catch(e) {
        // Audio Context fallback silent
    }
}

// Modul dipilih lewat alamat: modul/index.html?id=mod-1
const moduleId = new URLSearchParams(location.search).get('id');
if (moduleId && modules.some(m => m.id === moduleId)) {
    loadModule(moduleId);
} else {
    alert('Modul tidak ditemukan. Kamu akan kembali ke Beranda.');
    switchView('dashboard');
}
