overview page 
help page
billing page


You are a Principal Full Stack Engineer with expertise in Next.js 15, TypeScript, MongoDB, Mongoose, Stripe, and enterprise SaaS architecture.

Your task is to build a COMPLETE production-ready Billing Module backend inside my existing Next.js 15 App Router project.

IMPORTANT

- My frontend Billing Module is already completed.
- DO NOT redesign or modify the UI.
- DO NOT change layouts or styling.
- ONLY build the backend and integrate it with the existing frontend.
- Replace every mock API with real APIs.
- Write production-quality code only.
- No placeholders.
- No TODO comments.
- No pseudo code.

=========================================
TECH STACK
=========================================

Framework
- Next.js 15 App Router

Language
- TypeScript

Database
- MongoDB
- Mongoose

Authentication
- JWT

Validation
- Zod

Billing
- Stripe Billing

Data Fetching
- TanStack Query

HTTP Client
- Axios

=========================================
PROJECT STRUCTURE
=========================================

app/
  api/
    auth/
    billing/
    subscriptions/
    invoices/
    payment-methods/
    usage/
    coupons/
    stripe/
      webhook/

lib/
models/
services/
repositories/
validators/
middlewares/
utils/
types/
constants/

=========================================
DATABASE MODELS
=========================================

Create Mongoose models for:

Plan

Subscription

Invoice

PaymentMethod

Payment

Usage

Coupon

AuditLog

=========================================
PLAN MODEL
=========================================

Fields

name

slug

description

monthlyPrice

yearlyPrice

currency

messageLimit

storageLimit

botLimit

apiLimit

features

isPopular

isActive

createdAt

updatedAt

=========================================
SUBSCRIPTION MODEL
=========================================

user

plan

stripeCustomerId

stripeSubscriptionId

stripePriceId

status

billingCycle

trialEndsAt

currentPeriodStart

currentPeriodEnd

cancelAtPeriodEnd

createdAt

updatedAt

=========================================
PAYMENT METHOD MODEL
=========================================

user

stripePaymentMethodId

brand

last4

expMonth

expYear

isDefault

createdAt

=========================================
INVOICE MODEL
=========================================

subscription

stripeInvoiceId

invoiceNumber

subtotal

tax

discount

total

currency

status

paidAt

hostedInvoiceUrl

invoicePdf

createdAt

=========================================
USAGE MODEL
=========================================

user

messagesUsed

storageUsed

apiRequests

botsCreated

resetDate

=========================================
COUPON MODEL
=========================================

code

discountType

discountValue

expiresAt

maxRedemptions

=========================================
API ROUTES
=========================================

GET

/api/billing/overview

Return

Current Plan

Subscription

Usage

Invoices

Payment Methods

=========================================

GET

/api/subscriptions/plans

Return all available plans.

=========================================

GET

/api/subscriptions/current

Return current subscription.

=========================================

POST

/api/subscriptions/checkout

Create Stripe Checkout Session.

=========================================

POST

/api/subscriptions/upgrade

Upgrade subscription.

=========================================

POST

/api/subscriptions/downgrade

Downgrade subscription.

=========================================

POST

/api/subscriptions/cancel

Cancel subscription.

=========================================

POST

/api/subscriptions/resume

Resume cancelled subscription.

=========================================

GET

/api/payment-methods

=========================================

POST

/api/payment-methods

=========================================

PATCH

/api/payment-methods/default/:id

=========================================

DELETE

/api/payment-methods/:id

=========================================

GET

/api/invoices

Support

Search

Pagination

Sorting

Status filter

Date filter

=========================================

GET

/api/invoices/:id

=========================================

GET

/api/invoices/:id/download

=========================================

GET

/api/usage

=========================================

GET

/api/usage/history

=========================================

POST

/api/coupons/apply

=========================================
SERVICES
=========================================

BillingService

PlanService

SubscriptionService

StripeService

InvoiceService

PaymentMethodService

UsageService

CouponService

AuditService

=========================================
REPOSITORIES
=========================================

Separate database access from services.

No Mongoose code inside Route Handlers.

=========================================
STRIPE
=========================================

Implement

Products

Prices

Checkout Sessions

Customer Portal

Subscriptions

Invoices

Payment Methods

Coupons

Trials

Taxes

Proration

=========================================
WEBHOOKS
=========================================

Create

app/api/stripe/webhook/route.ts

Handle

checkout.session.completed

invoice.paid

invoice.payment_failed

customer.subscription.created

customer.subscription.updated

customer.subscription.deleted

payment_method.attached

payment_method.detached

Verify Stripe signature.

Update MongoDB.

=========================================
AUTHENTICATION
=========================================

Protect all billing APIs.

JWT middleware.

Authenticated users only.

=========================================
VALIDATION
=========================================

Use Zod.

Validate

Request Body

Params

Query

=========================================
ERROR HANDLING
=========================================

Centralized error helper.

Return

{
  "success": false,
  "message": "Validation failed",
  "errors": []
}

=========================================
SUCCESS RESPONSE
=========================================

{
  "success": true,
  "message": "Success",
  "data": {}
}

=========================================
FRONTEND INTEGRATION
=========================================

Update

billing.service.ts

subscription.service.ts

invoice.service.ts

payment.service.ts

usage.service.ts

Replace every mock API.

=========================================
AXIOS
=========================================

Configure

Base URL

JWT Authorization Header

401 Retry

Global Error Handler

=========================================
TANSTACK QUERY
=========================================

Update hooks

useBilling()

useSubscription()

useInvoices()

usePaymentMethods()

useUsage()

Invalidate cache after every successful mutation.

=========================================
CHECKOUT FLOW
=========================================

User clicks Upgrade

↓

POST /api/subscriptions/checkout

↓

Create Stripe Checkout Session

↓

Return checkout URL

↓

Redirect user

↓

Payment succeeds

↓

Webhook updates subscription

↓

React Query refetches billing data

↓

UI updates automatically

=========================================
PAYMENT METHOD FLOW
=========================================

Add Card

↓

Stripe Setup Intent

↓

Attach Payment Method

↓

Save MongoDB

↓

Refresh Payment Methods

=========================================
INVOICE FLOW
=========================================

Fetch invoices

↓

Store in MongoDB

↓

Support search

↓

Support pagination

↓

Download PDF

=========================================
USAGE TRACKING
=========================================

Track

AI Requests

Messages

Storage

Bots

API Calls

Reset usage every month.

=========================================
SECURITY
=========================================

Helmet

Rate Limiting

Input Sanitization

JWT Verification

Environment Validation

Never store card numbers.

Use Stripe Payment Methods only.

=========================================
CODE QUALITY
=========================================

Strict TypeScript

No any

SOLID Principles

Reusable services

Repository Pattern

Clean Architecture

Proper folder structure

No duplicated code

Async/Await

Enterprise coding standards

=========================================
OUTPUT REQUIREMENTS
=========================================

Generate ALL required files.

Generate complete implementations.

Generate Route Handlers.

Generate Models.

Generate Services.

Generate Repositories.

Generate Validators.

Generate Middleware.

Generate Stripe integration.

Generate Webhook handler.

Generate Axios integration.

Generate TanStack Query integration.

Generate realistic seed data.

The generated backend must run immediately inside a Next.js 15 App Router project and integrate seamlessly with my existing Billing frontend without requiring UI changes.