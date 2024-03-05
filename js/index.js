let burger = document.querySelector('.burger__btn');
let menu = document.querySelector('.menu');
burger.addEventListener('click', () => {
  if (burger.getAttribute('aria-expanded') == 'false') {
    burger.setAttribute('aria-expanded', 'true' );
  } else {
    burger.setAttribute('aria-expanded', 'false' );
  }
  burger.classList.toggle('burger__btn--active');
  menu.classList.toggle('menu--active');
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 1050) {
    burger.setAttribute('aria-expanded', 'false' );
    burger.classList.remove('burger__btn--active');
    menu.classList.remove('menu--active');
  }
});

console.log('задание 1');
function countSandwiches({ bread, cheese }) {
  let sandwiches = Math.min(Math.floor(bread / 2), cheese);
  return sandwiches;
}

console.log(countSandwiches({ bread: 10, cheese: 6 })); 


console.log('задание 2')
function generateMultiplicationTable(n) {
  let table = '';
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      table += i * j + '\t';
    }
    table += '\n';
  }
  console.log(table);
}
generateMultiplicationTable(5);

console.log('задание 3')
function showQuote(arr, char) {
  let maxLength = Math.max(...arr.map(word => word.length));
  let border = char.repeat(maxLength + 4);
  console.log(border);
  arr.forEach(word => {
    let spaces = ' '.repeat(maxLength - word.length);
    console.log(`${char} ${word}${spaces} ${char}`);
  });
  console.log(border);
}

let words = ['Hello', 'World', 'In', 'JS'];
showQuote(words, '*');

console.log('задание 4')
function combineArrays(arr1, arr2) {
  let result = [];
  let maxLength = Math.max(arr1.length, arr2.length);
  
  for (let i = 0; i < maxLength; i++) {
    if (arr1[i]) {
      result.push(arr1[i]);
    }
    if (arr2[i]) {
      result.push(arr2[i]);
    }
  }
  return result;
}
console.log(combineArrays([1,2,3],['a','b','c','d']));

console.log('задание 5')
function countUniqueValues(arr) {
  let counts = {};
  
  for (let i = 0; i < arr.length; i++) {
    let value = arr[i];
    counts[value] = (counts[value] || 0) + 1;
  }
  
  return counts;
}
console.log(countUniqueValues([1,2,3,2,4,5,1]));


const notif = { name: 'Уведомление', message: 'Добро пожаловать!' }; 
const toast = document.getElementById('toast');
toast.innerHTML += `<p class="text">${notif.name}: ${notif.message}</p>`;
toast.classList.add('show');
setTimeout(() => {
  toast.classList.add('bottom');
}, 2000);
toast.addEventListener('click', () => {
  toast.classList.add('hide');
  toast.classList.remove('show')
  setTimeout(() => {
    toast.classList.remove('bottom');
  }, 2000);
});