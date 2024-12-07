/*
Example usage:
const var = await withTimeout(fetch("url"), 5000);
*/
export function withTimeout<T>(
    promise: Promise<T>,
    timeout: number,
): Promise<T> {
    return Promise.race([
        promise,
        new Promise<T>((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), timeout),
        ),
    ]);
}
