# 🤖 MCP Vercel Server Setup Guide

> Deploy your AI Founder Showcase using the Model Context Protocol (MCP) Vercel integration

Based on: [nganiet/mcp-vercel](https://github.com/nganiet/mcp-vercel)

## 🎯 What This Gives You

Instead of manual Vercel deployment, you'll get:
- ✅ **AI-powered deployment** through Claude/Cursor
- ✅ **Automated environment variable management**
- ✅ **Real-time deployment monitoring**
- ✅ **Project creation and management**
- ✅ **Team management capabilities**

---

## 📋 Prerequisites

- ✅ **Vercel Account** with API access
- ✅ **Node.js 18+** installed
- ✅ **Claude Desktop** or **Cursor** with MCP support
- ✅ **Your GitHub repository**: `https://github.com/Peter07odia/portfolio.git`

---

## 🔑 Step 1: Get Vercel API Token

1. **Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)**
2. **Click "Create Token"**
3. **Name**: `MCP-AI-Assistant`
4. **Scope**: Select your team or personal account
5. **Expiration**: Choose appropriate duration
6. **Copy the token** (you'll need it soon)

---

## 📦 Step 2: Install MCP Vercel Server

### Option A: Clone and Install Locally

```bash
# Clone the MCP Vercel server
git clone https://github.com/nganiet/mcp-vercel.git
cd mcp-vercel

# Install dependencies
npm install

# Create environment file
echo "VERCEL_API_TOKEN=your_token_here" > .env

# Build the project
npm run build

# Test the server
npm start
```

### Option B: Global Installation (Recommended)

```bash
# Install globally via npm
npm install -g @nganiet/mcp-vercel

# Or install locally in your project
cd /Users/ifyodia/Downloads/AiFounderShowcase
npm install @nganiet/mcp-vercel
```

---

## ⚙️ Step 3: Configure MCP Server

### Create Configuration File

Create `mcp-vercel-config.json`:

```json
{
  "name": "vercel-mcp",
  "description": "Vercel deployment management via MCP",
  "version": "1.0.0",
  "server": {
    "command": "node",
    "args": ["./node_modules/@nganiet/mcp-vercel/dist/index.js"],
    "env": {
      "VERCEL_API_TOKEN": "your_vercel_token_here"
    }
  },
  "tools": [
    "vercel-list-all-deployments",
    "vercel-get-deployment",
    "vercel-create-deployment",
    "vercel-create-project",
    "vercel-create-environment-variables",
    "vercel-list-projects"
  ]
}
```

---

## 🤖 Step 4: Integrate with Claude Desktop

### Configure Claude Desktop

1. **Open Claude Desktop settings**
2. **Go to "Developer" → "Model Context Protocol"**
3. **Add new MCP server**:

```json
{
  "mcpServers": {
    "vercel": {
      "command": "node",
      "args": ["./node_modules/@nganiet/mcp-vercel/dist/index.js"],
      "env": {
        "VERCEL_API_TOKEN": "your_vercel_token_here"
      }
    }
  }
}
```

### Test Claude Integration

Ask Claude:
```
Can you list my Vercel deployments using the vercel-list-all-deployments tool?
```

---

## 🎯 Step 5: Integrate with Cursor

### Configure Cursor MCP

1. **Open Cursor Settings** → **Tools**
2. **Under "Model Context Protocol (MCP)"**, click **"+ Add MCP tool"**
3. **Configure**:
   - **Name**: `Vercel MCP`
   - **Command**: `node`
   - **Args**: `["./node_modules/@nganiet/mcp-vercel/dist/index.js"]`
   - **Environment Variables**: `VERCEL_API_TOKEN=your_token`

### Test Cursor Integration

In Cursor, ask:
```
Please use the Vercel MCP tools to list my projects and recent deployments
```

---

## 🚀 Step 6: Deploy Your Portfolio with AI

### Create Project via AI

Ask Claude/Cursor:
```
Please create a new Vercel project for my AI portfolio using the vercel-create-project tool with these settings:
- Name: ai-founder-showcase
- Framework: other
- Git repository: https://github.com/Peter07odia/portfolio.git
```

### Set Environment Variables via AI

```
Please create environment variables for my ai-founder-showcase project using vercel-create-environment-variables:
- DATABASE_URL: [your database URL]
- SESSION_SECRET: [generate a secure 32-character key]
- FLASK_ENV: production
- MAIL_SERVER: smtp.gmail.com
- MAIL_PORT: 587
```

### Deploy via AI

```
Please create a deployment for my ai-founder-showcase project using vercel-create-deployment with target: production
```

---

## 🛠️ Available MCP Tools

### Deployment Management
- **`vercel-list-all-deployments`** - List all deployments with filtering
- **`vercel-get-deployment`** - Get specific deployment details
- **`vercel-create-deployment`** - Create new deployments
- **`vercel-list-deployment-files`** - List files in deployment

### Project Management
- **`vercel-list-projects`** - List all projects
- **`vercel-create-project`** - Create new projects

### Environment Management
- **`vercel-create-environment-variables`** - Bulk create env vars
- **`vercel-get-environments`** - Get project environments
- **`vercel-create-custom-environment`** - Create custom environments

### Team Management
- **`vercel-list-all-teams`** - List accessible teams
- **`vercel-create-team`** - Create new teams

---

## 💡 AI Deployment Commands

### Quick Deployment
```
Deploy my portfolio from GitHub repo https://github.com/Peter07odia/portfolio.git to Vercel with production settings
```

### Monitor Deployments
```
Show me the status of my recent deployments and any that failed
```

### Environment Management
```
Add these environment variables to my ai-founder-showcase project:
- DATABASE_URL: postgresql://...
- SESSION_SECRET: my-secret-key
```

### Project Analytics
```
Show me deployment statistics and performance metrics for my portfolio project
```

---

## 🐳 Docker Alternative

If you prefer Docker deployment:

```bash
# Build MCP Vercel server
docker build -t mcp-vercel https://github.com/nganiet/mcp-vercel.git

# Run with your token
docker run -d \
  --name mcp-vercel \
  -e VERCEL_API_TOKEN=your_token_here \
  -p 3399:3399 \
  mcp-vercel

# Connect Claude/Cursor to http://localhost:3399
```

---

## 🔧 Troubleshooting

### MCP Server Not Starting
```bash
# Check Node.js version
node --version  # Should be 18+

# Verify token
echo $VERCEL_API_TOKEN

# Test server manually
npm start
```

### Claude/Cursor Not Connecting
1. **Restart the AI application**
2. **Check MCP server logs**
3. **Verify configuration file syntax**
4. **Ensure token has correct permissions**

### Deployment Fails
```
Ask your AI assistant: "Check the deployment logs for my latest deployment and help me fix any errors"
```

---

## 🎯 Benefits of MCP Approach

### vs Manual Deployment:
- ✅ **Faster**: AI handles complex configurations
- ✅ **Smarter**: AI can troubleshoot issues
- ✅ **Automated**: Set up CI/CD with natural language
- ✅ **Monitored**: Real-time deployment tracking

### vs Vercel CLI:
- ✅ **Natural Language**: No command memorization
- ✅ **Context Aware**: AI understands your project
- ✅ **Error Handling**: AI can fix deployment issues
- ✅ **Multi-tool**: Combines deployment with monitoring

---

## 🚀 Next Steps

1. **Install MCP Vercel server** ✅
2. **Configure Claude/Cursor** ✅
3. **Deploy your portfolio via AI** 🎯
4. **Set up monitoring and alerts** 📊
5. **Automate future deployments** 🔄

---

## 📚 Resources

- **MCP Vercel GitHub**: [github.com/nganiet/mcp-vercel](https://github.com/nganiet/mcp-vercel)
- **Model Context Protocol**: [modelcontextprotocol.io](https://modelcontextprotocol.io)
- **Vercel API Docs**: [vercel.com/docs/rest-api](https://vercel.com/docs/rest-api)
- **Claude MCP Guide**: [docs.anthropic.com/claude/docs/mcp](https://docs.anthropic.com/claude/docs/mcp)

---

**🤖 Ready to deploy with AI assistance!** 