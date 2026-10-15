// PROSES: PORTAL PENGAJAR & RELAWAN (tambah modul + grafik)

function openAddModuleModal() {
    document.getElementById('add-module-modal').classList.remove('hidden');
}

function closeAddModuleModal() {
    document.getElementById('add-module-modal').classList.add('hidden');
}

function handleNewModule(e) {
    e.preventDefault();
    const title = document.getElementById('new-title').value;
    const category = document.getElementById('new-category').value;
    const level = document.getElementById('new-level').value;
    const desc = document.getElementById('new-desc').value;

    const newMod = {
        id: 'mod-' + (modules.length + 1),
        title: title,
        category: category,
        level: level,
        color: 'from-purple-400 to-indigo-500',
        icon: 'fa-book-bookmark',
        description: desc,
        content: `<p>${desc}</p>`,
        quizzes: [
            {
                question: `Soal Latihan Dasar untuk modul ${title}?`,
                options: ['Jawaban A', 'Jawaban B (Benar)', 'Jawaban C', 'Jawaban D'],
                correct: 1
            }
        ]
    };

    modules.push(newMod);
    STATE.customModules.push(newMod);
    persist();
    document.getElementById('add-module-form').reset();
    closeAddModuleModal();
    alert('Modul baru berhasil ditambahkan oleh Relawan!');
}

function renderAdminAnalytics() {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Matematika', 'Bahasa', 'Sains', 'Karakter'],
            datasets: [{
                label: 'Rata-Rata Skor Anak (%)',
                data: [85, 78, 62, 90],
                backgroundColor: [
                    '#4A90E2',
                    '#FF6B6B',
                    '#06D6A0',
                    '#FFD166'
                ],
                borderRadius: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true, max: 100 }
            }
        }
    });
}

renderAdminAnalytics();
