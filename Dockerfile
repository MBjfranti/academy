# Barley & Bronze — production image.
#
# WHAT WAS WRONG WITH THE GENERATED ONE. `fly launch` scaffolds a static-file server and
# `COPY . /srv/http/`, which for a Vite app is three separate problems at once:
#
#   1. It never builds. The repo root's index.html is the DEV entry — it has a
#      <script type="module" src="/src/main.jsx">, which only means anything to the Vite
#      dev server. Served statically it fetches a file that is not there, so the page
#      loads and then stays blank.
#   2. It copies the whole repo — node_modules, .git, and images/_custom, which is
#      hundreds of megabytes of source PNGs that exist so the Python pipeline can derive
#      the webp files already committed under public/img.
#   3. No SPA fallback. Every route on this site except "/" is client-side, so a reload
#      on /reports/anything, or any link somebody is given, 404s.
#
# So: build in one stage, serve the built output from another, with nginx doing the
# history-API fallback.

# ---- build ---------------------------------------------------------------------------
FROM node:22-alpine AS build
WORKDIR /app

# Dependencies first, so a content edit does not re-run npm ci. package-lock.json is
# committed, so `npm ci` is reproducible where `npm install` is not.
COPY package.json package-lock.json ./
RUN npm ci

# vite.config.js imports scripts/vite-crop-plugin.js at config load, so scripts/ has to be
# present for the build even though the plugin itself is `apply: 'serve'` and does not end
# up in the bundle. See .dockerignore.
COPY . .
RUN npm run build

# ---- serve ---------------------------------------------------------------------------
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

# Matches internal_port in fly.toml. nginx:alpine's own entrypoint starts the daemon.
EXPOSE 8080
