import { Send } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { marketplaceService } from '../services/api';

export function Messages() {
  const { data } = useApi(marketplaceService.messages, []);
  const messages = data?.length ? data : [{ _id: 1, sender: { name: 'Bailey Buyer' }, body: 'Can you build a quiet photo editing PC this weekend?', createdAt: new Date().toISOString() }, { _id: 2, sender: { name: 'Sam Seller' }, body: 'Yes, I can source parts locally and have it ready Saturday.', createdAt: new Date().toISOString() }];
  return <section className="two-column"><div className="panel messages"><h2>Real-time-ready messaging</h2>{messages.map((message) => <div className="message" key={message._id}><strong>{message.sender?.name || 'LocalTech user'}</strong><p>{message.body}</p><small>{new Date(message.createdAt).toLocaleString()}</small></div>)}</div><form className="panel"><h2>New message</h2><input placeholder="Recipient user id" /><textarea placeholder="Ask about pickup, warranty, bundle pricing…" /><button><Send size={16} /> Send</button></form></section>;
}
