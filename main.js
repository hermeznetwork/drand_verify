/*
    Copyright 2020 HermezDAO.

    This file is part of circom (Zero Knowledge Circuit Compiler).

    circom is a free software: you can redistribute it and/or modify it
    under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    circom is distributed in the hope that it will be useful, but WITHOUT
    ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
    or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public
    License for more details.

    You should have received a copy of the GNU General Public License
    along with circom. If not, see <https://www.gnu.org/licenses/>.
*/

import Client, { HTTP } from 'drand-client'
import fetch from 'node-fetch'
import AbortController from 'abort-controller'

global.fetch = fetch
global.AbortController = AbortController

const chainHash = '8990e7a9aaed2ffed73dbd7092123d6f289930540d7651336225dc172e51b2ce' // (hex encoded)

const urls = [
    'https://api.drand.sh',
    'https://drand.cloudflare.com'
    // ...
]

async function main() {
    let round;
    if (process.argv[2] == "latest") {
	round = undefined;
    } else if (!isNaN(parseInt(process.argv[2]))) {
	round = parseInt(process.argv[2]);
    } else {
	console.log("Usage: ");
	console.log("       node main.js [Round#]");
	console.log("       node.main.js latest");
	return;
    }

    const options = { chainHash };

    const client = await Client.wrap(HTTP.forURLs(urls, chainHash), options);

    // e.g. use the client to get the latest randomness round:
    const res = await client.get(process.argv[2]);

    console.log(res.round, res.randomness);
}

main().then(() => {
	process.exit(0);
}, (err) => {
	console.log("ERROR:", err);
	process.exit(1);
});


