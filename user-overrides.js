/******

* INDEX:

  0100: STARTUP
  0200: GEOLOCATION
  0300: QUIETER FOX
  0400: SAFE BROWSING
  0600: BLOCK IMPLICIT OUTBOUND
  0700: DNS / DoH / PROXY / SOCKS
  0800: LOCATION BAR / SEARCH BAR / SUGGESTIONS / HISTORY / FORMS
  0900: PASSWORDS
  1000: DISK AVOIDANCE
  1200: HTTPS (SSL/TLS / OCSP / CERTS / HPKP)
  1600: REFERERS
  1700: CONTAINERS
  2000: PLUGINS / MEDIA / WEBRTC
  2400: DOM (DOCUMENT OBJECT MODEL)
  2600: MISCELLANEOUS
  2700: ETP (ENHANCED TRACKING PROTECTION)
  2800: SHUTDOWN & SANITIZING
  4000: FPP (fingerprintingProtection)
  4500: OPTIONAL RFP (resistFingerprinting)
  5000: OPTIONAL OPSEC
  5500: OPTIONAL HARDENING
  6000: DON'T TOUCH
  7000: DON'T BOTHER
  8000: DON'T BOTHER: FINGERPRINTING
  9000: NON-PROJECT RELATED
  9999: DEPRECATED / RENAMED

******/

/*** [SECTION 0100]: STARTUP ***/
user_pref("_user.js.parrot", "0100 syntax error: the parrot's dead!");
/* 0102: set startup page [SETUP-CHROME]
 * 0=blank, 1=home, 2=last visited page, 3=resume previous session
 * [NOTE] Session Restore is cleared with history (2811), and not used in Private Browsing mode
 * [SETTING] General>Startup>Restore previous session ***/
user_pref("browser.startup.page", 1);
/* 0103: set HOME+NEWWINDOW page
 * about:home=Firefox Home (default, see 0105), custom URL, about:blank
 * [SETTING] Home>New Windows and Tabs>Homepage and new windows ***/
user_pref("browser.startup.homepage", "https://start.duckduckgo.com/?kad=de_DE&kp=-2&kav=1&kn=1&kaj=u&kg=p&kae=b");
user_pref(" browser.startup.homepage_override.mstone", ignore); 

/*** [SECTION 0300]: QUIETER FOX ***/
user_pref("_user.js.parrot", "0300 syntax error: the parrot's not pinin' for the fjords!");
/** RECOMMENDATIONS ***/
/* 0321: disable recommendations in about:addons' Extensions and Themes panes [FF68+] ***/
/* user_pref("extensions.htmlaboutaddons.recommendations.enabled", false); ***/
user_pref("extensions.ui.lastCategory" "addons://list/extension");

/** OTHER ***/
/* 0360: disable Captive Portal detection
 * [1] https://www.eff.org/deeplinks/2017/08/how-captive-portals-interfere-wireless-security-and-privacy ***/
user_pref("captivedetect.canonicalURL", "");
user_pref("network.captive-portal-service.enabled", true); // [FF52+]
/* 0361: disable Network Connectivity checks [FF65+]
 * [1] https://bugzilla.mozilla.org/1460537 ***/
user_pref("network.connectivity-service.enabled", false);

/*** [SECTION 1200]: HTTPS (SSL/TLS / OCSP / CERTS / HPKP)
   Your cipher and other settings can be used in server side fingerprinting
   [TEST] https://www.ssllabs.com/ssltest/viewMyClient.html
   [TEST] https://browserleaks.com/ssl
   [TEST] https://ja3er.com/
   [1] https://www.securityartwork.es/2017/02/02/tls-client-fingerprinting-with-bro/
***/
user_pref("_user.js.parrot", "1200 syntax error: the parrot's a stiff!");

/** MIXED CONTENT ***/
/* 1241: disable insecure passive content (such as images) on https pages ***/
user_pref("security.mixed_content.block_display_content", true); // Defense-in-depth (see 1244)
/* 1244: enable HTTPS-Only mode in all windows
 * When the top-level is HTTPS, insecure subresources are also upgraded (silent fail)
 * [SETTING] to add site exceptions: Padlock>HTTPS-Only mode>On (after "Continue to HTTP Site")
 * [SETTING] Privacy & Security>HTTPS-Only Mode (and manage exceptions)
 * [TEST] http://example.com [upgrade]
 * [TEST] http://httpforever.com/ | http://http.rip [no upgrade] ***/
