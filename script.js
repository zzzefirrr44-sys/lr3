
function getFullName(firstName, lastName) {
    return firstName + " " + lastName;
}

function showGreeting(fullName, age) {
    return "Hello, " + fullName + "! You are " + age + " years old.";
}

document.getElementById("task1").addEventListener("click", function () {
    const firstName = prompt("Введіть ім'я:");
    const lastName = prompt("Введіть прізвище:");
    const age = prompt("Введіть вік:");

    const fullName = getFullName(firstName, lastName);
    const greeting = showGreeting(fullName, age);

    document.getElementById("result1").textContent = greeting;
});


function getStudentInfo() {
    const name = prompt("Введіть ім'я студента:");
    const score = Number(prompt("Введіть бал від 0 до 12:"));

    return {
        name: name,
        score: score
    };
}

function checkGrade(score) {
    if (score >= 10 && score <= 12) {
        return "Excellent";
    }

    if (score >= 7 && score <= 9) {
        return "Good";
    }

    if (score >= 4 && score <= 6) {
        return "Satisfactory";
    }

    return "Fail";
}

function showResult(name, grade) {
    return "Student: " + name + "<br>Grade: " + grade;
}

document.getElementById("task2").addEventListener("click", function () {
    const student = getStudentInfo();
    const grade = checkGrade(student.score);

    document.getElementById("result2").innerHTML =
        showResult(student.name, grade);
});


function calculateTip(amount, percent = 10) {
    return amount * percent / 100;
}

function showTipResult(amount, tip, percent = 10) {
    const total = amount + tip;

    return (
        "Bill: " + amount + " грн<br>" +
        "Tip (" + percent + "%): " + tip + " грн<br>" +
        "Total: " + total + " грн"
    );
}

document.getElementById("task3").addEventListener("click", function () {
    const amount = Number(prompt("Введіть загальну суму рахунку:"));

    const tip = calculateTip(amount);
    const result = showTipResult(amount, tip);

    document.getElementById("result3").innerHTML = result;
});


function startGreetingTimer(message, seconds, callback) {
    document.getElementById("result4").textContent =
        "Повідомлення з'явиться через " + seconds + " секунд...";

    setTimeout(() => {
        document.getElementById("result4").textContent = message;
        callback();
    }, seconds * 1000);
}

document.getElementById("task4").addEventListener("click", function () {
    const message = prompt("Введіть повідомлення:");
    const seconds = Number(prompt("Через скільки секунд показати повідомлення?"));

    startGreetingTimer(
        message,
        seconds,
        () => alert("Time is up!")
    );
});


function calculate(a, b, operation) {
    if (operation === "+") {
        return a + b;
    }

    if (operation === "-") {
        return a - b;
    }

    if (operation === "*") {
        return a * b;
    }

    if (operation === "/") {
        if (b === 0) {
            return "Division by zero";
        }

        return a / b;
    }

    return "Invalid operation";
}

function showCalculatorResult() {
    const a = Number(prompt("Введіть перше число:"));
    const b = Number(prompt("Введіть друге число:"));
    const operation = prompt("Введіть операцію: +, -, * або /");

    const result = calculate(a, b, operation);

    alert("Результат: " + result);

    return result;
}

document.getElementById("task5").addEventListener("click", function () {
    const result = showCalculatorResult();

    document.getElementById("result5").textContent =
        "Результат: " + result;
});


function createClickCounter() {
    let count = 0;

    return function () {
        count++;

        console.log("Поточне значення лічильника:", count);

        document.getElementById("result6").textContent =
            "Поточне значення лічильника: " + count;
    };
}

const clickCounter = createClickCounter();

document.getElementById("task6").addEventListener("click", function () {
    clickCounter();
});


function* randomGenerator(min, max) {
    while (true) {
        const randomNumber =
            Math.floor(Math.random() * (max - min + 1)) + min;

        yield randomNumber;
    }
}

let randomGen = null;

document.getElementById("task7").addEventListener("click", function () {
    const min = Number(prompt("Введіть мінімальне число:"));
    const max = Number(prompt("Введіть максимальне число:"));

    if (min > max) {
        document.getElementById("out").textContent =
            "Помилка: мінімальне число не може бути більшим за максимальне.";
        return;
    }

    randomGen = randomGenerator(min, max);

    document.getElementById("out").textContent =
        "Генератор створено. Натискайте Next number.";
});

document.getElementById("next").addEventListener("click", function () {
    if (randomGen === null) {
        document.getElementById("out").textContent =
            "Спочатку встановіть межі генератора.";
        return;
    }

    const result = randomGen.next();

    document.getElementById("out").textContent =
        "Наступне випадкове число: " + result.value;
});


function* passwordGenerator() {
    let password = "";

    while (true) {
        const symbol = yield;

        if (symbol === "done") {
            return password;
        }

        password += symbol;
    }
}

document.getElementById("task8").addEventListener("click", function () {
    const generator = passwordGenerator();

    generator.next();

    while (true) {
        const symbol = prompt(
            "Введіть символ пароля або напишіть 'done' для завершення:"
        );

        if (symbol === null) {
            document.getElementById("result8").textContent =
                "Створення пароля скасовано.";
            return;
        }

        const result = generator.next(symbol);

        if (result.done) {
            document.getElementById("result8").textContent =
                "Згенерований пароль: " + result.value;
            break;
        }
    }
});


function* chatBot() {
    const name = yield "Hi! What is your name?";
    const mood = yield "Nice to meet you, " + name + "! How are you?";

    yield "Goodbye!";
}

document.getElementById("task9").addEventListener("click", function () {
    const bot = chatBot();

    const firstQuestion = bot.next().value;
    const name = prompt(firstQuestion);

    if (name === null) {
        return;
    }

    const secondQuestion = bot.next(name).value;
    const mood = prompt(secondQuestion);

    if (mood === null) {
        return;
    }

    const goodbye = bot.next(mood).value;

    document.getElementById("result9").innerHTML =
        "<p>Hi! What is your name? " + name + "</p>" +
        "<p>Nice to meet you, " + name + "! How are you? " + mood + "</p>" +
        "<p>" + goodbye + "</p>";
});


const userName = prompt("Введіть ваше ім'я для завдання 4 рівня 10–12:");

const user = {
    name: userName,

    say() {
        return "Hello, " + this.name + "!";
    }
};

const sayHello = user.say.bind(user);

document.getElementById("hello").addEventListener("click", function () {
    document.getElementById("result10").textContent = sayHello();
});

