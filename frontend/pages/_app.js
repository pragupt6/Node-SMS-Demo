import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css'
import { AuthProvider } from '@/context/AuthContext'
import SiteNav from '@/components/SiteNav';
function MyApp({ Component, pageProps }) {

  return <AuthProvider>
    <SiteNav />
    <Component {...pageProps} />
  </AuthProvider>

}

export default MyApp
