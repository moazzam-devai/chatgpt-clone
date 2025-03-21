import React, { useState, useEffect, useRef } from 'react';
import '../style/home-view.css';
import Cards from '../components/Cards';

const Home = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [responses, setResponses] = useState([]);
  const [questions, setQuestions] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Fetch the dummy responses from the JSON file
    const fetchResponses = async () => {
      try {
        const response = await fetch('/utils/responce.json'); // Adjust path if needed
        const data = await response.json();
        setResponses(data);

        // Extract random 4 questions from the data
        const randomQuestions = data.sort(() => 0.5 - Math.random()).slice(0, 4);
        setQuestions(randomQuestions.map(item => item.question));
      } catch (error) {
        console.error('Error fetching responses:', error);
      }
    };

    fetchResponses();
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the messages container
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!query.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: query, isUser: true },
    ]);

    const response = responses.find(
      (response) => response.question.toLowerCase() === query.trim().toLowerCase()
    );

    const answer = response ? response.answer : "Sorry, I don't have an answer to that question.";

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: answer, isUser: false },
    ]);

    setQuery('');
  };

  const handleCardClick = (question) => {
    setQuery(question);
    handleSend(); // Automatically send the query when a card is clicked
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default action (e.g., submitting a form)
      handleSend();
    }
  };

  return (
    <div className='grid justify-items-center w-full' >
      {messages.length === 0 ? (
        <div className='justify-center'>
          <div className='pb-10 flex justify-center  logo'>
            <img src='./logo.png' alt='Logo' />
          </div>
          <Cards questions={questions} onCardClick={handleCardClick} />
        </div>
      ) : null}

      {messages.length > 0 && (
        <div className="flex flex-col h-[calc(100vh-185px)] max-w-4xl w-full overflow-y-auto custom-scroll">
          <div className="flex flex-col space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg max-w-s break-words ${message.isUser ? 'bg-gray-300 text-black self-end' : 'bg-blue-500 text-white self-start'}`}
              >
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} /> {/* Empty div to act as scroll target */}
          </div>
        </div>
      )}

      <div className='fixed bottom-4 w-full max-w-lg flex justify-center p-4'>
        <div className='flexSearch items-center w-full  bg-gray-100 rounded-full shadow'>
          <i className='fa-solid fa-paperclip text-lg pe-2'></i>
          <input
            id='query'
            name='query'
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Message ChatGPT'
            className='flex-grow bg-transparent border-0 focus:ring-0 outline-none w-9'
          />
          <div className='flex items-center justify-center px-3 w-9 h-9 bg-slate-500 rounded-full' onClick={handleSend}>
            <i className='fa-solid fa-arrow-up text-white'></i>
          </div>
        </div>
      </div>
      <p className='fixed bottom-1 text-xs text-slate-500 py-1'>
        ChatGPT can make mistakes. Check important info.
      </p>
    </div>
  );
};

export default Home;
