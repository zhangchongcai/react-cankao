let initState = {
    //是否显示底部tab菜单
    tabStatus:true
}

let tabReducer = (state=initState,action)=>{
    switch(action.type){
        case 'change_Tab_status':
            return{
                ...state,
                tabStatus:action.payload
            }
        default:
            return state;
    }
}
export default tabReducer;