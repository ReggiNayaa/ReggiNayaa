// 1. Menampilkan alert saat tombol Register atau Login diklik
document.querySelector(".signup-btn").addEventListener("click", function () {
    alert("Website Dalam Perbaikan");
});

document.querySelector(".login-btn").addEventListener("click", function () {
    alert("Website Dalam Perbaikan");
});

// 2. Mengubah teks tagline setiap 4 detik
const taglineTexts = ["HORROR", "ACTION", "ROMANCE", "COMEDY"];
let index = 0;

function changeTagline() {
    document.querySelector(".text.kedua-text").textContent = taglineTexts[index];
    index = (index + 1) % taglineTexts.length; // Loop kembali ke awal setelah mencapai akhir array
}

setInterval(changeTagline, 4000); // Ganti teks setiap 4 detik
