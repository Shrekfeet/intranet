# Shrekfeet Intranet

Employee portal for Shrekfeet — training modules, troubleshooting guides, lawn knowledge, scheduling and policies in one place.

## Tech stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Auth**: SHA-256 hashed passwords in `src/data/users.ts` (no external service needed)
- **Progress storage**: JSON file in a private GitHub repo, read/written via GitHub API
- **Hosting**: GitHub Pages (or any static host)

---

## Local development

### Prerequisites

- [Node.js](https://nodejs.org/) v18+

### Setup

```sh
# 1. Clone the repo
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Then edit .env with your GitHub credentials (see below)

# 4. Start the dev server
npm run dev
```

---

## Auth setup

User accounts are defined directly in `src/data/users.ts`. No external service required.

### Adding a team member

1. Open `src/data/users.ts`
2. Add a new entry to the `teamUsers` array:

```ts
{
  id: "jane",           // lowercase, used as the login username
  name: "Jane",         // display name shown in the app
  passwordHash: "...",  // SHA-256 hash of their password (see below)
}
```

### Generating a password hash

Open your browser's developer console and run:

```js
const hash = async (text) => {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
};
hash("their-password").then(console.log);
```

Copy the output string into `passwordHash`.

### Admin access

Set `isAdmin: true` on a user entry to grant access to the Admin Dashboard at `/admin`.

---

## GitHub progress storage setup (optional but recommended)

Without this, each person's training progress is saved only in their own browser (localStorage). With it, all progress is stored centrally so you can see everyone's status in the Admin Dashboard.

### 1. Create a private GitHub repo

Create a new **private** repo (e.g. `shrekfeet-progress`) in your GitHub account. It doesn't need any files — the app will create `progress.json` automatically on first save.

### 2. Create a fine-grained Personal Access Token

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens
2. Click **Generate new token**
3. Set expiry as needed (or "No expiration")
4. Under **Repository access**, select "Only select repositories" → choose `shrekfeet-progress`
5. Under **Repository permissions**, set **Contents** to **Read and write**
6. Generate and copy the token

### 3. Set your environment variables

Edit `.env` with your values:

```
VITE_GITHUB_OWNER=your-github-username
VITE_GITHUB_REPO=shrekfeet-progress
VITE_GITHUB_TOKEN=github_pat_xxxxxxxxxxxxxxxx
VITE_GITHUB_FILE=progress.json
```

> **Security note**: `.env` is gitignored and never committed. The token is only stored locally and in your browser's memory.

---

## Deploying to GitHub Pages

GitHub Pages serves static files. Because this app uses client-side routing (React Router), you need a small workaround so deep links like `/modules` don't 404.

Add this file to `public/404.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <script>
      const l = window.location;
      l.replace(l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1).join('/') + '/?p=' +
        l.pathname.slice(1).replace(/&/g, '~and~') +
        (l.search ? '&q=' + l.search.slice(1).replace(/&/g, '~and~') : '') + l.hash);
    </script>
  </head>
</html>
```

And add this to the `<head>` of `index.html` (before other scripts):

```html
<script>
  (function(l) {
    if (l.search[1] === '/') {
      var decoded = l.search.slice(1).split('&').map(function(s) {
        return s.replace(/~and~/g, '&')
      }).join('?');
      window.history.replaceState(null, null, l.pathname.slice(0, -1) + decoded + l.hash);
    }
  }(window.location))
</script>
```

Also set `base` in `vite.config.ts` to your repo name if deploying to a subpath (e.g. `base: '/lawn-learners-hub-main/'`).

---

## Build for production

```sh
npm run build
# Output is in the dist/ folder — deploy that to GitHub Pages or any static host
```
