import { PriceChecker } from "../../typechain-types";
import { ethers } from "hardhat";

import {mainnet} from "../../test/utils/contracts";

const MAX_MARGIN = 0

describe("Price checker", function () {
    let subject: PriceChecker;

    this.beforeAll(async function () {
        const ContractFactory = await ethers.getContractFactory("PriceChecker");
        subject = await ContractFactory.deploy(mainnet.STETH_USD_PRICE_FEED, mainnet.STETH, mainnet.DAI);

        await subject.waitForDeployment();
    });

    describe("Price check", async function () {
        it("Should have the right price in the straigt direction", async function () {
            const stethToSell = ethers.parseEther("1")
            const price = await subject.getExpectedOut(stethToSell, mainnet.STETH, mainnet.DAI, MAX_MARGIN)
            console.log(price.toString())
        })

        it("Should have the right price in the back direction", async function () {
            const stethToSell = ethers.parseEther("1630")
            const price = await subject.getExpectedOut(stethToSell, mainnet.DAI, mainnet.STETH, MAX_MARGIN)
            console.log(price.toString())
        })
    })
})