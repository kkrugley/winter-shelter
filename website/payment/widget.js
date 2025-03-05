(function () {
    // Функция для загрузки внешних скриптов
    function loadScript(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // Функция для загрузки внешних стилей
    function loadStyles(url) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
    }

    // Загрузка зависимостей (Bootstrap, QRCode.js)
    Promise.all([
        loadStyles('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'),
        loadScript('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js'),
        loadScript('https://cdn.jsdelivr.net/npm/qrcode@1.5.0/build/qrcode.min.js'),
        loadScript('https://unpkg.com/tonweb@0.0.29/dist/tonweb.js')
    ]).then(() => {
        // HTML-код виджета
        const widgetHtml = `
            <div class="container my-5">
                <div class="card shadow-sm mx-auto" style="max-width: 500px;">
                    <div class="card-body">
                        <h5 class="card-title text-center mb-4">Поддержите проект</h5>
                        <!-- QR-код и плейсхолдер -->
                        <div class="text-center mb-4">
                            <div id="qrcodePlaceholder" class="d-flex justify-content-center align-items-center" style="min-height: 200px;">
                                <div class="spinner-border text-primary" role="status">
                                    <span class="visually-hidden">Загрузка...</span>
                                </div>
                            </div>
                            <div id="qrcode" class="d-none"></div>
                            <a href="#" id="tonLink" class="btn btn-outline-primary mt-3 d-none">Открыть кошелек</a>
                            <div id="transactionStatus" class="mt-3 text-muted"></div>
                        </div>
                        <!-- Форма -->
                        <form id="donationForm">
                            <div class="mb-3">
                                <label for="amount" class="form-label">Сумма (TON)</label>
                                <input type="number" step="0.1" min="0.1" class="form-control" id="amount" placeholder="Введите сумму" required>
                                <div class="invalid-feedback">Минимум 0.1 TON</div>
                            </div>
                            <div class="mb-3">
                                <label for="message" class="form-label">Сообщение (до 200 символов)</label>
                                <textarea class="form-control" id="message" rows="3" maxlength="200" placeholder="Ваше сообщение"></textarea>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Адрес кошелька</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="walletAddress" value="industrial-design.ton" readonly>
                                    <button class="btn btn-outline-secondary" type="button" id="copyAddress">Копировать</button>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary w-100">Пожертвовать</button>
                        </form>
                    </div>
                </div>
            </div>
        `;

        // Добавляем HTML в элемент с ID "ton-donation-widget"
        const widgetContainer = document.getElementById('ton-donation-widget');
        if (!widgetContainer) {
            console.error('Widget container with ID "ton-donation-widget" not found!');
            return;
        }
        widgetContainer.innerHTML = widgetHtml;

        // Добавляем кастомные стили
        const style = document.createElement('style');
        style.textContent = `
            #ton-donation-widget .card {
                max-width: 500px;
                margin: 0 auto;
            }
            #ton-donation-widget #qrcodePlaceholder, #ton-donation-widget #qrcode {
                min-height: 200px;
            }
            @media (max-width: 767px) {
                #ton-donation-widget #qrcodePlaceholder, #ton-donation-widget #qrcode {
                    margin: 0 auto;
                    max-width: 100%;
                }
                #ton-donation-widget .btn-primary {
                    padding: 12px;
                    font-size: 1.1rem;
                }
            }
            @media (prefers-color-scheme: dark) {
                #ton-donation-widget {
                    background-color: #212529;
                    color: #f8f9fa;
                }
                #ton-donation-widget .card {
                    background-color: #343a40;
                    border: none;
                }
                #ton-donation-widget .form-control {
                    background-color: #495057;
                    color: #f8f9fa;
                    border-color: #6c757d;
                }
                #ton-donation-widget .text-muted {
                    color: #adb5bd !important;
                }
                #ton-donation-widget .spinner-border {
                    border-color: #adb5bd;
                    border-right-color: transparent;
                }
            }
        `;
        document.head.appendChild(style);

        // Логика виджета
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

            // Валидация адреса
            if (!isValidTonAddress(walletAddress)) {
                alert('Некорректный TON-адрес!');
                return;
            }

            // Конвертация суммы в нанотоны
            const amountInNanotons = Math.floor(amount * 1e9);

            // Формирование ссылки для TON
            let tonUrl = `ton://transfer/${walletAddress}?amount=${amountInNanotons}`;
            if (message) {
                tonUrl += `&text=${encodeURIComponent(message)}`;
            }

            // Скрываем плейсхолдер и показываем QR-код
            qrcodePlaceholder.classList.add('d-none');
            qrcodeDiv.classList.remove('d-none');

            // Генерация QR-кода
            qrcodeDiv.innerHTML = '';
            QRCode.toCanvas(tonUrl, { width: 200 }, (err, canvas) => {
                if (err) console.error(err);
                qrcodeDiv.appendChild(canvas);
            });

            // Показываем кнопку "Открыть кошелек"
            tonLink.href = tonUrl;
            tonLink.classList.remove('d-none');

            // Отображение статуса
            transactionStatus.textContent = 'Ожидание транзакции...';

            // Заглушка для статуса транзакции
            setTimeout(() => {
                transactionStatus.textContent = 'Транзакция успешно отправлена!';
            }, 5000);
        });
    }).catch(err => {
        console.error('Failed to load widget dependencies:', err);
    });
})();