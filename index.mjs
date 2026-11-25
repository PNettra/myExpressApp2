import express from 'express';
import { faker } from '@faker-js/faker';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

const languages = {
    python: {
        name: 'Python',
        description: 'Python is a high-level, general-purpose programming language known for its readable syntax. It supports procedural, object-oriented, and functional programming.',
        uses: [
            'Automating repetitive tasks',
            'Processing and analyzing data',
            'Scientific computing',
            'Artificial intelligence and machine learning',
            'Developing web applications'
        ],
        example: `message = "Hello, world!"\nprint(message)`,
        image: 'python-logo.webp',
        source: 'https://www.python.org/about/',
        githubLanguage: 'Python'
    },

    javascript: {
        name: 'JavaScript',
        description: 'JavaScript is a programming language used to make websites interactive. It allows developers to add functionality and respond to user actions.',
        uses: [
            'Interactive websites',
            'Form validation',
            'Dynamic webpage content',
            'Server-side applications',
            'Browser-based games'
        ],
        example: `function showMessage() {\n    alert("Hello, world!");\n}`,
        image: 'JavaScript-logo.png',
        source: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        githubLanguage: 'JavaScript'
    },

    java: {
        name: 'Java',
        description: 'Java is a high-level, class-based programming language commonly used to develop large applications. It emphasizes object-oriented programming.',
        uses: [
            'Enterprise software',
            'Backend application development',
            'Android application development',
            'Financial and business systems',
            'Large-scale applications'
        ],
        example: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, world!");\n    }\n}`,
        image: 'java-logo.jpg',
        source: 'https://dev.java/learn/',
        githubLanguage: 'Java'
    },

    cpp: {
        name: 'C++',
        description: 'C++ is a general-purpose programming language known for its performance and efficiency. It supports procedural, object-oriented, and generic programming.',
        uses: [
            'Game development',
            'Operating systems',
            'Embedded systems',
            'High-performance applications',
            'Desktop software'
        ],
        example: `#include <iostream>\n\nint main() {\n    std::cout << "Hello, world!";\n    return 0;\n}`,
        image: 'cpp-logo.webp',
        source: 'https://isocpp.org/',
        githubLanguage: 'C++'
    }
};

async function getRepositories(language) {
    const params = new URLSearchParams({
        q: `language:${language}`,
        sort: 'stars',
        order: 'desc',
        per_page: '5'
    });

    const url = `https://api.github.com/search/repositories?${params}`;

    const response = await fetch(url, {
        headers: {
            'Accept': 'application/vnd.github+json',
            'User-Agent': 'Programming-Languages-Website'
        }
    });

    const data = await response.json();

    return data.items || [];
}

function getTechPhrase() {
    return faker.hacker.phrase();
}

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        currentPage: 'Home',
        techPhrase: getTechPhrase()
    });
});

app.get('/python', async (req, res) => {
    const repositories = await getRepositories(
        languages.python.githubLanguage
    );

    res.render('python', {
        title: 'Python',
        currentPage: 'Python',
        language: languages.python,
        repositories,
        techPhrase: getTechPhrase()
    });
});

app.get('/javascript', async (req, res) => {
    const repositories = await getRepositories(
        languages.javascript.githubLanguage
    );

    res.render('javascript', {
        title: 'JavaScript',
        currentPage: 'JavaScript',
        language: languages.javascript,
        repositories,
        techPhrase: getTechPhrase()
    });
});

app.get('/java', async (req, res) => {
    const repositories = await getRepositories(
        languages.java.githubLanguage
    );

    res.render('java', {
        title: 'Java',
        currentPage: 'Java',
        language: languages.java,
        repositories,
        techPhrase: getTechPhrase()
    });
});

app.get('/cpp', async (req, res) => {
    const repositories = await getRepositories(
        languages.cpp.githubLanguage
    );

    res.render('cpp', {
        title: 'C++',
        currentPage: 'C++',
        language: languages.cpp,
        repositories,
        techPhrase: getTechPhrase()
    });
});

app.listen(PORT, () => {
    console.log(`Server started`);
});
