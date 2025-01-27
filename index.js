    
let listRecipes = [];
let listItems = [];
let textAreaItems = document.getElementById("textareaItem");
let btnYesDeleteSL = document.getElementById("btnYesDeleteSL");


btnYesDeleteSL.addEventListener("click", function (){
  listItems = [];
  document.getElementById('shopping-list').innerHTML = '';
  document.querySelector('.deleteShopingList').style.display = 'none';
  saveShopingList();
});
    //window.location.href = "./prova.html";
    //Menu options apper and disapear
    const buttonMenu = document.querySelector(".btnMenu");
    const menuOptionsBox = document.querySelector(".boxOptionMenu");
    menuOptionsBox.addEventListener("mouseenter", function (event) {
      menuOptionsBox.style.display = "block"
    })      
    buttonMenu.addEventListener("mouseenter", function (event) {
      menuOptionsBox.style.display = "block"
    })
    buttonMenu.addEventListener("mouseleave", function (event) {
      menuOptionsBox.style.display = "none"
    })
    menuOptionsBox.addEventListener("mouseleave", function (event) {
      menuOptionsBox.style.display = "none"
      })

      //Menu Add Recepie apper and disapear
      const buttonAddRecepie = document.querySelector(".btnAddRecipe");
      const menuRecepieBox = document.querySelector(".recipesBox");
      menuRecepieBox.addEventListener("mouseenter", function (event) {
        menuRecepieBox.style.display = "block"
      })      
      buttonAddRecepie.addEventListener("mouseenter", function (event) {
        menuRecepieBox.style.display = "block"
      })
      buttonAddRecepie.addEventListener("mouseleave", function (event) {
        menuRecepieBox.style.display = "none"
      })
      menuRecepieBox.addEventListener("mouseleave", function (event) {
        menuRecepieBox.style.display = "none"
      })


      //Add items to the list
      function addItem(fromRecepie=false, recipName ='none') {
        if (textAreaItems.value !== '') {          
          let shoppingList = document.getElementById("shopping-list");
          
          let newXBtn = document.createElement("button");
          let newA = document.createElement("a");
          let newLi = document.createElement('li');

          newXBtn.textContent = "x";
          newA.textContent = textAreaItems.value;
          listItems.push(textAreaItems.value);
          saveShopingList();


          //Add the event listener to singn the element
          newA.addEventListener("click", function (){
            newA.classList.toggle("lineThrough");
          });

          newXBtn.addEventListener("click", function (){
            shoppingList.removeChild(newLi);
          });         
          
          newLi.classList.add("item");
          newLi.appendChild(newXBtn);
          newLi.appendChild(newA);

          
          //Span recepie
          if (fromRecepie===true) {            
            let newSpan = document.createElement("span");
            newSpan.innerText = ` (${recipName})`;

            newLi.appendChild(newSpan);
          }
          shoppingList.appendChild(newLi);
          document.getElementById("textareaItem").value = '';
        }        
      }
      
//Function that make the delete shoping list option appear
function deleteShopingListAppear() {
  const boxWindow = document.querySelector(".deleteShopingList");
  boxWindow.style.display = "block";
  let widthBox = getComputedStyle(boxWindow).width;
  const screenWidth = window.innerWidth;
  let boxWindowLeft = Math.floor(Number(screenWidth) / 2) - (Number(widthBox.slice(0, -2)) / 2) + "px"; //Delete shopping list centre calculation     
  boxWindow.style.left = boxWindowLeft;
}

//recipe object
class Recipe {
  constructor(name, ingredients) {
    this.name = name;
    this.ingredients = ingredients;
  }
}


// Function that read the cookie
function readCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) {
    return decodeURIComponent(match[2]); // Return the cookie value (decoded)
  }
  return null; // Return null if the cookie doesn't exist
}


// Function that load the recipes list
function loadRecipes() {
  let stringArrey = readCookie('recipes');
  listRecipes = JSON.parse(stringArrey);  
  noRecipes = document.getElementById("noRecipesSL");
  let boxRecipes = document.querySelector(".recipesBox");
  
  if (listRecipes.length !== 0) {
    noRecipes.style.display = "none";
    for (let i = 0; i < listRecipes.length; i++) {
      let newRecipe = document.createElement("a");
      newRecipe.innerText = listRecipes[i].name;
      newRecipe.classList.add("recipes");
      newRecipe.value = i;
      //add event listener
      newRecipe.addEventListener("click", function () {
        for (let j = 0; j < listRecipes[newRecipe.value].ingredients.length; j++) {
          document.getElementById('textareaItem').value = listRecipes[newRecipe.value].ingredients[j];          
          addItem(true, listRecipes[newRecipe.value].name);
        }
      });
      boxRecipes.appendChild(newRecipe);
    }
  } else {
    noRecipes.style.display = "block";
  }
}
loadRecipes();


function saveShopingList() {
  let jsonString = JSON.stringify(listItems, "null", 2);
  
  document.cookie = "shopingList=" + encodeURIComponent(jsonString) + "; expires=Sun, 1 Jannuary 2030 12:00:00 UTC; path=/";  
  console.log(document.cookie); //ERASE ME
}


function loadShopingList() {
  let stringArrey = readCookie('shopingList');
  let listItemsLoad = JSON.parse(stringArrey);
  
  for (let i = 0; i < listItemsLoad.length; i++) {
    textAreaItems.value = listItemsLoad[i];
    addItem();
  }
}
loadShopingList();


      