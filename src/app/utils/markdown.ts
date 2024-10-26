export function escapeHtmlCharacters(content: string): string {
    // Remove vulnerability to XSS attacks by replacing special characters with HTML entities
    return content
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function escapeMarkdownCharacters(content: string): string {
    return content
        .replace(/\\\*/g, "&#42;")
        .replace(/\\\_/g, "&#95;")
        .replace(/\\\-/g, "&#45;")
        .replace(/\\\#/g, "&#35;")
        .replace(/\\\[/g, "&#91;")
        .replace(/\\\]/g, "&#93;");
}

function boldedMarkdown(content: string): string {
    // Regular expression to find **text**
    return content.replace(/\*\*(.*?)\*\*/g, '<span class="bolded">$1</span>');
}

function italicizedMarkdown(content: string): string {
    // Regular expression to find _text_
    return content.replace(/\_(.*?)\_/g, '<span class="italicized">$1</span>');
}

function underlinedMarkdown(content: string): string {
    // Regular expression to find -text-
    return content.replace(/\-(.*?)\-/g, '<span class="underlined">$1</span>');
}

function hyperlinkedMarkdown(content: string): string {
    // Regular expression to find [text](url)
    return content.replace(/\[(.*?)\]\((.*?)\)/g, function (match, text, url) {
        if (!text.trim()) {
            // If the text is empty, return the original match without modification
            return match;
        }
        // Check if the URL is absolute and is HTTP protocol (starts with 'http://' or 'https://')
        if (url.startsWith("https://") || url.startsWith("http://")) {
            return `<a href="${url}" target="_blank" class="hyperlink-a">${text}</a>`;
        }
        if (url.startsWith("mailto:")) {
            return `<a href="${url}" class="mail-a">${text}</a>`;
        }
        // If the URL is not absolute, return the original match without modification
        return match;
    });
}

function headerMarkdown(content: string): string {
    // Regular expression to match Markdown headers from ### to ######
    return content.replace(
        /^(#{1,6})\s+(.*)$/gm,
        function (match, hashes, text) {
            const level = hashes.length; // Number of '#' determines the header level
            if (level >= 3 && level <= 5) {
                return `<h${level}>${text}</h${level}>`;
            }
            // If the header level is not between 3 and 5, return the original match without modifications
            return match;
        },
    );
}

function paragraphMarkdown(content: string): string {
    // Regular expression to match blocks of text separated by empty lines
    return content.replace(
        /(^|\n)([^\n]+(?:\n[^\n]+)*)(?=\n|$)/g,
        function (match, p1, p2) {
            // p1 is the preceding newline or start of the string
            // p2 is the block of text
            return `<p>${p2.trim()}</p>`;
        },
    );
}

export function markdownToHtml(markdown: string): string {
    const escapedHtmlContent = escapeHtmlCharacters(markdown);
    const escapedMarkdownContent = escapeMarkdownCharacters(escapedHtmlContent);
    const boldedContent = boldedMarkdown(escapedMarkdownContent);
    const italicizedContent = italicizedMarkdown(boldedContent);
    const underlinedContent = underlinedMarkdown(italicizedContent);
    const hyperlinkedContent = hyperlinkedMarkdown(underlinedContent);
    const headerContent = headerMarkdown(hyperlinkedContent);
    const paragraphContent = paragraphMarkdown(headerContent);
    return paragraphContent;
}
