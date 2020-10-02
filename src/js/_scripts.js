window.addEventListener('load', function () {
    function StartWebSiteTableSize(props) {
        this.tableSize = document.querySelector(props.tableSizeSelector);
        this.tableLink = document.querySelector(props.tableLinkSelector);
        this.body = document.querySelector('body');
        this.textColor = props.textColor;
        this.borderColor = props.borderColor;

        this.buttonText = props.buttonText;

        this.buttonTextColor = props.buttonTextColor;
        this.buttonBackgroundColor = props.buttonBackgroundColor;

        this.tableContent = props.tableContent;
        this.columnAccent = parseInt(props.columnAccent, 10) - 1;

        this.tableHoverColor = props.tableHoverColor;

        this.tableDescription = props.tableDescription;
        this.tableForm = props.tableForm;
        this.infoContentCollapse = props.infoContentCollapse;

        this.tableOpen = () => {
            this.tableLink.addEventListener('click', () => {
                this.tableSize.className += ' startwebsite-table-active';
                this.body.style.overflow = 'hidden';
            })
        }

        this.tableClose = () => {
            const disableTable = () => {
                this.tableSize.className = 'startwebsite-chosesize';
                this.body.style.overflow = '';
            }

            this.tableSize.addEventListener('click', () => {
                disableTable();
            }, false);

            document.querySelector('.startwebsite-chosesize__close_icon').addEventListener('click', () => {
                disableTable();
            })

            document.querySelector('.startwebsite-chosesize__modal').addEventListener('click', (e) => {
                e.stopPropagation();
            })
        }

        this.questionSwitch = () => {
            const questionArray = document.querySelectorAll('.startwebsite-chosesize__question'),
                questionTextArray = document.querySelectorAll('.startwebsite-chosesize__question_text');

            for (let i = 0; i < questionArray.length; i++) {
                questionTextArray[i].style.cursor = 'pointer';
                questionArray[i].addEventListener('click', function () {
                    this.childNodes.forEach((elem) => {
                        if (elem.className !== undefined && elem.className.match(/startwebsite-chosesize__question_text/g)) {
                            if (elem.firstChild.innerHTML === '+') {
                                elem.firstChild.innerHTML = '-';
                            } else {
                                elem.firstChild.innerHTML = '+';
                            }
                        }
                        if (elem.className !== undefined && elem.className.match(/startwebsite-chosesize__answer/g)) {
                            if (!elem.className.match(/startwebsite-chosesize__answer-active/g)) {
                                elem.className += ' startwebsite-chosesize__answer-active';
                            } else {
                                elem.className = 'startwebsite-chosesize__answer';
                            }
                            elem.addEventListener('click', function (e) {
                                e.stopPropagation();
                            })
                        }
                    })
                })
            }
        }

        this.setColor = () => {
            const headerTable = document.querySelector('.startwebsite-chosesize__header'),
                tableQuestionTextArray = document.querySelectorAll('.startwebsite-chosesize__question_text'),
                tableAnswerBlockArray = document.querySelectorAll('.startwebsite-chosesize__answer');

            this.tableSize.style.color = this.textColor;
            headerTable.style.borderColor = this.borderColor;

            for (let i = 0; i < tableQuestionTextArray.length; i++) {
                tableQuestionTextArray[i].style.borderColor = this.borderColor;
            }

            const setBoxShadow = (elem) => {
                function hexToRGBA(h) {
                    let r = 0, g = 0, b = 0;

                    // 3 digits
                    if (h.length == 4) {
                        r = "0x" + h[1] + h[1];
                        g = "0x" + h[2] + h[2];
                        b = "0x" + h[3] + h[3];

                        // 6 digits
                    } else if (h.length == 7) {
                        r = "0x" + h[1] + h[2];
                        g = "0x" + h[3] + h[4];
                        b = "0x" + h[5] + h[6];
                    }

                    return "rgba(" + +r + "," + +g + "," + +b + ", 0.25)";
                }
                const rgba = hexToRGBA(this.textColor);
                elem.addEventListener('focus', () => {
                    elem.style.boxShadow = `0 0 0 3px ${rgba}`;
                });
                elem.addEventListener('blur', () => {
                    elem.style.boxShadow = 'none';
                });
            }

            const findElem = (elems) => {
                elems.forEach((elem) => {
                    if (elem.tagName === 'INPUT') {
                        const inputForm = elem;
                        if (inputForm.type !== 'hidden' && inputForm.type !== 'checkbox') {
                            inputForm.style.borderColor = this.textColor;
                            inputForm.style.color = this.textColor;
                            setBoxShadow(inputForm);
                        }
                    } else if (elem.tagName === 'TEXTAREA') {
                        const textareaForm = elem;
                        textareaForm.style.borderColor = this.textColor;
                        textareaForm.style.color = this.textColor;
                        setBoxShadow(textareaForm);
                    } else if (elem.tagName === 'BUTTON') {
                        const button = elem;
                        if (this.buttonText) button.innerHTML = this.buttonText;
                        if (this.buttonTextColor) {
                            button.style.color = this.buttonTextColor;
                        }
                        if (this.buttonBackgroundColor) {
                            button.style.backgroundColor = this.buttonBackgroundColor;
                            button.style.border = `4px double ${this.buttonBackgroundColor}`;
                            button.addEventListener('mouseover', () => {
                                button.style.backgroundColor = 'transparent';
                                button.style.color = this.buttonBackgroundColor;
                                button.style.border = `4px double ${this.buttonBackgroundColor}`;
                            });
                            button.addEventListener('mouseout', () => {
                                button.style.color = this.buttonTextColor ? this.buttonTextColor : '#fff';
                                button.style.backgroundColor = this.buttonBackgroundColor;
                                button.style.border = `4px double ${this.buttonBackgroundColor}`;
                            });
                        }
                    } else {
                        findElem(elem.childNodes);
                    }
                })
            }

            for (let i = 0; i < tableAnswerBlockArray.length; i++) {
                findElem(tableAnswerBlockArray[i].childNodes);
            }
        }

        this.setInfoContent = () => {
            const modalInfo = document.querySelector('.startwebsite-chosesize__info');
            const modalinfoQustions = document.querySelector('.startwebsite-chosesize__questions');
            let tagTable = document.createElement('div');
            tagTable.className = 'startwebsite-chosesize__table';
            modalInfo.insertBefore(tagTable, modalinfoQustions);

            let tabTableContent = document.createElement('div');
            tabTableContent.className = 'startwebsite-chosesize__table-content';
            tagTable.appendChild(tabTableContent);

            const tableContent = document.querySelector('.startwebsite-chosesize__table-content'),
                tableRowContentArray = this.tableContent.split(';');
            let tableColumnContentArray;
            for (let i = 0; i < tableRowContentArray.length - 1; i++) {
                let tagTableRow = document.createElement('div');
                tagTableRow.className = 'startwebsite-chosesize__tr';
                if (i === 0) tagTableRow.className += ' startwebsite-chosesize__tr_header';
                tableContent.appendChild(tagTableRow);

                tableColumnContentArray = tableRowContentArray[i].split(',');

                for (let j = 0; j < tableColumnContentArray.length; j++) {
                    let tagTableColumn = document.createElement('div');
                    tagTableColumn.className = 'startwebsite-chosesize__td';
                    const columnWidth = 100 / tableColumnContentArray.length;
                    tagTableColumn.style.width = `${columnWidth}%`;
                    if (j === this.columnAccent) tagTableColumn.className += ' startwebsite-chosesize__td_accent';

                    let tagTableColumnSpan = document.createElement('span');
                    tagTableColumnSpan.className = 'startwebsite-chosesize__td_text';
                    tagTableColumnSpan.innerHTML = tableColumnContentArray[j];

                    tagTableColumn.appendChild(tagTableColumnSpan);
                    tagTableRow.appendChild(tagTableColumn);
                }
            }

            if (!this.tableDescription && !this.tableForm) {
                tagTable.style.marginBottom = '0';
            }
        }

        this.delQuestions = () => {
            const modalQuestionsWrap = document.querySelector('.startwebsite-chosesize__questions'),
                modalQuestionArray = document.querySelectorAll('.startwebsite-chosesize__question');

            for (let i = 0; i < modalQuestionArray.length; i++) {
                if (!this.tableDescription && modalQuestionArray[i].getAttribute('data-question') === 'description') {
                    modalQuestionsWrap.removeChild(modalQuestionArray[i]);
                }
                if (!this.tableForm && modalQuestionArray[i].getAttribute('data-question') === 'form') {
                    modalQuestionsWrap.removeChild(modalQuestionArray[i]);
                }
            }
        }

        this.setTableHover = () => {
            const tableColumnArray = document.querySelectorAll('.startwebsite-chosesize__td');

            for (let i = 0; i < tableColumnArray.length; i++) {
                tableColumnArray[i].addEventListener('mouseover', () => {
                    tableColumnArray[i].parentNode.childNodes.forEach(elem => {
                        elem.style.backgroundColor = this.tableHoverColor;
                    })
                });
                tableColumnArray[i].addEventListener('mouseout', () => {
                    tableColumnArray[i].parentNode.childNodes.forEach(elem => {
                        elem.style.backgroundColor = '';
                    })
                });

            }
        }

        this.collapseContent = () => {
            const questionTextArray = document.querySelectorAll('.startwebsite-chosesize__question_text'),
                answerArray = document.querySelectorAll('.startwebsite-chosesize__answer');

            for (let i = 0; i < questionTextArray.length; i++) {
                let tagQuestionIcon = document.createElement('span');
                tagQuestionIcon.className = 'startwebsite-chosesize__question_icon';
                tagQuestionIcon.innerHTML = '+';
                tagQuestionIcon.style.cursor = 'pointer';
                questionTextArray[i].insertBefore(tagQuestionIcon, questionTextArray[i].firstChild);

                answerArray[i].className = 'startwebsite-chosesize__answer';
            }
        }

        this.setAJAXform = () => {
            const modalQuestionArray = document.querySelectorAll('.startwebsite-chosesize__question');

            for (let i = 0; i < modalQuestionArray.length; i++) {
                if (modalQuestionArray[i].getAttribute('data-question') === 'form') {
                    const elemQuestionForm = modalQuestionArray[i];
                    function findForm(elems) {
                        elems.forEach(elem => {
                            if (elem.tagName === 'FORM') {
                                const form = elem;
                                form.addEventListener('submit', (e) => {
                                    const url = location.href;
                                    let formData = new FormData(form);
                                    let xhr = new XMLHttpRequest();
                                    xhr.open('POST', url);
                                    xhr.send(formData);

                                    xhr.onload = () => {
                                        if (xhr.status == 200) {
                                            const formResponseElem = document.querySelector('.startwebsite-chosesize__form-response');
                                            formResponseElem.className += ' startwebsite-chosesize__form-response_active';
                                            form.className += ' form-blur';
                                            setTimeout(function () {
                                                form.reset();
                                                form.className = '';
                                                formResponseElem.className = 'startwebsite-chosesize__form-response';
                                            }, 7000)
                                        } else {
                                            console.log("Form error " + xhr.status);
                                        }
                                    }
                                    xhr.timeout = 30000;
                                    e.preventDefault();
                                })
                                return false;
                            } else {
                                findForm(elem.childNodes);
                            }
                        })

                    }
                    findForm(elemQuestionForm.childNodes);
                }

            }
        }

        this.active = function () {
            this.tableOpen();
            this.tableClose();
            if (this.infoContentCollapse) this.questionSwitch();
            if (this.textColor || this.borderColor || this.buttonText || this.buttonTextColor || this.buttonBackgroundColor) this.setColor();
            if (this.tableContent) this.setInfoContent();
            if (!this.tableDescription || !this.tableForm) this.delQuestions();
            if (this.tableHoverColor) this.setTableHover();
            if (this.infoContentCollapse) this.collapseContent();
            if (this.tableForm) this.setAJAXform();
        }
    }

    let webasystTableSize = new StartWebSiteTableSize({
        tableSizeSelector: '.startwebsite-chosesize',
        tableLinkSelector: '.startwebsite__table-size',
        textColor: '', // Only hex format
        borderColor: '',
        buttonText: 'Send',
        buttonTextColor: '',
        buttonBackgroundColor: '',
        tableContent: 'heading 1, heading 2, heading 3, heading 4, heading 5; item 1, item 2, item 3, item 4, item 5; item 6, item 7, item 8, item 9, item 10;', // 
        columnAccent: '1',
        tableHoverColor: 'LightCyan',
        tableDescription: true,
        tableForm: true,
        infoContentCollapse: true
    });

    webasystTableSize.active();

})