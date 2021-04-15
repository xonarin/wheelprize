    // Create new wheel object specifying the parameters at creation time.
    let theWheel = new Winwheel({
        'numSegments'  : 10,         // Количество сегментов
        'outerRadius'  : 295,       // Размер колеса.
        'centerX'      : 303,       // Используется для правильного позиционирования на фоне.
        'centerY'      : 305,
        'textFontSize' : 25,        // Размер шрифта.
        'segments'     :        // Определите сегменты, включая цвет и текст.
        [
           {'fillStyle' : '#ffc107', 'textFillStyle' : '#fff', 'strokeStyle' : '#ffffff', 'textStrokeStyle' : null,  'text' : 'Prize 1'},
           {'fillStyle' : '#3f51b5', 'textFillStyle' : '#fff', 'strokeStyle' : '#ffffff', 'textStrokeStyle' : null,  'text' : 'Prize 2'},
           {'fillStyle' : '#ffa500', 'textFillStyle' : '#fff', 'strokeStyle' : '#ffffff', 'textStrokeStyle' : null,  'text' : 'Prize 3'},
           {'fillStyle' : '#4caf50', 'textFillStyle' : '#fff', 'strokeStyle' : '#ffffff', 'textStrokeStyle' : null,  'text' : 'Prize 4'},
           {'fillStyle' : '#ffa500', 'textFillStyle' : '#fff', 'strokeStyle' : '#ffffff', 'textStrokeStyle' : null,  'text' : 'Prize 5'},
           {'fillStyle' : '#ff5722', 'textFillStyle' : '#fff', 'strokeStyle' : '#ffffff', 'textStrokeStyle' : null,  'text' : 'Prize 6'},
           {'fillStyle' : '#7de6ef', 'textFillStyle' : '#fff', 'strokeStyle' : '#ffffff', 'textStrokeStyle' : null,  'text' : 'Prize 7'},
           {'fillStyle' : '#e7706f', 'textFillStyle' : '#fff', 'strokeStyle' : '#ffffff', 'textStrokeStyle' : null,  'text' : 'Prize 8'},
           {'fillStyle' : '#7de6ef', 'textFillStyle' : '#fff', 'strokeStyle' : '#ffffff', 'textStrokeStyle' : null,  'text' : 'Prize 9'},
           {'fillStyle' : '#66bb6a', 'textFillStyle' : '#fff', 'strokeStyle' : '#ffffff', 'textStrokeStyle' : null,  'text' : 'Prize 10'}
        ],
        'animation' :           // Укажите анимацию для использования.
        {
            'type'     : 'spinToStop',
            'duration' : 5,     // Продолжительность в секундах.
            'spins'    : 8,     // Количество полных вращений.
            'callbackFinished' : alertPrize
        }
    });

    // Переменные, используемые кодом на этой странице для управления питанием.
    let wheelPower    = 0;
    let wheelSpinning = false;
    let wheelSpinsCount = 3;
    let wheelSpins = document.querySelector(".wheelSpins");
    let wheelPrize = document.querySelector(".wheelprize");
    let wheelStarsButton = document.querySelector(".wheelstartbutton");
    let wheelSubmitButton = document.querySelector(".wheelsubmit");
    let wheelList = document.querySelector(".wheelprize-list");
    let wheelItem = document.querySelectorAll(".wheelprize-item");
    let wheelInputPhone = document.querySelector(".wheelprizeinput-phone");
    let wheelInput = document.querySelector(".wheelprizeinput-final");
    let wheelFixed = document.querySelector(".wheelfixed");
    let wheelTransitBlock = document.querySelector(".wheelblock");
    let wheelOverlay = document.querySelector(".wheeloverlay");
    let wheelCloseButton= document.querySelector(".wheelclose-button");
    let wheelcookie = getCookie('wheeltime');

    // возвращает cookie с именем name, если есть, если нет, то undefined
    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    // Если кука wheeltime есть, то не показываем блок
    if(wheelcookie) {
        console.log("EST");
        wheelFixed.style.display = "none";
    } else {
        console.log("NET");
    }

    // Если кликаем по иконке фиксированной, то открывается колесо и оверлей
    wheelFixed.addEventListener('click', () => {
        wheelTransitBlock.classList.add('active');
        wheelOverlay.classList.add('active');
    });

    // Если кликаем по оверлею, то закрываем колесо и оверлей
    wheelOverlay.addEventListener('click', () => {
        wheelTransitBlock.classList.remove('active');
        wheelOverlay.classList.remove('active');
    });

    // Если кликаем по крестику закрытия, то закрываем колесо и оверлей
    wheelCloseButton.addEventListener('click', () => {
        wheelTransitBlock.classList.remove('active');
        wheelOverlay.classList.remove('active');
    });


    // Отлавливаем элемент в родители на который мы нажали, при выборе приза 1 из 3
    wheelList.addEventListener('click', (event) => {
    let target = event.target;
    
        // Проверяем тот ли это элемент который нам нужен 
        if(target.classList.contains('wheelprize-item')) {
            for(let i = 0; i < wheelItem.length; i++) {
                // Удаляем класс актив у всех элементов
                wheelItem[i].classList.remove('active');
            }

            // Добавляем тому на который нажали
            target.classList.add('active');
            // Теперь получаем из выбранного приза содержимое и сохраняем в переменную
            let wheelResult = target.innerHTML;
            // Теперь вставляем в инпут наш приз
            wheelInput.value = "Ваш приз:" + ' ' + wheelResult;
            // Удаляем у кнопки отправки атрибут дизейбл, добавляем класс вилкуки и меняем текст на Получить приз
            wheelSubmitButton.removeAttribute('disabled');
            wheelSubmitButton.classList.add("wheelsubmitcookie");
            wheelSubmitButton.innerHTML = "Получить приз";
        }
    
    });

    // При клике на кнопку отправки формы, проверяем есть ли у неё класс wheelsubmitcookie
    // если есть, то создаём куку wheeltime перед отправкой на 1 час
    wheelSubmitButton.addEventListener('click', function() {
        if(wheelSubmitButton.classList.contains('wheelsubmitcookie')) {
            document.cookie = "wheeltime=1; max-age=3600";
        }

        if(!wheelInputPhone.value) {
            wheelInputPhone.style.border = "2px solid red";
            wheelInputPhone.classList.add("placered");
        }
    })



    function startSpin()
    {
        if(wheelSpinsCount >= 1) {
            console.log("Запуск.");

            // Убедитесь, что вращение нельзя щелкнуть снова, когда оно уже запущено.
            if (wheelSpinning == false) {
                // Based on the power level selected adjust the number of spins for the wheel, the more times is has
                // to rotate with the duration of the animation the quicker the wheel spins.
                if (wheelPower == 1) {
                    theWheel.animation.spins = 3;
                } else if (wheelPower == 2) {
                    theWheel.animation.spins = 8;
                } else if (wheelPower == 3) {
                    theWheel.animation.spins = 15;
                }


                // Если инпут с вводом телефона заполенен, то
                // скрываем этот инпут и запускаем вращение колеса
                // дальше восстанавливаем угол колеса, а дальше отсчитываем сколько спинов ещё можно сделать
                // сверху в переменной wheelSpinsCount указали 3 спина, от этого числа отнимаем при каждом запуске колеса 
                // wheelSpinsCount-- и записываем результат (сумму спинов) в див wheelSpins
                //Если же инпут не заполнен, то тогда навешиваем класс для подсветки этого инпута красным цветом, валидация инпута.

                    theWheel.startAnimation();
                    theWheel.rotationAngle = 0;     // Повторно устанавливаем угол колеса на 0 градусов.
                    wheelSpinning = false;
                    wheelSpinsCount--; // отсчитываем количество спинов
                    wheelSpins.innerHTML = wheelSpinsCount;

                // wheelSpinning = false; Установите значение true, чтобы нельзя было изменить питание и повторно включить кнопку вращения во время
                // Пользователь должен будет выполнить сброс перед повторным запуском.

            }

        } else {
            console.log("Не норм");
        }
    }




    // -------------------------------------------------------
    // Тут сам вывод результата колеса
    function alertPrize(indicatedSegment)
    {
        // Если телефон заполнен и произошёл запуск колеса, то дальше мы
        // записываем в wheelItem[тут указываем переменную с числом спина на данный момент] див результат выпавшей секции.
        // Когда записали информацию о призы в див, то открываем его и так дальше с остальными дивами.

            wheelItem[wheelSpinsCount].innerHTML =  indicatedSegment.text;
            wheelItem[wheelSpinsCount].style.display =  "block";
            wheelPrize.style.display =  "block";

        // Когда спинов не осталось, то скрываем кнопку запуска колеса и показываем кнопку отправки формы.
        // Устанавливаем кнопке текст Выберите один из призов
        // Дальше этот текст сменится на Получить приз, так как функцией выше при клике на приз, мы меняем текст кнопки.
        // На кнопку накидываем атрибут дизейбл, чтоб пользователь не отправил форму с пустым инпутом.
        // В функции выше, при выборе приза дизейбл уберёться.

        if(wheelSpinsCount <= 0) {
            wheelInputPhone.style.display = "block";
            wheelStarsButton.style.display = "none";
            wheelSubmitButton.style.display = "block";
            wheelSubmitButton.innerHTML = "Выберите один из призов";
            wheelSubmitButton.setAttribute('disabled', 'disabled');
        }
    }