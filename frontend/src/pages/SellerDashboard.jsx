import { RevenueChart } from '../components/Charts.jsx';
import ProductTable from '../components/ProductTable.jsx';

export default function SellerDashboard() {
  return <><div className="page-title"><h1>Seller Dashboard</h1><p>Manage listings, inventory, local pickup details, order status, and sales performance.</p></div><section className="seller-actions"><button>Create product</button><button>Upload product images</button><button>Export sales CSV</button></section><section className="grid two"><RevenueChart /><div className="panel"><h3>Sales Funnel</h3><div className="funnel"><span style={{width:'92%'}}>Views</span><span style={{width:'68%'}}>Chats</span><span style={{width:'44%'}}>Carts</span><span style={{width:'30%'}}>Orders</span></div></div></section><ProductTable /></>;
}
