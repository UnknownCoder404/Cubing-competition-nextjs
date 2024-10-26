function boldText(
    text: string,
    start: number = 0,
    end: number = text.length,
): string {
    const boldedPart = bolded(text.substring(start, end));
    return `${text.slice(0, start)}${boldedPart}${text.slice(end)}`;
}

function italicText(
    text: string,
    start: number = 0,
    end: number = text.length,
): string {
    const italicizedPart = italicized(text.substring(start, end));
    return `${text.slice(0, start)}${italicizedPart}${text.slice(end)}`;
}

function underlineText(
    text: string,
    start: number = 0,
    end: number = text.length,
): string {
    const underlinedPart = underlined(text.substring(start, end));
    return `${text.slice(0, start)}${underlinedPart}${text.slice(end)}`;
}

function hyperlinkText(
    text: string,
    start: number = 0,
    end: number = text.length,
    url: string,
): string {
    const hyperlinkedPart = hyperlink(text.substring(start, end), url);
    return `${text.slice(0, start)}${hyperlinkedPart}${text.slice(end)}`;
}

function emailToText(
    text: string,
    start: number = 0,
    end: number = text.length,
    email: string,
): string {
    const emailedPart = emailTo(text.substring(start, end), email);
    return `${text.slice(0, start)}${emailedPart}${text.slice(end)}`;
}

function headerText(
    text: string,
    start: number = 0,
    end: number = text.length,
    level: number,
): string {
    const lines = text.split("\n");
    let currentStart = 0;
    let headeredLines = 0;
    const headerLines = lines.map((line) => {
        const lineStart = currentStart;
        const lineEnd = lineStart + line.length;
        currentStart += line.length + 1;
        if (!(lineStart <= start && lineEnd >= end)) {
            return line;
        }
        if (line[0] === "#") {
            const hashtags = line.match(/^#+\s*/)?.[0].trim().length || 0;
            if (hashtags === level) {
                return line.replace(/^#+\s*/, "");
            }
            return `${"#".repeat(level)} ${line.replace(/^#+\s*/, "")}`;
        }
        if (headeredLines >= 1) {
            return line;
        }
        if (
            (lineStart >= start && lineEnd <= end) ||
            (start === end && lineStart <= start && lineEnd >= end)
        ) {
            headeredLines++;
            return header(line, level);
        }
        return line;
    });

    const headerText = headerLines.join("\n");
    return headerText;
}

function bolded(text: string): string {
    return `**${text}**`;
}

function italicized(text: string): string {
    return `_${text}_`;
}

function underlined(text: string): string {
    return `-${text}-`;
}

function hyperlink(text: string, url: string = "URL"): string {
    return `[${text}](${url})`;
}

function emailTo(text: string, email: string): string {
    return hyperlink(text, `mailto:${email}`);
}

function header(text: string, level: number): string {
    if (level < 1 || level > 6) {
        throw new Error("Invalid header level.");
    }
    return `${"#".repeat(level)} ${text}`;
}

export {
    boldText,
    italicText,
    underlineText,
    hyperlinkText,
    emailToText,
    headerText,
};
