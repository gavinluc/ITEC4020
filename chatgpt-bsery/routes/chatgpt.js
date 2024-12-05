const apiKey = 'YOUR_OPENAI_API_KEY';  // Replace with your OpenAI API key
const url = 'https://api.openai.com/v1/chat/completions';

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
};

const body = JSON.stringify({
    model: 'gpt-3.5-turbo',  // Choose your model: e.g., gpt-3.5-turbo or gpt-4
    messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Hello, ChatGPT!' },
    ],
    max_tokens: 100,
    temperature: 0.7,
});

fetch(url, {
    method: 'POST',
    headers: headers,
    body: body,
})
    .then(response => response.json())
    .then(data => {
        console.log('ChatGPT Response:', data.choices[0].message.content);
    })
    .catch(error => {
        console.error('Error:', error);
    });