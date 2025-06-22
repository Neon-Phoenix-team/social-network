import GoogleSvgrepoCom1 from '@/assets/icons/components/GoogleSvgrepoCom1'


export const GoogleLoginButton = () => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  //const REDIRECT_URL = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL
  const REDIRECT_URL_DEV = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL_DEV

  const AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_DEV}&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=consent`;

  const login = () => {
    window.location.assign(AUTH_URL)
  }

  return (
    <div>
      <button onClick={login}>
        <GoogleSvgrepoCom1/>
      </button>
    </div>
  )
}