#!/usr/bin/env python3
"""
NextGen logo updater.

Run this from your site folder (the one that contains index.html and the assets folder):

    python update_logos.py

What it does
  1. Makes a backup copy of every .html file and style.css into a folder called logo-backup.
  2. Points the white and colour header/footer logos at the new SVG files.
  3. Replaces the favicon with the new favicon set.
  4. Adds the logo size rules to assets/css/style.css (only once).

It is safe to run twice. It never touches files it does not need to change.
Before running, copy these 5 files into assets/img/ :
  nextgen-logo-horizontal-tally-partner.svg
  nextgen-logo-horizontal-tally-partner-white.svg
  nextgen-mark.svg
  favicon.ico
  apple-touch-icon-180.png
"""
import glob, os, shutil, sys

NEW_COLOUR = 'assets/img/nextgen-logo-horizontal-tally-partner.svg'
NEW_WHITE  = 'assets/img/nextgen-logo-horizontal-tally-partner-white.svg'
OLD_FAV = '<link rel="icon" type="image/png" href="assets/img/favicon.png">'
NEW_FAV = ('<link rel="icon" href="assets/img/favicon.ico" sizes="any">'
           '<link rel="icon" type="image/svg+xml" href="assets/img/nextgen-mark.svg">'
           '<link rel="apple-touch-icon" href="assets/img/apple-touch-icon-180.png">')
CSS_MARK = '/* NextGen logo sizing */'
CSS = '''
/* NextGen logo sizing */
.navbar-brand img,
.techvio-responsive-nav .logo img { height: 54px; width: auto; }
.footer-logo img { height: 60px; width: auto; }
@media only screen and (max-width: 575px) {
  .navbar-brand img, .techvio-responsive-nav .logo img { height: 44px; }
}
'''

def main():
    if not os.path.exists('index.html') or not os.path.isdir('assets/img'):
        sys.exit('Run this script from your site folder (it must contain index.html and assets/img).')
    needed = ['nextgen-logo-horizontal-tally-partner.svg','nextgen-logo-horizontal-tally-partner-white.svg',
              'nextgen-mark.svg','favicon.ico','apple-touch-icon-180.png']
    missing = [f for f in needed if not os.path.exists('assets/img/'+f)]
    if missing:
        sys.exit('Copy these files into assets/img/ first: ' + ', '.join(missing))
    os.makedirs('logo-backup', exist_ok=True)
    changed = 0
    for f in sorted(glob.glob('*.html')):
        s = open(f, encoding='utf-8', newline='').read(); o = s
        s = s.replace('assets/img/logo-black.png', NEW_COLOUR).replace('assets/img/logo.png', NEW_WHITE).replace(OLD_FAV, NEW_FAV)
        if s != o:
            shutil.copy2(f, os.path.join('logo-backup', f))
            open(f, 'w', encoding='utf-8', newline='').write(s); changed += 1
    css_path = 'assets/css/style.css'
    css_note = 'style.css not found, skipped'
    if os.path.exists(css_path):
        c = open(css_path, encoding='utf-8', newline='').read()
        if CSS_MARK in c:
            css_note = 'logo size rules already in style.css, left unchanged'
        else:
            shutil.copy2(css_path, os.path.join('logo-backup', 'style.css'))
            open(css_path, 'a', encoding='utf-8', newline='').write(CSS)
            css_note = 'added logo size rules to style.css'
    print(f'Done. Updated {changed} page(s); {css_note}.')
    print('Backups are in the logo-backup folder. Press Ctrl+F5 in your browser to see the change.')

main()
