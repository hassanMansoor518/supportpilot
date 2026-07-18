<div align="center">
  <h1>🚀 SupportPilot</h1>
  <p><strong>The All-in-One AI Customer Support & Chatbot SaaS Platform</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Google%20Gemini-4285F4?style=for-the-badge&logo=google-gemini&logoColor=white" alt="Gemini AI" />
  </p>
</div>

<hr />

## 📖 Overview

**SupportPilot** is a production-ready, highly scalable SaaS platform designed to revolutionize customer support. It enables businesses to create, configure, and embed intelligent AI chatbots — powered by **Google Gemini** — into their websites within minutes. Alongside the chatbot functionality, it offers a centralized Help Center management system, seamless third-party integrations, and a comprehensive billing module.

## ✨ Core Features

*   💬 **Embeddable Chat Widget**: A lightweight, high-performance vanilla JS chat widget (`chatBot.js`) featuring a modern glass-morphism UI. Easily embeddable via a single script tag.
*   🧠 **Advanced Chatbot Playground**: A developer-centric testing environment to refine prompt engineering, manage conversational context, and debug AI interactions before going live.
*   📚 **Help Center Architecture**: A beautifully designed, dynamic CMS to manage categories and support articles, fully optimized for SEO and readability.
*   💳 **Billing Module**: Subscription plan management with usage tracking, invoice history, payment methods, and plan upgrade/cancel flows.
*   🔐 **Secure Authentication**: Robust user authentication and session management handled by NextAuth.js.
*   ⚡ **Modern Dashboard**: A highly responsive, analytics-driven dashboard UI built with clean, minimalist aesthetics.

## 🛠️ Technology Stack

*   **Frontend**: Next.js 15 (App Router), React, Custom CSS
*   **Backend**: Next.js API Routes (Serverless), Node.js
*   **Database**: MongoDB (via Mongoose)
*   **Authentication**: NextAuth.js
*   **AI Engine**: Google Gemini API
*   **Data Fetching & State**: TanStack React Query, Axios

## 📂 Project Structure

```text
supportpilot/
├── public/
│   └── chatBot.js                  # Embeddable chat widget script
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/               # NextAuth authentication endpoints
│   │   │   ├── Chat/               # AI chat inference endpoint (Gemini)
│   │   │   ├── billing/            # Billing (overview, invoices, payment-methods)
│   │   │   ├── chat-history/       # Chat history CRUD
│   │   │   ├── chatbot/            # Single chatbot operations
│   │   │   ├── chatbots/           # Chatbot list / create
│   │   │   ├── playground/         # Test playground API
│   │   │   ├── settings/           # User settings
│   │   │   ├── subscriptions/      # Subscription management
│   │   │   └── usage/              # Usage tracking
│   │   ├── dashboard/
│   │   │   ├── billing/            # Billing pages (overview, subscription, invoices, etc.)
│   │   │   ├── chatbot-settings/   # Chatbot configuration page
│   │   │   ├── chatbots/           # Chatbot list page
│   │   │   ├── help/               # Help Center CMS
│   │   │   ├── integrations/       # Third-party integrations page
│   │   │   ├── test-playground/    # AI chatbot test playground
│   │   │   ├── layout.tsx          # Dashboard shell (sidebar + navbar)
│   │   │   └── page.tsx            # Dashboard home
│   │   ├── login/                  # Login page
│   │   ├── register/               # Registration page
│   │   ├── layout.tsx              # Root layout
│   │   └── page.tsx                # Landing page
│   ├── components/
│   │   ├── billing/                # Billing UI components (Plans, Invoices, Usage, etc.)
│   │   ├── help-center/            # Help Center UI components
│   │   ├── providers/              # React context & TanStack Query providers
│   │   ├── sections/               # Landing page sections
│   │   ├── ui/                     # Shared UI primitives
│   │   ├── ChatbotSettings.tsx     # Chatbot create/edit form
│   │   ├── DashboardLeftSide.tsx   # Sidebar navigation
│   │   ├── DashboardNavbar.tsx     # Top navbar with breadcrumbs
│   │   ├── IntegrationsContent.tsx # Integrations page content
│   │   └── TestPlaygroundClient.tsx # Interactive chatbot playground UI
│   ├── hooks/                      # Custom React hooks
│   ├── lib/
│   │   ├── auth.ts                 # NextAuth configuration
│   │   ├── db.ts                   # MongoDB connection helper
│   │   ├── stripe.ts               # Stripe server-side utilities
│   │   ├── stripeClient.ts         # Stripe client-side helper
│   │   ├── apiResponse.ts          # Standardized API response helper
│   │   └── utils.ts                # General utility functions
│   ├── middlewares/                # Custom request middlewares
│   ├── model/
│   │   ├── user.model.ts
│   │   ├── chatbot.model.ts
│   │   ├── chatHistory.model.ts
│   │   ├── subscription.model.ts
│   │   ├── plan.model.ts
│   │   ├── invoice.model.ts
│   │   ├── payment.model.ts
│   │   ├── paymentMethod.model.ts
│   │   ├── usage.model.ts
│   │   ├── coupon.model.ts
│   │   ├── setting.model.ts
│   │   └── auditLog.model.ts
│   ├── repositories/               # Data access layer (DB query abstractions)
│   ├── services/                   # Business logic layer
│   ├── types/                      # TypeScript type definitions
│   └── validators/                 # Input validation schemas
├── .env.local                      # Environment variables (ignored in git)
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
*   [Node.js](https://nodejs.org/en/) (v18.17 or higher)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
*   A [MongoDB](https://www.mongodb.com/) cluster URI
*   A [Stripe](https://stripe.com/) Developer Account

### Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/supportpilot.git
   cd supportpilot
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root of your project and configure the required keys:
   ```env
   # Application
   NEXT_PUBLIC_APP_URL=http://localhost:3000

   # Database
   MONGODB_URI=your_mongodb_connection_string

   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_super_secret_key

   # Stripe
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

### Running the Application

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page will automatically reload if you make edits.

## 📦 Deployment

This Next.js application is optimized for deployment on Vercel. 

1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. Add your environment variables in the Vercel dashboard.
4. Deploy!

For Stripe, remember to update your webhook endpoints in the Stripe Developer Dashboard to point to your production URL.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/supportpilot/issues).

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
