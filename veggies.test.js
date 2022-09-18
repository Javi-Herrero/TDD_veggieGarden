const { getYieldForPlant, getYieldForCrop, getTotalYield, getCostForCrop, getRevenueForCrop, getProfitForCrop, getTotalProfit } = require("./farm");

describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
    };

    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(30);
    });
});

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(23);
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
});

describe("calculating costs/revenue without environmental factors", () => {

    const corn = {
        name: "corn",
        yield: 3,
        cost: 0.5,
        salePrice: 0.3,
    };
    const pumpkin = {
        name: "pumpkin",
        yield: 4,
        cost: 0.7,
        salePrice: 1,
    };
    const input = {
        crop: corn,
        numCrops: 10,

    };
    test("calculate cost for crop (corn)", () => {
        expect(getCostForCrop(input)).toBe(5);
    });
    test("calculate revenue for crop (corn)", () => {
        expect(getRevenueForCrop(input)).toBe(9);
    });
    test("calculate profit for crop", () => {
        expect(getProfitForCrop(input)).toBe(4);
    });
    const crops = [
        { crop: corn, numCrops: 10 },
        { crop: pumpkin, numCrops: 2 },
    ];
    test('calculate profit of multiple crops', () => {
        expect(getTotalProfit({ crops })).toBe(10.6)
    })
});
describe('calculating yield WITH environmental factors', () => {
    const corn = {
        name: "corn",
        yield: 3,
        cost: 0.5,
        salePrice: 0.3,
        factor: {
            sun: {
                low: 50,
                medium: 0,
                high: 150,
            },
            wind: {
                low: 100,
                medium: 80,
                high: 60,
            },
            soil: {
                sand: 90,
                medium: 100,
                clay: 80,
            }
        },
    };
    const pumpkin = {
        name: "pumpkin",
        yield: 4,
        cost: 0.7,
        salePrice: 1,
        factor: {
            sun: {
                low: 100,
                medium: 110,
                high: 130,
            },
            wind: {
                low: 100,
                medium: 100,
                high: 100,
            },
            soil: {
                sand: 80,
                medium: 100,
                clay: 95,
            }
        },
    };
    const input = {
        crop: corn,
        numCrops: 10,

    };
    const crops = [
        { crop: corn, numCrops: 10 },
        { crop: pumpkin, numCrops: 2 },
    ];
    const environmentFactors = {
        sun: 'low',
        wind: 'high',
        soil: 'sand'
    };
    test('plant yields', () => {
        expect(getYieldForPlant(corn, environmentFactors)).toBe(0.81)
    })
    test('Crop yield', () => {
        expect(getYieldForCrop(input, environmentFactors)).toBe(8.1)
    })
    test('Total crop yield', () => {
        expect(getTotalYield({ crops }, environmentFactors)).toBe(14.5)
    })
})
describe('calculating cost/revenue WITH environmental factors', () => {
    const corn = {
        name: "corn",
        yield: 3,
        cost: 0.5,
        salePrice: 0.3,
        factor: {
            sun: {
                low: 50,
                medium: 0,
                high: 150,
            },
            wind: {
                low: 100,
                medium: 80,
                high: 60,
            },
            soil: {
                sand: 90,
                medium: 100,
                clay: 80,
            }
        },
    };
    const pumpkin = {
        name: "pumpkin",
        yield: 4,
        cost: 0.7,
        salePrice: 1,
        factor: {
            sun: {
                low: 100,
                medium: 110,
                high: 130,
            },
            wind: {
                low: 100,
                medium: 100,
                high: 100,
            },
            soil: {
                sand: 80,
                medium: 100,
                clay: 95,
            }
        },
    };
    const input = {
        crop: corn,
        numCrops: 10,

    };
    const crops = [
        { crop: corn, numCrops: 10 },
        { crop: pumpkin, numCrops: 2 },
    ];
    const environmentFactors = {
        sun: 'low',
        wind: 'high',
        soil: 'sand'
    }
    test('revenue for crop', () => {
        expect(getRevenueForCrop(input, environmentFactors)).toBe(2.43)
    })
    test('profit for crop', () => {
        expect(getProfitForCrop(input, environmentFactors)).toBe(-2.57)
    })
    test('total profit for crop', () => {
        expect(getTotalProfit({ crops }, environmentFactors)).toBe(2.43)
    })
})