// Data
const inventoryItems = [
    { date: "3/20/2025", name: "Whole Milk", category: "Fresh Goods", quantity: 6 },
    { date: "3/20/2025", name: "Organic Apples", category: "Fresh Goods", quantity: 12 },
    { date: "3/20/2025", name: "Gel Pens", category: "Stationery", quantity: 5 },
    { date: "3/20/2025", name: "Cardboard", category: "Uncategorized", quantity: 15 },
    { date: "3/20/2025", name: "Spiral Notebook", category: "Stationery", quantity: 2 },
    { date: "3/20/2025", name: "Farm-Fresh Eggs", category: "Fresh Goods", quantity: 24 },
    { date: "3/20/2025", name: "Tuna Cans", category: "Canned Goods", quantity: 26 }
];

// Dynamically calculate inventory categories and their counts
const inventoryCategories = Array.from(
    inventoryItems.reduce((map, item) => {
        map.set(item.category, (map.get(item.category) || 0) + 1);
        return map;
    }, new Map())
).map(([name, count]) => ({ name, count }));

// const storageAlerts = [
//     {
//         message: '<span class="font-light">Added new Inventory:</span> <span class="font-bold">Canned Goods</span>',
//         time: "8:43:12 AM"
//     },
//     {
//         message: '<span class="font-light">Added to Uncategorized:</span><br><span class="font-semibold">Cardboard</span>',
//         time: "7:43:12 AM"
//     }
// ];

// // Add search functionality to the searchbox
// document.addEventListener('DOMContentLoaded', () => {
//     const searchInput = document.querySelector('.searchbox input');
//     if (searchInput) {
//         searchInput.addEventListener('input', () => {
//             const searchTerm = searchInput.value.toLowerCase();
//             const table = document.getElementById('itemsTable');
//             if (!table) return; // Ensure table exists
//             const tbody = table.querySelector('tbody');
//             if (!tbody) return; // Ensure tbody exists

//             // Clear the table body
//             tbody.innerHTML = '';

//             // Filter and rebuild the table with matching rows
//             inventoryItems
//                 .filter(item => item.name.toLowerCase().includes(searchTerm))
//                 .forEach(item => {
//                     const row = document.createElement('tr');
//                     row.classList.add('hoverable-row');
//                     row.innerHTML = `
//                         <td style="width: 262px">${item.date}</td>
//                         <td style="width: 288px">${item.name}</td>
//                         <td style="width: 210px">${item.category}</td>
//                         <td style="width: 151px">
//                             <span class="card-badge">${item.quantity}</span>
//                         </td>
//                         <td style="width: 28px">
//                             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//                                 <circle cx="12" cy="12" r="1"></circle>
//                                 <circle cx="12" cy="5" r="1"></circle>
//                                 <circle cx="12" cy="19" r="1"></circle>
//                             </svg>
//                         </td>
//                     `;
//                     tbody.appendChild(row);
//                 });
//         });
//     }
// });

// Make the .logo div clickable
const logoDiv = document.querySelector('.logo');
if (logoDiv) {
    logoDiv.addEventListener('click', () => {
        window.location.href = '../index.html';
    });
}

