# ODORATUS — Fragrance Storefront

A full-stack e-commerce storefront for a fictional independent fragrance house, built as a graduation project for the **Eraasoft and iCareer Bootcamp**.

## 🎥 Demo

[Watch the project demo](https://drive.google.com/drive/folders/1ytnPvIQO4Pz0N783rNorQ723b3qn7Uh3?usp=sharing)

## 🔗 Live Links

- **Storefront (Frontend):** https://odoratus-perfumes.vercel.app
- **Content Dashboard (Sanity Studio):** https://odoratus-cms.sanity.studio

## ✨ Features

- Product catalog with search, filtering (category, scent family, occasion, price), and sorting
- Product detail pages with variant/volume selection and gift wrapping option
- Shopping cart with persistent state (Zustand + localStorage)
- Checkout flow that generates a WhatsApp order message
- Wishlist
- Product reviews & ratings
- FAQs and Contact pages
- Full English/Arabic (RTL) internationalization with locale-aware routing
- Content managed via Sanity CMS, with a mock data fallback for local development

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router), TypeScript
- **Styling:** Tailwind CSS
- **State management:** Zustand, React Query
- **CMS:** Sanity
- **Internationalization:** next-intl
- **Animation:** GSAP (ScrollTrigger)

## 📁 Project Structure

This repository contains two apps:
- `website/` — the Next.js storefront (frontend)
- `dashboard/` — the Sanity Studio content dashboard (backend/CMS)

## 🚀 Running Locally

See the setup instructions in each app's folder (`dashboard/` and `website/`) for environment variables and installation steps.
