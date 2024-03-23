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
    const functionRegex = /(?:\/\*\*([\s\S]*?)\*\/\s*)?(export\s+(async\s+)?(default\s+)?function\s*(\w*)?\()/g;
    let match;
    const functionsInfo = [];

    while ((match = functionRegex.exec(content)) !== null) {
        const jsDoc = match[1] || '';
        const isAsync = !!match[3];
        const isDefault = !!match[4];
        const functionName = match[5] || (isDefault ? 'default' : 'anonymous');

        const descriptionMatch = jsDoc.match(/\* (.+)/);
        const description = descriptionMatch ? descriptionMatch[1].trim() : "No description provided.";

        const params = [];
        const paramRegex = /\* @param {(\w+)} (\w+) (.+)/g;
        let paramMatch;
        while ((paramMatch = paramRegex.exec(jsDoc)) !== null) {
            params.push({
                type: paramMatch[1],
                name: paramMatch[2],
                description: paramMatch[3].trim(),
            });
        }

        const returnMatch = jsDoc.match(/\* @return \{([^\}]+)\}\s+([\s\S]+?)(?=\* @|$)/);
        const returns = returnMatch ? { type: returnMatch[1].trim(), description: returnMatch[2].trim() } : null;

        functionsInfo.push({
            functionName,
            description,
            params,
            returns,
            isExported: true,
            isDefault,
            isAsync,
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


async function extractTopComment(filePath) {
    const content = await fs.readFile(filePath, 'utf-8');
    const commentRegex = /(\/\*[\s\S]*?\*\/)|(<!--[\s\S]*?-->)/;
    const match = content.match(commentRegex);
    return match ? '[p]' + match[0].replace(/\/\*|\*\/|<!--|-->|#/g, '').trim().split('\n').map(line => `${line.trim()}`).join('\n') + '[/p]' : "";
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

async function generateDocumentation(directoryPath, ig, basePath = '', structure = directoryStructure) {
    const entries = await fs.readdir(directoryPath, { withFileTypes: true });
    const allowedExtensions = ['.html', '.js', '.css', '.php', '.txt', '.md'];

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
            const comment = await extractTopComment(fullPath);
            content += `${comment}`;

            const fileLink = `[a href=^https://github.com/HousebirdGames/Birdhouse/blob/main/${entryRelativePath}^]view this file on GitHub[/a]`;
            content += `[p]You can ${fileLink}[/p]`;

            if (entry.name.endsWith('.js')) {
                let fileContent = await fs.readFile(fullPath, 'utf-8');
                fileContent = removeIgnoredBlocks(fileContent);
                fileContent = await escapeHTMLSpecialCharacters(fileContent);

                const variables = await listExportedVariables(fileContent);
                for (const variable of variables) {
                    content += `[div class=^variable^ id=^${variable.name}^][h4]Variable (${variable.type}): <strong>${variable.name}</strong>[/h4][p]${variable.description}[/p][/div]`;
                }

                const functions = await listFunctionsInJSFile(fileContent);
                for (const func of functions) {
                    let parameters = [];
                    for (const param of func.params) {
                        parameters.push(`${param.type}: ${param.name}`);
                    }
                    const parametersString = parameters.join(', ');
                    content += `[div class=^^ id=^${func.functionName}^][h3]Function: ${func.isAsync ? 'async ' : ''}<strong>${func.functionName}</strong> (${parameters.length > 0 ? parametersString : '...'})[/h3][br][p]Description: ${func.description}[/p]`;
                    if (func.params.length > 0) {
                        content += '[br][h4]Parameters:[/h4][ul]';
                        for (const param of func.params) {
                            content += `[li][b]${param.name} (${param.type}):[/b] [i]${param.description}[/i][/li]`;
                        }
                        content += '[/ul]';
                    }
                    if (func.returns) {
                        content += `[br][p][b]Returns (${func.returns.type}):[/b] [i]${func.returns.description}[/i][/p]`;
                    }
                    content += "[/div]";
                }
            } else if (entry.name.endsWith('.txt')) {
                content += `[p class=^justify^]${await fs.readFile(fullPath, 'utf-8')}[/p]`;
            } else if (entry.name.endsWith('.md')) {
                content += convertMarkdownToHTML(await fs.readFile(fullPath, 'utf-8'));
            }

            const markdownPath = `./docs/${entryRelativePath.replace(/\\/g, '+')}.md`;
            await fs.writeFile(markdownPath, content, 'utf-8');


            routes.push({
                originalPath: fullPath.replace(/\\/g, '/'),
                markdownPath: markdownPath.replace(/\\/g, '/'),
                filename: entry.name,
                description: comment.length > 150 ? comment.slice(0, 150) + "..." : comment
            });

            structure[entry.name] = {
                path: fullPath.replace(/\\/g, '/'),
            };
        } else {
            structure[entry.name] = {};
        }
    }
}

async function main() {
    const birdhousePath = './Birdhouse';
    const ig = await readGitignore(birdhousePath);

    await fs.rm('./docs', { recursive: true, force: true });
    await fs.mkdir('./docs', { recursive: true });
    await generateDocumentation(birdhousePath, ig);

    await fs.writeFile('./src/dynamic-routes.js', `export const dynamicRoutes = ${JSON.stringify(routes, null, 2)};`, 'utf-8');

    await fs.writeFile('./src/birdhouse-structure.js', `export const birdhouseStructure = ${JSON.stringify(directoryStructure, null, 2)};`, 'utf-8');

    console.log('Custom markdown documentation and dynamic routes generated successfully.');
}

main().catch(console.error);