export const personsInfoModule = {
    state: () => ({
        persons: {},
        personList:[],
        billList: [],
        crossDebtCheck: 0
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
                        state.persons[`bill_${debt[1]}`][debt[2]].debt[i].debt += debt[0].debt;
                        someIdFlag = true;
                    }
                }
                if(!someIdFlag){
                    state.persons[`bill_${debt[1]}`][debt[2]].debt.push(debt[0]);
                }
                someIdFlag = false
            }
        },
        clearDebt(state, debtInfo){
            let billNumber = debtInfo.billNumber; 
            let personNumber = debtInfo.personNumber;
            let debtId = debtInfo.debtId;

            for(let i = 0; i < state.persons[`bill_${billNumber}`][personNumber].debt.length; i++){
                if(state.persons[`bill_${billNumber}`][personNumber].debt[i].id === debtId){
                    if(i !== 0){
                        state.persons[`bill_${billNumber}`][personNumber].debt[i] = state.persons[`bill_${billNumber}`][personNumber].debt[0];
                        state.persons[`bill_${billNumber}`][personNumber].debt.shift();
                    }else{
                        state.persons[`bill_${billNumber}`][personNumber].debt.shift();
                    }
                }
            }   
        },
        crossDebtCheck(state, debtInfo){
            let billNumber = debtInfo.billNumber; 
            let checkPersonNumber = debtInfo.checkPersonNumber;
            let personId = debtInfo.personId;
            let crossDebt = 0;
            console.log('here', billNumber, checkPersonNumber, personId)

            if(state.persons[`bill_${billNumber}`][checkPersonNumber] !== undefined){
                for(let i = 0; i < state.persons[`bill_${billNumber}`][checkPersonNumber].debt.length; i++){
                    if(state.persons[`bill_${billNumber}`][checkPersonNumber].debt[i].id === personId){
                        crossDebt = state.persons[`bill_${billNumber}`][checkPersonNumber].debt[i].debt;
                        console.log(state.persons[`bill_${billNumber}`][checkPersonNumber].debt[i].debt, state.persons[`bill_${billNumber}`][checkPersonNumber].debt[i])
                    }
                }
            }

            state.crossDebtCheck = crossDebt;
        },
        setBill(state, bill){
            state.billList.push(bill);
            if(state.persons[`bill_${bill.number + 1}`] === undefined){
                state.persons[`bill_${bill.number + 1}`] = [];
            }
        }
    },
    actions: {
    }
}