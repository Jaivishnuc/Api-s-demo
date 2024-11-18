function displayContent(option, radioButton) {
    $(".content").hide();
    $("#" + option).toggle();
    $("label").removeClass("active");
    $("#home").removeClass("active");
    $(radioButton).closest("label").addClass("active");
    $('#output').hide();
    $('#warning').hide();
}

function homeClick(){
    $("label").removeClass("active");
    $("#option1").hide();
    $("#option2").hide();
}
//url shortner
var ele= document.getElementById('shortenBtn');
ele.addEventListener('click', async () => {
    const url = document.getElementById('urlInput').value;
    const output = document.getElementById('output');
    //url validator
    if (!url) {
        $('#output').show();
        output.innerHTML = '<span style="color: red; font-style: italic; ">Please enter any valid URL!</span>';
        return;
    }

    try {
        // Free API example using TinyURL
        const response = await fetch(`https://api.tinyurl.com/create`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer BM0PPFyxJ5LRkJNflbxpTNBOrYvYbIV1Kail2kM6Ba20uCVGAXyBeeZMBrrw", 
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                url: url
            })
        });

        if (!response.ok) {
            throw new Error("enter a valid URL!");
        }

        const data = await response.json();
        $('#output').show();
        output.innerHTML = `
            <p class="outputTxt">Shortened URL:</p>
            <a href="${data.data.tiny_url}" target="_blank" class="resultUrl">${data.data.tiny_url}</a>
        `;
    } catch (error) {
        $('#output').show();
        output.innerHTML = `<span style="color: red;"> Please ${error.message}</span>`;
    }
});


//currency convertor
var select = document.querySelectorAll('.currency');
var btn = document.getElementById('convertBtn');
var ip= document.getElementById('input1');

$("#input1, #country1, #country2").click(function(){
    $("#warning").hide();
})

fetch('https://api.frankfurter.app/currencies')
.then(res=>res.json())
.then(res=>displayCountry(res))

function displayCountry(res){
    let curren= Object.entries(res);
    for(let i=0;i<curren.length;i++){
        let opt = `<option value="${curren[i][1]}" data-id="${curren[i][0]}">${curren[i][1]}</option>`
        select[0].innerHTML += opt;
        select[1].innerHTML += opt;
    }
}

function displayCountryId(dd){
    let selval = dd.options[dd.selectedIndex].getAttribute('data-id');
    if(dd.id =='country1'){
         document.getElementById('curId1').innerHTML  = selval;
    }
    else if(dd.id=='country2'){
         document.getElementById('curId2').innerHTML  = selval;
    }
}

btn.addEventListener('click', async () => {
    let country1 = document.getElementById('curId1').innerHTML;
    let country2 = document.getElementById('curId2').innerHTML;
    let input = ip.value;
    if(country1 == country2){
        $("#warning").show();
        $("#warning").html(`<span style="color: red;font-style: italic;"> Same countries selected. </span>`);
    }
    else if(input == ""){
        $("#warning").show();
        $("#warning").html(`<span style="color: red;font-style: italic;"> Please enter Valid value. </span>`);
    }
    else{
        convert(country1, country2, input);
    }
})

function convert(cou1, cou2, inp){
    fetch(`https://api.frankfurter.app/latest?base=${cou1}&symbols=${cou2}`)
    .then((resp) => resp.json())
    .then((data) => {
        const convertedAmount = (inp * data.rates[cou2]).toFixed(2);
        document.getElementById('result').innerHTML  = convertedAmount;
    });
}
