// DOM এলিমেন্টগুলো
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const questionCounter = document.getElementById('question-counter');
const scoreDisplay = document.getElementById('score');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedback = document.getElementById('feedback');
const finalScore = document.getElementById('final-score');
const progressBar = document.getElementById('progress-bar');
const timerDisplay = document.getElementById('timer');
const startScreenHighScore = document.getElementById('start-screen-highscore');
const resultScreenHighScore = document.getElementById('result-screen-highscore');

// সাউন্ড ইফেক্ট
const correctSound = new Audio('correct.mp3');
const wrongSound = new Audio('wrong.mp3');

// ✨ নতুন: বাংলা প্রশ্নব্যাংক (অনেকগুলো প্রশ্ন)
const allQuestions = [
  // --- ওয়েব ডেভেলপমেন্ট (HTML, CSS, JS) ---
  { q: "HTML এর পূর্ণরূপ কী?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink and Text Language"], answer: "Hyper Text Markup Language" },
  { q: "কোন CSS ফ্রেমওয়ার্কটি 'Utility-First' নীতির উপর ভিত্তি করে তৈরি?", options: ["Bootstrap", "Tailwind CSS", "Foundation"], answer: "Tailwind CSS" },
  { q: "কোন ট্যাগটি ব্যবহার করে একটি এক্সটার্নাল JavaScript ফাইল যুক্ত করা হয়?", options: ["<script>", "<js>", "<link>"], answer: "<script>" },
  { q: "CSS এ 'Cascading' বলতে কী বোঝায়?", options: ["স্টাইল ওপর থেকে নিচে প্রবাহিত হয়", "এটি একটি অ্যানিমেশন", "এটি একটি ফ্রেমওয়ার্ক"], answer: "স্টাইল ওপর থেকে নিচে প্রবাহিত হয়" },
  { q: "একটি ওয়েবসাইটে Favicon কী?", options: ["একটি বিশেষ ফন্ট", "ব্রাউজার ট্যাবের ছোট আইকন", "একটি জাভাস্ক্রিপ্ট লাইব্রেরি"], answer: "ব্রাউজার ট্যাবের ছোট আইকন" },
  { q: "HTTP এর 'S' অক্ষরটি কী নির্দেশ করে?", options: ["Secure", "Simple", "System"], answer: "Secure" },
  { q: "কোনটি একটি ফ্রন্ট-এন্ড জাভাস্ক্রিপ্ট লাইব্রেরি/ফ্রেমওয়ার্ক নয়?", options: ["React", "Vue", "Laravel"], answer: "Laravel" },
  { q: "HTML এ `<a>` ট্যাগের `href` অ্যাট্রিবিউটের কাজ কী?", options: ["লিংকের টেক্সট নির্ধারণ করা", "লিংকের গন্তব্য (URL) নির্ধারণ করা", "নতুন ট্যাবে লিংক খোলা"], answer: "লিংকের গন্তব্য (URL) নির্ধারণ করা" },
  { q: "CSS এর `box-sizing: border-box;` এর কাজ কী?", options: ["বক্সের বাইরে বর্ডার তৈরি করে", "প্যাডিং এবং বর্ডারকে এলিমেন্টের মোট প্রস্থ ও উচ্চতার অন্তর্ভুক্ত করে", "শুধুমাত্র প্যাডিং যোগ করে"], answer: "প্যাডিং এবং বর্ডারকে এলিমেন্টের মোট প্রস্থ ও উচ্চতার অন্তর্ভুক্ত করে" },
  { q: "DOM এর পূর্ণরূপ কী?", options: ["Document Object Model", "Data Object Model", "Document Oriented Markup"], answer: "Document Object Model" },

  // --- প্রোগ্রামিং বেসিকস ---
  { q: "JavaScript এ একটি ভ্যারিয়েবল ডিক্লেয়ার করার জন্য কোন কীওয়ার্ডটি এখন আর ব্যবহার করা উচিত নয়?", options: ["let", "const", "var"], answer: "var" },
  { q: "JavaScript এর `===` অপারেটর কী চেক করে?", options: ["শুধুমাত্র মান", "মান এবং টাইপ উভয়ই", "শুধুমাত্র টাইপ"], answer: "মান এবং টাইপ উভয়ই" },
  { q: "JSON এর পূর্ণরূপ কী?", options: ["JavaScript Object Notation", "Java Standard Object Naming", "JavaScript Online Notes"], answer: "JavaScript Object Notation" },
  { q: "কোনটি একটি কম্পাইলড প্রোগ্রামিং ল্যাঙ্গুয়েজ?", options: ["Python", "JavaScript", "C++"], answer: "C++" },
  { q: "প্রোগ্রামিং এ 'Recursion' কী?", options: ["একটি ফাংশন যা নিজেকেই কল করে", "একটি লুপ যা অসীম পর্যন্ত চলে", "ডেটাবেস থেকে ডেটা আনা"], answer: "একটি ফাংশন যা নিজেকেই কল করে" },
  { q: "Object-Oriented Programming (OOP) এর প্রধান স্তম্ভ কোনটি নয়?", options: ["Inheritance", "Polymorphism", "Procedure"], answer: "Procedure" },
  { q: "কোন ডেটা স্ট্রাকচার 'First-In, First-Out' (FIFO) নীতি অনুসরণ করে?", options: ["Stack", "Queue", "Array"], answer: "Queue" },
  { q: "কোন ডেটা স্ট্রাকচার 'Last-In, First-Out' (LIFO) নীতি অনুসরণ করে?", options: ["Queue", "Stack", "Linked List"], answer: "Stack" },
  { q: "একটি অ্যালগরিদমের কার্যকারিতা পরিমাপের জন্য কোনটি ব্যবহৃত হয়?", options: ["Big O Notation", "Flowchart", "Syntax"], answer: "Big O Notation" },
  { q: "Python ল্যাঙ্গুয়েজ কে তৈরি করেন?", options: ["Brendan Eich", "Guido van Rossum", "James Gosling"], answer: "Guido van Rossum" },

  // --- সফটওয়্যার ইঞ্জিনিয়ারিং ও টুলস ---
  { q: "সফটওয়্যার ডেভেলপমেন্টে 'Git' কীসের জন্য ব্যবহৃত হয়?", options: ["কোড লেখা", "ভার্সন কন্ট্রোল", "ডেটাবেস ম্যানেজমেন্ট"], answer: "ভার্সন কন্ট্রোল" },
  { q: "API এর পূর্ণরূপ কী?", options: ["Application Programming Interface", "Advanced Programming Input", "Application Process Integration"], answer: "Application Programming Interface" },
  { q: "Agile মেথডোলজির একটি জনপ্রিয় ফ্রেমওয়ার্ক কোনটি?", options: ["Waterfall", "Scrum", "V-Model"], answer: "Scrum" },
  { q: "সফটওয়্যার টেস্টিং এ 'Unit Test' বলতে কী বোঝায়?", options: ["সম্পূর্ণ অ্যাপ্লিকেশন টেস্ট করা", "কোডের ক্ষুদ্রতম অংশ (ফাংশন/মডিউল) টেস্ট করা", "ইউজার ইন্টারফেস টেস্ট করা"], answer: "কোডের ক্ষুদ্রতম অংশ (ফাংশন/মডিউল) টেস্ট করা" },
  { q: "GitHub কী?", options: ["একটি কোড এডিটর", "Git রিপোজিটরি হোস্ট করার একটি প্ল্যাটফর্ম", "একটি প্রোগ্রামিং ল্যাঙ্গুয়েজ"], answer: "Git রিপোজিটরি হোস্ট করার একটি প্ল্যাটফর্ম" },
  { q: "সফটওয়্যার ডেভেলপমেন্ট লাইফ সাইকেল (SDLC) এর প্রথম ধাপ কোনটি?", options: ["ডেভেলপমেন্ট", "প্ল্যানিং এবং রিকোয়ারমেন্ট অ্যানালাইসিস", "টেস্টিং"], answer: "প্ল্যানিং এবং রিকোয়ারমেন্ট অ্যানালাইসিস" },
  { q: "লিনাক্স অপারেটিং সিস্টেমের কার্নেল কে তৈরি করেন?", options: ["স্টিভ জবস", "বিল গেটস", "লিনাস টরভাল্ডস"], answer: "লিনাস টরভাল্ডস" },
  { q: "Docker কীসের জন্য ব্যবহৃত হয়?", options: ["ভার্সন কন্ট্রোল", "অ্যাপ্লিকেশন কন্টেইনারাইজেশন", "কোড লেখা"], answer: "অ্যাপ্লিকেশন কন্টেইনারাইজেশন" },
  { q: "VS Code কী?", options: ["একটি অপারেটিং সিস্টেম", "একটি সোর্স-কোড এডিটর", "একটি ওয়েব ব্রাউজার"], answer: "একটি সোর্স-কোড এডিটর" },
  { q: "Open-Source সফটওয়্যার বলতে কী বোঝায়?", options: ["যে সফটওয়্যার বিনামূল্যে পাওয়া যায়", "যে সফটওয়্যারের সোর্স কোড সবার জন্য উন্মুক্ত", "যে সফটওয়্যার শুধু অনলাইনে চলে"], answer: "যে সফটওয়্যারের সোর্স কোড সবার জন্য উন্মুক্ত" },

  // --- ডেটাবেস ও নেটওয়ার্কিং ---
  { q: "SQL এর পূর্ণরূপ কী?", options: ["Structured Query Language", "Simple Query Language", "Standard Question Language"], answer: "Structured Query Language" },
  { q: "কোনটি একটি NoSQL ডেটাবেসের উদাহরণ?", options: ["MySQL", "PostgreSQL", "MongoDB"], answer: "MongoDB" },
  { q: "ডেটাবেসে 'Primary Key' এর কাজ কী?", options: ["টেবিলের প্রতিটি রো-কে স্বতন্ত্রভাবে চিহ্নিত করা", "ডেটা সর্ট করা", "অন্য টেবিলের সাথে সম্পর্ক তৈরি করা"], answer: "টেবিলের প্রতিটি রো-কে স্বতন্ত্রভাবে চিহ্নিত করা" },
  { q: "ইন্টারনেটের মাধ্যমে ডেটা পাঠানোর জন্য কোন প্রোটোকলটি সর্বাধিক ব্যবহৃত হয়?", options: ["FTP", "TCP/IP", "SMTP"], answer: "TCP/IP" },
  { q: "IP Address এর পূর্ণরূপ কী?", options: ["Internet Protocol Address", "Internal Page Address", "Internet Page Address"], answer: "Internet Protocol Address" },
  { q: "DNS এর প্রধান কাজ কী?", options: ["ডেটা шифр করা", "ডোমেইন নেমকে IP অ্যাড্রেসে রূপান্তর করা", "ইমেল পাঠানো"], answer: "ডোমেইন নেমকে IP অ্যাড্রেসে রূপান্তর করা" },
  { q: "LAN এর পূর্ণরূপ কী?", options: ["Large Area Network", "Local Area Network", "Long Area Network"], answer: "Local Area Network" },
  { q: "ডেটাবেসে CRUD অপারেশনগুলো কী কী?", options: ["Create, Read, Update, Delete", "Copy, Run, Undo, Deploy", "Connect, Run, Update, Disconnect"], answer: "Create, Read, Update, Delete" },
  { q: "MAC Address কোথায় পাওয়া যায়?", options: ["রাউটারে", "নেটওয়ার্ক ইন্টারফেস কার্ড (NIC)-এ", "অপারেটিং সিস্টেমে"], answer: "নেটওয়ার্ক ইন্টারফেস কার্ড (NIC)-এ" },
  { q: "ফায়ারওয়াল (Firewall) এর কাজ কী?", options: ["ভাইরাস স্ক্যান করা", "অননুমোদিত নেটওয়ার্ক অ্যাক্সেস প্রতিরোধ করা", "ইন্টারনেটের গতি বাড়ানো"], answer: "অননুমোদিত নেটওয়ার্ক অ্যাক্সেস প্রতিরোধ করা" },

  // --- কম্পিউটার হার্ডওয়্যার ও আর্কিটেকচার ---
  { q: "কম্পিউটারের 'মস্তিষ্ক' কাকে বলা হয়?", options: ["RAM", "CPU", "Hard Disk"], answer: "CPU" },
  { q: "CPU এর পূর্ণরূপ কী?", options: ["Central Processing Unit", "Computer Processing Unit", "Central Power Unit"], answer: "Central Processing Unit" },
  { q: "RAM কোন ধরনের মেমরি?", options: ["Volatile Memory (অস্থায়ী)", "Non-Volatile Memory (স্থায়ী)", "Read-Only Memory"], answer: "Volatile Memory (অস্থায়ী)" },
  { q: "১ গিগাবাইট (GB) সমান কত মেগাবাইট (MB)?", options: ["১০০০ MB", "১০২৪ MB", "১০০ MB"], answer: "১০২৪ MB" },
  { q: "SSD এর পূর্ণরূপ কী?", options: ["Solid State Drive", "Super Speed Drive", "System Storage Device"], answer: "Solid State Drive" },
  { q: "কম্পিউটারের কোন অংশটি গ্রাফিক্স প্রক্রিয়াকরণের জন্য বিশেষভাবে ব্যবহৃত হয়?", options: ["CPU", "RAM", "GPU"], answer: "GPU" },
  { q: "বাইনারি সংখ্যা পদ্ধতিতে কোন দুটি অঙ্ক ব্যবহৃত হয়?", options: ["0 এবং 1", "1 এবং 2", "0 থেকে 9"], answer: "0 এবং 1" },
  { q: "কম্পিউটার সিস্টেমে BIOS এর কাজ কী?", options: ["অপারেটিং সিস্টেম চালানো", "কম্পিউটার চালু করার সময় হার্ডওয়্যার পরীক্ষা ও শুরু করা", "গেম চালানো"], answer: "কম্পিউটার চালু করার সময় হার্ডওয়্যার পরীক্ষা ও শুরু করা" },
  { q: "USB এর পূর্ণরূপ কী?", options: ["Universal Serial Bus", "Unified System Block", "Universal System Bus"], answer: "Universal Serial Bus" },
  { q: "অপারেটিং সিস্টেম (OS) এর প্রধান কাজ কী?", options: ["শুধু ইন্টারনেট ব্রাউজ করা", "হার্ডওয়্যার এবং সফটওয়্যারের মধ্যে সমন্বয় সাধন করা", "অ্যান্টিভাইরাস হিসেবে কাজ করা"], answer: "হার্ডওয়্যার এবং সফটওয়্যারের মধ্যে সমন্বয় সাধন করা" },
   // --- অ্যাডভান্সড ওয়েব ও ফ্রেমওয়ার্ক ---
  { q: "Node.js কী?", options: ["একটি ফ্রন্ট-এন্ড ফ্রেমওয়ার্ক", "একটি জাভাস্ক্রিপ্ট রানটাইম এনভায়রনমেন্ট", "একটি ডেটাবেস"], answer: "একটি জাভাস্ক্রিপ্ট রানটাইম এনভায়রনমেন্ট" },
  { q: "RESTful API তে 'GET' মেথডের কাজ কী?", options: ["নতুন ডেটা তৈরি করা", "সার্ভার থেকে ডেটা পুনরুদ্ধার করা", "ডেটা মুছে ফেলা"], answer: "সার্ভার থেকে ডেটা পুনরুদ্ধার করা" },
  { q: "GraphQL কী?", options: ["একটি ডেটাবেস ল্যাঙ্গুয়েজ", "API এর জন্য একটি কোয়েরি ল্যাঙ্গুয়েজ", "একটি স্টাইলিং ল্যাঙ্গুয়েজ"], answer: "API এর জন্য একটি কোয়েরি ল্যাঙ্গুয়েজ" },
  { q: "Single Page Application (SPA) বলতে কী বোঝায়?", options: ["যে ওয়েবসাইটে মাত্র একটি পেজ থাকে", "একটি অ্যাপ যা নতুন পেজ লোড না করেই কনটেন্ট পরিবর্তন করে", "মোবাইলের জন্য তৈরি ওয়েবসাইট"], answer: "একটি অ্যাপ যা নতুন পেজ লোড না করেই কনটেন্ট পরিবর্তন করে" },
  { q: "Webpack বা Vite এর মতো টুলগুলোকে কী বলা হয়?", options: ["কোড এডিটর", "মডিউল বান্ডলার", "ডেটাবেস ক্লায়েন্ট"], answer: "মডিউল বান্ডলার" },
  { q: "TypeScript কী?", options: ["জাভাস্ক্রিপ্টের একটি ফ্রেমওয়ার্ক", "টাইপসহ জাভাস্ক্রিপ্টের একটি সুপারসেট", "একটি নতুন প্রোগ্রামিং ল্যাঙ্গুয়েজ"], answer: "টাইপসহ জাভাস্ক্রিপ্টের একটি সুপারসেট" },
  { q: "SASS বা SCSS কীসের জন্য ব্যবহৃত হয়?", options: ["জাভাস্ক্রিপ্ট কোড লিখতে", "আরও শক্তিশালী CSS লিখতে", "সার্ভার ম্যানেজ করতে"], answer: "আরও শক্তিশালী CSS লিখতে" },
  { q: "WebAssembly (WASM) এর মূল উদ্দেশ্য কী?", options: ["ওয়েবসাইটকে আরও সুন্দর করা", "ব্রাউজারে প্রায় নেটিভ পারফরম্যান্সে কোড চালানো", "জাভাস্ক্রিপ্টকে প্রতিস্থাপন করা"], answer: "ব্রাউজারে প্রায় নেটিভ পারফরম্যান্সে কোড চালানো" },
  { q: "Progressive Web App (PWA) এর একটি বৈশিষ্ট্য কী?", options: ["শুধুমাত্র অনলাইনে কাজ করে", "অফলাইনেও কাজ করতে পারে", "শুধুমাত্র ডেস্কটপে চলে"], answer: "অফলাইনেও কাজ করতে পারে" },
  { q: "সার্ভার-সাইড রেন্ডারিং (SSR) এর একটি সুবিধা কী?", options: ["অ্যাপ দ্রুত লোড হয়", "ভালো SEO পারফরম্যান্স এবং দ্রুত প্রথম পেইন্ট", "শুধুমাত্র ক্লায়েন্ট-সাইডে কোড চলে"], answer: "ভালো SEO পারফরম্যান্স এবং দ্রুত প্রথম পেইন্ট" },

  // --- অ্যালগরিদম ও ডেটা স্ট্রাকচার ---
  { q: "বাইনারি সার্চ (Binary Search) অ্যালগরিদমের জন্য ডেটা কেমন হতে হয়?", options: ["এলোমেলো (Unsorted)", "সাজানো (Sorted)", "যেকোনো ধরনের"], answer: "সাজানো (Sorted)" },
  { q: "হ্যাশ টেবিল (Hash Table) কোন অপারেশনের জন্য সবচেয়ে কার্যকরী?", options: ["ডেটা সর্ট করা", "দ্রুত ডেটা খোঁজা (Search)", "ডেটা রিভার্স করা"], answer: "দ্রুত ডেটা খোঁজা (Search)" },
  { q: "গ্রাফ (Graph) ডেটা স্ট্রাকচারে দুটি নোডের সংযোগকারী লাইনকে কী বলা হয়?", options: ["এজ (Edge)", "লিংক (Link)", "পয়েন্ট (Point)"], answer: "এজ (Edge)" },
  { q: "ট্রি (Tree) ডেটা স্ট্রাকচারের সর্বোচ্চ নোডটিকে কী বলা হয়?", options: ["লিফ নোড (Leaf Node)", "রুট নোড (Root Node)", "চাইল্ড নোড (Child Node)"], answer: "রুট নোড (Root Node)" },
  { q: "Dynamic Programming কী?", options: ["চলমান প্রোগ্রামিং", "বড় সমস্যাকে ছোট ছোট অংশে ভাগ করে সমাধান করা এবং ফলাফল মনে রাখা", "ডায়নামিক ওয়েবসাইট তৈরি"], answer: "বড় সমস্যাকে ছোট ছোট অংশে ভাগ করে সমাধান করা এবং ফলাফল মনে রাখা" },

  // --- ক্লাউড কম্পিউটিং ও ডেভঅপ্স ---
  { q: "AWS এর পূর্ণরূপ কী?", options: ["Advanced Web Services", "Amazon Web Services", "Automated Web Systems"], answer: "Amazon Web Services" },
  { q: "IaaS, PaaS, এবং SaaS কীসের মডেল?", options: ["ডেটাবেস ডিজাইন", "ক্লাউড কম্পিউটিং সার্ভিস", "নেটওয়ার্কিং প্রোটোকল"], answer: "ক্লাউড কম্পিউটিং সার্ভিস" },
  { q: "CI/CD পাইপলাইনের 'CI' অংশটির অর্থ কী?", options: ["Continuous Integration", "Code Integration", "Continuous Input"], answer: "Continuous Integration" },
  { q: "সার্ভারলেস কম্পিউটিং (Serverless Computing) এর অর্থ কী?", options: ["কোনো সার্ভার ব্যবহার হয় না", "ডেভেলপারকে সার্ভার ম্যানেজ করতে হয় না", "অ্যাপ্লিকেশন অফলাইনে চলে"], answer: "ডেভেলপারকে সার্ভার ম্যানেজ করতে হয় না" },
  { q: "Kubernetes (K8s) কীসের জন্য ব্যবহৃত হয়?", options: ["ডেটাবেস ম্যানেজমেন্ট", "কন্টেইনার অর্কেস্ট্রেশন", "ইউজার ইন্টারফেস ডিজাইন"], answer: "কন্টেইনার অর্কেস্ট্রেশন" },

  // --- সাইবার সিকিউরিটি ---
  { q: "SQL Injection কী?", options: ["ডেটাবেসে নতুন ডেটা যোগ করা", "একটি হ্যাকিং কৌশল যা ডেটাবেসের দুর্বলতাকে কাজে লাগায়", "ডেটাবেস অপটিমাইজ করা"], answer: "একটি হ্যাকিং কৌশল যা ডেটাবেসের দুর্বলতাকে কাজে লাগায়" },
  { q: "Phishing (ফিশিং) কী?", options: ["একটি মাছ ধরার খেলা", "প্রতারণার মাধ্যমে ব্যবহারকারীর সংবেদনশীল তথ্য হাতিয়ে নেওয়া", "নেটওয়ার্কের গতি পরীক্ষা করা"], answer: "প্রতারণার মাধ্যমে ব্যবহারকারীর সংবেদনশীল তথ্য হাতিয়ে নেওয়া" },
  { q: "HTTPS কেন HTTP এর চেয়ে বেশি নিরাপদ?", options: ["কারণ এটি দ্রুত চলে", "কারণ এটি ডেটা এনক্রিপ্ট করে পাঠায়", "কারণ এটি গুগল দ্বারা তৈরি"], answer: "কারণ এটি ডেটা এনক্রিপ্ট করে পাঠায়" },
  { q: "DDoS Attack এর পূর্ণরূপ কী?", options: ["Direct Denial of Service", "Distributed Denial of Service", "Data Denial of Service"], answer: "Distributed Denial of Service" },
  { q: "Two-Factor Authentication (2FA) কী?", options: ["দুটি পাসওয়ার্ড ব্যবহার করা", "পরিচয় যাচাইয়ের জন্য দুটি ভিন্ন পদ্ধতি ব্যবহার করা", "দুজন ইউজার একসাথে লগইন করা"], answer: "পরিচয় যাচাইয়ের জন্য দুটি ভিন্ন পদ্ধতি ব্যবহার করা" },

  // --- কৃত্রিম বুদ্ধিমত্তা (AI) ও মেশিন লার্নিং (ML) ---
  { q: "মেশিন লার্নিং এর 'Supervised Learning' এ কী প্রয়োজন হয়?", options: ["শুধু ইনপুট ডেটা", "লেবেলযুক্ত ডেটা (ইনপুট ও আউটপুট)", "কোনো ডেটার প্রয়োজন নেই"], answer: "লেবেলযুক্ত ডেটা (ইনপুট ও আউটপুট)" },
  { q: "কোনটি একটি জনপ্রিয় মেশিন লার্নিং লাইব্রেরি?", options: ["React", "TensorFlow", "jQuery"], answer: "TensorFlow" },
  { q: "একটি নিউরাল নেটওয়ার্কের স্তরগুলোকে কী বলা হয়?", options: ["নোড (Nodes)", "স্তর (Layers)", "শাখা (Branches)"], answer: "স্তর (Layers)" },
  { q: "Natural Language Processing (NLP) কীসের সাথে সম্পর্কিত?", options: ["কম্পিউটারের মানুষের ভাষা বোঝা ও ব্যবহার করা", "প্রাকৃতিক দুর্যোগ পূর্বাভাস", "নেটওয়ার্ক ট্র্যাফিক বিশ্লেষণ"], answer: "কম্পিউটারের মানুষের ভাষা বোঝা ও ব্যবহার করা" },
  { q: "ক্যাপচা (CAPTCHA) এর মূল উদ্দেশ্য কী?", options: ["ওয়েবসাইট দ্রুত লোড করা", "মানুষ এবং বটের মধ্যে পার্থক্য করা", "ইউজারের তথ্য সংগ্রহ করা"], answer: "মানুষ এবং বটের মধ্যে পার্থক্য করা" },

  // --- অন্যান্য গুরুত্বপূর্ণ বিষয় ---
  { q: "সফটওয়্যারের 'Beta Version' বলতে কী বোঝায়?", options: ["সফটওয়্যারের প্রথম সংস্করণ", "রিলিজের আগে টেস্টিংয়ের জন্য প্রায়-সম্পূর্ণ সংস্করণ", "সফটওয়্যারের চূড়ান্ত সংস্করণ"], answer: "রিলিজের আগে টেস্টিংয়ের জন্য প্রায়-সম্পূর্ণ সংস্করণ" },
  { q: "Markdown কী?", options: ["একটি প্রোগ্রামিং ল্যাঙ্গুয়েজ", "প্লেইন টেক্সট ফরম্যাটিং এর জন্য একটি মার্কআপ ল্যাঙ্গুয়েজ", "একটি ডাটাবেস সিস্টেম"], answer: "প্লেইন টেক্সট ফরম্যাটিং এর জন্য একটি মার্কআপ ল্যাঙ্গুয়েজ" },
  { q: "কম্পিউটার বিজ্ঞানের জনক হিসেবে কাকে অভিহিত করা হয়?", options: ["অ্যালান টুরিং", "চার্লস ব্যাবেজ", "জন ভন নিউম্যান"], answer: "চার্লস ব্যাবেজ" },
  { q: "একটি 'বাগ' (Bug) বলতে প্রোগ্রামিং-এ কী বোঝানো হয়?", options: ["একটি ফিচার", "কোডের মধ্যে একটি ত্রুটি বা ভুল", "একটি কমেন্ট"], answer: "কোডের মধ্যে একটি ত্রুটি বা ভুল" },
  { q: "ASCII এর পূর্ণরূপ কী?", options: ["American Standard Code for Information Interchange", "Advanced Standard Code for Internet Information", "American Symbolic Code for Information Integration"], answer: "American Standard Code for Information Interchange" },
  { q: "ফ্লোচার্টে (Flowchart) ডায়মন্ড (Diamond) চিহ্নটি কী নির্দেশ করে?", options: ["শুরু বা শেষ", "প্রসেস বা প্রক্রিয়া", "সিদ্ধান্ত বা শর্ত (Decision)"], answer: "সিদ্ধান্ত বা শর্ত (Decision)" },
  { q: "কোন অপারেটিং সিস্টেমটি অ্যাপল (Apple) এর ম্যাক কম্পিউটারে ব্যবহৃত হয়?", options: ["Windows", "Linux", "macOS"], answer: "macOS" },
  { q: "কমান্ড লাইন ইন্টারফেস (CLI) এ ফাইল লিস্ট দেখতে লিনাক্সে কোন কমান্ড ব্যবহৃত হয়?", options: ["dir", "list", "ls"], answer: "ls" },
  { q: "গুগলের তৈরি মোবাইল অপারেটিং সিস্টেম কোনটি?", options: ["iOS", "Android", "Symbian"], answer: "Android" },
  { q: "কম্পাইলার (Compiler) এবং ইন্টারপ্রেটার (Interpreter) এর মধ্যে মূল পার্থক্য কী?", options: ["কোনো পার্থক্য নেই", "কম্পাইলার পুরো কোড একসাথে অনুবাদ করে, ইন্টারপ্রেটার লাইন-বাই-লাইন করে", "ইন্টারপ্রেটার দ্রুত কাজ করে"], answer: "কম্পাইলার পুরো কোড একসাথে অনুবাদ করে, ইন্টারপ্রেটার লাইন-বাই-লাইন করে" },
  { q: "IDE এর পূর্ণরূপ কী?", options: ["Integrated Development Environment", "Internal Development Engine", "Integrated Design Environment"], answer: "Integrated Development Environment" },
  { q: "কুকি (Cookie) ওয়েব ব্রাউজারে কী কাজ করে?", options: ["ওয়েবসাইট দ্রুত লোড করে", "ব্যবহারকারীর তথ্য বা সেশন ব্রাউজারে সংরক্ষণ করে", "ভাইরাস থেকে সুরক্ষা দেয়"], answer: "ব্যবহারকারীর তথ্য বা সেশন ব্রাউজারে সংরক্ষণ করে" },
  { q: "পিক্সেল (Pixel) কী?", options: ["একটি ছবির রঙ", "ডিজিটাল ইমেজের ক্ষুদ্রতম একক", "একটি গ্রাফিক্স কার্ড"], answer: "ডিজিটাল ইমেজের ক্ষুদ্রতম একক" },
  { q: "সফটওয়্যার পাইরেসি (Software Piracy) কী?", options: ["সফটওয়্যার টেস্টিং করা", "অনুমতি ছাড়া সফটওয়্যার কপি, বিতরণ বা ব্যবহার করা", "সফটওয়্যার বিক্রি করা"], answer: "অনুমতি ছাড়া সফটওয়্যার কপি, বিতরণ বা ব্যবহার করা" },
];


