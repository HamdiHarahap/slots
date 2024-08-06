const images = [
	{ src: 'assets/images/apple.png', id: 1 },
	{ src: 'assets/images/cherries.png', id: 2 },
	{ src: 'assets/images/coconut.png', id: 3 },
	{ src: 'assets/images/guava.png', id: 4 },
	{ src: 'assets/images/mangosteen.png', id: 5 },
	{ src: 'assets/images/strawberry.png', id: 6 },
]

const deposit = document.querySelector('.saldo')
const jumlahSaldo = document.querySelector('.data-saldo')

let saldo = 0
let depo = 0

function updateSaldo() {
	jumlahSaldo.textContent = `${saldo}`
}

deposit.addEventListener('click', function () {
	const isiSaldo = prompt('Masukkan jumlah saldo!')
	saldo += parseInt(isiSaldo)
	depo += parseInt(isiSaldo)
	Swal.fire({
		icon: 'info',
		text: `Saldo masuk sebesar: ${isiSaldo}`,
	})
	updateSaldo()
})

const firstImage = document.querySelector('.first')
const secondImage = document.querySelector('.second')
const thirdImage = document.querySelector('.third')

function spinImage(element, image) {
	const imgElement = document.createElement('img')
	imgElement.src = image.src
	imgElement.id = image.id
	element.innerHTML = ''
	element.appendChild(imgElement)
	return image.id
}

let spinCount = 0
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

function calculateReward(imageId) {
	switch (imageId) {
		case 1:
			return yourBet * 10
		case 2:
			return yourBet * 12
		case 3:
			return yourBet * 15
		case 4:
			return yourBet * 20
		case 5:
			return yourBet * 22
		case 6:
			return yourBet * 25
		default:
			return 0
	}
}

function handleSpin() {
	const firstId = spinImage(
		firstImage,
		images[Math.floor(Math.random() * images.length)]
	)
	const secondId = spinImage(
		secondImage,
		images[Math.floor(Math.random() * images.length)]
	)
	const thirdId = spinImage(
		thirdImage,
		images[Math.floor(Math.random() * images.length)]
	)

	setTimeout(function () {
		if (firstId === secondId && secondId === thirdId) {
			const reward = calculateReward(firstId)
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

function singleSpin() {
	if (saldo < yourBet) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Saldo tidak cukup untuk bermain!',
		})
		return
	}

	saldo -= yourBet
	updateSaldo()
	spinCount++

	if (depo >= 57000 && spinCount === 8) {
		const randomIndex = Math.floor(Math.random() * images.length)
		const image = images[randomIndex]
		spinImage(firstImage, image)
		spinImage(secondImage, image)
		spinImage(thirdImage, image)

		const reward = calculateReward(image.id)
		Swal.fire({
			icon: 'success',
			title: 'Yayyy..',
			text: `Selamat kamu menang ${reward}`,
		})
		saldo += reward
		updateSaldo()

		spinCount = 0
		depo = 0
	} else {
		handleSpin()
	}
}

spin.addEventListener('click', singleSpin)

const autoSpin = document.querySelector('.auto')
const tenSpin = document.querySelector('.tenSpin')
const twentySpin = document.querySelector('.twentySpin')
const fiftySpin = document.querySelector('.fiftySpin')
const hundredSpin = document.querySelector('.hundredSpin')

function multipleSpin(count) {
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

autoSpin.addEventListener('click', function () {
	multipleSpin(Infinity)
})
tenSpin.addEventListener('click', function () {
	multipleSpin(10)
})
twentySpin.addEventListener('click', function () {
	multipleSpin(20)
})
fiftySpin.addEventListener('click', function () {
	multipleSpin(50)
})
hundredSpin.addEventListener('click', function () {
	multipleSpin(100)
})

const betContainer = document.querySelector('.bet-container')
const changeBetButton = document.querySelector('.change-bet')
const info = document.querySelector('.info-icon')

changeBetButton.addEventListener('click', function () {
	document.querySelector('.wrapper').classList.add('blur')
	betContainer.style.display = 'flex'
})

betContainer.addEventListener('click', function () {
	document.querySelector('.wrapper').classList.remove('blur')
	betContainer.style.display = 'none'
})

info.addEventListener('click', function () {
	document.querySelector('.info-container').classList.toggle('show')
	document.querySelector('.wrapper').classList.toggle('blur')
})
