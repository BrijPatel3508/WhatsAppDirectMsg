import React, { useState } from "react";

// Keyboard layouts
const keyboardLayouts = {
  gujarati: [
    "અ", "આ", "ઇ", "ઈ", "ઉ", "ઊ", "ઋ", "એ", "ઐ", "ઓ", "ઔ",
    "ક", "ખ", "ગ", "ઘ", "ઙ", "ચ", "છ", "જ", "ઝ", "ઞ",
    "ટ", "ઠ", "ડ", "ઢ", "ણ", "ત", "થ", "દ", "ધ", "ન",
    "પ", "ફ", "બ", "ભ", "મ", "ય", "ર", "લ", "વ",
    "શ", "ષ", "સ", "હ", "ળ", "ક્ષ", "જ્ઞ",
    "ા", "િ", "ી", "ુ", "ૂ", "ૃ", "ે", "ૈ", "ો", "ૌ",
    "ં", "ઃ", "ઁ", "૦", "૧", "૨", "૩", "૪", "૫", "૬", "૭", "૮", "૯",
    " ", "←"
  ],
  hindi: [
    "अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ", "ए", "ऐ", "ओ", "औ",
    "क", "ख", "ग", "घ", "ङ", "च", "छ", "ज", "झ", "ञ",
    "ट", "ठ", "ड", "ढ", "ण", "त", "थ", "द", "ध", "न",
    "प", "फ", "ब", "भ", "म", "य", "र", "ल", "व",
    "श", "ष", "स", "ह", "ळ", "क्ष", "ज्ञ",
    "ा", "ि", "ी", "ु", "ू", "ृ", "े", "ै", "ो", "ौ",
    "ं", "ः", "ँ", "०", "१", "२", "३", "४", "५", "६", "७", "८", "९",
    " ", "←"
  ],
  english: [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
    "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
    "U", "V", "W", "X", "Y", "Z",
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
    "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
    "u", "v", "w", "x", "y", "z",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    ".", ",", "!", "?", "'", "\"", " ", "←"
  ]
};

