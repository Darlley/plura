import { Toaster } from '@/components/ui/toaster';
import ModalProvider from '@/providers/modal-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import { Toaster as SonnarToaster } from 'sonner';
import './globals.css';

const font = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Plura',
  description: 'All in one Agency Solution',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ModalProvider>
            {children}
            <Toaster />
            <SonnarToaster position="bottom-left" />
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
