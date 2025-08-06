document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const images = [
        'Апетитка.jpg',
        'Домати.jpg',
        'Зеленчук.jpg',
        'Камчия.jpg',
        'Кафе.jpg',
        'Кашкавал.jpg',
        'Кренвирш.jpg',
        'Меглио.jpg',
        'Мляко.jpg',
        'Наденица.jpg',
        'Пиле.jpg',
        'Сирене.jpg',
        'Филе.jpg',
        'Хайдушка.jpg',
        'Чили.jpg'
    ];

    const saveState = () => {
        const boughtItems = [];
        document.querySelectorAll('.product-item.bought').forEach(item => {
            boughtItems.push(item.dataset.productName);
        });
        localStorage.setItem('boughtItems', JSON.stringify(boughtItems));
    };

    const loadState = () => {
        const boughtItems = JSON.parse(localStorage.getItem('boughtItems')) || [];
        boughtItems.forEach(productName => {
            const item = document.querySelector(`[data-product-name="${productName}"]`);
            if (item) {
                item.classList.add('bought');
            }
        });
    };

    images.forEach(image => {
        const productName = image.split('.')[0];
        const item = document.createElement('div');
        item.classList.add('product-item');
        item.dataset.productName = productName;

        const img = document.createElement('img');
        img.src = image;
        img.alt = productName;

        item.appendChild(img);
        productList.appendChild(item);

        item.addEventListener('click', () => {
            item.classList.toggle('bought');
            saveState();
        });
    });

    loadState();
});