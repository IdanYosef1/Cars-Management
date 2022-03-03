const urlUsers = "https://jsonplaceholder.typicode.com/users";
const urlCars = "https://carsmanagement.herokuapp.com/api/cars";


/* The function saves in session storage the false value that corresponds to the islogged key and 
   redirects the user to the login page. */
function logout(){
    window.location.href = 'index.html';
}

/* Clicking on button "Login" in Login page activates the function.
   The function checks if the user's information is in the database
   and if so then the function redirects the browser to the main page and otherwise a message is displayed to the user.
   If an error occurred in request to get all users then an error message is printed to the console.*/
async function login(){
    const username = document.getElementById("username").value;
    const Email = document.getElementById("useremail").value;
    const response = await fetch(urlUsers);
    if(response.ok){
        const users = await response.json();
        const bool = users.some((user) => {
            return (user.username === username && user.email === Email);  
        });
        if(bool){
            sessionStorage.setItem("username", username);
            window.location.href = "main.html";
        }
        else{
            alert("The Username or Email you entered is not registered on the site.");
            document.getElementById("username").value = "";
            document.getElementById("useremail").value = "";
        }
    }
    else{
        console.log("Error");
    }
}

/* The function is activated when the main page is loaded.
   The function gets the username from the session storage and updates the innerText of the element whose id is span.
   The function sends a request to the server to get all cars and creates a table by car details.
   If an error occurred in request to get all cars then an error message is printed to the console */
async function showCars(){
    const username = document.getElementById("span");
    const table = document.getElementById("Table");
    username.innerText = sessionStorage.getItem('username');
    const response = await fetch(urlCars);
    if(response.ok){
        const cars = await response.json();
        cars.forEach(car => {
            const row = document.createElement('tr');
            row.id = `tr${car._id}`;
            row.innerHTML = `
            <td>${car.model}</td>
            <td>${car.color}</td>
            <td>${car.numOfWheels}</td>
            <td>
                <button id=${car._id} onclick="editCar(id)" class="btn btn-outline-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                    class="bi bi-pencil" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 
                        2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 
                        11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 
                        1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 
                        12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                </button>
            </td>
            <td>
                <button id=${car._id}  onclick="deleteCar(id)"  class="btn btn-outline-danger ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" fill="currentColor"
                     class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 
                        0 0 1 .708 0Z"/>
                        <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 
                        0 0-.708 0Z"/>
                    </svg>
                </button>
            </td> `;
            table.append(row);
        });
    }
    else{
        console.log("Error");
    }
}

/* Clicking on button "Create New Car" in main page activates the function.
   The function redirects the browser to the 'Create New Car' page. */
function createNewCar(){
    window.location.href = 'create.html';
}

/* Clicking on button "Create" in create page activates the function.
   The function checks if all the fields in the form are filled out
   and if so then she sends a request to the server to create new car, redirects the browser to the main page
   and otherwise a message is displayed to the user.
   If an error occurred in request to create new car then an error message is printed to the console.*/
async function create(){
    const Model = document.getElementById("model").value;
    const Color = document.getElementById("color").value;
    const NumOfWheels =  +document.getElementById("numOfWheels").value;
    if(Model !== "" && Color !== "" && NumOfWheels > 0){
        const newCar = {
            model: Model,
            color: Color,
            numOfWheels: NumOfWheels
        };
        const response = await fetch(urlCars, {
            method:"post",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(newCar)
        });
        if(response.ok){
            window.location.href = 'main.html';
        }
        else{
            console.log("Error");
        }
    }
    else{
        alert("Not all fields are filled or the Num Of Wheels is less than 1");
    }
}

/* Clicking on button "Delete" in main page activates the function.
   The function deletes the car from the database by id If an error occurred in
   request to delete car then an error message is printed to the console
   and otherwise the corresponding row is deleted from the table. */ 
async function deleteCar(id){
    const response = await fetch(`${urlCars}/${id}`, {
        method:"delete",
    });
    if(response.ok){
        const row = document.getElementById(`tr${id}`);
        row.remove();
    }
    else{
        console.log("Error");
    }
}

/* Clicking on button "Edit" in main page activates the function.
   The function saves the ID of the car in session storage and redirects the browser to the 'Edit Car' page. */
function editCar(id){
    sessionStorage.setItem('carId', id);
    window.location.href = "edit.html";
}

/* The function is activated when the 'Edit Car' page is loaded.
   The function sends a request to the server to get the car by the id in session storage 
   and updates the value of the corresponding elements.
    If an error occurred in request to get car then an error message is printed to the console.*/ 
async function editPage(){  
    const carId = sessionStorage.getItem('carId');
    const response = await fetch(`${urlCars}/${carId}`);
    if(response.ok){
        const car = await response.json();
        document.getElementById("model").value = car.model;
        document.getElementById("color").value = car.color;
        document.getElementById("numOfWheels").value = car.numOfWheels;
    }
    else{
        console.log("Error");
    }
}

/* Clicking on button "Update" in edit page activates the function.
   The function checks if all the fields in the form are filled out
   and if so she sends a request to the server to update the car by the id in session storage, updates the car in the database,
   redirects the browser to the main page and otherwise a message is displayed to the user.
   If an error occurred in request to update car then an error message is printed to the console.*/ 
async function updateCar(){
    const Model = document.getElementById("model").value;
    const Color = document.getElementById("color").value;
    const NumOfWheels =  +document.getElementById("numOfWheels").value;
    if(Model !== "" && Color !== "" && NumOfWheels > 0){
        const carId = sessionStorage.getItem('carId');
        const CarObj = {
            model: Model,
            color: Color,
            numOfWheels: NumOfWheels
        };
        const response = await fetch(`${urlCars}/${carId}`, {
            method:"put",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(CarObj)
        });
        if(response.ok){
            window.location.href = 'main.html';
        }
        else{
            console.log("Error");
        }
    }
    else{
        alert("Not all fields are filled or the Num Of Wheels is less than 1");
    }
}
