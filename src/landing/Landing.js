import React from 'react'
import { useState } from 'react'
import './Landing.css'
import car1 from '../assets/coupe.webp'
import car2 from '../assets/roadster.webp'
import { ImNext, ImPrevious } from 'react-icons/im'
import { GrCaretNext } from 'react-icons/gr'
import io from 'socket.io-client'
import axios from 'axios'

const Landing = () => {
    const [next, setNext] = useState(false)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [bid, setBid] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const res = await axios.post("http://localhost:5000/", { name: name, email: email, bid: bid });

            console.log(res.data)
        }

        catch (error) {
            console.log(error.response)
        }
    }


    const socket = io("http://localhost:3001/")

    socket.on('connection')

    socket.on('message', (data) => {
        document.querySelector('h3').innerHTML = data
    })
    const sendMessage = () => {
        const messageInput = document.querySelector('.message')
        const message = messageInput.value
        socket.emit('message', ' The current bid is $ ' + message)
    }
    return (
        <div className='container-fluid'>
            <div className='navbar'>
                <div className='logo'>Auction<span style={{color: "rgb(255, 196, 0)" }}>X</span></div>
                <ul className='nav-list'>
                    <li className='nav-item'>About</li>
                    <li className='nav-item'>Collection</li>
                    <li className='nav-item'>Cars</li>
                </ul>
            </div>
            <div className='limited'>
                Limited<br /> Collection
                <br />
                <button className='browse'>Browse<GrCaretNext size='16px' /></button>
            </div>
            <div className='h-line-1'></div>
            <div className='h-line-2'></div>
            <div className='next'><h2><ImNext onClick={() => { setNext(!next) }} /></h2></div>
            <div className='previous'><h2><ImPrevious onClick={() => { setNext(!next) }} /></h2></div>

            <div className={next ? 'car-1' : 'car-2'}><img src={car1} /></div>
            <div className={next ? 'car-2' : 'car-1'}><img src={car2} /></div>
            <div className='bottom-bg'>{next ?
                <div className='bottom-content'>
                    <div className='base-p'>
                        <div className='head'>Base Price</div>
                        <div className='rate'>$5743</div>
                    </div>
                    <div className='power'>
                        <div className='head'>Power</div>
                        <div className='rate'>455 HP</div>
                    </div>
                    <div className='engine'>
                        <div className='head'>Engine</div>
                        <div className='rate'>563 V3</div>
                    </div>
                </div> :
                <div className='bottom-content'>
                    <div className='base-p'>
                        <div className='head'>Base Price</div>
                        <div className='rate'>$9245</div>
                    </div>
                    <div className='power'>
                        <div className='head'>Power</div>
                        <div className='rate'>650 HP</div>
                    </div>
                    <div className='engine'>
                        <div className='head'>Engine</div>
                        <div className='rate'>460 V3</div>
                    </div>
                </div>}

            </div>

            <form onSubmit={handleSubmit} >

                <div className='bid'>
                    <div className='name-t'>
                    Name
                    <div className='name'>
                        <input type="text" id="fname" value={name} onChange={(e) => setName(e.target.value)} name="firstname" placeholder="Your Name"></input>
                    </div>
                    </div>
                    <div className='email-t'>
                    Email
                    <div className='email'>
                        <input type="text" id="fname" value={email} onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Your Email"></input>
                    </div>
                    </div>
                    <div className='bid-t'>
                    Place your bid
                    <div className='input-bid'><input type="text" className='message' value={bid} onChange={(e) => setBid(e.target.value)} name="bid" />
                    </div>
                        <br />
                        <div className='submit'>
                            <button className='place-bid' onClick={sendMessage}>Place bid <GrCaretNext size='16px' /></button>
                        </div>
                    </div>

                    <h3></h3>
                </div>
            </form>
        </div>
    )
}

export default Landing