import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import './CheckoutForm.css';
import emailjs from '@emailjs/browser'
import { useCart } from '../context/CartContext';

const CheckoutForm = () => {
    const form = useRef();
    const { cart, checkout } = useCart();
    const navigate = useNavigate();

    let message = ''
    cart.map(({item}) => {
        if(item) {
            const {id, name, priceCents} = item;
            message += `id: ${id}, name: ${name}, priceCents: ${priceCents}\n`;
        }
    })


    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_uarc6dd', 'template_a9lgb7j', form.current, 'KhOloFgrvSQXulNBH')
            .then(() => {
                checkout();
                navigate("/", {replace: true});
            }, (error) => {
                console.log(error);
                return false
            });
    }
    return (
        <div className="form-container">
            <form ref={form} onSubmit={sendEmail}>
                <h1>Checkout</h1>
                <div className="input-controls-signup-login">
                    <label>Name</label>
                    <input type="text" name='name' id='name' required />
                </div>
                <div className="input-controls-signup-login">
                    <label>Address</label>
                    <input type="text" name='address' id='address' required />
                </div>
                <div className="input-controls-signup-login">
                    <label>Phone Number</label>
                    <input type="tel" name='phone' id='phone' required />
                </div>
                <div className="input-controls-signup-login">
                    <label>Email Address</label>
                    <input type="email" name='email' id='email' required />
                </div>
                <textarea name='content' style={{width: '100%', display:'none'}} hidden={true} value={message} />
                <div className="input-controls-signup-login">
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;
