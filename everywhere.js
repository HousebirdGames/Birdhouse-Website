import * as main from "./Birdhouse/src/main.js";
import { displayError, clearError } from "./Birdhouse/src/modules/input-validation.js";
import { markdown } from "./Birdhouse/src/modules/markdown.js";
import config from "./config.js";

import { dynamicRoutes } from './src/dynamic-routes.js';

window.hook('before-adding-base-content', async function (menuHTML) {
    const headerElement = document.getElementById("header");
    if (!headerElement) {
        return;
    }

    headerElement.innerHTML = `<img src="img/logos-originals/Birdhouse-Logo-248x248.svg" class="logo ${main.standalone ? 'invisible' : ''}" alt="Logo of the Birdhouse Framework"/>
                                <div class="buttonWrap hideOnSmall">
                                <button class="openSearch square"><span class="material-icons">search</span></button>
                                ${menuHTML}
                                <a href="readme.md" class="menuButton"><span class="material-icons spaceRight">subject</span><span class="linkText">Docs</span></a>
                                <a href="changelog" class="menuButton"><span class="material-icons spaceRight">sync_alt</span><span class="linkText">Log</span></a>
                                <button class="toggleDarkMode square"><span class="material-icons">light_mode</span></button>
                                </div>
                                <div class="buttonWrap hideOnLarge">
                                <button class="toggleDarkMode"><span class="material-icons">light_mode</span></button>
                                <button class="openSearch square"><span class="material-icons">search</span></button>
                                <button id="menuButton"><span class="material-icons">menu</span></button>
                                </div>
                            `;
});

window.hook('on-handle-route-change', async function () {
    main.updateTitleAndMeta('Loading...', config.pageDescription);
});

window.hook('on-component-loaded', async function () {
});

window.hook('on-content-loaded', async function () {
    main.action(showScrollTopButton);

    main.action({
        type: 'scroll',
        handler: showScrollTopButton,
        debounce: 100
    });

    main.action({
        type: main.defaultClickEvent,
        handler: (e) => {
            scrollTo(0, 0);
            e.target.blur();
        },
        selector: '#scrollToTopButton'
    });

    let scrollTopButton = null
    function showScrollTopButton() {
        if (!scrollTopButton) {
            scrollTopButton = document.getElementById('scrollToTopButton');
        }
        if (window.scrollY > 200) {
            scrollTopButton.classList.remove('invisible');
        } else {
            scrollTopButton.classList.add('invisible');
        }
    }

    main.action({
        type: 'scroll',
        handler: () => {
            adjustButtonPosition();
        },
        debounce: 100
    });

    main.action({
        type: 'resize',
        handler: () => {
            adjustButtonPosition();
        },
        debounce: 10
    });

    main.action(adjustButtonPosition);

    const footer = document.getElementById("footer");

    function adjustButtonPosition() {
        const footerRect = footer.getBoundingClientRect();
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        const footerVisibleHeight = viewHeight - footerRect.top;
        if (footerVisibleHeight > 0) {
            scrollTopButton.style.bottom = `${16 + footerVisibleHeight}px`;
        } else {
            scrollTopButton.style.bottom = '1rem';
        }
    }

    main.action({
        type: main.defaultClickEvent,
        handler: (e) => {
            main.popupManager.openPopup('searchPopup');
            requestAnimationFrame(() => {
                document.getElementById('searchInput').focus();
            });
        },
        selector: '.openSearch'
    });

    main.action({
        type: 'input',
        handler: (e) => {
            startSearch();
        },
        selector: '.searchInput',
        debounce: 100
    });

    main.action(() => {
        const searchInput = document.getElementById('searchInput');
        const searchTerm = main.getQueryParameterByName('search');

        searchInput.value = searchTerm;
        startSearch();

        if (searchTerm) {
            setTimeout(() => {
                highlightAndScrollToSearchTerm(searchTerm);
            }, 1000);
        }
    });
});

