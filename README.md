# Technical Assessment Submission
## Three Integrated Product Experiences

**Live Application:** [Add deployed application URL]

**GitHub Repository:** [Add GitHub repository URL]

This project brings together three product experiences in one integrated Next.js application:

1. Practo for Animals — Animal-care discovery platform.
2. AI Education — Landing page for practical AI and digital-skills programmes.
3. Carousel Studio — AI-powered social media content creation system.

The objective was to demonstrate product thinking, user experience design, frontend development, AI integration, and practical workflow automation through three distinct use cases.

---

# 1. Practo for Animals — Animal-Care Discovery Platform

## 1.1 Problem Statement

Finding appropriate animal-care services can be challenging for pet owners and people responsible for animal welfare.

Information about veterinary clinics, hospitals, diagnostics, boarding facilities, ambulances, and NGOs may be spread across different platforms. Users need a simple way to discover relevant providers and understand which services are available.

Practo for Animals addresses this problem through a centralised animal-care discovery experience.

## 1.2 Target Audience

- Pet owners looking for veterinary care.
- People searching for animal hospitals and diagnostic services.
- Pet owners needing boarding or emergency assistance.
- Individuals looking for animal welfare organisations and NGOs.
- Animal-care businesses that want to improve their online visibility.

## 1.3 MVP Features

The MVP focuses on making service discovery straightforward.

| Feature | Purpose |
|---|---|
| Homepage | Introduces the platform and directs users towards relevant services |
| Search | Helps users discover animal-care providers |
| Service categories | Organises clinics, hospitals, diagnostics, boarding, ambulances, and NGOs |
| Provider listings | Displays relevant businesses and services |
| Provider details | Provides information needed to evaluate and contact a provider |
| Search filters | Helps narrow results by relevant criteria |
| List Your Business | Provides a pathway for service providers to join the platform |
| Submit a Correction | Allows users to suggest corrections to provider information |

## 1.4 Search and Filtering Strategy

Useful filters for the MVP include:

- Location.
- Service category.
- Provider type.
- Availability, where reliable information exists.
- Other relevant service-specific criteria.

Filters should help users reach relevant results quickly without overwhelming them with unnecessary options.

## 1.5 Provider Information

A useful provider listing should communicate:

- Provider or organisation name.
- Service category.
- Location and address.
- Available services.
- Contact information.
- Operating hours, where available.
- Ratings or trust indicators, where verified.

The interface should prioritise information that helps users decide what to do next.

## 1.6 CTA Strategy

The primary actions are:

| CTA | Purpose |
|---|---|
| Find a Vet | Directs users towards veterinary providers |
| Explore Services | Helps users browse different animal-care categories |
| List Your Business | Encourages provider registration or listing enquiries |
| Submit a Correction | Supports information quality and platform trust |

The homepage should make the main discovery action prominent while keeping secondary actions accessible.

## 1.7 UI/UX and Mobile Experience

The design follows a friendly, trustworthy visual direction suitable for an animal-care platform.

Key design considerations:

- Clear visual hierarchy.
- Familiar search patterns.
- Easy-to-understand service categories.
- Readable provider cards.
- Consistent spacing and typography.
- Accessible colour contrast.
- Responsive layouts for desktop, tablet, and mobile.
- Prominent actions without excessive visual clutter.

The objective is to reduce the effort required to discover and contact an appropriate provider.

## 1.8 Future Improvements

Potential improvements include:

- Verified provider profiles.
- Appointment booking.
- Location-based discovery.
- Provider dashboard.
- User reviews and ratings.
- Emergency service availability.
- Improved provider onboarding and verification.

These are future product opportunities rather than claims about existing functionality.

---

# 2. AI Education — Course Landing Page

## 2.1 Problem Statement

Students and young professionals are increasingly interested in AI and digital technologies, but choosing a suitable learning programme can be difficult.

They need clear information about available programmes, the skills they can develop, and how those skills relate to practical career opportunities.

The AI Education experience is designed to make programme discovery and enquiry easier.

## 2.2 Target Audience

- University students.
- Recent graduates.
- Young professionals.
- Beginners exploring artificial intelligence.
- Individuals interested in developing practical digital skills.

## 2.3 Value Proposition

The platform presents practical AI and digital-skills programmes in an accessible format.

Its core message is:

**Learn practical AI and digital skills through structured programmes designed to help you move from curiosity to application.**

