import React, { useState } from "react";

const gujaratiKeys = [
  "અ", "આ", "ઇ", "ઈ", "ઉ", "ઊ", "ઋ", "એ", "ઐ", "ઓ", "ઔ",
  "ક", "ખ", "ગ", "ઘ", "ઙ",
  "ચ", "છ", "જ", "ઝ", "ઞ",
  "ટ", "ઠ", "ડ", "ઢ", "ણ",
  "ત", "થ", "દ", "ધ", "ન",
  "પ", "ફ", "બ", "ભ", "મ",
  "ય", "ર", "લ", "વ",
  "શ", "ષ", "સ", "હ",
  "ળ", "ક્ષ", "જ્ઞ",
  "ા", "િ", "ી", "ુ", "ૂ", "ૃ", "ે", "ૈ", "ો", "ૌ",
  "ં", "ઃ", "ઁ",
  "૦", "૧", "૨", "૩", "૪", "૫", "૬", "૭", "૮", "૯",
  " ", "←"
];

export default function App() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [maxDigitsReached, setMaxDigitsReached] = useState(false);

  const maxDigitsMap = {
    "+91": 10,
    "+1": 10,
    "+44": 11,
    "+61": 9,
    "+971": 9,
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
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    const fullPhone = `${countryCode}${cleanPhone}`.replace(/\+/g, "");

    if (isMobile) {
      return `whatsapp://send?phone=${fullPhone}&text=${encodedMessage}`;
    } else {
      return `https://web.whatsapp.com/send?phone=${fullPhone}&text=${encodedMessage}`;
    }
  };

  const onGujaratiKeyClick = (key) => {
    if (key === "←") {
      setMessage((prev) => prev.slice(0, -1));
    } else {
      setMessage((prev) => prev + key);
    }
  };

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

        /* Responsive styles */
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

          {/* Right side: Gujarati keyboard */}
          <div className="right-side">
            <div className="keyboard-title">Gujarati Keyboard</div>
            <div className="keyboard-keys">
              {gujaratiKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => onGujaratiKeyClick(key)}
                  type="button"
                  title={key === "←" ? "Backspace" : key}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
