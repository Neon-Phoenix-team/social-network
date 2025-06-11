declare module 'react-google-recaptcha' {
  import * as React from 'react';

  export interface ReCAPTCHAProps {
    sitekey: string;
    onChange?: (token: string | null) => void;
    onExpired?: () => void;
    onErrored?: () => void;
    theme?: 'light' | 'dark';
    size?: 'compact' | 'normal' | 'invisible';
    badge?: 'bottomright' | 'bottomleft' | 'inline';
    tabindex?: number;
    stoken?: string;
    hl?: string;
    isolated?: boolean;
  }

  export default class ReCAPTCHA extends React.Component<ReCAPTCHAProps> {}
}