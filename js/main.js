var select=document.getElementById("select");
var select1=document.getElementById("select1");
var table=document.getElementById("table");
tbody=document.getElementById("tbody");

var api1="https://data.police.uk/api/crime-categories";
var api2=" https://data.police.uk/api/forces";

function getData(api){
    return new Promise(function(resolve,reject){
        fetch(api)
        .then(function(response){
            return response.json()
        })
        .then(function(json){
            resolve(json)
        })
        .catch(function(error){
            reject(error)
        })

    })
}

Promise.all([getData(api1), getData(api2)])
.then(function(responseArr) {
  console.log(responseArr);

  for(var i =0; i < responseArr[0].length;i++){
      opt=document.createElement("option");
      opt.setAttribute("value",responseArr[0][i].url)
      console.log(responseArr[0].length);
      opt.innerHTML=responseArr[0][i].name;
      select.append(opt);

  } 

  for(var i =0; i < responseArr[1].length;i++){
    opt=document.createElement("option");
    opt.setAttribute("value",responseArr[1][i].id)
    console.log(responseArr[1].length);
    opt.innerHTML=responseArr[1][i].name;
    select1.append(opt);

} 

})
.catch(function(error){
    console.log("error =>", error)
})

function search(){
    // if(select.options.selectedIndex == 1 && )
    tbody.innerHTML="";

    
    
    if(select.value == 0 && select1.value== 0){
        console.log("Please select")
    }
    else{
        console.log(select.value +" "+ select1.value);
        fetch('https://data.police.uk/api/crimes-no-location?category='+select.value+'&force='+select1.value)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            //resolve(data);
            console.log(data);
            console.log(data.length);

            var tr=document.createElement("tr");
                var td1=document.createElement("td");
                var td2=document.createElement("td");

                var td3=document.createElement("td");
            // td1.innerHTML="";
            // td2.innerHTML="";

            // td3.innerHTML="";

            if(data.length == 0){
                var h2=document.createElement("h2");
                
                td1.innerHTML="No Record Found";
                td1.colSpan="3";
                // td1.style.textAlign="center";
                tr.append(td1);
                tbody.append(tr);
            }
            else{
                for(var i =0 ; i < 49;i++){
                

                    td1.innerHTML+=data[i].category+"<br/>";
                    td2.innerHTML+=data[i].month+"<br/>";
                    td3.innerHTML+=data[i].outcome_status.category+"<br/>";
    
                    
                    
                        
    
                    
    
                    tr.append(td1);
                    tr.append(td2);
                    tr.append(td3);
    
                    tbody.append(tr);
    
    
    
    
                }
    
    
    
                console.log(data)

            }

            
        })
    }
    
}

