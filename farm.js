const getYieldForPlant = (plant, factors) => {
    let plantYields = plant.yield
    if (factors !== undefined) {
        Object.keys(factors).forEach(e => {
            let factor = plant.factor[e]
            let amount = factors[e]
            plantYields *= 0.01 * factor[amount]
        });
    }
    return Number(plantYields.toFixed(2))
}
const getYieldForCrop = (input, factors) => {

    let cropYield = input.numCrops * input.crop.yield
    if (factors !== undefined) {
        Object.keys(factors).forEach(e => {
            let factor = input.crop.factor[e]
            let amount = factors[e]
            cropYield *= 0.01 * factor[amount]
        });
    }
    return Number(cropYield.toFixed(2))
}
const getTotalYield = (crops, factors) => {

    let totalYield = 0;
    crops.crops.forEach(cropType => {
        totalYield += getYieldForCrop(cropType, factors)
    });
    return Number(totalYield.toFixed(2))
}
const getCostForCrop = (input) => {
    return input.numCrops * input.crop.cost
}
const getRevenueForCrop = (input, factors) => {
    let cropYield = getYieldForCrop(input, factors)
    let salePrice = input.crop.salePrice
    let revenue = cropYield * salePrice
    return Number(revenue.toFixed(2))
}
const getProfitForCrop = (input, factors) => {
    let revenue = getRevenueForCrop(input, factors)
    let cost = getCostForCrop(input)
    let profit = revenue - cost
    return Number(profit.toFixed(2))
}
const getTotalProfit = (crops, factors) => {
    let totalProfit = 0;
    crops.crops.forEach(cropType => {
        totalProfit += getProfitForCrop(cropType, factors)
        console.log(totalProfit)
    });
    return Number(totalProfit.toFixed(2))
}

module.exports = { getYieldForPlant, getYieldForCrop, getTotalYield, getCostForCrop, getRevenueForCrop, getProfitForCrop, getTotalProfit };