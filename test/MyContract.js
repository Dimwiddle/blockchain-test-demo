const {expect} = require("chai");

describe("MyContract", function (){
    let myContract;
    let userWallet;

    beforeEach(async function(){
        myContract = await ethers.getContractFactory("MyContract");
        [userWallet] = await ethers.getSigners();

        myContract = await myContract.deploy();
    });

    describe("receive", function(){
        it("Verify that ether is sent to the contract from the provider. Account balances mapping is updated.", async function(){
            const provider = waffle.provider;

            expect( await provider.getBalance(myContract.address)).to.equal(0);

            await userWallet.sendTransaction({
                to: myContract.address,
                value: 100
            });
            expect(await provider.getBalance(myContract.address)).to.equal(100);
            expect(await myContract.getAccountBalances(userWallet.address)).to.equal(100);
        });

    })
})