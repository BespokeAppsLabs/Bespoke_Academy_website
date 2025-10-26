# BMAD-v6 Integration Guide for resident_man

## Overview
This guide provides step-by-step instructions for integrating BMAD-v6 (Breakthrough Method of Agile AI-driven Development) into the `resident_man` repository using Yarn package manager.

## Prerequisites
- ✅ Node.js >=22.0.0 (already satisfied)
- ✅ Yarn >=4.10.3 (already configured)
- ✅ Git repository (already initialized)

## Step-by-Step Integration Process

### Step 1: Clone BMAD-v6 Repository
```bash
# Clone the v6-alpha branch to a temporary location (~/bmad-temp)
git clone --branch v6-alpha --single-branch https://github.com/bmad-code-org/BMAD-METHOD.git ~/bmad-temp

# Navigate to the cloned repository
cd ~/bmad-temp
```
**Note**: This creates a temporary clone in `~/bmad-temp`. This folder can be safely deleted after installation is complete.

### Step 2: Install BMAD Dependencies
```bash
# Install BMAD's own dependencies using npm (required for initial setup)
npm install
```

### Step 3: Run Interactive BMAD Installation
```bash
# Execute the BMAD installer
npm run install:bmad
```

**During installation, you will be prompted for:**
- **User Settings**: Enter your name and preferred language
- **Technical Communication Level**: Select "Intermediate" or "Advanced"
- **Documentation Output Language**: Choose your preferred language
- **Module Selection**: Select **BMB only** (BMad Builder module)
- **IDE Enhancements**: Choose "Claude Code" when prompted

### Step 4: Configure Target Directory
When prompted for the target directory, enter:
```
see current directory (pwd)
```

### Step 5: Verify Installation
```bash
# Navigate back to your project
cd pwd

# Check BMAD status
node ~/bmad-temp/tools/cli/bmad-cli.js status
```

### Step 6: Test Claude Code Integration
After installation, you should have new BMAD commands available in Claude Code:
```bash
/bmad analyze        # Analyze current project structure
/bmad plan           # Create development plans
/bmad solve          # Generate technical solutions
/bmad implement      # Implement features automatically
```

## Alternative: Non-Interactive Installation

If you prefer a non-interactive approach, run this command directly from your project directory:

```bash
cd pwd

node ~/bmad-temp/tools/cli/bmad-cli.js install \
  --target pwd
  --modules bmb \
  --ides claude-code \
  --non-interactive
```

## Post-Integration Project Structure

After installation, your project will have this additional structure:
```
resident_man/
├── bmad/                    # BMAD integration folder
│   ├── core/               # Core orchestration functionality
│   ├── bmb/                # BMad Builder module (implementation)
│   └── _cfg/               # Configuration files
│       ├── manifests/      # Agent definitions
│       ├── agents.yaml     # Agent configurations
│       └── config.yaml     # User preferences
├── .claude/                # Enhanced Claude Code commands
│   └── commands/           # BMAD-specific CLI commands
└── ...                     # Your existing files remain unchanged
```

## BMAD Modules Overview

### Core Module (Always Installed)
- Base orchestration functionality
- Scale Adaptive Workflow Engine™ (SAWE)
- Multi-agent coordination system

### BMB Module (BMad Builder) - **SELECTED**
- Implementation automation
- Code generation and building
- Deployment workflows
- Automated feature implementation
- Code optimization and refactoring

## Compatibility with Your Stack

### Yarn Workspace Compatibility
- ✅ No conflicts with existing yarn workspaces
- ✅ No package.json modifications required
- ✅ BMAD installs as standalone folder structure
- ✅ Your `packageManager: "yarn@4.10.3"` configuration remains unchanged

### Turbo Monorepo Compatibility
- ✅ Works alongside your existing `apps/*` and `packages/*` structure
- ✅ No interference with turbo builds or caching
- ✅ Complementary to your development workflow

### Package Dependencies
BMAD has minimal dependencies that won't conflict with your existing packages:
- `@kayvan/markdown-tree-parser`, `boxen`, `chalk`, `cli-table3`
- `commander`, `inquirer`, `fs-extra`, `ora`, `semver`

## Usage Examples

### Automated Implementation
```bash
/bmad implement "Create REST API endpoints for user management"
```
*Automatically implements features with proper error handling*

### Code Generation
```bash
/bmad build "Generate React component for user dashboard"
```
*Creates optimized code components with best practices*

### Deployment Automation
```bash
/bmad deploy "Setup production deployment pipeline"
```
*Automates deployment workflows and CI/CD configuration*

## Configuration Customization

### Edit BMAD Configuration
```bash
# Edit user preferences
vim bmad/_cfg/config.yaml

# Edit agent definitions
vim bmad/_cfg/agents.yaml
```

### Key Configuration Options
```yaml
user:
  name: "Lucas"
  technical_level: "advanced"  # basic, intermediate, advanced
  preferred_language: "english"

project:
  default_workflow_phase: "implementation"  # implementation, building, deployment
  auto_generate_docs: true

claude_code:
  enhanced_commands: true
  auto_context_loading: true
```

## Troubleshooting

### Common Issues and Solutions

**Issue: BMAD commands not found in Claude Code**
```bash
# Restart Claude Code and check installation
node ~/bmad-temp/tools/cli/bmad-cli.js status
```

**Issue: Permission errors during installation**
```bash
# Ensure proper permissions
chmod +x ~/bmad-temp/tools/cli/bmad-cli.js
```

**Issue: Module conflicts with existing packages**
- BMAD modules are isolated and don't modify your package.json
- No dependency conflicts should occur

**Issue: Installation fails中途**
```bash
# Clean up and retry
rm -rf ~/bmad-temp
git clone --branch v6-alpha --single-branch https://github.com/bmad-code-org/BMAD-METHOD.git ~/bmad-temp
cd ~/bmad-temp && npm install && npm run install:bmad
```

## Benefits for resident_man Project

1. **Enhanced AI Orchestration**: Multi-agent workflows across your monorepo
2. **Automated Implementation**: Accelerated development with AI-assisted code generation
3. **Building Automation**: Streamlined build processes and optimization
4. **Deployment Workflows**: Automated CI/CD and deployment pipelines
5. **Code Refactoring**: Intelligent code optimization and restructuring
6. **Claude Code Supercharging**: Custom `/bmad` commands for implementation tasks

## Support and Community

- **Discord**: https://discord.gg/gk8jAdXWmj
- **Documentation**: Available in the BMAD repository
- **Issues**: Report to v6-alpha branch on GitHub
- **Community**: Active development community

## Maintenance

### Update BMAD
```bash
cd ~/bmad-temp
git pull origin v6-alpha
npm install
```

### Remove BMAD (if needed)
```bash
# Remove BMAD folder from your project
rm -rf {pwd}/bmad
rm -rf {pwd}/.claude/commands/bmad-*

# Clean up temporary clone (can be deleted after installation)
rm -rf ~/bmad-temp
```

**Important**: The `~/bmad-temp` folder is only needed for installation. Once BMAD is successfully integrated into your project, this temporary folder can be safely deleted to free up disk space.

## Next Steps

1. **Execute Step 1-3** to install BMAD-v6
2. **Test integration** with `/bmad status` command
3. **Explore features** using `/bmad analyze` on your current project
4. **Customize configuration** in `bmad/_cfg/config.yaml`
5. **Integrate workflows** into your development process

---

**Note**: BMAD-v6 is currently in alpha stage. Expect active development and frequent updates. Check the GitHub repository regularly for the latest features and improvements.