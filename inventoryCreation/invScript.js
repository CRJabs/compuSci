document.querySelector('button').addEventListener('click', function() {
    const inventoryName = document.querySelector('input').value;
    const category = document.querySelector('select').value;
    
    if (!inventoryName) {
        alert('Please enter an inventory name');
        return;
    }
    
    if (!category) {
        alert('Please select a storage category');
        return;
    }
    
    // Here you would typically submit the form or perform an API call
    console.log('Creating inventory:', {
        name: inventoryName,
        category: category
    });
    
    alert('Inventory created successfully!');
});