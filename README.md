<div align="center"><a href="https://shineii86.github.io/AniList"><img src="https://raw.githubusercontent.com/Shineii86/AniList/refs/heads/main/assets/images/LOGOv1.png" LOGO" width="200" height="200"/></a>
  
  # [AniLeveling](https://github.com/Shineii86/AniLeveling)

A **Solo Leveling-inspired** GitHub statistics dashboard built with Next.js, Tailwind CSS, and the GitHub API. Visualize your coding journey with dark, animated UI elements and comprehensive analytics.

![Repo Size](https://img.shields.io/github/repo-size/Shineii86/AniLeveling?style=for-the-badge) [![GitHub Stars](https://img.shields.io/github/stars/Shineii86/AniLeveling?style=for-the-badge)](https://github.com/Shineii86/AniLeveling/stargazers) [![GitHub Forks](https://img.shields.io/github/forks/Shineii86/AniLeveling?style=for-the-badge)](https://github.com/Shineii86/AniLeveling/fork)

![GitHub Shadow Stats](https://img.shields.io/badge/version-1.0.0-purple?style=for-the-badge) ![Next.js](https://img.shields.io/badge/Next.js-13+-black?style=for-the-badge&logo=next.js) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-blue?style=for-the-badge&logo=tailwindcss)

</div>

## ✨ Features

- 🎨 **Solo Leveling-inspired UI** with dark theme and purple accents
- 📊 **Interactive Charts** using Recharts for data visualization
- 🔥 **Smooth Animations** with Framer Motion
- 📱 **Responsive Design** that works on all devices
- ⚡ **Fast Performance** with Next.js and optimized API calls
- 🎯 **Comprehensive Analytics**:
  - User profile information
  - Repository statistics
  - Programming language breakdown
  - Contribution tracking
  - Star and fork counts
  - Top repositories showcase

## 🚀 Live Demo

Visit the live application: [GitHub Shadow Stats](https://anileveling.vercel.app)

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18
- **Styling**: Tailwind CSS 3.4
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **API**: GitHub REST API + GraphQL API
- **Deployment**: Vercel

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- GitHub Personal Access Token

### 1. Clone the repository

```bash
git clone https://github.com/Shineii86/AniLeveling
cd AniLeveling
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
GITHUB_TOKEN=your_github_personal_access_token_here
```

**How to get a GitHub token:**
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate a new token (classic)
3. Select scopes: `public_repo`, `read:user`, `read:org`
4. Copy the token and paste it in your `.env.local` file

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your `GITHUB_TOKEN` environment variable in Vercel dashboard
4. Deploy!

### Manual Deployment

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
AniLeveling/
├── src/
│   ├── components/
│   │   ├── charts/          # Chart components (Pie, Bar)
│   │   ├── layout/          # Layout components (Navbar, Footer)
│   │   └── ui/              # UI components (Cards, Loading, Error)
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # API functions and utilities
│   ├── pages/               # Next.js pages
│   │   ├── api/             # API routes
│   │   ├── _app.jsx         # App wrapper
│   │   ├── index.jsx        # Home page
│   │   └── stats.jsx        # Stats dashboard
│   ├── styles/              # Global styles
│   ├── themes/              # Theme configuration
│   └── config/              # Site configuration
├── public/                  # Static assets
├── .env.local              # Environment variables
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind configuration
└── vercel.json            # Vercel deployment config
```

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.ts` to customize the Solo Leveling color scheme:

```javascript
colors: {
  primary: {
    500: '#843dff', // Main purple
    600: '#7c3aed',
    // ... other shades
  }
}
```

### API Rate Limits

The GitHub API has rate limits:
- **Authenticated requests**: 5,000 per hour
- **Unauthenticated requests**: 60 per hour

This app uses authenticated requests with your token for higher limits.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the **Solo Leveling** manhwa/anime aesthetic
- Built with the amazing [GitHub API](https://docs.github.com/en/rest)
- UI components inspired by modern dashboard designs
- Charts powered by [Recharts](https://recharts.org/)

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/Shineii86/AniLeveling/issues) page
2. Create a new issue if your problem isn't already reported
3. Join our [Discussions](https://github.com/Shineii86/AniLeveling/discussions)

---

## 💕 Loved My Work?

🚨 [Follow me on GitHub](https://github.com/Shineii86)

⭐ [Give a star to this project](https://github.com/Shineii86/AniLeveling)

<div align="center">

<a href="https://github.com/Shineii86/AniLeveling">
<img src="https://github.com/Shineii86/AniPay/blob/main/Source/Banner6.png" alt="Banner">
</a>
  
  *For inquiries or collaborations:*
     
[![Telegram Badge](https://img.shields.io/badge/-Telegram-2CA5E0?style=flat&logo=Telegram&logoColor=white)](https://telegram.me/Shineii86 "Contact on Telegram")
[![Instagram Badge](https://img.shields.io/badge/-Instagram-C13584?style=flat&logo=Instagram&logoColor=white)](https://instagram.com/ikx7.a "Follow on Instagram")
[![Pinterest Badge](https://img.shields.io/badge/-Pinterest-E60023?style=flat&logo=Pinterest&logoColor=white)](https://pinterest.com/ikx7a "Follow on Pinterest")
[![Gmail Badge](https://img.shields.io/badge/-Gmail-D14836?style=flat&logo=Gmail&logoColor=white)](mailto:ikx7a@hotmail.com "Send an Email")

  <sup><b>Copyright © 2025 <a href="https://telegram.me/Shineii86">Shinei Nouzen</a> All Rights Reserved</b></sup>

![Last Commit](https://img.shields.io/github/last-commit/Shineii86/AniList?style=for-the-badge)

</div>
