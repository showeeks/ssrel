export function generateID(): string {
    const seed = 'ABCDEF01234567890'
    const arr = new Array<String>();
    for (let i = 0; i < 32; i++) {
        arr.push(seed[Math.floor(Math.random() * seed.length)])
    }
    return arr.join('')
}