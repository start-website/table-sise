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

function tabsSwitch() {
	const tabs = document.querySelector('.start-tabs').children,
		tabsContent = document.querySelector('.start-tab-content').children;

	function disableTabContent() {
		for (let i = 0; i < tabs.length; i++) {
			tabsContent[i].style.display = 'none';
			tabs[i].className = '';
		}
	}

	for (let i = 0; i < tabs.length; i++) {
		tabs[i].addEventListener('click', () => {
			disableTabContent();
			tabsContent[i].style.display = 'block';
			tabs[i].className = 'selected';
		})
	}
}

function changeTable() {
	const buttonAdd = document.querySelector('.start-table-button-add'),
		buttonDel = document.querySelector('.start-table-button-del'),
		tableContentSettings = document.querySelector('.start-table-content');

	const tableCount = document.querySelector('.start-table-size-count');

	let tableCountValue = parseInt(tableCount.value);
	const tableName = document.querySelector('.start-table-name').innerText.replace(/\d/g, '');

	const fieldCategoryName = document.querySelector('.category-name').innerText.replace(/\n/g, ''),
		selectContentCategory = document.querySelector('.select-category').children,
		fieldCategoryHintContent = document.querySelector('.category-hint').innerText;

	const fieldBrandName = document.querySelector('.brand-name').innerText.replace(/\n/g, ''),
		selectContentBrand = document.querySelector('.select-brand').children,
		fieldBrandHintContent = document.querySelector('.brand-hint').innerText;

	const fieldContentTableName = document.querySelector('.content-table-name').innerText.replace(/\n/g, ''),
		fieldContentTableHintContent = document.querySelector('.content-table-hint').innerHTML;

	const fieldDescriptionTableName = document.querySelector('.content-description-name').innerText.replace(/\n/g, ''),
		fieldDescriptionTableHintContent = document.querySelector('.content-description-hint').innerHTML;

	function createTable() {
		let tagTableWrap = document.createElement('div');
		tagTableWrap.className = 'start-table';
		tableContentSettings.appendChild(tagTableWrap);

		let tagTableId = document.createElement('input');
		tagTableId.type = 'hidden';
		tagTableId.name = `shop_start_table_size[id_table_${tableCountValue}]`;
		tagTableId.value = tableCountValue;
		tagTableWrap.appendChild(tagTableId);

		let tagTableName = document.createElement('h6');
		tagTableName.className = 'start-table-name';
		tagTableName.innerText = tableName + tableCountValue;
		tagTableWrap.appendChild(tagTableName);

		// field
		let tagFieldCategory = document.createElement('div');
		tagFieldCategory.className = 'field';
		tagTableWrap.appendChild(tagFieldCategory);

		let tagNameCategory = document.createElement('div');
		tagNameCategory.className = 'name';
		tagNameCategory.innerText = fieldCategoryName;
		tagFieldCategory.appendChild(tagNameCategory);

		let tagValueCategory = document.createElement('div');
		tagValueCategory.className = 'value';
		tagFieldCategory.appendChild(tagValueCategory);

		let tagLabelCategory = document.createElement('label');
		tagValueCategory.appendChild(tagLabelCategory);

		let tagSelectCategory = document.createElement('select');
		tagSelectCategory.name = `shop_start_table_size[category_name_${tableCountValue}]`;
		tagLabelCategory.appendChild(tagSelectCategory);

		for (let i = 0; i < selectContentCategory.length; i++) {
			if (!selectContentCategory[i].className.match(/from-database/gi)) {
				let tagOptionCategory = document.createElement('option');
				tagOptionCategory.value = selectContentCategory[i].value;
				tagOptionCategory.innerText = selectContentCategory[i].innerText;
				tagSelectCategory.appendChild(tagOptionCategory);
			}
		}

		let tagHintCategory = document.createElement('div');
		tagHintCategory.className = 'hint';
		tagHintCategory.innerHTML = fieldCategoryHintContent;
		tagValueCategory.appendChild(tagHintCategory);

		// filed 2
		let tagFieldbrand = document.createElement('div');
		tagFieldbrand.className = 'field';
		tagTableWrap.appendChild(tagFieldbrand);

		let tagNameBrand = document.createElement('div');
		tagNameBrand.className = 'name';
		tagNameBrand.innerText = fieldBrandName;
		tagFieldbrand.appendChild(tagNameBrand);

		let tagValueBrand = document.createElement('div');
		tagValueBrand.className = 'value';
		tagFieldbrand.appendChild(tagValueBrand);

		let tagLabelBrand = document.createElement('label');
		tagValueBrand.appendChild(tagLabelBrand);

		let tagSelectBrand = document.createElement('select');
		tagSelectBrand.name = `shop_start_table_size[brand_name_${tableCountValue}]`;
		tagLabelBrand.appendChild(tagSelectBrand);

		for (let i = 0; i < selectContentBrand.length; i++) {
			if (!selectContentBrand[i].className.match(/from-database/gi)) {
				let tagOptionBrand = document.createElement('option');
				tagOptionBrand.value = selectContentBrand[i].value;
				tagOptionBrand.innerText = selectContentBrand[i].innerText;
				tagSelectBrand.appendChild(tagOptionBrand);
			}
			
		}

		let tagHintBrand = document.createElement('div');
		tagHintBrand.className = 'hint';
		tagHintBrand.innerHTML = fieldBrandHintContent;
		tagValueBrand.appendChild(tagHintBrand);

		// field 3
		let tagFieldContentTable = document.createElement('div');
		tagFieldContentTable.className = 'field';
		tagTableWrap.appendChild(tagFieldContentTable);

		let tagNameContentTable = document.createElement('div');
		tagNameContentTable.className = 'name';
		tagNameContentTable.innerText = fieldContentTableName;
		tagFieldContentTable.appendChild(tagNameContentTable);

		let tagValueContentTable = document.createElement('div');
		tagValueContentTable.className = 'value';
		tagFieldContentTable.appendChild(tagValueContentTable);

		let tagLabelContentTable = document.createElement('label');
		tagValueContentTable.appendChild(tagLabelContentTable);

		let tagTextareaContentTable = document.createElement('textarea');
		tagTextareaContentTable.setAttribute('rows', 8);
		tagTextareaContentTable.name = `shop_start_table_size[table_content_${tableCountValue}]`;
		tagLabelContentTable.appendChild(tagTextareaContentTable);

		let tagHintContentTable = document.createElement('div');
		tagHintContentTable.className = 'hint';
		tagHintContentTable.innerHTML = fieldContentTableHintContent;
		tagValueContentTable.appendChild(tagHintContentTable);

		// field 3
		let tagFieldContentDescription = document.createElement('div');
		tagFieldContentDescription.className = 'field';
		tagTableWrap.appendChild(tagFieldContentDescription);

		let tagNameContentDescription = document.createElement('div');
		tagNameContentDescription.className = 'name';
		tagNameContentDescription.innerText = fieldDescriptionTableName;
		tagFieldContentDescription.appendChild(tagNameContentDescription);

		let tagValueContentDescription = document.createElement('div');
		tagValueContentDescription.className = 'value';
		tagFieldContentDescription.appendChild(tagValueContentDescription);

		let tagLabelContentDescription = document.createElement('label');
		tagValueContentDescription.appendChild(tagLabelContentDescription);

		let tagTextareaContentDescription = document.createElement('textarea');
		tagTextareaContentDescription.setAttribute('rows', 8);
		tagTextareaContentDescription.name = `shop_start_table_size[table_description_${tableCountValue}]`;
		tagLabelContentDescription.appendChild(tagTextareaContentDescription);

		let tagHintContentDescription = document.createElement('div');
		tagHintContentDescription.className = 'hint';
		tagHintContentDescription.innerHTML = fieldDescriptionTableHintContent;
		tagValueContentDescription.appendChild(tagHintContentDescription);
	}

	buttonAdd.addEventListener('click', function (e) {
		e.preventDefault();
		if (tableCountValue < 0) tableCountValue = 0;
		tableCountValue++;
		tableCount.value = tableCountValue;
		createTable();
	})

	buttonDel.addEventListener('click', function (e) {
		e.preventDefault();
		if (tableCountValue > 1) {
			tableCountValue--;
			tableCount.value = tableCountValue;
			const tableArray = document.querySelectorAll('.start-table');
			tableArray[tableArray.length - 1].remove();
		}
	})



}


checkboxChange();
checkInputs();
tabsSwitch();
changeTable();
