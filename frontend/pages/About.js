import React, { useEffect } from 'react'
// import WebFont from 'webfontloader';
const About = () => {
    // WebFont.load({
    //     google: {
    //         families: ['Droid Sans', 'Chilanka']
    //     }
    // });
    useEffect(() => {
        const cookievalue = document.cookie;
        console.log(cookievalue);
    }, [])

    return (
        <section className="">
            <div className="container h-100">
                <div className='align-items-center d-flex flex-column gap-2 justify-content-center' style={{ height: '80vh' }}>
                    <div className='w-full'>This is About Page</div>
                </div>
            </div>
        </section>
    )
}

export default About
