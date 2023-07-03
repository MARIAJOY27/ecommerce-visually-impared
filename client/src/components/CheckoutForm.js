import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutForm.css';
import emailjs from 'emailjs-com';
import { useCart } from '../context/CartContext';
import { FaMicrophone } from 'react-icons/fa';
import annyang from 'annyang';

const CheckoutForm = () => {
  const form = useRef();
  const { cart, checkout } = useCart();
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);

  let message = '';
  cart.forEach(({ item }) => {
    if (item) {
      const { id, name, priceCents } = item;
      message += `id: ${id}, name: ${name}, priceCents: ${priceCents}\n`;
    }
  });

  const handleVoiceCommand = (field, value) => {
    form.current[field].value = value.replace('.', ''); // Remove '.' from the end of the value
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm('service_uarc6dd', 'template_a9lgb7j', form.current, 'KhOloFgrvSQXulNBH')
      .then(() => {
        checkout();
        navigate('/', { replace: true });
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  const toggleListening = () => {
    setIsListening(true);
    annyang.start();
    setTimeout(() => {
      setIsListening(false);
      annyang.abort();
    }, 15000); // Autostop after 15 seconds
  };

  useEffect(() => {
    const commands = {
      'name is *name': (name) => {
        handleVoiceCommand('name', name);
      },
      'address is *address': (address) => {
        handleVoiceCommand('address', address);
      },
      'phone is *phone': (phone) => {
        handleVoiceCommand('phone', phone);
      },
      'email is *email': (email) => {
        handleVoiceCommand('email', email);
      },
    };

    annyang.addCommands(commands);

    return () => {
      annyang.removeCommands(Object.keys(commands));
      annyang.abort();
    };
  }, []);

  return (
    <div className="form-container">
      <form ref={form} onSubmit={sendEmail}>
        <h1>Checkout</h1>
        <div className="input-controls-signup-login">
          <label>Name</label>
          <input type="text" name="name" id="name" required />
        </div>
        <div className="input-controls-signup-login">
          <label>Address</label>
          <input type="text" name="address" id="address" required />
        </div>
        <div className="input-controls-signup-login">
          <label>Phone Number</label>
          <input type="tel" name="phone" id="phone" required />
        </div>
        {/* <div className="input-controls-signup-login">
          <label>Email Address</label>
          <input type="email" name="email" id="email" required />
        </div> */}
        <textarea
          name="content"
          style={{ width: '100%', display: 'none' }}
          hidden={true}
          value={message}
        />
        <div className="input-controls-signup-login">
          <button type="submit">Submit</button>
        </div>
      </form>
      <div className="microphone-container">
        <FaMicrophone
          className={`microphone-icon ${isListening ? 'listening' : ''}`}
          onClick={toggleListening}
        />
      </div>
    </div>
  );
};

export default CheckoutForm;