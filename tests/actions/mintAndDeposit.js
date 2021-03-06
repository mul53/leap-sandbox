const ethers = require('ethers');
const { bi, add, greaterThan } = require('jsbi-utils');
const { assert } = require('chai');

const { mine, advanceUntilTokenBalanceChange } = require('../../src/helpers');
const erc20abi = require('../../src/erc20abi');

module.exports = async function(to, amount, token, color, exitHandler, wallet, plasmaWallet) {
  const alice = to.addr;
  const aliceWallet = to.wallet;

  const msg = `\rMinting and depositing ${await token.symbol()}...`;
  process.stdout.write(`${msg} minting`);
  const balanceOrig = Number(await token.balanceOf(alice));
  await mine(token.mint(alice, amount));
  const balanceMint = Number(await token.balanceOf(alice));
  process.stdout.write(`${msg} approving`);
  await mine(token.connect(aliceWallet).approve(exitHandler.address, amount));
  
  process.stdout.write(`${msg} depositing`);
  await mine(exitHandler.connect(aliceWallet).depositBySender(amount, color, { gasLimit: 2000000 }));
  
  if (plasmaWallet) {
    const plasmaToken = new ethers.Contract(token.address, erc20abi, plasmaWallet);
    const oldPlasmaBalance = await plasmaToken.balanceOf(alice);

    if (greaterThan(bi(oldPlasmaBalance), bi(0))) {
      return;
    }

    const currentPlasmaBalance = await advanceUntilTokenBalanceChange(
      alice, token.address, oldPlasmaBalance, wallet, plasmaWallet, 
      `${msg} waiting for deposit to be caught`
    );  

    assert.equal(
      bi(currentPlasmaBalance).toString(),
      add(bi(oldPlasmaBalance), bi(amount)).toString()
    );  

    assert.equal(
      bi(balanceMint).toString(),
      add(bi(balanceOrig), bi(amount)).toString()
    );
  
    const balanceFinal = Number(await token.balanceOf(alice));
    assert.equal(balanceFinal, balanceOrig);  
  }
  
  process.stdout.write(`${msg} ✅${' '.repeat(50)}\n`);
}
