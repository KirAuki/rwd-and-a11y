const objUrls = {
    imgs:'http://194.67.93.117:80/images',
    temp:'http://194.67.93.117:80/temp',
}


const getImgs = async () =>{
    try {
        const resp = await fetch(objUrls['imgs']);
        if(resp.status == 500){
            throw new Error('Ошибка сервера')
        }
        const imgsArr = await resp.json();
        return imgsArr 
    } catch (error) {
        throw new Error(error)
       
    }
    
} 

window.addEventListener("DOMContentLoaded",async (e) =>{
    const updateBtn = document.querySelector('.btn');
    const container = document.querySelector('.grid');
    const loader = document.querySelector('.loader');
    const classes = ['notif--active','err']
    const notif = document.querySelector('.notif')
    const message = document.querySelector('.notif__message');
    const subBtn = document.querySelector('.subBtn');
    const form = document.querySelector('.form');
    const delay = ms => new Promise((res,rej) => setTimeout(res,ms))
    
    const viewImgs = async () =>{
        container.innerHTML = ''
        updateBtn.setAttribute('disabled',true)
        loader.classList.toggle('loader--active');
        try {
            const imgsArr = await getImgs();
            if(imgsArr.length === 0){
                container.innerHTML = '<p>Изображения не найдены</p>'
                return
            }
            let s = ''
            for(let {alt,description,url} of imgsArr){
                s+=`<figure >
                <img src=${url} alt=${alt}>
                <figcaption>${description}</figcaption>
            </figure>`
            }
            container.innerHTML = s
    
        } catch (error) {
            message.textContent = error.message;
            notif.classList.remove(...classes)
            notif.classList.add(...classes)
            delay(1500).then(() =>{
                notif.classList.remove('notif--active')
                return delay(1000)
            }).then(() =>{
                message.textContent = '';
                notif.classList.remove('err')
                updateBtn.removeAttribute('disabled')
            })
        }
        finally{
            loader.classList.toggle('loader--active');
            updateBtn.removeAttribute('disabled')
        }
    }
    
    await viewImgs();

    updateBtn.onclick = () => viewImgs()
        
    form.addEventListener('submit',async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form).entries());
        console.log(data)
        if(data['temp'] && data['class']){
            data['temp'] = Number(data['temp']);
            subBtn.setAttribute('disabled',true)
            try {
                const res = await (await fetch(objUrls['temp'],{
                    method:'POST',
                    headers:{
                        "Content-Type":'application/json'
                    },
                    body:JSON.stringify(data)
                })).json()
                if(res['status'] == 'ok'){
                    form.querySelectorAll('input[name]').forEach(elem =>{
                        elem['value'] = ''
                    });
                    message.textContent = res.message;
                    notif.classList.remove(...classes)
                    notif.classList.add('notif--active');

                    setTimeout(() =>{
                        message.textContent = '';
                        notif.classList.remove(...classes)
                        subBtn.removeAttribute('disabled');
                    },2500)
                    return
                }
                throw new Error(res.message)
            } catch (error) {
                notif.classList.remove(...classes)
                notif.classList.add(...classes)
                message.textContent = error.message;
                setTimeout(() =>{
                    notif.classList.remove(...classes)
                    message.textContent = '';
                    subBtn.removeAttribute('disabled')
                },2000)
                return 
            }
           
        }
        return alert('Заполни форму!')
    })


})
