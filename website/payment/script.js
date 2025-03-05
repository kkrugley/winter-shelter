document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('donationForm');
    const amountInput = document.getElementById('amount');
    const messageInput = document.getElementById('message');
    const walletAddressInput = document.getElementById('walletAddress');
    const copyAddressBtn = document.getElementById('copyAddress');
    const tonLink = document.getElementById('tonLink');
    const transactionStatus = document.getElementById('transactionStatus');
    const qrcodeDiv = document.getElementById('qrcode');
    const qrcodePlaceholder = document.getElementById('qrcodePlaceholder');

    // Валидация адреса TON (для домена нужно резолвить через TON DNS)
    function isValidTonAddress(address) {
        // В реальном проекте нужно использовать tonweb для резолвинга домена
        // Здесь для упрощения предполагаем, что адрес или домен корректен
        return address.length > 0;
    }

    // Копирование адреса в буфер обмена
    copyAddressBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(walletAddressInput.value).then(() => {
            alert('Адрес скопирован в буфер обмена!');
        });
    });

    // Обработка отправки формы
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const amount = parseFloat(amountInput.value);
        const message = messageInput.value.trim();
        const walletAddress = walletAddressInput.value;

        // Валидация суммы
        if (amount < 0.1) {
            amountInput.classList.add('is-invalid');
            return;
        } else {
            amountInput.classList.remove('is-invalid');
        }

        // Валидация адреса (для домена нужен резолвинг)
        if (!isValidTonAddress(walletAddress)) {
            alert('Некорректный TON-адрес!');
            return;
        }

        // Конвертация суммы в нанотоны (1 TON = 10^9 нанотонов)
        const amountInNanotons = Math.floor(amount * 1e9);

        // Формирование ссылки для TON
        // Примечание: Для домена industrial-design.ton нужно резолвить адрес через TON DNS
        let tonUrl = `ton://transfer/${walletAddress}?amount=${amountInNanotons}`;
        if (message) {
            tonUrl += `&text=${encodeURIComponent(message)}`;
        }

        // Скрываем плейсхолдер и показываем QR-код
        qrcodePlaceholder.classList.add('d-none');
        qrcodeDiv.classList.remove('d-none');

        // Генерация QR-кода
        qrcodeDiv.innerHTML = ''; // Очистка предыдущего QR-кода
        QRCode.toCanvas(tonUrl, { width: 200 }, (err, canvas) => {
            if (err) console.error(err);
            qrcodeDiv.appendChild(canvas);
        });

        // Показываем кнопку "Открыть кошелек"
        tonLink.href = tonUrl;
        tonLink.classList.remove('d-none');

        // Отображение статуса
        transactionStatus.textContent = 'Ожидание транзакции...';

        // Пример опроса статуса транзакции (заглушка, требует интеграции с TON API)
        setTimeout(() => {
            transactionStatus.textContent = 'Транзакция успешно отправлена!';
        }, 5000);
    });
});