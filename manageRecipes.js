//Manage Recipes
//MANAGE RECIPES
//Variable


let listRecipes = [];
let indexRecipes = listRecipes.length;
let ingredientList = document.getElementById("ingredientListJS");
let manageRecipesBox = document.getElementById("manageRecipesBoxJS");
let deleteRecipesBox = document.getElementById("deleteRecipesBoxJS");
let emptyManageRecipe = document.getElementById("addRJS");
let emptyDeleteRecipe = document.getElementById("noRJS");
let ingredientInputText = document.getElementById("textAreaIngrJS");
let recipeName = document.getElementById("recipeName");
let addANDmanage = true;

//loading recepies

function loadRecipes(){
  let stringArrey = readCookie('recipes');
  listRecipes = JSON.parse(stringArrey);  

  manageRecipesBox.innerHTML = "";
  manageRecipesBox.appendChild(emptyManageRecipe);
  deleteRecipesBox.innerHTML = "";
  deleteRecipesBox.appendChild(emptyDeleteRecipe);

  loadRecipesBox(manageRecipesBox, emptyManageRecipe);
  loadRecipesBox(deleteRecipesBox, emptyDeleteRecipe);
};
//load the recepies from the cookie
loadRecipes();


function loadRecipesBox(box, empty) {
  if (listRecipes.length > 0) {
    empty.style.display = "none";
    
    
    
    
    for (let i = 0; i < listRecipes.length; i++) {
      let newARecipe = document.createElement("a");
      newARecipe.classList.add("recipes");
      newARecipe.classList.add("aJS");
      newARecipe.innerText = listRecipes[i].name;
      newARecipe.value = i;     
      
      //add event listener HERE
      if (box.id === "manageRecipesBoxJS") {
        newARecipe.addEventListener("click", function () {
          addANDmanage = false;
          indexRecipes = newARecipe.value; //recipe index
          manageRecipes();
          //loading recipe
          ingredientInputText.value = listRecipes[indexRecipes].name;          
          addRecipeElement();          
          for (let j = 0; j < listRecipes[indexRecipes].ingredients.length; j++) {
            ingredientInputText.value = listRecipes[indexRecipes].ingredients[j];
            addRecipeElement();  
          };


        
        });
      } else {
        newARecipe.addEventListener("click", function (){          
          let aRecipe = document.getElementsByClassName("aJS");
          for (let i = 0; i < aRecipe.length; i++) {             
            if (aRecipe[i].value > newARecipe.value) {
              aRecipe[i].value -= 1; 
            } else if (aRecipe[i].value === newARecipe.value) {
              aRecipe[i].remove();
            };
          };
          listRecipes.splice(newARecipe.value, 1);
          saveFileRecipes();
          loadRecipes();
          
        });
      }
      
      box.appendChild(newARecipe);      
    }
  } else {
    empty.style.display = "block";
  }
};



//Menu Manage Recepie apper and disapear
const btnManRec = document.querySelector(".btnManRec");
const menuManageRecepieBox = document.querySelector(".manageRecipesBox");
menuManageRecepieBox.addEventListener("mouseenter", function (event) {
  menuManageRecepieBox.style.display = "block"
})      
btnManRec.addEventListener("mouseenter", function (event) {
  menuManageRecepieBox.style.display = "block"
})
btnManRec.addEventListener("mouseleave", function (event) {
  menuManageRecepieBox.style.display = "none"
})
menuManageRecepieBox.addEventListener("mouseleave", function (event) {
  menuManageRecepieBox.style.display = "none"
})

//Menu Delete Recepie apper and disapear
const btnDelRec = document.querySelector(".btnDelRec");
const menuDeleteRecepieBox = document.querySelector(".deleteRecipesBox");
menuDeleteRecepieBox.addEventListener("mouseenter", function (event) {
  menuDeleteRecepieBox.style.display = "block"
})      
btnDelRec.addEventListener("mouseenter", function (event) {
  menuDeleteRecepieBox.style.display = "block"
})
btnDelRec.addEventListener("mouseleave", function (event) {
  menuDeleteRecepieBox.style.display = "none"
})
menuDeleteRecepieBox.addEventListener("mouseleave", function (event) {
  menuDeleteRecepieBox.style.display = "none"
})

// event listener add name

let btnAddName = document.querySelector(".addButton");
let btnWidth = document.getElementById("btnwidth");

recipeName.addEventListener("input", function () {
  if (recipeName.value === "") {
    btnAddName.innerHTML = "<span class='plus'>+ </span>Add Name";
  } else {
    btnAddName.innerHTML = "<span class='plus'>+ </span>Add Ingredient";
  }
});

