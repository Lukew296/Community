class Chat {
    constructor() {
        this.messageList = document.getElementById('messageList');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendMessage');
        this.setupEventListeners();
        this.loadMessages();
    }

    setupEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    loadMessages() {
        const messagesRef = database.ref('messages');
        messagesRef.on('child_added', (snapshot) => {
            const message = snapshot.val();
            this.displayMessage(message);
        });
    }

    async sendMessage() {
        if (!auth.isAuthenticated) {
            alert('Please login to send messages');
            return;
        }

        const text = this.messageInput.value.trim();
        if (!text) return;

        const message = {
            text,
            userId: auth.user.id,
            username: auth.user.email,
            timestamp: Date.now()
        };

        try {
            await database.ref('messages').push(message);
            this.messageInput.value = '';
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Error sending message');
        }
    }

    displayMessage(message) {
        const div = document.createElement('div');
        div.className = 'message';
        div.innerHTML = `
            <strong>${message.username}</strong>
            <p>${message.text}</p>
            <small>${new Date(message.timestamp).toLocaleString()}</small>
        `;
        this.messageList.appendChild(div);
        this.messageList.scrollTop = this.messageList.scrollHeight;
    }
}

const chat = new Chat();
