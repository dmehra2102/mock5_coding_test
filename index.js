const countryTable = document.querySelector("tbody");
const mainForm = document.querySelector(".form-div");
const submitBtn = document.querySelector(".submit-btn");

async function CreateCountry(datas){
	let newData = await fetch("http://localhost:8080/countries",{
					method: "POST",
					headers: {
						'Accept': 'application/json',
                        'Content-Type': 'application/json'
					},
					body:JSON.stringify(datas)
				})
				
				const items = await newData.json();

				DispalyCountry(items);
}
				
submitBtn.addEventListener("click",(e)=>{
		e.preventDefault();
		let datas = FormSubmit();
		console.log(datas)
		if(datas){
			CreateCountry(datas);
			}
})
						
						
function FormSubmit(){
	var countryData={};
	countryData["id"] = Math.random()*506096004;
	countryData["country"] = document.querySelector("#country-name-input").value;
	countryData["city"] = document.querySelector("#city-name-input").value;
	countryData["population"] = document.querySelector("#population-input").value;
	return countryData;
}


async function fetchCountryData(){
	const datas = await fetch("http://localhost:8080/countries")
	.then((response)=> response.json())
	.catch((error)=> console.log(error));
	
	DispalyCountry(datas);
}



fetchCountryData();
function DispalyCountry(data){
	let ShowDataItem = data.map((item,index)=>{
		return `
		<tr class="country-item-card">
		<td>${index+1}</td>
		<td>${item.country}</td>
		<td>${item.city}</td>
		<td>${item.population}</td> 
		<td class="Edit-btn">Edit </td>
		<td class="Delete-btn" onClick="DeleteCountry()" value="{item.id}">Delete${item.id}</td>
		</tr>
		`
	}).join("");
	countryTable.innerHTML = ShowDataItem;
}

let idbtn = document.querySelector(".Delete-btn");
console.log(idbtn)
function DeleteCountry(event){
	event.preventDefault();
	fetch(`http://localhost:8080/countries/${data.id}`,{
		method: 'DELETE', 
		 headers: {
			'Content-type': 'application/json; charset=UTF-8' 
		},
	})
}