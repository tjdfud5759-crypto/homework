/*
    querySelector를 사용하여
    HTML 요소 한 개를 선택한다.
*/
const display = document.querySelector("#display");

const powerButton = document.querySelector(
    '[data-action="power"]'
);

const clearButton = document.querySelector(
    '[data-action="clear"]'
);

const calculateButton = document.querySelector(
    '[data-action="calculate"]'
);

/*
    querySelectorAll을 사용하여
    여러 개의 숫자 버튼과 연산자 버튼을 선택한다.
*/
const numberButtons = document.querySelectorAll(
    ".number"
);

const operatorButtons = document.querySelectorAll(
    ".operator"
);

const calculatorButtons = document.querySelectorAll(
    "button:not(.on-off)"
);


/* 현재 계산식 */
let currentFormula = "";


/* 계산기 전원 상태 */
let isPowerOn = true;


/* 계산 완료 여부 */
let isCalculated = false;


/*
    처음 페이지가 열렸을 때
    전원 버튼을 초록색으로 표시한다.
*/
powerButton.classList.add("on");


/* 덧셈 함수 */
function add(a, b) {
    return a + b;
}


/* 뺄셈 함수 */
function subtract(a, b) {
    return a - b;
}


/* 곱셈 함수 */
function multiply(a, b) {
    return a * b;
}


/* 나눗셈 함수 */
function divide(a, b) {
    return a / b;
}


/*
    숫자 버튼을 눌렀을 때
    숫자를 계산식에 추가한다.
*/
function appendNumber(number) {
    if (!isPowerOn) {
        return;
    }

    /*
        계산 결과가 나온 상태에서 숫자를 누르면
        새로운 계산식을 시작한다.
    */
    if (isCalculated) {
        currentFormula = "";
        display.value = "0";
        isCalculated = false;
    }

    let value = number;

    /*
        현재 입력하고 있는 숫자를 구한다.
        소수점이 중복으로 입력되는 것을 막는다.
    */
    const formulaParts = currentFormula
        .trim()
        .split(/\s+/);

    const currentNumber =
        formulaParts[formulaParts.length - 1] || "";

    if (value === ".") {
        if (currentNumber.includes(".")) {
            return;
        }

        /*
            수식 시작 또는 연산자 다음에
            소수점을 누르면 0.으로 입력한다.
        */
        if (
            currentFormula === "" ||
            currentFormula.endsWith(" ")
        ) {
            value = "0.";
        }
    }

    /*
        화면에 0만 있는 상태에서 다른 숫자를 누르면
        기존 0을 새 숫자로 교체한다.
    */
    if (
        currentFormula === "0" &&
        value !== "."
    ) {
        currentFormula = value;
    } else {
        currentFormula += value;
    }

    display.value = currentFormula;
}


/*
    연산자 버튼을 눌렀을 때
    계산식에 연산자를 추가한다.
*/
function appendOperator(operator) {
    if (!isPowerOn) {
        return;
    }

    if (
        display.value === "Error" ||
        display.value === "DivBy0"
    ) {
        return;
    }

    /*
        계산식이 비어 있으면 0부터 시작한다.
    */
    if (currentFormula === "") {
        currentFormula = "0";
    }

    /*
        계산 결과에 이어서 연산할 수 있도록 한다.
    */
    if (isCalculated) {
        isCalculated = false;
    }

    /*
        연산자가 연속으로 눌린 경우
        마지막 연산자를 새 연산자로 교체한다.
    */
    if (currentFormula.endsWith(" ")) {
        currentFormula = currentFormula
            .trimEnd()
            .replace(/[+\-*/]$/, operator);

        currentFormula += " ";
    } else {
        currentFormula +=
            " " + operator + " ";
    }

    display.value = currentFormula;
}


/*
    C 버튼을 눌렀을 때
    계산식을 초기화한다.
*/
function clearDisplay() {
    if (!isPowerOn) {
        return;
    }

    display.value = "0";

    currentFormula = "";

    isCalculated = false;
}


