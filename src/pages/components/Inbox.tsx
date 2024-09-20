import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Email {
  id: string;
  from: string;
  subject: string;
  body: string;
}

const Inbox: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/inbox');
        setEmails(response.data);
      } catch (error) {
        console.error('Error fetching emails:', error);
      }
    };

    fetchEmails();
  }, []);

  return (
    <div>
      <h2>Inbox</h2>
      <ul>
        {emails.map((email) => (
          <li key={email.id}>
            <strong>{email.subject}</strong> from {email.from}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inbox;
