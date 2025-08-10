// Chatbot Automático da Shekhinah
class ShekhinahChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.currentStep = 'greeting';
        this.userInfo = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showWelcomeMessage();
        this.setupFormHandler();
    }

    setupEventListeners() {
        const toggle = document.getElementById('chatbot-toggle');
        const closeBtn = document.getElementById('chatbot-close');
        const sendBtn = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');
        const quickReplies = document.querySelectorAll('.quick-reply');

        if (toggle) {
            toggle.addEventListener('click', () => this.toggleChat());
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeChat());
        }

        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendMessage());
        }

        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }

        quickReplies.forEach(reply => {
            reply.addEventListener('click', () => {
                this.handleQuickReply(reply.textContent);
            });
        });
    }

    toggleChat() {
        const chatbot = document.getElementById('chatbot');
        const badge = document.querySelector('.notification-badge');
        
        if (chatbot) {
            this.isOpen = !this.isOpen;
            chatbot.classList.toggle('active', this.isOpen);
            
            if (badge && this.isOpen) {
                badge.style.display = 'none';
            }
        }
    }

    closeChat() {
        const chatbot = document.getElementById('chatbot');
        if (chatbot) {
            this.isOpen = false;
            chatbot.classList.remove('active');
        }
    }

    showWelcomeMessage() {
        setTimeout(() => {
            this.addBotMessage('Olá! 👋 Bem-vindo à Shekhinah Estofados! Sou seu assistente virtual e estou aqui para ajudar você a encontrar o sofá perfeito.');
            
            setTimeout(() => {
                this.addBotMessage('Como posso te ajudar hoje?');
                this.showQuickReplies(['Ver Produtos', 'Fazer Orçamento', 'Falar com Vendedor']);
            }, 1500);
        }, 2000);
    }

    addBotMessage(text) {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = `
            <div class="message-content">${text}</div>
            <div class="message-time">${this.getCurrentTime()}</div>
        `;

        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    addUserMessage(text) {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `
            <div class="message-content">${text}</div>
            <div class="message-time">${this.getCurrentTime()}</div>
        `;

        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    sendMessage() {
        const input = document.getElementById('chatbot-input');
        if (!input) return;

        const message = input.value.trim();
        if (!message) return;

        this.addUserMessage(message);
        input.value = '';
        
        setTimeout(() => {
            this.processUserMessage(message);
        }, 500);
    }

    processUserMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('produto') || lowerMessage.includes('sofá') || lowerMessage.includes('móvel')) {
            this.showProducts();
        } else if (lowerMessage.includes('preço') || lowerMessage.includes('orçamento') || lowerMessage.includes('valor')) {
            this.requestQuote();
        } else if (lowerMessage.includes('contato') || lowerMessage.includes('vendedor') || lowerMessage.includes('atendimento')) {
            this.showContact();
        } else if (lowerMessage.includes('horário') || lowerMessage.includes('funcionamento')) {
            this.showHours();
        } else if (lowerMessage.includes('localização') || lowerMessage.includes('endereço') || lowerMessage.includes('onde')) {
            this.showLocation();
        } else {
            this.addBotMessage('Entendi! Deixe-me te ajudar com isso. Você gostaria de:');
            this.showQuickReplies(['Ver Produtos', 'Solicitar Orçamento', 'Falar com Vendedor']);
        }
    }

    handleQuickReply(reply) {
        this.addUserMessage(reply);
        
        setTimeout(() => {
            switch(reply) {
                case 'Ver Produtos':
                    this.showProducts();
                    break;
                case 'Fazer Orçamento':
                case 'Solicitar Orçamento':
                    this.requestQuote();
                    break;
                case 'Falar com Vendedor':
                    this.showContact();
                    break;
                case 'Sofás Retráteis':
                    this.showProductDetails('retráteis');
                    break;
                case 'Sofás Reclináveis':
                    this.showProductDetails('reclináveis');
                    break;
                case 'Poltronas':
                    this.showProductDetails('poltronas');
                    break;
                default:
                    this.addBotMessage('Como posso te ajudar?');
            }
        }, 500);
    }

    showProducts() {
        this.addBotMessage('Temos uma linha completa de produtos! 🛋️');
        
        setTimeout(() => {
            this.addBotMessage('Nossos principais produtos incluem:');
            this.showQuickReplies(['Sofás Retráteis', 'Sofás Reclináveis', 'Poltronas']);
        }, 1000);
    }

    showProductDetails(type) {
        let message = '';
        
        switch(type) {
            case 'retráteis':
                message = '🛋️ **Sofás Retráteis**: Perfeitos para relaxar! Disponíveis em 2 e 3 lugares, com tecidos de alta qualidade e mecanismo suave.';
                break;
            case 'reclináveis':
                message = '🪑 **Sofás Reclináveis**: Máximo conforto com encosto ajustável. Ideais para assistir TV e descansar.';
                break;
            case 'poltronas':
                message = '🛋️ **Poltronas**: Elegantes e confortáveis, perfeitas para complementar sua sala de estar.';
                break;
        }
        
        this.addBotMessage(message);
        
        setTimeout(() => {
            this.addBotMessage('Gostaria de solicitar um orçamento ou falar com nosso vendedor?');
            this.showQuickReplies(['Fazer Orçamento', 'Falar com Vendedor']);
        }, 1500);
    }

    requestQuote() {
        this.addBotMessage('Ótimo! Para fazer seu orçamento, você pode:');
        
        setTimeout(() => {
            this.addBotMessage('📱 **WhatsApp**: (11) 99999-9999\n📧 **E-mail**: Preencher o formulário abaixo\n🏪 **Presencial**: Visitar nossa loja');
            
            setTimeout(() => {
                this.addBotMessage('Prefere que eu te direcione para o WhatsApp ou quer preencher o formulário?');
                this.showQuickReplies(['WhatsApp', 'Formulário']);
            }, 1500);
        }, 1000);
    }

    showContact() {
        this.addBotMessage('📞 **Nossos Contatos**:');
        
        setTimeout(() => {
            this.addBotMessage('📱 **WhatsApp**: (11) 99999-9999\n📧 **E-mail Comercial**: shekest2025@gmail.com\n🕒 **Horário**: Seg-Sex 8h-18h, Sáb 8h-12h');
            
            setTimeout(() => {
                const whatsappBtn = document.createElement('button');
                whatsappBtn.textContent = '💬 Abrir WhatsApp';
                whatsappBtn.className = 'quick-reply';
                whatsappBtn.style.background = '#25D366';
                whatsappBtn.style.color = 'white';
                whatsappBtn.onclick = () => {
                    window.open('https://wa.me/5511999999999?text=Olá! Vim do site e gostaria de mais informações sobre os sofás.', '_blank');
                };
                
                const quickRepliesContainer = document.querySelector('.chatbot-quick-replies');
                if (quickRepliesContainer) {
                    quickRepliesContainer.innerHTML = '';
                    quickRepliesContainer.appendChild(whatsappBtn);
                }
            }, 1000);
        }, 1000);
    }

    showHours() {
        this.addBotMessage('🕒 **Horário de Funcionamento**:');
        
        setTimeout(() => {
            this.addBotMessage('📅 **Segunda a Sexta**: 8h às 18h\n📅 **Sábado**: 8h às 12h\n📅 **Domingo**: Fechado');
        }, 1000);
    }

    showLocation() {
        this.addBotMessage('📍 **Nossa Localização**:');
        
        setTimeout(() => {
            this.addBotMessage('🏪 Estamos localizados em uma região de fácil acesso. Entre em contato conosco para mais informações sobre como chegar!');
            this.showQuickReplies(['Falar com Vendedor', 'WhatsApp']);
        }, 1000);
    }

    showQuickReplies(replies) {
        const container = document.querySelector('.chatbot-quick-replies');
        if (!container) return;

        container.innerHTML = '';
        
        replies.forEach(reply => {
            const button = document.createElement('button');
            button.className = 'quick-reply';
            button.textContent = reply;
            button.addEventListener('click', () => this.handleQuickReply(reply));
            container.appendChild(button);
        });
    }

    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    setupFormHandler() {
        // FormSubmit agora gerencia o envio do formulário diretamente
        // Apenas adicionamos uma notificação quando o formulário for enviado
        const form = document.getElementById('contatoForm');
        if (form) {
            form.addEventListener('submit', () => {
                // Notificar no chatbot antes do envio
                this.addMessage('Obrigado pelo seu contato! Seu formulário está sendo enviado... 📧', 'bot');
            });
        }
    }

    showNotification() {
        const badge = document.querySelector('.notification-badge');
        if (badge && !this.isOpen) {
            badge.style.display = 'flex';
            badge.textContent = '1';
            
            setTimeout(() => {
                if (!this.isOpen) {
                    this.addBotMessage('📧 Recebemos sua mensagem! Nossa equipe entrará em contato em breve.');
                }
            }, 1000);
        }
    }
}

// Inicializar o chatbot quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new ShekhinahChatbot();
});