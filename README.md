# SunglassIntelligence 🕶️

A comprehensive investor intelligence platform for analyzing the global sunglasses market with 80+ brands, market insights, and AI-powered analytics.

![Platform Preview](https://img.shields.io/badge/Platform-Investment%20Intelligence-blue)
![Brands](https://img.shields.io/badge/Brands-84-green)
![Market Size](https://img.shields.io/badge/Market%20Size-$28.5B-orange)

## 🚀 Features

### 📊 Comprehensive Brand Database
- **84 Global Brands** across all market segments
- **Revenue Analysis** with growth rates and market share
- **Investment Scores** (1-100 scale) for each brand
- **Geographic Distribution** across 20+ countries

### 🎯 Market Segments
- **Luxury Premium** (22 brands): Tom Ford, Gucci, Prada, Dior, Ray-Ban
- **Sports Performance** (20 brands): Oakley, Nike Vision, Under Armour, Smith Optics
- **Direct-to-Consumer** (12 brands): Warby Parker, Zenni Optical, EyeBuyDirect
- **Technology-Forward** (5 brands): Ray-Ban Stories, Snapchat Spectacles, Bose Frames
- **Sustainable/Eco** (7 brands): Pela Vision, Sea2see, SOLO Eyewear
- **Heritage & Premium** (18+ brands): American Optical, Moscot, Serengeti

### 🔍 Investment Intelligence
- **Market Analysis** with $28.5B total market size
- **Growth Tracking** from 3% (mature) to 234% (emerging tech)
- **47 Investment Opportunities** identified across segments
- **AI-Powered Insights** for market trends and predictions

### 🛠️ Technical Features
- **Real-time Dashboard** with KPIs and market metrics
- **Advanced Filtering** by category, revenue, growth rate
- **Search Functionality** across all brand data
- **API-Driven Architecture** with RESTful endpoints
- **Responsive Design** built with React + TypeScript

## 🏗️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for modern styling
- **Radix UI** for accessible components
- **Tanstack Query** for state management
- **React Router** for navigation

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **Drizzle ORM** for database operations
- **Zod** for data validation
- **TSX** for TypeScript execution

### Infrastructure
- **In-Memory Storage** (development)
- **PostgreSQL** ready (production)
- **SendGrid** integration for email reports
- **OpenAI** integration for AI insights

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/SunglassIntelligence.git
   cd SunglassIntelligence
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Seed the database**
   ```bash
   npx tsx seed-runner-new.js
   # Or use the API endpoint: POST /api/seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # Or: npx tsx server/index.ts
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📊 API Endpoints

### Brands
- `GET /api/brands` - Get all brands (with optional search)
- `GET /api/brands/:id` - Get specific brand
- `POST /api/brands` - Create new brand
- `PUT /api/brands/:id` - Update brand
- `DELETE /api/brands/:id` - Delete brand

### Market Data
- `GET /api/metrics` - Get market metrics
- `GET /api/insights` - Get AI insights
- `POST /api/insights/generate` - Generate new insights

### Utilities
- `POST /api/seed` - Seed database with sample data
- `POST /api/sync` - Sync market data
- `POST /api/email-reports/send` - Send market reports

## 💡 Key Investment Insights

### High-Growth Opportunities
- **D2C Disruptors**: 50-145% growth rates (Privé Revaux, Goodr, Lensabl)
- **Smart Glasses**: 67-234% growth rates (emerging tech segment)
- **Sustainable Brands**: 28-89% growth rates (growing eco-consciousness)

### Market Leaders
- **Luxottica**: $4.2B revenue, 18.7% market share
- **Ray-Ban**: $3.2B revenue, 15.2% market share
- **Oakley**: $2.8B revenue, 12.8% market share

### Emerging Markets
- **Asian Expansion**: JINS, Zoff, Owndays growing globally
- **Tech Integration**: AR/camera features in sunglasses
- **Sustainability**: Ocean plastic and biodegradable materials

## 📁 Project Structure

```
SunglassIntelligence/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities and configurations
├── server/                 # Express backend
│   ├── services/           # External service integrations
│   ├── routes.ts           # API route definitions
│   ├── storage.ts          # Data storage layer
│   └── seed-data.ts        # Database seeding
├── shared/                 # Shared types and schemas
└── docs/                   # Documentation
```

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run check` - TypeScript type checking
- `npm start` - Start production server

### Database Seeding
The platform includes comprehensive seed data for 84 sunglass brands. To populate the database:

```bash
# Via script
npx tsx seed-runner-new.js

# Via API
curl -X POST http://localhost:3000/api/seed
```

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables
```env
PORT=3000
SENDGRID_API_KEY=your_sendgrid_key
OPENAI_API_KEY=your_openai_key
DATABASE_URL=your_database_url  # For production
```

## 📈 Market Data

The platform tracks 84 brands across 7 major categories with:
- **Revenue Range**: $3.5M - $4.2B
- **Growth Rates**: 3.2% - 234.5%
- **Investment Scores**: 65-94 (out of 100)
- **Global Presence**: 20+ countries covered

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Brand data compiled from industry research and public sources
- Built with modern web technologies for optimal performance
- Designed for investor intelligence and market analysis

---

**Made with ❤️ for the global sunglasses investment community**

For questions or support, please open an issue or contact the development team.
