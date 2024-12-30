let currentSection = '';
let questions = {};
let isLoading = false;

function setLoading(loading) {
    isLoading = loading;
    document.querySelectorAll('button, select').forEach(el => {
        el.disabled = loading;
    });
}

function appendMessage(text, isUser = false) {
    const messagesDiv = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    if (isLoading && !isUser) {
        messageDiv.classList.add('loading');
    }
    
    messageDiv.textContent = text;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    return messageDiv;
}

function appendMediaContent(mediaItems) {
    const messagesDiv = document.getElementById('chatMessages');
    
    mediaItems.forEach(media => {
        const mediaDiv = document.createElement('div');
        mediaDiv.className = 'media-content';

        if (media.type === 'image') {
            const img = document.createElement('img');
            img.src = media.url;
            img.alt = media.alt || 'Media content';
            img.loading = 'lazy';
            mediaDiv.appendChild(img);
        } else if (media.type === 'video') {
            const video = document.createElement('video');
            video.src = media.url;
            video.controls = true;
            video.playsInline = true;
            mediaDiv.appendChild(video);
        }

        messagesDiv.appendChild(mediaDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });
}

async function fetchWithRetry(url, options = {}, retries = CONFIG.MAX_RETRIES) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), CONFIG.TIMEOUT);

        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response;
    } catch (error) {
        if (retries > 0 && error.name === 'AbortError') {
            return fetchWithRetry(url, options, retries - 1);
        }
        throw error;
    }
}

function updateQuestionSelect(questions) {
    const select = document.getElementById('questionSelect');
    select.innerHTML = '<option value="">Select a question...</option>';
    questions.forEach((question, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = question;
        select.appendChild(option);
    });
}

async function selectSection(section) {
    if (isLoading) return;
    
    try {
        setLoading(true);
        currentSection = section;
        const select = document.getElementById('questionSelect');
        select.style.display = 'block';
        
        appendMessage(`Selected section: ${section}`, true);
        
        const response = await fetchWithRetry(`${CONFIG.API_URL}/questions/${section}`);
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        questions[section] = data.questions;
        updateQuestionSelect(questions[section]);
        
    } catch (error) {
        console.error('Error:', error);
        appendMessage('Error loading questions. Please try again.');
        const select = document.getElementById('questionSelect');
        select.style.display = 'none';
    } finally {
        setLoading(false);
    }
}

document.getElementById('questionSelect').addEventListener('change', async (e) => {
    const questionNumber = e.target.value;
    if (!questionNumber || isLoading) return;

    const question = questions[currentSection][questionNumber - 1];
    
    try {
        setLoading(true);
        appendMessage(question, true);
        const loadingMessage = appendMessage('Loading response...');
        
        const response = await fetchWithRetry(`${CONFIG.API_URL}/chat`, {
            method: 'POST',
            body: JSON.stringify({
                section: currentSection,
                questionNumber: questionNumber
            })
        });

        const data = await response.json();
        loadingMessage.remove();

        if (data.error) {
            throw new Error(data.error);
        }

        appendMessage(data.response);
        if (data.images || data.videos) {
            appendMediaContent(data.images || data.videos);
        }
        
    } catch (error) {
        console.error('Error:', error);
        appendMessage('Error getting response. Please try again.');
    } finally {
        setLoading(false);
    }
});

// Initialize with welcome message
window.addEventListener('DOMContentLoaded', () => {
    appendMessage('Welcome to GGU Hyderabad Chatbot! Please select a category to get started.');
});

// Handle errors globally
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    appendMessage('An unexpected error occurred. Please try again.');
});

// Handle offline/online status
window.addEventListener('online', () => {
    appendMessage('Connection restored. You can continue chatting.');
});

window.addEventListener('offline', () => {
    appendMessage('You are currently offline. Please check your internet connection.');
});