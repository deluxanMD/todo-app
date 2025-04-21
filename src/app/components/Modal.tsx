'use client'

import React, { ReactNode } from 'react'

interface Props {
  title: string
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const Modal = ({ title, isOpen, onClose, children }: Props) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto bg-blue-50 bg-opacity-50">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg p-8 max-w-md mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