let questions = []; // খেলার জন্য নির্বাচিত ১০টি প্রশ্ন এখানে থাকবে
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;
let highScore = localStorage.getItem('quizHighScore') || 0;

// ✨ নতুন: প্রশ্নব্যাংক থেকে দৈবচয়ন পদ্ধতিতে প্রশ্ন নির্বাচন করার ফাংশন
function selectRandomQuestions() {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    questions = shuffled.slice(0, 10);
}

// হাই-স্কোর দেখানো
function displayHighScore() {
    startScreenHighScore.innerText = `সর্বোচ্চ স্কোর: ${highScore}`;
    resultScreenHighScore.innerText = `সর্বোচ্চ স্কোর: ${highScore}`;
}

// ইভেন্ট লিসেনার
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);

window.onload = displayHighScore;

function startQuiz() {
    selectRandomQuestions(); // কুইজ শুরুর আগে ১০টি প্রশ্ন নির্বাচন করা
    startScreen.classList.add('hidden');
    questionScreen.classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function restartQuiz() {
    displayHighScore();
    startScreen.classList.remove('hidden');
    resultScreen.classList.add('hidden');
    questionScreen.classList.add('hidden');
}

// --- বাকি সব ফাংশন (showQuestion, startTimer, selectAnswer ইত্যাদি) আগের মতোই থাকবে ---
// নিচে সম্পূর্ণ কোড দেওয়া আছে

function showQuestion() {
    resetState();
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    const currentQuestion = questions[currentQuestionIndex];
    questionCounter.innerText = `প্রশ্ন ${currentQuestionIndex + 1} / ${questions.length}`;
    scoreDisplay.innerText = `স্কোর: ${score}`;
    questionText.innerText = currentQuestion.q;
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('bg-slate-700', 'text-left', 'p-4', 'rounded-lg', 'hover:bg-cyan-700', 'transition-all', 'duration-200');
        button.addEventListener('click', () => selectAnswer(option, button));
        optionsContainer.appendChild(button);
    });
    timeLeft = 10;
    timerDisplay.innerText = timeLeft;
    timerDisplay.classList.remove('border-red-500');
    timerDisplay.classList.add('border-yellow-400');
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;
        if (timeLeft <= 3) {
            timerDisplay.classList.remove('border-yellow-400');
            timerDisplay.classList.add('border-red-500');
        }
        if (timeLeft === 0) {
            clearInterval(timer);
            feedback.innerText = "⏰ সময় শেষ!";
            feedback.classList.add('text-yellow-400');
            disableOptionsAndShowCorrectAnswer();
            setTimeout(goToNextQuestion, 2000);
        }
    }, 1000);
}