recipeName.addEventListener('input', function () {      
  btnWidth.style.fontSize = "1.2rem";      
  btnWidth.innerHTML = (recipeName.value).replace(/ /g, "f");//replace the spaces that the button doesn't recognize
  let widthMesure =  window.getComputedStyle(btnWidth).width;
  recipeName.style.width = widthMesure;
});   

function backButton(){
  let btncheck = document.querySelector(".a");
  displaycheck = window.getComputedStyle(btncheck).display;  
  if (displaycheck === "none") {
    manageRecipes();
    recipeName.value = "";    
    recipeName.display = "none";
    btnAddName.innerHTML = "<span class='plus'>+ </span>Add Name";
    ingredientList.innerHTML = "";
    loadRecipes();
  } else {
    window.location = "./index.html";
  }
  btnSaveFirstPress = false;
}


function manageRecipes() { 
  document.querySelector(".a").classList.toggle("noneDisplay");
  document.querySelector(".b").classList.toggle("noneDisplay");
  document.querySelector(".c").classList.toggle("noneDisplay");
  document.querySelector(".d").classList.toggle("noneDisplay");
  document.querySelector(".e").classList.toggle("noneDisplay");  
}


function addRecipeElement() {   
  if (ingredientInputText.value !== "") {
     
    //create elements
    let newLi = document.createElement("li");
    let newBtnX = document.createElement("button");
    let newInputText = document.createElement("input");

    //add classes and attribute
    newLi.classList.add("item");
    newInputText.value = ingredientInputText.value;
    newBtnX.innerText = "x";
    //add listener event
    newBtnX.addEventListener("click", function () {
      ingredientList.removeChild(newLi);
    });

    newInputText.addEventListener('input', function () {      
      btnWidth.style.fontSize = "1rem";      
      btnWidth.innerHTML = (newInputText.value).replace(/ /g, "f");//replace the spaces that the button doesn't recognize
      let widthMesure =  window.getComputedStyle(btnWidth).width;
      newInputText.style.width = widthMesure;
    });   

    //add child
    if (recipeName.value === "") {
      recipeName.value = ingredientInputText.value; 
      recipeName.style.display = "block";
      btnAddName.innerHTML = "<span class='plus'>+ </span>Add Ingredient";
      btnWidth.style.fontSize = "1.2rem";      
      btnWidth.innerHTML = (recipeName.value).replace(/ /g, "f");//replace the spaces that the button doesn't recognize
      let widthMesure =  window.getComputedStyle(btnWidth).width;
      recipeName.style.width = widthMesure;
    } else {
      newLi.appendChild(newBtnX);
      newLi.appendChild(newInputText);
      ingredientList.appendChild(newLi);
      btnWidth.style.fontSize = "1rem";
      btnWidth.innerHTML = (newInputText.value).replace(/ /g, "f");//replace the spaces that the button doesn't recognize
      let widthMesure =  window.getComputedStyle(btnWidth).width;
      newInputText.style.width = widthMesure;
    }

    ingredientInputText.value = "";    
  }    
}


// Function save Recipe
class Recipe {
  constructor(name, ingredients) {
    this.name = name;
    this.ingredients = ingredients;
  }
}


let btnSaveFirstPress = false;
function saveRecipe() {
  let inputElements = document.querySelectorAll("input");
  let ingredients = [];
 
  for (let i = 2; i <inputElements.length; i++) {
    ingredients.push(inputElements[i].value);
  } 
  let newRecipe = new Recipe(document.getElementById("recipeName").value, ingredients);
  
  if (addANDmanage===true) {
    if(btnSaveFirstPress === false) {
      indexRecipes = listRecipes.lenght;
      listRecipes.push(newRecipe);
      btnSaveFirstPress = true;    
    } else {    
      listRecipes.pop();
      listRecipes.push(newRecipe);
    }
  } else {
    listRecipes[indexRecipes] = newRecipe;
    addANDmanage = true
  }
  saveFileRecipes();
}


// Function that save athe recipes in a cookie 
function saveFileRecipes() {  
  let jsonString = JSON.stringify(listRecipes, "null", 2);  
  document.cookie = "recipes=" + encodeURIComponent(jsonString) + "; expires=Sun, 1 Jannuary 2030 12:00:00 UTC; path=/";  
  console.log(document.cookie); //ERASE ME 
}


// Function that read the cookie with the recipes
function readCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) {
    return decodeURIComponent(match[2]); // Return the cookie value (decoded)
  }
  return null; // Return null if the cookie doesn't exist
}

