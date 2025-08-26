import Login from '@/components/website/login/login'
import { MyFirebaseProvider } from '@/components/firebase-providers'

export const metadata = {
  title: 'Login | Jack Oliver Development',
  description: 'Login to access the Jack Oliver Development platform.',
  robots: 'noindex, nofollow', // Prevent search engines from indexing login page
}

export default function LoginPage() {
  return (
    <MyFirebaseProvider>
      <Login />
    </MyFirebaseProvider>
  )
}
