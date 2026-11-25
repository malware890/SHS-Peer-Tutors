# Peer Tutors Website

Revamped website for the Peer Tutors club at Adlai E. Stevenson High School (District 125) — a free, static, no-build-step site that replaces the old Google Sites page. Built with CS Club.

**Live demo of the design:** none yet — see "Deploying" below to put this on GitHub Pages for free.

## Structure

```
peer tutors/
├── index.html              Home
├── about.html              About Us (Eboard + sponsors)
├── faq.html                Frequently Asked Questions
├── schedule.html           Shift schedule + claim-a-shift / makeup-swap forms (prototype, see note below)
├── apply.html              General Application
├── dates.html              Important Dates
├── requirements.html       Membership Requirements
├── missing-shift.html      Missing a Shift policy
├── handbook.html           Handbook
├── committees.html         Outreach / Voice / Content Database committees
├── database.html           Content Database (study guides, video guides, SPARK notes, submissions)
└── assets/
    ├── style.css           Shared design system (all pages load this one file)
    └── script.js           Shared interactivity (nav, tabs, accordion, schedule logic)
```

Every page is plain HTML and shares the same two files in `assets/`, so there's no build step — edit a `.html` file or `assets/style.css` and refresh the browser to see the change. Any club member can edit this with just a text editor.

## Running it locally

Just open `index.html` in a browser (double-click it, or right-click → Open with → your browser). No server or install required.

## Deploying for free (GitHub Pages)

1. Create a new GitHub repository and push this folder's contents to it (see commands below).
2. In the repo on GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, pick `main` and `/ (root)`, then **Save**.
3. GitHub will give you a URL like `https://<your-username>.github.io/<repo-name>/` within a minute or two.
4. To give other Eboard members edit access, add them as **Collaborators** under **Settings → Collaborators** on the repo (free on GitHub, no limit on a public repo).

## Current status / what's a prototype

- **Everything visual** (all 11 pages, layout, styling) is finished and ready to use as-is.
- **`schedule.html`'s claim-a-shift and makeup-request forms are a working front-end prototype only.** They save to the browser's local storage, so claims don't yet sync across different people's devices. The next step is wiring this to a shared backend — Google Sheets + Apps Script is the leading option since the club already manages attendance that way, is free, and supports multiple editors.
- Anywhere you see a dashed "coming soon" box (feedback form, application forms, content database submissions), that's a placeholder for a future Google Form/Sheet embed — intentionally left unwired until the backend phase.

## Contact

Website questions: igupta27@students.d125.org