The landing page should communicate programme value before asking visitors to submit an enquiry.

## 2.4 Landing-Page Structure

| Section | Purpose |
|---|---|
| Hero | Communicates the value proposition and primary CTA |
| Programme Explorer | Introduces available courses and learning options |
| Benefits | Explains the value of practical AI education |
| Learning Journey | Shows how learners progress through the programme |
| Learning Path Finder | Helps visitors identify a suitable learning direction |
| FAQs | Addresses common questions and reduces uncertainty |
| Enquiry Section | Allows interested visitors to submit their details |
| Footer | Provides supporting navigation and information |

## 2.5 CTA Strategy

The landing page uses actions based on the visitor's level of interest.

| CTA | Purpose |
|---|---|
| Explore Programmes | Encourages programme discovery |
| Find My Learning Path | Helps visitors explore suitable learning options |
| Enquire Now | Converts interested visitors into enquiries |

The primary CTA should be visible in the hero section and repeated after relevant programme information.

## 2.6 Registration and Lead-Capture Journey

The intended user journey is:

1. A visitor arrives on the landing page.
2. The visitor understands the value proposition.
3. The visitor explores available programmes.
4. The visitor identifies a relevant learning path.
5. The visitor submits an enquiry form.
6. The form validates the submitted information.
7. The enquiry can be routed to the programme team for follow-up.

The form should collect only information necessary for an initial enquiry, such as:

- Name.
- Email address.
- Phone number, if required.
- Programme of interest.
- Relevant additional information.

The experience should provide clear validation and confirmation feedback.

**Implementation note:** The interface and enquiry journey should not be presented as a fully operational CRM or lead-management integration unless the corresponding backend and delivery mechanism have been implemented and tested.

## 2.7 UI/UX Strategy

The visual direction uses a modern educational identity.

Design priorities:

- Clear programme hierarchy.
- Concise programme descriptions.
- Strong visual distinction between sections.
- Easy navigation.
- Clear enquiry actions.
- Responsive layouts.
- Accessible typography and contrast.
- A straightforward learning-path discovery experience.

The goal is to help visitors understand what they can learn and what action to take next.

## 2.8 Future Improvements

- Student accounts.
- Course registration and payment.
- Learning management system integration.
- Automated enquiry notifications.
- CRM integration.
- Course progress tracking.
- Student feedback and testimonials.

---

# 3. Carousel Studio — AI-Powered Content Creation System

## 3.1 Problem Statement

Small business owners and startup founders often need consistent social media content but may not have an in-house designer or dedicated content team.

Creating a good carousel requires multiple activities:

- Developing an idea.
- Researching the topic.
- Structuring the content.
- Writing headlines and slide copy.
- Planning visual direction.
- Designing individual slides.
- Reviewing and exporting the final content.

Carousel Studio aims to bring these activities into one repeatable workflow.

## 3.2 Product Vision

**Bring your idea. Leave with a publish-ready carousel.**

Carousel Studio helps founders transform a raw idea into an editable, visually consistent Instagram or LinkedIn carousel.

The product combines AI-assisted content generation with a founder-controlled design and review experience.

## 3.3 Target Audience

- Small business owners.
- Startup founders.
- Independent professionals.
- Content creators.
- Businesses without an in-house graphic designer.

## 3.4 Recommended AI, Design and Automation Tools

| Tool | Status | Purpose |
|---|---|---|
| Google Gemini | Implemented | AI-assisted research and carousel content generation |
| Gemini Search Grounding | Implemented, subject to quota availability | Research support and source links |
| Next.js API Routes | Implemented | Secure server-side AI integration |
| Carousel Studio Editor | Implemented | Carousel preview, editing, themes, and layouts |
| Browser-based export | Implemented | Generate carousel files and copy captions |
| Canva | Proposed optional integration | Further brand refinement and manual design adjustments |
| n8n | Proposed future integration | Workflow orchestration and automation |

Canva and n8n are not presented as existing integrations. They are recommended extensions to the current implementation.

## 3.5 Repeatable AI Workflow

The workflow follows six stages.

**Stage 1 — Founder Brief**

The founder enters:

- Topic or raw idea.
- Platform: Instagram or LinkedIn.
- Target audience.
- Content objective.
- Preferred tone.
- Slide count.
- Additional instructions.

**Stage 2 — AI Research**

Gemini can use search grounding, where available, to gather supporting information.

