const images = [
	'assets/images/apple.png',
	'assets/images/cherries.png',
	'assets/images/coconut.png',
	'assets/images/guava.png',
	'assets/images/mangosteen.png',
	'assets/images/strawberry.png',
]

const deposit = document.querySelector('.saldo')
let saldo = 0

deposit.addEventListener('click', function () {
	const isiSaldo = prompt('Masukkan jumlah saldo!')
	saldo += parseInt(isiSaldo)
	alert(`Saldo masuk sebesar: ${isiSaldo}`)
	updateSaldo()
})

const jumlahSaldo = document.querySelector('.data-saldo')

function updateSaldo() {
	jumlahSaldo.textContent = `${saldo}`
}

const firstImage = document.querySelector('.first')
const secondImage = document.querySelector('.second')
const thirdImage = document.querySelector('.third')

function spinImage(element) {
	const randomIndex = Math.floor(Math.random() * images.length)
	const image = document.createElement('img')
	image.src = images[randomIndex]
	element.innerHTML = ''
	element.appendChild(image)
	return randomIndex
}

const spin = document.querySelector('.spin')

spin.addEventListener('click', function () {
	if (saldo < 1000) {
		alert('Saldo tidak cukup untuk bermain!')
	}

	saldo -= 1000
	updateSaldo()

	const firstIndex = spinImage(firstImage)
	const secondIndex = spinImage(secondImage)
	const thirdIndex = spinImage(thirdImage)

	setTimeout(function () {
		if (firstIndex === secondIndex && secondIndex === thirdIndex) {
			alert('Selamat, kamu menang!')
			saldo += 10000
			updateSaldo()
		}
	}, 300)
})

const autoSpin = document.querySelector('.auto')

autoSpin.addEventListener('click', function () {
	if (saldo < 1000) {
		alert('Saldo tidak cukup untuk bermain!')
	}

	const interval = setInterval(function () {
		if (saldo < 1000) {
			clearInterval(interval)
			alert('Saldo tidak cukup untuk bermain!')
			return
		}

		saldo -= 1000
		updateSaldo()

		const firstIndex = spinImage(firstImage)
		const secondIndex = spinImage(secondImage)
		const thirdIndex = spinImage(thirdImage)

		setTimeout(function () {
			if (
				saldo >= 0 &&
				firstIndex === secondIndex &&
				secondIndex === thirdIndex
			) {
				alert('Selamat, kamu menang!')
				saldo += 10000
				updateSaldo()
			}
		}, 300)
	}, 1200)

	const stopSpin = document.querySelector('.stop')

	stopSpin.addEventListener('click', function () {
		clearInterval(interval)
	})
})

const tenSpin = document.querySelector('.tenSpin')

tenSpin.addEventListener('click', function () {
	let spinCount = 0

	const interval = setInterval(function () {
		if (saldo < 1000) {
			clearInterval(interval)
			alert('Saldo tidak cukup untuk bermain!')
			return
		}

		saldo -= 1000
		updateSaldo()

		const firstIndex = spinImage(firstImage)
		const secondIndex = spinImage(secondImage)
		const thirdIndex = spinImage(thirdImage)

		setTimeout(function () {
			if (
				saldo >= 0 &&
				firstIndex === secondIndex &&
				secondIndex === thirdIndex
			) {
				alert('Selamat, kamu menang!')
				saldo += 10000
				updateSaldo()
			}
		}, 300)

		spinCount++
		if (spinCount >= 10) {
			clearInterval(interval)
		}
	}, 1200)

	const stopSpin = document.querySelector('.stop')

	stopSpin.addEventListener('click', function () {
		clearInterval(interval)
	})
})
