
//Add Edit delete Button 

async function GetUsersUpdate() 
{
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

        function renderTable() 
        {
            let html = `<table class="table table-bordered table-striped"><thead><tr>
                <th>Action</th>
                <th>Id</th>
                <th>FirstName</th>
                <th>Lastname</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Email</th>
            </tr></thead><tbody>`;

            arrayvalue.forEach(user => 
            {
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
            });

            html += `</tbody></table>`;
            document.getElementById('receivegetapi').innerHTML = html;
        }

        window.EditFunction = function(id) 
        {
            const user = arrayvalue.find(u => u.id === id);
            if (!user) 
            return alert
            ('User not found');

            const newFirstName = prompt("Enter new First Name:", user.firstName);
            const newLastName = prompt("Enter new Last Name:", user.lastName);
            const newage = prompt("Enter new Age:", user.age);
            const newgender = prompt("Enter new Gender:", user.gender);
            const newEmail = prompt("Enter new Email:", user.email);

            if (newFirstName && newLastName) 
            {
                user.firstName = newFirstName;
                user.lastName = newLastName;
                user.age = newage;
                user.gender = newgender;
                user.email = newEmail;
                console.log("Updated Array:", arrayvalue);
                renderTable();
            }
        }
        window.DeleteFunction = function(id) 
        {
            arrayvalue = arrayvalue.filter(user => user.id !== id);
            console.log("After Delete:", arrayvalue);
            renderTable(); 
        }
        renderTable();
    } 
    catch (error) 
    {
        console.log('Error:', error);
    }
}