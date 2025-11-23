"use client";

import Link from "next/link";


const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ||
  "https://pirpir-diacheck-backend.hf.space";
// ganti dengan URL Space-mu yang benar

import { useState } from "react";

const initialForm = {
  age: "",
  gender: "",
  height: "",
  weight: "",
  hypertension: "0",
  heartDisease: "0",
  smokingHistory: "never",
};

export default function StartPage() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setResult(null);

    const age = Number(form.age);
    const height = Number(form.height);
    const weight = Number(form.weight);

    if (!age || !height || !weight) {
      setError("Usia, tinggi badan, dan berat badan perlu diisi terlebih dahulu.");
      return;
    }

    const heightM = height / 100;
    const bmi = heightM > 0 ? Number((weight / (heightM * heightM)).toFixed(1)) : null;

    if (!bmi || isNaN(bmi)) {
      setError("Tinggi dan berat badan tidak valid untuk menghitung IMT.");
      return;
    }

    const payload = {
      gender: form.gender, // "Female" / "Male"
      age,                 // tahun
      bmi,                 // IMT
      hypertension: Number(form.hypertension),   // 0 / 1
      heart_disease: Number(form.heartDisease),  // 0 / 1
      smoking_history: form.smokingHistory,      // "never", "current", "former", "No Info"
      model_type: "quick",
    };

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });


      const data = await response.json();
      console.log("RESPON BACKEND:", data);

      if (!response.ok) {
        setError(data.error || "Terjadi kesalahan pada server.");
        return;
      }

      const score = Math.round((data.diabetes_probability || 0) * 100);

      let category = "Rendah";
      let categoryColor = "text-teal-700";
      let advice =
        "Pertahankan pola hidup sehat dan lakukan pemeriksaan kesehatan secara berkala.";

      if (score >= 30 && score < 50) {
        category = "Sedang";
        categoryColor = "text-amber-600";
        advice =
          "Mulai perbaiki pola makan, kurangi makanan tinggi gula, dan tambah aktivitas fisik ringan.";
      } else if (score >= 50) {
        category = "Tinggi";
        categoryColor = "text-red-600";
        advice =
          "Sebaiknya konsultasikan hasil ini dengan tenaga kesehatan dan lakukan pemeriksaan gula darah.";
      }

      setResult({
        score,
        category,
        categoryColor,
        bmi,
        advice,
      });
    } catch (err) {
      console.error(err);
      setError("Tidak dapat terhubung ke server backend. Pastikan API berjalan.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setForm(initialForm);
    setResult(null);
    setError("");
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-8 sm:py-10">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        {/* Kiri: penjelasan + form */}
        <section>
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 mb-3">
            DiaCheck • Tes Prediksi Risiko Diabetes
          </p>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            Jawab beberapa pertanyaan{" "}
            <span className="text-teal-600">untuk melihat perkiraan risiko.</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-700 mb-4">
            Isikan data secara singkat dan jujur. Hasil yang ditampilkan
            merupakan perkiraan awal berdasarkan model machine learning, bukan
            diagnosis medis. Untuk hasil pasti, tetap diperlukan pemeriksaan
            oleh tenaga kesehatan.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-4 rounded-2xl bg-white border border-slate-200 shadow-sm p-5 space-y-4"
          >
            {error && (
              <div className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-xs sm:text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Usia & jenis kelamin */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">
                  Usia (tahun)
                </label>
                <input
                  type="number"
                  name="age"
                  min="1"
                  max="120"
                  value={form.age}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
                             text-slate-800 placeholder-slate-400
                             focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-slate-400"
                  placeholder="contoh: 45"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">
                  Jenis kelamin
                </label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
                             text-slate-800
                             focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-slate-400"
                  required
                >
                  <option value="">Pilih</option>
                  <option value="Female">Perempuan</option>
                  <option value="Male">Laki-laki</option>
                </select>
              </div>
            </div>

            {/* Tinggi & berat */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">
                  Tinggi badan (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  min="80"
                  max="230"
                  value={form.height}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
                             text-slate-800 placeholder-slate-400
                             focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-slate-400"
                  placeholder="contoh: 160"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">
                  Berat badan (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  min="20"
                  max="250"
                  value={form.weight}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
                             text-slate-800 placeholder-slate-400
                             focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-slate-400"
                  placeholder="contoh: 60"
                  required
                />
              </div>
            </div>

            {/* Hipertensi & penyakit jantung */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">
                  Pernah didiagnosis hipertensi?
                </label>
                <select
                  name="hypertension"
                  value={form.hypertension}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
                             text-slate-800
                             focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-slate-400"
                >
                  <option value="0">Tidak</option>
                  <option value="1">Ya</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">
                  Riwayat penyakit jantung?
                </label>
                <select
                  name="heartDisease"
                  value={form.heartDisease}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
                             text-slate-800
                             focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-slate-400"
                >
                  <option value="0">Tidak</option>
                  <option value="1">Ya</option>
                </select>
              </div>
            </div>

            {/* Kebiasaan merokok */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">
                Kebiasaan merokok
              </label>
              <select
                name="smokingHistory"
                value={form.smokingHistory}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
                           text-slate-800
                           focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-slate-400"
              >
                <option value="never">Tidak pernah merokok</option>
                <option value="current">Sedang merokok</option>
                <option value="former">Pernah merokok, sekarang berhenti</option>
                <option value="No Info">Informasi tidak diketahui</option>
              </select>
            </div>

            {/* Tombol */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-full bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 transition disabled:opacity-60"
              >
                {loading ? "Menghitung..." : "Lihat Perkiraan Risiko"}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="text-xs sm:text-sm text-slate-500 hover:text-slate-700"
              >
                Reset isian
              </button>
              <Link
                href="/full"
                 className="text-xs sm:text-sm text-blue-600 hover:text-blue-800"
              >Mode Advance</Link>
            </div>

            <p className="text-[11px] sm:text-xs text-slate-500 pt-1">
              Data yang Anda isi hanya digunakan untuk simulasi di halaman ini
              dan tidak disimpan ke server produksi.
            </p>
          </form>
        </section>

        {/* Kanan: hasil */}
        <section className="lg:mt-10">
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
              {result ? "Ringkasan hasil Anda" : "Ringkasan hasil akan tampil di sini"}
            </p>

            {result ? (
              <>
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">
                      Perkiraan risiko diabetes
                    </p>
                    <p className="text-3xl font-semibold text-slate-900">
                      {result.score}
                      <span className="text-base align-super">%</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 mb-1">Kategori</p>
                    <p
                      className={`text-sm font-semibold ${result.categoryColor}`}
                    >
                      {result.category}
                    </p>
                  </div>
                </div>

                {result.bmi && (
                  <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 text-xs sm:text-sm">
                    <p className="font-semibold text-slate-800 mb-1">
                      Perkiraan indeks massa tubuh (IMT)
                    </p>
                    <p className="text-slate-700">
                      IMT Anda sekitar{" "}
                      <span className="font-semibold">{result.bmi}</span>. Nilai
                      ini dihitung dari tinggi dan berat badan yang Anda isi.
                    </p>
                  </div>
                )}

                <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 text-xs sm:text-sm">
                  <p className="font-semibold text-slate-800 mb-1">
                    Saran langkah awal
                  </p>
                  <p className="text-slate-700">{result.advice}</p>
                </div>

                <p className="text-[11px] sm:text-xs text-slate-500 border-t border-slate-100 pt-3">
                  *Perhitungan di atas menggunakan model machine learning dan
                  bukan pengganti pemeriksaan medis. Untuk penilaian lebih
                  akurat, silakan konsultasikan dengan tenaga kesehatan.
                </p>
              </>
            ) : (
              <p className="text-xs sm:text-sm text-slate-600">
                Setelah Anda mengisi data di sebelah kiri dan menekan tombol{" "}
                <span className="font-semibold">“Lihat Perkiraan Risiko”</span>,
                perkiraan risiko dan saran langkah awal akan muncul di bagian
                ini.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
