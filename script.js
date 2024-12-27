const searchTextElement = document.getElementById("searchText");
const autoCompleteResultsElement = document.querySelector(
	"#autoCompleteResults"
);
const autoCompleteResultsBodyElement = document.querySelector(
	"#autoCompleteResults tbody"
);
const debounce = (callback, delay) => {
	let timeoutId;
	return () => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(callback, delay);
	};
};
const autoComplete = () => {
	const query = searchTextElement.value.trim();
	if (!query) {
		return;
	}
	console.log(query);
	getData(query).then((products) => {
		products.forEach((product) => {
			const tr = document.createElement("tr");
			const td = document.createElement("td");
			td.textContent = product.name;
			tr.appendChild(td);
			autoCompleteResultsBodyElement.appendChild(tr);
		});
	});
};

const getData = async (query) => {
	console.log(query);
	const response = await fetch(`https://dummyjson.com/products?q=${query}`);
	console.log(response, "asad");
	const data = await response.json();
	return data.items;
	const products = data.products;
	const mappedProducts = products.map((product) => ({
		id: product.id,
		name: product.title,
		price: product.price,
	}));
	return mappedProducts;
};
searchTextElement.addEventListener("keyup", debounce(autoComplete, 1000));
