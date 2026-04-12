import React from 'react';

const Card = ({ children, className = '', header, footer, gradient = false }) => {
    return (
        <div className={`bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden transition-all hover:shadow-2xl hover:shadow-slate-200/50 ${className}`}>
            {gradient && <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>}
            
            {header && (
                <div className="px-8 py-6 border-b border-slate-50">
                    {header}
                </div>
            )}
            
            <div className="p-8">
                {children}
            </div>
            
            {footer && (
                <div className="px-8 py-6 bg-slate-50 border-t border-slate-100">
                    {footer}
                </div>
            )}
        </div>
    );
};

export default Card;
