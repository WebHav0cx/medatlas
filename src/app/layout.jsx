import "./globals.css";

export const metadata = {
  title: "MedAtlas - Healthcare Identity & Discovery Network",
  description:
    "MedAtlas connects hospitals, clinics, and laboratories to securely discover and exchange patient records.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent scroll-smooth"
    >
      <body className="bg-white font-sans text-emerald-950 antialiased">
        {children}
      </body>
    </html>
  );
}
