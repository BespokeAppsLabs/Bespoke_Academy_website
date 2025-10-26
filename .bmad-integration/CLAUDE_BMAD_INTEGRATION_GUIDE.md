# Claude Code + BMAD-v6 Integration Guide
## Hybrid Agent System for Bespoke Academy

### Overview

This guide explains how to leverage both Claude Code's native agent system and BMAD-v6's BMB framework to create a powerful, complementary AI orchestration system for Bespoke Academy.

### Architecture Summary

We've implemented a **dual-agent system** that combines the best of both platforms:

## 1. Claude Code Native Agents (Primary Interface)

**Location**: `.claude/commands/`
**Purpose**: Direct human-AI interaction and immediate task execution
**Access**: Via slash commands in Claude Code

### Available Claude Code Agents:
- `/bespoke-education` - Minister of Education Agent
- `/bespoke-pr` - PR Agent
- `/bespoke-teacher` - Teacher Agent
- `/bespoke-pm` - PM Agent
- `/bespoke-dev` - Dev Agent
- `/bespoke-workflow` - Multi-Agent Orchestrator

### Characteristics:
✅ **Immediate Response**: Direct interaction with Claude
✅ **Flexible Adaptation**: Can adjust to user needs in real-time
✅ **Natural Language**: Conversational interface
✅ **Quick Tasks**: Ideal for rapid prototyping and ideation

## 2. BMAD-v6 BMB Agents (Background Processing)

**Location**: `bmad/_cfg/agents/`
**Purpose**: Deterministic, scalable, and reproducible agent workflows
**Access**: Via BMAD CLI commands (`/bmad`)

### Available BMAD Agents:
- `minister-of-education.yaml` - Curriculum development automation
- `pr-agent.yaml` - Marketing campaign automation
- `teacher-agent.yaml` - Lesson generation automation
- `pm-agent.yaml` - Project management automation
- `dev-agent.yaml` - Development task automation

### Characteristics:
✅ **Deterministic**: Reproducible results with same inputs
✅ **Scalable**: Can handle large-scale processing
✅ **Tracked**: Full audit trail and versioning
✅ **Composable**: Can be chained into complex workflows

## Integration Strategy

### When to Use Each System

**Use Claude Code Agents for:**
- Creative brainstorming and ideation
- Complex problem-solving requiring human judgment
- Interactive development and iteration
- User research and feedback synthesis
- Rapid prototyping and concept validation

**Use BMAD-v6 Agents for:**
- Large-scale content generation
- Repetitive task automation
- Batch processing of curriculum materials
- Systematic code generation
- Quality assurance and validation

### Hybrid Workflow Examples

#### 1. Course Development Workflow
```bash
# Phase 1: Creative Planning (Claude Code)
/bespoke-education
→ Brainstorm course structure and unique value proposition

# Phase 2: Systematic Generation (BMAD-v6)
/bmad execute "Generate comprehensive curriculum for digital marketing course"
→ Produces detailed curriculum with all components

# Phase 3: Human Refinement (Claude Code)
/bespoke-teacher
→ Review and enhance generated materials for engagement

# Phase 4: Technical Implementation (BMAD-v6)
/bmad implement "Build course pages and LMS integration"
→ Automated development with best practices
```

#### 2. Marketing Campaign Workflow
```bash
# Phase 1: Strategy Development (Claude Code)
/bespoke-pr
→ Develop campaign strategy and creative concepts

# Phase 2: Content Generation (BMAD-v6)
/bmad execute "Generate marketing materials for campaign"
→ Systematic content creation across channels

# Phase 3: Technical Setup (BMAD-v6)
/bmad implement "Build landing pages and tracking"
→ Automated development with analytics integration

# Phase 4: Optimization (Claude Code)
/bespoke-workflow
→ Analyze performance and optimize campaign
```

### Command Mapping

| Claude Code Command | BMAD-v6 Equivalent | Use Case |
|-------------------|-------------------|----------|
| `/bespoke-education` | `bmad execute minister-of-education` | Curriculum tasks |
| `/bespoke-pr` | `bmad execute pr-agent` | Marketing tasks |
| `/bespoke-teacher` | `bmad execute teacher-agent` | Lesson planning |
| `/bespoke-pm` | `bmad execute pm-agent` | Project management |
| `/bespoke-dev` | `bmad execute dev-agent` | Development tasks |
| `/bespoke-workflow` | `bmad workflow` | Multi-agent coordination |

