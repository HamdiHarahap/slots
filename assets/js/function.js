function updateSaldo() {
	jumlahSaldo.textContent = `${saldo}`
}

function spinImage(element) {
	const randomIndex = Math.floor(Math.random() * images.length)
	const image = document.createElement('img')
	image.src = images[randomIndex]
	element.innerHTML = ''
	element.appendChild(image)
	return randomIndex
}

function singleSpin() {
	if (saldo < 1000) {
		alert('Saldo tidak cukup untuk bermain!')
		return
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
}

function spinMultipleTimes(count) {
	let spinCount = 0

	const interval = setInterval(function () {
		if (saldo < 1000) {
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
