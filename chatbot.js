// Global variables
const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');
const languageToggle = document.getElementById('languageToggle');
let currentLanguage = 'en'; // Default language is English

// Voice input handler
function startVoice() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = currentLanguage === 'en' ? 'en-US' : 'hi-IN';
    recognition.start();

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        userInput.value = transcript;
        sendMessage();
    };

    recognition.onerror = (e) => {
        alert('Voice input failed. Try again.');
        console.error(e);
    };
}

// Quick reply buttons
function quickReply(text) {
    userInput.value = text;
    sendMessage();
}

// Send message to the chatbot
function sendMessage() {
    const msg = userInput.value.trim();
    if (msg === '') return;

    addMessage(msg, 'user-message');
    respond(msg.toLowerCase());
    userInput.value = '';
}

// Display messages in chatbox
function addMessage(text, className) {
    const msgDiv = document.createElement('div');
    msgDiv.className = className;
    msgDiv.innerText = text;
    chatbox.appendChild(msgDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
}

// Respond based on user input
function respond(input) {
    let response = '';

    // English responses
    const responses_en = {
        "what is a browser": "A browser is like a window to the internet. Chrome, Firefox, and Safari are popular browsers.",
        "hi": "Hello! How can I help you today?",
        "hello": "Hi there! What can I do for you?",
        "how are you": "I’m just a program, but thanks for asking! How can I assist you?",
        "how do i pay a bill online": "You can pay bills using apps like Google Pay or your bank's website. I can guide you step-by-step!",
        "my phone won’t connect to wi-fi": "Try restarting your phone and router. Also, check if Wi-Fi is turned on in your phone settings.",
        "how to use whatsapp": "Open WhatsApp, click on a contact, and start typing. You can also tap the mic to send voice messages!",
        "how to create an email": "Go to gmail.com, click 'Create account', and follow the steps. I can help with that too!",
        "how to change my profile picture": "Go to your profile settings in the app or website, tap on your picture, and choose a new one from your gallery.",
        "what is a screenshot": "A screenshot is a photo of whatever is on your screen. It's useful for saving info or sharing something you see.",
        "how to charge a phone faster": "Use the original charger, turn off unused apps, and put your phone in airplane mode while charging.",
        "how to turn off notifications": "Go to Settings > Notifications, select the app, and turn off the toggle.",
        "how to check phone storage": "Go to Settings > Storage to see how much space is used and what's taking it up.",
        "what is an app": "An app (short for application) is a program you install on your phone or computer to do specific tasks, like chatting or shopping.",
        "how to protect my phone": "Use a strong password, avoid public Wi-Fi for sensitive actions, and keep apps updated.",
        "how to delete browsing history": "Open your browser, go to history, and tap 'Clear browsing data'. You can choose what to delete.",
        "what is a QR code": "A QR code is a square-shaped barcode you can scan with your phone camera to open a website or get info instantly.",
        "how to copy and paste": "Tap and hold to select text, choose 'Copy', then tap and hold where you want to paste and select 'Paste'.",
        "how to update my phone": "To update your phone, go to Settings > Software Update and check for available updates. Tap 'Download' and 'Install'.",
        "how to take a screenshot": "To take a screenshot on most smartphones, press the power button and the volume down button at the same time.",
        "how to send an email": "To send an email, open your email app (like Gmail), click 'Compose,' enter the recipient's email, and tap 'Send.'",
        "how to open a pdf": "Tap the file and select a PDF viewer like Adobe Reader or use your browser.",
        "how to find my phone": "Use services like Find My Device (Android) or Find My iPhone (Apple) to locate your phone.",
        "what is an otp": "OTP stands for One-Time Password. It’s a temporary code sent to your phone or email for verification.",
        "how to join a zoom meeting": "Click the Zoom link or open the app, enter the Meeting ID and Passcode, and tap Join.",
        "how to restart my phone": "Press and hold the power button, then tap on Restart or Reboot.",
        "what is bluetooth": "Bluetooth is a wireless technology to connect devices like headphones, speakers, or other phones.",
        "how to block a number": "Open the Phone app, tap on the contact or number, and select 'Block'.",
        "how to create a password": "Use at least 8 characters with a mix of letters, numbers, and symbols. Avoid using your name or birthdate.",
        "what is cloud storage": "Cloud storage lets you save files online (like Google Drive or iCloud) so you can access them from any device.",
        "how to delete an app": "Tap and hold the app icon, then select 'Uninstall' or drag it to the 'Remove' option."
        // Add more English responses...
    };

    // Hindi responses
    const responses_hi = {
        "ब्राउज़र क्या है": "ब्राउज़र वह ऐप है जिससे आप इंटरनेट चलाते हैं। Chrome और Firefox इसके उदाहरण हैं।",
        "नमस्ते": "नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?",
        "मैं ऑनलाइन बिल कैसे भरूं": "आप Google Pay या बैंक की वेबसाइट से बिल भर सकते हैं। मैं स्टेप-बाय-स्टेप मदद कर सकता हूँ!",
        "फोन वाई-फाई से नहीं जुड़ रहा": "फोन और राउटर को रीस्टार्ट करें। वाई-फाई चालू है या नहीं, यह भी जांचें।",
        "व्हाट्सएप कैसे चलाएं": "व्हाट्सएप खोलें, किसी कॉन्टैक्ट पर टैप करें और मैसेज लिखें। वॉयस मैसेज भी भेज सकते हैं!",
        "ईमेल अकाउंट कैसे बनाएं": "gmail.com पर जाएं, 'Create account' पर क्लिक करें और निर्देशों का पालन करें।",
        "फोन को अपडेट कैसे करें": "फोन को अपडेट करने के लिए Settings > Software Update में जाएं और उपलब्ध अपडेट देखें। 'Download' और 'Install' पर टैप करें।",
        "स्क्रीनशॉट कैसे लें": "ज्यादातर स्मार्टफोन पर, पावर बटन और वॉल्यूम डाउन बटन को एक साथ दबाकर स्क्रीनशॉट लें।",
        "ईमेल कैसे भेजें": "ईमेल भेजने के लिए अपनी ईमेल ऐप (जैसे Gmail) को खोलें, 'Compose' पर क्लिक करें, प्राप्तकर्ता का ईमेल दर्ज करें, और 'Send' पर टैप करें।",
        "प्रोफाइल फोटो कैसे बदलें": "ऐप या वेबसाइट में अपनी प्रोफाइल सेटिंग्स में जाएं, फोटो पर टैप करें और नई फोटो चुनें।",
        "स्क्रीनशॉट क्या होता है": "स्क्रीनशॉट आपके स्क्रीन की फोटो होती है। यह किसी चीज़ को सेव करने या शेयर करने के लिए काम आता है।",
        "फोन जल्दी चार्ज कैसे करें": "ऑरिजिनल चार्जर का इस्तेमाल करें, अनावश्यक ऐप्स बंद करें और फोन को एयरप्लेन मोड में डालें।",
        "नोटिफिकेशन कैसे बंद करें": "Settings > Notifications में जाकर ऐप चुनें और टॉगल को बंद करें।",
        "फोन का स्टोरेज कैसे देखें": "Settings > Storage में जाकर देखें कितना स्पेस बचा है और कौन-कौन सी चीज़ें जगह ले रही हैं।",
        "ऐप क्या होता है": "ऐप (application) एक प्रोग्राम होता है जो फोन या कंप्यूटर पर इंस्टॉल करके अलग-अलग काम किए जाते हैं।",
        "फोन की सुरक्षा कैसे करें": "मजबूत पासवर्ड रखें, पब्लिक वाई-फाई से बचें और ऐप्स को अपडेट रखें।",
        "ब्राउज़िंग हिस्ट्री कैसे हटाएं": "ब्राउज़र खोलें, History में जाएं और 'Clear browsing data' पर टैप करें।",
        "QR कोड क्या होता है": "QR कोड एक स्क्वायर बारकोड होता है जिसे स्कैन करने पर वेबसाइट या जानकारी खुलती है।",
        "कॉपी पेस्ट कैसे करें": "टेक्स्ट पर टैप करके रखें, 'Copy' चुनें, जहां पेस्ट करना है वहां टैप करें और 'Paste' चुनें।"
        // Add more Hindi responses...
    };

    if (currentLanguage === 'en') {
        response = getBestMatch(input, responses_en) || "Hmm... I’m still learning that. Try asking in a simpler way!";
    } else {
        response = getBestMatch(input, responses_hi) || "माफ़ कीजिए, मैं उसे समझ नहीं पाया। कुछ और पूछें या आसान भाषा में पूछें!";
    }

    addMessage("🤖 " + response, 'bot-message');
}

// Find the best match from the responses
function getBestMatch(input, dataset) {
    for (let key in dataset) {
        if (input.includes(key)) {
            return dataset[key];
        }
    }
    return null;
}

// Language toggle event listener
languageToggle.addEventListener('change', (e) => {
    currentLanguage = e.target.value;
    const message = currentLanguage === 'en'
        ? "Language set to English."
        : "भाषा हिंदी में बदल दी गई है।";
    addMessage("🌐 " + message, 'bot-message');
});