The workflow should distinguish between source-supported information and unverified AI-generated insights.

**Stage 3 — Content Generation**

Gemini generates structured carousel content, including:

- Carousel title.
- Slide purpose.
- Slide headline.
- Short body copy.
- Visual direction.
- Suggested layout.
- Caption.
- Final CTA.

**Stage 4 — Design**

Carousel Studio applies consistent visual rules:

- Typography.
- Colour palette.
- Layout.
- Spacing.
- Visual hierarchy.
- Slide dimensions.

**Stage 5 — Founder Review**

The founder can review and edit the generated content before approving the final carousel.

**Stage 6 — Export**

The approved carousel can be exported using the available export functionality, along with its caption.

## 3.6 Workflow Diagram

```text
       FOUNDER
          |
          v
     USER BRIEF
          |
          v
   GEMINI AI RESEARCH
   (Search Grounding)
          |
          v
 GEMINI CONTENT GENERATION
          |
          v
  STRUCTURED CAROUSEL JSON
          |
          v
   SERVER-SIDE VALIDATION
          |
          v
   CAROUSEL STUDIO EDITOR
          |
          v
  FOUNDER REVIEW & EDITING
          |
          v
      FINAL EXPORT
     /     |      \
   PNG    PDF   CAPTION
```

**Optional extensions:**

- Canva can be used after export for additional manual brand refinement.
- n8n can later orchestrate research, content generation, review notifications, and delivery through webhooks.

## 3.7 Why This Tool Stack?

**Google Gemini**

Gemini handles the AI-assisted research and writing stages. It transforms a founder's brief into structured content that can be used by the editor.

**Next.js API Routes**

The API route acts as the server-side connection between the application and Gemini. It protects the API key and validates generated responses before returning them to the frontend.

**Custom Carousel Studio Editor**

A custom editor provides control over the final visual output. It also ensures that content follows consistent design rules instead of relying on manually designing every slide.

**Canva**

Canva is a useful optional tool for additional visual refinement, brand assets, and manual design adjustments. No direct Canva API integration is claimed.

**n8n**

n8n could automate future workflows by connecting webhooks, AI services, review notifications, and file delivery. It is not required for the current MVP.

## 3.8 Sample Carousel

The sample created for this deliverable is:

**7 AI Workflows Every Small Business Should Know**

Audience: Small business owners.

Platform: Instagram.

Objective: Educate.

Tone: Professional and approachable.

The seven-slide structure:

1. Introduction — 7 AI workflows every small business should know.
2. Customer Support — Organising and drafting common customer responses.
3. Content Creation — Turning one idea into multiple content formats.
4. Research and Summarisation — Summarising documents and business information.
5. Administrative Workflows — Reducing repetitive drafting and organisation.
6. Reporting and Insights — Making business information easier to understand.
7. Final CTA — Start with one repetitive task and automate thoughtfully.

The sample avoids unsupported performance statistics and exaggerated business claims.

## 3.9 CTA Strategy

- **Create a Carousel:** Primary action for founders ready to start.
- **Explore Sample Carousel:** Secondary action that demonstrates the product without requiring an AI request.
- **Generate Carousel:** Starts the AI content-generation process.
- **Approve Content & Continue:** Moves reviewed content into the design stage.
- **Export:** Allows the founder to obtain the final content.

The carousel itself should have a compelling opening hook and a clear final action.

## 3.10 Safety and Quality Considerations

- Gemini API keys remain on the server.
- Generated content is validated before rendering.
- Model-generated HTML or executable code is never rendered.
- Source links are restricted to valid HTTP or HTTPS URLs.
- Unsupported research claims should be identified rather than presented as verified facts.
- Human review takes place before final export.
- The sample carousel works without requiring an API key.

## 3.11 Future Improvements

- Save and reopen carousel projects.
- Brand kits and reusable templates.
- More advanced slide editing.
- Additional carousel themes.
- Direct Canva integration, if supported and implemented.
- n8n-based automation.
- Team collaboration.
- Social media publishing integrations.

---

# 4. Technology Stack

The three experiences are built within one integrated Next.js application.

| Technology | Role |
|---|---|
| Next.js 16 | Application framework and routing |
| React 19 | Component-based UI |
| JavaScript | Application logic |
| Tailwind CSS 4 | Styling and responsive layouts |
| lucide-react | Interface icons |
| Google Gemini API | AI content generation for Carousel Studio |

