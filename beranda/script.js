// PROSES: BERANDA BELAJAR (rekomendasi + daftar modul + filter)

function scrollToRecommendations() {
    document.getElementById('recommendation-section').scrollIntoView({ behavior: 'smooth' });
}

function renderDashboard() {
    const rec = getRecommendedModules();
    const recContainer = document.getElementById('recommendation-cards-container');

    // Render Recommendation Banner Card
    recContainer.innerHTML = `
        <div class="bg-gradient-to-r from-amber-400 to-orange-400 rounded-3xl p-6 text-white shadow-lg flex flex-col justify-between space-y-4 bouncy-hover">
            <div class="space-y-2">
                <div class="flex items-center justify-between">
                    <span class="bg-white/30 text-white font-bold text-xs px-3 py-1 rounded-full uppercase">Rekomendasi Utama</span>
                    <span class="text-xs bg-amber-900/20 px-2 py-1 rounded-md font-semibold">Prioritas Belajar</span>
                </div>
                <h3 class="text-2xl font-bold font-fun">${rec.primary.title}</h3>
                <p class="text-amber-50 text-xs">${rec.primary.description}</p>
            </div>
            <div class="flex items-center justify-between pt-2">
                <div class="text-xs font-bold bg-white/20 px-3 py-1 rounded-lg">
                    <i class="fa-solid fa-bullseye mr-1"></i>Sesuai Evaluasi ${rec.targetCategory}
                </div>
                <button onclick="openModule('${rec.primary.id}')" class="bg-white text-orange-600 font-fun font-bold px-4 py-2 rounded-xl shadow-md hover:bg-slate-50 transition-all text-sm">
                    Mulai Belajar <i class="fa-solid fa-play ml-1"></i>
                </button>
            </div>
        </div>

        <div class="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div class="space-y-2">
                <div class="flex items-center justify-between">
                    <span class="bg-blue-100 text-brand-blue font-bold text-xs px-3 py-1 rounded-full uppercase">Materi Penguat</span>
                    <span class="text-xs text-slate-400">Pilihan Kedua</span>
                </div>
                <h3 class="text-xl font-bold text-slate-800 font-fun">${rec.secondary[0] ? rec.secondary[0].title : 'Eksplorasi Lain'}</h3>
                <p class="text-slate-500 text-xs">${rec.secondary[0] ? rec.secondary[0].description : 'Latih kemampuanmu lebih jauh.'}</p>
            </div>
            <div class="flex items-center justify-between pt-2">
                <span class="text-xs text-slate-400 font-medium">+20 Bintang Kuis</span>
                <button onclick="openModule('${(rec.secondary[0] || rec.primary).id}')" class="bg-slate-100 text-slate-700 font-fun font-bold px-4 py-2 rounded-xl hover:bg-brand-blue hover:text-white transition-all text-sm">
                    Coba Sekarang
                </button>
            </div>
        </div>
    `;

    // Render Grid Modules
    applyFilters();
}

function renderModulesGrid(moduleList) {
    const grid = document.getElementById('modules-grid');
    grid.innerHTML = '';

    moduleList.forEach(m => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-3xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 bouncy-hover';

        card.innerHTML = `
            <div class="space-y-3">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr ${m.color} text-white flex items-center justify-center text-2xl shadow-sm">
                    <i class="fa-solid ${m.icon}"></i>
                </div>
                <div>
                    <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">${m.category} • ${m.level}</span>
                    <h3 class="text-lg font-bold text-slate-800 font-fun leading-tight">${m.title}</h3>
                </div>
                <p class="text-slate-500 text-xs line-clamp-2">${m.description}</p>
            </div>

            <div class="pt-2 border-t border-slate-50 flex items-center justify-between">
                <span class="text-xs font-bold text-amber-500"><i class="fa-solid fa-star mr-1"></i>+15 Poin</span>
                <button onclick="openModule('${m.id}')" class="bg-slate-50 text-brand-blue font-fun font-bold px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-brand-blue hover:text-white transition-all text-xs">
                    Buka Modul
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

let currentCategoryFilter = 'all';
let currentLevelFilter = 'all';

function filterModules(category, el) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-white', 'text-brand-blue', 'shadow-sm');
        btn.classList.add('text-slate-600');
    });
    el.classList.add('bg-white', 'text-brand-blue', 'shadow-sm');
    el.classList.remove('text-slate-600');
    currentCategoryFilter = category;
    applyFilters();
}

function setLevelFilter(level) {
    currentLevelFilter = level;
    applyFilters();
}

function applyFilters() {
    renderModulesGrid(modules.filter(m =>
        (currentCategoryFilter === 'all' || m.category === currentCategoryFilter) &&
        (currentLevelFilter === 'all' || m.level === currentLevelFilter)
    ));
}

function onUserChange() {
    renderDashboard();
}

renderDashboard();
