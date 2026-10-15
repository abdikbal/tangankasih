// PROSES: ANALISIS & REKOMENDASI PINTAR

function renderSmartRecommendationsPage() {
    // Find Strongest & Weakest Category
    let bestCat = 'Matematika';
    let worstCat = 'Sains';
    let maxScore = -1;
    let minScore = 101;

    for (const [cat, score] of Object.entries(currentUser.scores)) {
        if (score > maxScore) {
            maxScore = score;
            bestCat = cat;
        }
        if (score < minScore) {
            minScore = score;
            worstCat = cat;
        }
    }

    document.getElementById('user-strength-text').innerText = `${bestCat} (${maxScore}%)`;
    document.getElementById('user-weakness-text').innerText = `${worstCat} (${minScore}%)`;
    document.getElementById('user-recommended-level').innerText = `Modul Tingkat ${currentUser.level}`;

    // Recommended Items List
    const listContainer = document.getElementById('smart-recommendation-list');
    const rec = getRecommendedModules();

    listContainer.innerHTML = `
        <div class="p-4 rounded-2xl border-2 border-brand-yellow/50 bg-amber-50/50 flex items-center justify-between">
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-xl bg-amber-400 text-white flex items-center justify-center font-bold">1</div>
                <div>
                    <div class="font-bold text-slate-800">${rec.primary.title}</div>
                    <div class="text-xs text-slate-500">Materi ${rec.primary.category} untuk meningkatkan pemahaman area fokus.</div>
                </div>
            </div>
            <button onclick="openModule('${rec.primary.id}')" class="px-4 py-2 bg-brand-yellow text-slate-900 font-bold font-fun rounded-xl text-xs hover:bg-amber-300">
                Mulai Modul Ini
            </button>
        </div>
    `;
}

function onUserChange() {
    renderSmartRecommendationsPage();
}

renderSmartRecommendationsPage();
