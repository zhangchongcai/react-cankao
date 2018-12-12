let initState = {
    //scroll函数
        scrollCallback:null
}

let scroll = (state=initState,action)=>{
    switch(action.type){
        case 'change_Scroll':
            return{
                ...state,
                scrollCallback:action.payload
            }
        default:
            return state;
    }
}
export default scroll;