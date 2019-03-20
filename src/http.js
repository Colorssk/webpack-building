let xhr = new XMLHttpRequest();
xhr.open('GET','/api/user'.true);
xhr.onload = ()=>{
    console.log(xhr.response);
}
xhr.send()