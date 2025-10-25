# backend/Dockerfile

# --- STAGE 1: Build Phase ---
# We use a specific Node.js version on a lightweight OS (alpine)
# We name this stage 'builder' so we can refer to it later.
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
# This leverages Docker's layer caching. If these files don't change,
# Docker won't re-run 'npm install' on every build.
COPY package.json ./
COPY package-lock.json ./

# Install ALL dependencies (including devDependencies needed for 'build')
RUN npm install

# Copy the rest of the source code into the container
COPY . .

# Run the build script (tsc) to compile TypeScript into JavaScript
# This will create a '/dist' folder inside the container.
RUN npm run build

# --- STAGE 2: Production Phase ---
# Start from a fresh, clean Node image.
FROM node:20-alpine

WORKDIR /app

# Copy package files again
COPY package.json ./
COPY package-lock.json ./

# Install ONLY production dependencies
# This makes the final image much smaller and more secure.
RUN npm install --production

# Copy the compiled code (the 'dist' folder) from the 'builder' stage
# We don't copy the 'src' folder or devDependencies.
COPY --from=builder /app/dist ./dist

# We'll plan to run our server on port 3000
# This line doesn't open the port, but documents that the container uses it.
EXPOSE 3000

# The command to run when the container starts.
# This executes 'npm start' (which runs 'node dist/index.js')
CMD ["npm", "start"]