function highlightAndScrollToSearchTerm(searchTerm) {
    const pageColumnEntry = document.querySelector('.pageColumn.entry');
    if (!pageColumnEntry || !searchTerm) return;


    function highlightText(node) {
        let firstHighlight = null;

        if (node.nodeType === 3) {
            const nodeDataLower = node.data.toLowerCase();
            let startIndex = 0;
            let matchIndex = nodeDataLower.indexOf(searchTerm.toLowerCase(), startIndex);

            while (matchIndex !== -1) {
                const matchEnd = matchIndex + searchTerm.length;
                const beforeMatch = node.splitText(matchIndex);
                const matchText = beforeMatch.splitText(searchTerm.length);

                const highlightSpan = document.createElement('span');
                highlightSpan.classList.add('search-highlight');
                highlightSpan.textContent = beforeMatch.data;
                beforeMatch.parentNode.replaceChild(highlightSpan, beforeMatch);

                node = matchText;
                startIndex = 0;
                matchIndex = node.data.toLowerCase().indexOf(searchTerm.toLowerCase(), startIndex);

                if (!firstHighlight) {
                    firstHighlight = highlightSpan;
                }
            }
        } else if (node.nodeType === 1 && node.childNodes && !/^(script|style)$/i.test(node.tagName)) {
            Array.from(node.childNodes).forEach(childNode => {
                const result = highlightText(childNode);
                if (result && !firstHighlight) {
                    firstHighlight = result;
                }
            });
        }

        return firstHighlight;
    }

    const firstHighlight = highlightText(pageColumnEntry);

    if (firstHighlight) {
        firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

let controller = null;
async function searchMarkdownFiles(searchTerm, resultsContainer = null, promiseAll = false) {
    if (controller) {
        controller.abort();
    }

    controller = new AbortController();
    const signal = controller.signal;

    const searchTermLower = searchTerm.toLowerCase();
    const matchingRoutes = [];

    const routesToSearch = dynamicRoutes.length;
    let currentRouteIndex = 0;

    const currentVersion = config.version;

    const fetchAndProcessRoute = async (route) => {
        currentRouteIndex++;
        try {
            const path = route.markdownPath + "?v=" + currentVersion;
            let content = '';
            if (sessionStorage.getItem(path)) {
                content = sessionStorage.getItem(path);
            }
            else {
                if (resultsContainer) {
                    resultsContainer.innerHTML = `<p>Looking for results... ${main.roundToFull((currentRouteIndex / routesToSearch) * 100)}%</p>`;
                }
                const response = await fetch(path, { signal });
                const responseText = await response.text();
                const htmlContent = await markdown(responseText);
                content = htmlContent.replace(/<span class="material-icons">[^<]*<\/span>/g, '').replace(/<[^>]*>/g, '');
                sessionStorage.setItem(path, content);
            }

            const index = content.toLowerCase().indexOf(searchTermLower);

            if (index !== -1) {
                const start = Math.max(0, index - 10);
                const end = Math.min(content.length, index + searchTerm.length + 200);

                let snippet = content.substring(start, end).replace(new RegExp(searchTerm, 'gi'), match => `<mark>${match}</mark>`);

                if (start > 0) snippet = '...' + snippet;
                if (end < content.length) snippet += '...';

                const hits = (content.match(new RegExp(searchTerm, 'gi')) || []).length;

                matchingRoutes.push({
                    ...route,
                    snippet,
                    hits
                });
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Search aborted');
                return;
            }

            console.error(`Error fetching markdown file ${route.markdownPath}:`, error);

            if (resultsContainer) {
                resultsContainer.innerHTML = `<p>Error fetching markdown file: ${route.markdownPath}.</p>`;
            }
        }
    };

    let keysToRemove = [];

    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (!key.includes(`?v=${currentVersion}`)) {
            keysToRemove.push(key);
        }
    }

    for (let key of keysToRemove) {
        sessionStorage.removeItem(key);
    }

    if (promiseAll) {
        await Promise.all(dynamicRoutes.map(fetchAndProcessRoute));
    } else {
        for (const route of dynamicRoutes) {
            await fetchAndProcessRoute(route);
        }
    }

    controller = null;

    return matchingRoutes;
}

async function startSearch() {
    const searchTerm = document.getElementById('searchInput').value;
    const resultsContainer = document.getElementById('searchResults');
    if (!searchTerm) {
        resultsContainer.innerHTML = '';
        return;
    }

    const results = await searchMarkdownFiles(searchTerm, resultsContainer);
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No matching results found.</p>';
        return;
    }

    results.sort((a, b) => {
        if (b.hits !== a.hits) {
            return b.hits - a.hits;
        }
        return a.filename.localeCompare(b.filename);
    });

    results.forEach(route => {
        const link = route.originalPath.replace('Birdhouse/', '').toLocaleLowerCase() + '?search=' + searchTerm;
        const searchResult = `
        <div class="searchResult">
        <a href="${link}" class="closePopup"><h3>${route.filename}</h3></a>
        <p class="filePath"><span class="material-icons spaceRight">description</span>${route.originalPath}</p>
            <p class="justify">${route.snippet}</p>
            <div class="linkRow">
            <p class="hits">${route.hits} ${route.hits == 1 ? 'Occurence' : 'Occurences'}</p>
            <a href="${link}" class="menuButton closePopup viewSearchLink"><span class="linkText">View</span><span class="material-icons">arrow_right</span></a>
            </div>
        </div>
        `;
        resultsContainer.innerHTML += searchResult;
    });
}

