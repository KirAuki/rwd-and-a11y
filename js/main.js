const container = document.getElementById('container');
const btn = document.getElementById('btn');


function Animator(element, param) {
    this.element = element;
    this.param = param;
    this.animate = function(){
        const {finished} = anime({ 
            targets: this.element,
            duration: 1000,
            easing: 'easeInOutQuad', 
            ...this.param
    
        })
        return finished.then(() =>{
            console.log(`Параметры`);
            console.log(this.param);
         this.element.remove();
        })
    };
}
const rAnimate= [
    {
        backgroundColor: '#CD5C5C' ,
        translateY: -250,
        translateX: 50,
        borderRadius: '50%'
    },
    {
        backgroundColor: '#FF69B4' ,
        translateY: 400,
        translateX: 250,
        scale: 2,
    },
    {
        backgroundColor: '#00BFFF',
        translateY: -100,
        translateX: -500,
        direction: 'alternate',
    },
];

btn.addEventListener('click', () => {
    const el = document.createElement('div');
    el.classList.add('anime__body__el');
    container.appendChild(el);
    const min = 0;
    const max = 2;
    new Animator(el , rAnimate[Math.floor(Math.random() * (max - min + 1)) + min] ).animate();
});
