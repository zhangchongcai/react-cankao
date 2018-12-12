let initState = {
    //scroll函数
        userStatus:false
}

let user = (state=initState,action)=>{
    switch(action.type){
        case 'change_userStatus':
            return{
                ...state,
                userStatus:action.payload
            }
        default:
            return state;
    }
}
export default user;