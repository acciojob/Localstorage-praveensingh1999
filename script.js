 const addItems = document.querySelector('.add-items');  // form
  const itemsList = document.querySelector('.plates');    // div where <li> will be added

  // Load saved items OR empty array
  const items = JSON.parse(localStorage.getItem('items')) || [];

  // Add item function
  function addItem(e) {
    e.preventDefault(); // stop page refresh

    const text = this.querySelector('[name=item]').value;

    const item = {
      text,
      done: false
    };

    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);

    this.reset(); // clear input field
  }

  // Render items inside plates div
  function populateList(plates = [], platesList) {
    platesList.innerHTML = plates
      .map((plate, i) => {
        return `
        <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
          <label for="item${i}">${plate.text}</label>
        </li>
      `;
      })
      .join('');
  }

  // Toggle checkbox status (done / not done)
  function toggleDone(e) {
    if (!e.target.matches('input')) return;

    const index = e.target.dataset.index;
    items[index].done = !items[index].done;

    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
  }

  // Event listeners
  addItems.addEventListener('submit', addItem);
  itemsList.addEventListener('click', toggleDone);

  // Initial load
  populateList(items, itemsList);
