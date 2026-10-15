// DATA BAWAAN: profil anak dan modul pembelajaran
const usersData = {
    'budi': {
        id: 'budi',
        name: 'Budi',
        level: 'SD',
        stars: 120,
        scores: { 'Matematika': 90, 'Bahasa': 70, 'Sains': 50, 'Karakter': 85 }
    },
    'siti': {
        id: 'siti',
        name: 'Siti',
        level: 'SMP',
        stars: 210,
        scores: { 'Matematika': 60, 'Bahasa': 95, 'Sains': 88, 'Karakter': 90 }
    }
};

const BASE_MODULES = [
    {
        id: 'mod-1',
        title: 'Penjumlahan Seru 1-20',
        category: 'Matematika',
        level: 'SD',
        color: 'from-blue-400 to-indigo-500',
        icon: 'fa-calculator',
        description: 'Belajar berhitung dan menjumlahkan angka dengan bantuan benda visual!',
        content: '<p>Penjumlahan adalah menggabungkan dua kelompok benda menjadi satu kelompok besar.</p><p class="bg-blue-100 p-3 rounded-xl border border-blue-200">Contoh: 🍎🍎 (2 apel) + 🍎🍎🍎 (3 apel) = 🍎🍎🍎🍎🍎 (5 apel).</p>',
        quizzes: [
            {
                question: 'Berapakah hasil dari 5 + 3 ?',
                options: ['6', '7', '8', '9'],
                correct: 2
            },
            {
                question: 'Siti punya 4 balon. Budi memberi 4 balon lagi. Berapa total balon Siti?',
                options: ['8', '7', '6', '10'],
                correct: 0
            }
        ]
    },
    {
        id: 'mod-2',
        title: 'Mengenal Hewan & Habitatnya',
        category: 'Sains',
        level: 'SD',
        color: 'from-emerald-400 to-teal-600',
        icon: 'fa-frog',
        description: 'Mari menjelajahi dunia hewan dan tempat tinggal mereka di alam!',
        content: '<p>Hewan hidup di berbagai tempat sesuai kebutuhan mereka. Ada yang di darat, air, atau keduanya (amfibi).</p><p class="bg-emerald-100 p-3 rounded-xl border border-emerald-200">Ikan bernapas dengan insang di air, sedangkan Burung terbang di udara dan hinggap di darat.</p>',
        quizzes: [
            {
                question: 'Hewan manakah yang hidup di air dan bernapas dengan insang?',
                options: ['Kucing', 'Ikan', 'Kelinci', 'Burung'],
                correct: 1
            },
            {
                question: 'Di manakah tempat tinggal utama seekor burung hantu?',
                options: ['Di dalam air', 'Di laut lepas', 'Di pepohonan / darat', 'Di dalam tanah'],
                correct: 2
            }
        ]
    },
    {
        id: 'mod-3',
        title: 'Huruf Vokal & Kata Sederhana',
        category: 'Bahasa',
        level: 'SD',
        color: 'from-pink-400 to-rose-500',
        icon: 'fa-font',
        description: 'Mengenal huruf A, I, U, E, O dan merangkai kata pertama kamu.',
        content: '<p>Huruf vokal terdiri dari lima huruf utama: <strong>A - I - U - E - O</strong>.</p><p class="bg-pink-100 p-3 rounded-xl border border-pink-200">Huruf vokal membantu memberikan suara hidup pada setiap kata!</p>',
        quizzes: [
            {
                question: 'Huruf manakah di bawah ini yang merupakan huruf vokal?',
                options: ['B', 'K', 'U', 'M'],
                correct: 2
            },
            {
                question: 'Kata "A-P-E-L" diawali dengan huruf vokal apa?',
                options: ['A', 'I', 'U', 'E'],
                correct: 0
            }
        ]
    },
    {
        id: 'mod-4',
        title: 'Saling Menyayangi & Berbagi',
        category: 'Karakter',
        level: 'SD',
        color: 'from-amber-400 to-orange-500',
        icon: 'fa-hand-holding-heart',
        description: 'Belajar menjadi anak yang baik hati, suka menolong, dan bersyukur.',
        content: '<p>Berbagi dengan teman di yayasan membuat hati kita gembira dan teman bahagia.</p><p class="bg-amber-100 p-3 rounded-xl border border-amber-200">Jangan lupa mengucapkan "Terima Kasih" saat menerima bantuan!</p>',
        quizzes: [
            {
                question: 'Apa yang harus kita ucapkan saat teman memberi kita hadiah atau bantuan?',
                options: ['Maaf', 'Terima Kasih', 'Permisi', 'Tidak Mau'],
                correct: 1
            }
        ]
    },
    {
        id: 'mod-5',
        title: 'Persamaan Linear Satu Variabel',
        category: 'Matematika',
        level: 'SMP',
        color: 'from-sky-400 to-blue-600',
        icon: 'fa-square-root-variable',
        description: 'Menyelesaikan persamaan sederhana seperti 2x + 3 = 11.',
        content: '<p>Persamaan linear satu variabel adalah kalimat matematika dengan satu huruf yang nilainya dicari.</p><p class="bg-blue-100 p-3 rounded-xl border border-blue-200">Contoh: 2x + 3 = 11 → 2x = 8 → x = 4.</p>',
        quizzes: [
            { question: 'Nilai x dari 3x - 5 = 10 adalah ...', options: ['3', '5', '15', '1'], correct: 1 },
            { question: 'Nilai x dari x + 7 = 12 adalah ...', options: ['5', '19', '7', '4'], correct: 0 }
        ]
    },
    {
        id: 'mod-6',
        title: 'Teks Deskripsi',
        category: 'Bahasa',
        level: 'SMP',
        color: 'from-rose-400 to-pink-600',
        icon: 'fa-pen-nib',
        description: 'Menulis teks yang menggambarkan objek secara jelas dan rinci.',
        content: '<p>Teks deskripsi menggambarkan sebuah objek (orang, tempat, benda) agar pembaca seolah-olah melihatnya sendiri.</p><p class="bg-pink-100 p-3 rounded-xl border border-pink-200">Gunakan kata sifat: indah, luas, hijau, sejuk.</p>',
        quizzes: [
            { question: 'Tujuan utama teks deskripsi adalah ...', options: ['Menceritakan kejadian', 'Menggambarkan objek', 'Mengajak orang membeli', 'Memberi perintah'], correct: 1 }
        ]
    },
    {
        id: 'mod-7',
        title: 'Hukum Newton',
        category: 'Sains',
        level: 'SMA',
        color: 'from-teal-400 to-emerald-600',
        icon: 'fa-atom',
        description: 'Memahami hubungan gaya, massa, dan percepatan.',
        content: '<p>Hukum II Newton: <strong>F = m × a</strong>. Semakin besar gaya, semakin besar percepatan benda.</p><p class="bg-emerald-100 p-3 rounded-xl border border-emerald-200">Contoh: m = 2 kg, a = 3 m/s² → F = 6 N.</p>',
        quizzes: [
            { question: 'Benda bermassa 4 kg dipercepat 5 m/s². Gaya yang bekerja adalah ...', options: ['9 N', '20 N', '1,25 N', '0,8 N'], correct: 1 }
        ]
    }
];
