const firstVersion = document.querySelector('.version:first-child')
const secondVersion = document.querySelector('.version:last-child')

firstVersion.addEventListener('click', function () {
	if (secondVersion.style.visibility === 'visible') {
		secondVersion.style.visibility = 'hidden'
	} else {
		secondVersion.style.visibility = 'visible'
	}
})
