const cl = console.log;

const productContainer = document.getElementById('productContainer');
const loader = document.getElementById('loader');
const serachControl = document.getElementById('serachControl');

const productURL = `https://ecom-backend-tq7w.onrender.com/products`;

const createCards = (arr) => {
    let result = '';
    arr.forEach(ele => {
        result += `<div class="col-md-3" id='${ele._id}'>
        <div class="card">
          <div class="card-body p-0">
            <figure class="productCard">
              <img src="${ele.images[0]}" class="defaultImg" alt="${ele.title}" title="${ele.title}">

              <img src="${ele.images[1]}" class="hoverImg" alt="${ele.title}" title="${ele.title}">

              <figcaption class="icons">
                <ul>
                  <li><i class="fa-solid fa-thumbs-up"></i></li>
                  <li><i class="fa-solid fa-heart" onclick='onClickImg(this)'></i></li>
                  <li><i class="fa-solid fa-share-from-square"></i></li>
                  <li><i class="fa-solid fa-eye"></i></li>
                </ul>
              </figcaption>
            </figure>
          </div>
          </div>
           <div class="productInfo">
                <span>${ele.subcategory}</span>
                <h6 class="m-0">${ele.title}</h6>
                <small>${ele.total_price}</small>
            </div>
      </div>`
      

      
    });
    productContainer.innerHTML = result;
}

//    <div class="card-body">
    //     <div class="productInfo">
    //         <span>${ele.subcategory}</span>
    //         <h6 class="m-0">${ele.title}</h6>
    //         <small>${ele.total_price}</small>
    //     </div>

const onClickImg = (eve) => {
    eve.style.color = 'red'
}

const fetchProduct = () => {
    loader.classList.remove('d-none');
    fetch(productURL, {
        method : 'GET',
        body : null,
        headers : {
            Authorization : 'Token',
            'Content-Type' : 'Application/json'
        }
    })
    .then(res => res.json())
    .then(res => {
        cl(res);
        createCards(res);
        localStorage.setItem('data', JSON.stringify(res));
    })
    .catch(err => cl('error'))
    .finally(() => {
        loader.classList.add('d-none');
    })
}

fetchProduct();

const onKeyUp = (eve) => {
    let value = eve.target.value.toLowerCase();
    cl(value);
   let data = JSON.parse(localStorage.getItem('data'));
   cl(data);

    let filterArr = data.filter(ele => ele.subcategory.toLowerCase().includes(value));
    cl(filterArr);
    createCards(filterArr);
}

serachControl.addEventListener('keyup', onKeyUp);

