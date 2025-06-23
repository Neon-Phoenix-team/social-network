import { baseApi } from '@/shared/api/baseApi'

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    loginWithGoogle: build.mutation<
      { accessToken: 'string', email: 'string' },
      { code: string; redirectUrl: string }>({
      query: ({ code, redirectUrl }) => ({
        url: '/api/v1/auth/google/login',
        method: 'POST',
        body: {
          code,
          redirectUrl,
        },
      }),
    }),
    loginWithGitHub: build.query<undefined, void>({
      query: () => {
        const redirectUrl = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URL_DEV!;
        return `/api/v1/auth/github/login?redirect_url=${encodeURIComponent(redirectUrl)}`;
      },
    }),
  }),
})


export const { useLoginWithGoogleMutation, useLazyLoginWithGitHubQuery} = authApi;