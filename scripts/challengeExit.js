const challenge = require('./challenge');

const { FIRST_HASH, SECOND_HASH, NODE_URL, PROVIDER_URL, PRIV_KEY, VALIDATOR_ADDR } = process.env;

console.log(FIRST_HASH, SECOND_HASH, NODE_URL, PROVIDER_URL, PRIV_KEY, VALIDATOR_ADDR);

challenge(FIRST_HASH, SECOND_HASH, NODE_URL, PROVIDER_URL, PRIV_KEY, VALIDATOR_ADDR);


// FIRST_HASH=0x79e2f2ae39387b17be6ea9c11b4c0933da6e151a364e3b22e6605f6ec910b78e SECOND_HASH=0xd66e357bbb66a48280f796c397967de8b774852633fce28414b84c5fa65996a2 NODE_URL=http://localhost:7001 PROVIDER_URL=http://localhost:8545 PRIV_KEY=0x4c5d8ebb1dbbf45779f21354bff9d5e80914ed3ba62680df4bba0878123c8407 VALIDATOR_ADDR=0xe1390C6fa6e499A3C080bed5A6C1B755e525670b node scripts/challengeExit.js