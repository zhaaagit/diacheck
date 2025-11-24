"use client";

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
  hba1c: "",
  bloodGlucose: "",
};

export default function FullTestPage() {
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
    const hba1c = Number(form.hba1c);
    const bloodGlucose = Number(form.bloodGlucose);

    if (!age || !height || !weight) {
      setError("Usia, tinggi badan, dan berat badan perlu diisi terlebih dahulu.");
      return;
    }
    if (!hba1c || !bloodGlucose) {
      setError("Nilai HbA1c dan glukosa darah perlu diisi untuk tes lengkap.");
      return;
    }

    const heightM = height / 100;
    const bmi = heightM > 0 ? Number((weight / (heightM * heightM)).toFixed(1)) : null;

    if (!bmi || isNaN(bmi)) {
      setError("Tinggi dan berat badan tidak valid untuk menghitung BMI.");
      return;
    }

    const payload = {
      gender: form.gender,             // "Female" / "Male"
      age,                             // tahun
      bmi,                             // IMT
      hypertension: Number(form.hypertension),   // 0 / 1
      heart_disease: Number(form.heartDisease),  // 0 / 1
      smoking_history: form.smokingHistory,      // "never", "current", "former", "No Info"
      HbA1c_level: hba1c,              // backend akan scale (x10)
      blood_glucose_level: bloodGlucose, // mg/dL, backend tidak scale
      model_type: "full",
    };

    try {
      setLoading(true);

      const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

      const response = await fetch(`${API_BASE}/predict`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
      });


      const data = await response.json();
      console.log("RESPON BACKEND (FULL):", data);

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
        hba1c,
        bloodGlucose,
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
            DiaCheck • Tes Prediksi Risiko (Fitur Lengkap)
          </p>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            Gunakan{" "}
            <span className="text-teal-600">hasil lab HbA1c dan glukosa darah</span>{" "}
            untuk perkiraan risiko yang lebih lengkap.
          </h1>

          <p className="text-sm sm:text-base text-slate-700 mb-4">
            Fitur ini ditujukan bagi Anda yang sudah memiliki hasil pemeriksaan
            HbA1c dan glukosa darah. Model akan menggabungkan data gaya hidup
            dan data laboratorium untuk memberikan perkiraan risiko yang lebih
            komprehensif. Hasil tetap bukan diagnosis medis.
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
              </select>
            </div>

            {/* HbA1c & glukosa darah */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">
                  HbA1c (%) 
                  <span className="font-normal text-slate-400"> — contoh: 5.6</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="hba1c"
                  value={form.hba1c}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
                             text-slate-800 placeholder-slate-400
                             focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-slate-400"
                  placeholder="contoh: 6.2"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">
                  Glukosa darah (mg/dL) 
                  <span className="font-normal text-slate-400"> — contoh: 110</span>
                </label>
                <input
                  type="number"
                  name="bloodGlucose"
                  value={form.bloodGlucose}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
                             text-slate-800 placeholder-slate-400
                             focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-slate-400"
                  placeholder="contoh: 120"
                  required
                />
              </div>
            </div>

            {/* Tombol */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-full bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 transition disabled:opacity-60"
              >
                {loading ? "Menghitung..." : "Lihat Perkiraan Risiko (Lengkap)"}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="text-xs sm:text-sm text-slate-500 hover:text-slate-700"
              >
                Reset isian
              </button>
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
              {result ? "Ringkasan hasil tes lengkap Anda" : "Ringkasan hasil akan tampil di sini"}
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

                <div className="space-y-3 text-xs sm:text-sm">
                  {result.bmi && (
                    <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                      <p className="font-semibold text-slate-800 mb-1">
                        Body Mass Index (BMI)
                      </p>
                      <p className="text-slate-700">
                        BMI Anda sekitar{" "}
                        <span className="font-semibold">{result.bmi}</span>.
                      </p>
                    </div>
                  )}

                  <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                    <p className="font-semibold text-slate-800 mb-1">
                      Nilai HbA1c dan glukosa darah
                    </p>
                    <p className="text-slate-700">
                      HbA1c Anda sekitar{" "}
                      <span className="font-semibold">{result.hba1c}%</span> dan
                      glukosa darah sekitar{" "}
                      <span className="font-semibold">
                        {result.bloodGlucose} mg/dL
                      </span>
                      .
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                    <p className="font-semibold text-slate-800 mb-1">
                      Saran langkah awal
                    </p>
                    <p className="text-slate-700">{result.advice}</p>
                  </div>
                </div>

                <p className="text-[11px] sm:text-xs text-slate-500 border-t border-slate-100 pt-3">
                  *Perhitungan di atas menggunakan model machine learning dengan
                  mempertimbangkan data BMI, riwayat kesehatan, dan hasil lab.
                  Hasil bukan pengganti diagnosis. Untuk penilaian lebih akurat,
                  silakan konsultasikan dengan tenaga kesehatan.
                </p>
              </>
            ) : (
              <p className="text-xs sm:text-sm text-slate-600">
                Setelah Anda mengisi data di sebelah kiri dan menekan tombol{" "}
                <span className="font-semibold">
                  “Lihat Perkiraan Risiko (Lengkap)”
                </span>
                , perkiraan risiko dan ringkasan hasil lengkap akan muncul di
                bagian ini.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
