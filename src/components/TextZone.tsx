import React from 'react'
import Logo from '../assets/svg/logo-no-text.svg'

export default ({ text, className = '' }: { text: string; className?: string }) => {
  return (
    <div className={className} style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          position: 'relative',
          backgroundColor: '#A8DBA8',

          lineHeight: 2,
          padding: '1.5em',
          width: window.innerWidth / 2,
          height: '14rem',
          boxShadow: '5px 5px 20px 5px rgba(0,0,0,0.2)',
        }}
      >
        <span style={{ whiteSpace: 'pre-line' }}>{text}</span>
        <img
          src={Logo}
          alt="logo"
          width={50}
          height={50}
          style={{ position: 'absolute', bottom: 5, right: 0 }}
        />
      </div>
    </div>
  )
}
