import { CaseStudy } from '@/types';

export const caseStudies: CaseStudy[] = [
  // ── Baloto Visual Agent ────────────────────────────────────────────
  {
    slug: 'baloto-visual-agent',
    title: 'Baloto Visual Agent',
    role: 'AI Engineer, UX Designer, Full-Stack Developer',
    projectType: 'AI Agent / Interactive Web Interface',
    tech: ['AI Agents', 'Next.js', 'JavaScript', 'Web UI Systems'],
    githubUrl: 'https://github.com/javtechtt/baloto-visual-agent',
    sections: [
      {
        title: 'Overview',
        blocks: [
          { type: 'paragraph', text: 'The Baloto Visual Agent is an AI-powered assistant designed to help users navigate and interact with an online lottery platform through an intuitive visual interface.' },
          { type: 'paragraph', text: 'Rather than relying solely on traditional forms and menus, the system introduces a conversational assistant capable of guiding users through lottery games, ticket selection, and platform features.' },
          { type: 'paragraph', text: 'The project explores how AI agents can simplify complex user interfaces and create a more intuitive interaction model for transactional web applications.' },
        ],
      },
      {
        title: 'The Problem',
        blocks: [
          { type: 'paragraph', text: 'Lottery platforms often require users to navigate multiple steps when selecting games, generating numbers, and managing entries.' },
          { type: 'paragraph', text: 'These processes typically involve:' },
          { type: 'bullets', items: ['navigating multiple pages', 'understanding complex rules', 'manually selecting numbers', 'managing cart selections'] },
          { type: 'paragraph', text: 'For new users, this can create friction and confusion.' },
          { type: 'paragraph', text: 'The goal of this project was to explore how an AI-driven assistant could reduce cognitive load by guiding users through the process.' },
        ],
      },
      {
        title: 'My Role',
        blocks: [
          { type: 'paragraph', text: 'I designed and implemented the complete system, including:' },
          { type: 'bullets', items: ['AI agent behavior and system prompts', 'UX design for the visual assistant interface', 'interaction logic between the assistant and the website', 'conversational flows for lottery selection', 'integration between the agent and platform actions'] },
          { type: 'paragraph', text: 'The project required balancing natural conversational interaction with deterministic system actions such as adding tickets to a cart.' },
        ],
      },
      {
        title: 'Approach',
        blocks: [
          { type: 'paragraph', text: 'The visual agent acts as an intelligent interface layer between the user and the platform.' },
          { type: 'paragraph', text: 'Instead of manually navigating through menus, users can interact with the agent by asking questions such as:' },
          { type: 'bullets', items: ['"How do I play this game?"', '"Add a Baloto ticket"', '"Generate numbers for me"', '"What games can I play?"'] },
          { type: 'paragraph', text: 'The agent interprets the user\'s intent and triggers the appropriate platform actions.' },
          { type: 'paragraph', text: 'This interaction model aims to make the experience feel more like speaking to a knowledgeable assistant rather than navigating a website.' },
        ],
      },
      {
        title: 'Implementation',
        blocks: [
          { type: 'paragraph', text: 'The system combines:' },
          { type: 'bullets', items: ['AI-driven conversational understanding', 'structured tool calling for platform actions', 'interface components that visually represent the agent'] },
          { type: 'paragraph', text: 'The architecture separates:' },
          { type: 'bullets', items: ['user interaction layer', 'AI reasoning layer', 'platform action layer'] },
          { type: 'paragraph', text: 'This ensures that the AI can guide users conversationally while maintaining reliable control over deterministic actions such as cart updates.' },
        ],
      },
      {
        title: 'Challenges',
        blocks: [
          { type: 'paragraph', text: 'One of the major challenges involved ensuring that the AI assistant triggered the correct platform functions.' },
          { type: 'paragraph', text: 'AI models can sometimes attempt to calculate or reason about actions instead of calling the appropriate system tools.' },
          { type: 'paragraph', text: 'To address this, the agent was configured with structured instructions to ensure it relied on deterministic functions for tasks such as price calculation and cart management.' },
          { type: 'paragraph', text: 'This hybrid architecture helps maintain both conversational flexibility and operational accuracy.' },
        ],
      },
      {
        title: 'Outcome',
        blocks: [
          { type: 'paragraph', text: 'The Baloto Visual Agent demonstrates how AI assistants can transform traditional website navigation into an interactive guided experience.' },
          { type: 'paragraph', text: 'The project highlights how conversational interfaces can:' },
          { type: 'bullets', items: ['simplify complex workflows', 'reduce friction in transactional platforms', 'make digital services more accessible to new users'] },
          { type: 'paragraph', text: 'It also serves as a proof-of-concept for integrating AI agents into web applications as an intelligent UX layer.' },
        ],
      },
      {
        title: 'Skills Demonstrated',
        blocks: [
          { type: 'bullets', items: ['AI agent architecture', 'conversational UX design', 'tool-based AI interaction systems', 'frontend interface design for AI assistants', 'product thinking for AI-driven interfaces'] },
        ],
      },
    ],
  },

  // ── Lotto Voice Agent ──────────────────────────────────────────────
  {
    slug: 'lotto-voice-agent',
    title: 'Lotto Voice Agent',
    role: 'AI Engineer',
    projectType: 'Conversational Voice AI System',
    tech: ['Voice AI', 'AI Agents', 'Web Application Integration'],
    githubUrl: 'https://github.com/javtechtt/lotto-voice-agent',
    sections: [
      {
        title: 'Overview',
        blocks: [
          { type: 'paragraph', text: 'The Lotto Voice Agent is a conversational AI assistant designed to allow users to interact with a lottery platform using natural voice commands.' },
          { type: 'paragraph', text: 'The system explores how voice interfaces can simplify interactions that would normally require multiple manual steps in traditional web applications.' },
          { type: 'paragraph', text: 'Instead of navigating through menus and forms, users can simply speak commands to generate numbers, select games, and manage lottery entries.' },
        ],
      },
      {
        title: 'The Problem',
        blocks: [
          { type: 'paragraph', text: 'Traditional lottery platforms rely heavily on form-based interactions.' },
          { type: 'paragraph', text: 'Users typically need to:' },
          { type: 'bullets', items: ['navigate multiple pages', 'manually select numbers', 'understand different game rules', 'manage ticket selections'] },
          { type: 'paragraph', text: 'This process can feel cumbersome and unintuitive, particularly for new users.' },
          { type: 'paragraph', text: 'The goal of this project was to explore whether voice-based interaction could provide a faster and more natural user experience.' },
        ],
      },
      {
        title: 'My Role',
        blocks: [
          { type: 'paragraph', text: 'I designed and developed the AI agent responsible for interpreting voice commands and translating them into platform actions.' },
          { type: 'paragraph', text: 'My responsibilities included:' },
          { type: 'bullets', items: ['designing the conversational system behavior', 'building structured AI agent instructions', 'integrating voice input with platform functionality', 'ensuring the system triggered correct deterministic actions'] },
        ],
      },
      {
        title: 'Approach',
        blocks: [
          { type: 'paragraph', text: 'The system was designed around the idea that voice interaction should feel conversational but remain operationally precise.' },
          { type: 'paragraph', text: 'Users can interact with the platform through commands such as:' },
          { type: 'bullets', items: ['"Generate numbers for Baloto"', '"Add a Revancha ticket"', '"Show my cart"', '"Explain how this game works"'] },
          { type: 'paragraph', text: 'The AI interprets the user\'s intent and maps it to structured platform actions.' },
        ],
      },
      {
        title: 'Implementation',
        blocks: [
          { type: 'paragraph', text: 'The system combines:' },
          { type: 'bullets', items: ['speech recognition', 'AI-driven intent interpretation', 'structured tool execution'] },
          { type: 'paragraph', text: 'This architecture allows the AI to translate conversational requests into platform functions such as generating numbers or adding tickets.' },
          { type: 'paragraph', text: 'To maintain accuracy, key operations are handled by deterministic functions rather than model reasoning.' },
        ],
      },
      {
        title: 'Challenges',
        blocks: [
          { type: 'paragraph', text: 'One challenge involved ensuring the AI did not attempt to compute values itself.' },
          { type: 'paragraph', text: 'For example, price calculations or ticket totals must always be handled by the platform\'s internal logic.' },
          { type: 'paragraph', text: 'The system was designed to ensure the AI calls the correct function instead of reasoning about numerical values, improving reliability.' },
        ],
      },
      {
        title: 'Outcome',
        blocks: [
          { type: 'paragraph', text: 'The Lotto Voice Agent demonstrates how conversational voice interfaces can make complex digital workflows more accessible.' },
          { type: 'paragraph', text: 'The system highlights the potential for voice-based interaction in transactional web platforms and provides a foundation for further development of conversational web experiences.' },
        ],
      },
      {
        title: 'Skills Demonstrated',
        blocks: [
          { type: 'bullets', items: ['conversational AI design', 'voice interface architecture', 'AI tool-calling systems', 'UX design for conversational interfaces'] },
        ],
      },
    ],
  },

  // ── javal.dev ──────────────────────────────────────────────────────
  {
    slug: 'javal-dev',
    title: 'javal.dev',
    role: 'UI/UX Designer & Frontend Developer',
    projectType: 'Personal Developer Portfolio',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://javal.dev/',
    sections: [
      {
        title: 'Overview',
        blocks: [
          { type: 'paragraph', text: 'Javal.dev is a modern developer portfolio built to showcase web development projects, UI/UX design work, and emerging AI systems.' },
          { type: 'paragraph', text: 'The site acts as a central platform for presenting case studies, technical experiments, and client work while demonstrating modern frontend development practices.' },
        ],
      },
      {
        title: 'The Problem',
        blocks: [
          { type: 'paragraph', text: 'Many developer portfolios focus either on design or on technical implementation, but rarely demonstrate both effectively.' },
          { type: 'paragraph', text: 'A portfolio should communicate:' },
          { type: 'bullets', items: ['design thinking', 'engineering capability', 'structured project presentation', 'modern development practices'] },
          { type: 'paragraph', text: 'The goal of this project was to build a platform that showcases both technical ability and design sensibility.' },
        ],
      },
      {
        title: 'My Role',
        blocks: [
          { type: 'paragraph', text: 'I designed and developed the entire platform, including:' },
          { type: 'bullets', items: ['UX structure for project case studies', 'frontend architecture', 'responsive layout design', 'performance optimization', 'project content structure'] },
        ],
      },
      {
        title: 'Approach',
        blocks: [
          { type: 'paragraph', text: 'The site was designed to emphasize clarity and structured storytelling for projects.' },
          { type: 'paragraph', text: 'Each project is presented as a case study rather than a simple gallery item, allowing visitors to understand both the problem and the solution behind each piece of work.' },
          { type: 'paragraph', text: 'The design prioritizes:' },
          { type: 'bullets', items: ['readability', 'clean visual hierarchy', 'fast performance', 'responsive layouts'] },
        ],
      },
      {
        title: 'Implementation',
        blocks: [
          { type: 'paragraph', text: 'The site was built using a modern frontend stack:' },
          { type: 'bullets', items: ['Next.js for routing and performance optimization', 'TypeScript for maintainable code', 'Tailwind CSS for scalable styling'] },
          { type: 'paragraph', text: 'The component-based architecture ensures the platform can easily grow as new projects are added.' },
        ],
      },
      {
        title: 'Outcome',
        blocks: [
          { type: 'paragraph', text: 'The portfolio acts as a professional showcase for Javal\'s work across web development, UI/UX design, and AI experimentation.' },
          { type: 'paragraph', text: 'The platform provides a structured and scalable way to present projects while demonstrating modern frontend engineering practices.' },
        ],
      },
      {
        title: 'Skills Demonstrated',
        blocks: [
          { type: 'bullets', items: ['modern frontend development', 'component-based architecture', 'responsive UI design', 'technical storytelling through case studies'] },
        ],
      },
    ],
  },

  // ── Javtech Ltd ────────────────────────────────────────────────────
  {
    slug: 'javtech-ltd',
    title: 'Javtech Ltd',
    role: 'Founder, Web Designer & Developer',
    projectType: 'Agency Website',
    tech: ['Hostinger Website Builder', 'UI/UX Design', 'Responsive Web Design'],
    platform: 'Hostinger Website Builder',
    liveUrl: 'https://www.javtechtt.com/',
    sections: [
      {
        title: 'Overview',
        blocks: [
          { type: 'paragraph', text: 'Javtech Ltd is a digital creative and technology company offering services such as web development, UI/UX design, graphic design, and digital solutions for businesses.' },
          { type: 'paragraph', text: 'The website was developed to serve as the company\'s primary digital presence, showcasing services, portfolio work, and providing a platform for potential clients to learn about the company and initiate contact.' },
        ],
      },
      {
        title: 'My Role',
        blocks: [
          { type: 'paragraph', text: 'As the founder of Javtech Ltd, I designed and developed the entire platform from concept to deployment.' },
          { type: 'paragraph', text: 'My responsibilities included:' },
          { type: 'bullets', items: ['UX planning and site architecture', 'UI design and visual layout', 'service presentation structure', 'platform development', 'website deployment'] },
          { type: 'paragraph', text: 'The goal was to create a platform that communicates professionalism while clearly presenting the company\'s capabilities and portfolio.' },
        ],
      },
      {
        title: 'Approach',
        blocks: [
          { type: 'paragraph', text: 'The design focuses on presenting services in a clear and structured way so potential clients can quickly understand what the company offers.' },
          { type: 'paragraph', text: 'Key priorities included:' },
          { type: 'bullets', items: ['professional visual presentation', 'clear service explanations', 'easy contact options for potential clients', 'responsive layouts for mobile users'] },
          { type: 'paragraph', text: 'The website also acts as a portfolio hub for showcasing client work and projects completed by the company.' },
        ],
      },
      {
        title: 'Key Features',
        blocks: [
          { type: 'paragraph', text: 'The platform includes several features designed to support business development:' },
          { type: 'bullets', items: ['service overview pages', 'portfolio project showcases', 'contact forms for inquiries', 'responsive design for mobile devices'] },
          { type: 'paragraph', text: 'These features allow potential clients to quickly learn about the company\'s services and reach out for projects.' },
        ],
      },
      {
        title: 'Outcome',
        blocks: [
          { type: 'paragraph', text: 'The website serves as the central digital presence for Javtech Ltd, helping the company communicate its services and attract new clients.' },
        ],
      },
      {
        title: 'Skills Demonstrated',
        blocks: [
          { type: 'bullets', items: ['agency website design', 'service-based UX architecture', 'business branding and presentation', 'web platform development'] },
        ],
      },
    ],
  },

  // ── CAZOVA ────────────────────────────────────────────────────────
  {
    slug: 'cazova',
    title: 'CAZOVA',
    subtitle: 'Caribbean Zonal Volleyball Association',
    role: 'UI/UX Designer & Full-Stack WordPress Developer',
    projectType: 'Sports Organization Website',
    tech: ['WordPress', 'SportsPress', 'Custom Plugin Development', 'UI/UX Design'],
    platform: 'WordPress',
    liveUrl: 'https://cazova.net/',
    sections: [
      {
        title: 'Overview',
        blocks: [
          { type: 'paragraph', text: 'CAZOVA (Caribbean Zonal Volleyball Association) is the regional governing body responsible for overseeing volleyball development and tournaments across several Caribbean territories.' },
          { type: 'paragraph', text: 'The organization required a modern digital platform capable of supporting tournament communication, organizational updates, and regional engagement among athletes, federations, administrators, and fans.' },
          { type: 'paragraph', text: 'The project involved rebuilding the association\'s outdated website into a structured, maintainable platform capable of managing sports events, news updates, and official documents.' },
        ],
      },
      {
        title: 'The Problem',
        blocks: [
          { type: 'paragraph', text: 'Prior to the redesign, the existing website had remained largely unchanged for many years and no longer supported the operational needs of the organization.' },
          { type: 'paragraph', text: 'Key issues included:' },
          { type: 'bullets', items: ['outdated design and user experience', 'difficulty updating content and events', 'poor organization of information', 'lack of centralized tournament data', 'limited accessibility for users across the Caribbean'] },
          { type: 'paragraph', text: 'Additionally, much of the existing content — including media and documents — was locked within the legacy website, requiring careful extraction and migration to avoid losing historical information.' },
        ],
      },
      {
        title: 'My Role',
        blocks: [
          { type: 'paragraph', text: 'I led the project end-to-end, managing the full lifecycle of the website development process.' },
          { type: 'paragraph', text: 'My responsibilities included:' },
          { type: 'bullets', items: ['client consultation and requirements gathering', 'UX planning and information architecture', 'UI design and layout structure', 'WordPress development', 'plugin integration and configuration', 'content migration and website data scraping', 'custom plugin development', 'CMS setup and administrator usability', 'ongoing maintenance and updates'] },
          { type: 'paragraph', text: 'One additional step that was not originally part of the project scope was scraping the legacy website to recover historical content and images, ensuring continuity of records and preserving the organization\'s digital history.' },
        ],
      },
      {
        title: 'Approach',
        blocks: [
          { type: 'paragraph', text: 'The main goal of the redesign was to transform the website into a centralized information hub for Caribbean volleyball.' },
          { type: 'paragraph', text: 'The design focused on three priorities:' },
          { type: 'bullets', items: ['clear access to tournament information', 'easy content management for administrators', 'accessible navigation for a wide regional audience'] },
          { type: 'paragraph', text: 'This required restructuring the site\'s content hierarchy to prioritize:' },
          { type: 'bullets', items: ['tournaments and fixtures', 'organizational announcements', 'documents and official publications', 'media and news updates'] },
          { type: 'paragraph', text: 'The interface was designed to be simple, structured, and mobile-friendly to accommodate users accessing information during live events or while traveling.' },
        ],
      },
      {
        title: 'Implementation',
        blocks: [
          { type: 'paragraph', text: 'The site was developed using WordPress, selected for its flexibility and ease of use for non-technical administrators.' },
          { type: 'paragraph', text: 'To support sports-specific functionality, the SportsPress plugin was integrated to manage:' },
          { type: 'bullets', items: ['tournament schedules', 'match fixtures', 'competition structures', 'team and player data'] },
          { type: 'paragraph', text: 'A custom child theme was developed to tailor the design and layout to the organization\'s branding and functional needs.' },
          { type: 'paragraph', text: 'Additionally, a custom WordPress plugin was developed to handle specific tasks such as simplified date formatting and filtering for event displays, ensuring information appeared clearly and consistently across the site.' },
        ],
      },
      {
        title: 'Key Features',
        blocks: [
          { type: 'paragraph', text: 'The new platform introduced several important capabilities:' },
          { type: 'bullets', items: ['tournament and match schedules', 'event and competition management', 'news and blog updates', 'document and resource showcase', 'organizational information pages', 'mobile-friendly navigation', 'easy CMS publishing tools for administrators'] },
          { type: 'paragraph', text: 'These features allow the organization to publish and maintain content independently while keeping tournament information accessible to a regional audience.' },
        ],
      },
      {
        title: 'Challenges',
        blocks: [
          { type: 'paragraph', text: 'One of the most significant challenges during the project involved implementing the event and competition structures.' },
          { type: 'paragraph', text: 'At the start of development, I did not have prior knowledge of the rules and operational structure of volleyball tournaments.' },
          { type: 'paragraph', text: 'To properly design the event system, I conducted independent research to understand:' },
          { type: 'bullets', items: ['volleyball tournament formats', 'scoring systems', 'match scheduling structures', 'how competitions are recorded and organized'] },
          { type: 'paragraph', text: 'This research informed how the event system was configured within the website and ensured that tournament data could be represented accurately.' },
        ],
      },
      {
        title: 'Outcome',
        blocks: [
          { type: 'paragraph', text: 'The redesigned platform now functions as a central digital hub for Caribbean volleyball, supporting both organizational communication and public engagement.' },
          { type: 'paragraph', text: 'Key improvements include:' },
          { type: 'bullets', items: ['significantly improved usability and navigation', 'centralized tournament information', 'simplified publishing tools for administrators', 'preserved historical content from the legacy website', 'a modern, professional digital presence for the organization'] },
          { type: 'paragraph', text: 'The platform also allows the organization to maintain and update its own content without requiring constant technical intervention.' },
        ],
      },
      {
        title: 'Skills Demonstrated',
        blocks: [
          { type: 'paragraph', text: 'This project demonstrates capabilities in:' },
          { type: 'bullets', items: ['UX planning and information architecture', 'WordPress development and customization', 'sports data system implementation', 'content migration and data recovery', 'custom plugin development', 'CMS usability design', 'full project lifecycle management'] },
        ],
      },
    ],
  },

  // ── Homeland Furnishings ──────────────────────────────────────────
  {
    slug: 'homeland-furnishings',
    title: 'Homeland Furnishings',
    role: 'E-Commerce Developer, UI/UX Designer',
    projectType: 'E-Commerce Platform',
    tech: ['WordPress', 'WooCommerce', 'UI/UX Design', 'Google Analytics'],
    platform: 'WordPress / WooCommerce',
    liveUrl: 'https://homelandtt.com/',
    sections: [
      {
        title: 'Overview',
        blocks: [
          { type: 'paragraph', text: 'Homeland Furnishings is a major home goods retailer in Trinidad and Tobago offering a wide range of products including furniture, kitchenware, décor, bedding, fabrics, and home accessories.' },
          { type: 'paragraph', text: 'While working as the company\'s E-commerce Developer, I was responsible for redesigning and rebuilding the company\'s website to transform it from a basic online presence into a fully functional e-commerce platform capable of supporting a large product catalog and generating meaningful online sales.' },
          { type: 'paragraph', text: 'The project involved redesigning the user experience, restructuring the product catalog, and implementing a scalable system capable of managing over 10,000 unique products.' },
        ],
      },
      {
        title: 'The Problem',
        blocks: [
          { type: 'paragraph', text: 'The original website had very limited functionality and engagement.' },
          { type: 'paragraph', text: 'Major issues included:' },
          { type: 'bullets', items: ['very low customer interaction', 'little to no online sales', 'disorganized product data', 'inconsistent product categories and tags', 'outdated branding and visual presentation', 'inefficient product import process'] },
          { type: 'paragraph', text: 'Additionally, product imagery was not optimized for web performance, which contributed to slower page loads and a less efficient browsing experience for customers.' },
        ],
      },
      {
        title: 'My Role',
        blocks: [
          { type: 'paragraph', text: 'As the company\'s E-commerce Developer, I led the redevelopment of the platform and handled the full lifecycle of the website improvement project.' },
          { type: 'paragraph', text: 'My responsibilities included:' },
          { type: 'bullets', items: ['WordPress redesign and rebranding', 'UX architecture and navigation improvements', 'WooCommerce configuration', 'product catalog restructuring', 'bulk product import systems', 'product photography', 'image optimization for web performance', 'wedding registry system implementation', 'promotional collections system', 'Google Analytics setup and reporting', 'monthly performance reporting and analysis'] },
          { type: 'paragraph', text: 'The goal was to transform the platform into a true digital storefront rather than a static catalog website.' },
        ],
      },
      {
        title: 'Approach',
        blocks: [
          { type: 'paragraph', text: 'Given the scale of the product catalog, the most critical aspect of the redesign was information architecture.' },
          { type: 'paragraph', text: 'The project focused on restructuring:' },
          { type: 'bullets', items: ['product categories', 'tags', 'product naming conventions', 'browsing flow', 'checkout experience'] },
          { type: 'paragraph', text: 'The homepage was redesigned to function as a true landing page that highlights curated collections, promotions, and featured products instead of simply displaying product archives.' },
          { type: 'paragraph', text: 'This allowed the site to guide customers through product discovery rather than forcing them to manually search large product catalogs.' },
        ],
      },
      {
        title: 'Implementation',
        blocks: [
          { type: 'paragraph', text: 'The platform was rebuilt using WordPress and WooCommerce to provide a flexible e-commerce system capable of managing large product inventories.' },
          { type: 'paragraph', text: 'Key improvements included:' },
          { type: 'bullets', items: ['restructuring the catalog to support 10,000+ products', 'implementing a new product data structure for bulk imports', 'improving product category and tag organization', 'developing promotional product collections', 'introducing a wedding registry feature to support customer events', 'redesigning product browsing and checkout flow'] },
          { type: 'paragraph', text: 'As part of the project, I also conducted product photography and image optimization, ensuring that product images maintained high visual quality while remaining lightweight for faster page loading and improved site performance.' },
        ],
      },
      {
        title: 'Key Features',
        blocks: [
          { type: 'paragraph', text: 'The redesigned platform introduced several important capabilities:' },
          { type: 'bullets', items: ['large-scale product catalog (10,000+ items)', 'advanced product categorization and tagging', 'improved product search and filtering', 'wedding registry system', 'curated product collections', 'improved checkout experience', 'promotional landing page sections', 'optimized product imagery for faster load times', 'Google Analytics tracking and reporting'] },
          { type: 'paragraph', text: 'These features allowed the site to function more effectively as a true e-commerce platform rather than just a digital catalog.' },
        ],
      },
      {
        title: 'Challenges',
        blocks: [
          { type: 'paragraph', text: 'Managing and restructuring such a large product catalog presented significant challenges.' },
          { type: 'paragraph', text: 'Many product records contained inconsistencies or inaccuracies that needed to be corrected before they could be properly organized.' },
          { type: 'paragraph', text: 'Additionally, importing large product quantities initially proved difficult due to the structure of the original data.' },
          { type: 'paragraph', text: 'To resolve this, I developed a new product data system that standardized product fields and allowed large product batches to be imported efficiently and reliably.' },
          { type: 'paragraph', text: 'Another challenge involved optimizing thousands of product images while maintaining visual quality. This required careful compression and formatting to ensure pages remained lightweight without sacrificing presentation.' },
        ],
      },
      {
        title: 'Outcome',
        blocks: [
          { type: 'paragraph', text: 'The redesigned platform significantly improved the company\'s online presence and performance.' },
          { type: 'paragraph', text: 'Key outcomes included:' },
          { type: 'bullets', items: ['347% increase in online sales', 'improved customer engagement with the website', 'successful implementation of the wedding registry program', 'stronger product discovery through improved navigation', 'modernized brand presentation', 'faster loading product pages due to optimized images'] },
          { type: 'paragraph', text: 'The website evolved from a minimal online catalog into a fully functional digital storefront supporting thousands of products and real customer transactions.' },
        ],
      },
      {
        title: 'Skills Demonstrated',
        blocks: [
          { type: 'bullets', items: ['large-scale e-commerce UX design', 'WooCommerce development', 'product catalog information architecture', 'data structure and bulk import systems', 'product photography for e-commerce', 'image optimization and performance improvements', 'analytics tracking and reporting', 'full e-commerce platform optimization'] },
        ],
      },
    ],
  },
  // ── UTT Outreach ──────────────────────────────────────────────────
  {
    slug: 'utt-outreach',
    title: 'UTT Outreach',
    subtitle: 'University of Trinidad and Tobago – Industry Relations Unit',
    role: 'Web Designer, Odoo Developer, Learning Platform Administrator',
    projectType: 'Institutional Education & Outreach Platform',
    tech: ['Odoo', 'UI/UX Design', 'Learning Management System'],
    platform: 'Odoo',
    liveUrl: 'https://uttoutreach.utt.edu.tt/',
    sections: [
      {
        title: 'Overview',
        blocks: [
          { type: 'paragraph', text: 'UTT Outreach is the Industry Relations Unit of the University of Trinidad and Tobago, responsible for delivering professional education programs and supporting initiatives related to Renewable Energy and Energy Efficiency (REEE).' },
          { type: 'paragraph', text: 'The unit operates programs that serve a broad audience ranging from young students to industry professionals, helping to raise awareness about sustainable energy and develop practical skills in the sector.' },
          { type: 'paragraph', text: 'The website was redesigned to support a major Renewable Energy and Energy Efficiency initiative, providing a centralized platform for program information, outreach activities, and professional training courses.' },
        ],
      },
      {
        title: 'The Problem',
        blocks: [
          { type: 'paragraph', text: 'Prior to the redesign, the platform was not optimized for managing outreach programs and educational content in an efficient and scalable way.' },
          { type: 'paragraph', text: 'The unit needed a platform capable of supporting:' },
          { type: 'bullets', items: ['information about renewable energy initiatives', 'community outreach updates and program documentation', 'professional education courses', 'structured learning experiences for multiple user groups'] },
          { type: 'paragraph', text: 'Additionally, many course-related interactions were handled manually through email, which created inefficiencies in managing students, instructors, and course materials.' },
          { type: 'paragraph', text: 'The platform needed to evolve into a centralized digital hub for outreach and education activities.' },
        ],
      },
      {
        title: 'My Role',
        blocks: [
          { type: 'paragraph', text: 'I was responsible for redesigning and restructuring the platform while managing the system that supports online courses.' },
          { type: 'paragraph', text: 'My responsibilities included:' },
          { type: 'bullets', items: ['website redesign and UX improvements', 'Odoo website configuration and optimization', 'information architecture for outreach initiatives', 'development of professional course structures', 'creation of course shells and learning environments', 'content organization for educational materials', 'user management for students and instructors', 'permission and access control configuration'] },
          { type: 'paragraph', text: 'The goal was to create a system that could handle both public outreach information and structured online learning.' },
        ],
      },
      {
        title: 'Approach',
        blocks: [
          { type: 'paragraph', text: 'The redesign focused on transforming the platform into a multi-purpose educational and outreach portal.' },
          { type: 'paragraph', text: 'The structure needed to support several different audiences:' },
          { type: 'bullets', items: ['children and young students learning about renewable energy', 'schools participating in outreach initiatives', 'professionals seeking formal training courses', 'administrators managing programs and content'] },
          { type: 'paragraph', text: 'To support this, the website was redesigned to prioritize:' },
          { type: 'bullets', items: ['easy discovery of programs and courses', 'clear navigation for schools and educators', 'engaging visual presentation for younger audiences', 'structured access for course participants'] },
          { type: 'paragraph', text: 'The design incorporates vibrant visuals and simplified navigation to ensure the platform remains approachable for both children and professionals.' },
        ],
      },
      {
        title: 'Implementation',
        blocks: [
          { type: 'paragraph', text: 'The platform was built using Odoo, which was already integrated within the university\'s systems.' },
          { type: 'paragraph', text: 'Odoo provides a powerful framework for managing online learning and permission-based access to course content.' },
          { type: 'paragraph', text: 'I reconfigured the system to improve efficiency and support the unit\'s educational goals.' },
          { type: 'paragraph', text: 'Key implementation elements included:' },
          { type: 'bullets', items: ['restructuring the website layout and navigation', 'configuring Odoo\'s learning management capabilities', 'creating course shells for multiple training programs', 'managing course enrollments and instructor roles', 'implementing access control systems for course materials', 'centralizing outreach program information on the website'] },
          { type: 'paragraph', text: 'This allowed the platform to function both as a public outreach website and a learning management environment.' },
        ],
      },
      {
        title: 'Key Features',
        blocks: [
          { type: 'paragraph', text: 'The redesigned platform introduced several important capabilities:' },
          { type: 'bullets', items: ['centralized information about renewable energy initiatives', 'program and community outreach documentation', 'professional courses for multiple education levels', 'structured course enrollment and instructor management', 'controlled access to course materials', 'vibrant and accessible interface for younger audiences', 'simplified content management for administrators'] },
          { type: 'paragraph', text: 'The site now acts as both a communication platform and an education delivery system.' },
        ],
      },
      {
        title: 'Challenges',
        blocks: [
          { type: 'paragraph', text: 'One of the most complex challenges involved managing relationships between courses, instructors, and participants while maintaining strict permission controls.' },
          { type: 'paragraph', text: 'Courses required different levels of access depending on user roles, which meant the system needed to carefully manage:' },
          { type: 'bullets', items: ['course enrollment', 'instructor permissions', 'restricted learning materials', 'public versus private content'] },
          { type: 'paragraph', text: 'Another challenge involved designing an interface that could accommodate audiences ranging from children learning basic energy concepts to professionals pursuing industry training.' },
          { type: 'paragraph', text: 'Balancing these different audiences required thoughtful navigation structure and visual design choices.' },
        ],
      },
      {
        title: 'Outcome',
        blocks: [
          { type: 'paragraph', text: 'Following the redesign, the platform became a far more effective tool for the unit\'s outreach and educational activities.' },
          { type: 'paragraph', text: 'Key improvements included:' },
          { type: 'bullets', items: ['increased number of courses operating through the platform', 'easier course management for administrators', 'centralized hosting of course content and program materials', 'reduced reliance on email for distributing learning resources', 'improved visibility for renewable energy initiatives'] },
          { type: 'paragraph', text: 'The platform now serves as a central hub for outreach programs, professional education, and renewable energy awareness initiatives.' },
        ],
      },
      {
        title: 'Skills Demonstrated',
        blocks: [
          { type: 'bullets', items: ['institutional website design', 'Odoo platform configuration', 'learning management system implementation', 'user permission architecture', 'educational content structure', 'UX design for multi-audience platforms', 'digital transformation of administrative workflows'] },
        ],
      },
    ],
  },
  // ── AMCS Limited ──────────────────────────────────────────────────
  {
    slug: 'amcs-limited',
    title: 'AMCS Limited',
    role: 'Web Designer & WordPress Developer',
    projectType: 'Corporate Website',
    tech: ['WordPress', 'UI/UX Design', 'WhatsApp Integration'],
    platform: 'WordPress',
    liveUrl: 'https://amcslimited.com/',
    sections: [
      {
        title: 'Overview',
        blocks: [
          { type: 'paragraph', text: 'AMCS Limited is a construction and maintenance company with over 17 years of experience in the industry.' },
          { type: 'paragraph', text: 'As the company prepared to transition to a new brand identity and updated company name, they required a professional website that could reflect their experience and strengthen their credibility with potential clients.' },
          { type: 'paragraph', text: 'The project involved designing and developing a modern corporate website that clearly communicates the company\'s services, expertise, and industry presence.' },
        ],
      },
      {
        title: 'The Problem',
        blocks: [
          { type: 'paragraph', text: 'Despite having extensive experience in construction and maintenance, the company lacked a professional digital presence that matched its reputation.' },
          { type: 'paragraph', text: 'The business needed a website that could:' },
          { type: 'bullets', items: ['reinforce credibility within the industry', 'present services clearly to potential clients', 'support the company\'s rebranding efforts', 'make it easier for customers to contact the business'] },
          { type: 'paragraph', text: 'Additionally, much of the available past work documentation consisted of low-quality imagery, which required creative presentation to ensure the company\'s work could still be showcased effectively.' },
        ],
      },
      {
        title: 'My Role',
        blocks: [
          { type: 'paragraph', text: 'I managed the entire project lifecycle from initial consultation to final deployment.' },
          { type: 'paragraph', text: 'My responsibilities included:' },
          { type: 'bullets', items: ['UX planning and website structure', 'UI design and layout development', 'WordPress development', 'service page architecture', 'inquiry form setup', 'direct WhatsApp contact integration', 'website deployment'] },
          { type: 'paragraph', text: 'Beyond the website itself, I also helped establish the company\'s digital foundation, including:' },
          { type: 'bullets', items: ['creating the company\'s social media profiles', 'setting up professional business email accounts'] },
        ],
      },
      {
        title: 'Approach',
        blocks: [
          { type: 'paragraph', text: 'The design strategy focused on creating a professional and trustworthy corporate presence that reflects the company\'s years of experience in the industry.' },
          { type: 'paragraph', text: 'Key priorities included:' },
          { type: 'bullets', items: ['clear presentation of services', 'simple navigation structure', 'easy contact options for potential clients', 'mobile-friendly browsing'] },
          { type: 'paragraph', text: 'Special attention was given to presenting past work in a visually engaging way despite the limitations of available imagery.' },
        ],
      },
      {
        title: 'Key Features',
        blocks: [
          { type: 'paragraph', text: 'The website includes several features designed to improve customer engagement:' },
          { type: 'bullets', items: ['structured service pages', 'direct WhatsApp contact integration', 'customer inquiry forms', 'company information and background', 'mobile-friendly design'] },
          { type: 'paragraph', text: 'These features allow potential clients to quickly understand the company\'s capabilities and easily reach out for services.' },
        ],
      },
      {
        title: 'Challenges',
        blocks: [
          { type: 'paragraph', text: 'One of the primary challenges involved presenting the company\'s past work effectively despite the limited quality of available project images.' },
          { type: 'paragraph', text: 'To address this, the design focused on structured layouts and creative presentation techniques that allowed the company\'s experience to still be communicated clearly.' },
        ],
      },
      {
        title: 'Outcome',
        blocks: [
          { type: 'paragraph', text: 'The website successfully established a professional digital presence for AMCS Limited and supported the company\'s transition into its new brand identity.' },
          { type: 'paragraph', text: 'Key outcomes included:' },
          { type: 'bullets', items: ['a professional corporate website aligned with the company\'s rebrand', 'improved credibility when presenting services to potential clients', 'easier customer communication through inquiry forms and WhatsApp', 'establishment of the company\'s digital presence through website, email, and social media'] },
        ],
      },
      {
        title: 'Skills Demonstrated',
        blocks: [
          { type: 'bullets', items: ['corporate website design', 'WordPress development', 'service-based UX architecture', 'business branding support', 'lead generation UX design'] },
        ],
      },
    ],
  },

  // ── The Harambee House ─────────────────────────────────────────────
  {
    slug: 'the-harambee-house',
    title: 'The Harambee House',
    role: 'UI/UX Designer & WordPress Developer',
    projectType: 'Nonprofit Organization Website',
    tech: ['WordPress', 'UI/UX Design', 'Donation Integration'],
    platform: 'WordPress',
    liveUrl: 'https://theharambeehouse.net/',
    sections: [
      {
        title: 'Overview',
        blocks: [
          { type: 'paragraph', text: 'The Harambee House is a nonprofit organization focused on Black support, enrichment, and empowerment through community programs and initiatives.' },
          { type: 'paragraph', text: 'The organization required a modern website that could increase awareness of its mission, support fundraising efforts, and provide a central platform for communicating with the community.' },
          { type: 'paragraph', text: 'The project involved designing and developing a website that reflects the organization\'s values while making it easy for visitors to learn about programs and support the organization.' },
        ],
      },
      {
        title: 'The Problem',
        blocks: [
          { type: 'paragraph', text: 'Prior to this project, the organization did not have an effective website.' },
          { type: 'paragraph', text: 'A previous prototype developed by another designer did not align with the organization\'s expectations, and the team wanted a more modern and engaging platform that better reflected their mission.' },
          { type: 'paragraph', text: 'Without a functioning website, the organization faced challenges in:' },
          { type: 'bullets', items: ['raising awareness of their initiatives', 'communicating their mission to the public', 'accepting donations online', 'presenting programs and activities in a structured way'] },
        ],
      },
      {
        title: 'My Role',
        blocks: [
          { type: 'paragraph', text: 'I collaborated with The Trini Creative Studios, who handled consultation, hosting, and overall design direction for the project.' },
          { type: 'paragraph', text: 'My responsibilities focused on the design and development of the website, including:' },
          { type: 'bullets', items: ['UX planning and site structure', 'UI design and layout implementation', 'WordPress development', 'building program and information pages', 'implementing donation and contact functionality'] },
          { type: 'paragraph', text: 'This collaborative approach allowed the organization to launch a professional digital presence while aligning with the broader creative direction of the project.' },
        ],
      },
      {
        title: 'Approach',
        blocks: [
          { type: 'paragraph', text: 'The design focused on creating a modern, community-oriented platform that clearly communicates the organization\'s purpose.' },
          { type: 'paragraph', text: 'Key priorities included:' },
          { type: 'bullets', items: ['simple and intuitive navigation', 'clear presentation of the organization\'s mission', 'easy access to donation opportunities', 'a visual style that reflects the organization\'s identity'] },
          { type: 'paragraph', text: 'The layout was designed to ensure visitors can quickly understand the organization\'s goals and find ways to engage with its initiatives.' },
        ],
      },
      {
        title: 'Key Features',
        blocks: [
          { type: 'paragraph', text: 'The website includes several features that support community engagement:' },
          { type: 'bullets', items: ['structured program and information pages', 'donation functionality', 'contact forms for inquiries', 'blog and update sections for organizational announcements', 'responsive design for mobile users'] },
          { type: 'paragraph', text: 'These features allow the organization to communicate its work effectively while encouraging visitor participation and support.' },
        ],
      },
      {
        title: 'Challenges',
        blocks: [
          { type: 'paragraph', text: 'One of the primary challenges involved translating technical concepts and website structure into terms that were easily understandable for the client.' },
          { type: 'paragraph', text: 'Additionally, much of the website content was provided after development had already begun, which required adapting the structure as new information became available.' },
          { type: 'paragraph', text: 'This required flexibility in the development process to ensure the final platform still maintained a clear and organized layout.' },
        ],
      },
      {
        title: 'Outcome',
        blocks: [
          { type: 'paragraph', text: 'The completed website provided The Harambee House with its first fully functional digital platform.' },
          { type: 'paragraph', text: 'Key outcomes included:' },
          { type: 'bullets', items: ['improved visibility for the organization\'s initiatives', 'increased donations through the website', 'a professional online presence aligned with the organization\'s mission', 'strong satisfaction from the client with the final result'] },
          { type: 'paragraph', text: 'The website now serves as a central hub for communicating the organization\'s work and encouraging community engagement.' },
        ],
      },
      {
        title: 'Skills Demonstrated',
        blocks: [
          { type: 'bullets', items: ['nonprofit website design', 'collaborative project development', 'WordPress development', 'donation-focused UX design', 'translating client requirements into functional platforms'] },
        ],
      },
    ],
  },

  // ── Ecliff Elie ────────────────────────────────────────────────────
  {
    slug: 'ecliff-elie',
    title: 'Ecliff Elie',
    role: 'Web Designer & E-Commerce Developer',
    projectType: 'Luxury E-Commerce Platform',
    tech: ['Lightspeed', 'UI/UX Design', 'POS Integration'],
    platform: 'Lightspeed',
    liveUrl: 'https://www.ecliffelie.com/',
    sections: [
      {
        title: 'Overview',
        blocks: [
          { type: 'paragraph', text: 'Ecliff Elie is a luxury men\'s fashion brand specializing in bespoke suits and premium formalwear. The brand focuses on high-end tailoring and custom suit craftsmanship.' },
          { type: 'paragraph', text: 'During the COVID-19 pandemic, the business needed a way to continue selling products despite restrictions affecting in-person retail. The goal of the project was to build an e-commerce platform that would allow customers to browse and purchase products online while maintaining the brand\'s luxury aesthetic.' },
        ],
      },
      {
        title: 'The Problem',
        blocks: [
          { type: 'paragraph', text: 'Prior to the project, the brand relied primarily on in-store interactions for customer purchases. With COVID-19 restrictions limiting physical retail activity, the business needed an online platform that could support:' },
          { type: 'bullets', items: ['online product browsing', 'e-commerce transactions', 'product showcase for luxury garments', 'expansion of the brand\'s reach beyond the physical store'] },
          { type: 'paragraph', text: 'The website also needed to reflect the premium nature of the brand, ensuring that the digital experience aligned with the quality of the products.' },
        ],
      },
      {
        title: 'My Role',
        blocks: [
          { type: 'paragraph', text: 'I managed the project from start to finish, including both the design and technical implementation.' },
          { type: 'paragraph', text: 'My responsibilities included:' },
          { type: 'bullets', items: ['UX planning and website structure', 'UI design and styling', 'e-commerce platform setup', 'Lightspeed store development', 'product catalog configuration', 'POS system integration', 'ongoing maintenance and updates'] },
          { type: 'paragraph', text: 'The goal was to create an online store that supported both product discovery and seamless purchasing.' },
        ],
      },
      {
        title: 'Approach',
        blocks: [
          { type: 'paragraph', text: 'The design focused on creating a luxury-focused shopping experience that emphasized product presentation.' },
          { type: 'paragraph', text: 'Key design priorities included:' },
          { type: 'bullets', items: ['high-resolution product imagery', 'clean and elegant layouts', 'minimal interface distractions', 'strong emphasis on product visuals'] },
          { type: 'paragraph', text: 'The structure of the site was designed to allow visitors to easily browse collections while maintaining the premium look and feel associated with bespoke tailoring.' },
        ],
      },
      {
        title: 'Implementation',
        blocks: [
          { type: 'paragraph', text: 'The website was built using the Lightspeed e-commerce platform, which allowed direct integration with the store\'s POS system.' },
          { type: 'paragraph', text: 'Key implementation elements included:' },
          { type: 'bullets', items: ['product catalog setup', 'POS integration for inventory synchronization', 'secure online checkout functionality', 'responsive design for mobile shopping'] },
          { type: 'paragraph', text: 'This ensured that both the physical store and the online store could operate with synchronized inventory and product management.' },
        ],
      },
      {
        title: 'Challenges',
        blocks: [
          { type: 'paragraph', text: 'This project represented my first major professional web development project, which introduced several learning challenges during the design and implementation process.' },
          { type: 'paragraph', text: 'One of the primary challenges involved refining the visual styling to properly reflect the brand\'s luxury aesthetic.' },
          { type: 'paragraph', text: 'Achieving the right balance between high-quality imagery, clean layouts, and product-focused design required careful iteration to ensure the final result aligned with the brand identity.' },
        ],
      },
      {
        title: 'Outcome',
        blocks: [
          { type: 'paragraph', text: 'The completed website allowed the business to continue selling products during a period when physical retail activity was limited.' },
          { type: 'paragraph', text: 'Key outcomes included:' },
          { type: 'bullets', items: ['enabling online purchases during COVID-19 restrictions', 'expanding the brand\'s reach beyond the physical store', 'providing a professional platform to showcase luxury products', 'improving product visibility through structured collections'] },
          { type: 'paragraph', text: 'The website now serves as a digital extension of the brand\'s retail presence.' },
        ],
      },
      {
        title: 'Skills Demonstrated',
        blocks: [
          { type: 'bullets', items: ['luxury e-commerce UX design', 'Lightspeed platform development', 'POS system integration', 'product-focused UI design', 'responsive e-commerce interfaces'] },
        ],
      },
    ],
  },

  // ── A Team Band TT ─────────────────────────────────────────────────
  {
    slug: 'a-team-band-tt',
    title: 'A Team Band TT',
    role: 'Web Designer & WordPress Developer',
    projectType: 'Entertainment / Band Website',
    tech: ['WordPress', 'UI/UX Design', 'Responsive Web Design'],
    platform: 'WordPress',
    liveUrl: 'https://ateambandtt.com/',
    sections: [
      {
        title: 'Overview',
        blocks: [
          { type: 'paragraph', text: 'A Team Band TT is a Trinidad and Tobago music band that required a digital platform to showcase its members, music presence, and upcoming performances.' },
          { type: 'paragraph', text: 'The website was designed to provide fans and event organizers with a central location to learn about the band, view upcoming events, and explore the band\'s media and history.' },
        ],
      },
      {
        title: 'My Role',
        blocks: [
          { type: 'paragraph', text: 'I managed the project from start to finish, including:' },
          { type: 'bullets', items: ['UX planning and site structure', 'UI design and layout implementation', 'WordPress development', 'responsive design for mobile users'] },
          { type: 'paragraph', text: 'The goal was to create a platform that captures the band\'s energy while remaining easy for fans to navigate.' },
        ],
      },
      {
        title: 'Key Features',
        blocks: [
          { type: 'paragraph', text: 'The website includes several sections designed to support fan engagement:' },
          { type: 'bullets', items: ['band member profiles', 'event and performance information', 'band biography and history', 'contact information for bookings', 'responsive design for mobile access'] },
          { type: 'paragraph', text: 'These features allow fans and promoters to easily learn about the band and stay updated on performances.' },
        ],
      },
      {
        title: 'Outcome',
        blocks: [
          { type: 'paragraph', text: 'The website provides the band with a centralized digital presence that helps promote their performances and strengthen their brand identity online.' },
        ],
      },
      {
        title: 'Skills Demonstrated',
        blocks: [
          { type: 'bullets', items: ['entertainment website design', 'WordPress development', 'responsive UI design', 'content-focused site architecture'] },
        ],
      },
    ],
  },

  // ── Javal ProtoVerse ───────────────────────────────────────────────
  {
    slug: 'javal-protoverse',
    title: 'Javal ProtoVerse',
    role: 'UI/UX Designer',
    projectType: 'Interactive UI/UX Prototype',
    tech: ['Figma', 'Figma Make'],
    platform: 'Figma / Figma Make',
    liveUrl: 'https://doll-carry-30121791.figma.site/',
    sections: [
      {
        title: 'Overview',
        blocks: [
          { type: 'paragraph', text: 'Javal ProtoVerse is an interactive UI/UX prototype created to explore modern interface design patterns and interactive web layouts. The project was built entirely in Figma using Figma Make, allowing the prototype to simulate a real website experience while remaining within a design environment.' },
          { type: 'paragraph', text: 'The project focuses on experimenting with futuristic UI design concepts, structured layout systems, and interactive elements that demonstrate how modern digital products can be presented.' },
        ],
      },
      {
        title: 'My Role',
        blocks: [
          { type: 'paragraph', text: 'I designed and built the entire prototype, including:' },
          { type: 'bullets', items: ['UI layout design', 'interactive prototyping', 'section-based interface structure', 'visual styling and layout systems'] },
          { type: 'paragraph', text: 'The goal was to create a prototype that demonstrates design thinking and interactive storytelling rather than static mockups.' },
        ],
      },
      {
        title: 'Key Features',
        blocks: [
          { type: 'paragraph', text: 'The prototype explores several UI/UX design elements:' },
          { type: 'bullets', items: ['multi-section landing page structure', 'interactive UI components', 'modern layout systems', 'visual storytelling through interface design'] },
          { type: 'paragraph', text: 'Because the project is fully interactive, users can explore the prototype as if it were a live website.' },
        ],
      },
      {
        title: 'Outcome',
        blocks: [
          { type: 'paragraph', text: 'ProtoVerse serves as a demonstration of modern UI/UX design capability, allowing viewers to experience interface interactions and layout structures rather than viewing static design screenshots.' },
        ],
      },
      {
        title: 'Skills Demonstrated',
        blocks: [
          { type: 'bullets', items: ['UI/UX prototyping', 'interactive interface design', 'Figma advanced prototyping', 'layout system design'] },
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