/* user_pref("dom.security.https_only_mode", true); // [FF76+] ***/
user_pref("dom.security.https_only_mode_pbm", true); // [FF80+]
/* 1245: enable HTTPS-Only mode for local resources [FF77+] ***/
   // user_pref("dom.security.https_only_mode.upgrade_local", true);

/*** [SECTION 2800]: SHUTDOWN & SANITIZING
   We enable sanitizeOnShutdown to help prevent 1st party website tracking across sessions.
   We consider history/downloads, which are not accessible to websites, as orthogonal and exempt these

   [SETUP-HARDEN] to clear all history/downloads on close, add the appropriate overrides from 2800's
***/
user_pref("_user.js.parrot", "2800 syntax error: the parrot's bleedin' demised!");
/* 2810: enable Firefox to clear items on shutdown
 * [NOTE] In FF129+ clearing "siteSettings" on shutdown (2811+), or manually via site data (2820+) and
 * via history (2830), will no longer remove sanitize on shutdown "cookie and site data" site exceptions (2815)
 * [SETTING] Privacy & Security>History>Custom Settings>Clear history when Firefox closes | Settings ***/
user_pref("privacy.sanitize.sanitizeOnShutdown", true);

/** SANITIZE ON SHUTDOWN: IGNORES "ALLOW" SITE EXCEPTIONS ***/
/* 2811: set/enforce clearOnShutdown items (if 2810 is true) [SETUP-CHROME] [FF128+] ***/
user_pref("privacy.clearOnShutdown_v2.cache", true); // [DEFAULT: true]
user_pref("privacy.clearOnShutdown_v2.historyFormDataAndDownloads", true); // [DEFAULT: true]
   // user_pref("privacy.clearOnShutdown_v2.siteSettings", false); // [DEFAULT: false]
/* 2812: set/enforce clearOnShutdown items [FF136+] ***/
user_pref("privacy.clearOnShutdown_v2.browsingHistoryAndDownloads", true); // [DEFAULT: true]
user_pref("privacy.clearOnShutdown_v2.downloads", true); // [HIDDEN]
user_pref("privacy.clearOnShutdown_v2.formdata", true);
/* 2813: set Session Restore to clear on shutdown (if 2810 is true) [FF34+]
 * [NOTE] Not needed if Session Restore is not used (0102) or it is already cleared with history (2811+)
 * [NOTE] If true, this prevents resuming from crashes (also see 5008) ***/
   // user_pref("privacy.clearOnShutdown.openWindows", true);

/** SANITIZE ON SHUTDOWN: RESPECTS "ALLOW" SITE EXCEPTIONS ***/
/* 2815: set "Cookies" and "Site Data" to clear on shutdown (if 2810 is true) [SETUP-CHROME] [FF128+]
 * [NOTE] Exceptions: For cross-domain logins, add exceptions for both sites
 * e.g. https://www.youtube.com (site) + https://accounts.google.com (single sign on)
 * [WARNING] Be selective with what sites you "Allow", as they also disable partitioning (1767271)
 * [SETTING] to add site exceptions: Ctrl+I>Permissions>Cookies>Allow (when on the website in question)
 * [SETTING] to manage site exceptions: Options>Privacy & Security>Permissions>Settings ***/
user_pref("privacy.clearOnShutdown_v2.cookiesAndStorage", true);

/** SANITIZE SITE DATA: IGNORES "ALLOW" SITE EXCEPTIONS ***/
/* 2820: set manual "Clear Data" items [SETUP-CHROME] [FF128+]
 * Firefox remembers your last choices. This will reset them when you start Firefox
 * [SETTING] Privacy & Security>Browser Privacy>Cookies and Site Data>Clear Data ***/
user_pref("privacy.clearSiteData.cache", true);
user_pref("privacy.clearSiteData.cookiesAndStorage", true); // keep false until it respects "allow" site exceptions
user_pref("privacy.clearSiteData.historyFormDataAndDownloads", true);
   // user_pref("privacy.clearSiteData.siteSettings", false);
/* 2821: set manual "Clear Data" items [FF136+] ***/
user_pref("privacy.clearSiteData.browsingHistoryAndDownloads", true);
user_pref("privacy.clearSiteData.formdata", true);

