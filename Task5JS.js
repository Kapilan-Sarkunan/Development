async function GetUsersUpdate() {
    try {
        const response = await fetch("https://dummyjson.com/users");
        const data = await response.json();

        let arrayvalue = [];

        arrayvalue = data.users.map(u => ({
            id: u.id,
            firstName: u.firstName,
            lastName: u.lastName,
            age: u.age,
            gender: u.gender,
            email: u.email
        }));

        function renderTable() {
            let html =
                `<table class="table table-bordered table-hover table-striped"
                    style="margin-top:60px; font-size: 15px;">
                    <thead class="table table-success table-striped text-center">
                        <tr>
                            <th>Action</th>
                            <th>Id <span onclick="Sorting(1)" style="cursor:pointer;">⇅</span></th>
                            <th>FirstName <span onclick="Sorting(2)" style="cursor:pointer;">⇅</span></th>
                            <th>Lastname <span onclick="Sorting(3)" style="cursor:pointer;">⇅</span></th>
                            <th>Age <span onclick="Sorting(4)" style="cursor:pointer;">⇅</span></th>
                            <th>Gender <span onclick="Sorting(5)" style="cursor:pointer;">⇅</span></th>
                            <th>Email <span onclick="Sorting(6)" style="cursor:pointer;">⇅</span></th>
                        </tr></thead><tbody>`;

            arrayvalue.forEach(user => {
                if (edituserid == user.id) {
                    html +=
                        `<tr>
                            <td>
                                <button class="btn btn-sm btn-success" onclick="SaveFunction(${user.id})">Save</button>
                                <button class="btn btn-sm btn-dark" onclick="CancelFunction()">Cancel</button>
                            </td>
                            <td>${user.id}</td>
                            <td><input type="text" id="fname-${user.id}" value="${user.firstName}"></td>
                            <td><input type="text" id="lname-${user.id}" value="${user.lastName}"></td>
                            <td><input type="number" id="age-${user.id}" value="${user.age}"></td>
                            <td><input type="text" id="gender-${user.id}" value="${user.gender}"></td>
                            <td><input type="email" id="email-${user.id}" value="${user.email}"></td>
                        </tr>`;
                } else {
                    html +=
                        `<tr>
                            <td>
                                <button class="btn btn-sm btn-primary" onclick="EditFunction(${user.id})">Edit</button>
                                <button class="btn btn-sm btn-danger" onclick="DeleteFunction(${user.id})">Delete</button>
                            </td>
                            <td>${user.id}</td>
                            <td>${user.firstName}</td>
                            <td>${user.lastName}</td>
                            <td>${user.age}</td>
                            <td>${user.gender}</td>
                            <td>${user.email}</td>
                        </tr>`;
                }
            });

            html += `</tbody></table>`;
            document.getElementById('receivegetapi').innerHTML = html;
        }

        let edituserid;

        window.EditFunction = function (id) {
            edituserid = id;
            renderTable();
        }

        window.SaveFunction = function (id) {
            const user = arrayvalue.find(u => u.id === id);
            user.firstName = document.getElementById(`fname-${id}`).value;
            user.lastName = document.getElementById(`lname-${id}`).value;
            user.age = document.getElementById(`age-${id}`).value;
            user.gender = document.getElementById(`gender-${id}`).value;
            user.email = document.getElementById(`email-${id}`).value;
            edituserid = null;
            renderTable();
        }

        window.CancelFunction = function () {
            if (edituserid != null) {
                edituserid = null;
                renderTable();
            } else {
                document.getElementById("AddFunction").innerHTML = "";
            }
        }

        window.DeleteFunction = function (id) {
            arrayvalue = arrayvalue.filter(user => user.id !== id);
            renderTable();
        }

        window.filterTable = function () {
            let input = document.getElementById("searchInput").value.toLowerCase();
            let data = document.querySelectorAll("tbody tr");

            data.forEach(getrowdata => {
                let value = getrowdata.innerText.toLowerCase();
                getrowdata.style.display = value.includes(input) ? "" : "none";
            });
        }

        let sortDirection = {};

        window.Sorting = function (colIndex) {
            const tbody = document.querySelector("tbody");
            const rows = [...tbody.querySelectorAll("tr")];

            sortDirection[colIndex] = !sortDirection[colIndex];
            const asc = sortDirection[colIndex];

            rows.sort((a, b) => {
                let A = a.cells[colIndex].innerText;
                let B = b.cells[colIndex].innerText;
                return asc
                    ? A.localeCompare(B, undefined, { numeric: true })
                    : B.localeCompare(A, undefined, { numeric: true });
            });

            rows.forEach(r => tbody.appendChild(r));
        }

        window.AddNewData = function () {
            let html =
                `<div id="formPopup" style="position: fixed; top: 0; left: 0;
                width: 100vw; height: 100vh; background: rgba(0, 0, 0, 0.4);
                display: flex; justify-content: center; align-items: center; z-index: 999;">

    <form style="
    background: #fff; 
    padding: 20px; 
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.3); 
    width: 300px; 
    text-align: center;">

        <h5>Add New User</h5>

        <input type="text" id="fname" class="form-control mb-1" placeholder="First Name"
            oninput="ValidateField('fname')" required>
        <div id="fnameError" class="text-danger mb-2 small"></div>

        <input type="text" id="lname" class="form-control mb-1" placeholder="Last Name" oninput="ValidateField('lname')"
            required>
        <div id="lnameError" class="text-danger mb-2 small"></div>

        <input type="number" id="age" class="form-control mb-1" placeholder="Age" oninput="ValidateField('age')"
            required>
        <div id="ageError" class="text-danger mb-2 small"></div>

        <input type="text" id="gender" class="form-control mb-1" placeholder="Gender" oninput="ValidateField('gender')"
            required>
        <div id="genderError" class="text-danger mb-2 small"></div>

        <input type="email" id="email" class="form-control mb-1" placeholder="Email" oninput="ValidateField('email')"
            required>
        <div id="emailError" class="text-danger mb-3 small"></div>

        <button type="button" class="btn btn-sm btn-success me-2" onclick="SaveNewData()">Save</button>
        <button type="button" class="btn btn-sm btn-dark" onclick="CancelFunction()">Cancel</button>
    </form>                

            </div>`;
            document.getElementById('AddFunction').innerHTML = html;
        }

        window.SaveNewData = function () {

            const firstName = document.getElementById("fname").value;
            const lastName = document.getElementById("lname").value;
            const age = document.getElementById("age").value;
            const gender = document.getElementById("gender").value;
            const email = document.getElementById("email").value;

            const newId = arrayvalue.length > 0 ? Math.max(...arrayvalue.map(u => u.id)) + 1 : 1;

            const newUser = {
                id: newId,
                firstName,
                lastName,
                age,
                gender,
                email
            };

            if (firstName && age && email != null) {
                arrayvalue.push(newUser);
                console.log("New User Added:", newUser);

                document.getElementById("AddFunction").innerHTML = "";
                renderTable();
            }
            else {
                CancelFunction();
            }
        }

        window.ValidateField = function (fieldId) {
            const value = document.getElementById(fieldId).value.trim();
            const error = document.getElementById(fieldId + 'Error');


            if (fieldId === 'fname') {
                error.textContent = value === '' ? 'First Name is required' : '';
            }

            if (fieldId === 'lname') {
                error.textContent = value === '' ? 'Last Name is required' : '';
            }

            if (fieldId === 'gender') {
                error.textContent = value === '' ? 'Gender is required' : '';
            }

            if (fieldId === 'email') {
                const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
                if (value === '') {
                    error.textContent = 'Email is required';
                } else if (!emailPattern.test(value)) {
                    error.textContent = 'Enter a valid email';
                } else {
                    error.textContent = '';
                }
            }

            if (fieldId === 'age') {
                if (value === '') {
                    error.textContent = 'Age is required';
                } else if (parseInt(value) < 18 || parseInt(value) > 99) {
                    error.textContent = 'Age must be between 18 and 99';
                } else {
                    error.textContent = '';
                }
            }
        }

        renderTable();
    }
    catch (error) {
        console.log('Error:', error);
    }
}
