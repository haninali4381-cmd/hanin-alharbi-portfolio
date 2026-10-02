Hanin Ali Alharbi — Portfolio (Cleaned & Hardened, v2)
=========================================================

HOW TO RUN
----------
1. This package now includes a working assets/ folder with your 3 real PDFs
   (CV_AR, CV_EN, ChemAware_Project) already placed where the HTML expects
   them. You still need to add assets/images/ (logo, project screenshots,
   hospital logo) and assets/icons/ (the skill SVGs) — those were never
   uploaded in any session, so the site will show broken image icons until
   they're added.
2. Open index.html (Arabic) or index-en.html (English) with a local server,
   e.g. VS Code's "Live Server" extension, or:
       python3 -m http.server 8000
3. Deploy by dragging the whole folder into Netlify, or push to GitHub and
   connect the repo to Netlify/Vercel.

CODE FIXES IN THIS PASS (same as before, reapplied — you re-uploaded the
original, unfixed files, so nothing from the previous cleanup had carried
over into this upload)
-----------------------------------------------------------------------
- styles.css rewritten clean: 872 -> 409 lines, no duplicate selectors, no
  dead CSS, no competing font imports, fonts loaded via <link> not @import.
- rel="noopener noreferrer" added to every target="_blank" link.
- The dead http://localhost/tarjuman/... link replaced with an honest label.
- 3 stray closing </div> tags removed from the TARJUMAN pages.
- Favicon, theme-color, and loading="lazy" added (logo/hero images stay
  eager).
- script.js cleaned up, same behavior, dead body.en class toggle removed.

CONTENT FINDINGS FROM YOUR ACTUAL PDFs (worth your attention — these are
not code bugs, they're inconsistencies in the content itself)
--------------------------------------------------------------------------
1. Your English CV is missing content that your Arabic CV has:
   - The ChemAware project is listed in the Arabic CV but does not appear
     anywhere in the English CV.
   - The entire "Professional Experience" section (Prince Sultan Armed
     Forces Hospital, cooperative training) is in the Arabic CV but missing
     from the English CV.
   Since both language versions are meant to represent the same person to
   different audiences, this is worth fixing — an English-speaking
   recruiter currently sees a materially thinner CV than an Arabic-speaking
   one.

2. Two projects listed in your CV are not on the website at all:
   - "School Database Design" (ERD + SQL)
   - "Taibah Journey" website (tourism site for Madinah visitors)
   Meanwhile the website features TARJUMAN, which isn't mentioned in either
   CV. Worth deciding whether the CV or the website (or both) should be the
   complete, authoritative project list.

3. Hanin_Ali_Alharbi_CV.pdf (no language suffix) is a byte-for-byte
   duplicate of the Arabic CV and isn't linked from any page — it was left
   out of the assets/ folder in this package since nothing references it.

4. ChemAware_Project.pdf is ~10 MB, which is heavy for a page a visitor
   loads directly in-browser. Consider exporting a compressed version
   (e.g. "Reduce File Size" in Acrobat, or an online PDF compressor) if
   load time on mobile matters to you.

NEXT THINGS WORTH DOING
------------------------
- Reconcile the AR/EN CVs and the CV/website project lists (see above).
- Add the missing assets/images and assets/icons folders.
- Replace the TARJUMAN "local prototype" note with a real hosted demo or
  GitHub link once available.
