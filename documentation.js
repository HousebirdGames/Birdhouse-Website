const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const ignore = require('ignore');
const marked = require('marked');

async function readGitignore(directoryPath) {
    try {
        const gitignorePath = path.join(directoryPath, '.gitignore');
        const gitignoreContent = await fs.readFile(gitignorePath, 'utf8');
        return ignore().add(gitignoreContent);
    } catch (error) {
        return ignore();
    }
}

async function listFunctionsInJSFile(content) {
    const functionRegex = /\/\*\*([\s\S]*?)\*\/\s*(export\s+(default\s+)?(async\s+)?function\s*(\w*)?\(|window\.(\w+)\s*=\s*(async\s+)?function)/g;
    let match;
    const functionsInfo = [];

    while ((match = functionRegex.exec(content)) !== null) {
        const jsDoc = match[1] || '';
        const isAsync = !!match[4] || !!match[7];
        const isDefault = !!match[3];
        const functionName = match[5] || match[6] || (isDefault ? 'default' : 'anonymous');
        const declarationType = match[5] ? "export " : "window.";

        let descriptionLines = jsDoc.split('\n').map(line => line.replace(/^\s*\* ?/, '')).filter(line => !line.startsWith('@'));
        descriptionLines = descriptionLines.map(line => line.trim() === '' ? '<br>' : line);
        let description = descriptionLines.join(' ').trim().replace(/^(<br>)+|(<br>)+$/g, '');

        const params = [];
        const paramRegex = /\* @param {([^}]+)} (\[?.+?\]?) (.+)/g;
        let paramMatch;
        while ((paramMatch = paramRegex.exec(jsDoc)) !== null) {
            params.push({
                type: paramMatch[1],
                name: paramMatch[2],
                description: paramMatch[3].trim(),
            });
        }

        const returnMatch = jsDoc.match(/\* @returns? {([^}]+)} (.+)/);
        const returns = returnMatch ? { type: returnMatch[1], description: returnMatch[2].trim() } : null;

        functionsInfo.push({
            functionName,
            description,
            params,
            returns,
            isDefault,
            isAsync,
            declarationType
        });
    }
    return functionsInfo;
}

async function listExportedVariables(content) {
    const variableRegex = /\/\*\*([\s\S]*?)\*\/\s*export\s+(const|let)\s+([^=]+)=/g;
    let match;
    const variablesInfo = [];

    while ((match = variableRegex.exec(content)) !== null) {
        const comment = match[1].trim().split('\n').map(line => line.replace(/^\s*\*\s?/, '').trim()).join(' ');
        const type = match[2].trim();
        const name = match[3].trim();

        variablesInfo.push({
            type: type,
            name: name,
            description: comment
        });
    }

    return variablesInfo;
}

async function listExportedAndWindowVariables(originalContent) {
    const variableRegex = /\/\*\*([\s\S]*?)\*\/\s*(export\s+(const|let)\s+([^=]+)=|window\.([^=]+)\s*=\s*(?![\s\S]*function))/g;
    let match;
    const variables = [];
    let cleanedContent = originalContent;

    while ((match = variableRegex.exec(originalContent)) !== null) {
        let commentLines = match[1].trim().split('\n').map(line => line.replace(/^\s*\*\s?/, ''));
        commentLines = commentLines.map(line => line.trim() === '' ? '<br>' : line);
        let comment = commentLines.join(' ').trim().replace(/^(<br>)+|(<br>)+$/g, '');
        const def = match[3] ? match[3].trim() : "property";
        const name = match[4] ? match[4].trim() : match[5].trim();
        const declarationType = match[3] ? "export " : "window.";

        const typeMatch = comment.match(/@type {(.+?)}/);
        const type = typeMatch ? typeMatch[1] : "unknown type";

        if (typeMatch) {
            comment = comment.replace(typeMatch[0], '').trim();
        }

        variables.push({
            type: type,
            def: def,
            name: name,
            description: comment,
            declarationType: declarationType
        });

        const fullMatchLength = match[0].length;
        const startIndex = match.index;
        const endIndex = startIndex + fullMatchLength;

        cleanedContent = cleanedContent.substring(0, startIndex) + ' '.repeat(endIndex - startIndex) + cleanedContent.substring(endIndex);
    }

    return { variables, cleanedContent };
}

