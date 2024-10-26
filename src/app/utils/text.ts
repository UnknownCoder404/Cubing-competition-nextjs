// Utility functions
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

// Main functions for text formatting
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

// Types for selection functions in TextArea
type HTMLTextAreaElementWithSelection = HTMLTextAreaElement & {
    selectionStart: number;
    selectionEnd: number;
};

// Updated functions for TextArea
function boldSelectedTextFromInput(
    input: HTMLTextAreaElementWithSelection | null,
) {
    if (!input) throw new Error("Param input missing.");
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const oldInputValue = input.value;
    const newInputValue = boldText(oldInputValue, start, end);
    input.value = newInputValue;
    const lengthDifference = newInputValue.length - oldInputValue.length - 2;
    input.focus();
    input.setSelectionRange(start + lengthDifference, end + lengthDifference);
}

function italizeSelectedTextFromInput(
    input: HTMLTextAreaElementWithSelection | null,
) {
    if (!input) throw new Error("Param input missing.");
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const oldInputValue = input.value;
    const newInputValue = italicText(oldInputValue, start, end);
    input.value = newInputValue;
    const lengthDifference = newInputValue.length - oldInputValue.length - 1;
    input.focus();
    input.setSelectionRange(start + lengthDifference, end + lengthDifference);
}

function underlineSelectedTextFromInput(
    input: HTMLTextAreaElementWithSelection | null,
) {
    if (!input) throw new Error("Param input missing.");
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const oldInputValue = input.value;
    const newInputValue = underlineText(oldInputValue, start, end);
    input.value = newInputValue;
    const lengthDifference = newInputValue.length - oldInputValue.length - 1;
    input.focus();
    input.setSelectionRange(start + lengthDifference, end + lengthDifference);
}

function hyperlinkSelectedTextFromInput(
    input: HTMLTextAreaElementWithSelection | null,
    url: string = "URL",
) {
    if (!input) throw new Error("Param input missing.");
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const selectedWord = input.value.substring(start, end);
    const oldInputValue = input.value;
    const newInputValue = hyperlinkText(oldInputValue, start, end, url);
    input.value = newInputValue;
    const linkStart = start + 1 + selectedWord.length + 1 + 1;
    const linkEnd = linkStart + url.length;
    input.focus();
    input.setSelectionRange(linkStart, linkEnd);
}

function emailToSelectedTextFromInput(
    input: HTMLTextAreaElementWithSelection | null,
    email: string = "email",
) {
    if (!input) throw new Error("Param input missing.");
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const selectedWord = input.value.substring(start, end);
    const oldInputValue = input.value;
    const newInputValue = emailToText(oldInputValue, start, end, email);
    input.value = newInputValue;
    const mailStart =
        start + 1 + selectedWord.length + 1 + 1 + "mailto:".length;
    const mailEnd = mailStart + email.length;
    input.focus();
    input.setSelectionRange(mailStart, mailEnd);
}

function headerSelectedTextFromInput(
    input: HTMLTextAreaElementWithSelection | null,
    level: number = 1,
) {
    if (!input) throw new Error("Param input missing.");
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const oldInputValue = input.value;
    const newInputValue = headerText(oldInputValue, start, end, level);
    input.value = newInputValue;
    const lines = oldInputValue.split("\n");
    let currentStart = 0;
    lines.forEach((line, index) => {
        const lineStart = currentStart;
        const lineEnd = lineStart + line.length;
        currentStart += line.length + 1;
        if (!(lineStart <= start && lineEnd >= end)) return;
        if (newInputValue.split("\n")[index][0] !== "#") {
            input.focus();
            input.setSelectionRange(start - level - 1, end - level - 1);
            return;
        }
        if (lineStart <= start && lineEnd >= end) {
            requestAnimationFrame(() => {
                input.focus();
                input.setSelectionRange(lineStart + level + 1, end + level + 1);
            });
        }
    });
}

export {
    boldSelectedTextFromInput,
    italizeSelectedTextFromInput,
    underlineSelectedTextFromInput,
    hyperlinkSelectedTextFromInput,
    emailToSelectedTextFromInput,
    headerSelectedTextFromInput,
};