/** SANITIZE HISTORY: IGNORES "ALLOW" SITE EXCEPTIONS ***/
/* 2830: set manual "Clear History" items, also via Ctrl-Shift-Del [SETUP-CHROME] [FF128+]
 * Firefox remembers your last choices. This will reset them when you start Firefox
 * [SETTING] Privacy & Security>History>Custom Settings>Clear History ***/
user_pref("privacy.clearHistory.cache", true); // [DEFAULT: true]
user_pref("privacy.clearHistory.cookiesAndStorage", true);
user_pref("privacy.clearHistory.historyFormDataAndDownloads", true); // [DEFAULT: true]
   // user_pref("privacy.clearHistory.siteSettings", false); // [DEFAULT: false]
/* 2831: set manual "Clear History" items [FF136+] ***/
user_pref("privacy.clearHistory.browsingHistoryAndDownloads", false); // [DEFAULT: true]
user_pref("privacy.clearHistory.formdata", true);

/** SANITIZE MANUAL: TIMERANGE ***/
/* 2840: set "Time range to clear" for "Clear Data" (2820+) and "Clear History" (2830+)
 * Firefox remembers your last choice. This will reset the value when you start Firefox
 * 0=everything, 1=last hour, 2=last two hours, 3=last four hours, 4=today
 * [NOTE] Values 5 (last 5 minutes) and 6 (last 24 hours) are not listed in the dropdown,
 * which will display a blank value, and are not guaranteed to work ***/
user_pref("privacy.sanitize.timeSpan", 0);

/*** [SECTION 5000]: OPTIONAL OPSEC
   Disk avoidance, application data isolation, eyeballs...
***/
user_pref("_user.js.parrot", "5000 syntax error: the parrot's taken 'is last bow");
/* 5001: start Firefox in PB (Private Browsing) mode
 * [NOTE] In this mode all windows are "private windows" and the PB mode icon is not displayed
 * [NOTE] The P in PB mode can be misleading: it means no "persistent" disk state such as history,
 * caches, searches, cookies, localStorage, IndexedDB etc (which you can achieve in normal mode).
 * In fact, PB mode limits or removes the ability to control some of these, and you need to quit
 * Firefox to clear them. PB is best used as a one off window (Menu>New Private Window) to provide
 * a temporary self-contained new session. Close all private windows to clear the PB session.
 * [SETTING] Privacy & Security>History>Custom Settings>Always use private browsing mode
 * [1] https://wiki.mozilla.org/Private_Browsing
 * [2] https://support.mozilla.org/kb/common-myths-about-private-browsing ***/
   // user_pref("browser.privatebrowsing.autostart", true);
/* 5002: disable memory cache
 * capacity: -1=determine dynamically (default), 0=none, n=memory capacity in kibibytes ***/
   // user_pref("browser.cache.memory.enable", false);
   // user_pref("browser.cache.memory.capacity", 0);
/* 5003: disable saving passwords
 * [NOTE] This does not clear any passwords already saved
 * [SETTING] Privacy & Security>Logins and Passwords>Ask to save logins and passwords for websites ***/
user_pref("signon.rememberSignons", false);
/* 5004: disable permissions manager from writing to disk [FF41+] [RESTART]
 * [NOTE] This means any permission changes are session only
 * [1] https://bugzilla.mozilla.org/967812 ***/
   // user_pref("permissions.memory_only", true); // [HIDDEN PREF]
/* 5005: disable intermediate certificate caching [FF41+] [RESTART]
 * [NOTE] This affects login/cert/key dbs. The effect is all credentials are session-only.
 * Saved logins and passwords are not available. Reset the pref and restart to return them ***/
   // user_pref("security.nocertdb", true);
/* 5006: disable favicons in history and bookmarks
 * [NOTE] Stored as data blobs in favicons.sqlite, these don't reveal anything that your
 * actual history (and bookmarks) already do. Your history is more detailed, so
 * control that instead; e.g. disable history, clear history on exit, use PB mode
 * [NOTE] favicons.sqlite is sanitized on Firefox close ***/
   // user_pref("browser.chrome.site_icons", false);
/* 5007: exclude "Undo Closed Tabs" in Session Restore ***/
   // user_pref("browser.sessionstore.max_tabs_undo", 0);
/* 5008: disable resuming session from crash
 * [TEST] about:crashparent ***/
   // user_pref("browser.sessionstore.resume_from_crash", false);
