window.skilllocal=(()=>{
    
    //本地存储
    const KEY='skilllocal'
    
    //查本地数据
    const getlocal=()=>{
        let res=localStorage.getItem(KEY)
        return res ? JSON.parse(res):[]
    }

    //存本地数据
    const setlocal=(arr)=>{
        localStorage.setItem(KEY,JSON.stringify(arr))
    }

    //初始化：若本地无数据则设置默认值
    if (!localStorage.getItem(KEY)) setlocal(['HTML'])
    
    return { getlocal, setlocal}
})()