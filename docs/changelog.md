<h2 id="month-2025-04">[button href=^#month-2025-04^ class=^copyLink^]2025-04<span class="material-icons spaceLeft">link</span>[/button]</h2>
<ul class="changelogList">
  <li>Link click handler now respects app scope <a href="https://github.com/HousebirdGames/Birdhouse/commit/4ff015e" class="commit">(Commit 4ff015e)</a></li>
</ul>
<h2 id="month-2025-03">[button href=^#month-2025-03^ class=^copyLink^]2025-03<span class="material-icons spaceLeft">link</span>[/button]</h2>
<ul class="changelogList">
  <li>Switched service worker to serve index.html from a relative path to enable support for multiple Birdhouse PWAs on one domain <a href="https://github.com/HousebirdGames/Birdhouse/commit/7b9741e" class="commit">(Commit 7b9741e)</a></li>
</ul>
<h2 id="month-2024-10">[button href=^#month-2024-10^ class=^copyLink^]2024-10<span class="material-icons spaceLeft">link</span>[/button]</h2>
<ul class="changelogList">
  <li>Service Worker claims clients before fetching now; Improved Service Worker exluded path handling <a href="https://github.com/HousebirdGames/Birdhouse/commit/5222d58" class="commit">(Commit 5222d58)</a></li>
  <li>Update notification now uses flex when opening instead of block <a href="https://github.com/HousebirdGames/Birdhouse/commit/d8afc51" class="commit">(Commit d8afc51)</a></li>
  <li>Scope is now controlling the service worker path <a href="https://github.com/HousebirdGames/Birdhouse/commit/11eeb14" class="commit">(Commit 11eeb14)</a></li>
  <li>Added option to set service worker scope through new 'scope' config property <a href="https://github.com/HousebirdGames/Birdhouse/commit/aa34cda" class="commit">(Commit aa34cda)</a></li>
  <li>Corrected import in popup manager <a href="https://github.com/HousebirdGames/Birdhouse/commit/ed9dabc" class="commit">(Commit ed9dabc)</a></li>
  <li>Added 'useFlexPopups' config option; Updated service worker registration for improved compatibility with multiple PWAs on a single domain <a href="https://github.com/HousebirdGames/Birdhouse/commit/196e8d1" class="commit">(Commit 196e8d1)</a></li>
</ul>
<h2 id="month-2024-08">[button href=^#month-2024-08^ class=^copyLink^]2024-08<span class="material-icons spaceLeft">link</span>[/button]</h2>
<ul class="changelogList">
  <li>Refactored asyncLoad to use task queue; Improved async component loading management <a href="https://github.com/HousebirdGames/Birdhouse/commit/39489d8" class="commit">(Commit 39489d8)</a></li>
  <li>Implemented async component loading with the new asyncLoad function; Added get-component-loading-content hook for customizable asyncLoad placeholders; Updated example everywhere.js with new hook; Added a helper function that can generate unique IDs <a href="https://github.com/HousebirdGames/Birdhouse/commit/188dbd8" class="commit">(Commit 188dbd8)</a></li>
  <li>Improved hooks to accept multiple callbacks per hook; Added functions to clear and remove hooks; Implemented "opened-popup" hook in popupManager, triggered when a popup was opened; Updated example in everywhere.js to include the new "opened-popup" hook; Fixed bug where links did not work correctly in popups <a href="https://github.com/HousebirdGames/Birdhouse/commit/0bc02b1" class="commit">(Commit 0bc02b1)</a></li>
  <li>Implemented optional back navigation for popup closure; Added 'backNavigationClosesPopups' config option (default: true) <a href="https://github.com/HousebirdGames/Birdhouse/commit/7f80ab8" class="commit">(Commit 7f80ab8)</a></li>
  <li>Infinite scroll enhancement: Configurable scroll container (default: window) and improved debounce behavior <a href="https://github.com/HousebirdGames/Birdhouse/commit/7dabf73" class="commit">(Commit 7dabf73)</a></li>
</ul>
<h2 id="month-2024-07">[button href=^#month-2024-07^ class=^copyLink^]2024-07<span class="material-icons spaceLeft">link</span>[/button]</h2>
<ul class="changelogList">
  <li>Updated infinite scroll offline message; Update LICENSE.txt to include "(c)" <a href="https://github.com/HousebirdGames/Birdhouse/commit/2652632" class="commit">(Commit 2652632)</a></li>
  <li>Improved action unmounting <a href="https://github.com/HousebirdGames/Birdhouse/commit/c16a4f7" class="commit">(Commit c16a4f7)</a></li>
  <li>Added support for multiple menu buttons; Added support for multiple install buttons; Default menu HTML anchor elements now have their 'name' set as the 'title' attribute; Added title attribute to example close menu button <a href="https://github.com/HousebirdGames/Birdhouse/commit/4166247" class="commit">(Commit 4166247)</a></li>
</ul>
<h2 id="month-2024-06">[button href=^#month-2024-06^ class=^copyLink^]2024-06<span class="material-icons spaceLeft">link</span>[/button]</h2>
<ul class="changelogList">
  <li>Middle mouse button is now excluded from triggering route navigation <a href="https://github.com/HousebirdGames/Birdhouse/commit/a9acb59" class="commit">(Commit a9acb59)</a></li>
  <li>Added the new createRoute function that simplifies route creation <a href="https://github.com/HousebirdGames/Birdhouse/commit/db17d75" class="commit">(Commit db17d75)</a></li>
  <li>Actions that are added without a specified type (i.e. 'click') will now default to the defaultClickEvent <a href="https://github.com/HousebirdGames/Birdhouse/commit/18e797d" class="commit">(Commit 18e797d)</a></li>
  <li>Updated serve.js watcher to exclude 'node_modules'; Enhanced triggering of action system warnings <a href="https://github.com/HousebirdGames/Birdhouse/commit/7583948" class="commit">(Commit 7583948)</a></li>
</ul>
<h2 id="month-2024-05">[button href=^#month-2024-05^ class=^copyLink^]2024-05<span class="material-icons spaceLeft">link</span>[/button]</h2>
<ul class="changelogList">
  <li>Added examples to the documentation of the action system as well as an additional warning log <a href="https://github.com/HousebirdGames/Birdhouse/commit/12998de" class="commit">(Commit 12998de)</a></li>
  <li>Enabled alternative port detection in serve.js; Added additional logging to serve.js <a href="https://github.com/HousebirdGames/Birdhouse/commit/449a405" class="commit">(Commit 449a405)</a></li>
  <li>Updated pipeline logging <a href="https://github.com/HousebirdGames/Birdhouse/commit/fb498c0" class="commit">(Commit fb498c0)</a></li>
  <li>Disabling Scroll Recall: Configuring scrollPositionRecallLimit to zero or a negative value will now deactivate the scroll position recall feature; Updated docs comment for the scroll function in main.js <a href="https://github.com/HousebirdGames/Birdhouse/commit/015eb32" class="commit">(Commit 015eb32)</a></li>
  <li>Added scrollPositionRecallLimit property to the config <a href="https://github.com/HousebirdGames/Birdhouse/commit/8599061" class="commit">(Commit 8599061)</a></li>
  <li>Added scroll position restoration to the scroll function <a href="https://github.com/HousebirdGames/Birdhouse/commit/7ba85c0" class="commit">(Commit 7ba85c0)</a></li>
  <li>Link clicks are now correctly prevented when useMouseDown is enabled <a href="https://github.com/HousebirdGames/Birdhouse/commit/bb567e4" class="commit">(Commit bb567e4)</a></li>
  <li>Added defaultClickEvent as new exported variable to main.js; Added useMouseDown property to the config that allows to set the default click event to "mousedown" which is used for certain acitons/listeners like link clicks <a href="https://github.com/HousebirdGames/Birdhouse/commit/3e3abac" class="commit">(Commit 3e3abac)</a></li>
  <li>Textarea resizing is now correctly setup when routes are changed <a href="https://github.com/HousebirdGames/Birdhouse/commit/0b1e928" class="commit">(Commit 0b1e928)</a></li>
  <li>Updated package.json and comments <a href="https://github.com/HousebirdGames/Birdhouse/commit/595ecb5" class="commit">(Commit 595ecb5)</a></li>
  <li>Updated comments; Updated Birdhouse version <a href="https://github.com/HousebirdGames/Birdhouse/commit/4afbea8" class="commit">(Commit 4afbea8)</a></li>
  <li>Serve now correctly restarts the local server; The packaging process and pipeline now create a config.json; Added trustedImageDomains to the config that will determine the allowed image sources for electron <a href="https://github.com/HousebirdGames/Birdhouse/commit/0a8959a" class="commit">(Commit 0a8959a)</a></li>
  <li>Updated comments <a href="https://github.com/HousebirdGames/Birdhouse/commit/0615c71" class="commit">(Commit 0615c71)</a></li>
  <li>Implemented experimental Electron packaging for windows;  Added the option to generate a .icon file with the pipeline; Added exported variable to check if the app is running standalone (in Electron); Improved automated title update timing; on-handle-route-change now is placed even before removement of old component css and action; Added .ico to the example root folder;  Implemented automated port search for the server, allowing for multiple Birdhouse applications running on the same system; Updated Readme; Updated .gitignore <a href="https://github.com/HousebirdGames/Birdhouse/commit/3a2332e" class="commit">(Commit 3a2332e)</a></li>
  <li>Removed bin from package-lock.json <a href="https://github.com/HousebirdGames/Birdhouse/commit/55856f5" class="commit">(Commit 55856f5)</a></li>
  <li>Added the option to run serve.js and server.js with a custom port; Improved warnings and error handling for server.js; Updated README.md with instructions for serving the app locally with a specified port; The new default port for server.js is 4200; Pipeline now supports post release scripts for local builds <a href="https://github.com/HousebirdGames/Birdhouse/commit/b3fb679" class="commit">(Commit b3fb679)</a></li>
  <li>Added the option to deploy/build the app through the pipeline while having serve.js active <a href="https://github.com/HousebirdGames/Birdhouse/commit/e8a4fea" class="commit">(Commit e8a4fea)</a></li>
  <li>Added options for the release of silent and forced updates to the pipeline and service worker registration; Added experimental local development server and automated build process; Updated readme with the new flags and a section about the local development server <a href="https://github.com/HousebirdGames/Birdhouse/commit/ac0d7de" class="commit">(Commit ac0d7de)</a></li>
</ul>
<h2 id="month-2024-04">[button href=^#month-2024-04^ class=^copyLink^]2024-04<span class="material-icons spaceLeft">link</span>[/button]</h2>
<ul class="changelogList">
  <li>Added the addScript function to main.js that can be used to dynamically add a JavaScript file to the document's body <a href="https://github.com/HousebirdGames/Birdhouse/commit/219b04e" class="commit">(Commit 219b04e)</a></li>
  <li>Added option to not overwrite the content when loading a component <a href="https://github.com/HousebirdGames/Birdhouse/commit/41327c8" class="commit">(Commit 41327c8)</a></li>
  <li>All hidden files/folders (starting with .) are now excluded by default from builds/releases; Improved pipeline statistics generation <a href="https://github.com/HousebirdGames/Birdhouse/commit/c61a8ce" class="commit">(Commit c61a8ce)</a></li>
  <li>Updated wording to be more clear about the -local flag <a href="https://github.com/HousebirdGames/Birdhouse/commit/2085a49" class="commit">(Commit 2085a49)</a></li>
  <li>Added -local flag to pipeline that will build the project to the local dist directory instead of directly uploading it; Added distPath setting to the pipeline config; Added dist folder to the Birdhouse .gitignore; Improved cached size calculation to include the size of not-minified files; Polishing of the pipeline, including better error handling and logging; Updated Readme to include the new -local flag <a href="https://github.com/HousebirdGames/Birdhouse/commit/4111961" class="commit">(Commit 4111961)</a></li>
  <li>Improved install button handling <a href="https://github.com/HousebirdGames/Birdhouse/commit/0cca829" class="commit">(Commit 0cca829)</a></li>
  <li>Corrected example hook <a href="https://github.com/HousebirdGames/Birdhouse/commit/f89e55d" class="commit">(Commit f89e55d)</a></li>
  <li>Updated top comment of pipeline.js <a href="https://github.com/HousebirdGames/Birdhouse/commit/02c98c4" class="commit">(Commit 02c98c4)</a></li>
  <li>Updated example everywhere.js to use the updated route creation syntax <a href="https://github.com/HousebirdGames/Birdhouse/commit/8369142" class="commit">(Commit 8369142)</a></li>
  <li>Removed markdown elements from documentation that are no longer needed <a href="https://github.com/HousebirdGames/Birdhouse/commit/3ffd717" class="commit">(Commit 3ffd717)</a></li>
  <li>Added hooks documentation; More hooks are now fully optional (get-loading-content, add-dynamic-routes, add-markdown-patterns); Added fetchData utility function to main.js <a href="https://github.com/HousebirdGames/Birdhouse/commit/3c4b189" class="commit">(Commit 3c4b189)</a></li>
  <li>Added default parameter for resizeAllTextareas to documentation comment <a href="https://github.com/HousebirdGames/Birdhouse/commit/b44755f" class="commit">(Commit b44755f)</a></li>
  <li>Added overwrite-not-authorized-user-page-content hook as well as the overwrite-not-authorized-user-page-content hook; Further improved textarea resizing performance for large amounts of textareas and added a batchSize parameter to resizeAllTextareas <a href="https://github.com/HousebirdGames/Birdhouse/commit/1d8abaa" class="commit">(Commit 1d8abaa)</a></li>
  <li>Image comparison sliders that are added via Birdhouse markdown now also use the upload folder by default <a href="https://github.com/HousebirdGames/Birdhouse/commit/9f5bcbb" class="commit">(Commit 9f5bcbb)</a></li>
  <li>Updated pipeline to include database directory in the uploads (still excluded from the cache) <a href="https://github.com/HousebirdGames/Birdhouse/commit/172357e" class="commit">(Commit 172357e)</a></li>
  <li>Admin and user routes now correctly display the default warning instead of rejecting the promise; Input validation now correctly uses console.warn instead of console.warning; Excluded paths now utilize the urlPrefix; Improved the textarea height calculations and added a new function that calculates the height of the textarea based on the content; PWA install buttons are now avoiding previous race conditions <a href="https://github.com/HousebirdGames/Birdhouse/commit/ab26e2a" class="commit">(Commit ab26e2a)</a></li>
  <li>Changed docs comment <a href="https://github.com/HousebirdGames/Birdhouse/commit/3fe8fa7" class="commit">(Commit 3fe8fa7)</a></li>
  <li>Improved performance by only resizing textareas in the popups themselve, when opening them <a href="https://github.com/HousebirdGames/Birdhouse/commit/c627b60" class="commit">(Commit c627b60)</a></li>
  <li>Improved textarea resizing performance <a href="https://github.com/HousebirdGames/Birdhouse/commit/ad735ae" class="commit">(Commit ad735ae)</a></li>
  <li>Textarea resizing is now called correctly <a href="https://github.com/HousebirdGames/Birdhouse/commit/53ab6f5" class="commit">(Commit 53ab6f5)</a></li>
  <li>Install button is now avoiding a race condition and does no longer prevent the default install prompt; Improved initial textarea resizing; Added a new function to resize a single textarea; Added the resizeTextareaNodes function to efficiently resize selected textarea nodes; Textareas added in infinite scroll will now automatically be resized <a href="https://github.com/HousebirdGames/Birdhouse/commit/7af77a1" class="commit">(Commit 7af77a1)</a></li>
  <li>Input validation now also listens to click events; Input validation now works even without having an validate-field hook; Input validation no longer adds additional error elements when there are missing labels, instead an error is logged; Body scroll blocker class now only gets removed after the popup display property is set to none to help with custom fade-out-fast animations <a href="https://github.com/HousebirdGames/Birdhouse/commit/1df5243" class="commit">(Commit 1df5243)</a></li>
  <li>Added hint to the changelog to the readme; Automatic scroll now awaits one full repaint before being triggered to be more reliable with anchor links <a href="https://github.com/HousebirdGames/Birdhouse/commit/e519d46" class="commit">(Commit e519d46)</a></li>
  <li>Added a paragraph and link about the commit history <a href="https://github.com/HousebirdGames/Birdhouse/commit/22bb12b" class="commit">(Commit 22bb12b)</a></li>
  <li>Updated Documentation to include the return type of the InfiniteScroll function <a href="https://github.com/HousebirdGames/Birdhouse/commit/ebecb05" class="commit">(Commit ebecb05)</a></li>
  <li>Added parameter to infinitite scroll function to force element loading <a href="https://github.com/HousebirdGames/Birdhouse/commit/6c5aab7" class="commit">(Commit 6c5aab7)</a></li>
  <li>Removed console logging from scroll function <a href="https://github.com/HousebirdGames/Birdhouse/commit/79e79a8" class="commit">(Commit 79e79a8)</a></li>
  <li>Infinite scroll object now exposes the handleScroll method; Scroll function is now documented and exported by main.js <a href="https://github.com/HousebirdGames/Birdhouse/commit/596f85c" class="commit">(Commit 596f85c)</a></li>
  <li>Improved anchor scroll behaviour; Removed additional scroll trigger <a href="https://github.com/HousebirdGames/Birdhouse/commit/25bef90" class="commit">(Commit 25bef90)</a></li>
  <li>Base path now is correctly added to the index.html when configured <a href="https://github.com/HousebirdGames/Birdhouse/commit/2b87db5" class="commit">(Commit 2b87db5)</a></li>
  <li>User scrolls now abort automatic scroll <a href="https://github.com/HousebirdGames/Birdhouse/commit/6300569" class="commit">(Commit 6300569)</a></li>
  <li>Updated readme to include new pre- and post-release script functionality and clarify sftp configuration and added a guidelines section and a license section; Configs are now also sorted to be uploaded last in the pipeline; Added guidelines and license <a href="https://github.com/HousebirdGames/Birdhouse/commit/e90f38b" class="commit">(Commit e90f38b)</a></li>
  <li>Removed logging;; Added documentation links to readme <a href="https://github.com/HousebirdGames/Birdhouse/commit/629824c" class="commit">(Commit 629824c)</a></li>
  <li>Added documentation <a href="https://github.com/HousebirdGames/Birdhouse/commit/f5a7155" class="commit">(Commit f5a7155)</a></li>
  <li>Added pre and post release scripts as an config option to the pipeline <a href="https://github.com/HousebirdGames/Birdhouse/commit/5df881d" class="commit">(Commit 5df881d)</a></li>
  <li>Added hooks to overwrite several default content parts; Hooks now return null as default instead of the args given <a href="https://github.com/HousebirdGames/Birdhouse/commit/d7e5d14" class="commit">(Commit d7e5d14)</a></li>
</ul>
<h2 id="month-2024-03">[button href=^#month-2024-03^ class=^copyLink^]2024-03<span class="material-icons spaceLeft">link</span>[/button]</h2>
<ul class="changelogList">
  <li>Added scroll lock; Added documentation <a href="https://github.com/HousebirdGames/Birdhouse/commit/8ff4339" class="commit">(Commit 8ff4339)</a></li>
  <li>Added documentation; Improved anchor scroll behaviour after page load <a href="https://github.com/HousebirdGames/Birdhouse/commit/511db4e" class="commit">(Commit 511db4e)</a></li>
  <li>Updated documentation; readded the add-markdown-patterns hook <a href="https://github.com/HousebirdGames/Birdhouse/commit/f211d39" class="commit">(Commit f211d39)</a></li>
  <li>Added documentation <a href="https://github.com/HousebirdGames/Birdhouse/commit/9da1dab" class="commit">(Commit 9da1dab)</a></li>
  <li>Added documentation <a href="https://github.com/HousebirdGames/Birdhouse/commit/d98a5d9" class="commit">(Commit d98a5d9)</a></li>
  <li>Clicking on pure anchor links will now correctly trigger the scroll; Removed old logging; Added Birdhouse SVG Logo <a href="https://github.com/HousebirdGames/Birdhouse/commit/8e35afc" class="commit">(Commit 8e35afc)</a></li>
  <li>Added function to remove certain css links; Added doumentation comments <a href="https://github.com/HousebirdGames/Birdhouse/commit/ce1c9fc" class="commit">(Commit ce1c9fc)</a></li>
  <li>Added redirect404ToRoot option to the config <a href="https://github.com/HousebirdGames/Birdhouse/commit/c0c6d55" class="commit">(Commit c0c6d55)</a></li>
  <li>Added some documentation comment; Markdown elements now support classes and ids; Refactored route creation; Implemented component css functionality; Improved loadCSS function; Pipeline now handles the base path in the index.html (added corresponding option to pipeline config); Components no longer need their file extension for route creation <a href="https://github.com/HousebirdGames/Birdhouse/commit/11d749f" class="commit">(Commit 11d749f)</a></li>
  <li>Added the option to add action delegate event listeners to specific containers/elements instead of the whole document; Updated the example component <a href="https://github.com/HousebirdGames/Birdhouse/commit/1a34f99" class="commit">(Commit 1a34f99)</a></li>
  <li>Removed scroll console log <a href="https://github.com/HousebirdGames/Birdhouse/commit/1059908" class="commit">(Commit 1059908)</a></li>
  <li>Update note buttons are now initialized after the on-actions-setup; Improved textarea resizing behaviour for large textareas <a href="https://github.com/HousebirdGames/Birdhouse/commit/0e36d8e" class="commit">(Commit 0e36d8e)</a></li>
  <li>Fixed markdown button wrap returning promise synchronously <a href="https://github.com/HousebirdGames/Birdhouse/commit/ae740ac" class="commit">(Commit ae740ac)</a></li>
  <li>Updated example component to new action system <a href="https://github.com/HousebirdGames/Birdhouse/commit/bf5335b" class="commit">(Commit bf5335b)</a></li>
  <li>Resolved issue where not all items where loading with the new infinite scroll behaviour <a href="https://github.com/HousebirdGames/Birdhouse/commit/6984277" class="commit">(Commit 6984277)</a></li>
  <li>Removed debug logging and added version parameter to the loadCSS function <a href="https://github.com/HousebirdGames/Birdhouse/commit/2eea4f6" class="commit">(Commit 2eea4f6)</a></li>
  <li>Resolved issue where the loading symbol would not show at the bottom of the infinite scroll <a href="https://github.com/HousebirdGames/Birdhouse/commit/46c598a" class="commit">(Commit 46c598a)</a></li>
  <li>Implemented optional caching for the infinite scroll module; Improved dynamic route handling <a href="https://github.com/HousebirdGames/Birdhouse/commit/9239b01" class="commit">(Commit 9239b01)</a></li>
  <li>Merge branch 'main' of https://github.com/HousebirdGames/Birdhouse <a href="https://github.com/HousebirdGames/Birdhouse/commit/9f1cc6f" class="commit">(Commit 9f1cc6f)</a></li>
  <li>Infinite scrolling is now correctly awaiting item additions <a href="https://github.com/HousebirdGames/Birdhouse/commit/1e52da8" class="commit">(Commit 1e52da8)</a></li>
  <li>Added submodule recommendation and command to the readme <a href="https://github.com/HousebirdGames/Birdhouse/commit/7233867" class="commit">(Commit 7233867)</a></li>
  <li>Removed console log from link listeners <a href="https://github.com/HousebirdGames/Birdhouse/commit/e9bfaec" class="commit">(Commit e9bfaec)</a></li>
  <li>Query Parameters of link elements will not longer be ignored on clicks <a href="https://github.com/HousebirdGames/Birdhouse/commit/5e2fb3f" class="commit">(Commit 5e2fb3f)</a></li>
  <li>Route changes are now correclty scrolling to the top of the page again <a href="https://github.com/HousebirdGames/Birdhouse/commit/58a4ef0" class="commit">(Commit 58a4ef0)</a></li>
  <li>Pipeline now automatically creates folders that are specified to be cached, but missing as well as the compressedFolder, if it is missing; Image compression now includes a file type check to avoid file unnecessary compression attempts <a href="https://github.com/HousebirdGames/Birdhouse/commit/b46e12e" class="commit">(Commit b46e12e)</a></li>
  <li>Added the option to trigger a route change and added the goToRoute function that allows to switch the current route <a href="https://github.com/HousebirdGames/Birdhouse/commit/4c88c0b" class="commit">(Commit 4c88c0b)</a></li>
</ul>
<h2 id="month-2024-02">[button href=^#month-2024-02^ class=^copyLink^]2024-02<span class="material-icons spaceLeft">link</span>[/button]</h2>
<ul class="changelogList">
  <li>Added before-actions-setup hook which allows a more streamlined global adding/removal of actions before the setup process <a href="https://github.com/HousebirdGames/Birdhouse/commit/7582a05" class="commit">(Commit 7582a05)</a></li>
  <li>Added the option for passive event listeners to the actions system <a href="https://github.com/HousebirdGames/Birdhouse/commit/770b81b" class="commit">(Commit 770b81b)</a></li>
  <li>Added new actions system and "on-actions-setup" hook <a href="https://github.com/HousebirdGames/Birdhouse/commit/823c820" class="commit">(Commit 823c820)</a></li>
  <li>Prevented invalid elements to be regocnized by the link listener <a href="https://github.com/HousebirdGames/Birdhouse/commit/950e998" class="commit">(Commit 950e998)</a></li>
  <li>Updated content default height <a href="https://github.com/HousebirdGames/Birdhouse/commit/a6a2633" class="commit">(Commit a6a2633)</a></li>
  <li>Improved automated footer year display <a href="https://github.com/HousebirdGames/Birdhouse/commit/ca97b0e" class="commit">(Commit ca97b0e)</a></li>
  <li>Added icons folder to defaullt pipeline config <a href="https://github.com/HousebirdGames/Birdhouse/commit/682537d" class="commit">(Commit 682537d)</a></li>
  <li>Added empty folders and updated defaultl pipeline config to improve instant deployability <a href="https://github.com/HousebirdGames/Birdhouse/commit/0fa7283" class="commit">(Commit 0fa7283)</a></li>
  <li>Added the new "-genicons"-flag to the readme <a href="https://github.com/HousebirdGames/Birdhouse/commit/0320b40" class="commit">(Commit 0320b40)</a></li>
  <li>Added options for separate generation of manifest icons to the pipeline <a href="https://github.com/HousebirdGames/Birdhouse/commit/6652559" class="commit">(Commit 6652559)</a></li>
  <li>Added sftp config parameter and error handling to pipeline and improved service worker config import <a href="https://github.com/HousebirdGames/Birdhouse/commit/08117ee" class="commit">(Commit 08117ee)</a></li>
  <li>Corrected sftp config errror logging <a href="https://github.com/HousebirdGames/Birdhouse/commit/ee79e90" class="commit">(Commit ee79e90)</a></li>
  <li>Changed readme logo from .jpg to .png <a href="https://github.com/HousebirdGames/Birdhouse/commit/62d8af6" class="commit">(Commit 62d8af6)</a></li>
  <li>Merge branch 'main' of https://github.com/HousebirdGames/Birdhouse <a href="https://github.com/HousebirdGames/Birdhouse/commit/821f715" class="commit">(Commit 821f715)</a></li>
  <li>Added logo as png + added it to the readme <a href="https://github.com/HousebirdGames/Birdhouse/commit/8db1ceb" class="commit">(Commit 8db1ceb)</a></li>
  <li>Updated to new import statement casing <a href="https://github.com/HousebirdGames/Birdhouse/commit/9923da7" class="commit">(Commit 9923da7)</a></li>
  <li>Fixed typos <a href="https://github.com/HousebirdGames/Birdhouse/commit/37f7af7" class="commit">(Commit 37f7af7)</a></li>
  <li>Added excluded paths option to config; Added compressed upload skip flag to pipeline; changed Birdhouse references to capital 'B' <a href="https://github.com/HousebirdGames/Birdhouse/commit/6bf5647" class="commit">(Commit 6bf5647)</a></li>
  <li>Updated import paths to avoid editor warnings in certain cases <a href="https://github.com/HousebirdGames/Birdhouse/commit/4fcd5f7" class="commit">(Commit 4fcd5f7)</a></li>
  <li>Corrected example index.html <a href="https://github.com/HousebirdGames/Birdhouse/commit/d03b081" class="commit">(Commit d03b081)</a></li>
  <li>Improved page load order for smoother transitions <a href="https://github.com/HousebirdGames/Birdhouse/commit/f424899" class="commit">(Commit f424899)</a></li>
  <li>Removed additional image comparison slider css load <a href="https://github.com/HousebirdGames/Birdhouse/commit/dc2f78f" class="commit">(Commit dc2f78f)</a></li>
  <li>Prevented additional css reload <a href="https://github.com/HousebirdGames/Birdhouse/commit/e63c414" class="commit">(Commit e63c414)</a></li>
  <li>Improved hook performance through callback caching <a href="https://github.com/HousebirdGames/Birdhouse/commit/573626b" class="commit">(Commit 573626b)</a></li>
  <li>Merge branch 'main' of https://github.com/HousebirdGames/Birdhouse <a href="https://github.com/HousebirdGames/Birdhouse/commit/b9c46a7" class="commit">(Commit b9c46a7)</a></li>
  <li>Improved dynamic route pathing <a href="https://github.com/HousebirdGames/Birdhouse/commit/9b1a30b" class="commit">(Commit 9b1a30b)</a></li>
  <li>Update README.md <a href="https://github.com/HousebirdGames/Birdhouse/commit/724d3db" class="commit">(Commit 724d3db)</a></li>
  <li>Removed debugging logs and code <a href="https://github.com/HousebirdGames/Birdhouse/commit/0dfa560" class="commit">(Commit 0dfa560)</a></li>
  <li>Fixed route exclusions <a href="https://github.com/HousebirdGames/Birdhouse/commit/253c355" class="commit">(Commit 253c355)</a></li>
  <li>Improved console log and corrected file path <a href="https://github.com/HousebirdGames/Birdhouse/commit/1863281" class="commit">(Commit 1863281)</a></li>
  <li>Updated comments <a href="https://github.com/HousebirdGames/Birdhouse/commit/90844cf" class="commit">(Commit 90844cf)</a></li>
  <li>Update minifiedDirectory path <a href="https://github.com/HousebirdGames/Birdhouse/commit/76c44d8" class="commit">(Commit 76c44d8)</a></li>
  <li>Improved backup flow <a href="https://github.com/HousebirdGames/Birdhouse/commit/57b0094" class="commit">(Commit 57b0094)</a></li>
  <li>Added improved error when there is nothing to backup <a href="https://github.com/HousebirdGames/Birdhouse/commit/4428e83" class="commit">(Commit 4428e83)</a></li>
  <li>Updated pipeline to work with new files names <a href="https://github.com/HousebirdGames/Birdhouse/commit/a61ee0e" class="commit">(Commit a61ee0e)</a></li>
  <li>Create FUNDING.yml <a href="https://github.com/HousebirdGames/Birdhouse/commit/0f996a8" class="commit">(Commit 0f996a8)</a></li>
  <li>Initial Commit <a href="https://github.com/HousebirdGames/Birdhouse/commit/27e03a5" class="commit">(Commit 27e03a5)</a></li>
</ul>
