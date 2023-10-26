var getpages = document.getElementsByClassName('page');
var getdots = document.getElementsByClassName('dot');
// console.log(getpages);
var getform = document.getElementById('form');
var getprevbtn = document.getElementById('prevbtn');
var getnextbtn = document.getElementById('nextbtn');
const getrstcontainer = document.getElementById('result-container');
var objkey = ['email', 'password', 'firstname', 'lastname', 'dob', 'phno', 'address'];
var datas = [];

var curridx = 0;

showpage(curridx);

function showpage(num) {
    
    getpages[num].style.display = "block";

    num === 0 ? getprevbtn.style.display = "none" : getprevbtn.style.display = "inline-block";

    num === (getpages.length - 1) ? getnextbtn.textContent = "Submit" : getnextbtn.textContent = "Next";

    dotindicator(num);
    
}

function dotindicator(num) {
    for (var x = 0; x < getdots.length; x++){
        getdots[x].classList.remove("active");
    }

    getdots[num].className += " active";
}


function gonow(num) {
    // if (formvalidation() && num === 1) {
    //     getpages[curridx].style.display = "none";
    
    //     curridx = curridx + num;

    //     if (curridx >= getpages.length) {
    //         getform.onsubmit();
    //     }

    //     showpage(curridx);
    // }

    if (num === 1 && !formvalidation()) return false;

    getpages[curridx].style.display = "none";
    
    curridx = curridx + num;
    if (curridx >= getpages.length) {
        // getform.submit();

        getform.style.display = "none";
        getrstcontainer.style.display = "block";
        result(datas);

        console.log(datas);

        return false;
    }
    showpage(curridx);

}

function* genfun() {
    var index = 0;
    while (index < objkey.length) {
        yield index++;
    }
}

let gen = genfun();

function formvalidation() {

    var valid = true;
    var getcurrinput = getpages[curridx].getElementsByTagName('input');
    // console.log(getpages[curridx]);
    // console.log(getcurrinput);

    for (var x = 0; x < getcurrinput.length ; x++){
        if (getcurrinput[x].value === '') {
            getcurrinput[x].classList.add('invalid');
            valid = false;
        } else {
            // console.log(getcurrinput[x].value);

        //    Method 1
            // const keys = objkey[gen.next().value];
            // const values = getcurrinput[x].value;
            // const obj = {
            //     [keys] : values
            // }
            
            // Method 2
            // const keys = objkey[gen.next().value];
            // const values = getcurrinput[x].value;
            // var obj = {};
            // obj[keys] = values;

            // Method 3 
            const keys = objkey[gen.next().value];
            const values = getcurrinput[x].value;

            datas.push({[keys]:values});
        }
    }

    if (valid) {
        getdots[curridx].className += " done";
    }
    return valid;
}

function result(data) {
    // console.log(data);
    

    getrstcontainer.innerHTML = `
        <ul>
            <li>Name : ${data[2].firstname} ${data[3].lastname}</li>
            <li>Email : ${data[0].email}</li>
            <li>Date of Birth : ${data[4].dob}</li>
            <li>Phone Number : ${data[5].phone}</li>
            <li>Address : ${data[6].address}</li>
        </ul>

        <button type="submit" class="submit-btn" onclick="submitbtn()">Apply Now</button>
    `;
}

function submitbtn() {
    getform.submit();
}
