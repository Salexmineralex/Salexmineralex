var ProjectName = parent.document.URL.substring(parent.document.URL.indexOf('=')+1, parent.document.URL.length);
console.log(ProjectName)

document.getElementById("slider").setAttribute("project",ProjectName)


fetch('../data.json',
{
    crossOrigin: null
})
.then((response) => response.json()
.then((json) =>  changeString(json[ProjectName])


));


function changeString(data)
{

    document.getElementById("projectName").textContent = data["Name"]
    document.getElementById("Lenguage").textContent = "Lenguage : "+data["Lenguaje"]
    document.getElementById("Framework").textContent = "Framework : "+data["Framework"]
    document.getElementById("Type").textContent = "Type : "+data["Type"]
 

}