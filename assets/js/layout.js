// KERANGKA BERSAMA: header, navigasi, footer, dan pengganti profil.
// Setiap halaman hanya perlu <body data-page="...">; sisanya dipasang di sini.
const TK_PAGES = {
    dashboard: '../beranda/index.html',
    module: '../modul/index.html',
    recommendations: '../rekomendasi/index.html',
    admin: '../admin/index.html'
};

// Menjaga nama fungsi asli: tombol di header memanggil switchView('...')
function switchView(viewName) {
    location.href = TK_PAGES[viewName] || TK_PAGES.dashboard;
}

function openModule(moduleId) {
    location.href = TK_PAGES.module + '?id=' + encodeURIComponent(moduleId);
}

const TK_HEADER = `
    <header class="bg-white shadow-md sticky top-0 z-50 transition-all">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-20">
                <!-- Branding -->
                <div class="flex items-center space-x-3 cursor-pointer" onclick="switchView('dashboard')">
                    <div class="w-12 h-12 bg-gradient-to-tr from-brand-coral to-brand-yellow rounded-2xl flex items-center justify-center text-white shadow-lg shadow-coral-200">
                        <i class="fa-solid font-bold fa-heart-pulse text-2xl"></i>
                    </div>
                    <div>
                        <span class="font-fun font-bold text-2xl text-slate-800 tracking-wide block leading-none">Tangan Kasih</span>
                        <span class="text-xs font-semibold text-brand-blue tracking-wider uppercase">Belajar & Tumbuh Bersama</span>
                    </div>
                </div>

                <!-- Main Nav Links -->
                <nav class="hidden md:flex space-x-2 bg-slate-100 p-1.5 rounded-2xl">
                    <button onclick="switchView('dashboard')" id="nav-dashboard" class="nav-btn px-5 py-2.5 rounded-xl font-fun font-semibold text-sm transition-all bg-white text-brand-blue shadow-sm">
                        <i class="fa-solid fa-house mr-2"></i>Beranda Belajar
                    </button>
                    <button onclick="switchView('recommendations')" id="nav-recommendations" class="nav-btn px-5 py-2.5 rounded-xl font-fun font-semibold text-sm text-slate-600 hover:text-brand-blue transition-all">
                        <i class="fa-solid fa-wand-magic-sparkles mr-2 text-brand-yellow"></i>Rekomendasi Pintar
                    </button>
                    <button onclick="switchView('admin')" id="nav-admin" class="nav-btn px-5 py-2.5 rounded-xl font-fun font-semibold text-sm text-slate-600 hover:text-brand-blue transition-all">
                        <i class="fa-solid fa-chart-line mr-2 text-brand-purple"></i>Portal Relawan
                    </button>
                </nav>

                <!-- Profile & Rewards Widget -->
                <div class="flex items-center space-x-4">
                    <!-- Stars Counter -->
                    <div class="flex items-center bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl shadow-sm">
                        <i class="fa-solid fa-star text-amber-400 text-xl mr-2 pulse-star"></i>
                        <div>
                            <div class="text-[10px] text-amber-700 uppercase font-bold leading-none">Bintangku</div>
                            <div id="user-stars" class="font-fun font-bold text-lg text-amber-800 leading-none">120</div>
                        </div>
                    </div>

                    <!-- Profile Switcher Dropdown -->
                    <div class="relative group">
                        <div class="flex items-center space-x-2 bg-slate-50 border border-slate-200 p-1.5 pr-3 rounded-2xl cursor-pointer hover:bg-slate-100 transition-all">
                            <img id="user-avatar" src="https://api.dicebear.com/7.x/bottts/svg?seed=Budi" alt="Avatar" class="w-10 h-10 rounded-xl bg-brand-blue/20">
                            <div class="hidden sm:block text-left">
                                <div id="user-name" class="font-fun font-bold text-sm text-slate-700 leading-none">Budi</div>
                                <div id="user-level" class="text-[11px] text-slate-500 font-medium">Tingkat SD</div>
                            </div>
                            <i class="fa-solid fa-chevron-down text-xs text-slate-400 ml-1"></i>
                        </div>

                        <!-- Dropdown Menu -->
                        <div class="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 hidden group-hover:block z-50">
                            <div class="px-4 py-2 border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase">Pilih Profil Anak</div>
                            <button onclick="selectUser('budi')" class="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center space-x-3 transition-colors">
                                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Budi" class="w-8 h-8 rounded-lg bg-blue-100">
                                <div>
                                    <div class="font-bold text-sm text-slate-700">Budi</div>
                                    <div class="text-xs text-slate-400">Tingkat SD</div>
                                </div>
                            </button>
                            <button onclick="selectUser('siti')" class="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center space-x-3 transition-colors">
                                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Siti" class="w-8 h-8 rounded-lg bg-pink-100">
                                <div>
                                    <div class="font-bold text-sm text-slate-700">Siti</div>
                                    <div class="text-xs text-slate-400">Tingkat SMP</div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- Navigasi mobile -->
    <nav class="md:hidden bg-white border-b border-slate-100 flex justify-around p-2 text-xs font-fun font-semibold text-slate-600">
        <button onclick="switchView('dashboard')" class="px-3 py-2"><i class="fa-solid fa-house mr-1"></i>Beranda</button>
        <button onclick="switchView('recommendations')" class="px-3 py-2"><i class="fa-solid fa-wand-magic-sparkles mr-1 text-brand-yellow"></i>Rekomendasi</button>
        <button onclick="switchView('admin')" class="px-3 py-2"><i class="fa-solid fa-chart-line mr-1 text-brand-purple"></i>Relawan</button>
    </nav>
`;

const TK_FOOTER = `
<footer class="bg-white border-t border-slate-100 py-6 mt-12">
        <div class="max-w-7xl mx-auto px-4 text-center text-xs text-slate-400 font-medium">
            <p>© 2026 Yayasan Tangan Kasih. Media Pembelajaran Interaktif Berbasis Web & Rekomendasi Pintar.</p>
        </div>
    </footer>
`;

function updateProfileUI() {
    document.getElementById('user-name').innerText = currentUser.name;
    document.getElementById('user-level').innerText = `Tingkat ${currentUser.level}`;
    document.getElementById('user-stars').innerText = currentUser.stars;
    document.getElementById('user-avatar').src = `https://api.dicebear.com/7.x/bottts/svg?seed=${currentUser.name}`;
    const banner = document.getElementById('banner-user-name');
    if (banner) banner.innerText = currentUser.name;
}

function selectUser(userId) {
    currentUser = usersData[userId];
    persist();
    updateProfileUI();
    if (typeof onUserChange === 'function') onUserChange();
}

function markActiveNav() {
    const page = document.body.dataset.page;
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('bg-white', 'text-brand-blue', 'shadow-sm');
        btn.classList.add('text-slate-600');
    });
    const activeNav = document.getElementById(`nav-${page}`);
    if (activeNav) {
        activeNav.classList.add('bg-white', 'text-brand-blue', 'shadow-sm');
        activeNav.classList.remove('text-slate-600');
    }
}

document.body.insertAdjacentHTML('afterbegin', TK_HEADER);
document.body.insertAdjacentHTML('beforeend', TK_FOOTER);
updateProfileUI();
markActiveNav();
