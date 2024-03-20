const fs = require('fs').promises;
const path = require('path');
const ignore = require('ignore');

async function readGitignore(directoryPath) {
    try {
        const gitignorePath = path.join(directoryPath, '.gitignore');
        const gitignoreContent = await fs.readFile(gitignorePath, 'utf8');
        return ignore().add(gitignoreContent);
    } catch (error) {
        return ignore();
    }
}

async function listFunctionsInJSFile(filePath) {
    const content = await fs.readFile(filePath, 'utf-8');
    const functionRegex = /function\s+(\w+)/g;
    const matches = content.matchAll(functionRegex);
    return Array.from(matches).map(match => match[1]);
}

async function extractTopComment(filePath) {
    const content = await fs.readFile(filePath, 'utf-8');
    const commentRegex = /\/\*[\s\S]*?\*\//;
    const match = content.match(commentRegex);
    return match ? match[0].replace(/\/\*|\*\//g, '').trim().split('\n').map(line => `${line.trim()}`).join('\n') : "View the file to get more information.";
}

const routes = [];
const directoryStructure = {};

async function generateDocumentation(directoryPath, ig, basePath = '', structure = directoryStructure) {
    const entries = await fs.readdir(directoryPath, { withFileTypes: true });
    const allowedExtensions = ['.html', '.js', '.css', '.php'];

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
            content += `[p]${comment}[p]\n`;

            const fileLink = `[a href=^https://github.com/HousebirdGames/Birdhouse/blob/main/${entryRelativePath}^]View file on GitHub[/a]`;
            content += `${fileLink}\n`;

            if (entry.name.endsWith('.js')) {
                const functions = await listFunctionsInJSFile(fullPath);
                content += "[ul]\n" + functions.map(func => `[li]${func}[/li]`).join('\n') + "\n[/ul]";
            }

            const markdownPath = `./docs/${entryRelativePath.replace(/\\/g, '+')}.md`;
            await fs.writeFile(markdownPath, content, 'utf-8');

            routes.push({
                originalPath: fullPath,
                markdownPath: markdownPath,
                filename: entry.name,
                description: comment.length > 150 ? comment.slice(0, 150) + "..." : comment
            });

            structure[entry.name] = {
                path: fullPath,
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

    await fs.writeFile('./dynamic-routes.json', JSON.stringify(routes, null, 2), 'utf-8');
    await fs.writeFile('./birdhouse-structure.json', JSON.stringify(directoryStructure, null, 2), 'utf-8');

    console.log('Custom markdown documentation and dynamic routes generated successfully.');
}

main().catch(console.error);