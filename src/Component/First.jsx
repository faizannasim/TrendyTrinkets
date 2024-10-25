import React from 'react';




function First() {
    const header = {
        name: "TrendyTrinkets.",
        item: [
            
            {
                name: "Food And ",
                link: "#",
            },
            {
                name: "Furniture",
                link: "#",
            },
        ],
        contact: {
            button: "Contact Me",
            link: "#",
        }
    }

    return (
        <div className='name'>
            <div className='hi'>
                <h1>{header.name}</h1>
            </div>
            <div className='table'>
                {
                    header.item.map((item, index) => (
                        <div key={index} className='hello'>
                         
                            <p className='p'>{item.name}</p>
                            
                        </div>
                    ))
                }
            </div>
            <button className='btn' onClick={() => window.location.href = header.contact.link}>{header.contact.button}</button>
        </div>
    );
}

export default First;


