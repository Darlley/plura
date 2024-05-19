import { ThemeProvider } from '@/providers/theme-provider';
import { DM_Sans } from 'next/font/google';
import './globals.css';
const fonts = DM_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'Plura',
  description: 'All in one Agency Solution',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={fonts.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
