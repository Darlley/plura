import React from "react";
import Navigation from '@/components/site/navigation';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation />
      <div className='w-full h-full flex items-center justify-center'>{children}</div>
    </>
  );
}
