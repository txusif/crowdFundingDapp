import React from 'react'

function FormField({ labelName, placeholder, inputType, value, handleChange, isTextArea }) {
    return (
        <label className="flex-1 w-full flex flex-col">
            {labelName && (
                <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">{labelName}</span>
            )}
            {isTextArea ? (
                <textarea
                    required
                    value={value}
                    onChange={handleChange}
                    type={inputType}
                    rows={10}
                    placeholder={placeholder}
                    className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5263] rounded-[10px]"
                />
            ) : (<input
                required
                value={value}
                onChange={handleChange}
                type={inputType}
                step="0.01"
                placeholder={placeholder}
                className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5263] rounded-[10px]"
            />)}
        </label>
    )
}

export default FormField
