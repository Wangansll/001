 //侧边栏
  const nav_b=document.getElementById('nav-b')
  //回到顶部按钮
  const position_fixed=document.getElementById('position_fixed')
  //主页技能搜索框
  const search=document.getElementById('search')
  //主页技能添加框
  const input=document.getElementById('input')
  //主页技能添加按钮
  const but_tianjia=document.getElementById('but_tianjia')
  //主页技能渲染位置
  const ul_aih=document.getElementById('ul_aih')
  //联系，意见输入框
  const msg=document.getElementById('msg')
  //联系，意见输入框，输入字数量
  const msgCounter=document.getElementById('msg-counter')
  const msgMax=msg.maxLength
  //联系表单
  const form=document.getElementById('myform')
  const contactName=document.getElementById('contact-name')
  const contactEmail=document.getElementById('contact-email')
  //表单错误提示
  const nameError=document.getElementById('name-error')
  const emailError=document.getElementById('email-error')
  const msgError=document.getElementById('msg-error')
  //判断正则表达式
  const NAME_REG=/^[\u4e00-\u9fa5a-zA-Z]{2,10}$/;
  const EMAIL_REG = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9]+$/;
  //清除页面的该class类
  const hideError=(el)=>el.classList.remove('field-error')
  //给错误的input添加class，显示错误提示词
  const showError=(inputEl,errorEl,text)=>{
    inputEl.classList.add('field-error');
    errorEl.textContent=text;
  }
  //当form表单提交时
  form.onsubmit=(e)=>{
      e.preventDefault()
      contactName.classList.remove('field-error')
      contactEmail.classList.remove('field-error')
      msg.classList.remove('field-error')
  //获取input里面的值
      const name=contactName.value.trim()
      const email=contactEmail.value.trim()
      const text=msg.value.trim()
      let ok=true
      if(!name){
      showError(contactName,nameError,'请填写你的名字')
        ok=false
      }else if(!NAME_REG.test(name)){
        showError(contactName,nameError,'10个中文或英文字符')
        ok=false
      }
      if(!email){
      showError(contactEmail,emailError,'请填写邮箱')
        ok=false
      }else if(!EMAIL_REG.test(email)){
        showError(contactEmail,emailError,'请输入正确邮箱')
        ok=false
      }
      if(!text){
        showError(msg,msgError,'请输入你的意见')
        ok=false
      }
      if(!ok){
        alert('请填写标红的项目')
        return
      }
      alert('提交成功')
      form.reset()
      updateMsgCount()
    }
    //当输入时清除class
  contactName.oninput=()=>{ 
      contactName.classList.remove('field-error')
      nameError.textContent = ''
    }
  contactEmail.oninput=()=>{ 
      contactEmail.classList.remove('field-error') 
      emailError.textContent = ''
    }
  msg.oninput=()=>{
      msg.classList.remove('field-error')
      updateMsgCount()
    }
  //修改msgCounter（意见输入框字的数量），三元判断
  const updateMsgCount=()=>{
      const currentLen=msg.value.length
      msgCounter.textContent=`${currentLen}/${msgMax}`
      msg.style.background=currentLen>=180?'#fff3e0':''
    }
    form.onreset=()=>{
      setTimeout(updateMsgCount,0)
    }
    updateMsgCount()
    // 兜底鸡汤数据（API不可用时使用）
    const FALLBACK_QUOTES = [
      { content: '千里之行，始于足下。', author: '老子' },
      { content: '学而不思则罔，思而不学则殆。', author: '孔子' },
      { content: '天行健，君子以自强不息。', author: '《周易》' },
      { content: '不积跬步，无以至千里。', author: '荀子' },
      { content: '路漫漫其修远兮，吾将上下而求索。', author: '屈原' }
    ]
  //加载每日鸡汤数据（API被墙，暂时直用本地数据）
  const loadQuotes=()=> {
              renderQuote(FALLBACK_QUOTES)
          }
  //渲染每日鸡汤
  const renderQuote=(list)=>{
            const box=document.querySelector('.quotable')
            // 兼容 API 返回格式和兜底数据格式
            const items = Array.isArray(list) ? list : []
            box.innerHTML=items.map(item=>`
              <div class='quote-div'>
              <p >名言：${item.content || ''}</p>
                <p >名人：${item.author || ''}</p>
              </div>
                `).join('')
          }
          loadQuotes()
  //异步函数 导入作品数据
  const loadWorks=async()=>{
            try{
              const res=await fetch('works.json')
                if(!res.ok) throw new Error(`HTTP  ${res.status}`)
                  const data =await res.json()
                  renderWorks(data)
            }catch(err){
                console.log(`加载失败：${err}`);
                console.log('若用双击打开页面，请改用本地服务器（如 VS Code Live Server）访问。');
            alert('若用双击打开页面，请改用本地服务器（如 VS Code Live Server');
            }
          }
  loadWorks() 
  //渲染作品
  const renderWorks=(list)=> {
    const container = document.querySelector('.works-container');
    if (!container || !Array.isArray(list)) return;
    container.innerHTML = list.map(item => `
      <div>
        <h3>${item.title}</h3>
        <img src="${item.img}" alt="${item.title}">
        <p>${item.desc || ''}</p>
      </div>
    `).join('');
  }
  //导航栏切换
  const but_nav=(pageId)=>{
    const but=document.querySelectorAll('.page-section')
    but.forEach(page=>{
      page.style.opacity='0'
      page.style.pointerEvents='none'
      page.style.position = "absolute";
      page.style.animation = '';
    })
    let currentPage = document.getElementById(pageId);
    currentPage.style.opacity='1';
    
    if(currentPage===works){
    currentPage.style.animation = ''; 
    currentPage.offsetWidth;
    currentPage.style.animation='skillUp 1.5s ease';
    }
    currentPage.style.pointerEvents = "auto";
    currentPage.style.position = "static";
  
    const navLinks=document.querySelectorAll('.nav-a a');
    navLinks.forEach(link=>link.classList.remove('active'));
    /* 【可改 ES6】`nav-${pageId}` */
    document.getElementById(`nav-${pageId}`).classList.add('active')
  }

  const button = document.getElementById("but_qiehuan");
  let a = false;
  //主页 切换主题
  button.addEventListener("click", () => {
    if (!a) {
      // 变黑背景、改文字颜色、改字体
      document.body.style.backgroundColor = '#000000';
      document.body.style.color = 'blue';
      button.innerHTML='切换亮色';
      a = true; // 标记已切换
    } else {
      // 再点一次恢复默认
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      document.body.style.fontFamily = '';
      a = false;
      button.innerHTML='切换暗色';
    }
  });

  //侧边栏A标签
  const nav_ball=document.querySelectorAll('.nav-b a')
  const quoteBox=document.getElementById('quote-box')
  //页面滚动
  const onPageScroll=()=>{
    let top=document.documentElement.scrollTop||document.body.scrollTop
    nav_ball.forEach(item=>item.classList.remove('active'))
    // 心灵鸡汤区滚到导航下方附近时，高亮第2项；否则高亮自我介绍区
    if(quoteBox && quoteBox.getBoundingClientRect().top<=150){
      if(nav_ball[1]) nav_ball[1].classList.add('active')
    }else{
      if(nav_ball[0]) nav_ball[0].classList.add('active')
    }
    position_fixed.style.opacity=top>500?1:0
  }
  //当页面滚动时触发onPageScroll()函数
  window.onscroll=onPageScroll
  //只有在滚动的时候才会渲染侧边栏，刚点击网页进来的时候是没有动的，所以额外调用一次函数渲染
  onPageScroll()
  //渲染
  const render=()=>{
    let arr=skilllocal.getlocal()
    let filtered=arr.filter(item=>item.toLowerCase().includes(search.value.toLowerCase()))
    let htmlStr=''
    filtered.map((item) => {
      htmlStr+=`
      <li>${item} <button onclick='delSkill(${JSON.stringify(item)})'>删除</button></li>
      `
    });
    ul_aih.innerHTML=htmlStr
  
  }
    //防抖
    const Debounce=(fn,delay=300)=>{
    let timer
    return()=>{
    clearTimeout(timer)
    timer=setTimeout(fn,delay)
        
    }
  }
  /*搜索技能事件*/
  search.addEventListener('input',Debounce(render))


  //skill删除
  window.delSkill=(name)=>{
    let arr=skilllocal.getlocal()
    let realIndex=arr.indexOf(name);
    if (realIndex === -1) return
    arr.splice(realIndex,1)
    skilllocal.setlocal(arr)
    render()
  }
  //主页技能添加按钮
  but_tianjia.addEventListener('click',()=>{
    const inputValue=input.value.trim()
    if(!inputValue){
      alert('请输入内容')
      return
    }
      const arr=skilllocal.getlocal()
      arr.push(inputValue)
      skilllocal.setlocal(arr)
      render()
      input.value=''
  })
  
  //渲染
  render()