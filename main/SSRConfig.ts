function generateID(): string {
    const seed = 'ABCDEF01234567890'
    const arr = new Array<String>();
    for (let i = 0; i < 32; i++) {
        arr.push(seed[Math.floor(Math.random() * seed.length)])
    }
    return arr.join('')
}

const encode = (str: string): string => {
    let buffer = new Buffer(str);
    return buffer.toString("base64")
        .replace("+", "-")
        .replace("/", "_")
        .replace(/=+$/, '')
};

export default class SSRConfig {
    public server;
    public server_port;
    public password: string;
    public protocolparam: string;
    public obfs: string;
    public method: string;
    public protocol: string;
    public obfsparam: string;
    public enable: boolean;
    public remarks: string;
    public group: string;
    public id: string;

    get remarks_base64(): string {
        return this.remarks ? encode(this.remarks) : ''
    }

    constructor() {
        this.server = '127.0.0.1';
        this.server_port = 8388;
        this.password = '0';
        this.method = 'aes-256-cfb';
        this.protocol = 'origin';
        this.protocolparam = '';
        this.obfs = 'plain';
        this.obfsparam = '';
        this.remarks = '';
        this.group = '';
        this.id = generateID();
        this.enable = true;
    }

    public fill(res: {
        server, server_port, password, method, protocol, protocolparam, obfs, obfsparam, remarks, group
    }): void {
        this.server = res.server;
        this.server_port = res.server_port;
        this.password = res.password;
        this.method = res.method;
        this.protocol = res.protocol;
        this.protocolparam = res.protocolparam;
        this.obfs = res.obfs;
        this.obfsparam = res.obfsparam;
        this.remarks = res.remarks;
        this.group = res.group;
        this.enable = true
    }
}