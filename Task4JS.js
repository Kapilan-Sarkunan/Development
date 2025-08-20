
//Add Search Button and Sorting To Filter The Data 

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
                         style="margin-top:60px; font-size: 15px; table-layout: fixed;">

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
                    html += `
                <tr>
                    <td>
                        <button class="btn btn-sm btn-success" onclick="SaveFunction(${user.id})">Save</button>
                        <button class="btn btn-sm btn-dark" onclick="CancelFunction()">Cancel</button>
                    </td>
                        <td>${user.id}</td>
                        <td><input type="text" id="fname-${user.id}" value="${user.firstName}"></td>
                        <td><input type="text" id="lname-${user.id}" value="${user.lastName}"></td>
                        <td><input type="number" id="age-${user.id}" value="${user.age}"></td>
                        <td><input type="text" id="gender-${user.id}" value="${user.gender}"></td>
                        <td><input type="mail" id="email-${user.id}" value="${user.email}"></td>
                </tr>`;
                }
                else {
                    html += `
                <tr>
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
            const user = arrayvalue.find(u => u.id === id);
            if (!user)
                return alert
                    ('User not found');
        }

        window.SaveFunction = function (id) {
            const user = arrayvalue.find(u => u.id === id);
            user.firstName = document.getElementById(`fname-${id}`).value;
            user.lastName = document.getElementById(`lname-${id}`).value;
            user.age = document.getElementById(`age-${id}`).value;
            user.gender = document.getElementById(`gender-${id}`).value;
            user.email = document.getElementById(`email-${id}`).value;

            edituserid = null;
            console.log("Updated Array:", arrayvalue);
            renderTable();
        }

        window.CancelFunction = function () {
            edituserid = null;
            renderTable();
        }

        window.DeleteFunction = function (id) {
            arrayvalue = arrayvalue.filter(user => user.id !== id);
            console.log("After Delete:", arrayvalue);
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
        renderTable();
    }
    catch (error) {
        console.log('Error:', error);
    }
}