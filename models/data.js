const fileSystem = require('fs');
const database = __dirname+'/../store/database.json';

function dateconvert(str) {
	const date = new Date(str);
    const mnth = ("0" + (date.getMonth() + 1)).slice(-2);
  	const valueConvert = [mnth].join("")
	return valueConvert
}

/**
 * function getData will return full data from store/db.json.
 */
const getDatabase = ()=>{
    return JSON.parse(fileSystem.readFileSync(database, 'utf8'));
}

/**
 * function getTransaksi will return string name of a stadium.
 * @param {string} user
 * @param {int} bulan
 */
 const getTransaksi = (user, bulan)=>{
    const transaksi = Object.entries(getDatabase().data_transaksi);
    let tampung = new Array();
    transaksi.map(([key, value]) => {
        let bulanData = dateconvert(value.transaction_date)
        if(value.user === user && bulanData === bulan){
            tampung.push({...value})
        }
    })
    
    let totalAmount = 0
    const dataTampung = Object.entries(tampung);
    dataTampung.map(([key, value]) => {
        totalAmount += value.total_amount_transaction
    })

    let totalPoint = 0
    let dataHitung = (totalAmount / 10000)
    if(totalAmount < 1000000){ totalPoint = dataHitung * 1 }
    else if(totalAmount >= 1000000){ totalPoint = dataHitung * 1.05 }
    else if(totalAmount >= 10000000){ totalPoint = dataHitung * 1.1 }
    else if(totalAmount >= 20000000){ totalPoint = dataHitung * 1.2 }
    else if(totalAmount >= 30000000){ totalPoint = dataHitung * 1.3 }
    else if(totalAmount >= 40000000){ totalPoint = dataHitung * 1.4 }

    let totalItems = 0
    const Order = Object.entries(getDatabase().data_order);
    let tampungOrder = new Array();
    Order.map(([key, value]) => {
        if(value.user === user){
            tampungOrder = value.products
        }
    })
    const DataOrder = Object.entries(tampungOrder);
    DataOrder.map(([key, value]) => {
        totalItems += value.quantity
    })

    const dataHasil = {
        totalAmountTransaction: totalAmount,
        totalPoints: totalPoint,
        totalItems: totalItems
    }
    console.log(dataHasil)
}

module.exports = {
    getDatabase,
    getTransaksi
}
