feather.replace()

const versions = ['assets/js/version1.js', 'assets/js/version2.js']

const firstOption = document.getElementById('first-option')
const secondOption = document.getElementById('second-option')

firstOption.textContent = 'version 1'
secondOption.textContent = 'version 2'

const firstVersion = document.querySelector('.version:first-child')
const secondVersion = document.querySelector('.version:last-child')

firstVersion.addEventListener('click', function () {
	secondVersion.classList.toggle('show')
})

secondVersion.addEventListener('click', function () {
	if (
		firstOption.textContent === 'version 1' &&
		secondOption.textContent === 'version 2'
	) {
		firstOption.textContent = 'version 2'
		secondOption.textContent = 'version 1'
	} else {
		firstOption.textContent = 'version 1'
		secondOption.textContent = 'version 2'
	}
})
