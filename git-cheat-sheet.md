


# 1. Stage all changes
git add .
git status
git commit -m "Commit before map update"
git push origin main

# See what changed
git status

# See commit history
git log --oneline

# Fix wrong commit message
git commit --amend -m "New better message"
git push --force-with-lease origin main

# Rename local branch from master → main (if needed)
git branch -M main

# Install Vercel CLI (once)
npm i -g vercel

# Deploy (follow prompts — takes 60 seconds)
vercel --prod
# → gives you a live URL like: https://where-is-gavin-newsom.vercel.app


npm install firebase @angular/fire @angular/material @angular/cdk @angular/animations \
            @googlemaps/markerclusterer tailwindcss postcss autoprefixer \
            @ngneat/hot-toast @angular/google-maps

# Initialize Tailwind
npx tailwindcss init -p

# 3. Add Firebase CLI for deploy
npm install -g firebase-tools

# ── src/environments/environment.ts
mkdir -p src/environments
cat > src/environments/environment.ts << 'EOF'

ng serve --open

# Step 1: Kill any stuck processes (port 4200 from earlier)
lsof -i :4200 | grep LISTEN | awk '{print $2}' | xargs kill -9 2>/dev/null || true

# Step 2: Nuclear clean (removes broken deps)
rm -rf node_modules package-lock.json
rm -rf node_modules package-lock.json

# Step 3: Update global Angular CLI to v20 first
npm uninstall -g @angular/cli
npm install -g @angular/cli@20

# Step 4: Update project CLI and core packages to v20
ng update @angular/cli@20 @angular/core@20 --force

# Step 5: Update other Angular packages (forms, router, etc.)
ng update @angular/material@20 @angular/cdk@20 @angular/google-maps@20 @angular/fire@20 --force

# Step 6: Reinstall everything clean
npm install --legacy-peer-deps

# Step 7: Fix Tailwind (v3 for Angular 20 stability)
npm uninstall tailwindcss postcss autoprefixer
npm install -D tailwindcss@3.4.0 postcss@8.4.31 autoprefixer@10.4.16
npx tailwindcss init -p

# Step 8: Launch the app (it will auto-open in browser)
ng serve --open

# Remove old floating button from AppComponent
sed -i '' '/<app-post-button>/d' src/app/app.component.html