The application uses separate routes and feature-specific components to keep the three product experiences organised.

## Application Routes

| Route | Deliverable |
|---|---|
| `/` | Assignment overview |
| `/animals` | Practo for Animals |
| `/academy` | AI Education |
| `/studio` | Carousel Studio |

The three products have distinct visual identities while sharing the same application and deployment.

---

# 5. Product Design and Assessment Approach

The implementation focuses on the following assessment areas:

| Assessment Area | Weight |
|---|---:|
| UI/UX and visual design quality | 30% |
| Product thinking and CTA strategy | 20% |
| AI workflow and automation | 25% |
| Technical execution and tool selection | 15% |
| Initiative and communication | 10% |

The design approach prioritises:

- Clear user journeys.
- Strong visual hierarchy.
- Consistent and responsive interfaces.
- Relevant calls to action.
- Practical MVP functionality.
- Honest communication about implementation status.
- Scope for future improvements.

---

# 6. Implementation Status and Limitations

The application should be evaluated based on what is actually implemented and tested.

## Practo for Animals

- Homepage and discovery experience: [Verify]
- Search and provider listings: [Verify]
- Filters and provider details: [Verify]
- Business listing and correction journeys: [Verify]
- Responsive experience: [Verify]

## AI Education

- Landing page and programme sections: [Verify]
- Learning path experience: [Verify]
- Enquiry form: [Verify]
- Form validation and submission handling: [Verify]
- Responsive experience: [Verify]

## Carousel Studio

Reported implementation status:

- Gemini content generation implemented.
- Server-side API integration implemented.
- Carousel editor and preview implemented.
- PNG, PDF and caption export implemented.
- Sample carousel implemented.
- Canva and n8n remain optional proposals.

### Known Limitations

- Gemini Search Grounding returned a quota error (429) on the free tier during testing. The application falls back to generation without grounded research, and affected insights are labelled Unverified.
- Gemini model availability can vary by API key and account. The configured model should be verified before deployment.
- Canva and n8n are not directly integrated.
- Carousel edits are not persisted between sessions.
- AI-generated information should be reviewed before publication.

**Testing note:** Report lint, build, API, and export results only after running the corresponding checks. Mark manual checklist items as complete only after testing them.

---

# 7. Final Submission Checklist

## Deliverable 1 — Practo for Animals

- [ ] Homepage/search-page design is accessible.
- [ ] Search and discovery experience tested.
- [ ] Provider information and relevant filters reviewed.
- [ ] Main CTAs tested.
- [ ] Mobile responsiveness checked.

## Deliverable 2 — AI Education

- [ ] Course landing page is accessible.
- [ ] Programme information reviewed.
- [ ] Primary and secondary CTAs tested.
- [ ] Enquiry form tested.
- [ ] Mobile responsiveness checked.

## Deliverable 3 — Carousel Studio

- [ ] Sample carousel opens without an API request.
- [ ] Slide navigation works.
- [ ] Editing updates the preview.
- [ ] Gemini generation tested.
- [ ] PNG export tested.
- [ ] PDF export tested.
- [ ] Caption copying tested.
- [ ] Workflow diagram and tool explanation visible.

## Final Submission

- [ ] Live application URL added.
- [ ] GitHub repository URL added.
- [ ] README installation instructions verified.
- [ ] Environment variables documented without exposing secrets.
- [ ] Lint and build results verified.
- [ ] Screenshots or demonstration links added where appropriate.

---

# 8. Running the Application

From the frontend project directory:

```bash
npm install
npm run dev
```

For Carousel Studio, create `.env.local` in the frontend root:

```env
GEMINI_API_KEY=your_api_key
GEMINI_MODEL=your_available_model
```

Never commit `.env.local` or expose the API key in frontend code.

Restart the development server after changing environment variables.

For production, configure the same environment variables in the deployment platform.

---

# 9. Conclusion

This assessment demonstrates three different product experiences:

1. **Practo for Animals:** Simplifying animal-care service discovery.
2. **AI Education:** Helping students and professionals discover practical AI learning opportunities.
3. **Carousel Studio:** Helping founders transform ideas into reviewed and designed social media content through an AI-assisted workflow.

The common objective across all three is to solve a specific user problem through thoughtful product design, clear user journeys, and practical technology choices.

The implementation focuses on functional MVP experiences while identifying opportunities for future development and integration.