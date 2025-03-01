/* 
This took some time to figure out, but I wanted to make sure that the data was consistent across all the APIs.
I created a mapping of the categories to the API endpoints. This way, I could ensure that the data was consistent across all the APIs. 
Some may not be correct, but I tried to match them as closely as possible.
*/

export const categoryMapping = {
    "Arts & Culture": { newsAPI: "entertainment", guardian: "culture", nyt: "Arts" },
    "Automobiles": { newsAPI: "automobiles", guardian: "cars", nyt: "Automobiles" },
    "Books": { newsAPI: "books", guardian: "books", nyt: "Books" },
    "Business": { newsAPI: "business", guardian: "business", nyt: "Business" },
    "Education": { newsAPI: "education", guardian: "education", nyt: "Education" },
    "Entertainment": { newsAPI: "entertainment", guardian: "culture", nyt: "Movies" },
    "Environment": { newsAPI: "science", guardian: "environment", nyt: "Science" },
    "Fashion & Style": { newsAPI: "fashion", guardian: "fashion", nyt: "Fashion & Style" },
    "Food": { newsAPI: "food", guardian: "food", nyt: "Food" },
    "Games": { newsAPI: "games", guardian: "crosswords", nyt: "Crosswords & Games" },
    "Health": { newsAPI: "health", guardian: "healthcare-network", nyt: "Health" },
    "Home & Garden": { newsAPI: "lifestyle", guardian: "home", nyt: "Home & Garden" },
    "Jobs & Careers": { newsAPI: "business", guardian: "jobsadvice", nyt: "Job Market" },
    "Law": { newsAPI: "general", guardian: "law", nyt: "Law" },
    "Lifestyle": { newsAPI: "general", guardian: "lifeandstyle", nyt: "Style" },
    "Media": { newsAPI: "general", guardian: "media", nyt: "Media" },
    "Money & Finance": { newsAPI: "business", guardian: "money", nyt: "Your Money" },
    "Movies": { newsAPI: "entertainment", guardian: "film", nyt: "Movies" },
    "Music": { newsAPI: "entertainment", guardian: "music", nyt: "Music" },
    "National News": { newsAPI: "general", guardian: "news", nyt: "National" },
    "Opinion": { newsAPI: "general", guardian: "commentisfree", nyt: "Opinion" },
    "Politics": { newsAPI: "general", guardian: "politics", nyt: "Politics" },
    "Real Estate": { newsAPI: "business", guardian: "housing-network", nyt: "Real Estate" },
    "Science": { newsAPI: "science", guardian: "science", nyt: "Science" },
    "Small Business": { newsAPI: "business", guardian: "small-business-network", nyt: "Business" },
    "Social Issues": { newsAPI: "general", guardian: "society", nyt: "Society" },
    "Sports": { newsAPI: "sports", guardian: "sport", nyt: "Sports" },
    "Technology": { newsAPI: "technology", guardian: "technology", nyt: "Technology" },
    "Theater": { newsAPI: "entertainment", guardian: "stage", nyt: "Theater" },
    "Travel": { newsAPI: "travel", guardian: "travel", nyt: "Travel" },
    "TV & Radio": { newsAPI: "entertainment", guardian: "tv-and-radio", nyt: "TV & Radio" },
    "U.S. News": { newsAPI: "general", guardian: "us-news", nyt: "U.S." },
    "World News": { newsAPI: "general", guardian: "world", nyt: "World" },
  };
  

  export const allSources = [
    { name: "News API", value: "newsAPI" },
    { name: "Guardian", value: "guardian" }, 
    { name: "New York Times", value: "nyt" },
    ];