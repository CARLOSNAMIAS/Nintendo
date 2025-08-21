document.addEventListener('DOMContentLoaded', () => {
    const chatbotContainer = document.getElementById('chatbot-container');
    const toggleButton = document.getElementById('chatbot-toggle-btn');
    const chatbotWindow = document.getElementById('chatbot-window');
    const messagesContainer = document.getElementById('chatbot-messages');
    const inputField = document.getElementById('chatbot-input');
    const sendButton = document.getElementById('chatbot-send-btn');
    const overlay = document.getElementById('chatbot-overlay'); // Get the overlay element

    // --- Lógica para abrir/cerrar el chatbot ---
    const toggleChat = () => {
        chatbotContainer.classList.toggle('open');
        overlay.classList.toggle('visible');
    };

    toggleButton.addEventListener('click', toggleChat);
    overlay.addEventListener('click', toggleChat); // Close chat when overlay is clicked

    // --- Lógica para enviar mensajes ---
    const sendMessage = () => {
        const userInput = inputField.value.trim();
        if (userInput === '') return;

        addMessage(userInput, 'user');
        inputField.value = '';

        // Simula una respuesta del bot después de un breve retraso
        setTimeout(() => {
            const botResponse = getBotResponse(userInput);
            addMessage(botResponse, 'bot');
        }, 500);
    };

    sendButton.addEventListener('click', sendMessage);
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // --- Lógica para añadir mensajes a la ventana ---
    const addMessage = (text, sender) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chatbot-message', sender);
        messageElement.textContent = text;
        messagesContainer.appendChild(messageElement);

        // Desplaza automáticamente hacia el último mensaje
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    // --- Lógica del Bot (Respuestas predefinidas) ---
    const getBotResponse = (userInput) => {
        const lowerCaseInput = userInput.toLowerCase();

        if (lowerCaseInput.includes('hola') || lowerCaseInput.includes('ayuda')) {
            return '¡Hola! Soy el asistente virtual de Nintendo. Puedes preguntarme sobre "envíos", "devoluciones" o "juegos".';
        }
        if (lowerCaseInput.includes('envío') || lowerCaseInput.includes('enviar')) {
            return 'Realizamos envíos a todo el país. El costo estándar es de $10.00 y tarda entre 3 y 5 días hábiles.';
        }
        if (lowerCaseInput.includes('devolución') || lowerCaseInput.includes('devolver')) {
            return 'Puedes devolver cualquier producto dentro de los 30 días posteriores a la compra, siempre que esté en su empaque original.';
        }
        if (lowerCaseInput.includes('juegos') || lowerCaseInput.includes('producto')) {
            return 'Tenemos una gran selección de juegos. ¿Te interesa alguna consola en particular? ¿Switch, por ejemplo?';
        }
        if (lowerCaseInput.includes('switch')) {
            return 'Los juegos más populares para Nintendo Switch son Super Mario Bros. Wonder y EA SPORTS FC 25. ¡Ambos son fantásticos!';
        }
        if (lowerCaseInput.includes('gracias')) {
            return '¡De nada! ¿Hay algo más en lo que pueda ayudarte?';
        }

        return 'Lo siento, no entendí muy bien. ¿Puedes intentar reformular la pregunta? Puedes preguntar sobre "envíos", "devoluciones" o "juegos".';
    };

    // Mensaje de bienvenida inicial del bot
    setTimeout(() => {
        addMessage('¡Bienvenido al centro de ayuda! Escribe "ayuda" para ver lo que puedo hacer.', 'bot');
    }, 1000);
});