# TASKS
- DONT USE AI :'(
- Implement HTTP server using Express in Node.js
- Get and Post Requests (FETCH API)
- Use a variable in the server to store the data and fetch the data and display it in your app using FETCH API


    // get request using queries
    // let responseFromServer = await fetch('http://localhost:4000/add?num1=3&num2=4');
    // console.log(responseFromServer);
    // let parsed = await responseFromServer.json();
    // console.log(parsed);

    // post request with body in asyn await form
    // try{
    //     let responseFromServer = await fetch('http://localhost:4000/add',{
    //         method:'POST',
    //         headers:{
    //             'Content-Type':'application/json'
    //         },
    //         body:JSON.stringify({
    //             n1:34,
    //             n2:45,
    //             dishasbf:"udith"
    //         })
    //     });
    //     console.log(responseFromServer);
    //     let parsed = await responseFromServer.json();
    //     console.log(parsed);
    // }
    // catch(err){
    //     console.log(err);
    // }

    // in promise format
    // fetch('http://localhost:4000/add',{
    //     method:'POST',
    //     headers:{
    //         'Content-Type':'application/json'
    //     },
    //     body:JSON.stringify({
    //         n1:34,
    //         n2:45,
    //         dishasbf:"udith"
    //     })
    // })
    // .then(resfromserver=>resfromserver.json())
    // .then(pars=>console.log(pars))
    // .catch(err=>{console.log(err)});