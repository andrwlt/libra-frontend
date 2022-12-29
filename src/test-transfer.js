import { ApiPromise, WsProvider } from '@polkadot/api';

const tx = {
  "signature": {
    "signer": { "id": "5FurykSxW6tXacJ3PDWMZ3MDFdJMC2e9SNvYpFNbAej4hgFD" },
    "signature": {
      "sr25519": "0xb6efbf9f7e49630033d5ceac189cbe8bbfeb65aa2348c540cec72cf1072b2b6ea1264469ed056534c14ac84108d29dd98a2a30e6da72cefc669d57fe9a956884"
    },
    "era": { "mortalEra": "0xd503" },
    "nonce": 0,
    "tip": 0
  },
  "method": {
    "callIndex": "0x0400",
    "args": {
      "dest": { "id": "5ERjkQVj8M7v5UVZQ8qTbZ2qb1o5TgNXq9tXt2BsWF9jBpDu" },
      "value": 1000
    }
  }
};


console.log('Done');