function checkboxChange() {
    const inputsCheckbox = document.querySelectorAll('input[type="checkbox"]');
    let inputName;
    for (let i = 0; i < inputsCheckbox.length; i++) {
        inputsCheckbox[i].addEventListener('change', function () {
            inputsCheckbox[i].parentElement.parentElement.childNodes.forEach(function (elem) {
                if (elem.tagName === 'LABEL') {
                    if (elem.firstChild.hasAttribute('checked')) {
                        inputName = elem.firstChild.getAttribute('name');
                    }
                    elem.firstChild.checked = false;
                    elem.firstChild.removeAttribute('checked');
                    elem.firstChild.setAttribute('name', 'option');
                }
            })
            this.setAttribute('checked', '');
            this.checked = true;
            this.setAttribute('name', inputName);
        })
    }
}

function checkInputs() {
    const inputArray = document.querySelectorAll('input');
    const inputSumbit = document.querySelector('input[type="submit"]');
    const inputPrivacyLink = document.querySelector('input[name="shop_start_table_size[privacy_link]"]');
    let messageError;
    let elemFieldDesc;

    for (let i = 0; i < inputArray.length; i++) {
        switch (inputArray[i].name) {
            case 'shop_start_table_size[text_color]':
                inputArray[i].addEventListener('change', function () {
                    inputArray[i].parentElement.parentElement.childNodes.forEach(function (elem) {
                        if (/hint-error/gi.test(elem.className)) messageError = elem;
                    })
                    if (!/^#([\da-f]{3}){1,2}$/i.test(inputArray[i].value) && inputArray[i].value !== '') {
                        messageError.style.display = 'block';
                        inputSumbit.disabled = true;
                    } else {
                        messageError.style.display = '';
                        inputSumbit.disabled = false;
                    }
                })
                break;
            case 'shop_start_table_size[set_product_page]':
                inputArray[i].addEventListener('change', function () {
                    inputArray[i].parentElement.parentElement.childNodes.forEach(function (elem) {
                        if (/field-description/gi.test(elem.className)) elemFieldDesc = elem;
                    })
                    if (inputArray[i].value == 'false') {
                        elemFieldDesc.style.display = 'block';
                    } else {
                        elemFieldDesc.style.display = '';
                    }
                })
                break;
            case 'shop_start_table_size[table_form]':
                inputArray[i].addEventListener('change', function () {
                    inputArray[i].parentElement.parentElement.childNodes.forEach(function (elem) {
                        if (/field-description/gi.test(elem.className)) elemFieldDesc = elem;
                    })
                    if (inputArray[i].value == 'true') {
                        elemFieldDesc.style.display = 'block';
                    } else {
                        elemFieldDesc.style.display = '';
                        inputPrivacyLink.value = '';
                    }
                })
                break;
        }
    }
}

checkboxChange();
checkInputs();