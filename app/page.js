// app/page.js
import Link from "next/link";

export default function Home() {
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
            <Link
              href="/start"
              className="inline-flex items-center justify-center rounded-full bg-teal-600 px-6 py-3 text-sm md:text-base font-semibold text-white shadow-md hover:bg-teal-700 transition"
            >
              Mulai Tes Prediksi
            </Link>

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
    </div>
  );
}