// Render inventory cards
function renderInventoryCards() {
    const container = document.getElementById('inventoryCards');
    const cardsHTML = inventoryCategories.map(category => `
        <div class="inventory-card hoverable-card" data-category="${category.name}">
            <div class="card-header">
                <span class="card-badge">${category.count}</span>
                <svg width="14" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </div>
            <div class="card-footer">${category.name}</div>
        </div>
    `).join('');

    // Add a + button at the end of the cards
    const addButtonHTML = `
        <div class="inventory-card hoverable-card add-card">
            <div class="card-header">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
            </div>
            <div class="card-footer">Add New</div>
        </div>
    `;

    container.innerHTML = cardsHTML + addButtonHTML;

    // Add click event listeners to toggle filter table based on category
    const cards = container.querySelectorAll('.inventory-card');
    let activeCategory = null; // Track the currently active category

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');

            if (card.classList.contains('add-card')) {
                // Handle the + button click
                const popup = document.createElement('div');
                popup.classList.add('popup-form');

                popup.innerHTML = `
                    <h2>Add New Inventory</h2>
                    <form id="addInventoryForm">
                        <input type="text" id="inventoryName" name="inventoryName" placeholder="Inventory Name:" required>

                        <div class="inv-selects">
                            <input type="text" id="inventoryCategory" name="inventoryCategory" placeholder="Category" required>
                            <select id="inventorySize" name="inventorySize" required>
                                <option value="" disabled selected>Select Size</option>
                                <option value="Fresh Goods">Megabox</option>
                                <option value="Stationery">Balikbayan Box</option>
                                <option value="Canned Goods">Small Room</option>
                                <option value="Uncategorized">warehouse</option>
                            </select>
                        </div>

                        <div class="popup-buttons">
                            <button type="submit" class="button outline popup-buttons">Add</button>
                            <button type="button" id="closePopup" class="button outline popup-buttons">Cancel</button>
                        </div>
                    </form>
                    <div class="popup-overlay"></div>
                `;

                document.body.appendChild(popup);

                // Close popup functionality
                const closePopupButton = document.getElementById('closePopup');
                closePopupButton.addEventListener('click', () => {
                    document.body.removeChild(popup);
                });

                // Handle form submission
                const form = document.getElementById('addInventoryForm');
                form.addEventListener('submit', (event) => {
                    event.preventDefault();
                    const inventoryName = document.getElementById('inventoryName').value;
                    const inventoryCategory = document.getElementById('inventoryCategory').value;
                    const inventorySize = parseInt(document.getElementById('inventorySize').value, 10);

                    if (inventoryName && inventoryCategory && !isNaN(inventorySize)) {
                        inventoryItems.push({
                            date: new Date().toLocaleDateString(),
                            name: inventoryName,
                            category: inventoryCategory,
                            quantity: inventorySize // Store size as a numeric quantity
                        });

                        renderInventoryCards();
                        renderItemsTable();
                        document.body.removeChild(popup);
                    } else {
                        alert('Please ensure all fields are filled out correctly.');
                    }
                });

                return;
            }

            if (activeCategory === category) {
                // If the same card is clicked again, remove the filter
                activeCategory = null;
                renderItemsTable(); // Reset the table to show all items
            } else {
                // Apply the filter for the clicked category
                activeCategory = category;
                filterTableByCategory(category);
            }
        });
    });
}

// Filter table rows based on category
function filterTableByCategory(category) {
    const table = document.getElementById('itemsTable');
    const tbody = table.querySelector('tbody');
    if (!tbody) return;

    // Clear the table body explicitly
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    // Filter and rebuild the table with matching rows
    inventoryItems
        .filter(item => item.category === category)
        .forEach(item => {
            const row = document.createElement('tr');
            row.classList.add('hoverable-row');
            row.innerHTML = `
                <td style="width: 262px">${item.date}</td>
                <td style="width: 288px">${item.name}</td>
                <td style="width: 210px">${item.category}</td>
                <td style="width: 151px">
                    <span class="card-badge">${item.quantity}</span>
                </td>
                <td style="width: 28px">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="12" cy="5" r="1"></circle>
                        <circle cx="12" cy="19" r="1"></circle>
                    </svg>
                </td>
            `;
            tbody.appendChild(row);
        });
}

// Add hover effect styling for inventory cards
const cardHoverStyle = document.createElement('style');
cardHoverStyle.textContent = `
    .hoverable-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .hoverable-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 15px rgba(38, 88, 74, .25);
    }
`;
document.head.appendChild(cardHoverStyle);

// Add functionality to toggle sorting of inventory cards alphabetically
document.addEventListener('DOMContentLoaded', () => {
    const sortButton = document.getElementById('sortInventoryButton');
    if (!sortButton) return;

    let isSorted = false; // Track sorting state

    sortButton.addEventListener('click', () => {
        if (isSorted) {
            // Reset to original order
            inventoryCategories.sort((a, b) => inventoryItems.findIndex(item => item.category === a.name) - inventoryItems.findIndex(item => item.category === b.name));
        } else {
            // Sort inventory categories alphabetically by name
            inventoryCategories.sort((a, b) => a.name.localeCompare(b.name));
        }

        // Toggle sorting state
        isSorted = !isSorted;

        // Re-render the inventory cards
        renderInventoryCards();
    });
});


