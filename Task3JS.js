
//Change the Table Field Into Text Field 

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
            let html = `<table class="table table-bordered table-hover table-striped">

            <thead class="table table-dark table-striped">
            <tr>
                <th>Action</th>
                <th>Id</th>
                <th>FirstName</th>
                <th>Lastname</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Email</th>
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
        renderTable();
    }
    catch (error) {
        console.log('Error:', error);
    }
}