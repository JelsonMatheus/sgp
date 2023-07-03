

const tabsManager = () => {
    let currentTab = 0;
    let isGetSuggestion = false;
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.addEventListener('click', function() {
        nextPrev(-1);
    });
      
    nextBtn.addEventListener('click', function() {
        nextPrev(1);
    });

    showTab(currentTab);


    function showTab(n) {
        let x = document.getElementsByClassName("tab");
        x[n].style.display = "block";

        if (n == 0) {
            document.getElementById("prevBtn").style.display = "none";
        } else {
            document.getElementById("prevBtn").style.display = "inline";
        }
        if (n == (x.length - 1)) {
            document.getElementById("nextBtn").innerHTML = "Salvar";
        } else {
            document.getElementById("nextBtn").innerHTML = "Próximo";
        }
        fixStepIndicator(n)
    }

    function nextPrev(n) {
        let x = document.getElementsByClassName("tab");
        if (n == 1 && !validateForm()) return false;

        x[currentTab].style.display = "none";
        currentTab = currentTab + n;

        if (currentTab >= x.length) {
            document.getElementById("regForm").submit();
            return false;
        }

        showTab(currentTab);

        if (currentTab == 0) {
            isGetSuggestion = false;
        }
        else if(currentTab == 1 && isGetSuggestion === false) {
            isGetSuggestion = true;
            getSuggestion();
        } else if(currentTab == 2) {
            setDataToForm();
        }
    }

    function validateForm() {
        let x, y, i, valid = true;
        x = document.getElementsByClassName("tab");
        y = x[currentTab].getElementsByClassName("valid");
        for (i = 0; i < y.length; i++) {
            if (y[i].value == "") {
                y[i].className += " invalid";
                valid = false;
            }
        }
        if (valid) {
            document.getElementsByClassName("form-stepper-list")[currentTab].className += " form-stepper-completed";
        }
        return valid;
    }

    function fixStepIndicator(n) {
        var i, x = document.getElementsByClassName("form-stepper-list");
        for (i = 0; i < x.length; i++) {
            x[i].className = x[i].className.replace(" form-stepper-active", "");
        }
        x[n].className += " form-stepper-active";
    }

    function getSuggestion() {
        document.getElementById('spinner').style.display = 'block';
        document.getElementById('spinner-div').style.display = 'block';
        document.getElementById('labelSpinner').style.display = 'block';
        toggleDisabled();

        const url = '/api/generate-post/'
        const data = { 
            'title': document.getElementById('title').value, 
            'description': document.getElementById('description').value 
        };

        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro na solicitação: ' + response.status);
            }
        }).then(function (responseData) {
            document.getElementById('titleSug').value = data['title']
            document.getElementById('suggestion').value = responseData['text']
            hiddenSpinner();

            createTags(responseData['tags']);
            toggleDisabled();
        })
        .catch(function (error) {
            Toastify({
                text: error.message,
                position: "right",
                className: "error",
                offset: {y: 200},
                style: {
                    background: "linear-gradient(to right, #ff5f6d, #ffc371)",
                }
            }).showToast();
            hiddenSpinner();
        });
    }

    function toggleDisabled() {
        inputTitle = document.getElementById('titleSug');
        inputSuggestion = document.getElementById('suggestion');
        inputTitle.disabled = !inputTitle.disabled;
        inputSuggestion.disabled = !inputSuggestion.disabled;
    }

    function hiddenSpinner() {
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('spinner-div').style.display = 'none';
        document.getElementById('labelSpinner').style.display = 'none';
    }

    function createTags(tags) {
        div = document.getElementById('tagsDiv');
        const tagsStr = tags.reduce((acc, value)=> {
            return acc + `<span class="badge text-bg-secondary me-1">${value}</span>`;
        }, '');
        div.innerHTML = tagsStr;
    }

    function setDataToForm() {
        const title = document.getElementById('title').value;
        const text = document.getElementById('suggestion').value;
        const tags = Array.from(document.querySelectorAll("#tagsDiv > .badge"))
        const tagsStr = tags.reduce((acc, value) => {
                const sep = acc == "" ? "": " "
                return acc + sep + value.innerText;
        }, "");

        document.getElementById('titlePost').value = title;
        document.getElementById('contentPost').value = text + '\n'+tagsStr;
    }
}


tabsManager();
flatpickr("#dateScheduling", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
});