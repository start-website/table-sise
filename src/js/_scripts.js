window.addEventListener('load', function () {
    function StartWebSiteTableSize(props) {
        this.tableSize = document.querySelector(props.tableSizeSelector);
        this.tableLink = document.querySelector(props.tableLinkSelector);
        this.body = document.querySelector('body');
        this.maxWidth = Number(props.maxWidth);
        this.borderRadius = props.borderRadius;

        this.buttonText = props.buttonText;
        this.buttonClass = props.buttonClass;

        this.tableContent = props.tableContent;
        this.columnAccent = parseInt(props.columnAccent, 10) - 1;

        this.tableDescription = props.tableDescription;
        this.tableForm = props.tableForm;
        this.infoContentCollapse = props.infoContentCollapse;
        this.colorTheme = props.colorTheme;

        this.tableOpen = () => {
            this.tableLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.body.style.overflow = 'hidden';

                if (this.tableSize.className.match(/hide/gi)) {
                    const popupClassWithActive = this.tableSize.className.replace(/hide/gi, 'active');
                    this.tableSize.className = popupClassWithActive;
                } else {
                    this.tableSize.className += ' active';
                }

                this._changeWidthTableContent();
            })
        }

        this.tableClose = () => {
            this.tableSize.addEventListener('click', (e) => {
                if (e.target.className && /startwebsite-chosesize__close_icon|startwebsite-chosesize__bg/.test(e.target.className)) {
                    const popupClassWithOutActive = this.tableSize.className.replace(/(\s|)active/gi, '');

                    this.tableSize.className += ' hide';

                    const popupRemoveActiveClass = () => {
                        this.tableSize.className = 'startwebsite-chosesize';
                        this.body.style.overflow = '';
                        this.tableSize.removeEventListener('transitionend', popupRemoveActiveClass);
                    }
        
                    this.tableSize.addEventListener('transitionend', popupRemoveActiveClass);

                    /* fallback for older browsers */
                    setTimeout(() => {
                        popupRemoveActiveClass();
                    }, 1000);
                }
                
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

            const modalBG = document.querySelector('.startwebsite-chosesize__bg');
            const modal = document.querySelector('.startwebsite-chosesize__modal');
            const modalRows = document.querySelectorAll('.startwebsite-chosesize__tr');

            if (this.colorTheme.popupBackgroundColor) modalBG.style.backgroundColor = this.colorTheme.popupBackgroundColor;
            if (this.colorTheme.popupBackgroundOpacity) modalBG.style.opacity = this.colorTheme.popupBackgroundOpacity;
            if (this.colorTheme.modalBackgroundColor) {
                modal.style.backgroundColor = this.colorTheme.modalBackgroundColor;
                modal.style.borderColor = this.colorTheme.modalBackgroundColor;
            } 

            if (this.colorTheme.modalBackgroundImage) modal.style.background = `url('${this.colorTheme.modalBackgroundImage}') no-repeat center/cover`;

            if (this.colorTheme.basicColor) this.tableSize.style.color = this.colorTheme.basicColor;
            if (this.colorTheme.borderColor) {
                headerTable.style.borderColor = this.colorTheme.borderColor;
                modalRows.forEach((elem) => {
                    elem.style.borderColor = this.colorTheme.borderColor;
                })
                tableQuestionTextArray.forEach((elem) => {
                    elem.style.borderColor = this.colorTheme.borderColor;
                })
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
                const rgba = hexToRGBA(this.colorTheme.formFieldBackground);
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
                        if (inputForm.type !== 'hidden' && !/checbox|submit/.test(inputForm.type)) {
                            if (this.colorTheme.formTextColor) inputForm.style.color = this.colorTheme.formTextColor;
                            if (this.colorTheme.borderColor) inputForm.style.borderColor = this.colorTheme.borderColor;
                            if (this.colorTheme.formFieldBackground) inputForm.style.backgroundColor = this.colorTheme.formFieldBackground;
                            setBoxShadow(inputForm);
                        }
                        if (elem.type === 'submit') {
                            const buttonSubmit = elem;
                            if (this.buttonText) buttonSubmit.value = this.buttonText;
                            if (this.buttonClass) buttonSubmit.className = this.buttonClass;
                        }
                    } else if (elem.tagName === 'TEXTAREA') {
                        const textareaForm = elem;
                        if (this.colorTheme.formTextColor) textareaForm.style.color = this.colorTheme.formTextColor;
                        if (this.colorTheme.borderColor) textareaForm.style.borderColor = this.colorTheme.borderColor;
                        if (this.colorTheme.formFieldBackground) textareaForm.style.backgroundColor = this.colorTheme.formFieldBackground;
                        setBoxShadow(textareaForm);
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
            const tableColumnArray = document.querySelectorAll('.startwebsite-chosesize__tr');

            for (let i = 0; i < tableColumnArray.length; i++) {
                tableColumnArray[i].addEventListener('mouseover', () => {
                    tableColumnArray[i].style.backgroundColor = this.colorTheme.hover;
                })

                tableColumnArray[i].addEventListener('mouseout', () => {
                    tableColumnArray[i].style.backgroundColor = '';
                })
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

        this._changeWidthTableContent = () => {
            const tableHeader = document.querySelector('.startwebsite-chosesize__tr_header');
            const tableRows = document.querySelectorAll('.startwebsite-chosesize__tr');
            const tableContent = document.querySelector('.startwebsite-chosesize__table-content');

            let widthTableContent = 0;

            tableHeader.children.forEach((child) => {
                widthTableContent += child.offsetWidth;
            })

            const setWidth = () => {
                for (let i = 0; i < tableRows.length; i++) {
                    tableRows[i].style.width = widthTableContent + 'px';
                }
            }

            const removeWidth = () => {
                for (let i = 0; i < tableRows.length; i++) {
                    tableRows[i].style.width = '';
                }
            }

            if ((widthTableContent + 100) > tableContent.clientWidth) {
                setWidth();
            } else {
                removeWidth();
            }
            
            window.addEventListener('resize', () => {
                if ((widthTableContent + 100) > tableContent.offsetWidth) {
                    setWidth();
                } else {
                    removeWidth();
                }
            })

        }

        this.active = function () {
            this.tableOpen();
            this.tableClose();
            if (this.infoContentCollapse) this.questionSwitch();
            if (this.tableContent) this.setInfoContent();
            this.setColor();
            if (!this.tableDescription || !this.tableForm) this.delQuestions();
            if (this.colorTheme.hover) this.setTableHover();
            if (this.infoContentCollapse) this.collapseContent();
            if (this.tableForm) this.setAJAXform();
        }

        if (this.tableLink) {
            this.tableLink.style.display = '';
            const modal = document.querySelector('.startwebsite-chosesize__modal');
            if (this.maxWidth) modal.style.maxWidth = this.maxWidth + 'px';
            if (this.borderRadius) modal.style.borderRadius = '4px';
            this.active();
        }
    }

    new StartWebSiteTableSize({
        tableSizeSelector: '.startwebsite-chosesize',
        tableLinkSelector: '#popup1',
        maxWidth: '700',
        borderRadius: false,
        colorTheme: {
            basicColor: '',
            hover: 'lightcyan',
            popupBackgroundColor: '',
            popupBackgroundOpacity: '',
            modalBackgroundColor: '',
            modalBackgroundImage: '',//./images/4.jpg
            formTextColor: '',
            formFieldBackground: '',// only hex format
            borderColor: ''
        },
        buttonText: 'Send',
        buttonClass: '',
        tableContent: 'heading 1, heading 2, heading 3, heading 4, heading 5; item 1, item 2, item 3, item 4, item 5; item 6, item 7, item 8, item 9, item 10;  item 11, item 12, item 13, item 14, item 15; item 16, item 17, item 18, item 19, item 20; item 21, item 22, item 23, item 24, item 25;', // 
        columnAccent: '1',
        tableDescription: true,
        tableForm: true,
        infoContentCollapse: true
    });

})