/*
    계산기 전원을 켜거나 끈다.
*/
function togglePower() {
    isPowerOn = !isPowerOn;

    if (isPowerOn) {
        display.value = "0";

        display.style.backgroundColor = "#222222";

        powerButton.classList.add("on");

        calculatorButtons.forEach(function (button) {
            button.disabled = false;
        });
    } else {
        display.value = "";

        display.style.backgroundColor = "#111111";

        powerButton.classList.remove("on");

        calculatorButtons.forEach(function (button) {
            button.disabled = true;
        });

        currentFormula = "";

        isCalculated = false;
    }
}


/*
    전달받은 계산식을 실제로 계산한다.
*/
function calculate(formula) {
    const tokens = formula
        .trim()
        .split(/\s+/);

    /*
        숫자 하나만 입력한 경우에는
        해당 숫자를 그대로 반환한다.
    */
    if (tokens.length === 1) {
        const singleNumber = Number(tokens[0]);

        if (isNaN(singleNumber)) {
            return "Error";
        }

        return singleNumber;
    }

    /*
        숫자 연산자 숫자 형태가 아니면
        잘못된 계산식이다.
    */
    if (
        tokens.length < 3 ||
        tokens.length % 2 === 0
    ) {
        return "Error";
    }

    /*
        1단계:
        곱셈과 나눗셈을 먼저 계산한다.
    */
    const intermediateTokens = [];

    let i = 0;

    while (i < tokens.length) {
        const token = tokens[i];

        if (
            token === "*" ||
            token === "/"
        ) {
            const left = Number(
                intermediateTokens.pop()
            );

            const right = Number(
                tokens[i + 1]
            );

            if (
                isNaN(left) ||
                isNaN(right)
            ) {
                return "Error";
            }

            let result;

            if (token === "*") {
                result = multiply(
                    left,
                    right
                );
            } else {
                if (right === 0) {
                    return "DivBy0";
                }

                result = divide(
                    left,
                    right
                );
            }

            intermediateTokens.push(result);

            i += 2;
        } else {
            intermediateTokens.push(token);

            i++;
        }
    }

    /*
        2단계:
        덧셈과 뺄셈을 왼쪽부터 계산한다.
    */
    let result = Number(
        intermediateTokens[0]
    );

    if (isNaN(result)) {
        return "Error";
    }

    for (
        let j = 1;
        j < intermediateTokens.length;
        j += 2
    ) {
        const operator =
            intermediateTokens[j];

        const nextValue = Number(
            intermediateTokens[j + 1]
        );

        if (isNaN(nextValue)) {
            return "Error";
        }

        if (operator === "+") {
            result = add(
                result,
                nextValue
            );
        } else if (operator === "-") {
            result = subtract(
                result,
                nextValue
            );
        } else {
            return "Error";
        }
    }

    return result;
}


/*
    Enter 버튼을 눌렀을 때 계산한다.
*/
function performCalculate() {
    if (
        !isPowerOn ||
        !currentFormula
    ) {
        return;
    }

    /*
        마지막 입력이 연산자라면
        계산하지 않는다.
    */
    if (currentFormula.endsWith(" ")) {
        return;
    }

    const result = calculate(
        currentFormula
    );

    display.value = result;

    isCalculated = true;

    if (
        result === "Error" ||
        result === "DivBy0"
    ) {
        currentFormula = "";
    } else {
        currentFormula =
            result.toString();
    }
}


/*
    addEventListener를 사용하여
    숫자 버튼의 클릭 이벤트를 연결한다.
*/
numberButtons.forEach(function (button) {
    button.addEventListener(
        "click",
        function () {
            appendNumber(
                button.dataset.number
            );
        }
    );
});


/*
    addEventListener를 사용하여
    연산자 버튼의 클릭 이벤트를 연결한다.
*/
operatorButtons.forEach(function (button) {
    button.addEventListener(
        "click",
        function () {
            appendOperator(
                button.dataset.operator
            );
        }
    );
});


/* 전원 버튼 클릭 이벤트 */
powerButton.addEventListener(
    "click",
    togglePower
);


/* C 버튼 클릭 이벤트 */
clearButton.addEventListener(
    "click",
    clearDisplay
);


/* Enter 버튼 클릭 이벤트 */
calculateButton.addEventListener(
    "click",
    performCalculate
);
