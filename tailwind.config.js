/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      fontFamily: { 
        ui: ['Segoe UI', 'Tahoma', 'Verdana', 'sans-serif'],
        title: ['Segoe UI', 'Trebuchet MS', 'sans-serif']
      },
      boxShadow: {
        // Vista Aero glass shadows
        'vista': '0 0 0 1px rgba(255,255,255,0.4) inset, 0 1px 0 rgba(255,255,255,0.8) inset, 0 4px 20px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.4)',
        'vista-window': '0 0 0 1px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1) inset',
        'vista-btn': 'inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 2px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.2)',
        'vista-btn-hover': 'inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 2px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.3)',
        'vista-pressed': 'inset 0 2px 4px rgba(0,0,0,0.2), inset 0 1px 2px rgba(0,0,0,0.1)',
        'vista-taskbar': '0 -1px 0 rgba(255,255,255,0.1) inset, 0 1px 4px rgba(0,0,0,0.5)',
        'vista-icon': '0 2px 8px rgba(0,0,0,0.6)',
        'vista-start': '0 0 0 1px rgba(255,255,255,0.3) inset, 0 2px 0 rgba(255,255,255,0.2) inset, 0 -2px 4px rgba(0,0,0,0.3) inset, 0 2px 8px rgba(0,0,0,0.4)',
        'glass-inset': 'inset 0 0 30px rgba(255,255,255,0.1)',
        'xp': 'inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.3)'
      },
      colors: {
        // Vista Aero color palette
        vista: {
          blue: '#4580c4',
          bluedark: '#1e3f66',
          bluelight: '#6ba3d6',
          glass: 'rgba(24, 56, 99, 0.75)',
          glassdark: 'rgba(0, 20, 50, 0.85)',
          glasslight: 'rgba(120, 170, 220, 0.4)',
          accent: '#b8d4ed',
          text: '#1a1a1a',
          highlight: '#fff5cc',
        },
        // XP legacy colors
        xpblue: '#245EDC',
        xpbluedark: '#1540A0',
        xplite: '#DDE8FE',
        xpgrey: '#C0C0C0',
        xpdark: '#404040',
        xpgreen: '#39A845',
        xpstart: '#2D6E2D'
      },
      backgroundImage: {
        // Vista gradients
        'vista-titlebar': 'linear-gradient(180deg, rgba(120,180,240,0.95) 0%, rgba(60,120,200,0.9) 45%, rgba(40,90,170,0.95) 50%, rgba(50,100,180,0.9) 100%)',
        'vista-titlebar-inactive': 'linear-gradient(180deg, rgba(180,190,200,0.9) 0%, rgba(140,155,170,0.85) 45%, rgba(120,135,155,0.9) 50%, rgba(130,145,165,0.85) 100%)',
        'vista-glass': 'linear-gradient(180deg, rgba(200,220,240,0.3) 0%, rgba(150,180,220,0.15) 100%)',
        'vista-button': 'linear-gradient(180deg, #f7f7f7 0%, #e9e9e9 45%, #d3d3d3 50%, #e5e5e5 100%)',
        'vista-button-hover': 'linear-gradient(180deg, #fdfeff 0%, #e4f0fc 45%, #c4dcf4 50%, #d8ebf9 100%)',
        'vista-button-pressed': 'linear-gradient(180deg, #c4dcf4 0%, #98c1ed 45%, #72a8e0 50%, #8ebde8 100%)',
        'vista-close': 'linear-gradient(180deg, #f08080 0%, #dc4040 50%, #c03030 100%)',
        'vista-close-hover': 'linear-gradient(180deg, #ff9090 0%, #ff5050 50%, #e04040 100%)',
        'vista-taskbar': 'linear-gradient(180deg, rgba(60,90,130,0.95) 0%, rgba(30,50,80,0.98) 100%)',
        'vista-start-btn': 'radial-gradient(ellipse at 50% 30%, #7ed95a 0%, #51b82e 40%, #3a9921 70%, #2d7a19 100%)',
        'vista-start-hover': 'radial-gradient(ellipse at 50% 30%, #98f070 0%, #65d040 40%, #4ab82e 70%, #3a9921 100%)',
        // Vista desktop wallpaper style
        'vista-wallpaper': 'linear-gradient(135deg, #0a1628 0%, #0f2847 25%, #1a4068 50%, #0d2a4a 75%, #061222 100%)',
        'vista-aurora': 'radial-gradient(ellipse at 50% 100%, rgba(50,180,255,0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(100,200,255,0.15) 0%, transparent 40%), radial-gradient(ellipse at 20% 90%, rgba(0,100,180,0.2) 0%, transparent 50%)',
        // XP legacy
        'xp-gradient': 'linear-gradient(180deg, #3A6EA5 0%, #2C4A7A 100%)',
        'xp-titlebar': 'linear-gradient(180deg, #3D73D3 0%, #1D4ED8 100%)',
        'xp-button': 'linear-gradient(180deg, #FDFDFD 0%, #DADADA 100%)',
        'xp-button-pressed': 'linear-gradient(180deg, #DADADA 0%, #FDFDFD 100%)'
      },
      borderRadius: {
        'vista': '8px',
        'vista-top': '8px 8px 0 0',
      },
      animation: {
        'vista-glow': 'vista-glow 3s ease-in-out infinite',
        'glass-shimmer': 'glass-shimmer 8s ease-in-out infinite',
      },
      keyframes: {
        'vista-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(100,180,255,0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(100,180,255,0.5)' },
        },
        'glass-shimmer': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      }
    }
  },
  plugins: []
}
