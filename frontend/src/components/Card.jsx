import React from 'react';

const Card = ({ children, className = '', padding = 'p-8', header, footer, gradient = false }) => {
    return (
        <div className={`bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden transition-all hover:shadow-2xl hover:shadow-slate-200/50 ${className}`}>
            {gradient && (
                <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 animate-gradient-x"></div>
            )}
            
            {header && (
                <div className="px-8 py-6 border-b border-slate-50 font-bold text-slate-900">
                    {header}
                </div>
            )}
            
            <div className={padding}>
                {children}
            </div>
            
            {footer && (
                <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100">
                    {footer}
                </div>
            )}
        </div>
    );
};

export default Card;