async function extractTopComment(filePath) {
    const content = await fs.readFile(filePath, 'utf-8');
    const commentRegex = /(\/\*[\s\S]*?\*\/)|(<!--[\s\S]*?-->)/;
    const match = content.match(commentRegex);

    if (match) {
        let rawComment = match[0].replace(/\/\*|\*\/|<!--|-->|#/g, '').trim();
        let lines = rawComment.split('\n').map(line => line.trim());

        let formattedComment = '';
        for (let i = 0; i < lines.length; i++) {
            if (lines[i] === '' && lines[i + 1] === '') {
                formattedComment += '<br><br>';
                i++;
            } else if (lines[i] !== '') {
                formattedComment += lines[i] + ' ';
            }
        }

        formattedComment = '[p class=^topComment justify^]' + formattedComment.trim() + '[/p]';
        return { rawComment, formattedComment };
    } else {
        return { rawComment: "", formattedComment: "" };
    }
}

function extractHookCommentsAndNames(jsContent) {
    const hookRegex = /\/\*\*([\s\S]*?)\*\/\s*window\.hook\((?:'|&#039;)([^']+?)(?:'|&#039;),\s*(async\s*)?function/g;
    let match;
    const hooks = [];

    while ((match = hookRegex.exec(jsContent)) !== null) {
        let commentLines = match[1].trim().split('\n').map(line => line.trim().replace(/^\*\s*/, ''));

        let annotations = {};
        let comment = "";

        commentLines.forEach(line => {
            const annotationMatch = line.match(/@(\w+)\s+(.+)/);
            if (annotationMatch) {
                const key = annotationMatch[1];
                const value = annotationMatch[2];
                annotations[key] = value;
                return;
            }

            if (line === '') {
                comment += ' <br> ';
            } else {
                comment += line + ' ';
            }
        });

        const hookName = match[2];
        const isAsync = match[3] !== undefined;

        hooks.push({
            hookName,
            description: comment.trim(),
            annotations,
            isAsync
        });
    }

    return hooks;
}

function convertMarkdownToHTML(mdContent) {
    return marked.parse(mdContent);
}

function removeIgnoredBlocks(content) {
    // Matches anything between //< and //>, including the markers themselves
    const ignoredBlockRegex = /\/\/<[\s\S]*?\/\/>/g;
    return content.replace(ignoredBlockRegex, '');
}

async function escapeHTMLSpecialCharacters(content) {
    // Replace <, >, &, " and ' with their HTML entity equivalents
    return content
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

const routes = [];
const directoryStructure = {};
let hooksContent = '';

async function generateDocumentation(directoryPath, ig, basePath = '', structure = directoryStructure) {
    const entries = await fs.readdir(directoryPath, { withFileTypes: true });
    const allowedExtensions = ['.html', '.js', '.css', '.txt', '.md'];

    for (const entry of entries) {
        const entryRelativePath = path.join(basePath, entry.name);

        if (entry.name.startsWith('.') || ig.ignores(entryRelativePath)) {
            continue;
        }

        const fullPath = path.join(directoryPath, entry.name);

        if (entry.isDirectory()) {
            structure[entry.name] = {};
            await generateDocumentation(fullPath, ig, entryRelativePath, structure[entry.name]);
        } else if (allowedExtensions.includes(path.extname(entry.name))) {
            let content = `[h1]${entry.name}[/h1]\n`;

            const fileLink = `[a href=^https://github.com/HousebirdGames/Birdhouse/blob/main/${entryRelativePath}^]view this file on GitHub[/a]`;
            content += `[p]You can ${fileLink}.[/p]`;

            const commentObject = await extractTopComment(fullPath);
            const comment = commentObject.formattedComment;
            content += `${comment}`;


            if (entry.name.endsWith('.js')) {
                let fileContent = await fs.readFile(fullPath, 'utf-8');
                fileContent = removeIgnoredBlocks(fileContent);
                fileContent = await escapeHTMLSpecialCharacters(fileContent);

                const { variables, cleanedContent } = await listExportedAndWindowVariables(fileContent);

                if (variables.length > 0) {
                    content += '[h2 id=^variables^][button href=^#variables^ class=^copyLink^]Variables<span class="material-icons spaceLeft">link</span>[/button][/h2]';
                }

                for (const variable of variables) {
                    content += `[div class=^variable^ id=^variable-${variable.name}^][h3]${variable.declarationType}<strong class="copyData" data-copy="${variable.name}">${variable.name}</strong> (${variable.def} ${variable.type}) [button href=^#variable-${variable.name}^ class=^copyLink^]<span class="material-icons">link</span>[/button][/h3][p class=^justify^]${variable.description}[/p][/div]`;
                }

                const functions = await listFunctionsInJSFile(cleanedContent);

                if (functions.length > 0) {
                    content += '[h2 id=^functions^][button href=^#functions^ class=^copyLink^]Functions<span class="material-icons spaceLeft">link</span>[/button][/h2]';
                }

                for (const func of functions) {
                    let parameters = [];
                    let parameterTypes = [];
                    for (const param of func.params) {
                        parameters.push(`${param.type}: ${param.name}`);
                        parameterTypes.push(param.type);
                    }
                    const parametersString = parameters.join(', ');
                    const parametersTypesString = parameterTypes.join(', ');
                    content += `[div class=^function^ id=^function-${func.functionName}^][h3]${func.isDefault ? 'DEFAULT ' : ''}${func.isAsync ? 'async ' : ''}${func.declarationType}<strong class="copyData" data-copy="${func.declarationType == 'window.' ? 'window.' : ''}${func.functionName}(${parametersTypesString})">${func.functionName}</strong>${parameters.length > 0 ? `(${parametersString})` : ''} [button href=^#function-${func.functionName}^ class=^copyLink^]<span class="material-icons">link</span>[/button][/h3][p class=^justify^]${func.description}[/p]`;
                    if (func.params.length > 0 || func.returns) {
                        content += '<table>';
                        if (func.params.length > 0) {
                            content += "<tr><th>Parameter</th><th>Type</th><th>Description</th></tr>";
                        }
                        for (const param of func.params) {
                            content += `<tr><td class="parameter">${param.name}</td><td>${param.type}</td><td>${param.description}</td></tr>`;
                        }
                        if (func.returns) {
                            content += '<tr></tr>';
                            content += `<tr><th class="returns">Returns</th><td>${func.returns.type}</td><td>${func.returns.description}</td></tr>`;
                        }
                        content += '</table>';
                    }
                    content += "[/div]";
                }


                if (cleanedContent.includes('window.hook')) {
                    const hooks = extractHookCommentsAndNames(cleanedContent);
                    for (const hook of hooks) {
                        hooksContent += `[div class=^hook^ id=^hook-${hook.hookName}^][h3]Hook: <strong class="copyData" data-copy="window.hook('${hook.hookName}',${hook.isAsync ? ' async' : ''} function (${hook.annotations['params'] ? hook.annotations['params'] : ''}) {/* ${hook.description} */});">${hook.hookName}</strong> [button href=^#hook-${hook.hookName}^ class=^copyLink^]<span class="material-icons">link</span>[/button][/h3][p class=^justify^]${hook.description}[/p]${hook.annotations['params'] ? `[p class=^annotation^]These are the parameters the hooks function will receive: <strong>${hook.annotations['params']}</strong>[/p]` : ''}[p class=^annotation^]When using this hook, its function should return: <strong>${hook.annotations['shouldReturn']}</strong>[/p][/div]`;
                    }
                }

            } else if (entry.name.endsWith('.txt')) {
                content += (await fs.readFile(fullPath, 'utf-8')).split('\r\n\r\n').map(
                    paragraph => `[p class=^justify^]${paragraph.replace(/\r\n/g, ' ')}[/p]`
                ).join('');
            } else if (entry.name.endsWith('.md')) {
                content += convertMarkdownToHTML(await fs.readFile(fullPath, 'utf-8'));
            }

            const markdownPath = `./docs/${entryRelativePath.replace(/\\/g, '+')}.md`;
            await fs.writeFile(markdownPath, content, 'utf-8');

            routes.push({
                originalPath: fullPath.replace(/\\/g, '/'),
                markdownPath: markdownPath.replace(/\\/g, '/'),
                filename: entry.name,
                description: commentObject.rawComment.length > 150 ? commentObject.rawComment.slice(0, 150) + "..." : commentObject.rawComment
            });

            structure[entry.name] = {
                path: fullPath.replace(/\\/g, '/'),
            };
        } else {
            structure[entry.name] = {};
        }
    }
}

async function generateChangelog(directoryPath, structure = directoryStructure) {
    // Path to the submodule .git directory and work tree
    const submoduleGitDir = directoryPath + '/.git';
    const submoduleWorkTree = directoryPath;

    // Execute git command to get commit hash, date, and message
    await new Promise((resolve, reject) => {
        exec(`git --git-dir=${submoduleGitDir} --work-tree=${submoduleWorkTree} log --pretty=format:"%h|%ad|%s" --date=format:"%Y-%m"`, async (err, stdout, stderr) => {
            if (err) {
                console.error(`exec error: ${err}`);
                reject(err);
                return;
            }

            // Split the output by new line to get each commit and parse it
            const commits = stdout.split('\n').map(commit => {
                const [hash, date, message] = commit.split('|');
                return { hash, date, message };
            });

            // Group commits by month
            const commitsByMonth = {};
            commits.forEach(({ hash, date, message }) => {
                const month = date.slice(0, 7); // YYYY-MM
                if (!commitsByMonth[month]) {
                    commitsByMonth[month] = [];
                }
                commitsByMonth[month].push({ hash, message });
            });

            // Start building the HTML
            let html = '';
            Object.entries(commitsByMonth).forEach(([month, commits]) => {
                html += `<h2 id="month-${month}">[button href=^#month-${month}^ class=^copyLink^]${month}<span class="material-icons spaceLeft">link</span>[/button]</h2>\n<ul class="changelogList">\n`;
                commits.forEach(({ hash, message }) => {
                    html += `  <li>${message} <a href="https://github.com/HousebirdGames/Birdhouse/commit/${hash}" class="commit">(Commit ${hash})</a></li>\n`;
                });
                html += '</ul>\n';
            });

            // Write the HTML to a file
            await fs.writeFile('./docs/changelog.md', html, (err) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }
                console.log('Commit history by month has been written to docs/changelog.md');
            });

            routes.push({
                originalPath: 'Birdhouse/Changelog',
                markdownPath: './docs/changelog.md',
                filename: 'Changelog',
                description: 'View the commit history by month.'
            });

            /* structure['Changelog'] = {
                path: 'changelog',
            }; */

            console.log('Changelog generated successfully.');
            resolve();
        });
    });
}

async function writeHooksOverview(content) {
    // Start building the HTML
    let html = '<h1>Hooks</h1><p>Here you find all hooks that are available. You can also view the hooks implementation to learn how to add custom hooks: <a href="src/modules/hooks.js">hooks.js</a></p>' + content;

    // Write the HTML to a file
    await fs.writeFile('./docs/hooks.md', html, (err) => {
        if (err) {
            console.error(err);
            reject(err);
            return;
        }
        console.log('Hooks overview has been written to docs/hooks.md');
    });

    routes.push({
        originalPath: 'Birdhouse/Hooks',
        markdownPath: './docs/hooks.md',
        filename: 'Hooks Overview',
        description: 'View the overview of the hooks.'
    });

    console.log('Hooks overview generated successfully.');
}


async function createCombinedDocFile() {
    console.log('Creating combined documentation file...');
    const docFiles = (await fs.readdir('./docs')).filter(file => file.endsWith('.md'));

    let allDocsContent = '';

    for (const file of docFiles) {
        const content = await fs.readFile(path.join('./docs', file), 'utf8');
        allDocsContent += content + '\n';
    }

    await fs.writeFile('./allDocs.txt', allDocsContent);

    console.log('Combined documentation file created successfully.');
}

async function getFiles(dir) {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return Array.prototype.concat(...files);
}

async function createCombinedJSFile() {
    console.log('Creating combined JS file...');
    const allFiles = await getFiles('./Birdhouse');
    const docFiles = allFiles.filter(file => file.endsWith('.js'));

    let allDocsContent = '';

    for (const file of docFiles) {
        const content = await fs.readFile(file, 'utf8');
        allDocsContent += file.name + ':\n' + content + '\n\n';
    }

    await fs.writeFile('./allJS.txt', allDocsContent);

    console.log('Combined JS file created successfully.');
}

async function main() {
    const birdhousePath = './Birdhouse';
    const ig = await readGitignore(birdhousePath);

    await fs.rm('./docs', { recursive: true, force: true });
    await fs.mkdir('./docs', { recursive: true });
    await generateDocumentation(birdhousePath, ig);

    await writeHooksOverview(hooksContent);

    await generateChangelog(birdhousePath);

    await fs.writeFile('./src/dynamic-routes.js', `export const dynamicRoutes = ${JSON.stringify(routes, null, 2)};`, 'utf-8');

    await fs.writeFile('./src/birdhouse-structure.js', `export const birdhouseStructure = ${JSON.stringify(directoryStructure, null, 2)};`, 'utf-8');

    console.log('Custom markdown documentation and dynamic routes generated successfully.');

    await createCombinedDocFile().catch(console.error);
    await createCombinedJSFile().catch(console.error);

    console.log('Finished generating documentation.');
}

main().catch(console.error);