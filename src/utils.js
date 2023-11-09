const generateRandomArray = (length, start, end, includeDecimals, decimalPlaces) => {
    if (start >= end || length < 1) {
        return [];
    }

    if (includeDecimals) {
        return Array.from({ length }, () => {
            const randomNumber = Math.random() * (end - start) + start;
            return Number(randomNumber.toFixed(decimalPlaces));
        });
    } else {
        return Array.from({ length }, () => Math.floor(Math.random() * (end - start + 1) + start));
    }
};

const generateRandomAccountsData = (prevData) => {
    const randomData = {};
    const months = Object.keys(prevData)
    for (const month of months) {
        const randomArray = generateRandomArray(10, 10, 99, false);
        randomData[month] = randomArray;
    }

    return randomData;
}


const generateRandomWatchlistData = (prevData, minValue, maxValue) => {
    return prevData.map(item => ({
        ...item,
        month: generateRandomArray(1, minValue, maxValue, true, 2)[0],
        ytd: generateRandomArray(1, minValue, maxValue, true, 2)[0]
    }));
}

export const randomizeGraphData = (graphData) => {
    const accountData = generateRandomAccountsData(graphData.accounts.data);
    const invoiceData = generateRandomArray(6, 25, 75);
    const cashflowData = generateRandomArray(6, 25, 75);
    const watchlistData = generateRandomWatchlistData(graphData.watchlist.data.values, 1000, 9999);

    const newGraphData = { ...graphData };
    newGraphData.accounts.data = accountData;
    newGraphData.invoice.data = invoiceData;
    newGraphData.cashflow.data = cashflowData;
    newGraphData.watchlist.data.values = watchlistData;

    return newGraphData;
};