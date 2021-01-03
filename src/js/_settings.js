var app = new Vue({
    delimiters: ['%%', '%%'],
    el: '.start',
    data: {
        table_count: Number(document.querySelector('#table_count').value),
        custom_css: document.querySelector('#custom_css').value,
        plugin_url: document.querySelector('#plugin_url').value,
        custom_css_instruction: false,
        categoryArr: [],
        selected_tab: 0,
        group_settings: [],
        block_1_id: 0,
        block_2_id: 1,
        set_product_page: document.querySelector('#set_product_page').value,
        info_content_collapse: document.querySelector('#info_content_collapse').value,
        table_description: document.querySelector('#table_description').value,
        round_corners: document.querySelector('#round_corners').value,
        modal_width: document.querySelector('#modal_width').value,
        text_color: document.querySelector('#text_color').value,
        border_color: document.querySelector('#border_color').value,
        modal_color: document.querySelector('#modal_color').value,
        popup_background_color: document.querySelector('#popup_background_color').value,
        popup_background_opacity: document.querySelector('#popup_background_opacity').value,
        column_accent: document.querySelector('#column_accent').value,
        table_hover_color: document.querySelector('#table_hover_color').value,
        table_form: document.querySelector('#table_form').value,
        settings_table_form: false,
        privacy_link: document.querySelector('#privacy_link').value,
        modal_background_image_file: document.querySelector('#modal_background_image_file').value,
        form_text_color: document.querySelector('#form_text_color').value,
        form_field_background: document.querySelector('#form_field_background').value,
        button_text: document.querySelector('#button_text').value,
        button_class: document.querySelector('#button_class').value,
        form_response: document.querySelector('#form_response').value,
        form_name_show: document.querySelector('#form_name_show').value,
        form_name_required: document.querySelector('#form_name_required').value,
        form_email_show: document.querySelector('#form_email_show').value,
        form_email_required: document.querySelector('#form_email_required').value,
        form_tel_show: document.querySelector('#form_tel_show').value,
        form_tel_required: document.querySelector('#form_tel_required').value,
        form_message_show: document.querySelector('#form_message_show').value,
        form_message_required: document.querySelector('#form_message_required').value,
    },
    methods: {
        addBlock() {
            this.table_count++;
            this.group_settings.push({
                table_name: '',
                category_name: '—',
                filter_characteristic_1: '—',
                filter_characteristic_2: '—',
                filter_characteristic_3: '—',
                table_content: '',
                table_description: '',
            })
        },
        delBlock() {
            if (this.table_count > 1) {
                this.table_count--;
                this.group_settings.pop();
            }
        },
        checkHexFormat(e) {
            const input = e.target;
            const inputBlockChilds = input.parentElement.parentElement.children;
            const buttonSubmit = document.querySelector('.buttom-sumbit');
            const hexRegexp = /^#([\da-f]{3}){1,2}$/i;

            let hintError;
    
            for (let i = 0; i < inputBlockChilds.length; i++) {
                const elem = inputBlockChilds[i];
  
                if (elem.className && elem.className.match(/hint-error/gi)) {
                    hintError = elem;
                }
            }

            if (!hexRegexp.test(e.target.value) && e.target.value != '') {
                hintError.style.display = 'block';
                buttonSubmit.disabled = true;
            } else {
                hintError.style.display = '';
                buttonSubmit.disabled = false;
            }
        },
        pageReload() {
            setTimeout(function () {
                window.location.reload();
            }, 1000)
        },
        setValueInInputHidden(e) {
            let inputHidden = e.target.parentElement.children[0];
            if (e.target.checked === true) {
                inputHidden.value = true;
            } else {
                inputHidden.value = false;
            }
        },
        checkImage(e) {
            const input = e.target;
            const buttonSubmit = document.querySelector('.buttom-sumbit');
            const inputBlockChilds = input.parentElement.parentElement.children;
            let hintError;
            let regex = /(png|jpe?g|gif|svg|webp)$/i;
    
            for (let i = 0; i < inputBlockChilds.length; i++) {
                const elem = inputBlockChilds[i];
  
                if (elem.className && elem.className.match(/hint-error/gi)) {
                    hintError = elem;
                }
            }
  
            if (!regex.test(input.value)) {
                hintError.style.display = 'block';
                buttonSubmit.disabled = true;
            } else {
                hintError.style.display = '';
                buttonSubmit.disabled = false;
            }
        },
        returnDefaultModalImageInputFileName(e) {
            e.target.name = 'shop_start_table_size[modal_background_image_file]';
  
            const inputText = document.querySelector('#modal_background_image_input_text');
            inputText.name = '';
            inputText.value = '';
        },
        delModalImage(e) {
            const inputFile = document.querySelector('#modal_background_image_input_file');
            const inputText = document.querySelector('#modal_background_image_input_text');

            const inputFileDefault = inputFile.name;
            const inputTextDefault = inputText.name;
            
            this.modal_background_image_file = false;
            inputFile.name = inputTextDefault;
            inputText.name = inputFileDefault;
            inputText.value = '';
        },
        setCategory() {
            this.categoryArr = document.querySelectorAll('#category_name');
        },
        changeEmptyChar1(e, table_index) {
            if (e.target.value === '') {
                this.group_settings[table_index].filter_characteristic_1 = '—';
            }
        },
        changeEmptyChar2(e, table_index) {
            if (e.target.value === '') {
                this.group_settings[table_index].filter_characteristic_2 = '—';
            }
        },
        changeEmptyChar3(e, table_index) {
            if (e.target.value === '') {
                this.group_settings[table_index].filter_characteristic_3 = '—';
            }
        },
    },
    created: function () {
        let numberBlock = 0;
        for (let i = 0; i < this.table_count; i++) {
            numberBlock++;
            this.group_settings.push({
                table_name: document.querySelector(`#table_name_${numberBlock}`).value,
                category_name: document.querySelector(`#category_name_${numberBlock}`).value,
                filter_characteristic_1: document.querySelector(`#table_${numberBlock}_filter_characteristic_1`).value,
                filter_characteristic_2: document.querySelector(`#table_${numberBlock}_filter_characteristic_2`).value,
                filter_characteristic_3: document.querySelector(`#table_${numberBlock}_filter_characteristic_3`).value,
                table_content: document.querySelector(`#table_content_${numberBlock}`).value,
                table_description: document.querySelector(`#table_description_${numberBlock}`).value,
            })
        }
        this.setCategory();
    }
})