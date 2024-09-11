document.getElementById('searchBtn').addEventListener('click', function() {
    const entityType = document.getElementById('entityType').value;
    const entityId = document.getElementById('entityId').value;
    const resultField = document.getElementById('result');
    const errorField = document.getElementById('error');
    const loadingField = document.getElementById('loading');

    resultField.textContent = '';
    errorField.textContent = '';

    if (!entityId || entityId < 1 || entityId > 10) {
        errorField.textContent = 'Введите правильный ID от 1 до 10.';
        return;
    }

    loadingField.style.display = 'block';

    const url = `https://swapi.py4e.com/api/${entityType}/${entityId}/`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(`Ошибка: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            loadingField.style.display = 'none';
            let name;
            if (entityType === 'people') {
                name = data.name;
            } else if (entityType === 'planets') {
                name = data.name;
            } else if (entityType === 'films') {
                name = data.title;
            } else {
                name = 'Неизвестное имя';
            }
            resultField.textContent = name;
        })
        .catch(error => {
            loadingField.style.display = 'none';
            errorField.textContent = `Ошибка при запросе: ${error}`;
        })
        .finally(() => {
            loadingField.style.display = 'none';
        });
});