export default function App() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [maxDigitsReached, setMaxDigitsReached] = useState(false);
  const [keyboardLanguage, setKeyboardLanguage] = useState("gujarati");

  const maxDigitsMap = {
    "+91": 10,
    "+1": 10,
    "+44": 11,
    "+61": 9,
    "+971": 9
  };

  const maxDigits = maxDigitsMap[countryCode] || 15;

  const handlePhoneChange = (e) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > maxDigits) {
      setMaxDigitsReached(true);
      input = input.slice(0, maxDigits);
    } else {
      setMaxDigitsReached(false);
    }
    setPhone(input);
  };

  const createLink = () => {
    const cleanPhone = phone.replace(/\D/g, "");
    const encodedMessage = encodeURIComponent(message);
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const fullPhone = `${countryCode}${cleanPhone}`.replace(/\+/g, "");

    return isMobile
      ? `whatsapp://send?phone=${fullPhone}&text=${encodedMessage}`
      : `https://web.whatsapp.com/send?phone=${fullPhone}&text=${encodedMessage}`;
  };

  const onKeyClick = (key) => {
    setMessage((prev) =>
      key === "←" ? prev.slice(0, -1) : prev + key
    );
  };

  const currentKeys = keyboardLayouts[keyboardLanguage];

  return (
    <>
      <style>{`
        .container {
          padding: 20px;
          max-width: 900px;
          margin: auto;
        }
        .flex-wrapper {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }
        .left-side {
          flex: 1 1 400px;
          min-width: 280px;
          display: flex;
          flex-direction: column;
        }
        .phone-input {
          margin-bottom: 10px;
          display: flex;
          gap: 10px;
        }
        .phone-input select {
          min-width: 80px;
          font-size: 16px;
        }
        .phone-input input {
          flex: 1;
          font-size: 16px;
          padding: 6px;
        }
        textarea {
          width: 100%;
          height: 150px;
          resize: none;
          font-size: 18px;
          padding: 8px;
          margin-bottom: 10px;
        }
        .btn {
          text-align: center;
          padding: 12px 0;
          background-color: #25D366;
          color: white;
          font-weight: bold;
          border-radius: 6px;
          text-decoration: none;
          font-size: 18px;
          user-select: none;
        }
        .right-side {
          flex: 0 0 400px;
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 12px;
          user-select: none;
          background-color: #fafafa;
          height: fit-content;
          overflow-y: auto;
        }
        .keyboard-title {
          margin-bottom: 8px;
          font-weight: bold;
          font-size: 18px;
          text-align: center;
        }
        .keyboard-keys {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
        }
        .keyboard-keys button {
          min-width: 35px;
          min-height: 35px;
          font-size: 20px;
          cursor: pointer;
          border-radius: 4px;
          border: 1px solid #aaa;
          background-color: #fff;
          user-select: none;
          transition: background-color 0.2s ease;
        }
        .keyboard-keys button:hover {
          background-color: #e0e0e0;
        }
        .info-message {
          color: red;
          margin-bottom: 10px;
        }
        @media (max-width: 767px) {
          .flex-wrapper {
            flex-direction: column;
          }
          .right-side {
            flex: 1 1 auto;
            width: 100%;
            max-height: 250px;
            overflow-y: auto;
            margin-top: 15px;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .right-side {
            flex: 0 0 300px;
            max-height: 300px;
          }
        }
        @media (min-width: 1024px) {
          .right-side {
            flex: 0 0 400px;
            max-height: 350px;
          }
        }
      `}</style>
    <div className="info-note">
  🔒 <strong>Privacy Note:</strong> We never save or share your phone number or messages. All data stays in your browser.
    </div>

      <div className="container">
        <h1>WhatsApp Message Sender</h1>

        <div className="flex-wrapper">
          {/* Left side */}
          <div className="left-side">
            <div className="phone-input">
              <select
                value={countryCode}
                onChange={(e) => {
                  setCountryCode(e.target.value);
                  setMaxDigitsReached(false);
                  const maxLen = maxDigitsMap[e.target.value] || 15;
                  if (phone.length > maxLen) {
                    setPhone(phone.slice(0, maxLen));
                  }
                }}
              >
                <option value="+91">🇮🇳 +91</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+61">🇦🇺 +61</option>
                <option value="+971">🇦🇪 +971</option>
              </select>
              <input
                type="tel"
                pattern="[0-9]*"
                inputMode="numeric"
                placeholder="Phone Number"
                value={phone}
                onChange={handlePhoneChange}
              />
            </div>

            {maxDigitsReached && (
              <div className="info-message">Max digits reached for this country</div>
            )}

            <textarea
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <a href={createLink()} target="_blank" rel="noopener noreferrer" className="btn">
              Open in WhatsApp
            </a>
          </div>

          {/* Right side */}
          <div className="right-side">
            <div className="keyboard-title">
              Virtual Keyboard Language:
              <select
                style={{ marginLeft: "10px", fontSize: "16px" }}
                value={keyboardLanguage}
                onChange={(e) => setKeyboardLanguage(e.target.value)}
              >
                <option value="gujarati">Gujarati</option>
                <option value="hindi">Hindi</option>
                <option value="english">English</option>
              </select>
            </div>

            <div className="keyboard-keys">
              {currentKeys.map((key, index) => (
                <button key={index} onClick={() => onKeyClick(key)} title={key === "←" ? "Backspace" : key}>
                  {key}
                </button>
              ))}
            </div>
          </div>
        </div>
        <footer style={{ textAlign: 'center', fontSize: '14px', marginTop: '30px', color: '#555' }}>
            Built with ❤️ — This tool does not store your data. It's fully client-side and secure. <br />
            Have questions or feedback? Contact me at{' '}
            <a href="mailto:brijpatelbr@gmail.com" style={{ color: '#007bff', textDecoration: 'none' }}>
                brijpatelbr@gmail.com
            </a>
        </footer>

      </div>
    </>
  );
}
