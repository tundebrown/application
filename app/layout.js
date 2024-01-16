import './ui/globals.css'

export const metadata = {
  title: 'Application Tracking System',
  description: 'Application tracking system',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