window.hook('before-actions-setup', async function () {
    main.action({
        type: main.defaultClickEvent,
        handler: toggleDarkMode,
        selector: '.toggleDarkMode'
    });

    main.action({
        type: main.defaultClickEvent,
        handler: (e) => {
            CopyToClipboard(e.target.innerHTML, false);
            e.target.classList.remove('copied');
            setTimeout(() => {
                e.target.classList.add('copied');
            }, 0);
        },
        selector: 'pre code',
        container: '#content'
    });

    main.action({
        type: main.defaultClickEvent,
        handler: (e) => {
            const dataValue = e.target.dataset.copy;
            CopyToClipboard(dataValue, false);
            e.target.classList.remove('copied');
            setTimeout(() => {
                e.target.classList.add('copied');
            }, 0);
        },
        selector: '.copyData',
        container: '#content'
    });

    main.action({
        type: main.defaultClickEvent,
        handler: (e) => {
            setTimeout(() => {
                CopyToClipboard(window.location.href, true)
                hashChange();
            }, 100);
        },
        selector: '.copyLink',
        container: '#content'
    });

    main.action(hashChange);

    main.action({
        type: 'scroll',
        handler: hashChange,
        debounce: 100
    });

    main.action({
        type: main.defaultClickEvent,
        selector: '.closeApp',
        handler: () => {
            window.close();
        },
        debounce: 100
    });

    function hashChange() {
        const oldActive = document.querySelector('.activeAnchor');
        if (oldActive) {
            oldActive.classList.remove('activeAnchor');
        }

        // Add the class to the current active anchor target
        const hash = window.location.hash.substring(1); // Get the hash and remove the '#'
        const target = document.getElementById(hash);
        if (target) {
            target.classList.add('activeAnchor');
        }
    }
});

async function toggleDarkMode(event) {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        main.removeCSS('themes/darkmode.css');
        localStorage.setItem('darkMode', 'false');
    } else {
        main.removeCSS('themes/darkmode.css');
        await main.loadCSS('themes/darkmode.css');
        localStorage.setItem('darkMode', 'true');
    }
}

window.hook('on-actions-setup', async function () {
});

window.hook('get-popup-menu-html', async function (menuHTML) {
    return `
    <div id="menu" class="popup">
		<div class="menuList fade-left-menu">
            <div class="pageRow centered">
            <img src="img/logos-originals/Birdhouse-Logo-248x248.svg" class="logo" alt="Logo of the Birdhouse Framework"/>
            <h1>Birdhouse</h1>
            </div>
            <br>
            ${menuHTML}
            <a href="readme.md" class="menuButton closePopup"><span class="material-icons spaceRight">subject</span><span class="linkText">Documentation</span></a>
            <a href="changelog" class="menuButton closePopup"><span class="material-icons spaceRight">sync_alt</span><span class="linkText">Changelog</span></a>
            <br>
			<button class="closePopup menu menuButton"><span class="material-icons md-light spaceRight">close</span><span class="linkText">Close</span></button>
			${main.standalone ? `<button class="closeApp menu menuButton"><span class="material-icons spaceRight">close</span><span class="linkText">Exit App</span></button>` : ''}
		</div>
	</div>
    `;
});

window.hook('page-loaded', async function () {
    await onPageLoaded();
});

async function onPageLoaded() {
    main.addBaseContent(`
        <button id="scrollToTopButton" class="invisible"><span class="material-icons">keyboard_double_arrow_up</span></button>
        
        <div id="searchPopup" class="popup">
		<div class="popup-content big">
            <h1>Search</h1>
            <label><input type="text" id="searchInput" class="searchInput" placeholder="Search..." /></label>
            <div id="searchResults">
		    </div>
            <button class="closePopup spaceRight"><i class="material-icons">close</i>Close</button>
            <button class="closePopup closePopupIcon"><i class="material-icons">close</i></button>
		</div>
	    </div>
    `);

    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        await main.loadCSS('themes/darkmode.css');
    }

    searchMarkdownFiles('', null, true);
}

window.hook('user-logged-in', async function () {
});

window.hook('add-markdown-patterns', async function (html) {
});

