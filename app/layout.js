// app/layout.js
import "./globals.css";
import { Nunito } from "next/font/google";

// Load Nunito
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata = {
  title: "DiaCheck - Prediksi Risiko Diabetes",
  description:
    "DiaCheck membantu Anda memahami risiko diabetes secara sederhana dan ramah untuk segala usia.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${nunito.className} bg-white text-slate-900`}>
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="w-full border-b border-red-100 bg-white px-5 py-3 flex items-center justify-between">
            <div className="text-lg font-semibold tracking-tight text-red-600">
              DiaCheck
            </div>

            <div className="text-xs sm:text-sm text-slate-500">
              Cek risiko diabetes dengan cara yang mudah
            </div>
          </header>

          {/* Halaman */}
          <main className="flex-1 bg-slate-50">{children}</main>

          {/* Footer */}
          <footer className="border-t border-slate-200 bg-white text-xs text-slate-500 text-center py-3">
            © {new Date().getFullYear()} DiaCheck • Untuk edukasi, bukan
            pengganti diagnosis medis.
          </footer>
        </div>
      </body>
    </html>
  );
}
