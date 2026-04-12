const Sentiment = require('sentiment');
const sentiment = new Sentiment();

const CATEGORY_MAP = {
    academics: ['class', 'exam', 'grade', 'syllabus', 'teacher', 'professor', 'lecture', 'assignment', 'course'],
    facilities: ['wifi', 'internet', 'washroom', 'toilet', 'clean', 'dirty', 'water', 'fan', 'ac', 'classroom', 'bench', 'lab'],
    hostel: ['room', 'food', 'mess', 'warden', 'hostel', 'bed', 'noise'],
    administration: ['fee', 'scholarship', 'document', 'certificate', 'management', 'office', 'admin'],
    harassment: ['bully', 'harass', 'ragging', 'abuse', 'tease', 'unsafe', 'threat'],
};

const DEPARTMENT_MAP = {
    academics: 'Academic Affairs',
    facilities: 'Maintenance & Facilities',
    hostel: 'Hostel Administration',
    administration: 'General Administration',
    harassment: 'Disciplinary Committee',
    general: 'General Administration', // fallback
};

const URGENT_KEYWORDS = ['emergency', 'dangerous', 'unsafe', 'threat', 'ragging', 'abuse', 'harass', 'assault', 'fight', 'fire'];

/**
 * Process complaint text and return AI-derived metadata.
 * @param {string} text - The complaint description
 * @returns {Object} - { category, sentimentScore, priority, department }
 */
const analyzeComplaint = (text) => {
    if (!text) return null;

    const lowerText = text.toLowerCase();

    // 1. Sentiment Analysis
    const result = sentiment.analyze(lowerText);
    const sentimentScore = result.score;

    // 2. Initial Priority based on sentiment
    let priority = 'Medium';
    if (sentimentScore < -2) priority = 'High';
    else if (sentimentScore > 2) priority = 'Low';

    // 3. Urgent Keyword Override
    const hasUrgentWords = URGENT_KEYWORDS.some((word) => lowerText.includes(word));
    if (hasUrgentWords) {
        priority = 'High';
    }

    // 4. Categorization
    let matchedCategory = 'general';
    let maxMatches = 0;

    for (const [category, keywords] of Object.entries(CATEGORY_MAP)) {
        let matches = 0;
        keywords.forEach((kw) => {
            // Basic match (could be improved with regex word boundaries)
            if (lowerText.includes(kw)) matches++;
        });

        if (matches > maxMatches) {
            maxMatches = matches;
            matchedCategory = category;
        }
    }

    // If harassment category is matched, force priority to High
    if (matchedCategory === 'harassment') {
        priority = 'High';
    }

    return {
        category: matchedCategory.charAt(0).toUpperCase() + matchedCategory.slice(1),
        sentimentScore,
        priority,
        department: DEPARTMENT_MAP[matchedCategory] || DEPARTMENT_MAP['general'],
    };
};

module.exports = {
    analyzeComplaint
};