window.hook('create-routes', async function () {
    await main.createRoute({
        type: 'public',
        slug: '/',
        name: 'Home',
        materialIcon: 'home',
        componentPath: 'components/home'
    });

    await main.createRoute({
        type: 'public',
        slug: '/get-started',
        name: 'Get started',
        materialIcon: 'done_all',
        componentPath: 'components/get-started',
        inMenu: true
    });

    await main.createRoute({
        type: 'public',
        slug: '/index.html',
        name: 'Home',
        materialIcon: 'list',
        componentPath: 'components/home',
        inMenu: false
    });

    await main.createRoute({
        type: 'public',
        slug: '/privacy-policy',
        name: 'Privacy Policy',
        componentPath: 'components/privacy-policy',
        inMenu: false
    });
});

window.hook('get-cookies-list', async function () {
    let cookies = [
        'storageAcknowledgement',
        'lastUpdateNote',
        'PHPSESSID'
    ];

    return cookies;
});

window.hook('get-allowed-paths-during-maintenance', async function () {
    let allowedPathsDuringMaintenance = [
        'login',
        'login-password',
        'logout',
        'contact',
        'privacy-policy',
        'terms-of-service'
    ];

    return allowedPathsDuringMaintenance;
});

window.hook('get-spa-excluded-links', async function () {
    let excludedRoutes = [
        'database/logout.php',
    ];

    return excludedRoutes;
});

window.hook('get-storage-acknowledgement-popup-content', async function () {
    const content = `
            <h1>Welcome!</h1>
			<p>By clicking "I Understand and Agree", you allow this site to store cookies on your device and use the browsers local storage. These following cookies and local storage entries are used to enable improve your experience:</p>
            <ul>
            <li>A cookie ensures that you won't see this message pop up on your subsequent visits or page reloads.</li>
            <li>Another cookie remembers which version of the website you last confirmed on the Update Notes, saving you from repeated update popups on every page load.</li>
            <li>Login will require a cookie and if you are logged in, additional cookies and local storage entries are used to provide further functionality.</li>
            </ul>
            <p>These cookies and the use of local storage entries are necessary for the smooth functioning of our site. If you choose to close this popup without clicking "I Understand and Agree", nothing will be stored. If you deny the permission, session storage will be used to hide this popup. Thank you for your understanding!</p>
        `;

    return content;
});

window.hook('generate-menu-html', async function (menuItems) {
    return menuItems
        .map(item => {
            let classes = 'menuButton closePopup';
            let extraHTML = '';
            if (item.materialIcon != '') {
                let additionClass = item.hasName ? "spaceRight" : "";
                extraHTML = `<span class="material-icons ${additionClass}">${item.materialIcon}</span>`;
            }
            return `<a href="${item.path}" class="${classes} text-${item.displayFull}">${extraHTML}<span class="linkText">${item.name}</span></a>`;
        })
        .join('');
});

window.hook('fetch-user-data', async function () {
    const userData = {
        'loggedIn': false,
        'userId': '',
        'username': '',
        'isAdmin': false,
        'isUser': false,
    };

    return new Response(JSON.stringify(userData), {
        headers: { 'Content-Type': 'application/json' },
    });
});

window.hook('check-remember-me', async function () {
    return false;
});

window.hook('get-maintenance-mode', async function () {
    return false;
});

window.hook('add-dynamic-routes', async function (path) {
    for (let route of dynamicRoutes) {
        if (route.originalPath.replace('Birdhouse/', '').toLocaleLowerCase() === path) {
            main.createPublicRoute(route.originalPath.replace('Birdhouse/', '/'), route.filename, '', 'components/entry', false, route);
            return true;
        }
    }
    console.log('No dynamic route found for:', path);
    return false;
});

window.hook('database-get-setting', async function (name, cacheSetting) {
    if (name === 'info_text') {
        return new Response(JSON.stringify({ value: '' }), {
            headers: { 'Content-Type': 'application/json' },
        });
        return new Response(JSON.stringify({ value: 'This website and the documentation are work in progess' }), {
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return new Response(JSON.stringify({ value: 'exampleSetting' }), {
        headers: { 'Content-Type': 'application/json' },
    });
});

window.hook('database-set-setting', async function (name, value) {
    return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
    });
});

window.hook('send-analytics', async function (value) {
});

window.hook('validate-field', async function (input, value, errorElement, serverSide) {
});

window.hook('get-loading-content', async function () {
    return `
    <div class="loadingSymbolWrap">
        <div class="loadingSymbol"></div>
    </div>
    `;
});