### Data Flow Between Systems

**Input Flow**:
1. User provides requirements to Claude Code agent
2. Claude Code agent refines requirements and adds context
3. Structured requirements passed to BMAD-v6 agent
4. BMAD-v6 agent processes systematically
5. Results returned to Claude Code agent for final review

**Output Flow**:
1. BMAD-v6 generates structured artifacts
2. Claude Code agent reviews and enhances outputs
3. Human user provides feedback and approval
4. Final artifacts implemented and deployed

### Quality Assurance Framework

**Claude Code Layer**:
- Creative validation and enhancement
- User experience optimization
- Brand voice consistency
- Strategic alignment

**BMAD-v6 Layer**:
- Technical quality standards
- Consistency and reproducibility
- Performance optimization
- Security and compliance

**Combined Assurance**:
- Double validation by both systems
- Human-in-the-loop for critical decisions
- Automated testing and verification
- Continuous improvement based on feedback

### Implementation Roadmap

#### Phase 1: Foundation (Week 1-2)
- [ ] Install BMAD-v6 with BMB module
- [ ] Configure Claude Code agents
- [ ] Test basic agent functionality
- [ ] Establish communication protocols

#### Phase 2: Integration (Week 3-4)
- [ ] Create hybrid workflow templates
- [ ] Test agent handoff mechanisms
- [ ] Implement quality assurance checkpoints
- [ ] Document best practices

#### Phase 3: Optimization (Week 5-6)
- [ ] Fine-tune agent coordination
- [ ] Optimize performance metrics
- [ ] Train teams on hybrid system
- [ ] Establish monitoring and analytics

#### Phase 4: Scale (Week 7-12)
- [ ] Deploy across all projects
- [ ] Expand agent capabilities
- [ ] Implement advanced workflows
- [ ] Measure and optimize ROI

### Best Practices

#### For Claude Code Agents:
1. **Be Conversational**: Use natural language and adapt to user needs
2. **Think Creatively**: Bring innovative solutions and ideas
3. **Validate Assumptions**: Ask clarifying questions when needed
4. **Focus on Strategy**: Emphasize the "why" behind decisions

#### For BMAD-v6 Agents:
1. **Be Deterministic**: Produce consistent results with same inputs
2. **Follow Standards**: Maintain coding and documentation standards
3. **Track Everything**: Provide detailed logs and versioning
4. **Optimize Performance**: Focus on efficiency and scalability

#### For Hybrid Workflows:
1. **Clear Handoffs**: Define precise transition points between systems
2. **Quality Gates**: Implement validation at each stage
3. **Feedback Loops**: Create mechanisms for continuous improvement
4. **Monitoring**: Track performance across both systems

### Troubleshooting

**Common Issues**:

**Agent Coordination Problems**:
- Check handoff criteria in workflow definitions
- Verify communication protocols between agents
- Review quality assurance checkpoints

**Performance Issues**:
- Monitor BMAD-v6 agent execution times
- Check Claude Code response latency
- Optimize agent workload distribution

**Quality Inconsistencies**:
- Review validation criteria in both systems
- Check training data and prompts for consistency
- Implement additional quality gates

### Success Metrics

**Efficiency Metrics**:
- Task completion time reduction: Target 50% improvement
- Agent coordination success rate: Target >95%
- Quality consistency score: Target >90%

**Business Metrics**:
- Course development velocity: Target 2x improvement
- Marketing campaign ROI: Target >3:1
- Website development speed: Target 40% reduction in time-to-market

**User Satisfaction**:
- Stakeholder satisfaction: Target >85%
- Student engagement: Target >80%
- Team productivity: Target >60% improvement

---

This hybrid approach gives you the best of both worlds: Claude Code's flexible, creative intelligence combined with BMAD-v6's deterministic, scalable automation. Together, they create a powerful system for building and managing Bespoke Academy's educational platform.