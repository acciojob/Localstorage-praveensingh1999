ocument.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("itemForm");
    const input = document.getElementById("itemInput");
    const platesDiv = document.getElementById("plates");

    // Load existing items from localStorage
    const loadItems = () => {
        const items = JSON.parse(localStorage.getItem("plates")) || [];
        items.forEach((item, index) => {
            addItemToList(item, index);
        });
    };

    // Add item to the list and localStorage
    const addItemToList = (item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" data-index="${index}" id="item${index}" ${item.done ? 'checked' : ''} />
            <label for="item${index}">${item.name}</label>
        `;
        platesDiv.appendChild(li);
    };

    // Handle form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page refresh
        const itemName = input.value.trim();
        if (itemName) {
            const items = JSON.parse(localStorage.getItem("plates")) || [];
            const newItem = { name: itemName, done: false };
            items.push(newItem);
            localStorage.setItem("plates", JSON.stringify(items));
            addItemToList(newItem, items.length - 1);
            input.value = ""; // Clear input field
        }
    });

    // Handle checkbox changes
    platesDiv.addEventListener("change", function (event) {
        if (event.target.matches("input[type='checkbox']")) {
            const index = event.target.dataset.index;
            const items = JSON.parse(localStorage.getItem("plates")) || [];
            items[index].done = event.target.checked;
            localStorage.setItem("plates", JSON.stringify(items));
        }
    });

    // Load items on page load
    loadItems();
});