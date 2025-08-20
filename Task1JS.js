
// Read Url Link To View The Record

async function GetUsersUpdate() {
    try {
        const response = await fetch('https://dummyjson.com/users');
        const data = await response.json();

        const Value = data.users;
        const Key = Object.keys(Value[0]);

        let html = `<table class="table table-bordered table-striped"><thead><tr>`;

        Key.forEach(headerkeys => {
            html += `<th>${headerkeys}</th>`;
        });

        html += `</tr></thead><tbody>`;

        function formatNested(obj) 
        {
            let result = '';

            for (const [key, value] of Object.entries(obj)) 
            {
                if (value && typeof value === 'object') 
                    {
                         result += `${key}: \n ${formatNested(value)}`;
                    } 
                else 
                    {
                         result += `${key}: ${value}\n`;
                    }
            }
            return result;
        }

        Value.forEach(bodyvalues => {
            html += `<tr>`;

            Key.forEach(headerkeys => {
                let receiveinnnerdata = bodyvalues[headerkeys];

                if (typeof receiveinnnerdata === 'object' && typeof receiveinnnerdata !== null) {

                    receiveinnnerdata = formatNested(receiveinnnerdata);
                }

                html += `<td>${receiveinnnerdata}</td>`;
            });

            html += `</tr>`;
        });

        html += `</tbody></table>`;

        document.getElementById('receivegetapi').innerHTML = html;

    } catch (error) {
        console.error('Error:', error);
    }
}