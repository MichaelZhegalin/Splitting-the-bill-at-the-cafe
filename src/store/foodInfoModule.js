export const foodInfoModule = {
    state: () => ({
        food: {},
        billList: []
    }),
    getters: {
    },
    mutations: {
        setFoodName(state, name){
            if(state.food[`bill_${name[1]}`][name[2]] === undefined){
                state.food[`bill_${name[1]}`][name[2]] = {
                    name: name[0],
                    price: undefined,
                    persons: [],
                    id: Date.now()
                }
            }else{
                state.food[`bill_${name[1]}`][name[2]].name = name[0];
            }
        },
        setFoodPrice(state, price){
            if(state.food[`bill_${price[1]}`][price[2]] === undefined){
                state.food[`bill_${price[1]}`][price[2]] = {
                    name: undefined,
                    price: price[0],
                    persons: [],
                    id: Date.now()
                }
            }else{
                state.food[`bill_${price[1]}`][price[2]].price = price[0];
            }
        },
        setFoodEatPersons(state, persons){
            if(state.food[`bill_${persons[1]}`][persons[2]] === undefined){
                state.food[`bill_${persons[1]}`][persons[2]] = {
                    name: undefined,
                    price: undefined,
                    persons: [...persons[0]],
                    id: Date.now()
                }
            }else{
                state.food[`bill_${persons[1]}`][persons[2]].persons = persons[0];
            }
        },
        setBillFood(state, bill){
            state.billList.push(bill)
            if(state.food[`bill_${bill.number + 1}`] === undefined){
                state.food[`bill_${bill.number + 1}`] = []
            }
        },
    },
    actions: {
    }
}