// Update logic to toggle sorting table rows based on quantity value
function addFilterDropdowns() {
    const filterDivs1 = document.querySelectorAll('.filter-qua');
    let sortDescending = true; // Track sorting order

    filterDivs1.forEach(filterDiv => {
        filterDiv.addEventListener('click', () => {
            const table = document.getElementById('itemsTable');
            const rows = Array.from(table.querySelectorAll('tr'));
            const svgIcon = filterDiv.querySelector('svg');

            // Sort rows based on quantity value
            rows.sort((a, b) => {
                const quantityA = parseInt(a.querySelector('.card-badge').textContent, 10);
                const quantityB = parseInt(b.querySelector('.card-badge').textContent, 10);
                return sortDescending ? quantityB - quantityA : quantityA - quantityB;
            });

            // Re-append sorted rows to the table
            rows.forEach(row => table.appendChild(row));

            // Toggle sorting order for next click
            sortDescending = !sortDescending;

            // Flip the svg vertically
            if (svgIcon) {
                svgIcon.style.transform = sortDescending ? 'rotate(0deg)' : 'rotate(180deg)';
                svgIcon.style.transition = 'transform 0.3s ease';
            }
        });
    });
}

// Initialize dropdowns
addFilterDropdowns();

// Render items table with scrollable functionality
function renderItemsTable() {
    const tableContainer = document.getElementById('itemsTableContainer');
    const table = document.getElementById('itemsTable');
    const tableHTML = inventoryItems.slice(0, 5).map(item => `
        <tr class="hoverable-row">
            <td style="width: 262px">${item.date}</td>
            <td style="width: 288px">${item.name}</td>
            <td style="width: 210px">${item.category}</td>
            <td style="width: 151px">
                <span class="card-badge">${item.quantity}</span>
            </td>
            <td style="width: 28px">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="12" cy="5" r="1"></circle>
                    <circle cx="12" cy="19" r="1"></circle>
                </svg>
            </td>
        </tr>
    `).join('');
    
    table.innerHTML = tableHTML;

    // Apply scrollable styling
    tableContainer.style.maxHeight = '200px'; // Adjust height for 5 rows
    tableContainer.style.overflowY = 'auto';
}

// Add hover effect styling
const style = document.createElement('style');
style.textContent = `
    .hoverable-row:hover {
        background-color: rgba(38, 88, 74, .25);
        transition: background-color 0.3s ease;
    }
`;
document.head.appendChild(style);

function addScannerFunctionality() {
    const scannerButton = document.getElementById('scanner'); // Assuming the scanner button has this ID
    const overlay = document.querySelector('.popup-overlay'); // Get the overlay element

    if (!scannerButton || !overlay) return;

    scannerButton.addEventListener('click', () => {
        // Check if the scanner pop-up already exists
        let popup = document.querySelector('.scanner-popup');
        if (!popup) {
            // Create the scanner pop-up
            popup = document.createElement('div');
            popup.classList.add('scanner-popup');

            popup.innerHTML = `
                <h1>Scan the item here</h1>
                <div class="camera-view">
                    <video id="cameraStream" autoplay playsinline style="width: 100%; height: auto;"></video>
                </div>
            `;

            document.body.appendChild(popup);

            // Add functionality to close the pop-up when clicking the close button
            const closeButton = popup.querySelector('#closeScannerPopup');
            if (closeButton) {
                closeButton.addEventListener('click', () => {
                    closePopup(popup, overlay);
                });
            }

            // Access the camera and stream it to the video element
            const videoElement = popup.querySelector('#cameraStream');
            if (videoElement) {
                navigator.mediaDevices
                    .getUserMedia({ video: true })
                    .then((stream) => {
                        videoElement.srcObject = stream;
                    })
                    .catch((error) => {
                        console.error('Error accessing the camera:', error);
                        alert('Unable to access the camera. Please check your device settings.');
                    });
            }
        }

        // Show the pop-up and overlay
        popup.classList.add('show');
        overlay.classList.add('show');

        // Close the pop-up when clicking outside of it
        overlay.addEventListener('click', () => {
            closePopup(popup, overlay);
        });
    });

    function closePopup(popup, overlay) {
        // Stop the camera stream
        const videoElement = popup.querySelector('#cameraStream');
        if (videoElement && videoElement.srcObject) {
            const stream = videoElement.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
        }

        popup.classList.remove('show');
        overlay.classList.remove('show'); // Hide the overlay
        setTimeout(() => {
            if (popup.parentNode) {
                document.body.removeChild(popup); // Remove the pop-up after animation
            }
        }, 300); // Match the CSS transition duration
    }
}

addScannerFunctionality();

document.addEventListener('DOMContentLoaded', () => {
    renderInventoryCards();
    renderItemsTable();
    renderAlerts();
});