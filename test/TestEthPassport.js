const EthPassport = artifacts.require("EthPassport");
const BigNumber = require('bignumber.js');

contract("EthPassport", accounts => {
	const [firstAccount, secondAccount] = accounts;

	let ethpassport

	beforeEach('setup contract for each test', async function () {
		ethpassport = await EthPassport.new()
	})

	it("sets an owner", async () => {
        //ensures the owner is correctly set
        assert.equal(await ethpassport.owner.call(), firstAccount);
	});

	it("not paused", async () => {
        //makes sure the contract isnt paused on creation
        assert.equal(await ethpassport.paused.call(), false);
	});

	it("is pausable by owner", async () => {
        //ensures owner can pause
        await ethpassport.pause({ from: firstAccount });
        assert.equal(await ethpassport.paused.call(), true);
	});

	it("is unpausable by owner", async () => {
        //ensures owner can unpause
        await ethpassport.pause({ from: firstAccount });
        assert.equal(await ethpassport.paused.call(), true);
        await ethpassport.unpause({ from: firstAccount });
        assert.equal(await ethpassport.paused.call(), false);
	});

	it("is only pausable by owner", async () => {
    //ensures only owner can pause
        try {
        	await ethpassport.pause({ from: secondAccount });
        	assert.fail();
        } catch (err) {
        	assert.ok(/revert/.test(err.message));
        }
	});


	it("is able to enroll", async () => {
        //ensures User can enroll himself
        assert.equal(await ethpassport.enroll.call("Mohamed", "Nagy","01/07/2000","Egyptian","Egypt",{ from: firstAccount }), true);
	});


	it("is able to get his passport Info", async () => {
        //ensures User can enroll himself
        await ethpassport.enroll("Mohamed", "Nagy","01/07/2000","Egyptian","Egypt",{ from: firstAccount })
        passport = await ethpassport.myPassport.call({ from: firstAccount });
        passport[0] = passport[0].toNumber();
        assert.equal(passport[0], 1);
        assert.equal(passport[1], "Mohamed");
        assert.equal(passport[2], "Nagy");
        assert.equal(passport[3], "01/07/2000");
        assert.equal(passport[4], "Egyptian");
        assert.equal(passport[5], "Egypt");
	});


    it("is able to get his id Info", async () => {
        //ensures User can enroll himself
        await ethpassport.enroll("Mohamed", "Nagy","01/07/2000","Egyptian","Egypt",{ from: firstAccount })
        id = await ethpassport.myID.call({ from: firstAccount });
        id[0] = id[0].toNumber();
        assert.equal(id[0], 1);
        assert.equal(id[1], "Mohamed");
        assert.equal(id[2], "Nagy");
        assert.equal(id[3], "Egyptian");
    });

	it("isn't able to get his ID Info without enrolling first", async () => {
        try {
        	await ethpassport.myID({ from: firstAccount });
        	assert.fail();
        } catch (err) {
        	assert.ok(/revert/.test(err.message));
        }

	});

    it("is  able to update his Info", async () => {
        await ethpassport.enroll("Mohamed", "Nagy","01/07/2000","Egyptian","Egypt",{ from: firstAccount })
        assert.equal(await ethpassport.update.call("Nagy", "Mohamed", "07/01/2000","American","America",{ from: firstAccount }), true);
    });

    it("Is Able to authnticate himself", async () => {
        await ethpassport.enroll("Mohamed", "Nagy","01/07/2000","Egyptian","Egypt",{ from: firstAccount })
        assert.equal(await ethpassport.auth.call(1, "Mohamed", "Nagy",{ from: firstAccount }), true);
    });

    it("Isn't Able to authnticate someone else", async () => {
        await ethpassport.enroll("Mohamed", "Nagy","01/07/2000","Egyptian","Egypt",{ from: firstAccount })
        await ethpassport.enroll("Nagy", "Mohamed","01/07/2000","Egyptian","Egypt",{ from: secondAccount })
        try {
            assert.equal(await ethpassport.auth.call(1, "Mohamed", "Nagy",{ from: secondAccount }), true);
            assert.fail();
        } catch (err) {
            assert.ok(/revert/.test(err.message));
        }
    });


});