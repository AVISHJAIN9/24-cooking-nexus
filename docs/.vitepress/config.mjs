import { defineConfig } from 'vitepress';
import { withMermaid } from 'vitepress-plugin-mermaid';

export default withMermaid(
  defineConfig({
    title: 'Cooking Nexus',
    description: 'Smart Kitchen Operating System, Computer Vision Safety & Generative AI Platform.',
    appearance: 'dark',
    base: '/',
    themeConfig: {
      nav: [
        { text: 'Guide', link: '/00a-project-analysis' },
        { text: 'Features', link: '/01-features' },
        { text: 'API Reference', link: '/03-api-reference' },
        { text: 'System Design', link: '/system-design/' },
        { text: 'Interview Q&A', link: '/09-interview-qa' },
        { text: 'Checklist', link: '/13-master-checklist' },
        { text: 'Say It Out Loud', link: '/14-say-it-out-loud' }
      ],
      sidebar: [
        {
          text: 'Project Overview',
          items: [
            { text: 'Project Type', link: '/00-project-type' },
            { text: 'Project Analysis', link: '/00a-project-analysis' },
            { text: 'Project Pitch', link: '/00b-project-pitch' },
            { text: 'Project Map', link: '/00-project-map' }
          ]
        },
        {
          text: 'Features & Specifications',
          items: [
            { text: 'Feature Inventory', link: '/01-features' },
            { text: 'F1: AI Recipe & Extraction', link: '/features/F1-ai-recipe-generator-vision' },
            { text: 'F2: Hands-Free Voice & Gesture', link: '/features/F2-handsfree-voice-gesture-assistant' },
            { text: 'F3: Smart Kitchen IoT Hub', link: '/features/F3-smart-kitchen-iot-telemetry' },
            { text: 'F4: Culinary Reel Engine', link: '/features/F4-culinary-reel-social-stream' },
            { text: 'F5: Kitchen Safety Vision Guard', link: '/features/F5-kitchen-safety-vision-guard' },
            { text: 'Step-by-Step Build Order', link: '/02-build-order' },
            { text: 'API Reference', link: '/03-api-reference' },
            { text: 'Tech Choice Comparisons', link: '/04-tech-comparisons' }
          ]
        },
        {
          text: 'Architecture & Security',
          items: [
            { text: 'System Architecture', link: '/05-architecture' },
            { text: 'Security & OWASP Top 10', link: '/06-security' },
            { text: 'AI Integration Deep Dive', link: '/07-ai-integration' },
            { text: 'Engineering Quality & Ops', link: '/08-quality-and-ops' }
          ]
        },
        {
          text: 'System Design Deep Dive',
          items: [
            { text: 'System Design Index', link: '/system-design/' },
            { text: '14.1 Capacity Estimation', link: '/system-design/14.1-requirements-and-estimation' },
            { text: '14.2 Architecture Styles', link: '/system-design/14.2-architecture-styles' },
            { text: '14.3 Networking & Protocols', link: '/system-design/14.3-networking-and-communication' },
            { text: '14.4 Load Balancing & Scale', link: '/system-design/14.4-load-balancing-and-scaling' },
            { text: '14.5 Databases & Storage', link: '/system-design/14.5-databases-and-storage' },
            { text: '14.6 Caching Strategies', link: '/system-design/14.6-caching' },
            { text: '14.7 Messaging & Queues', link: '/system-design/14.7-messaging-and-queues' },
            { text: '14.8 Consistency & Concurrency', link: '/system-design/14.8-consistency-and-concurrency' },
            { text: '14.9 Reliability & Resilience', link: '/system-design/14.9-reliability-and-resilience' },
            { text: '14.10 API Design & Rate Limits', link: '/system-design/14.10-api-design-and-rate-limiting' },
            { text: '14.11 Security Architecture', link: '/system-design/14.11-security-architecture' },
            { text: '14.12 Search & AI Architecture', link: '/system-design/14.12-search-and-ai-architecture' },
            { text: '14.13 Real-Time & Media Streams', link: '/system-design/14.13-real-time-systems' },
            { text: '14.14 Observability & Ops', link: '/system-design/14.14-observability-and-operations' },
            { text: '14.15 Performance Engineering', link: '/system-design/14.15-performance-engineering.md' },
            { text: '14.16 Cost & Cloud Economics', link: '/system-design/14.16-cost-and-trade-offs' },
            { text: '14.17 Classic System Design', link: '/system-design/14.17-classic-system-design' },
            { text: 'Architecture Decisions (ADR)', link: '/system-design/decisions' }
          ]
        },
        {
          text: 'Interview & Quality Mastery',
          items: [
            { text: 'Interview Q&A (150+)', link: '/09-interview-qa' },
            { text: 'Gaps & 90-Day Roadmap', link: '/10-gaps-and-improvements' },
            { text: 'Technical Glossary', link: '/11-glossary' },
            { text: 'Developer Confirm List', link: '/12-confirm-list' },
            { text: 'Master Checklist (All 275)', link: '/13-master-checklist' },
            { text: 'Say It Out Loud Scripts', link: '/14-say-it-out-loud' }
          ]
        }
      ],
      search: {
        provider: 'local'
      },
      outline: [2, 3]
    },
    mermaid: {
      theme: 'dark'
    },
    vite: {
      optimizeDeps: {
        include: ['mermaid', 'fastdom', 'fastdom/extensions/fastdom-promised.js']
      },
      ssr: {
        noExternal: ['mermaid', 'vitepress-plugin-mermaid', 'fastdom']
      }
    }
  })
);
