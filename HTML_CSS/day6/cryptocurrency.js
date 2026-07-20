const cryptoList =
    document.getElementById("cryptoList");

const searchInput =
    document.getElementById("searchInput");

const loading =
    document.getElementById("loading");

const cryptoTable =
    document.getElementById("cryptoTable");

const allTab =
    document.getElementById("allTab");

const favoritesTab =
    document.getElementById("favoritesTab");


/*
    API에서 불러온 전체 암호화폐 데이터
*/
let allCryptoData = [];


/*
    LocalStorage에 저장된 관심항목을 불러온다.

    저장된 내용이 없다면 빈 배열을 사용한다.
*/
let favorites =
    JSON.parse(
        localStorage.getItem("favorites")
    ) || [];


/*
    현재 선택된 탭

    all:
    전체보기

    favorites:
    관심항목
*/
let currentTab = "all";


/*
    중복 API 요청을 막기 위한 상태
*/
let isFetching = false;


/*
    Binance API에서
    암호화폐 가격 데이터를 불러온다.
*/
async function fetchCryptoData() {

    if (isFetching) {
        return;
    }

    isFetching = true;

    try {

        const response = await fetch(
            "https://api4.binance.com/api/v3/ticker/24hr"
        );

        if (!response.ok) {
            throw new Error(
                "데이터를 불러오는 데 실패했습니다."
            );
        }

        const data = await response.json();

        /*
            USDT로 끝나는 항목만 선택한다.

            예:
            BTCUSDT
            ETHUSDT
            SOLUSDT

            현재 가격이 0인 항목은 제외한다.
        */
        allCryptoData = data.filter(function (item) {

            const isUsdtMarket =
                item.symbol.endsWith("USDT");

            const hasPrice =
                parseFloat(item.lastPrice) !== 0;

            return isUsdtMarket && hasPrice;
        });

        filterAndRender();

        loading.classList.add("hidden");

        cryptoTable.classList.remove("hidden");

    } catch (error) {

        console.error("Error:", error);

        loading.classList.remove("hidden");

        loading.textContent =
            "데이터를 불러오는 중 오류가 발생했습니다.";

    } finally {

        isFetching = false;
    }
}


/*
    현재 탭과 검색어에 맞는 데이터만 선택한다.
*/
function filterAndRender() {

    const searchTerm =
        searchInput.value
            .trim()
            .toUpperCase();

    let filteredData =
        allCryptoData.filter(function (item) {

            return item.symbol.includes(
                searchTerm
            );
        });

    /*
        관심항목 탭이면
        별표를 누른 암호화폐만 선택한다.
    */
    if (currentTab === "favorites") {

        filteredData =
            filteredData.filter(function (item) {

                return favorites.includes(
                    item.symbol
                );
            });
    }

    renderData(filteredData);
}


/*
    숫자를 보기 좋은 형태로 변환한다.
*/
function formatNumber(value) {

    const number = parseFloat(value);

    if (isNaN(number)) {
        return "-";
    }

    /*
        가격이 1보다 작다면
        소수점 자릿수를 더 많이 보여준다.
    */
    if (number < 1) {

        return number.toLocaleString(
            "ko-KR",
            {
                maximumFractionDigits: 8
            }
        );
    }

    return number.toLocaleString(
        "ko-KR",
        {
            maximumFractionDigits: 2
        }
    );
}


/*
    선택된 암호화폐 데이터를 표에 표시한다.
*/
function renderData(data) {

    cryptoList.innerHTML = "";

    /*
        검색 결과 또는 관심항목이 없는 경우
    */
    if (data.length === 0) {

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td
                colspan="6"
                class="no-result"
            >
                표시할 암호화폐가 없습니다.
            </td>
        `;

        cryptoList.appendChild(row);

        return;
    }

    data.forEach(function (item) {

        const row =
            document.createElement("tr");

        const priceChange =
            parseFloat(
                item.priceChangePercent
            );

        const changeClass =
            priceChange >= 0
                ? "up"
                : "down";

        const sign =
            priceChange >= 0
                ? "+"
                : "";

        const isFavorite =
            favorites.includes(
                item.symbol
            );

        row.innerHTML = `
            <td>
                <button
                    class="fav-btn ${isFavorite ? "active" : ""}"
                    data-symbol="${item.symbol}"
                    aria-label="${item.symbol} 관심항목"
                >
                    ${isFavorite ? "★" : "☆"}
                </button>
            </td>

            <td class="symbol">
                ${item.symbol}
            </td>

            <td>
                ${formatNumber(item.lastPrice)}
            </td>

            <td class="${changeClass}">
                ${sign}${priceChange.toFixed(2)}%
            </td>

            <td>
                ${formatNumber(item.highPrice)}
            </td>

            <td>
                ${formatNumber(item.lowPrice)}
            </td>
        `;

        cryptoList.appendChild(row);
    });
}


/*
    관심항목을 추가하거나 제거한다.
*/
function toggleFavorite(symbol) {

    const index =
        favorites.indexOf(symbol);

    /*
        이미 관심항목이면 제거한다.
    */
    if (index > -1) {

        favorites.splice(index, 1);

    } else {

        /*
            관심항목이 아니면 추가한다.
        */
        favorites.push(symbol);
    }

    /*
        변경된 관심항목 목록을
        브라우저 LocalStorage에 저장한다.
    */
    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    filterAndRender();
}


/*
    표 안에서 별표 버튼을 클릭했을 때 실행된다.

    새 표가 만들어질 때마다 이벤트를 다시 연결하지 않고
    cryptoList에 한 번만 이벤트를 연결한다.
*/
cryptoList.addEventListener(
    "click",
    function (event) {

        const favoriteButton =
            event.target.closest(".fav-btn");

        if (!favoriteButton) {
            return;
        }

        const symbol =
            favoriteButton.dataset.symbol;

        toggleFavorite(symbol);
    }
);


/*
    검색창에 글자를 입력할 때마다
    검색 결과를 갱신한다.
*/
searchInput.addEventListener(
    "input",
    function () {

        filterAndRender();
    }
);


/*
    전체보기 탭
*/
allTab.addEventListener(
    "click",
    function () {

        currentTab = "all";

        allTab.classList.add("active");

        favoritesTab.classList.remove(
            "active"
        );

        filterAndRender();
    }
);


/*
    관심항목 탭
*/
favoritesTab.addEventListener(
    "click",
    function () {

        currentTab = "favorites";

        favoritesTab.classList.add(
            "active"
        );

        allTab.classList.remove("active");

        filterAndRender();
    }
);


/*
    페이지가 열리면
    최초 데이터를 불러온다.
*/
fetchCryptoData();


/*
    과제 조건에 맞게
    1초마다 새로운 데이터를 불러온다.

    1000밀리초 = 1초
*/
setInterval(
    fetchCryptoData,
    1000
);
