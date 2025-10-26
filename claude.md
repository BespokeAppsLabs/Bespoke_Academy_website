# Bespoke Academy - Claude Code Configuration

## Project Overview
Bespoke Academy is an AI-powered educational platform that delivers personalized learning experiences for career advancement. This project combines curriculum development, website building, and marketing automation.

## Technology Stack
- **Framework**: Next.js 15+ with TypeScript
- **Styling**: Tailwind CSS 4+ with Radix UI components
- **Package Manager**: Yarn 4.10.3
- **Deployment**: Vercel
- **AI Integration**: BMAD-v6 Method with custom sub-agents

## Development Standards
- **Code Quality**: ESLint + Prettier, TypeScript strict mode
- **Testing**: Jest, React Testing Library, Playwright for E2E
- **Git Flow**: Conventional commits with semantic versioning
- **Performance**: Core Web Vitals optimization, bundle size monitoring
- **Accessibility**: WCAG 2.1 AA compliance

## Project Structure
```
├── app/                    # Next.js App Router pages
├── src/
│   ├── components/         # Reusable React components
│   └── lib/               # Utility functions and configurations
├── public/                # Static assets
├── docs/                  # Project documentation
├── .bmad-integration/     # BMAD-v6 integration files
├── .claude/               # Claude Code configurations
│   └── agents/            # Project sub-agents (GLM 4.6)
└── bmad/                  # BMAD-v6 framework (post-installation)
```

## Development Commands
```bash
yarn dev          # Start development server
yarn build        # Build for production
yarn start        # Start production server
yarn lint         # Run linting
```

## Testing Strategy
- Unit tests for business logic and utilities
- Integration tests for API routes
- E2E tests for critical user journeys
- Performance testing with Lighthouse

## Deployment
- **Preview**: Automatic on every push to main branch
- **Production**: Manual promotion after QA approval
- **Environment Variables**: Managed via Vercel dashboard

---

## Sub-Agent Management

Bespoke Academy uses a comprehensive sub-agent system powered by both Claude Code and BMAD-v6. All sub-agents use GLM 4.6 from Zhipu AI as the underlying model.

### Default Sub-Agents

The following sub-agents are configured as default for this project:

#### 1. Minister of Education Agent (`minister-of-education.md`)
- **Purpose**: Curriculum development and educational strategy
- **Expertise**: Pedagogical design, learning assessment, educational technology
- **Location**: `.claude/agents/minister-of-education.md`
- **Model**: GLM 4.6 (Zhipu AI)
- **Tools**: Content generation, assessment builder, learning analytics

#### 2. PR Agent (`pr-agent.md`)
- **Purpose**: Brand storytelling and public relations
- **Expertise**: Media relations, content strategy, campaign management
- **Location**: `.claude/agents/pr-agent.md`
- **Model**: GLM 4.6 (Zhipu AI)
- **Tools**: Press release generator, social media manager, analytics tracker

#### 3. Teacher Agent (`teacher-agent.md`)
- **Purpose**: Lesson planning and student engagement
- **Expertise**: Instructional design, differentiated instruction, educational technology
- **Location**: `.claude/agents/teacher-agent.md`
- **Model**: GLM 4.6 (Zhipu AI)
- **Tools**: Lesson planner, engagement optimizer, assessment designer

#### 4. PM Agent (`pm-agent.md`)
- **Purpose**: Project management and coordination
- **Expertise**: Agile methodologies, stakeholder management, risk assessment
- **Location**: `.claude/agents/pm-agent.md`
- **Model**: GLM 4.6 (Zhipu AI)
- **Tools**: Project planner, resource manager, milestone tracker

#### 5. Dev Agent (`dev-agent.md`)
- **Purpose**: Website development and technical infrastructure
- **Expertise**: Full-stack development, API design, DevOps
- **Location**: `.claude/agents/dev-agent.md`
- **Model**: GLM 4.6 (Zhipu AI)
- **Tools**: Code generator, API builder, deployment automator

#### 6. Workflow Orchestrator (`workflow-orchestrator.md`)
- **Purpose**: Multi-agent coordination and workflow management
- **Expertise**: Process design, agent orchestration, quality assurance
- **Location**: `.claude/agents/workflow-orchestrator.md`
- **Model**: GLM 4.6 (Zhipu AI)
- **Tools**: Agent coordination, progress tracking, workflow optimization

### Sub-Agent Configuration

All sub-agents are configured with:

