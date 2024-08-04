feather.replace()

const images = [
	{ src: 'assets/images/apple.png', id: 1 },
	{ src: 'assets/images/cherries.png', id: 2 },
	{ src: 'assets/images/coconut.png', id: 3 },
	{ src: 'assets/images/guava.png', id: 4 },
	{ src: 'assets/images/mangosteen.png', id: 5 },
	{ src: 'assets/images/strawberry.png', id: 6 },
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
	Swal.fire({
		icon: 'info',
		text: `Saldo masuk sebesar: ${isiSaldo}`,
	})
	updateSaldo()
})

const firstImage = document.querySelector('.first')
const secondImage = document.querySelector('.second')
const thirdImage = document.querySelector('.third')

function spinImage(element) {
	const randomIndex = Math.floor(Math.random() * images.length)
	const image = images[randomIndex]
	const imgElement = document.createElement('img')
	imgElement.src = image.src
	imgElement.id = image.id
	element.innerHTML = ''
	element.appendChild(imgElement)
	return image.id
}

let yourBet = 800

const bets = document.querySelectorAll('.bet')
const dataBet = document.querySelector('.data-bet')

bets.forEach((bet) => {
	bet.addEventListener('click', function () {
		yourBet = parseInt(bet.textContent)
		Swal.fire({
			icon: 'info',
			text: `Anda bertaruh di: ${yourBet}`,
		})
		dataBet.textContent = `${yourBet}`
	})
})

const spin = document.querySelector('.spin')

function singleSpin() {
	saldo -= yourBet
	updateSaldo()

	const firstId = spinImage(firstImage)
	const secondId = spinImage(secondImage)
	const thirdId = spinImage(thirdImage)

	setTimeout(function () {
		if (firstId === secondId && secondId === thirdId) {
			let reward = 0
			switch (firstId) {
				case 1:
					reward = yourBet * 10
					break
				case 2:
					reward = yourBet * 12
					break
				case 3:
					reward = yourBet * 15
					break
				case 4:
					reward = yourBet * 20
					break
				case 5:
					reward = yourBet * 22
					break
				case 6:
					reward = yourBet * 25
					break
			}
			Swal.fire({
				icon: 'success',
				title: 'Yayyy..',
				text: `Selamat kamu menang ${reward}`,
			})
			saldo += reward
			updateSaldo()
		}
	}, 300)
}

spin.addEventListener('click', function () {
	if (saldo < yourBet) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Saldo tidak cukup untuk bermain!',
		})
		return
	}
	singleSpin()
})

const autoSpin = document.querySelector('.auto')
autoSpin.addEventListener('click', function () {
	if (saldo < yourBet) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Saldo tidak cukup untuk bermain!',
		})
		return
	}

	const interval = setInterval(function () {
		if (saldo < yourBet) {
			clearInterval(interval)
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Saldo tidak cukup untuk bermain!',
			})
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
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Saldo tidak cukup untuk bermain!',
			})
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

changeBetButton.addEventListener('click', function () {
	document.querySelector('.wrapper').classList.add('blur')
	betContainer.style.display = 'flex'
})

betContainer.addEventListener('click', function () {
	document.querySelector('.wrapper').classList.remove('blur')
	betContainer.style.display = 'none'
})

const info = document.querySelector('.info-icon')
info.addEventListener('click', function () {
	const infoContainer = document.querySelector('.info-container')
	infoContainer.classList.toggle('show')
	document.querySelector('.wrapper').classList.toggle('blur')
})
