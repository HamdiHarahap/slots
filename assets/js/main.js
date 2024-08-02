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

const jumlahSaldo = document.querySelector('.data-saldo')

function updateSaldo() {
	jumlahSaldo.textContent = `${saldo}`
}

deposit.addEventListener('click', function () {
	const isiSaldo = prompt('Masukkan jumlah saldo!')
	saldo += parseInt(isiSaldo)
	alert(`Saldo masuk sebesar: ${isiSaldo}`)
	updateSaldo()
})

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

let yourBet = 800

const bets = document.querySelectorAll('.bet')
const dataBet = document.querySelector('.data-bet')

bets.forEach((bet) => {
	bet.addEventListener('click', function () {
		yourBet = parseInt(bet.textContent)
		alert(`Anda bertaruh di ${yourBet}`)
		dataBet.textContent = `${yourBet}`
	})
})

const spin = document.querySelector('.spin')

function singleSpin() {
	saldo -= yourBet
	updateSaldo()

	const firstIndex = spinImage(firstImage)
	const secondIndex = spinImage(secondImage)
	const thirdIndex = spinImage(thirdImage)

	setTimeout(function () {
		if (firstIndex === secondIndex && secondIndex === thirdIndex) {
			alert('Selamat, kamu menang!')
			saldo += yourBet * 10
			updateSaldo()
		}
	}, 300)
}

spin.addEventListener('click', function () {
	if (saldo < yourBet) {
		alert('Saldo tidak cukup untuk bermain!')
		return
	}
	singleSpin()
})

const autoSpin = document.querySelector('.auto')
autoSpin.addEventListener('click', function () {
	if (saldo < yourBet) {
		alert('Saldo tidak cukup untuk bermain!')
		return
	}

	const interval = setInterval(function () {
		if (saldo < yourBet) {
			clearInterval(interval)
			alert('Saldo tidak cukup untuk bermain!')
			return
		}
		singleSpin()
	}, 1200)

	const stopSpin = document.querySelector('.stop')
	stopSpin.addEventListener('click', function () {
		clearInterval(interval)
	})
})

function spinMultipleTimes(count) {
	let spinCount = 0

	const interval = setInterval(function () {
		if (saldo < yourBet) {
			clearInterval(interval)
			alert('Saldo tidak cukup untuk bermain!')
			return
		}

		singleSpin()

		spinCount++
		if (spinCount >= count) {
			clearInterval(interval)
		}
	}, 1200)

	const stopSpin = document.querySelector('.stop')
	stopSpin.addEventListener('click', function () {
		clearInterval(interval)
	})
}

const tenSpin = document.querySelector('.tenSpin')
tenSpin.addEventListener('click', function () {
	spinMultipleTimes(10)
})

const twentySpin = document.querySelector('.twentySpin')
twentySpin.addEventListener('click', function () {
	spinMultipleTimes(20)
})

const fiftySpin = document.querySelector('.fiftySpin')
fiftySpin.addEventListener('click', function () {
	spinMultipleTimes(50)
})

const hundredSpin = document.querySelector('.hundredSpin')
hundredSpin.addEventListener('click', function () {
	spinMultipleTimes(100)
})

const betContainer = document.querySelector('.bet-container')
const changeBetButton = document.querySelector('.change-bet')

function addBlur() {
	document.querySelector('.wrapper').classList.add('blur')
}

function removeBlur() {
	document.querySelector('.wrapper').classList.remove('blur')
}

changeBetButton.addEventListener('click', function () {
	addBlur()
	betContainer.style.display = 'flex'
})

betContainer.addEventListener('click', function () {
	removeBlur()
	betContainer.style.display = 'none'
})
