// PENYIMPANAN STATUS ANTAR HALAMAN
// Bintang, skor, modul selesai, profil aktif, dan modul baru disimpan di browser
// supaya tidak hilang saat pindah halaman (beranda -> modul -> rekomendasi -> admin).
const TK_KEY = 'tk_state_v1';

function loadState() {
    const empty = { userId: 'budi', users: {}, done: {}, customModules: [] };
    let raw = null;
    try { raw = localStorage.getItem(TK_KEY); } catch (e) {}
    if (!raw && typeof window.name === 'string' && window.name.indexOf('TK:') === 0) raw = window.name.slice(3);
    if (!raw) return empty;
    try { return Object.assign(empty, JSON.parse(raw)); } catch (e) { return empty; }
}

let STATE = loadState();

Object.keys(usersData).forEach(id => {
    const s = STATE.users[id];
    if (s) {
        usersData[id].stars = s.stars;
        usersData[id].scores = Object.assign({}, usersData[id].scores, s.scores);
    }
});

let currentUser = usersData[STATE.userId] || usersData['budi'];
const completedModules = STATE.done;
let modules = BASE_MODULES.concat(STATE.customModules);

function persist() {
    STATE.userId = currentUser.id;
    STATE.users = {};
    Object.keys(usersData).forEach(id => {
        STATE.users[id] = { stars: usersData[id].stars, scores: usersData[id].scores };
    });
    const json = JSON.stringify(STATE);
    try { localStorage.setItem(TK_KEY, json); } catch (e) {}
    try { window.name = 'TK:' + json; } catch (e) {}
}

// ALGORITMA REKOMENDASI (dipakai beranda, rekomendasi, dan profil)
function getRecommendedModules() {
    // Find category with lowest score for current user
    let lowestCategory = 'Sains';
    let lowestScore = 100;

    for (const [cat, score] of Object.entries(currentUser.scores)) {
        if (score < lowestScore) {
            lowestScore = score;
            lowestCategory = cat;
        }
    }

    // Prioritize modules matching lowest score category
    let pool = modules.filter(m => m.level === currentUser.level);
    if (pool.length === 0) pool = modules;
    const recommended = pool.filter(m => m.category === lowestCategory);
    const others = pool.filter(m => m.category !== lowestCategory);

    return {
        primary: recommended.length > 0 ? recommended[0] : pool[0],
        secondary: others.slice(0, 2),
        targetCategory: lowestCategory
    };
}
