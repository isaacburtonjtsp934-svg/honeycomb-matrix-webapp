// API Proxy для GitHub Pages
// Этот файл будет работать на aprovnt.com и перенаправлять запросы на localhost

const LOCAL_API_URL = 'http://localhost:8080';

// Функция для проксирования запросов
async function proxyRequest(path, options = {}) {
    const url = `${LOCAL_API_URL}${path}`;
    
    console.log('🔄 Прокси запрос:', url);
    
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        
        console.log('✅ Ответ от backend:', response.status);
        
        if (response.ok) {
            return await response.json();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Ошибка сервера');
        }
    } catch (error) {
        console.error('❌ Ошибка прокси:', error);
        throw new Error('Ошибка подключения к серверу');
    }
}

// Экспортируем функцию для использования в Web App
window.apiProxy = {
    proxyRequest
}; 