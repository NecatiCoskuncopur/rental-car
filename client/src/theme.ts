const theme = {
  typography: {
    fontSizes: {
      $1: '12px',
      $2: '14px',
      $3: '16px',
      $4: '18px',
      $5: '20px',
      $6: '24px',
      $7: '28px',
      $8: '32px',
      $9: '36px',
    },
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
      extraBold: 800,
      black: 900,
    },
  },
  spacing: {
    $1: '2px',
    $2: '4px',
    $3: '8px',
    $4: '12px',
    $5: '16px',
    $6: '20px',
    $7: '24px',
    $8: '28px',
    $9: '32px',
    $10: '36px',
    $11: '40px',
    $12: '48px',
    $13: '60px',
    $14: '80px',
    $15: '100px',
  },
  borderRadius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '16px',
    round: '50%',
  },
  device: {
    wideScreen: '(max-width: 1440px)',
    desktop: '(max-width: 1280px)',
    laptop: '(max-width: 1024px)',
    tablet: '(max-width: 768px)',
    mobile: '(max-width: 640px)',
    mini: '(max-width: 425px)',
  },
  colors: {
    // Base Colors
    black: '#000000',
    white: '#FFFFFF',

    // Primary Colors
    red: '#FF0000',
    orange: '#FF9307',
    yellow: '#FCB215',
    green: '#25D366',
    blue: '#0066FF',

    // Light and Dark Blues
    lightBlue: '#35B6FF',
    darkBlue: '#3080F8',

    // Grays
    lightGray: '#F4F4F4',
    gray: '#888888',
    darkGray: '#676767',
    blackGray: '#111111',
    darkerGray: '#2F2F2F',
    almostBlack: '#212121',
    extraDarkGray: '#201F1D',

    // Backgrounds & Neutrals
    bgLight: '#F8F9FA',
    bgLighter: '#F2F7F6',
    bgMedium: '#E3E3E3',
    bgDark: '#3F4254',
    bgExtraLight: '#F0F5F9',

    // Social Media Colors
    facebookBlue: '#3B5998',
    linkedinBlue: '#0077B5',
    twitterBlue: '#65B8FF',
    whatsappGreen: '#25D366',
    instagramRed: '#BD081C',
    redditOrange: '#FF4500',

    // Other specific colors
    warningOrange: '#FFA633',
    infoBlue: '#0085DB',
    successGreen: '#1FBC2F',
    errorRed: '#FF2D20',
    softRed: '#FCFBFB',
    softBlue: '#9CC2E5',
    softGray: '#DBDBDB',
    lightShell: '#F1F1F1',
    lightMist: '#E9F2FF',
    steelBlue: '#8EB5E9',
    darkNavy: '#28283C',
    darkShark: '#212529',
    coolSurf: '#127384',
    royalBlue: '#405FF2',
  },
} as const;

export default theme;
