#!/usr/bin/env node

/**
 * Sync MCP server configurations from ~/.claude/config.json to ~/.cursor/mcp.json
 * This script merges the MCP servers from Claude Desktop config into Cursor's config.
 */

import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CLAUDE_CONFIG_PATH = path.join(os.homedir(), '.claude', 'config.json');
const CURSOR_CONFIG_PATH = path.join(os.homedir(), '.cursor', 'mcp.json');

function readJSONFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      return null;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return null;
  }
}

function writeJSONFile(filePath, data) {
  try {
    // Ensure directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
    return true;
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error.message);
    return false;
  }
}

function mergeMCPConfigs(claudeConfig, cursorConfig) {
  // Extract MCP servers from Claude config
  const claudeServers = claudeConfig?.mcp?.servers || {};
  
  // Get existing Cursor servers
  const cursorServers = cursorConfig?.mcpServers || {};
  
  // Merge: Claude servers override Cursor servers if they have the same name
  const mergedServers = { ...cursorServers };
  
  // Convert Claude server format to Cursor format
  for (const [name, server] of Object.entries(claudeServers)) {
    // Only add if not already exists (to preserve Cursor-specific configs)
    // Or merge if you want Claude configs to take precedence
    if (!mergedServers[name]) {
      mergedServers[name] = {
        command: server.command,
        args: server.args || [],
        env: server.env || {},
      };
      
      // Add optional fields
      if (server.cwd) {
        mergedServers[name].cwd = server.cwd;
      }
    }
  }
  
  return {
    ...cursorConfig,
    mcpServers: mergedServers,
  };
}

function main() {
  console.log('Syncing MCP configurations from Claude Desktop to Cursor...\n');
  
  // Read Claude config
  const claudeConfig = readJSONFile(CLAUDE_CONFIG_PATH);
  if (!claudeConfig) {
    console.error('Failed to read Claude config. Exiting.');
    process.exit(1);
  }
  
  // Read Cursor config
  const cursorConfig = readJSONFile(CURSOR_CONFIG_PATH);
  if (!cursorConfig) {
    console.warn('Cursor config not found. Creating new one...');
    // Create default structure
    const defaultConfig = { mcpServers: {} };
    const merged = mergeMCPConfigs(claudeConfig, defaultConfig);
    if (writeJSONFile(CURSOR_CONFIG_PATH, merged)) {
      console.log(`✓ Successfully created ${CURSOR_CONFIG_PATH}`);
      console.log(`  Added ${Object.keys(merged.mcpServers).length} MCP servers`);
      return;
    } else {
      console.error('Failed to write Cursor config. Exiting.');
      process.exit(1);
    }
  }
  
  // Merge configs
  const merged = mergeMCPConfigs(claudeConfig, cursorConfig);
  
  // Count changes
  const claudeServerNames = Object.keys(claudeConfig?.mcp?.servers || {});
  const existingServerNames = Object.keys(cursorConfig?.mcpServers || {});
  const newServers = claudeServerNames.filter(name => !existingServerNames.includes(name));
  
  // Write merged config
  if (writeJSONFile(CURSOR_CONFIG_PATH, merged)) {
    console.log(`✓ Successfully updated ${CURSOR_CONFIG_PATH}`);
    console.log(`  Total MCP servers: ${Object.keys(merged.mcpServers).length}`);
    if (newServers.length > 0) {
      console.log(`  New servers added: ${newServers.join(', ')}`);
    } else {
      console.log('  No new servers added (all already exist)');
    }
  } else {
    console.error('Failed to write merged config. Exiting.');
    process.exit(1);
  }
}

main();
