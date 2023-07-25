export const personsInfoModule = {
    state: () => ({
        persons: {},
        personList:[],
        billList: [],
    }),
    getters: {
    },
    mutations: {
        setPersonList(state, personList){
            state.personList[personList.number] = personList.array
        },
        setPersonName(state, name){
            if(state.persons[`bill_${name[1]}`][name[2]] === undefined){
                state.persons[`bill_${name[1]}`][name[2]] = {
                    name: name[0],
                    spend: 0,
                    debt: [],
                    id: Date.now()
                }
            }else{
                state.persons[`bill_${name[1]}`][name[2]].name = name[0];
            }
        },
        setPersonSpend(state, spend){
            if(state.persons[`bill_${spend[1]}`][spend[2]] === undefined){
                state.persons[`bill_${spend[1]}`][spend[2]] = {
                    name: undefined,
                    spend: spend[0],
                    debt: [],
                    id: Date.now()
                }
            }else{
                state.persons[`bill_${spend[1]}`][spend[2]].spend += spend[0];
            }
        },
        setPersonDebt(state, debt){
            if(state.persons[`bill_${debt[1]}`][debt[2]] === undefined){
                state.persons[`bill_${debt[1]}`][debt[2]] = {
                    name: undefined,
                    spend: 0,
                    debt: [debt[0]],
                    id: Date.now()
                }
            }else{
                let someIdFlag = false;
                for(let i = 0; i < state.persons[`bill_${debt[1]}`][debt[2]].debt.length; i++){
                    if(state.persons[`bill_${debt[1]}`][debt[2]].debt[i].id === debt[0].id){
                        state.persons[`bill_${debt[1]}`][debt[2]].debt[i] = debt[0]
                        someIdFlag = true;
                    }
                }
                if(!someIdFlag){
                    state.persons[`bill_${debt[1]}`][debt[2]].debt.push(debt[0]);
                }
                someIdFlag = false
            }
        },
        setBill(state, bill){
            state.billList.push(bill)
            if(state.persons[`bill_${bill.number + 1}`] === undefined){
                state.persons[`bill_${bill.number + 1}`] = []
            }
        }
    },
    actions: {
    }
}