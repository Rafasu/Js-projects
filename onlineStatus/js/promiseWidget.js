function getJSON(url){
   return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onreadystatechange = handleResponse;
        xhr.onerror = function(error){
            reject(error);
        }
        xhr.send();

        function handleResponse(){
            if(xhr.readyState === 4 && xhr.status === 200){
                var employees = JSON.parse(xhr.responseText);
                resolve(employees);
            }
            else{
                reject(this.statusText);
            }   
        };
        
   }); 
}

var ajaxPromise = getJSON('../data/employees.json');


function generateItems(employees){
    var statusHTML = '';
    for (var i=0; i < employees.length; i += 1) {
      if (employees[i].inoffice === true) {
        statusHTML += '<li class="in">';
      } else {
        statusHTML += '<li class="out">';
      }
      statusHTML += employees[i].name;
      statusHTML += '</li>';
    }
    return statusHTML;
}

function generateUnoList(listItems){
    return '<ul class="bulleted>"' + listItems + '</ul>';
}

function addEmployeesToPage(unorderedList){
    document.getElementById('employeeList').innerHTML = 
    unorderedList;
}

ajaxPromise.then(generateItems)
            .then(generateUnoList)
            .then(addEmployeesToPage)
            .catch(function(error){
                console.log(error);

            });

