window.addEventListener('DOMContentLoaded', () => { //Скрипт запускается после загрузки DOM структуры
    
    const loadContent = async(url, callback) =>{
        await fetch(url)
            .then(response => response.json())
            .then(json => createElement(json));
    
        callback();
    }
    
    function createElement(arr) {
        const goodsWrapper = document.querySelector('.goods__wrapper');
    
        arr.goods.forEach(function(item){
            let card = document.createElement('div');
            card.classList.add('goods__item');
            card.innerHTML = `
     
                <img class="goods__img" src="${item.url}" alt="phone">
                <div class="goods__colors">Доступно цветов: 4</div>
                <div class="goods__title">
                    ${item.title}
                </div>
                <div class="goods__price">
                    <span>${item.price}</span> руб/шт
                </div>
                <button class="goods__btn">Добавить в корзину</button>
            `;
            goodsWrapper.appendChild(card);
        });
    }
    
    loadContent('js/db.json', () => {
        
        const cartWrapper = document.querySelector('.cart__wrapper'),
            cart = document.querySelector('.cart'),
            close = document.querySelector('.cart__close'),
            open = document.querySelector('#cart'),
            goodsBtn = document.querySelectorAll('.goods__btn'),
            products = document.querySelectorAll('.goods__item'),
            confirm = document.querySelector('.confirm'),
            badge = document.querySelector('.nav__badge'),
            totalCost = document.querySelector('.cart__total > span'),
            titles = document.querySelectorAll('.goods__title'),
            empty = cartWrapper.querySelector('.empty');
    
        // Открытие корзины
        function openCart() {
            cart.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    
        // Закрытие корзины
        function closeCart() {
            cart.style.display = 'none';
            document.body.style.overflow = '';
        }
    
        // Обрезаем заголовки названий товаров
        function sliceTitle() {
            titles.forEach(function (item) {
                if (item.textContent.lehgth < 70) {
                    return;
                } else {
                    const str = `${item.textContent.slice(0, 71)}...`;
                    item.textContent = str;
                }
            })
        };
    
        // анимация картинки
        function showConfirm() {
            confirm.style.display = 'block';
            let counter = 100;
    
            const id = setInterval(frame, 10);
    
            function frame() {
                if (counter == 50) {
                    clearInterval(id);
                    confirm.style.display = 'none';
                } else {
                    counter--;
                    confirm.style.transform = `translateY(-${counter}px)`;
                    confirm.style.opacity = `.${counter}`;
                }
            }
        }
    
        //счетчик колличества товаров
        function calcGoods() {
            const items = cartWrapper.querySelectorAll('.goods__item');
            badge.textContent = items.length;
            if(badge.textContent == 0) {
                cartWrapper.appendChild(empty);
            }
        };
        //сумма товаров
        function calcTotal(){
            const prices = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price > span');
            let total = 0;
            prices.forEach(function(item){
                total += +item.textContent;
            })
            totalCost.textContent = total;
        }
    
        //удаление товаров из корзины
        function removeFromCart() {
            const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove');
            removeBtn.forEach(function(btn){
                btn.addEventListener('click', ()=>{
                    btn.parentElement.remove();
                    
                    calcTotal();
                    calcGoods();
                    if(cartWrapper.childElementCount == 1) {
                        empty.style.display = 'block';
                    }
                })
            })
        }
        function displayEmpty () {
     
    }
        // Вызов корзины
        open.addEventListener('click', openCart);
        close.addEventListener('click', closeCart);
    
        // Добавление товара в корзину
        goodsBtn.forEach(function (btn, i) {
            btn.addEventListener('click', () => {
                let item = products[i].cloneNode(true),
                    trigger = item.querySelector('button'),
                    removeBtn = document.createElement('div');
    
                trigger.remove();
    
                showConfirm();
                
                removeBtn.classList.add('goods__item-remove');
                removeBtn.innerHTML = '&times'; // Добавление крестика, для закрытия
                item.appendChild(removeBtn);
    
                cartWrapper.appendChild(item);
    
                
                if (empty) {
                    empty.style.display = 'none'; // Если елемент есть, то удаляю
                }
                calcTotal();
                removeFromCart();
                calcGoods();
                displayEmpty();
                
            });
    
            sliceTitle();
        });
    });

}); //Конец

    
    
    // const example = {
    //     name: 'ivan'
    // }
    
    // fetch('https://jsonplaceholder.typicode.com/posts',
    //     {
    //         method: "POST",
    //         body: JSON.stringify(example)
    //     }) // promise
    //   .then(response => response.json())
    //   .then(json => console.log(json))
