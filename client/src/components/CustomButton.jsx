import React from 'react'

function CustomButton({ btnType, title, styles, handleClick }) {
    return (
        <button
            type={btnType}
            className={`font-epilogue font-semibold text-[16px] leading-[26px] min-h-[52px] text-white px-4 rounded-[10px] ${styles}`}
            onClick={handleClick}
        >
            {title}
        </button>
    )
}

export default CustomButton
