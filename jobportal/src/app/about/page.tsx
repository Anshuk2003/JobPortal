import React from 'react'

function About() {
    return (
        <div>
            <header>
                <h1>About Us</h1>
            </header>

            <div className="container">
                <section className="mission-vision">
                    <h2>Our Mission</h2>
                    <p>At Job Hunt, our mission is to revolutionize the way individuals connect with opportunities by providing a seamless and empowering platform for career advancement. As students, we are committed to creating a valuable resource that bridges the gap between job seekers and employers, leveraging technology to foster meaningful connections and drive professional growth.</p>
                </section>

                <section className="team">
                    <h2>Our Team</h2>
                    <p>At our Project, we have a diverse and talented team of professionals passionate about technology and customer success. Together, we strive to push boundaries and achieve remarkable results.</p>
                    <div className="flex gap-2 my-1">
                        <img src='/images/anshuk.png' alt='Developer' style={{width:200,height:190}}></img>
                        <div>
                        <h2 style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>Anshuk Kalbande</h2>
                        <p><span style={{ fontStyle: "italic", color: "#351281", fontWeight: "bold" }}>"A self-motivated competitive coder and developer with a passion for software development and problem-solving. I excel in challenging environments and am eager to apply my skills in React and Next.js to contribute to innovative projects. My experience includes building interactive and responsive web applications using React and Next.js."</span></p>
                        </div>
                    </div>

                    <div className="flex gap-2 my-2">
                        <div>
                        <h2 style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>Nisha Rane</h2>
                        <p><span style={{ fontStyle: "italic", color: "#351281", fontWeight: "bold" }}>"A creative and determined professional with a zest for innovation and problem-solving. My journey in technology began with a passion for exploring new ideas and pushing the boundaries of what's possible. As a skilled developer, I specialize in front-end technologies such as React, where I enjoy crafting elegant and user-centric solutions that resonate with audiences."</span></p>
                        </div>
                        <img src='/images/nisha.jpeg' alt='Developer' style={{width:195,height:200}}></img>
                    </div>

                    <div className="flex gap-2 my-2">
                    <img src='/images/omkar.jpeg' alt='Developer' style={{width:195,height:200}}></img>
                        <div>
                        <h2 style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>Omkar Kancharlawar</h2>
                        <p><span style={{ fontStyle: "italic", color: "#351281", fontWeight: "bold" }}>"Self-motivated and hardworking graduate seeking an opportunity to work in a challenging environment to prove my coding skills and utilize my knowledge of various databases for the growth of the organisation. I am committed to making a positive impact through my passion for coding and technology."</span></p>
                        </div>
                    </div>

                    <div className="flex gap-2 my-2" >
                        <div>
                        <h2 style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>Swarnim Pol</h2>
                        <p><span style={{ fontStyle: "italic", color: "#351281", fontWeight: "bold" }}>"A dynamic competitive coder with exceptional communication and management skills. With a passion for problem-solving and a knack for effective collaboration, I excel in navigating challenges and delivering innovative solutions. Ready to drive impactful projects forward with a unique blend of technical prowess and leadership abilities."</span></p>
                        </div>
                        <img src="/images/swarnim.jpeg" alt='Developer' style={{width:200,height:200}}></img>
                    </div>
                    
                </section>
            </div>
        </div>
    )
}

export default About
