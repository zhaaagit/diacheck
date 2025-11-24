'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [showModes, setShowModes] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

        {/* Kiri: Teks utama */}
        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 mb-3">
            DiaCheck • Prediksi Risiko Diabetes
          </p>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-slate-900 mb-4">
            Cek risiko diabetes Anda{" "}
            <span className="text-teal-600">dalam beberapa langkah mudah</span>.
          </h1>

          <p className="text-sm md:text-base text-slate-600 mb-6 max-w-xl">
            DiaCheck membantu Anda melakukan penilaian risiko diabetes berbasis
            gaya hidup dan faktor kesehatan. Hasil bukan diagnosis, tetapi panduan awal untuk konsultasi medis.
          </p>

          <ul className="space-y-2 text-sm md:text-base text-slate-700 mb-8">
            <li>• Pertanyaan singkat, hanya beberapa menit.</li>
            <li>• Menggunakan model machine learning.</li>
            <li>• Hasil berupa kategori risiko & rekomendasi.</li>
          </ul>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setShowModes(true)}
              className="inline-flex items-center justify-center rounded-full bg-teal-600 px-6 py-3 text-sm md:text-base font-semibold text-white shadow-md hover:bg-teal-700 transition"
            >
              Mulai Tes Prediksi
            </button>

            <span className="text-xs md:text-sm text-slate-500">
              Tidak perlu daftar • Data tidak disimpan.
            </span>
          </div>
        </section>

        {/* Kanan: Ilustrasi */}
        <section className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-teal-100/40 blur-2xl" />

          <div className="relative rounded-3xl bg-white shadow-lg border border-slate-100 p-6 md:p-7 flex flex-col gap-4">
            <p className="text-xs font-medium text-teal-700 uppercase tracking-wide">
              Contoh ringkasan risiko
            </p>

            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-xs text-slate-500">Perkiraan risiko</p>
                <p className="text-3xl font-semibold text-slate-900">
                  32<span className="text-base align-super">%</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">Kategori</p>
                <p className="text-sm font-semibold text-amber-600">
                  Sedang (Waspada)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
              <div className="rounded-2xl bg-slate-50 p-3">
                <p className="font-semibold text-slate-800 mb-1">
                  Faktor utama
                </p>
                <p className="text-slate-600">
                  IMT tinggi, riwayat keluarga, pola makan tinggi gula.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3">
                <p className="font-semibold text-slate-800 mb-1">
                  Rekomendasi awal
                </p>
                <p className="text-slate-600">
                  Konsultasi dokter, cek gula darah & mulai pola hidup sehat.
                </p>
              </div>
            </div>

            <p className="text-[11px] md:text-xs text-slate-500 border-t pt-3">
              *Data di atas hanya contoh visual, bukan hasil prediksi Anda.
            </p>
          </div>
        </section>
      </div>

      {/* Modal Mode Selection */}
      {showModes && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-5xl w-full animate-in fade-in-50 duration-300">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  Pilih Mode Prediksi
                </h2>
                <p className="text-sm md:text-base text-slate-600 mt-2">
                  Pilih mode yang sesuai dengan kebutuhan Anda
                </p>
              </div>
              <button
                onClick={() => setShowModes(false)}
                className="text-slate-400 hover:text-slate-600 transition text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Mode Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Mode Sederhana */}
              <div className="rounded-2xl border-2 border-slate-200 p-6 md:p-8 hover:border-teal-500 hover:shadow-lg transition duration-300 bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-teal-600">
                      Mode Cepat
                    </p>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-1">
                      Sederhana
                    </h3>
                  </div>
                  <div className="bg-teal-100 rounded-full p-3 flex-shrink-0">
                    <span className="text-2xl">⚡</span>
                  </div>
                </div>

                <p className="text-sm md:text-base text-slate-700 mb-6 flex-grow">
                  Jawab pertanyaan-pertanyaan dasar tentang gaya hidup dan faktor kesehatan Anda.
                </p>

                <div className="bg-white rounded-xl p-4 mb-6">
                  <p className="text-xs text-slate-600 mb-2">
                    <span className="font-semibold">Akurasi:</span> 75-80%
                  </p>
                  <p className="text-xs text-slate-600">
                    Cocok untuk skrining awal dan penilaian cepat.
                  </p>
                </div>

                <Link
                  href="/start"
                  className="block w-full rounded-full bg-teal-600 px-6 py-3 text-center text-sm md:text-base font-semibold text-white shadow-md hover:bg-teal-700 transition"
                >
                  Mulai Mode Sederhana
                </Link>
              </div>

              {/* Mode Lengkap */}
              <div className="rounded-2xl border-2 border-teal-400 p-6 md:p-8 shadow-lg hover:shadow-xl transition duration-300 bg-gradient-to-br from-teal-50 to-blue-50 relative flex flex-col h-full">
                {/* Badge untuk rekomendasi */}
                <div className="absolute -top-3 -right-3 bg-teal-600 text-white rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  Lebih Akurat
                </div>

                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                      Mode Detail
                    </p>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-1">
                      Lengkap
                    </h3>
                  </div>
                  <div className="bg-blue-100 rounded-full p-3 flex-shrink-0">
                    <span className="text-2xl">🔍</span>
                  </div>
                </div>

                <p className="text-sm md:text-base text-slate-700 mb-6 flex-grow">
                  Analisis mendalam dengan pertanyaan komprehensif tentang riwayat kesehatan dan gaya hidup Anda.
                </p>

                <div className="bg-white rounded-xl p-4 mb-6">
                  <p className="text-xs text-slate-600 mb-2">
                    <span className="font-semibold">Akurasi:</span> 85-90%
                  </p>
                  <p className="text-xs text-slate-600">
                    Model yang lebih akurat dengan lebih banyak faktor yang dipertimbangkan.
                  </p>
                </div>

                <Link
                  href="/full"
                  className="block w-full rounded-full bg-blue-600 px-6 py-3 text-center text-sm md:text-base font-semibold text-white shadow-md hover:bg-blue-700 transition"
                >
                  Mulai Mode Lengkap
                </Link>
              </div>
            </div>

            <p className="text-center text-xs md:text-sm text-slate-500 mt-8 border-t pt-6">
              Pilih salah satu mode untuk melanjutkan. Hasil bukan diagnosis medis, konsultasikan dengan dokter.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}