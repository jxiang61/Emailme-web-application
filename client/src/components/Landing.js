import React from "react";

const Landing = () => {

    return(
        <div>
            <div style={{marginTop:'20px'}} className='ui info message'>
                <h1 style={{fontSize:'3rem',textAlign:'center'}}>
                    <strong>Emailme?</strong>
                </h1>
                <div style={{textAlign:'center', fontSize:'17px'}}>
                    Collect feedback from your users
                </div>
            </div>
            <div className='ui positive message'>
                <div style={{fontSize:'20px'}} className="header">
                    Instructions:
                </div>
                <ul className="list" style={{fontWeight:'bold', lineHeight:'50px'}}>
                    <li>You must login with Google before sending surveys to your users.</li>
                    <li>In this website, you can do:
                        <ul style={{fontWeight:'lighter'}}>
                            <li>Adding your credit card to purchase credits</li>
                            <li>Sending instant campaign surveys to multiple users at one time</li>
                            <li>Collecting feedback from users and displaying feedback on your dashboard</li>
                        </ul>
                    </li>
                    <li>This is an alpha version website, so you can add a testing credit card to make a payment.
                        The credit card number is 4242 4242 4242 4242, expiration date is 01/24, and CVC is 000.
                    </li>
                    <li>More functions will be deployed later...</li>

                </ul>
            </div>
        </div>

    )
}

export default Landing;
