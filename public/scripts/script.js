
const select = document.querySelector("#food-select")
const tableFood = document.querySelector(".selected-food tbody")

async function foodName() {
   
   const foodId = select.value

    const URL = `https://taco-food-api.herokuapp.com/api/v1/food/${foodId}`

    const api = await fetch(URL)
    const [food] = await api.json()

    selectedFood(food)

}

function selectedFood(food) {
    
    if(food) {
    let carboidratos = ""
    let proteinas = ""
    let gorduras = ""

    const id = food.id
    const nome = food.description.replace(","," -") 
    const quantidade = food.base_qty + "g"

    // VERIFICAÇÃO SE TEM A PROPRIEDADE PROTEINA NO OBJETO
    if(!food.attributes.hasOwnProperty("protein")) {
        proteinas = `0g`
    } else {
        proteinas = food.attributes.protein.qty.toFixed(2) + "g"
    }

    // VERIFICAÇÃO SE TEM A PROPRIEDADE CARBOIDRATO NO OBJETO    
    if(!food.attributes.hasOwnProperty("carbohydrate")) {
        carboidratos = `0g`
    } else {
        carboidratos = food.attributes.carbohydrate.qty.toFixed(2) + "g"
    }

    // VERIFICAÇÃO SE TEM A PROPRIEDADE GORDURA NO OBJETO    
    if(!food.attributes.hasOwnProperty("lipid")) {
        gorduras = `0g`
    } else {
        gorduras = food.attributes.lipid.qty.toFixed(2) + "g"
    }

    createHtml(nome,carboidratos,proteinas,gorduras,id)
    const deleteBtn = document.querySelectorAll(".deleteBtn")
    deleteButton(deleteBtn)

    let alimentos = document.querySelectorAll(".alimento")
    alimentos.forEach(changeValue)
    }
}

function createHtml(nome,carboidratos,proteinas,gorduras,id) {

    const newTr = ` <tr class="alimento">
                        <td>${nome}</td>
                        <td>
                        <input type="text" name="newQt" class="newQt" value=""><span>g</span>
                        </td>
                        <td class="carboidrato" value="${+carboidratos.replace("g","")}">${carboidratos}</td>
                        <td class="proteina" value="${+proteinas.replace("g","")}">${proteinas}</td>
                        <td class="gordura" value="${+gorduras.replace("g","")}">${gorduras}</td>
                        <td class="delBtnTd"><button class="deleteBtn">X</button></td>
                    </tr>`
    return tableFood.innerHTML += newTr
}

function deleteButton(deleteBtn) {
    deleteBtn.forEach(delBtn => {
        delBtn.addEventListener("click", (e)=> {

            let rowToDelete = e.target.parentElement.parentElement.rowIndex
    
            tableFood.deleteRow(rowToDelete)        
        })
    })
}

function changeValue(alimento) {

        const carbo = alimento.querySelector(`.carboidrato`)
        const protein = alimento.querySelector(`.proteina`)
        const lip = alimento.querySelector(`.gordura`)
        let input = alimento.querySelector(".newQt")

        const proteinValue = Number(alimento.querySelector(`.proteina`).getAttribute("value"))
        const carboValue = Number(alimento.querySelector(`.carboidrato`).getAttribute("value"))
        const lipValue = Number(alimento.querySelector(`.gordura`).getAttribute("value"))

        input.addEventListener("keyup",(e)=> {
            let newCarbo = (e.target.value * carboValue / 100).toFixed(2)
            let newProt = (e.target.value * proteinValue / 100).toFixed(2)
            let newLip = (e.target.value * lipValue / 100).toFixed(2)
            
            carbo.innerText  = newCarbo + "g"
            protein.innerText  = newProt + "g"
            lip.innerText  = newLip + "g"
            input.setAttribute("value", e.target.value)
        })
}

select.addEventListener("change", foodName)