import {generateID} from "./util";
import sqlite from 'sqlite'
import Base64 from 'urlsafe-base64'
import axios from 'axios'
import SSRConfig from "../model/SSRConfig";

const SSR_URL = "https://www.kiwiss.cc/link/1p7FJThsG3EiCDWp";
const GET_ALL_SQL = "SELECT remarks, server, server_port, method, obfs, obfsparam, password, protocol, enable FROM ssr_config";

function decode(str: string): string {
    return Base64.decode(str).toString('utf-8')
}

export async function save(config) {
    try {
        const db = await sqlite.open("database/data.sqlite");
        const tblname = "ssr_config";
        const stmt = await db.prepare(`INSERT INTO ${tblname} (remarks, server, server_port, method, obfs, obfsparam, password, protocol, enable) values (?,?,?,?,?,?,?,?,?)`);
        await stmt.run(config.remarks, config.server, config.server_port, config.method, config.obfs, config.obfsparam, config.password, config.protocol, config.enable);
        await stmt.finalize()
    } catch (e) {
        console.log("fatal: " + e)
    }
}

function fromSubscription(subscription: string) {
    let ssrLinks = decode(subscription);
    const lines = ssrLinks.split("\n");
    const result = new Array<SSRConfig>();
    console.log("debug: " + lines[5]);
    for (const line of lines) {
        if (line.length < 2) {
            continue
        }
        let {err, res} = fromSSRLink(line);
        if (err) {
            console.log("warn: parse line " + line + " failed");
            continue
        }
        if (res instanceof SSRConfig) {
            result.push(res)
        }
    }
    return result
}

function fromSSRLink(link: string): { res: null; err: true } | { res: SSRConfig; err: false } {
    const config = new SSRConfig()
    const res = new SSRConfig();
    const body = link.substr(6);
    const decoded = decode(body);
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

    requiredSplit[5] = decode(requiredSplit[5]);
    res.server = requiredSplit[0];
    res.server_port = requiredSplit[1];
    res.protocol = requiredSplit[2];
    res.method = requiredSplit[3];
    res.obfs = requiredSplit[4];
    res.password = requiredSplit[5];
    const otherSplit = {};
    others && others.split('&').forEach(item => {
        const _params = item.split('=');
        otherSplit[_params[0]] = decode(_params[1]);
        switch (_params[0]) {
            case "obfsparam":
                res.obfsparam = decode(_params[1]);
                break;
            case "protoparam":
                res.protocolparam = decode(_params[1]);
                break;
            case "remarks":
                res.remarks = decode(_params[1]);
                break;
            case "group":
                res.group = decode(_params[1]);
                break;
            default:
                console.log("warn: unsupported tag: " + _params[0] + "=" + _params[1]);
                break;
        }
    });
    return {
        err: false,
        res
    }
}

async function updateAll() {
    const data = await axios.get(SSR_URL);
    let configs = fromSubscription(data.data);
    for (const config of configs) {
        await save(config)
    }
    return configs.length
}

async function fetchAll(): Promise<SSRConfig[]> {
    const db = await sqlite.open("database/data.sqlite");
    const results = await db.all(GET_ALL_SQL);
    return results.map<SSRConfig>((result): SSRConfig => {
        let res: SSRConfig = new SSRConfig();
        res.fill(result);
        return res
    });
}