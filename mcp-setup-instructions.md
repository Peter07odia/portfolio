# 🚀 MCP Vercel Server - Ready to Use!

Your MCP Vercel server is installed and built! Here's how to use it:

## ✅ Installation Complete

- ✅ **MCP Server**: `/Users/ifyodia/Downloads/AiFounderShowcase/mcp-vercel/`
- ✅ **Built executable**: `build/index.js`
- ✅ **Dependencies**: Installed
- ✅ **Configuration files**: Ready

---

## 🔑 Step 1: Get Your Vercel API Token

1. **Go to**: [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. **Click**: "Create Token"
3. **Name**: `MCP-AI-Assistant`
4. **Scope**: Select your account/team
5. **Copy the token** (save it securely)

---

## 🤖 Step 2: Configure Claude Desktop

### Option A: Manual Configuration

1. **Open Claude Desktop**
2. **Go to**: Settings → Developer → Model Context Protocol
3. **Add this configuration**:

```json
{
  "mcpServers": {
    "vercel": {
      "command": "node",
      "args": ["/Users/ifyodia/Downloads/AiFounderShowcase/mcp-vercel/build/index.js"],
      "env": {
        "VERCEL_API_TOKEN": "your_actual_token_here"
      }
    }
  }
}
```

### Option B: Use Configuration File

1. **Copy the config**: `claude-mcp-config.json`
2. **Edit the token**: Replace `your_vercel_token_here` with your actual token
3. **Import in Claude Desktop**

---

## 🎯 Step 3: Configure Cursor (Alternative)

1. **Open Cursor Settings** → **Tools**
2. **Model Context Protocol (MCP)** → **Add MCP tool**
3. **Configure**:
   - **Name**: `Vercel MCP`
   - **Command**: `node`
   - **Args**: `["/Users/ifyodia/Downloads/AiFounderShowcase/mcp-vercel/build/index.js"]`
   - **Environment**: `VERCEL_API_TOKEN=your_token`

---

## 🧪 Step 4: Test the Integration

### Test in Claude Desktop

Ask Claude:
```
Can you list my Vercel projects using the vercel-list-projects tool?
```

### Test in Cursor

Ask Cursor:
```
Please use the Vercel MCP tools to show me my recent deployments
```

---

## 🚀 Step 5: Deploy Your Portfolio with AI

### Create Project
```
Please create a new Vercel project using vercel-create-project with these settings:
- Name: ai-founder-showcase
- Framework: other
- Git repository: https://github.com/Peter07odia/portfolio.git
```

### Set Environment Variables
```
Please create environment variables for my ai-founder-showcase project:
- DATABASE_URL: [your database URL]
- SESSION_SECRET: [generate a secure key]
- FLASK_ENV: production
```

### Deploy
```
Please create a deployment for my ai-founder-showcase project with target: production
```

---

## 🛠️ Available MCP Tools

Once connected, you'll have access to:

- **`vercel-list-projects`** - List all your projects
- **`vercel-create-project`** - Create new projects
- **`vercel-list-all-deployments`** - List deployments
- **`vercel-create-deployment`** - Deploy projects
- **`vercel-get-deployment`** - Get deployment details
- **`vercel-create-environment-variables`** - Manage env vars
- **`vercel-create-team`** - Create teams
- **`vercel-list-all-teams`** - List teams

---

## 🔧 Troubleshooting

### MCP Server Not Found
```bash
# Test the server manually
cd /Users/ifyodia/Downloads/AiFounderShowcase/mcp-vercel
node build/index.js
```

### Token Issues
- Verify token at [vercel.com/account/tokens](https://vercel.com/account/tokens)
- Ensure token has correct permissions
- Check token hasn't expired

### Claude/Cursor Not Connecting
1. Restart the AI application
2. Check configuration syntax
3. Verify file paths are correct

---

## 💡 AI Commands You Can Use

### Quick Deployment
```
Deploy my portfolio from GitHub to Vercel with production settings
```

### Monitor Status
```
Show me the status of my recent deployments and any errors
```

### Environment Management
```
Add these environment variables to my project: DATABASE_URL, SESSION_SECRET, FLASK_ENV
```

### Project Analytics
```
Show me deployment statistics for my portfolio project
```

---

## 🎯 Benefits

- ✅ **Natural Language**: Deploy with simple commands
- ✅ **AI-Powered**: Smart error handling and troubleshooting
- ✅ **Real-time**: Monitor deployments as they happen
- ✅ **Automated**: Set up complex configurations easily

---

## 📚 Next Steps

1. **Get Vercel API token** 🔑
2. **Configure Claude/Cursor** 🤖
3. **Test the connection** 🧪
4. **Deploy your portfolio** 🚀
5. **Monitor and manage** 📊

---

**🤖 Ready for AI-powered deployment!** 