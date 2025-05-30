export function maskSensitiveData(data: string): string {
    if (data.length <= 4) return '****';
    return data.slice(0, -4).replace(/./g, '*') + data.slice(-4);
}
