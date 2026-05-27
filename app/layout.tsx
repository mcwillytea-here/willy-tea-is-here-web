import type {Metadata} from 'next';
import './globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Navbar } from '@/components/global/navbar';
import { AudioPlayer } from '@/components/global/audio-player';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Underground Rap Vault',
  description: 'Syrový, temný a rychlý prostor pre underground rap.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} dark`}>
      <body className="bg-[#0a0a0a] text-zinc-300 font-mono antialiased selection:bg-emerald-500/30 min-h-screen" suppressHydrationWarning>
        <Navbar />
        <main className="pt-16 pb-24 min-h-screen">
          {children}
        </main>
        <AudioPlayer />
      </body>
    </html>
  );
}