function resetState() {
    clearInterval(timer);
    feedback.innerText = '';
    feedback.classList.remove('text-green-400', 'text-red-400', 'text-yellow-400');
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

function selectAnswer(selectedOption, button) {
    clearInterval(timer);
    disableOptionsAndShowCorrectAnswer();
    const correct = questions[currentQuestionIndex].answer;
    if (selectedOption === correct) {
        score++;
        feedback.innerText = "✅ সঠিক উত্তর!";
        feedback.classList.add('text-green-400');
        button.classList.remove('bg-slate-700');
        button.classList.add('bg-green-500');
        correctSound.play();
    } else {
        feedback.innerText = "❌ ভুল উত্তর!";
        feedback.classList.add('text-red-400');
        button.classList.remove('bg-slate-700');
        button.classList.add('bg-red-500');
        wrongSound.play();
    }
    scoreDisplay.innerText = `স্কোর: ${score}`;
    setTimeout(goToNextQuestion, 2000);
}

function disableOptionsAndShowCorrectAnswer() {
    const correct = questions[currentQuestionIndex].answer;
    const allButtons = optionsContainer.children;
    Array.from(allButtons).forEach(btn => {
        btn.disabled = true;
        if (btn.innerText === correct) {
            btn.classList.remove('bg-slate-700', 'hover:bg-cyan-700');
            btn.classList.add('bg-green-500');
        }
    });
}

function goToNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    progressBar.style.width = '100%';
    finalScore.innerText = `আপনার চূড়ান্ত স্কোর: ${score} / ${questions.length}`;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('quizHighScore', highScore);
        resultScreenHighScore.innerText = `🎉 নতুন সর্বোচ্চ স্কোর: ${highScore}`;
    } else {
        resultScreenHighScore.innerText = `সর্বোচ্চ স্কোর: ${highScore}`;
    }
}
