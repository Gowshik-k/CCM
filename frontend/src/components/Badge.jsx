import React from 'react';

const Badge = ({ type, children }) => {
    const styles = {
        high: 'bg-red-100 text-red-600 border-red-200',
        medium: 'bg-amber-100 text-amber-600 border-amber-200',
        low: 'bg-emerald-100 text-emerald-600 border-emerald-200',
        pending: 'bg-slate-100 text-slate-600 border-slate-200',
        progress: 'bg-blue-100 text-blue-600 border-blue-200',
        resolved: 'bg-emerald-100 text-emerald-600 border-emerald-200',
    };

    return (
        <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider border ${styles[type.toLowerCase()] || styles.pending}`}>
            {children}
        </span>
    );
};

export default Badge;
