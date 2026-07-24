(function () {
  // --- Configuration ---
  const currentScript = document.currentScript || (function () {
    const scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  let config = {
    chatbotKey: currentScript.getAttribute('data-chatbot-key') || '',
    primaryColor: currentScript.getAttribute('data-primary-color') || '#0f3387',
    position: currentScript.getAttribute('data-position') || 'right',
    title: currentScript.getAttribute('data-title') || 'SupportPilot',
    subtitle: currentScript.getAttribute('data-subtitle') || 'Typically replies instantly',
    avatar: currentScript.getAttribute('data-avatar') || 'default',
    theme: currentScript.getAttribute('data-theme') || 'light',
    welcomeMessage: 'Welcome to our support. How can we help today?'
  };

  const API_URL = "https://supportpilot-lilac.vercel.app/api/Chat";
  const INIT_URL = "https://supportpilot-lilac.vercel.app/api/chatbot/init";
  const STORAGE_KEY = `chatbot_state_${config.chatbotKey || 'default'}`;

  // Default icons
  const ICONS = {
    launcher: '<svg class="icon-open" viewBox="0 0 24 24"><path fill="currentColor" d="M12,2C6.48,2 2,5.58 2,10C2,12.54 3.54,14.81 5.91,16.22C5.69,17.7 4.79,19.26 4.79,19.26C4.79,19.26 7.41,19.2 9.53,17.79C10.32,17.93 11.14,18 12,18C17.52,18 22,14.42 22,10C22,5.58 17.52,2 12,2Z" /></svg>',
    close: '<svg class="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
    bot: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"></path><rect x="4" y="8" width="16" height="12" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>'
  };

  // State
  let state = {
    isOpen: false,
    messages: [],
    conversationId: null,
    unreadCount: 0,
    isWaitingForResponse: false
  };

  // --- Styles ---
  function getStyles() {
    return `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

    #chatbot-widget {
      position: fixed;
      bottom: 24px;
      ${config.position === 'left' ? 'left: 24px;' : 'right: 24px;'}
      z-index: 2147483647;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      box-sizing: border-box;
      pointer-events: none;
    }
    
    #chatbot-widget * {
      box-sizing: border-box;
    }

    .chatbot-launcher {
      position: absolute;
      bottom: 0;
      ${config.position === 'left' ? 'left: 0;' : 'right: 0;'}
      width: 64px;
      height: 64px;
      background: ${config.primaryColor};
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(0,0,0,0.16);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
      pointer-events: auto;
      border: none;
      outline: none;
    }

    .chatbot-launcher:hover {
      transform: scale(1.08);
      box-shadow: 0 12px 28px rgba(0,0,0,0.22);
    }

    .chatbot-launcher:active {
      transform: scale(0.95);
    }

    .chatbot-launcher svg {
      width: 32px;
      height: 32px;
      color: white;
      transition: opacity 0.3s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      position: absolute;
    }

    .chatbot-launcher .icon-close {
      opacity: 0;
      transform: rotate(-90deg) scale(0.5);
    }
    .chatbot-launcher .icon-open {
      opacity: 1;
      transform: rotate(0) scale(1);
    }

    .chatbot-launcher.is-open .icon-close {
      opacity: 1;
      transform: rotate(0) scale(1);
    }
    .chatbot-launcher.is-open .icon-open {
      opacity: 0;
      transform: rotate(90deg) scale(0.5);
    }

    .chatbot-badge {
      position: absolute;
      top: -2px;
      right: -2px;
      background: #ef4444;
      color: white;
      font-size: 13px;
      font-weight: 600;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transform: scale(0);
      transition: opacity 0.2s, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      border: 2px solid white;
    }

    .chatbot-badge.has-unread {
      opacity: 1;
      transform: scale(1);
    }

    .chatbot-window {
      position: absolute;
      bottom: 84px;
      ${config.position === 'left' ? 'left: 0;' : 'right: 0;'}
      width: 380px;
      height: 650px;
      max-height: calc(100vh - 120px);
      background: #ffffff;
      border-radius: 20px;
      box-shadow: 0 12px 48px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.08);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      opacity: 0;
      transform: translateY(20px) scale(0.95);
      transform-origin: bottom ${config.position === 'left' ? 'left' : 'right'};
      transition: opacity 0.3s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: none;
      border: 1px solid rgba(0,0,0,0.08);
    }

    .chatbot-window.is-open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }

    .chatbot-header {
      background: ${config.primaryColor};
      color: white;
      padding: 24px 20px;
      display: flex;
      align-items: center;
      position: relative;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      z-index: 2;
    }

    .chatbot-header-avatar {
      width: 44px;
      height: 44px;
      background: rgba(255,255,255,0.15);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 14px;
      overflow: hidden;
      border: 2px solid rgba(255,255,255,0.2);
    }

    .chatbot-header-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .chatbot-header-avatar svg {
      width: 24px;
      height: 24px;
      color: white;
    }

    .chatbot-header-info {
      flex: 1;
    }

    .chatbot-header-title {
      font-size: 17px;
      font-weight: 600;
      margin: 0;
      letter-spacing: -0.01em;
    }

    .chatbot-header-subtitle {
      font-size: 13px;
      opacity: 0.85;
      margin: 4px 0 0 0;
      display: flex;
      align-items: center;
      font-weight: 400;
    }

    .chatbot-online-indicator {
      width: 8px;
      height: 8px;
      background: #22c55e;
      border-radius: 50%;
      margin-right: 6px;
      box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.25);
      animation: chatbot-pulse 2s infinite;
    }

    @keyframes chatbot-pulse {
      0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
      70% { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
      100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
    }

    .chatbot-header-actions {
      display: flex;
      gap: 8px;
    }

    .chatbot-action-btn {
      background: rgba(255,255,255,0.1);
      border: none;
      color: white;
      cursor: pointer;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }

    .chatbot-action-btn:hover {
      background: rgba(255,255,255,0.25);
    }
    
    .chatbot-action-btn svg {
      width: 18px;
      height: 18px;
    }

    .chatbot-messages-container {
      flex: 1;
      overflow-y: auto;
      padding: 24px 20px;
      background: #f8fafc;
      display: flex;
      flex-direction: column;
      gap: 18px;
      scroll-behavior: smooth;
    }

    .chatbot-messages-container::-webkit-scrollbar {
      width: 6px;
    }
    .chatbot-messages-container::-webkit-scrollbar-track {
      background: transparent;
    }
    .chatbot-messages-container::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 10px;
    }

    .chatbot-message {
      display: flex;
      max-width: 88%;
      animation: chatbot-fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes chatbot-fade-in {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .chatbot-message.bot {
      align-self: flex-start;
    }

    .chatbot-message.user {
      align-self: flex-end;
      flex-direction: row-reverse;
    }

    .chatbot-message-avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: ${config.primaryColor};
      margin: 0 10px 0 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      border: 1px solid rgba(0,0,0,0.05);
    }

    .chatbot-message.user .chatbot-message-avatar {
      display: none;
    }
    
    .chatbot-message-avatar svg {
      width: 16px;
      height: 16px;
      color: white;
    }

    .chatbot-message-bubble {
      padding: 14px 18px;
      border-radius: 18px;
      font-size: 14px;
      line-height: 1.55;
      position: relative;
      box-shadow: 0 2px 4px rgba(0,0,0,0.02);
      word-wrap: break-word;
    }

    .chatbot-message.bot .chatbot-message-bubble {
      background: #ffffff;
      color: #334155;
      border-bottom-left-radius: 4px;
      border: 1px solid #e2e8f0;
    }

    .chatbot-message.user .chatbot-message-bubble {
      background: ${config.primaryColor};
      color: #ffffff;
      border-bottom-right-radius: 4px;
      margin-left: 10px;
    }

    .chatbot-message-time {
      font-size: 11px;
      color: #94a3b8;
      margin-top: 6px;
      text-align: right;
      font-weight: 500;
    }

    .chatbot-message.bot .chatbot-message-time {
      text-align: left;
      margin-left: 40px;
    }

    .chatbot-welcome {
      text-align: center;
      margin-bottom: 24px;
      padding: 20px;
      background: white;
      border-radius: 16px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 12px rgba(0,0,0,0.02);
    }

    .chatbot-welcome h3 {
      margin: 0 0 10px 0;
      color: #0f172a;
      font-size: 20px;
      font-weight: 600;
    }

    .chatbot-welcome p {
      margin: 0;
      color: #64748b;
      font-size: 14px;
      line-height: 1.5;
    }

    .chatbot-suggestions {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: center;
      margin-top: 20px;
    }

    .chatbot-suggestion-btn {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      color: #334155;
      padding: 8px 10px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
    }

    .chatbot-suggestion-btn:hover {
      background: ${config.primaryColor};
      color: #ffffff;
      border-color: ${config.primaryColor};
    }

    .chatbot-typing {
      display: flex;
      gap: 5px;
      padding: 14px 18px;
      background: #ffffff;
      border-radius: 18px;
      border-bottom-left-radius: 4px;
      border: 1px solid #e2e8f0;
      width: fit-content;
      align-self: flex-start;
      margin-left: 40px;
      display: none;
      box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    }

    .chatbot-typing.is-visible {
      display: flex;
    }

    .chatbot-typing-dot {
      width: 6px;
      height: 6px;
      background: #94a3b8;
      border-radius: 50%;
      animation: chatbot-typing 1.4s infinite ease-in-out both;
    }

    .chatbot-typing-dot:nth-child(1) { animation-delay: -0.32s; }
    .chatbot-typing-dot:nth-child(2) { animation-delay: -0.16s; }

    @keyframes chatbot-typing {
      0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
      40% { transform: scale(1); opacity: 1; }
    }

    .chatbot-footer {
      padding: 16px 20px;
      background: #ffffff;
      border-top: 1px solid #e2e8f0;
      display: flex;
      align-items: flex-end;
      gap: 12px;
      z-index: 2;
    }

    .chatbot-input-wrapper {
      flex: 1;
      background: #f1f5f9;
      border-radius: 24px;
      padding: 10px 16px;
      display: flex;
      align-items: center;
      border: 1px solid transparent;
      transition: border-color 0.2s, background 0.2s;
    }
    
    .chatbot-input-wrapper:focus-within {
      background: #ffffff;
      border-color: ${config.primaryColor};
      box-shadow: 0 0 0 3px rgba(0,0,0,0.05);
    }

    .chatbot-input {
      border: none;
      background: none;
      width: 100%;
      max-height: 120px;
      resize: none;
      outline: none;
      font-family: inherit;
      font-size: 14px;
      color: #0f172a;
      padding: 2px 0;
      line-height: 1.5;
    }

    .chatbot-input::placeholder {
      color: #94a3b8;
    }

    .chatbot-send-btn {
      background: ${config.primaryColor};
      border: none;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: white;
      flex-shrink: 0;
      transition: all 0.2s;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }

    .chatbot-send-btn:disabled {
      background: #cbd5e1;
      box-shadow: none;
      cursor: not-allowed;
      color: #94a3b8;
    }

    .chatbot-send-btn:not(:disabled):hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 14px rgba(0,0,0,0.15);
    }

    .chatbot-send-btn svg {
      width: 20px;
      height: 20px;
      margin-left: 2px;
    }

    /* Markdown Styles */
    .chatbot-message-bubble pre {
      background: #0f172a;
      color: #f8fafc;
      padding: 12px 14px;
      border-radius: 8px;
      overflow-x: auto;
      font-size: 13px;
      margin: 10px 0;
    }
    
    .chatbot-message-bubble code {
      background: rgba(0,0,0,0.06);
      padding: 2px 6px;
      border-radius: 4px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 13px;
      color: #ef4444;
    }
    
    .chatbot-message-bubble pre code {
      background: transparent;
      padding: 0;
      color: inherit;
    }
    
    .chatbot-message.bot .chatbot-message-bubble code {
      background: rgba(0,0,0,0.06);
    }
    
    .chatbot-message.user .chatbot-message-bubble code {
      background: rgba(255,255,255,0.2);
      color: #ffffff;
    }

    .chatbot-message-bubble p { margin: 0 0 10px 0; }
    .chatbot-message-bubble p:last-child { margin: 0; }
    
    .chatbot-message-bubble a {
      color: ${config.primaryColor};
      text-decoration: underline;
      text-underline-offset: 2px;
    }
    
    .chatbot-message.user .chatbot-message-bubble a {
      color: white;
    }

    .chatbot-message-bubble ul, .chatbot-message-bubble ol {
      margin: 10px 0;
      padding-left: 24px;
    }

    /* Mobile Responsive */
    @media (max-width: 480px) {
      .chatbot-window {
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        max-height: 100vh;
        border-radius: 0;
      }
      
      .chatbot-launcher {
        bottom: 20px;
        right: 20px;
        left: auto;
      }
      
      .chatbot-header {
        border-radius: 0;
      }
    }
  `;
  }

  // --- Core Functions ---

  async function init() {
    if (config.chatbotKey) {
      try {
        const response = await fetch(INIT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chatbotKey: config.chatbotKey })
        });
        const data = await response.json();
        if (data.success) {
          config.title = data.data.title || config.title;
          config.welcomeMessage = data.data.welcomeMessage || config.welcomeMessage;
          config.primaryColor = data.data.themeColor || config.primaryColor;
        } else {
          console.error("Chatbot initialization failed:", data.message);
        }
      } catch (err) {
        console.error("Chatbot initialization error:", err);
      }
    }

    loadConversation();
    injectStyles();
    createWidget();
    attachEventListeners();

    if (state.messages.length === 0) {
      showWelcomeScreen();
    } else {
      renderMessages();
    }
  }

  function loadConversation() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        state = { ...state, ...JSON.parse(stored), isOpen: false, isWaitingForResponse: false };
      }
    } catch (e) {
      console.warn('Could not load chat state', e);
    }
  }

  function saveConversation() {
    try {
      const stateToSave = {
        messages: state.messages,
        conversationId: state.conversationId,
        unreadCount: state.unreadCount
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.warn('Could not save chat state', e);
    }
  }

  function injectStyles() {
    const existingStyle = document.getElementById('chatbot-widget-styles');
    if (existingStyle) {
      existingStyle.remove();
    }

    const styleEl = document.createElement('style');
    styleEl.id = 'chatbot-widget-styles';
    styleEl.textContent = getStyles();
    document.head.appendChild(styleEl);
  }

  function getAvatarHtml() {
    if (config.avatar === 'default') {
      return ICONS.bot;
    }
    if (config.avatar.startsWith('data:image') || config.avatar.startsWith('http')) {
      return `<img src="${config.avatar}" alt="Avatar">`;
    }
    return config.avatar;
  }

  function createWidget() {
    const container = document.createElement('div');
    container.id = 'chatbot-widget';
    container.innerHTML = `
      <div class="chatbot-window" id="chatbot-window">
        ${createHeader()}
        <div class="chatbot-messages-container" id="chatbot-messages" role="log" aria-live="polite">
          ${createWelcome()}
        </div>
        ${createTypingIndicator()}
        ${createFooter()}
      </div>
      <button class="chatbot-launcher" id="chatbot-launcher" aria-label="Toggle chat">
        ${ICONS.launcher}
        ${ICONS.close}
        <div class="chatbot-badge" id="chatbot-badge">${state.unreadCount}</div>
      </button>
    `;
    document.body.appendChild(container);
  }

  function createHeader() {
    return `
      <div class="chatbot-header">
        <div class="chatbot-header-avatar">
          ${getAvatarHtml()}
        </div>
        <div class="chatbot-header-info">
          <h2 class="chatbot-header-title">${config.title}</h2>
          <p class="chatbot-header-subtitle">
            <span class="chatbot-online-indicator"></span>
            ${config.subtitle}
          </p>
        </div>
        <div class="chatbot-header-actions">
          <button class="chatbot-action-btn" id="chatbot-close-btn" aria-label="Close chat">
            ${ICONS.close}
          </button>
        </div>
      </div>
    `;
  }

  function createWelcome() {
    if (state.messages.length > 0) return '';
    return `
      <div class="chatbot-welcome" id="chatbot-welcome">
        <h3>Hello 👋</h3>
        <p>${config.welcomeMessage}</p>
        <div class="chatbot-suggestions">
          <button class="chatbot-suggestion-btn">💲 Pricing</button>
          <button class="chatbot-suggestion-btn">🛍️ Products</button>
          <button class="chatbot-suggestion-btn">👤 Contact Support</button>
        </div>
      </div>
    `;
  }

  function createTypingIndicator() {
    return `
      <div class="chatbot-typing" id="chatbot-typing">
        <div class="chatbot-typing-dot"></div>
        <div class="chatbot-typing-dot"></div>
        <div class="chatbot-typing-dot"></div>
      </div>
    `;
  }

  function createFooter() {
    return `
      <div class="chatbot-footer">
        <div class="chatbot-input-wrapper">
          <textarea 
            class="chatbot-input" 
            id="chatbot-input" 
            placeholder="Type your message..." 
            rows="1"
            aria-label="Message input"
          ></textarea>
        </div>
        <button class="chatbot-send-btn" id="chatbot-send-btn" aria-label="Send message" disabled>
          ${ICONS.send}
        </button>
      </div>
    `;
  }

  // --- UI Interactions ---

  function attachEventListeners() {
    const launcher = document.getElementById('chatbot-launcher');
    const closeBtn = document.getElementById('chatbot-close-btn');
    const input = document.getElementById('chatbot-input');
    const sendBtn = document.getElementById('chatbot-send-btn');
    const suggestions = document.querySelectorAll('.chatbot-suggestion-btn');

    launcher.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 120) + 'px';
      sendBtn.disabled = input.value.trim() === '';
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    sendBtn.addEventListener('click', sendMessage);

    suggestions.forEach(btn => {
      btn.addEventListener('click', (e) => {
        input.value = e.target.textContent;
        sendMessage();
      });
    });

    const messagesContainer = document.getElementById('chatbot-messages');
    messagesContainer.addEventListener('click', (event) => {
      const button = event.target.closest('.chatbot-suggestion-btn');
      if (!button) return;
      input.value = button.textContent || '';
      sendMessage();
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && state.isOpen) {
        toggleChat();
      }
    });
  }

  function toggleChat() {
    state.isOpen = !state.isOpen;
    const windowEl = document.getElementById('chatbot-window');
    const launcher = document.getElementById('chatbot-launcher');

    if (state.isOpen) {
      windowEl.classList.add('is-open');
      launcher.classList.add('is-open');
      state.unreadCount = 0;
      updateBadge();
      saveConversation();
      setTimeout(() => document.getElementById('chatbot-input').focus(), 300);
      autoScroll();
    } else {
      windowEl.classList.remove('is-open');
      launcher.classList.remove('is-open');
    }
  }

  function updateBadge() {
    const badge = document.getElementById('chatbot-badge');
    badge.textContent = state.unreadCount;
    if (state.unreadCount > 0 && !state.isOpen) {
      badge.classList.add('has-unread');
    } else {
      badge.classList.remove('has-unread');
    }
  }

  // --- Message Handling ---

  function showWelcomeScreen() {
    // Handled by render Messages
  }

  function renderMessages() {
    const container = document.getElementById('chatbot-messages');
    const welcome = document.getElementById('chatbot-welcome');
    if (welcome && state.messages.length > 0) {
      welcome.remove();
    }

    // Clear current except welcome
    const messagesToKeep = Array.from(container.children).filter(el => el.id === 'chatbot-welcome');
    container.innerHTML = '';
    messagesToKeep.forEach(el => container.appendChild(el));

    state.messages.forEach(msg => {
      container.appendChild(createMessageElement(msg));
    });
    autoScroll();
  }

  function appendMessage(msg) {
    state.messages.push(msg);
    saveConversation();

    if (!state.isOpen && msg.role === 'bot') {
      state.unreadCount++;
      updateBadge();
    }

    const container = document.getElementById('chatbot-messages');
    const welcome = document.getElementById('chatbot-welcome');
    if (welcome) welcome.remove();

    container.appendChild(createMessageElement(msg));
    autoScroll();
  }

  function createMessageElement(msg) {
    const div = document.createElement('div');
    div.className = `chatbot-message ${msg.role}`;

    const time = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let avatarHtml = '';
    if (msg.role === 'bot') {
      avatarHtml = `
        <div class="chatbot-message-avatar">
           ${getAvatarHtml()}
        </div>
      `;
    }

    const quickReplies = msg.role === 'bot' ? `
      <div class="chatbot-suggestions chatbot-response-suggestions">
        <button class="chatbot-suggestion-btn">🍔 Menu</button>
        <button class="chatbot-suggestion-btn">💲 Prices</button>
        <button class="chatbot-suggestion-btn">📍 Location</button>
        <button class="chatbot-suggestion-btn">🕒 Opening</button>
        <button class="chatbot-suggestion-btn">👤 Contact Support</button>
      </div>
    ` : '';

    div.innerHTML = `
      ${avatarHtml}
      <div style="flex:1; min-width:0;">
        <div class="chatbot-message-bubble">${renderMarkdown(msg.content)}</div>
        ${quickReplies}
        <div class="chatbot-message-time">${time}</div>
      </div>
    `;
    return div;
  }

  async function sendMessage() {
    if (state.isWaitingForResponse) return;

    const input = document.getElementById('chatbot-input');
    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    input.style.height = 'auto';
    document.getElementById('chatbot-send-btn').disabled = true;

    // Add user message
    appendMessage({
      role: 'user',
      content: text,
      timestamp: Date.now()
    });

    showTyping();

    try {
      state.isWaitingForResponse = true;
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatbotKey: config.chatbotKey,
          message: text,
          conversationId: state.conversationId
        })
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();

      hideTyping();
      appendMessage({
        role: 'bot',
        content: data.response || "I didn't understand that.",
        timestamp: Date.now()
      });

      if (data.conversationId) {
        state.conversationId = data.conversationId;
        saveConversation();
      }

    } catch (error) {
      hideTyping();
      appendMessage({
        role: 'bot',
        content: '⚠️ Something went wrong. Please try again.',
        timestamp: Date.now()
      });
    } finally {
      state.isWaitingForResponse = false;
      document.getElementById('chatbot-send-btn').disabled = false;
    }
  }

  // --- Utilities ---

  function showTyping() {
    const typing = document.getElementById('chatbot-typing');
    const container = document.getElementById('chatbot-messages');
    container.appendChild(typing);
    typing.classList.add('is-visible');
    autoScroll();
  }

  function hideTyping() {
    const typing = document.getElementById('chatbot-typing');
    typing.classList.remove('is-visible');
    document.getElementById('chatbot-window').appendChild(typing); // Move back out of messages
  }

  function autoScroll() {
    const container = document.getElementById('chatbot-messages');
    container.scrollTop = container.scrollHeight;
  }

  function renderMarkdown(text) {
    if (!text) return '';

    // Escape HTML to prevent XSS
    let html = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Inline code
    html = html.replace(/\`([^`]+)\`/g, '<code>$1</code>');

    // Code blocks
    html = html.replace(/\`\`\`([\s\S]*?)\`\`\`/g, '<pre><code>$1</code></pre>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // Line breaks
    html = html.replace(/\n/g, '<br/>');

    return html;
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();