- **Model**: GLM 4.6 from Zhipu AI
- **Context Window**: Separate from main conversation
- **Tools**: Domain-specific tool permissions
- **System Prompts**: Custom behavior guidance
- **Quality Standards**: Project-specific success criteria

### Sub-Agent Usage

#### Claude Code Sub-Agents (Interactive)
Claude Code sub-agents are automatically available and can be invoked by name:
- **minister-of-education** - Curriculum development and educational strategy
- **pr-agent** - Brand storytelling and public relations
- **teacher-agent** - Lesson planning and student engagement
- **pm-agent** - Project management and coordination
- **dev-agent** - Website development and technical infrastructure
- **workflow-orchestrator** - Multi-agent coordination and workflow management

#### BMAD-v6 Commands (Systematic)
```bash
/bmad execute minister-of-education    # Automated curriculum generation
/bmad execute pr-agent                # Automated marketing creation
/bmad execute teacher-agent           # Automated lesson development
/bmad execute pm-agent                # Automated project management
/bmad execute dev-agent               # Automated development tasks
/bmad workflow                        # Multi-agent automation
```

### Sub-Agent Orchestration

#### Hybrid Workflow Pattern
1. **Creative Phase** (Claude Code): Interactive brainstorming and strategy
2. **Systematic Phase** (BMAD-v6): Deterministic, scalable execution
3. **Refinement Phase** (Claude Code): Human-centered optimization
4. **Validation Phase** (Both): Quality assurance and testing

#### Quality Assurance
- **Double Validation**: Both systems validate critical outputs
- **Human-in-the-Loop**: Important decisions require human approval
- **Automated Testing**: Continuous validation of generated content
- **Performance Monitoring**: Real-time quality metrics

### Sub-Agent Management Commands

#### Configuration Management
```bash
# Update agent configurations
vim .claude/agents/*.md
vim .bmad-integration/bmad/_cfg/agents/*.yaml

# Test agent functionality
# Agents are automatically available in Claude Code
/bmad status           # Check BMAD-v6 system status
```

#### Performance Monitoring
```bash
# View agent performance metrics
/bmad analytics        # BMAD-v6 performance data
/bespoke-workflow      # Claude Code workflow analysis
```

#### Quality Control
```bash
# Validate agent outputs
/bmad verify           # BMAD-v6 output validation
/bespoke-pm           # Claude Code quality review
```

### Sub-Agent Customization

#### Adding New Sub-Agents
1. Create Claude Code command in `.claude/commands/`
2. Create BMAD-v6 configuration in `bmad/_cfg/agents/`
3. Update agent registry in `claude.md`
4. Test integration with existing workflows

#### Modifying Existing Agents
1. Update system prompts and tool permissions
2. Adjust success criteria and quality standards
3. Test changes with sample tasks
4. Update documentation

### Best Practices

#### For Developers
- Use Claude Code agents for creative tasks and prototyping
- Use BMAD-v6 agents for systematic, large-scale tasks
- Always validate agent outputs before deployment
- Monitor agent performance and quality metrics

#### For Content Creators
- Start with `/bespoke-education` for curriculum strategy
- Use `/bespoke-teacher` for lesson development
- Leverage `/bespoke-pr` for marketing materials
- Coordinate with `/bespoke-pm` for project management

#### For Project Managers
- Use `/bespoke-workflow` for multi-agent coordination
- Monitor progress with both Claude Code and BMAD-v6
- Ensure quality gates are passed at each stage
- Maintain clear communication between agent handoffs

## Current Project Status

### Website Development
- **Framework**: Next.js 15+ with TypeScript configured
- **UI Components**: Radix UI with custom styling
- **Styling**: Tailwind CSS 4+ implemented
- **Status**: Basic structure in place, ready for feature development

### BMAD-v6 Integration
- **Status**: Configuration files created, installation pending
- **Agents**: 5 specialized sub-agents configured
- **Workflows**: Hybrid orchestration system designed
- **Next Step**: Execute BMAD-v6 installation from integration guide

### Sub-Agent System
- **Claude Code**: 6 interactive agents ready
- **BMAD-v6**: 5 systematic agents configured
- **Integration**: Hybrid workflow patterns established
- **Quality**: Dual validation system implemented

### Next Development Priorities
1. Execute BMAD-v6 installation
2. Build core website pages (Home, Courses, About)
3. Implement user authentication system
4. Create course enrollment workflow
5. Set up payment processing
6. Deploy initial marketing campaign

---

This configuration ensures that all sub-agents use GLM 4.6 from Zhipu AI and work seamlessly together to build and manage the Bespoke Academy platform.