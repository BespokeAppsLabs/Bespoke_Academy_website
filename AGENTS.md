# BMAD Agents Documentation

This document provides comprehensive information about the BMAD Method agents integrated into this project. These agents are designed to assist in various aspects of development, planning, and project management.

## Quick Start

All agent commands start with an asterisk (*). To get started:

1. Use `*help` to see available commands
2. Use `*agent [name]` to switch to a specific agent
3. Use `*workflow [name]` to start a specific workflow
4. Use `*chat-mode` to enter conversational mode

Tip: You can also start with natural conversations and let the BMad Orchestrator guide you to the right agent or workflow.

## Available Agents

### BMad Orchestrator (🎭 Master Coordinator)
- **ID**: `bmad-orchestrator`
- **When to Use**: For workflow coordination, multi-agent tasks, and role switching guidance
- **Key Features**: 
  - Coordinates between different agents
  - Manages workflow transitions
  - Provides high-level project guidance
- **Command**: `*agent bmad-orchestrator`

### BMad Master (🎓 General Purpose)
- **ID**: `bmad-master`
- **When to Use**: For general tasks not requiring specialized agents
- **Key Features**:
  - Can perform most tasks
  - Maintains project context
  - Provides method guidance
- **Command**: `*agent bmad-master`

### Development Agent (💻 Implementation)
- **ID**: `dev`
- **When to Use**: For code implementation and technical tasks
- **Key Features**:
  - Implements user stories
  - Writes and reviews code
  - Handles technical implementation
- **Command**: `*agent dev`

### Architect Agent (🏗️ System Design)
- **ID**: `architect`
- **When to Use**: For system design and architecture decisions
- **Key Features**:
  - Designs system architecture
  - Makes technical decisions
  - Reviews architectural changes
- **Command**: `*agent architect`

## Agent Teams

Agent teams are predefined groups of agents that work together for specific purposes:

### team-fullstack
- Includes: Dev, Architect, PM agents
- Best for: Full-stack development projects
- Command: Use through BMad Orchestrator

### team-ide-minimal
- Includes: Dev and Architect agents
- Best for: Quick development tasks
- Command: Use through BMad Orchestrator

### team-all
- Includes: All available agents
- Best for: Complex projects requiring multiple perspectives
- Command: Use through BMad Orchestrator

## Best Practices

1. **Agent Selection**
   - Use specialized agents for their specific purposes
   - Switch agents when changing context (e.g., from planning to implementation)
   - Let the Orchestrator guide you to the right agent

2. **Command Usage**
   - Always prefix commands with * (asterisk)
   - Use `*help` when unsure about available commands
   - Use `*status` to check current agent and context

3. **Workflow Integration**
   - Start with `*workflow-guidance` for project planning
   - Use appropriate workflow for your project type
   - Follow agent recommendations for workflow transitions

## Common Commands

- `*help` - Display available commands
- `*agent [name]` - Switch to a specific agent
- `*workflow [name]` - Start a specific workflow
- `*status` - Check current context
- `*chat-mode` - Start conversational mode
- `*task [name]` - Execute a specific task

## Using Agents in Conversational Mode

The BMAD system supports natural conversations without explicitly selecting agents. Here's how it works:

1. **Start with Natural Language**
   - Begin by describing your task or need in plain language
   - The BMad Orchestrator will automatically understand your intent
   - You don't need to use any special commands or tags initially

2. **Automatic Agent Selection**
   - The Orchestrator analyzes your request and suggests the most appropriate agent
   - It may ask clarifying questions to better understand your needs
   - You can accept the suggestion or request a different agent

3. **Seamless Agent Switching**
   - Agents can be switched automatically based on the conversation context
   - The system maintains context across agent transitions
   - You'll be informed when a different agent takes over

4. **Using Chat Mode**
   - Enter `*chat-mode` for a more conversational experience
   - This enables natural back-and-forth dialogue
   - The system remembers context from previous interactions

5. **Best Practices for Chat**
   - Be clear about your objectives
   - Provide context when switching topics
   - Confirm understanding for complex tasks
   - Use `*status` to check which agent is currently active

## Integration with Development Process

1. **Planning Phase**
   - Use PM/Architect agents for initial planning
   - Create and validate architecture documents
   - Set up project structure

2. **Development Phase**
   - Use Dev agent for implementation
   - Follow established coding standards
   - Regular commits and reviews

3. **Review Phase**
   - Use appropriate specialist agents for review
   - Validate against requirements
   - Ensure quality standards

## Troubleshooting

If you encounter issues:

1. Check agent status with `*status`
2. Verify command syntax (remember the * prefix)
3. Review error messages in the agent logs
4. Consider switching to a more appropriate agent

## Additional Resources

- `.bmad-core/core-config.yaml` - Core configuration
- `.bmad-core/agents/` - Agent definitions
- `.bmad-core/workflows/` - Workflow definitions
- `.bmad-core/tasks/` - Available tasks

For more information, visit the [BMAD Method documentation](https://github.com/bmad-code-org/BMAD-METHOD).