/* 5009: disable "open with" in download dialog [FF50+]
 * Application data isolation [1]
 * [1] https://bugzilla.mozilla.org/1281959 ***/
   // user_pref("browser.download.forbid_open_with", true);
/* 5010: disable location bar suggestion types
 * [SETTING] Search>Address Bar>When using the address bar, suggest ***/
   // user_pref("browser.urlbar.suggest.history", false);
   // user_pref("browser.urlbar.suggest.bookmark", false);
   // user_pref("browser.urlbar.suggest.openpage", false);
   // user_pref("browser.urlbar.suggest.topsites", false); // [FF78+]
/* 5011: disable location bar dropdown
 * This value controls the total number of entries to appear in the location bar dropdown ***/
   // user_pref("browser.urlbar.maxRichResults", 0);
/* 5012: disable location bar autofill
 * [1] https://support.mozilla.org/kb/address-bar-autocomplete-firefox#w_url-autocomplete ***/
   // user_pref("browser.urlbar.autoFill", false);
/* 5013: disable browsing and download history
 * [NOTE] We also clear history and downloads on exit (2811)
 * [SETTING] Privacy & Security>History>Custom Settings>Remember browsing and download history ***/
   // user_pref("places.history.enabled", false);
/* 5014: disable Windows jumplist [WINDOWS] ***/
   // user_pref("browser.taskbar.lists.enabled", false);
   // user_pref("browser.taskbar.lists.frequent.enabled", false);
   // user_pref("browser.taskbar.lists.recent.enabled", false);
   // user_pref("browser.taskbar.lists.tasks.enabled", false);
/* 5016: discourage downloading to desktop
 * 0=desktop, 1=downloads (default), 2=custom
 * [SETTING] To set your custom default "downloads": General>Downloads>Save files to ***/
   // user_pref("browser.download.folderList", 2);
/* 5017: disable Form Autofill
 * If .supportedCountries includes your region (browser.search.region) and .supported
 * is "detect" (default), then the UI will show. Stored data is not secure, uses JSON
 * [SETTING] Privacy & Security>Forms and Autofill>Autofill addresses
 * [1] https://wiki.mozilla.org/Firefox/Features/Form_Autofill ***/
user_pref("extensions.formautofill.addresses.enabled", false); // [FF55+]
user_pref("extensions.formautofill.creditCards.enabled", false); // [FF56+]
user_pref("extensions.formautofill.heuristics.enabled", false); // [?????]
/* 5018: limit events that can cause a pop-up ***/
   // user_pref("dom.popup_allowed_events", "click dblclick mousedown pointerdown");
/* 5019: disable page thumbnail collection ***/
   // user_pref("browser.pagethumbnails.capturing_disabled", true); // [HIDDEN PREF]
/* 5020: disable Windows native notifications and use app notications instead [FF111+] [WINDOWS] ***/
   // user_pref("alerts.useSystemBackend.windows.notificationserver.enabled", false);
/* 5021: disable location bar using search
 * Don't leak URL typos to a search engine, give an error message instead
 * Examples: "secretplace,com", "secretplace/com", "secretplace com", "secret place.com"
 * [NOTE] This does not affect explicit user action such as using search buttons in the
 * dropdown, or using keyword search shortcuts you configure in options (e.g. "d" for DuckDuckGo) ***/
   // user_pref("keyword.enabled", false);

/*** [SECTION 5500]: OPTIONAL HARDENING
   Not recommended. Overriding these can cause breakage and performance issues,
   they are mostly fingerprintable, and the threat model is practically nonexistent
***/
user_pref("_user.js.parrot", "5500 syntax error: this is an ex-parrot!");
/* 5501: disable MathML (Mathematical Markup Language) [FF51+]
 * [1] https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=mathml ***/
   // user_pref("mathml.disabled", true); // 1173199
/* 5502: disable in-content SVG (Scalable Vector Graphics) [FF53+]
 * [1] https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=firefox+svg ***/
   // user_pref("svg.disabled", true); // 1216893
/* 5503: disable graphite
 * [1] https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=firefox+graphite
 * [2] https://en.wikipedia.org/wiki/Graphite_(SIL) ***/
   // user_pref("gfx.font_rendering.graphite.enabled", false);
