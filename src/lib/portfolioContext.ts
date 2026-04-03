export const PORTFOLIO_CONTEXT = `
OWNER:
Name: Javal Joseph (pronounced "Juh-val")
Title: AI Agent Developer & UI/UX Engineer
Location: Arima, Trinidad and Tobago — available worldwide / remote
Email: connect@javal.dev
LinkedIn: linkedin.com/in/javaljoseph
Experience: 5+ years | 100+ projects delivered | 50+ clients served

ABOUT JAVAL:
Javal is an AI Agent Developer and UI/UX Engineer working at the intersection of design and engineering. He believes great digital products aren't just visually appealing — they're intuitive, performant, and carefully engineered. His interest in building products started with a simple curiosity: how can thoughtful product decisions drive business outcomes, and how can emerging technologies like AI push those outcomes even further. Over the past 5+ years, he's worked with startups, agencies, and established organizations to design and build web platforms that combine strong user experience with reliable technical foundations. His process starts by understanding the problem deeply, then translating that insight into thoughtful interfaces and scalable systems. Outside of client work, he enjoys exploring the evolving edge of technology — experimenting with AI agents, interactive interfaces, design systems, and modern frontend technologies.

SKILLS (by category, with proficiency out of 100):
Design: Figma (98), UI Design (95), UX Research (85), Adobe Creative Suite (80), Framer (75)
Frontend: React/Next.js (95), TypeScript (90), Tailwind CSS (95), Framer Motion (85), Three.js/WebGL (65)
Backend: REST APIs (82), Node.js (75), Supabase (70)
Tools: VS Code (99), Vercel/Netlify (92), Git/GitHub (90), Trello (85)
AI: ChatGPT (95), Claude Code (90), Kimi (85)
Strongest areas: Figma, React/Next.js, Tailwind CSS, TypeScript, UI Design

SERVICES:
1. UI/UX Design — "From wireframes to polished interfaces. Digital experiences that feel effortless and look premium." Features: User Research, Wireframing, Prototyping, Design Systems, Usability Testing
2. Web Development — "Production-ready websites and web apps built with modern frameworks, optimized for performance and scale." Features: Next.js/React, TypeScript, Animation & Motion, CMS Integration, API Development
3. E-Commerce — "Custom storefronts and shopping experiences that convert. Beautiful product pages, smooth checkout flows." Features: WordPress/WooCommerce, Custom Cart & Checkout, Product Configurators, Performance Optimization
4. Brand & Identity — "Visual identity systems that communicate who you are." Features: Logo Design, Typography Systems, Color Palette, Brand Guidelines, Motion Identity

---

PROJECTS (12 total, with full case study details):

1. BALOTO VISUAL AGENT (2026) — AI Agent
What: AI-powered visual assistant for an online lottery platform that guides users through games and ticket selection via conversation instead of traditional menus.
The challenge: Lottery platforms require navigating multiple pages, understanding complex rules, and manually selecting numbers — creating friction for new users.
What Javal built: Complete system including AI agent behavior/prompts, visual assistant UX, conversational flows, and integration between the agent and platform actions (cart updates, number generation).
Technical approach: Three-layer architecture — user interaction layer, AI reasoning layer, platform action layer. AI uses structured tool-calling for deterministic actions (no model-computed prices or cart logic).
Key challenge solved: Preventing the AI from computing values itself — configured structured instructions so it calls platform functions for prices and cart management instead of reasoning about them.
Impact: Proves how AI assistants can transform complex website navigation into guided conversational experiences, reducing cognitive load.
Stack: Next.js, TypeScript, AI/LLM, Web UI Systems
Skills: AI agent architecture, conversational UX, tool-based AI systems, product thinking for AI interfaces

2. LOTTO VOICE AGENT (2026) — AI Agent
What: Voice-powered AI assistant that lets users interact with a lottery platform using natural speech commands instead of forms.
The challenge: Traditional lottery platforms rely on form-based interactions with multiple pages, manual number selection, and confusing rules.
What Javal built: Conversational voice AI system that interprets commands like "Generate numbers for Baloto" or "Add a Revancha ticket" and maps them to platform actions.
Technical approach: Speech recognition + AI intent interpretation + structured tool execution. Key operations handled by deterministic functions, not model reasoning.
Key challenge solved: Ensuring AI never computes values itself — prices and ticket totals always handled by platform logic, improving reliability.
Impact: Demonstrates how voice interfaces can make complex digital workflows more accessible and natural.
Stack: TypeScript, Node.js, AI/LLM, Voice AI
Skills: Conversational AI design, voice interface architecture, AI tool-calling systems

3. JAVAL.DEV (2026) — Web App
What: This very portfolio website — a modern developer portfolio with AI voice assistant, animated sections, case studies, and a premium dark design system.
The challenge: Most developer portfolios focus on either design OR technical implementation. This one demonstrates both.
What Javal built: Full platform with structured case studies, component-based architecture, responsive layouts, and an integrated AI voice assistant.
Technical approach: Next.js App Router, TypeScript, Tailwind CSS, Framer Motion. Each project presented as a case study (problem → solution), not a gallery item.
Impact: A professional showcase that demonstrates both engineering capability and design sensibility.
Stack: Next.js, TypeScript, Tailwind CSS
Skills: Modern frontend development, component architecture, responsive UI, technical storytelling

4. CAZOVA (2025) — Web App | Caribbean Zonal Volleyball Association
What: Complete rebuild of the regional volleyball governing body's outdated website into a modern digital platform for tournament communication, news, and regional engagement.
The challenge: Legacy website was years outdated — difficult to update content, poorly organized, no centralized tournament data, historical content locked in the old system.
What Javal built: End-to-end rebuild including client consultation, UX planning, WordPress development, SportsPress plugin integration for tournament/match management, custom child theme, custom WordPress plugin for date formatting, and content migration by scraping the legacy site to preserve historical records.
Key challenge solved: Had zero volleyball knowledge at project start — independently researched tournament formats, scoring systems, match scheduling, and competition recording to properly design the event system.
Impact: Transformed into a central digital hub for Caribbean volleyball with significantly improved usability, centralized tournament info, simplified publishing for admins, and preserved historical content.
Stack: WordPress, SportsPress, Custom Plugin Development
Skills: Full project lifecycle, sports data systems, content migration/data recovery, custom plugin development, CMS usability design

5. HOMELAND FURNISHINGS (2024) — E-Commerce
What: Transformed a basic online catalog into a fully functional e-commerce platform managing 10,000+ products for a major Trinidad and Tobago home goods retailer.
The challenge: Original website had very low customer interaction, virtually no online sales, disorganized product data with inconsistent categories/tags, outdated branding, and unoptimized product imagery.
What Javal built: Complete platform redesign — product catalog restructuring, bulk import systems, WooCommerce configuration, wedding registry feature, promotional collections, product photography and image optimization, Google Analytics setup with monthly reporting.
Key challenge solved: Managing 10,000+ products with inconsistent data — built a standardized product data system for reliable bulk imports. Also optimized thousands of product images while maintaining visual quality.
Impact: 347% increase in online sales. Transformed from a minimal catalog into a digital storefront with real customer transactions, successful wedding registry program, and modernized brand.
Stack: WordPress, WooCommerce, Google Analytics
Skills: Large-scale e-commerce UX, product catalog architecture, bulk import systems, product photography, image optimization, analytics

6. UTT OUTREACH (2024) — Web App | University of Trinidad and Tobago
What: Redesigned the Industry Relations Unit's platform to support a Renewable Energy and Energy Efficiency initiative — combining public outreach website with a learning management system.
The challenge: Platform wasn't optimized for managing educational programs. Course interactions handled manually via email. Needed to serve audiences from children to industry professionals.
What Javal built: Multi-purpose educational portal on Odoo — website redesign, LMS configuration, course shells, enrollment management, instructor roles, permission-based access control, and content organization for both public outreach and structured learning.
Key challenge solved: Designing one platform for vastly different audiences — children learning energy concepts, schools in outreach programs, professionals in formal training, and administrators managing everything. Used vibrant visuals for younger audiences and structured access for course participants.
Impact: Increased courses operating through the platform, easier admin management, centralized content hosting, reduced email dependency, improved visibility for renewable energy initiatives.
Stack: Odoo, LMS, UI/UX Design
Skills: Institutional website design, LMS implementation, user permission architecture, multi-audience UX design

7. JAVTECH LTD (2023) — Web Design
What: Agency website for Javal's own digital creative and technology company — showcasing web development, UI/UX design, and graphic design services.
What Javal built: Full platform from concept to deployment — UX planning, UI design, service presentation, portfolio showcase, contact forms, responsive layouts.
Impact: Central digital presence helping the company communicate services and attract new clients.
Stack: Hostinger Website Builder
Skills: Agency website design, service-based UX architecture, business branding

8. AMCS LIMITED (2025) — Web Design
What: Professional corporate website for a construction/maintenance company with 17+ years of experience, supporting their transition to a new brand identity.
The challenge: Despite extensive experience, the company lacked a digital presence matching their reputation. Available project imagery was low quality.
What Javal built: Modern corporate website with structured service pages, WhatsApp direct contact integration, inquiry forms. Also set up their social media profiles and professional business email.
Key challenge solved: Presenting past work effectively despite low-quality imagery — used structured layouts and creative presentation techniques.
Impact: Professional website aligned with rebrand, improved credibility, easier customer communication via WhatsApp and inquiry forms, full digital foundation established.
Stack: WordPress, WhatsApp Integration
Skills: Corporate website design, lead generation UX, business branding support

9. THE HARAMBEE HOUSE (2025) — Web Design
What: Website for a nonprofit focused on Black support, enrichment, and empowerment through community programs.
The challenge: Previous prototype by another designer didn't meet expectations. Organization had no effective digital presence for raising awareness, accepting donations, or presenting programs.
What Javal built: Modern community-oriented platform with program pages, donation functionality, contact forms, blog/update sections. Collaborated with The Trini Creative Studios on design direction.
Impact: First fully functional digital platform for the organization, increased donations through the website, professional online presence aligned with their mission.
Stack: WordPress, Donation Integration
Skills: Nonprofit website design, collaborative development, donation-focused UX

10. ECLIFF ELIE (2020) — E-Commerce
What: Luxury e-commerce platform for a bespoke men's fashion brand specializing in suits and premium formalwear — built during the COVID-19 pandemic.
The challenge: Brand relied on in-store interactions. COVID-19 restrictions cut off physical retail. Needed online store matching luxury aesthetic.
What Javal built: E-commerce platform on Lightspeed with POS system integration for synchronized inventory, product catalog setup, secure checkout, responsive mobile shopping.
Key challenge solved: This was Javal's first major professional web project — learned to balance luxury aesthetics with functional e-commerce through careful iteration.
Impact: Enabled online sales during COVID restrictions, expanded brand reach beyond physical store, created a professional digital extension of the luxury retail experience.
Stack: Lightspeed, POS Integration
Skills: Luxury e-commerce UX, Lightspeed development, POS integration

11. A TEAM BAND TT (2021) — Web Design
What: Digital platform for a Trinidad and Tobago music band — showcasing members, performances, and booking info.
What Javal built: WordPress website with band member profiles, event info, biography, booking contact, responsive mobile design.
Impact: Centralized digital presence promoting performances and strengthening brand identity.
Stack: WordPress
Skills: Entertainment website design, content-focused architecture

12. JAVAL PROTOVERSE (2026) — UI/UX
What: Interactive Figma prototype exploring futuristic interface design patterns and immersive user flows — a fully clickable experience, not static mockups.
What Javal built: Multi-section landing page with interactive UI components, modern layout systems, visual storytelling through interface design — all in Figma using Figma Make.
Impact: Demonstrates advanced UI/UX design capability through interactive experience rather than screenshots.
Stack: Figma, Figma Make
Skills: UI/UX prototyping, interactive interface design, advanced Figma, layout system design

---

WEBSITE STRUCTURE:
Homepage sections (scroll targets): hero, projects, about, services, contact
Project case study pages: /projects/[slug]
Available slugs: baloto-visual-agent, lotto-voice-agent, javal-dev, cazova, homeland-furnishings, utt-outreach, javtech-ltd, amcs-limited, the-harambee-house, ecliff-elie, a-team-band-tt, javal-protoverse
`.trim();
