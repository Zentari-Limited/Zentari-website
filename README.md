# Zentari Limited website

One-page static website for Zentari Limited. The site has no build-time dependencies; the build copies the HTML, CSS, JavaScript, and image assets into `dist/`.

## Build and preview locally

Requires Node.js 22 or newer.

```sh
npm run build
python3 -m http.server 8000 --directory dist
```

Open `http://localhost:8000` in a browser.

## Deploy with GitHub Pages

1. Create a new, empty GitHub repository for this project. Do not initialize it with a README or license.
2. From this folder, run the following commands, replacing the URL with your repository's HTTPS URL:

   ```sh
   git init -b main
   git add .
   git commit -m "Add Zentari Limited website"
   git remote add origin https://github.com/YOUR-USERNAME/zentari-limited.git
   git push -u origin main
   ```

   `dist/` and the local release ZIP are ignored; GitHub Actions builds the site from the source files.
3. In the repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
4. Push to `main` or `master` to publish updates. The workflow in `.github/workflows/deploy-pages.yml` builds and deploys the site. The published URL appears under the workflow run and in **Settings → Pages**.

GitHub Pages URLs normally look like `https://YOUR-USERNAME.github.io/REPOSITORY/`. The site uses relative paths for styles, scripts, and images, so it also works when hosted below the domain root.

## Optional: use a Porkbun domain

After the GitHub Pages deployment is live, enter your domain under **Settings → Pages → Custom domain**. In Porkbun's **Domain Management → DNS Records**, point `www` to `YOUR-USERNAME.github.io` with a CNAME record. For an apex domain such as `example.com`, use the GitHub Pages A records listed in GitHub's custom-domain documentation. Keep existing MX records if you use email on the domain. DNS changes can take time to propagate.

## Contact form

The contact form writes submissions to Cloud Firestore in the Zent Firebase project, in the `Website_Feedback` collection. Firestore security rules must allow valid public creates in that collection. The Firebase web configuration in `script.js` is a client configuration; access control belongs in Firestore rules.
