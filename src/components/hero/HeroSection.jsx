import React from 'react'
import './HeroSection.css'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
function HeroSection() {
  return (
    <motion.div className='hero-container'
      initial={{ opacity: 0, y: 40, filter: 'blur(2px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
    >
      <div className='hero-left'>
        <div className="hero-content">
          <h1>"What do you want to write today?"</h1>
          <p>Start your next article on Programming, Tech, or Education.</p>
        </div>
        <div className="hero-input">
          <div className="input-section">
            <input type="text" placeholder='Search by topic , language or tag' />
          </div>
          <div className="hero-buttons">
            <button> 
              <RouterLink to='/create-article'>Start Writing</RouterLink>
               </button>
              <ScrollLink
                to="all-articles"  // matches the id
                smooth={true}       // smooth scrolling
                duration={1500}      // duration in ms
                offset={50}
                >
                <button>
                Explore Articles
              </button>
              </ScrollLink>
          </div>
        </div>
      </div>
      <div className='hero-right'>
        <img src="/images/illustration.png" alt="illustration" />
      </div>
    </motion.div>
  )
}

export default HeroSection
