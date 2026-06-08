import "./globals.css";

export const metadata = {
  title: "AlgoLab PRO: Algoritma Analizi Başucu Rehberi",
  description: "Algoritma analizi eğitim platformu ve interaktif simülasyonlar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
