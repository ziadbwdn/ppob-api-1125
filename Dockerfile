# Multi-stage Dockerfile for PPOB API Server

# Stage 1: Dependencies
FROM node:18-alpine AS dependencies
WORKDIR /app

# Copy package files
COPY server/package*.json ./

# Install dependencies
RUN npm ci --only=production

# Stage 2: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files
COPY server/package*.json ./

# Install all dependencies (including dev)
RUN npm ci

# Copy source code
COPY server/src ./src
COPY server/config ./config
COPY server/database ./database

# Stage 3: Runtime
FROM node:18-alpine AS runtime
WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy from dependencies stage
COPY --from=dependencies --chown=nodejs:nodejs /app/node_modules ./node_modules

# Copy application files
COPY --chown=nodejs:nodejs server/package*.json ./
COPY --chown=nodejs:nodejs server/server.js ./
COPY --chown=nodejs:nodejs server/src ./src
COPY --chown=nodejs:nodejs server/config ./config
COPY --chown=nodejs:nodejs server/database ./database

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start application
CMD ["node", "server.js"]
