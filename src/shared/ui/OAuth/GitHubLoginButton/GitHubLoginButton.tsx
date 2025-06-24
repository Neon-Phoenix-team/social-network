import { GitHubIcon } from '@/shared/assets/icons/common/GitHubIcon'
import { Button } from '@/shared/ui/Button/Button'

export const GitHubLoginButton = () => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
  //const REDIRECT_URL = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URL
  const REDIRECT_URL_DEV = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URL_DEV

  const AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_DEV}&scope=user:email`
  const login = () => {
    window.location.assign(AUTH_URL)
  }

  return (
    <Button variant={'text'} onClick={login}>
      <GitHubIcon />
    </Button>
  )
}
