# SunglassMarket Analytics Platform

## Overview

This is a comprehensive market analytics platform for the sunglass industry, built with a modern full-stack architecture. The application provides AI-powered insights, brand database management, market research capabilities, and automated email reporting for investment analysis in the eyewear market.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Framework**: Radix UI primitives with shadcn/ui components
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state
- **Build Tool**: Vite with custom configuration for development and production

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API with JSON responses
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Session Storage**: PostgreSQL-based sessions with connect-pg-simple

### Development Setup
- **Monorepo Structure**: Client and server code in separate directories with shared schema
- **Development Server**: Vite dev server with Express API proxy
- **Build Process**: Separate builds for client (Vite) and server (esbuild)

## Key Components

### Database Schema (`shared/schema.ts`)
- **Brands Table**: Core brand information including name, category, revenue, growth rate, market share, investment score, locations, and company details
- **Market Metrics Table**: Aggregated market data including total brands, market size, opportunities, and insights count
- **AI Insights Table**: Generated insights with type classification (opportunity, trend, risk), confidence scores
- **Email Reports Table**: Tracking of sent reports with recipient, content, and delivery status

### API Routes (`server/routes.ts`)
- **Brand Management**: CRUD operations for brand data with search functionality
- **Market Metrics**: Endpoints for retrieving and updating market statistics
- **AI Insights**: Generation and retrieval of AI-powered market analysis
- **Email Reports**: Automated report generation and delivery tracking

### Storage Layer (`server/storage.ts`)
- **Abstract Interface**: IStorage interface defining all data operations
- **Memory Implementation**: In-memory storage for development with full CRUD operations
- **Database Integration**: Ready for PostgreSQL integration via Drizzle ORM

### External Service Integration
- **OpenAI Integration**: GPT-4o model for generating market insights and brand analysis
- **SendGrid Integration**: Email delivery service for automated reports
- **Neon Database**: Serverless PostgreSQL for production data storage

### Frontend Pages
- **Dashboard**: KPI overview, market charts, AI insights, and brand performance tables
- **Brand Database**: Comprehensive brand management with search and filtering
- **AI Analysis**: Detailed AI-generated insights with confidence scoring
- **Market Research**: Market trends, category analysis, and competitive intelligence
- **Email Reports**: Report generation, scheduling, and delivery tracking
- **Settings**: API key management, email configuration, and system preferences

## Data Flow

1. **Brand Data Ingestion**: Brands are added through the UI or API, stored in PostgreSQL
2. **Market Metrics Calculation**: Aggregated statistics computed from brand data
3. **AI Analysis Pipeline**: Brand data sent to OpenAI API for insight generation
4. **Report Generation**: Market data compiled into formatted email reports
5. **Email Delivery**: Reports sent via SendGrid with delivery tracking
6. **Real-time Updates**: TanStack Query provides optimistic updates and cache management

## External Dependencies

### Required API Keys
- **OpenAI API Key**: Required for AI insight generation (GPT-4o model)
- **SendGrid API Key**: Required for email report delivery
- **Database URL**: PostgreSQL connection string (Neon serverless recommended)

### Third-party Services
- **Neon Database**: Serverless PostgreSQL hosting
- **OpenAI**: AI model API for market analysis
- **SendGrid**: Transactional email service
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework

### Development Tools
- **Vite**: Frontend build tool and dev server
- **Drizzle Kit**: Database schema management and migrations
- **esbuild**: Server-side bundling for production
- **TypeScript**: Type safety across the entire stack

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with Express API on separate ports
- **Database**: Local PostgreSQL or Neon development database
- **Environment Variables**: `.env` file for API keys and database URL
- **Hot Reload**: Full-stack hot reloading with Vite middleware integration

### Production Deployment
- **Build Process**: 
  - Client: `vite build` outputs to `dist/public`
  - Server: `esbuild` bundles to `dist/index.js`
- **Static Serving**: Express serves built client files in production
- **Database**: Neon serverless PostgreSQL with connection pooling
- **Environment**: Production environment variables for all API keys and database URL

### Database Management
- **Schema**: Defined in `shared/schema.ts` with Drizzle ORM
- **Migrations**: Generated with `drizzle-kit` and stored in `migrations/` directory
- **Deployment**: `db:push` command for schema updates to production database

The application is designed for easy deployment on platforms like Replit, with automatic environment detection and graceful fallbacks for missing API keys during development.