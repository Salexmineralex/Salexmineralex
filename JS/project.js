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


window.addEventListener('DOMContentLoaded', () => {
    const projectName = document.getElementById('projectName');
    const projectNameText = projectName.textContent;
    const containerWidth = projectName.parentElement.offsetWidth; // Get container width

    // Calculate ideal font size based on container width and text length
    const fontSize = Math.min(100, containerWidth / projectNameText.length);

    // Set the font size dynamically
    projectName.style.fontSize = fontSize + 'px';
});