/* 5504: disable asm.js [FF22+]
 * [1] http://asmjs.org/
 * [2] https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=asm.js
 * [3] https://rh0dev.github.io/blog/2017/the-return-of-the-jit/ ***/
   // user_pref("javascript.options.asmjs", false);
/* 5505: disable Ion and baseline JIT to harden against JS exploits [RESTART]
 * [NOTE] When both Ion and JIT are disabled, and trustedprincipals
 * is enabled, then Ion can still be used by extensions (1599226)
 * [1] https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=firefox+jit
 * [2] https://microsoftedge.github.io/edgevr/posts/Super-Duper-Secure-Mode/ ***/
   // user_pref("javascript.options.ion", false);
   // user_pref("javascript.options.baselinejit", false);
   // user_pref("javascript.options.jit_trustedprincipals", true); // [FF75+] [HIDDEN PREF]
/* 5506: disable WebAssembly [FF52+]
 * Vulnerabilities [1] have increasingly been found, including those known and fixed
 * in native programs years ago [2]. WASM has powerful low-level access, making
 * certain attacks (brute-force) and vulnerabilities more possible
 * [STATS] ~0.2% of websites, about half of which are for cryptomining / malvertising [2][3]
 * [1] https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=wasm
 * [2] https://spectrum.ieee.org/tech-talk/telecom/security/more-worries-over-the-security-of-web-assembly
 * [3] https://www.zdnet.com/article/half-of-the-websites-using-webassembly-use-it-for-malicious-purposes ***/
   // user_pref("javascript.options.wasm", false);
/* 5507: disable rendering of SVG OpenType fonts ***/
   // user_pref("gfx.font_rendering.opentype_svg.enabled", false);
/* 5508: disable all DRM content (EME: Encryption Media Extension)
 * Optionally hide the UI setting which also disables the DRM prompt
 * [SETTING] General>DRM Content>Play DRM-controlled content
 * [TEST] https://bitmovin.com/demos/drm
 * [1] https://www.eff.org/deeplinks/2017/10/drms-dead-canary-how-we-just-lost-web-what-we-learned-it-and-what-we-need-do-next ***/
   // user_pref("media.eme.enabled", false);
   // user_pref("browser.eme.ui.enabled", false);
/* 5509: disable IPv6 if using a VPN
 * This is an application level fallback. Disabling IPv6 is best done at an OS/network
 * level, and/or configured properly in system wide VPN setups.
 * [NOTE] PHP defaults to IPv6 with "localhost". Use "php -S 127.0.0.1:PORT"
 * [SETUP-WEB] PR_CONNECT_RESET_ERROR
 * [TEST] https://ipleak.org/
 * [1] https://www.internetsociety.org/tag/ipv6-security/ (Myths 2,4,5,6) ***/
   // user_pref("network.dns.disableIPv6", true);
/* 5510: control when to send a cross-origin referer
 * 0=always (default), 1=only if base domains match, 2=only if hosts match
 * [NOTE] Will cause breakage: older modems/routers and some sites e.g banks, vimeo, icloud, instagram ***/
   // user_pref("network.http.referer.XOriginPolicy", 2);
/* 5511: set DoH bootstrap address [FF89+]
 * Firefox uses the system DNS to initially resolve the IP address of your DoH server.
 * When set to a valid, working value that matches your "network.trr.uri" (0712) Firefox
 * won't use the system DNS. If the IP doesn't match then DoH won't work ***/
   // user_pref("network.trr.bootstrapAddr", "10.0.0.1"); // [HIDDEN PREF]
/* 5590: Anti-AI-Features as suggested by Tiagoquix ***/
user_pref("browser.ml.enable", false);
user_pref("browser.ml.chat.enabled", false);
user_pref("browser.ml.chat.page", false);
user_pref("extensions.ml.enabled", false);
user_pref("browser.tabs.group.smart.enabled", false);
user_pref("browser.tabs.groups.smart.userEnabled", false);
user_pref("browser.urlbar.quicksuggest.mlEnabled", false);
user_pref("places.semanticHistory.featureGate", false);
user_pref("pdfjs.enableAltText", false);
user_pref("pdfjs.enableAltTextForEnglish", false);
user_pref("pdfjs.enableGuessAltText", false);
user_pref("pdfjs.enableAltTextModelDownload", false);


/* END: internal custom pref to test for syntax errors ***/
user_pref("_user.js.parrot", "SUCCESS: No no he's not dead, he's, he's restin'!");
