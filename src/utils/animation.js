// src/utils/animations.js

// Parent container (staggered children)
export const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.25,
        },
    },
}

// For cards / grid items
export const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
}

// For section headers (title + subtitle)
export const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
}


// src/utils/allArticlesAnimations.js

// Animate section header (title + subtitle)
export const allArticlesHeaderVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

// Parent grid container → stagger children
export const allArticlesContainerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.2 },
    },
}


// Card animation for backend articles (fade-in-up)
export const backendArticleCardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

// Buttons (Load More / Show Less)
export const allArticlesButtonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
}

// Skeleton loader cards
export const skeletonVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
}

export const sampleArticleCardVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
}
