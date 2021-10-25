---
lastTended:
  by: Matt McElwee
  when: 2021-10-25
---

## Principles

There are 4 design principles:

1. Aesthetically-pleasing **Minimalism**

   The design esthetic is minimalist. I believe that [minimalism](!W) helps one focus on the content.^[And, conversely, if a minimalist design cannot handle more content than a few paragraphs of text & a generic 'hero image', then it has not solved the design problem, and is merely a sub-genre of illustration. Like photographs of elegant minimalist Scandinavian or Japanese architecture which leave one wondering whether any human could _live_ inside them, or if [those buildings can learn](!W 'How Buildings Learn').] Anything besides the content is [distraction and not design](http://www.jwz.org/gruntle/design.html). 'Attention!', as [Ikkyu](!W) would say.[^attention] What does it take to present complex, highly-referenced, link-intensive, long-form text online as effectively as possible, while conserving the reader's time & attention?

   The palette is deliberately kept to grayscale as an experiment in consistency and whether this constraint permits a readable aesthetically-pleasing website. Various classic typographical tools, like [drop caps](!W 'Initial') and [small caps](!W) are used for emphasis.^[And also, admittedly, for esthetic value. One earns the right to add 'extraneous' details by first putting in the hard work of removing the actual extraneous details; only after the ground has been cleared---the 'data-ink ratio' maximized, the 'chartjunk' removed---can one see what is actually beautiful to add.]

2. Accessibility & **[Progressive Enhancement](!W)**

   Semantic markup is used where Markdown permits. JavaScript is _not_ required for the core reading experience, only for optional features: comments, table-sorting, [sidenotes](/Sidenotes), and so on. Pages can even be read without much problem in a smartphone or a text browser like `elinks`.

3. **Speed & Efficiency**

   On an increasingly-bloated Internet, a website which is anywhere remotely as fast as it could be is a breath of fresh air. Readers deserve better. Gwern.net uses many tricks to offer nice features like sidenotes or <span class="latex">L<span>a</span>T<span>e</span>X</span> math at minimal cost.

4. <span id="structural-reading">**Structural Reading**</span>

   How should we present texts online? A web page, unlike many mediums such as print magazines, lets us provide an unlimited amount of text. We need not limit ourselves to overly concise constructions, which countenance contemplation but not conviction.

   The problem then becomes taming complexity and length, lest we hang ourselves with our own rope. Some readers want to read every last word about a particular topic, while most readers want the summary or are skimming through on their way to something else. A tree structure is helpful in organizing the concepts, but doesn't solve the presentation problem: a book or article may be hierarchically organized, but it still must present every last leaf node at 100% size. Tricks like footnotes or appendices only go so far---having thousands of endnotes or 20 appendices to tame the size of the 'main text' is unsatisfactory as while any specific reader is unlikely to want to read any specific appendix, they will certainly want to read _an_ appendix & possibly many. The classic hypertext paradigm of simply having a rat's-nest of links to hundreds of tiny pages to avoid any page being too big also breaks down, because how granular does one want to go? Should every section be a separate page? (Anyone who attempted to read a [GNU Info](!W 'info (Unix)') manual knows how tedious that can be.^[The default presentation of separate pages means that an entire page may contain only a _single_ paragraph or sentence. The HTML versions of many technical manuals (typically compiled from <span class="latex">L<span>a</span>T<span>e</span>X</span>, Docbook, or GNU Info) are _even worse_, because they fail to exploit prefetching & are slower than local documentation, and take away all of the useful keybindings which makes navigating info manuals fast & convenient. Reading such documentation in a web browser is Chinese water torture. (That, decades later, the GNU project keeps generating documentation in that format, rather than at least as large single-page manuals with hyperlinked table-of-contents, is a good example of how bad they are at UI/UX design.) And it's not clear that it's that much worse than the other extreme, the monolithic [man page](!W) which includes every detail under the sun and is impossible to navigate without one's eyes glazing over even using [incremental search](!W) to navigate through dozens of irrelevant hits---every single time!]) What about every reference in the bibliography, should there be 100 different pages for 100 different references?

   A web page, however, can be dynamic. The solution to the length problem is to progressively expose more beyond the default as the user requests it, and make requesting as easy as possible. For lack of a well-known term and by analogy to [code folding](!W) in [structural editors](!W 'Structure editor')/[outliners](!W 'Outliner'), I call this **structural reading**: the hierarchy is made visible & malleable to allow reading at multiple levels of the structure.

   A Gwern.net page can be read at multiple structural levels: title, metadata block, abstracts, margin notes, emphasized keywords in list items, footnotes/sidenotes, collapsible sections, popup link annotations, and fulltext links or internal links to other pages. So the reader can read (in increasing depth) the title/metadata, or the page abstract, or skim the headers/Table of Contents, then skim margin notes+item summaries, then read the body text, then click to uncollapse regions to read in-depth sections too, and then if they still want more, they can mouse over references to pull up the abstracts or excerpts, and then they can go even deeper by clicking the fulltext link to read the full original. Thus, a page may look short, and the reader can understand & navigate it easily, but like an iceberg, those readers who want to know more about any specific point will find much more under the surface.

[^attention]:
    Paraphrased from _Dialogues of the Zen Masters_ as quoted in pg 11 of the Editor's Introduction to [_Three Pillars of Zen_](https://www.amazon.com/Three-Pillars-Zen-Teaching-Enlightenment/dp/0385260938/):

    > One day a man of the people said to Master Ikkyu: "Master, will you please write for me maxims of the highest wisdom?" Ikkyu immediately brushed out the word 'Attention'. "Is that all? Will you not write some more?" Ikkyu then brushed out twice: 'Attention. Attention.' The man remarked irritably that there wasn't much depth or subtlety to that. Then Ikkyu wrote the same word 3 times running: 'Attention. Attention. Attention.' Half-angered, the man demanded: "What does 'Attention' mean anyway?" And Ikkyu answered gently: "Attention means attention."

Miscellaneous principles: all visual differences should be semantic differences; every UI element that can react should visually change on hover, and have tooltips/summaries; hierarchies & progressions should come in cycles of 3 (eg bold > smallcaps > italics), otherwise, all numbers should be [0, 1, or ∞](!W 'Zero one infinity rule'); function > form; more > less; self-contained > fragmented; convention (linters/checkers) > constraints; hypertext is a great idea, we should try that!; local > remote---every link dies someday (archives are expensive short-term but cheap long-term); reader > author; speed is the second-most important feature after correctness; always bet on text; earn your ornaments (if you go overboard on minimalism, you may barely be mediocre); "users won't tell you when it's broken"; UI consistency is underrated (when in doubt, copy Wikipedia); if you find yourself doing something 3 times, fix it.

## Features

Notable features (compared to standard Markdown static site):

- Link popup annotations (['popin'](/images/design/2021-03-30-sidenotes-gwern.net-popins.png) on small screens or mobile):

  Annotations are hand-written, and automatically extracted from Arxiv/BioRxiv/MedRxiv/Crossref or written by hand (formatting is kept consistent by an extensive series of rewrite rules & checks); popups can be recursive, and can be manipulated in many ways---moved, fullscreened, 'stickied' (anchored in place), etc. [Wikipedia pages](/images/design/2021-04-01-gwern.net-annotations-popups-recursivewikipediapopups.png) are specially-supported, enabling them to be recursively navigated as well. Local Gwern.net pages & whitelisted domains can be popped up and viewed in full; PDFs can be read inside a PDF viewer; and supported source code formats will pop up a syntax-highlighted version if available ([eg](/static/build/LinkMetadata.hs)).

- [sidenotes](/Sidenotes){#sidenotes-2} using both margins, fallback to floating footnotes

  - [margin notes](https://edwardtufte.github.io/tufte-css/#sidenotes) (as inline or sidenotes)

- source code syntax highlighting ([custom monochrome theme](#syntax-highlighting-algol))
- code folding (collapsible sections/code blocks/tables)
- JS-free <span class="latex">L<span>a</span>T<span>e</span>X</span> math rendering (but where possible, HTML+Unicode is used instead, as it is much more efficient & natural-looking)
- [dark mode](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) (with a [theme switcher](/static/js/darkmode.js))
- click-to-zoom images & slideshows; full-width tables/images
- Disqus comments
- sortable tables; tables of various sizes
- automatically inflation-adjust dollar amounts, exchange-rate Bitcoin amounts
- link icons for filetype/domain/topic
- ["admonitions"](https://casual-effects.com/markdeep/features.md.html#basicformatting/admonitions) infoboxes (Wikipedia-like by way of Markdeep)
- lightweight drop caps
- epigraphs
- automatic smallcaps typesetting
- multi-column lists
- interwiki link syntax
- automatic link-ification of keywords ([LinkAuto.hs](/static/build/LinkAuto.hs){#linkauto-hs})

Much of Gwern.net design and JS/CSS was developed by [Said Achmiz](https://wiki.obormot.net), 2017--2020.
Some inspiration has come from [Tufte CSS](https://edwardtufte.github.io/tufte-css/) & Matthew Butterick's [_Practical Typography_](https://practicaltypography.com/).

## Abandoned

- [**Gitit**](https://github.com/jgm/gitit) wiki: I preferred to edit files in Emacs/Bash rather than a GUI/browser-based wiki.

  A Pandoc-based wiki using Darcs as a history mechanism, serving mostly as a demo; the requirement that 'one page edit = one Darcs revision' quickly became stifling, and I began editing my Markdown files directly and recording patches at the end of each day, and syncing the HTML cache with my host (at the time, a personal directory on `code.haskell.org`). Eventually I got tired of that and figured that since I wasn't using the wiki, but only the static compiled pages, I might as well switch to Hakyll and a normal static website approach.

- [**jQuery sausages**](https://christophercliff.com/sausage/examples/couchdb.html): unhelpful UI visualization of section lengths.

  A UI experiment, 'sausages' add a second scroll bar where vertical lozenges correspond to each top-level section of the page; it indicates to the reader how long each section is and where they are. (They look like a long link of pale white sausages.) I thought it might assist the reader in positioning themselves, like the popular 'floating highlighted Table of Contents' UI element, but without text labels, the sausages were meaningless. After a jQuery upgrade broke it, I didn't bother fixing it.

- [**Beeline Reader**](/AB-testing#beeline-reader-text-highlighting): a 'reading aid' which just annoyed readers.

  BLR tries to aid reading by coloring the beginnings & endings of lines to indicate the continuation and make it easier for the reader's eyes to saccade to the correct next line without distraction (apparently dyslexic readers in particular have issue correctly fixating on the continuation of a line). The A/B test indicated no improvements in the time-on-page metric, and I received many complaints about it; I was not too happy with the browser performance or the appearance of it, either.

  I'm sympathetic to the goal and think syntax highlighting aids are underused, but BLR was a bit half-baked and not worth the cost compared more straightforward interventions like reducing paragraph lengths or more rigorous use of ['structural reading'](#structural-reading) formatting. (We may be able to do typography differently in the future with new technology, like VR/AR headsets which come with [eye tracking](!W) technology intended for [foveated rendering](!W)---forget simple tricks like emphasizing the beginning of the next line as the reader reaches the end of the current line, do we need 'lines' at all if we can do things like just-in-time display the next piece of text in-place to create an 'infinite line'?)

- [**Google CSE**](!W 'Google Programmable Search Engine'): site search feature which too few people used.

  A 'custom search engine', a CSE is a souped-up `site:gwern.net/` Google search query; I wrote one covering Gwern.net and some of my accounts on other websites, and added it to the sidebar. [Checking the analytics](/AB-testing#cse), perhaps 1 in 227 page-views used the CSE, and a decent number of them used it only by accident (eg searching "e"); an A/B testing for a feature used so little would be powerless, and so I removed it rather than try to formally test it.

- **Tufte-CSS sidenotes**: fundamentally broken, and superseded.

  An early admirer of Tufte-CSS for its sidenotes, I gave a Pandoc plugin a try only to discover a terrible drawback: the CSS didn't support block elements & so the plugin simply deleted them. This bug apparently can be fixed, but the density of footnotes led to using `sidenotes.js` instead.

- [**DjVu**](!W) document format use: DjVu is a space-efficient document format with the fatal drawback that Google ignores it, and "if it's not in Google, it doesn't exist."

  DjVu is a document format superior to PDFs, especially standard PDFs: I discovered that space savings of 5× or more were entirely possible, so I used it for most of my book scans. It worked fine in my document viewers, Internet Archive & Libgen preferred them, and so why not? Until one day I wondered if anyone was linking them and tried searching in Google Scholar for some. Not a single hit! (As it happens, GS seems to specifically filter out books.) Perplexed, I tried Google---also nothing. Huh‽ My scans have been visible for years, DjVu dates back to the 1990s and was widely used (if not remotely as popular as PDF), and G/GS picks up all my PDFs which are hosted identically. What about `filetype:djvu`? I discovered to my horror that on the entire Internet, Google indexed about 50 DjVu files. Total. While apparently at one time Google did index DjVu files, that time must be long past.

  Loathe to take the space hit, which would noticeably increase my Amazon AWS S3 hosting costs, I looked into PDFs more carefully. I discovered PDF technology had advanced considerably over the default PDFs that gscan2pdf generates, and with [JBIG2](!W) compression, they were closer to DjVu in size; I could conveniently generate such PDFs using [ocrmypdf](https://github.com/jbarlow83/OCRmyPDF).^[Why don't all PDF generators use that? Software patents, which makes it hard to install the actual JBIG2 encoder (supposedly all JBIG2 encoding patents had expired by 2017, but no one, like Linux distros, wants to take the risk of unknown patents surfacing.), which has to ship separately from ocrmypdf, and worries over edge-cases in JBIG2 where numbers might be visually changed to different numbers to save bits.] This let me convert over at moderate cost and now my documents do show up in Google.

- **Darcs/Github repo**: no useful contributions or patches submitted, added considerable process overhead, and I accidentally broke the repo by checking in too-large PDFs from a failed post-DjVu optimization pass (I misread the result as being smaller, when it was much larger).
- **spaces in URLs**: an OK idea but users are why we can't have nice things.

  Gitit assumed 'titles = filenames = URLs', which simplified things and I liked spaced-separated filenames; I carried this over to Hakyll, but gradually, by monitoring analytics realized this was a terrible mistake---as straightforward as URL-encoding spaces as `%20` may seem to be, _no one_ can do it properly. I didn't want to fix it because by the time I realized how bad the problem was, it would have required breaking, or later on, redirecting, hundreds of URLs and updating all my pages. The final straw was when [The Browser](https://thebrowser.com/) linked a page incorrectly, sending ~1500 people to the 404 page. I finally gave in and replaced spaces with hyphens. (Underscores are the other main option but because of Markdown, I worry that trades one error for another.) I suspect I should have also lower-cased all links while I was at it, but thus far it has not proven _too_ hard to fix case errors & lower-case URLs are ugly.

  In retrospect, [Sam Hughes was right](https://qntm.org/urls 'On short URLs'): I should have made URLs as simple as possible (and then a bit simpler): a single word, lowercase alphanum, with no hyphens or underscores or spaces or punctuation of any sort. I am, however, locked in to longer hyphen-separated mixed-case URLs now.

- **[AdSense](!W)** banner ads (and ads in general): reader-hostile and probably a net financial loss.

  I hated running banner ads, but before my Patreon began working, it seemed the lesser of two evils. As my finances became less parlous, I became curious as to _how_ much lesser---but I could find no Internet research whatsoever measuring something as basic as the traffic loss due to advertising! So I decided to [run an A/B test myself](/Ads){#ads-2}, with a proper sample size and cost-benefit analysis; the harm turned out to be so large that the analysis was unnecessary, and I removed AdSense permanently the first time I saw the results. Given the measured traffic reduction, I was probably losing several times more in potential donations than I ever earned from the ads. (Amazon affiliate links appear to not trigger this reaction, and so I've left them alone.)

- Bitcoin/PayPal/Gittip/Flattr **donation links**: never worked well compared to Patreon.

  These methods were either single-shot or never hit a critical mass. One-off donations failed because people wouldn't make a habit if it was manual, and it was too inconvenient. Gittip/Flattr were similar to Patreon in bundling donators, and making it a regular thing, but never hit an adequate scale.

- [**Google Fonts**](!W) web fonts: slow and buggy.

  Google Fonts turned out to introduce noticeable latency in page rendering; further, its selection of fonts is limited, and the fonts outdated or incomplete. We got both faster and nicer-looking pages by taking the [master Github versions](https://github.com/adobe-fonts/source-serif-pro) of Adobe Source Serif/Sans Pro (the Google Fonts version was both outdated & incomplete then) and subsetting them for Gwern.net specifically.

- **[MathJax](!W) JS**: switched to static rendering during compilation for speed.

  For math rendering, MathJax and [KaTeX](!W) are reasonable options (inasmuch as [MathML](!W) browser adoption is dead in the water). MathJax rendering is extremely slow on some pages: up to 6 seconds to load and render all the math. Not a great reading experience. When I learned that it was possible to preprocess MathJax-using pages, I dropped MathJax JS use the same day.

- **[`<q>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q) quote tags** for English [syntax highlighting](!W): divisive and a maintenance burden.

  I like the idea of treating English as a little (not a lot!) more like a formal language, such as a programming language, as it comes with benefits like syntax highlighting. In a program, the reader gets guidance from syntax highlighting indicating logical nesting and structure of the 'argument'; in a natural language document, it's one damn letter after another, spiced up with the occasional punctuation mark or indentation. (If Lisp looks like "oatmeal with fingernail clippings mixed in" due to the lack of "[syntactic sugar](!W)", then English must be plain oatmeal!) One of the most basic kinds of syntax highlighting is simply highlighting strings and other literals vs code: I learned early on that syntax highlighting was worth it just to make sure you hadn't forgotten a quote or parenthesis somewhere! The same is true of regular writing: if you are extensively quoting or naming things, the reader can get a bit lost in the thickets of curly quotes and be unsure who said what.

  I discovered an obscure HTML tag enabled by an obscurer Pandoc setting: the quote tag `<q>`, which replaces quote characters and is rendered by the browser as quotes (usually). Quote tags are parsed explicitly, rather than just being opaque natural language text blobs, and so they, at least, can be manipulated easily by JS/CSS and syntax-highlighted. Anything inside a pair of quotes would be tinted a gray to visually set it off similarly to the blockquotes. I was proud of this tweak, which I've seen nowhere else.

  The problems with it was that not everyone was a fan (to say the least); it was not always correct (there are many double-quotes which are not literal quotes of anything, like rhetorical questions); and it interacted badly with everything else. There were puzzling drawbacks: eg web browsers delete them from copy-paste, so we had to use JS to convert them to normal quotes. Even when it was worked out, all the HTML/CSS/JS had to be constantly rejiggered to deal with interactions with them, browser updates would silently break what was working, and Said Achmiz hated the look. I tried manually annotating quotes to ensure they were all correct and not used in dangerous ways, but even with interactive regexp search-and-replace to assist, the manual toil of constantly marking up quotes was a major obstacle to writing. So I gave in. It was not meant to be.

- [typographic **rubrication**](/Red): a solution in search of a problem.

  Red emphasis is a visual strategy that works wonderfully well for many styles, but not Gwern.net that I could find. Using it on the regular website resulted in _too_ much emphasis and the lack of color anywhere else made the design inconsistent; we tried using it in dark mode to add some color & preserve night vision by making headers/links/drop-caps red, but it looked like "a vampire fansite" as one reader put it. It is a good idea, but we just haven't found a use for it. (Perhaps if I ever make another website, it will be designed around rubrication.)

  - Another solution in search of a problem is [[Subscripted Citations]{.smallcaps}](/Subscripts "A typographic proposal: replace cumbersome inline citation formats like 'Foo et al. (2010') with subscripted dates/sources. Intuitive, easily implemented, consistent, and compact.").

- **`wikipedia-popups.js`**: a JS library written to imitate Wikipedia popups, which used the WP API to fetch article summaries; obsoleted by the faster & more general local static link annotations.

  I disliked the delay and as I thought about it, it occurred to me that it would be nice to have popups for other websites, like Arxiv/BioRxiv links---but they didn't _have_ APIs which could be queried. If I fixed the first problem by fetching WP article summaries while compiling articles and inlining them into the page, then there was no reason to include summaries for only Wikipedia links, I could get summaries from any tool or service or API, and I could of course write my own! But that required an almost complete rewrite to turn it into `popups.js`.

- **link screenshot previews**: automatic screenshots too low-quality, and unpopular.

  To compensate for the lack of summaries for almost all links (even after I wrote the code to scrape various sites), I tried a feature I had seen elsewhere of 'link previews': small thumbnail sized screenshots of a web page or PDF, loading using JS when the mouse hovered over a link. (They were much too large, ~50kb, to inline statically like the link annotations.) They gave some indication of what the target content was, and could be generated automatically using a headless browser. I used Chromium's built-in screenshot mode for web pages, and took the first page of PDFs.

  The PDFs worked fine, but the webpages often broke: thanks to ads, newsletters, and the GDPR, countless webpages will pop up some sort of giant modal blocking any view of the page content, defeating the point. (I have extensions installed like [AlwaysKillSticky](https://git.sr.ht/~achmizs/AlwaysKillSticky.git) to block that sort of spam, but Chrome screenshot _cannot_ use any extensions or customized settings, and the Chrome devs refuse to improve it.) Even when it did work and produced a reasonable screenshot, many readers disliked it anyway and complained. I wasn't too happy either about having 10,000 tiny PNGs hanging around. So as I expanded link annotations steadily, I finally pulled the plug on the link previews. Too much for too little.

  - [Link Archiving]{.smallcaps}: my link archiving improved on the link screenshots in several ways. First, SingleFile saves pages inside a normal Chromium browsing instance, which _does_ support extensions and user settings. Killing stickies alone eliminates half the bad archives, ad block extensions eliminate a chunk more, and NoScript blacklists specific domains. (I initially used NoScript on a whitelist basis, but disabling JS breaks too many websites these days.) Finally, I decided to manually review every snapshot before it went live to catch bad examples and either fix them by hand or add them to the blacklist.

- <span id="auto-dark-mode">**auto [dark mode](!W)**</span>: a good idea but "users are why we can't have nice things".

  OSes/browsers have defined a 'global dark mode' toggle the user can set if they want dark mode everywhere, and this is available to a web page; if you are implementing a dark mode for your website, it then seems natural to just make it a feature and turn on iff the toggle is on. There is no need for complicated UI-cluttering widgets with complicated implementations. And yet---if you _do_ do that, users will regularly complain about the website acting bizarre or being dark in the daytime, having apparently forgotten that they enabled it (or never understood what that setting meant).

  A widget is necessary to give readers control, although even there it can be screwed up: many websites settle for a simple negation switch of the global toggle, but if you do that, someone who sets dark mode at day will be exposed to blinding white at night... Our widget works better than that. Mostly.

- **multi-column footnotes**: mysteriously buggy and yielding overlaps.

  Since most footnotes are short, and no one reads the endnote section, I thought rendering them as two columns, as many papers do, would be more space-efficient and tidy. It was a good idea, but it didn't work.

- [**Hyphenopoly**](https://github.com/mnater/Hyphenopoly): it turned out to be more efficient (and not much harder to implement) to hyphenate the HTML during compilation than to run JS clientside.

  To work around Google Chrome's 2-decade-long refusal to ship hyphenation dictionaries on desktop and enable [justified text](!W 'Typographic alignment#Justified') (and incidentally use the better [<span class="tex-logotype">T<sub>e</sub>X</span>](!W 'TeX#Hyphenation and justification') [hyphenation algorithm](!W 'Hyphenation algorithm')), the JS library Hyphenopoly will download the <span class="tex-logotype">T<sub>e</sub>X</span> English dictionary and typeset a webpage itself. While the performance cost was surprisingly minimal, it was there, and it caused problems with obscurer browsers like Internet Explorer.

  So we scrapped Hyphenopoly, and I later implemented a Hakyll function using [a Haskell version](https://hackage.haskell.org/package/hyphenation "'hyphenation': Configurable Knuth-Liang hyphenation; uses the UTF8 encoded hyphenation patterns provided by hyph-utf8 from http://www.ctan.org/tex-archive/language/hyph-utf8") of the <span class="tex-logotype">T<sub>e</sub>X</span> hyphenation algorithm & dictionary to insert at compile-time a '[soft hyphen](!W)' everywhere a browser could usefully break a word, which enables Chrome to hyphenate correctly, at the moderate cost of inlining them and a few edge cases.^[Specifically: some OS/browsers preserve soft hyphens in copy-paste, which might confuse readers, so we use JS to delete soft hyphens; this breaks for users with JS disabled, and on Linux, the X GUI bypasses the JS entirely for _middle_-click but no other way of copy-pasting. There were some additional costs: the soft-hyphens made the final HTML source code harder to read, made regexp & string searches/replaces more error-prone, and apparently some [screen readers](!W) are so incompetent that they pronounce every soft-hyphen!]

  Desktop Chrome _finally_ shipped hyphen support in early 2020, and I removed the soft-hyphen hyphenation pass in April 2021 when [CanIUse](https://www.caniuse.com/?search=hyphenate) indicated >96% global support.

- **autopager keyboard shortcuts**: binding Home/PgUp & End/PgDwn keyboard shorcuts to go to the 'previous'/'next' logical page turned out to be glitchy & confusing.

  HTML supports previous/next attributes on links which specify what URL is the logical next or previous URL, which makes sense in many contexts like manuals or webcomics or series of essays; browsers make little use of this metadata---typically not even to preload the next page! (Opera apparently was one of the few exceptions.)

  Such metadata was typically available in older hypertext systems by default, and so older more reader-oriented interfaces like pre-Web hypertext readers such [info](!W 'info (Unix)') browsers frequently overloaded the standard page-up/down keybindings to, if one was already at the beginning/ending of a hypertext node, go to the logical previous/next node. This was convenient, since it made paging through a long series of info nodes fast, almost as if the entire info manual were a single long page, and it was easy to discover: most users will accidentally tap them twice at some point, either reflexively or by not realizing they were already at the top/bottom (as is the case on most info nodes due to egregious shortness). In comparison, navigating the HTML version of an info manual is frustrating: not only do you have to use the mouse to page through potentially dozens of 1-paragraph pages, each page takes noticeable time to load (because of failure to exploit preloading) whereas a local info browser is instantaneous.

  After defining a global sequence for Gwern.net pages, and adding a 'navbar' to the bottom of each page with previous/next HTML links encoding that sequence, I thought it'd be nice to support continuous scrolling through Gwern.net, and wrote some JS to detect whether at the top/bottom of page, and on each Home/PgUp/End/PgDwn, whether that key had been pressed in the previous 0.5s, and if so, proceed to the previous/next page.

  This worked, but proved buggy and opaque in practice, and tripped up even me occasionally. Since so few people know about that pre-WWW hypertext UI pattern (as useful as it is), would be unlikely to discover it, or use it much if they did discover it, I removed it.

## Tools

Software tools & libraries used in the site as a whole:

- The source files are written in [Pandoc](http://johnmacfarlane.net/pandoc/) [Markdown](!W) (Pandoc: John MacFarlane et al; GPL) (source files: Gwern Branwen, CC-0). The Pandoc Markdown uses a number of extensions; pipe tables are preferred for anything but the simplest tables; and I use [semantic linefeeds](https://rhodesmill.org/brandon/2012/one-sentence-per-line/) (also called ["semantic line breaks"](https://sembr.org/) or ["ventilated prose"](https://vanemden.wordpress.com/2009/01/01/ventilated-prose/)) formatting.
- math is written in [<span class="latex">L<span>a</span>T<span>e</span>X</span>](!W 'LaTeX') which compiles to [MathML](!W), rendered by MathJax (Apache)
- <span id="syntax-highlighting-algol">syntax highlighting</span>: we originally used [Pandoc's builtin](https://github.com/jgm/skylighting) [Kate](!W 'Kate (text editor)')-derived themes, but most clashed with the overall appearance; after looking through all the existing themes, we took inspiration from [Pygments's](https://pygments.org/) [algol_nu](https://xyproto.github.io/splash/docs/longer/algol_nu.html) (BSD) based on the original [ALGOL](https://en.wikipedia.org/wiki/ALGOL_60) report, and typeset it in the [IBM Plex](https://en.wikipedia.org/wiki/IBM_Plex) Mono font^[An unusual choice, as one does not associate IBM with font design excellence, but nevertheless, it was our choice after blind comparison of ~20 code fonts with [variant zeroes](!W 'Slashed zero') (which we consider a requirement for code).]
- the site is compiled with the [Hakyll](https://github.com/jaspervdj/Hakyll/)v4+ static site generator, used to generate Gwern.net, written in [Haskell](!W 'Haskell (programming language)') (Jasper Van der Jeugt et al; BSD); for the gory details, see [`hakyll.hs`](/static/build/hakyll.hs) which implements the compilation, RSS feed generation, & parsing of interwiki links as well. This just generates the basic website; I do many additional optimizations/tests before & after uploading, which is handled by [`sync-gwern.net.sh`](/static/build/sync-gwern.net.sh) (Gwern Branwen, CC-0)

  My preferred method of use is to browse & edit locally using Emacs, and then distribute using Hakyll. The simplest way to use Hakyll is that you `cd` into your repository and `runhaskell hakyll.hs build` (with `hakyll.hs` having whatever options you like). Hakyll will build a static HTML/CSS hierarchy inside `_site/`; you can then do something like `firefox _static/index`. (Because HTML extensions are not specified in the interest of [cool URIs](http://www.w3.org/TR/cooluris/), you cannot use the Hakyll `watch` webserver as of January 2014.) Hakyll's main advantage for me is relatively straightforward integration with the Pandoc Markdown libraries; Hakyll is not that easy to use, and so I do not recommend use of Hakyll as a general static site generator unless one is already adept with Haskell.

- the CSS is borrowed from a motley of sources and has been heavily modified, but its origin was the [Hakyll homepage](http://jaspervdj.be/hakyll/) & [Gitit](https://github.com/jgm/gitit); for specifics, see [`default.css`](/static/css/default.css)
- Markdown syntax extensions:

  - I implemented a Pandoc Markdown plugin for a custom syntax for interwiki links in Gitit, and then ported it to Hakyll (defined in `hakyll.hs`); it allows linking to the English Wikipedia (among others) with syntax like `[malefits](!Wiktionary)` or `[antonym of 'benefits'](!Wiktionary "Malefits")`. CC-0.
  - inflation adjustment: [`Inflation.hs`](/static/build/Inflation.hs) provides a Pandoc Markdown plugin which allows automatic inflation adjusting of dollar amounts, presenting the nominal amount & a current real amount, with a syntax like `[$5]($1980)`.
  - Book affiliate links are through an [Amazon Affiliates](!W) tag appended in the `hakyll.hs`
  - image dimensions are looked up at compilation time & inserted into `<img>` tags as browser hints

- JavaScript:

  - Comments are outsourced to [Disqus](!W) (since I am not interested in writing a dynamic system to do it, and their anti-spam techniques are much better than mine).
  - the HTML tables are sortable via [tablesorter](https://mottie.github.io/tablesorter/docs/) (Christian Bach; MIT/GPL)
  - the MathML is rendered using [MathJax](!W)
  - analytics are handled by [Google Analytics](!W)
  - [A/B testing](!W) is done using [ABalytics](https://github.com/danmaz74/ABalytics) (Daniele Mazzini; MIT) which hooks into Google Analytics (see [testing notes](/AB-testing){#gwern-ab-testing-2}) for individual-level testing; when doing site-level long-term testing like in the [advertising A/B tests](/Ads){#ads-3}, I simply write the JS manually.
  - [Generalized tooltip popups](/static/js/popups.js) for loading introductions/summaries/previews of all links when one mouses-over a link; reads annotations, which are manually written & automatically populated from many sources (Wikipedia, Pubmed, BioRxiv, Arxiv, hand-written...), with special handling of YouTube videos (Said Achmiz, Shawn Presser; MIT).

    Note that 'links' here is interpreted broadly: almost everything can be 'popped up'. This includes links to sections (or div IDs) on the current or other pages, PDFs (often page-linked using the obscure but handy `#page=N` feature), source code files (which are syntax-highlighted by Pandoc), locally-mirrored web pages, footnotes/sidenotes, any such links within the popups themselves recursively...

    - the floating footnotes are handled by the generalized tooltip popups (they were originally implemented via [`footnotes.js`](http://ignorethecode.net/blog/2010/04/20/footnotes/)); when the browser window is wide enough, the floating footnotes are instead replaced with marginal notes/_sidenotes_[^sidenotes-history] using a custom library, [`sidenotes.js`](/static/js/sidenotes.js) (Said Achmiz, MIT)

      ![Demonstration of sidenotes on [_Radiance_](/docs/radiance/2002-scholz-radiance).](/images/2002-radiance/sidenotes.png){.invertible}

  - image size: full-scale images (figures) can be clicked on to zoom into them with slideshow mode---useful for figures or graphs which do not comfortably fit into the narrow body---using another custom library, [`image-focus.js`](/static/js/image-focus.js) (Said Achmiz; GPL)

- error checking: problems such as broken links are checked in 3 phases:

  - [`markdown-lint.sh`](/About#markdown-checker): writing time
  - [`sync-gwern.net.sh`](/static/build/sync-gwern.net.sh): during compilation, sanity-checks file size & count; greps for broken interwikis; runs HTML tidy over pages to warn about invalid HTML; tests liveness & MIME types of various pages post-upload; checks for duplicates, read-only, banned filetypes, too large or uncompressed images, etc.
  - [Link rot tools](/Archiving-URLs){#archiving-2}: [`linkchecker`](https://github.com/linkchecker/linkchecker), [ArchiveBox](https://github.com/pirate/ArchiveBox/), and [archiver-bot](https://hackage.haskell.org/package/archiver)

[^sidenotes-history]:
    Sidenotes have long been used as a typographic solution to densely-annotated texts such as the [Geneva Bible](!W 'Geneva Bible#Format') ([first 2 pages](https://github.com/raphink/geneve_1564/releases/download/2015-07-08_01/geneve_1564.pdf)), but have not shown up much online yet.

    ![[Pierre Bayle's](!W "Pierre Bayle") [_Historical and Critical Dictionary_](!W), demonstrating recursive footnotes/sidenotes (1737, volume 4, pg901; source: Google Books)](/images/design/sidenotes/1737-bayle-dictionary-vol4-pg901.jpg "Screenshot of Google Books https://books.google.com/books?id=JmtXAAAAYAAJ&pg=PA900 , showing advanced typography in a single page which contains body text, footnotes, and (recursively) sidenotes to footnotes, of Pierre Bayle's famous Enlightenment text, the 'Historical and Critical Dictionary' (pg900 of volume 4 of the 1737 English edition).")

    An early & inspiring use of margin/side notes.

### Implementation Details

There are a number of little tricks or details that web designers might find interesting.

Efficiency:
