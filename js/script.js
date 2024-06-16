// variabels  delaration 
var modelName = document.getElementById('ProName');
var ProOldprice = document.getElementById('ProOldprice');
var Proprice = document.getElementById('Proprice');
var Proimg = document.getElementById('Proimg');
var changewidth = document.getElementById('changeWidth');
var LeftSide = document.getElementById('LeftSide');
var rightSide = document.getElementById('rightSide');
var cartItenCount = document.getElementById('cartItenCount');

var dbData = JSON.parse(localStorage.getItem('product'));
if (dbData == null) {
    var productArrey = [];
    noProduct.style.display = 'block';
}
else {
    var productArrey = dbData;
    noProduct.style.display = 'none';
}
var storageData = JSON.stringify(productArrey);
localStorage.setItem('product', storageData)
noProductchek();
function noProductchek() {
    var noProduct = document.getElementById('noProduct');
    var viewProduct = document.getElementById('viewProduct');
    var localStorageData = JSON.parse(localStorage.getItem('product'));
    if (localStorageData.length == 0) {
        noProduct.style.display = 'block';
        viewProduct.style.backgroundColor = "white";
    }
    else {
        noProduct.style.display = 'none';
        viewProduct.style.backgroundColor = "whitesmoke";
    }
}

// add Product
function addProduct() {
    var obj = {
        'name': modelName.value,
        'oldprice': ProOldprice.value,
        'price': parseInt(Proprice.value),
        'quentity': 1,
        'image': Proimg.files[0].name,
        'id': Math.round((Math.random() * 899) + 100),
        'totalPrice': parseInt(Proprice.value)
    }
    var localStorageData = JSON.parse(localStorage.getItem('product'));
    productArrey.push(obj);
    var storageData = JSON.stringify(productArrey);
    localStorage.setItem('product', storageData);
    modelName.value = '';
    ProOldprice.value = '';
    Proprice.value = '';
    Proimg.files[0] = '';
    noProductchek();
    viweProduct();
    addProductPag();
}

// viwe products 
viweProduct()
function viweProduct() {
    var addData = document.getElementById('addData');
    var localStorageData = JSON.parse(localStorage.getItem('product'));
    var incressData = '';
    localStorageData.map((v, i) => {
        incressData += `<div class="w-48">`;
        incressData += `<div class="product d-flex row">`;
        incressData += `<div class="w-40">`;
        incressData += `<img src="images/${v.image}" alt="" width="100%" >`;
        incressData += `</div>`;
        incressData += `<div class="w-60">`;
        incressData += `<div class="d-flex justify-space-around justify-content-center flex-column h-100">`;
        incressData += `<h4>Model : ${v.name}</h4>`;
        incressData += `<h4>Old Price : <del>${v.oldprice}</del></h4>`;
        incressData += `<h4>Price : ₹ ${v.price} </h4>`;
        incressData += `<button class="atcButton" onclick="addToCart(${v.id},${i})">Add To Cart</button>`;
        incressData += `<a href="javascript:deleteItem(${i})" class="deleteIcon"><i class="ri-delete-bin-line"></i></a>`;
        incressData += `</div>`;
        incressData += `</div>`;
        incressData += `</div>`;
        incressData += `</div>`;

    });
    addData.innerHTML = incressData;
}

function deleteItem(i) {
    var localStorageData = JSON.parse(localStorage.getItem('product'));
    localStorageData.splice(i, 1);
    productArrey = localStorageData;
    var deletedData = JSON.stringify(localStorageData);
    localStorage.setItem('product', deletedData);
    noProductchek()
    viweProduct()
}

// add more button 
var num = 1;
function addProductPag() {
    if (num == 0) {
        LeftSide.style.left = "-100%";
        num = 1;
    }
    else {
        LeftSide.style.left = "0";
        num = 0;
    }
}
// add to cart button 
var num2 = 1;
function cartToPage() {
    if (num2 == 0) {
        rightSide.style.right = "-100%";
        num2 = 1;
    }
    else {
        rightSide.style.right = "0";
        num2 = 0;
    }
}

function resetData() {
    var localStorageData = JSON.parse(localStorage.getItem('product'));
    localStorageData = [];
    productArrey = localStorageData;
    var deletedData = JSON.stringify(localStorageData);
    localStorage.setItem('product', deletedData);
    noProductchek()
    viweProduct()
}

// add to cart ------------------------------------------------------------------------------------------------------------
var newProductArrey = [];
var blenkLScart = JSON.stringify(newProductArrey);
localStorage.setItem('cart', blenkLScart);
function addToCart(getid, i) {
    var localStorageData = JSON.parse(localStorage.getItem('product'));
    var findId = localStorageData[i].id;

    var localStoragecart = JSON.parse(localStorage.getItem('cart'));
    var apac = 0 // already product added in cart
    if (localStoragecart.length == 0) {
        newProductArrey.push(localStorageData[i]);
    }
    else {
        if (localStoragecart.find(localStoragecart => localStoragecart.id == getid)) {
            apac++; // already product add in cart message
        }
        else {
            newProductArrey.push(localStorageData[i]);
        }
    }
    var addTocart = JSON.stringify(newProductArrey);
    localStorage.setItem('cart', addTocart);

    // shoping icon after 
    cartItenCount.style.opacity = "1";
    cartItenCount.innerHTML = newProductArrey.length;

    // product add message 
    cartaddMessege();
    function cartaddMessege() {
        if (apac == 1) {
            var addMessage = document.getElementById('addMessage');
            addMessage.innerHTML = "data alredi added";
            addMessage.style.opacity = '1';
            setTimeout(() => {
                addMessage.style.opacity = '0';
            }, 2000);
        }
        else {
            var addMessage = document.getElementById('addMessage');
            addMessage.innerHTML = "Product added to cart successfully..";
            addMessage.style.opacity = '1';
            setTimeout(() => {
                addMessage.style.opacity = '0';
            }, 2000);
        }
    }
    TotalAmount()
    cartViewItems()
}

// cart page ----------------------------------------------------------------------------------------------------------
var cartViewData = document.getElementById('cartViewData');
function cartViewItems() {
    var localStorageData = JSON.parse(localStorage.getItem('cart'));


    if(localStorageData.length ==0)
    {
        document.querySelector('.nocartproduct').style.display = "block"
    }
    else {
        document.querySelector('.nocartproduct').style.display = "none"
    }

    var cartItems = '';
    cartItems += `<table>`;
    cartItems += `        <tr><td>No.</td><td>Item</td><td>Quentity</td><td>Price</td><td>Total amount</td><td>remove</td></tr>`;
    localStorageData.map((v, i) => {
        cartItems += `    <tr>`;
        cartItems += `       <td id="itemCount">${i + 1}</td>`;
        cartItems += `       <td><img src="images/${v.image}" alt="" height="50px"></td>`;
        cartItems += `       <td><div class="d-flex aligh-item-center justify-content-center"><a class="decrimentButton" href="javascript:quentitydec(${v.id})"><i class="ri-subtract-line"></i></a>`;
        cartItems += `       <p class="d-flex align-item-center">${v.quentity}</p>`;
        cartItems += `       <a class="incrimentButton" href="javascript:quentityinc(${v.id})"><i class="ri-add-line"></i></a></div></td>`;
        cartItems += `       <td>₹ ${v.price}</td>`;
        cartItems += `       <td class="carttotalprice">₹ ${v.totalPrice}</td>`;
        cartItems += `       <td><a href="javascript:deleteCartItem(${i})"><i class="ri-delete-bin-line"></i></a></td>`;
        cartItems += `    </tr>`;
    })
    cartItems += `</table>`;
    cartViewData.innerHTML = cartItems;
}

function quentityinc(id) {
    var localStorageData = JSON.parse(localStorage.getItem('cart'));
    localStorageData.map((v, i) => {
        if (id == v.id) {
            if (v.quentity == 10) {
                v.quentity = v.quentity;
                v.totalPrice = (v.quentity) * v.price;
            }
            else {
                v.quentity = v.quentity + 1;
                v.totalPrice = (v.quentity) * v.price;
            }
        };
        var addTocart = JSON.stringify(localStorageData);
        localStorage.setItem('cart', addTocart);
        cartViewItems()
        TotalAmount()
    })
}

function quentitydec(id) {
    var localStorageData = JSON.parse(localStorage.getItem('cart'));
    localStorageData.map((v, i) => {
        if (id == v.id) {
            if (v.quentity == 1) {
                v.quentity = v.quentity;
                v.totalPrice = (v.quentity) * v.price;
            }
            else {
                v.quentity = v.quentity - 1;
                v.totalPrice = (v.quentity) * v.price;
            }
        };
        var addTocart = JSON.stringify(localStorageData);
        localStorage.setItem('cart', addTocart);
        cartViewItems()
        TotalAmount()
    })
}

function TotalAmount() {
    var finalAmount = 0;
    var localStorageData = JSON.parse(localStorage.getItem('cart'));
    localStorageData.map((v, i) => {
        finalAmount += v.totalPrice;
    })

    document.getElementById('counting').innerHTML = "Total Amount : ₹ " + finalAmount;
}

function deleteCartItem(i) {
    var localStorageData = JSON.parse(localStorage.getItem('cart'));
    localStorageData.splice(i, 1);
    newProductArrey = localStorageData;
    if (newProductArrey.length == 0) {
        cartItenCount.style.opacity = 0;
    }
    else {
        cartItenCount.innerHTML = newProductArrey.length;
    }
    var deletedData = JSON.stringify(localStorageData);
    localStorage.setItem('cart', deletedData);
    cartViewItems();
    TotalAmount();
}

// searching products
var serachPro = document.getElementById('serachPro');
var searchingData = JSON.parse(localStorage.getItem('product'));
serachPro.addEventListener('keyup', () => {
    showSerchData()
})

// filter products 
var lowTohigh = document.getElementById('lowTohigh');
var temp=0;
lowTohigh.addEventListener('click',()=>{
    searchingData.map((v,i)=>{

        for(var I=0;I<searchingData.length;I++)
        {
            for(var J=I+1;J<searchingData.length;J++)
            {
                if(searchingData[I].price > searchingData[J].price)
                {
                    temp = searchingData[I];
                    searchingData[I] = searchingData[J];
                    searchingData[J] = temp;
                }
            }
        }

    })
    showSerchData()
})

var highTolow = document.getElementById('highTolow');
var temp=0;
highTolow.addEventListener('click',()=>{
    searchingData.map((v,i)=>{

        for(var I=0;I<searchingData.length;I++)
        {
            for(var J=I+1;J<searchingData.length;J++)
            {
                if(searchingData[I].price < searchingData[J].price)
                {
                    temp = searchingData[I];
                    searchingData[I] = searchingData[J];
                    searchingData[J] = temp;
                }
            }
        }
    })
    showSerchData()
})

function showSerchData()
{
    var incressData = '';
    searchingData.map((v, i) => {
        if (v.name.match(serachPro.value)) {
            incressData += `<div class="w-48">`;
            incressData += `<div class="product d-flex row">`;
            incressData += `<div class="w-40">`;
            incressData += `<img src="images/${v.image}" alt="" width="100%" >`;
            incressData += `</div>`;
            incressData += `<div class="w-60">`;
            incressData += `<div class="d-flex justify-space-around justify-content-center flex-column h-100">`;
            incressData += `<h4>Model : ${v.name}</h4>`;
            incressData += `<h4>Old Price : <del>${v.oldprice}</del></h4>`;
            incressData += `<h4>Price : ₹ ${v.price} </h4>`;
            incressData += `<button class="atcButton" onclick="addToCart(${v.id},${i})">Add To Cart</button>`;
            incressData += `<a href="javascript:deleteItem(${i})" class="deleteIcon"><i class="ri-delete-bin-line"></i></a>`;
            incressData += `</div>`;
            incressData += `</div>`;
            incressData += `</div>`;
            incressData += `</div>`;    
        }
    })
    addData.innerHTML = incressData;
}