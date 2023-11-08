import { PriceChecker } from "../../typechain-types";
import { ethers } from "hardhat";

import { mainnet } from "../../utils/contracts";

describe("Price checker", function () {
    let subject: PriceChecker;

    this.beforeAll(async function () {
        const ContractFactory = await ethers.getContractFactory("PriceCheckerForStableSwap");
        subject = await ContractFactory.deploy(mainnet.CHAINLINK_PRICE_FEED_REGISTRY, [mainnet.STETH], [mainnet.DAI]);

        await subject.waitForDeployment();
    });

    describe("Price check", async function () {
        it("Should have the right price in the straigt direction", async function () {
            const stethToSell = ethers.parseEther("1")
            const price = await subject.getExpectedOut(stethToSell, mainnet.STETH, mainnet.DAI, 100)
            console.log(price.toString())
        })

    })
})