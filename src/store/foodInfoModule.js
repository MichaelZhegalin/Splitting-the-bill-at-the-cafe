export const foodInfoModule = {
    state: () => ({
        food: {},
        billList: [],
        foodListShow: {},
    }),
    mutations: {
        setFoodName(state, name){
            if (state.food[`bill_${name[1]}`][name[2]] === undefined){
                state.food[`bill_${name[1]}`][name[2]] = {
                    name: name[0],
                    price: undefined,
                    persons: [],
                    paid: undefined,
                    id: Date.now()
                }
            } else {
                state.food[`bill_${name[1]}`][name[2]].name = name[0];
            }
        },
        setFoodPrice(state, price){
            if (state.food[`bill_${price[1]}`][price[2]] === undefined){
                state.food[`bill_${price[1]}`][price[2]] = {
                    name: undefined,
                    price: price[0],
                    persons: [],
                    id: Date.now()
                }
            } else {
                state.food[`bill_${price[1]}`][price[2]].price = price[0];
            }
        },
        setFoodEatPersons(state, persons){
            if (state.food[`bill_${persons[1]}`][persons[2]] === undefined){
                state.food[`bill_${persons[1]}`][persons[2]] = {
                    name: undefined,
                    price: undefined,
                    persons: [...persons[0]],
                    paid: undefined,
                    id: Date.now()
                }
            } else {
                state.food[`bill_${persons[1]}`][persons[2]].persons = persons[0];
            }
        },
        setPaid(state, paid){
            if (state.food[`bill_${paid[1]}`][paid[2]] === undefined){
                state.food[`bill_${paid[1]}`][paid[2]] = {
                    name: undefined,
                    price: undefined,
                    persons: [],
                    paid: paid[0],
                    id: Date.now()
                }
            } else {
                state.food[`bill_${paid[1]}`][paid[2]].paid = paid[0];
            }
        },
        setShowFood(state, numBillAndFoodListEl){
            let billNumber = numBillAndFoodListEl.billNumber;
            let foodListEl = numBillAndFoodListEl.foodListEl;
            state.foodListShow[`bill_${billNumber}`] = []
            for(let i = 0; i < 3; i++){
                if (state.food[`bill_${billNumber}`][foodListEl + i] !== undefined){
                    state.foodListShow[`bill_${billNumber}`][i] = state.food[`bill_${billNumber}`][foodListEl + i];
                } else if (state.foodListShow.length !== 0){
                    state.foodListShow[`bill_${billNumber}`] = [];
                    for(let j = 0; j < i; j++){
                        state.foodListShow[`bill_${billNumber}`][j] = state.food[`bill_${billNumber}`][foodListEl + j];
                    }
                    i = 3;
                }
            }
        },
        setBillFood(state, bill){
            state.billList.push(bill)
            if (state.food[`bill_${bill.number + 1}`] === undefined){
                state.food[`bill_${bill.number + 1}`] = []
            }
        },
    },
}