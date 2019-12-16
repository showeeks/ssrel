import {generateID} from "./util";
import sqlite from 'sqlite'
import Base64 from 'urlsafe-base64'
import axios from 'axios'

const ssr_url = "https://www.kiwiss.cc/link/1p7FJThsG3EiCDWp"
const getAllSql = "SELECT remarks, server, server_port, method, obfs, obfsparam, password, protocol, enable FROM ssr_config"

export class Config {
    private server;
    private server_port;
    private password: string;
    private protocolparam: string;
    private obfs: string;
    private method: string;
    private protocol: string;
    private obfsparam: string;
    private enable: boolean;
    private remarks: string;
    private group: string;
    private id: string;

    constructor() {
        this.server = '127.0.0.1';
        this.server_port = 8388
        this.password = '0'
        this.method = 'aes-256-cfb'
        this.protocol = 'origin'
        this.protocolparam = ''
        this.obfs = 'plain'
        this.obfsparam = ''
        this.remarks = ''
        this.group = ''
        this.id = generateID()
        this.enable = true
        Object.defineProperty(this, 'remarks_base64', {
            enumerable: true,
            get() {
                return this.remarks ? this.encode(this.remarks) : ''
            },
            set() {
            }
        })
    }

    public fill(res: {
        server, server_port, password, method, protocol, protocolparam, obfs, obfsparam, remarks, group
    }): void {
        this.server = res.server;
        this.server_port = res.server_port
        this.password = res.password
        this.method = res.method
        this.protocol = res.protocol
        this.protocolparam = res.protocolparam
        this.obfs = res.obfs
        this.obfsparam = res.obfsparam
        this.remarks = res.remarks
        this.group = res.group
        this.enable = true
    }

    public async save() {
        try {
            const db = await sqlite.open("database/data.sqlite")
            const tblname = "ssr_config"
            const stmt = await db.prepare(`INSERT INTO ${tblname} (remarks, server, server_port, method, obfs, obfsparam, password, protocol, enable) values (?,?,?,?,?,?,?,?,?)`)
            await stmt.run(this.remarks, this.server, this.server_port, this.method, this.obfs, this.obfsparam, this.password, this.protocol, this.enable);
            await stmt.finalize()
        } catch (e) {
            console.log("fatal: " + e)
        }
    }

    public static fromSubscription(subscription: string) {
        let ssrLinks = this.decode(subscription);
        const lines = ssrLinks.split("\n");
        const result = new Array<Config>();
        console.log("debug: " + lines[5])
        for (const line of lines) {
            if (line.length < 2) {
                continue
            }
            let {err, res} = this.fromSSRLink(line);
            if (err) {
                console.log("warn: parse line " + line + " failed")
                continue
            }
            if (res instanceof Config) {
                result.push(res)
            }
        }
        return result
    }

    public static fromSSRLink(link: string): { res: null; err: true } | { res: Config; err: false } {
        const res = new Config();
        const body = link.substr(6);
        const decoded = this.decode(body);
        const _split = decoded.split("/?");
        const required = _split[0];
        const others = _split[1];
        const requiredSplit = required.split(':');
        if (requiredSplit.length !== 6) {
            // throw new Error("fatal: parse failed" + requiredSplit)
            return {
                res: null,
                err: true
            }
        }

        requiredSplit[5] = this.decode(requiredSplit[5])
        res.server = requiredSplit[0]
        res.server_port = requiredSplit[1]
        res.protocol = requiredSplit[2]
        res.method = requiredSplit[3]
        res.obfs = requiredSplit[4]
        res.password = requiredSplit[5]
        const otherSplit = {}
        others && others.split('&').forEach(item => {
            const _params = item.split('=')
            otherSplit[_params[0]] = this.decode(_params[1])
            switch (_params[0]) {
                case "obfsparam":
                    res.obfsparam = this.decode(_params[1])
                    break
                case "protoparam":
                    res.protocolparam = this.decode(_params[1])
                    break;
                case "remarks":
                    res.remarks = this.decode(_params[1])
                    break;
                case "group":
                    res.group = this.decode(_params[1])
                    break;
                default:
                    console.log("warn: unsupported tag: " + _params[0] + "=" + _params[1])
                    break;
            }
        })
        return {
            err: false,
            res
        }
    }

    public static async updateAll() {
        const data = await axios.get(ssr_url)
        let configs = this.fromSubscription(data.data);
        for (const config of configs) {
            await config.save()
        }
        return configs.length
    }

    public static async fetchAll(): Promise<Config[]> {
        const db = await sqlite.open("database/data.sqlite")
        const results = await db.all(getAllSql);
        return results.map<Config>((result): Config => {
            let res: Config = new Config();
            res.fill(result);
            return res
        });
    }

    private static encode(str: string): string {
        const res: string = Base64.encode(Buffer.from(str, 'utf-8'))
        return res;
    }

    private static decode(str: string): string {
        const res: Buffer = Base64.decode(str)
        return res.toString('utf-8')
    }
}