const angka = document.getElementById("angka");
const mulai = document.getElementById("mulai");

const jenisSoal = document.getElementById("jenissoal");
const jumlahBaris = document.getElementById("jumlahbaris");
const waktuTampil = document.getElementById("waktutampil");

const jawaban = document.getElementById("jawaban");
const inputJawaban = document.getElementById("inputjawaban");
const cek = document.getElementById("cek");
const hasil = document.getElementById("hasil");

let hasilBenar = 0;


// Tombol Mulai
mulai.addEventListener("click", function () {

    // Sembunyikan kolom jawaban
    jawaban.style.display = "none";

    // Kosongkan jawaban sebelumnya
    inputJawaban.value = "";
    hasil.textContent = "";

    // Ambil pengaturan
    const jenis = jenisSoal.value;
    const jumlah = Number(jumlahBaris.value);
    const waktu = Number(waktuTampil.value) * 1000;

    // Reset hasil
    hasilBenar = 0;
    let barisSekarang = 0;


    // Fungsi untuk membuat angka sesuai jenis soal
    function buatAngka() {
        if (jenis === "1d") {
            return Math.floor(Math.random() * 9) + 1;
        }
        else if (jenis === "1d-2d") {

            if (Math.random() < 0.5) {
                return Math.floor(Math.random() * 9) + 1;
            } else {
                return Math.floor(Math.random() * 90) + 10;
            }
        }
        else if (jenis === "2d") {
            return Math.floor(Math.random() * 90) + 10;
        }
        else if (jenis === "3d") {
            return Math.floor(Math.random() * 900) + 100;
        }
    }


    function tampilkanAngka() {
        // Kalau semua angka sudah selesai
        if (barisSekarang >= jumlah) {
            angka.textContent = "";
            // Tampilkan kolom jawaban
            jawaban.style.display = "block";
            // Langsung fokus ke input jawaban
            inputJawaban.focus();
            return;
        }

        // ANGKA PERTAMA
        if (barisSekarang === 0) {
            const nilai = buatAngka();
            angka.textContent = nilai;
            hasilBenar = nilai;
        }

        // ANGKA BERIKUTNYA
          else {
            let operasi;
            if (hasilBenar === 0) {
                operasi = "+";
            }
            else {
                operasi = Math.random() < 0.5 ? "+" : "-";
            }

            // OPERASI +
               if (operasi === "+") {
                const nilai = buatAngka();
                angka.textContent = "+ " + nilai;
                hasilBenar += nilai;
            }

            // OPERASI -
            else {

                let nilai;
                if (jenis === "1d") {
                    const batas = Math.min(9, hasilBenar);
                    nilai = Math.floor(Math.random() * batas) + 1;
                }

                else if (jenis === "1d-2d") {
                    if (hasilBenar < 10) {
                        nilai = Math.floor(Math.random() * hasilBenar) + 1;
                    }

                    else {

                        if (Math.random() < 0.5) {
                            nilai = Math.floor(Math.random() * 9) + 1;
                        } else {
                            const batas = Math.min(99, hasilBenar);
                            nilai = Math.floor(Math.random() * (batas - 10 + 1)) + 10;
                        }
                    }
                }

                else if (jenis === "2d") {
                    if (hasilBenar < 10) {
                        nilai = hasilBenar;
                    } else {
                        const batas = Math.min(99, hasilBenar);
                        nilai = Math.floor(Math.random() * (batas - 10 + 1)) + 10;
                    }
                }

                else if (jenis === "3d") {
                    if (hasilBenar < 100) {
                        nilai = hasilBenar;
                    } else {
                        const batas = Math.min(999, hasilBenar);
                        nilai = Math.floor(Math.random() * (batas - 100 + 1)) + 100;
                    }
                }
                angka.textContent = "- " + nilai;
                hasilBenar -= nilai;
            }
        }
        barisSekarang++;
        // Tunggu sesuai waktu tampil
        setTimeout(tampilkanAngka, waktu);
    }
    // Mulai latihan
    tampilkanAngka();
});


// TOMBOL CEK JAWABAN
cek.addEventListener("click", function () {
    const jawabanUser = Number(inputJawaban.value);
    if (jawabanUser === hasilBenar) {
        hasil.textContent = "Benar! 🎉";
    } else {
        hasil.textContent = "Ooopsiiee \nJawaban yang benar: " + hasilBenar;
    }
});