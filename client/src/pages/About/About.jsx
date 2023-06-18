import React from 'react'
import './style.css'
import aleena from '../../img/devs/aleena.png'
import mariyamma from '../../img/devs/mariyamma.png'
import naveen from '../../img/devs/naveen.png'
import sarath from '../../img/devs/sarath.png'

const devs = [
    {
        name: "Aleena",
        img: aleena,
        link: "https://www.instagram.com/aleena___j/"
    },
    {
        name: "Maria",
        img: mariyamma,
        link: "https://www.instagram.com/m.a.r.i.a.j.o.y/"
    },
    {
        name: "Naveen",
        img: naveen,
        link: "https://www.instagram.com/n_4_naveen_/"
    },
    {
        name: "Sarath",
        img: sarath,
        link: "https://www.instagram.com/sarath_801/"
    }
]

const About = () => {
    return (
        <section>
            <h1 className='teams'>Our Project Team</h1>
            <div className='about-container'>
                {
                    devs.map((dev, index) => {
                        return (
                            <div key={index} className="about-card">
                                <div className="img-dev">
                                    <img src={dev.img} alt="dev-img" />
                                </div>
                                <div className="dev-details">
                                    <h3>{dev.name}</h3>
                                    <a href={dev.link} target='_blank'>
                                        <img src="https://png.pngtree.com/png-clipart/20221019/original/pngtree-instagram-icon-png-image_8704817.png" alt="" />
                                        visit
                                    </a>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default About
